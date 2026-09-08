'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    setThemeState(
      document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    )
  }, [])

  const apply = useCallback((next: Theme) => {
    const el = document.documentElement
    el.classList.remove('light', 'dark')
    el.classList.add(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* ignore write errors (private mode etc.) */
    }
    setThemeState(next)
  }, [])

  const toggle = useCallback(() => {
    apply(theme === 'dark' ? 'light' : 'dark')
  }, [theme, apply])

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme: apply }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
