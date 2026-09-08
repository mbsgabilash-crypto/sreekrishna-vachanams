'use client'

import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { categoryMap } from '@/lib/categories'
import { vachanams, type Vachanam } from '@/lib/vachanams'
import { Button } from '@/components/ui/button'

const MAX_RESULTS = 40

export function SearchDialog({
  open,
  onClose,
  onSelect,
}: {
  open: boolean
  onClose: () => void
  onSelect: (v: Vachanam) => void
}) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setQuery('')
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const results = useMemo(() => {
    const q = query.trim()
    if (!q) return []
    return vachanams.filter((v) => v.text.includes(q)).slice(0, MAX_RESULTS)
  }, [query])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="വചനങ്ങൾ തിരയുക"
    >
      <button
        type="button"
        aria-label="അടയ്ക്കുക"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in"
      />

      <div className="animate-in fade-in slide-in-from-top-4 relative mt-2 flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="വചനങ്ങളിൽ തിരയുക..."
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="അടയ്ക്കുക"
            className="rounded-full"
          >
            <X />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {query.trim() === '' ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              ഒരു വാക്ക് ടൈപ്പ് ചെയ്ത് 2400 വചനങ്ങളിൽ തിരയൂ.
            </p>
          ) : results.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              "{query}" എന്നതിന് ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((v) => (
                <li key={v.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(v)}
                    className="flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-muted"
                  >
                    <span className="font-serif text-[15px] leading-snug text-foreground">
                      {v.text}
                    </span>
                    <span className="text-xs text-primary">
                      {categoryMap[v.category].label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
