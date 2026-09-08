'use client'

import { Search, Volume2, VolumeX } from 'lucide-react'
import { BrandEmblem } from '@/components/brand-emblem'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export function TopBar({ onSearch, musicOn, onMusicToggle }: { onSearch: () => void; musicOn: boolean; onMusicToggle: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center gap-3 px-4">
        <BrandEmblem className="size-9" sizes="36px" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-base font-semibold leading-none">
            ശ്രീകൃഷ്ണ വചനങ്ങൾ
          </p>
          <p className="truncate text-[11px] text-muted-foreground">
            പ്രചോദിത വചനങ്ങൾ
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onSearch}
          aria-label="വചനങ്ങൾ തിരയുക"
          className="rounded-full"
        >
          <Search />
        </Button>
        <Button
          variant={musicOn ? 'default' : 'outline'}
          size="icon"
          onClick={onMusicToggle}
          aria-label={musicOn ? 'കൃഷ്ണ ഫ്ലൂട്ട് ഓഫ് ചെയ്യുക' : 'കൃഷ്ണ ഫ്ലൂട്ട് ഓൺ ചെയ്യുക'}
          title={musicOn ? 'കൃഷ്ണ ഫ്ലൂട്ട് ഓഫ്' : 'കൃഷ്ണ ഫ്ലൂട്ട് ഓൺ'}
          className="rounded-full"
        >
          {musicOn ? <Volume2 /> : <VolumeX />}
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}
