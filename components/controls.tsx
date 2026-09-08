'use client'

import {
  Check,
ChevronLeft,
Volume2,
  ChevronRight,
  Copy,
  Heart,
  Share2,
  Shuffle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Controls({
  onPrev,
  onNext,
  onRandom,
  onCopy,
  onShare,
onVoice,
onToggleFavorite,
  isFavorite,
  copied,
  canNavigate,
}: {
  onPrev: () => void
  onNext: () => void
  onRandom: () => void
  onCopy: () => void
  onShare: () => void
onVoice: () => void
onToggleFavorite: () => void
  isFavorite: boolean
  copied: boolean
  canNavigate: boolean
}) {
  return (
    <div className="flex flex-col gap-3">
      {/* Primary navigation */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={onPrev}
          disabled={!canNavigate}
          className="h-12 flex-1 rounded-2xl text-sm"
        >
          <ChevronLeft className="size-5" />
          മുൻപത്തേത്
        </Button>
        <Button
          size="lg"
          onClick={onNext}
          disabled={!canNavigate}
          className="h-12 flex-1 rounded-2xl text-sm"
        >
          അടുത്തത്
          <ChevronRight className="size-5" />
        </Button>
      </div>

      {/* Secondary actions */}
      <div className="grid grid-cols-5 gap-2">
        <ActionButton onClick={onVoice} label="വായിക്കുക">
  <Volume2 className="size-5" />
</ActionButton>
        <ActionButton onClick={onRandom} label="ക്രമരഹിതം">
          <Shuffle className="size-5" />
        </ActionButton>
        <ActionButton
          onClick={onToggleFavorite}
          label={isFavorite ? 'പ്രിയപ്പെട്ടതിൽ നിന്ന് നീക്കുക' : 'പ്രിയപ്പെട്ടതാക്കുക'}
          active={isFavorite}
        >
          <Heart className={cn('size-5', isFavorite && 'fill-current')} />
        </ActionButton>
        <ActionButton onClick={onCopy} label="പകർത്തുക" active={copied}>
          {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
        </ActionButton>
        <ActionButton onClick={onShare} label="പങ്കിടുക">
          <Share2 className="size-5" />
        </ActionButton>
      </div>
    </div>
  )
}

function ActionButton({
  onClick,
  label,
  active,
  children,
}: {
  onClick: () => void
  label: string
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'flex h-14 flex-col items-center justify-center gap-1 rounded-2xl border transition-colors',
        active
          ? 'border-primary/50 bg-primary/10 text-primary'
          : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
