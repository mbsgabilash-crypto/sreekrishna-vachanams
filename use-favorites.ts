'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'skv-favorites'

/**
 * Favorites are a per-device preference (like theme), so they live in
 * localStorage. There is no user account in this app.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          setFavorites(parsed.filter((n) => typeof n === 'number'))
        }
      }
    } catch {
      /* ignore */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      /* ignore */
    }
  }, [favorites, loaded])

  const toggle = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites],
  )

  return { favorites, toggle, isFavorite, loaded }
}
