'use client'

import { Heart } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CategoryBar, type Filter } from '@/components/category-bar'
import { Controls } from '@/components/controls'
import { Hero } from '@/components/hero'
import { SearchDialog } from '@/components/search-dialog'
import { TopBar } from '@/components/top-bar'
import { VachanamCard } from '@/components/vachanam-card'
import { Button } from '@/components/ui/button'
import { categoryMap } from '@/lib/categories'
import { useFavorites } from '@/hooks/use-favorites'
import { vachanams, type Vachanam } from '@/lib/vachanams'

const SHARE_SIGNATURE = '— ശ്രീകൃഷ്ണ പ്രചോദിത വചനങ്ങൾ'

const musicRef = useRef<HTMLAudioElement | null>(null)
  const slideSoundRef = useRef<HTMLAudioElement | null>(null)

  const [filter, setFilter] = useState<Filter>('all')
  const [index, setIndex] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [notice, setNotice] = useState('')
  const [musicOn, setMusicOn] = useState(false)
  const automaticChangeRef = useRef(false)
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const favoriteIds = vachanams.filter((v) => isFavorite(v.id)).map((v) => v.id)

  const list = useMemo<Vachanam[]>(() => {
    if (filter === 'all') return vachanams
    if (filter === 'favorites') return vachanams.filter((v) => isFavorite(v.id))
    return vachanams.filter((v) => v.category === filter)
    // isFavorite identity changes with favorites, keeping this list in sync.
  }, [filter, isFavorite])

  // Keep the pointer inside the bounds of the current list.
  useEffect(() => {
    setIndex((i) => (i > list.length - 1 ? Math.max(0, list.length - 1) : i))
  }, [list.length])

  const current = list[index]
const handleVoice = useCallback(() => {
  if (!current) return

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(current.text)
  utterance.lang = 'ml-IN'
  utterance.rate = 0.85
  utterance.pitch = 1

  window.speechSynthesis.speak(utterance)
}, [current])

  const flash = useCallback((message: string) => {
    setNotice(message)
    if (noticeTimer.current) clearTimeout(noticeTimer.current)
    noticeTimer.current = setTimeout(() => setNotice(''), 1800)
  }, [])

  const handleFilter = useCallback((next: Filter) => {
    setFilter(next)
    setIndex(0)
  }, [])

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + list.length) % list.length)
  }, [list.length])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % list.length)
  }, [list.length])

  const advanceAutomatically = useCallback(() => {
    if (list.length <= 1) return
    automaticChangeRef.current = true
    setIndex((i) => (i + 1) % list.length)
  }, [list.length])

  // Automatically move to the next vachanam every 10 seconds.
  useEffect(() => {
    if (list.length <= 1) return
    const timer = window.setInterval(advanceAutomatically, 10000)
    return () => window.clearInterval(timer)
  }, [advanceAutomatically, list.length])

  // Play the short effect only for automatic slide changes.
  useEffect(() => {
    if (!automaticChangeRef.current) return
    automaticChangeRef.current = false
    const audio = slideSoundRef.current
    if (!audio) return
    audio.currentTime = 0
    void audio.play().catch(() => {
      // Browsers may block audio until the visitor interacts with the page.
    })
  }, [index])

  const handleMusicToggle = useCallback(() => {
    const audio = musicRef.current
    if (!audio) return
    if (musicOn) {
      audio.pause()
      setMusicOn(false)
      return
    }
    audio.volume = 0.28
    void audio.play().then(() => setMusicOn(true)).catch(() => {
      flash('സംഗീതം പ്ലേ ചെയ്യാൻ സ്ക്രീനിൽ ടാപ്പ് ചെയ്യുക')
    })
  }, [flash, musicOn])

  const goRandom = useCallback(() => {
    if (list.length <= 1) return
    setIndex((i) => {
      let next = i
      while (next === i) next = Math.floor(Math.random() * list.length)
      return next
    })
  }, [list.length])

  const shareText = current
    ? `"${current.text}"\n\n${SHARE_SIGNATURE}`
    : ''

  const handleCopy = useCallback(async () => {
    if (!current) return
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      flash('പകർത്താൻ കഴിഞ്ഞില്ല')
    }
  }, [current, shareText, flash])

  const handleShare = useCallback(async () => {
    if (!current) return
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'ശ്രീകൃഷ്ണ വചനങ്ങൾ', text: shareText })
      } catch {
        /* user dismissed the share sheet */
      }
      return
    }
    try {
      await navigator.clipboard.writeText(shareText)
      flash('വചനം ക്ലിപ്പ്ബോർഡിലേക്ക് പകർത്തി')
    } catch {
      flash('പങ്കിടാൻ കഴിഞ്ഞില്ല')
    }
  }, [current, shareText, flash])

  const handleSelect = useCallback((v: Vachanam) => {
    setFilter('all')
    setIndex(vachanams.findIndex((x) => x.id === v.id))
    setSearchOpen(false)
  }, [])

  return (
    <>
      <audio ref={musicRef} src="/krishna-flute.mp3" loop preload="none" />
      <audio ref={slideSoundRef} src="/slide-change.wav" preload="auto" />
      <TopBar
        onSearch={() => setSearchOpen(true)}
        musicOn={musicOn}
        onMusicToggle={handleMusicToggle}
      />
      <Hero />

      <div className="mx-auto max-w-3xl px-4 pb-16">
        <div className="pt-5">
          <CategoryBar
            active={filter}
            onChange={handleFilter}
            favoriteCount={favoriteIds.length}
          />
        </div>

        {current ? (
          <div className="mt-5 flex flex-col gap-5">
            <div className="mx-auto w-full max-w-md">
              <VachanamCard
                text={current.text}
                categoryLabel={categoryMap[current.category].label}
                number={index + 1}
                total={list.length}
              />
            </div>

            <div className="mx-auto w-full max-w-md">
              <Controls
                onPrev={goPrev}
                onNext={goNext}
                onRandom={goRandom}
                onCopy={handleCopy}
                onShare={handleShare}
                onToggleFavorite={() => toggle(current.id)}
                isFavorite={isFavorite(current.id)}
                copied={copied}
                canNavigate={list.length > 1}
              />
            </div>
          </div>
        ) : (
          <EmptyFavorites onBrowse={() => handleFilter('all')} />
        )}
      </div>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleSelect}
      />

      {notice && (
        <div
          role="status"
          className="animate-in fade-in slide-in-from-bottom-2 fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg"
        >
          {notice}
        </div>
      )}
    </>
  )
}

function EmptyFavorites({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Heart className="size-7" />
      </span>
      <div className="space-y-1">
        <p className="font-serif text-lg font-semibold">
          പ്രിയപ്പെട്ട വചനങ്ങളൊന്നുമില്ല
        </p>
        <p className="max-w-xs text-sm text-muted-foreground">
          ഹൃദയ ചിഹ്നത്തിൽ ടാപ്പ് ചെയ്ത് ഇഷ്ടപ്പെട്ട വചനങ്ങൾ ഇവിടെ സൂക്ഷിക്കൂ.
        </p>
      </div>
      <Button onClick={onBrowse} className="rounded-full">
        എല്ലാ വചനങ്ങളും കാണുക
      </Button>
    </div>
  )
}
