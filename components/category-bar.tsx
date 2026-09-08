'use client'

import { Heart } from 'lucide-react'
import { categories } from '@/lib/categories'
import type { CategoryId } from '@/lib/vachanams'
import { cn } from '@/lib/utils'

export type Filter = 'all' | 'favorites' | CategoryId

export function CategoryBar({
  active,
  onChange,
  favoriteCount,
}: {
  active: Filter
  onChange: (filter: Filter) => void
  favoriteCount: number
}) {
  const chip = (value: Filter, label: React.ReactNode, key: string) => {
    const isActive = active === value
    return (
      <button
        key={key}
        type="button"
        onClick={() => onChange(value)}
        aria-pressed={isActive}
        className={cn(
          'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
          isActive
            ? 'border-transparent bg-primary text-primary-foreground shadow-sm'
            : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
        )}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-center gap-2">
        {chip('all', 'എല്ലാം', 'all')}
        {chip(
          'favorites',
          <>
            <Heart
              className={cn('size-3.5', active === 'favorites' && 'fill-current')}
            />
            പ്രിയപ്പെട്ടവ
            {favoriteCount > 0 && (
              <span
                className={cn(
                  'ml-0.5 rounded-full px-1.5 text-[11px] leading-4',
                  active === 'favorites'
                    ? 'bg-primary-foreground/20'
                    : 'bg-muted',
                )}
              >
                {favoriteCount}
              </span>
            )}
          </>,
          'favorites',
        )}
        <span className="mx-0.5 h-5 w-px shrink-0 bg-border" aria-hidden="true" />
        {categories.map((c) => chip(c.id, c.label, c.id))}
      </div>
    </div>
  )
}
