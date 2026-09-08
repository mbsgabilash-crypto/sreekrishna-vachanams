import Image from 'next/image'
import { cn } from '@/lib/utils'

export function BrandEmblem({
  className,
  sizes = '64px',
}: {
  className?: string
  sizes?: string
}) {
  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/5 shadow-sm',
        className,
      )}
    >
      <Image
        src="/peacock-feather.png"
        alt="മയിൽപ്പീലി ചിഹ്നം"
        fill
        sizes={sizes}
        className="scale-110 object-contain p-1"
        priority
      />
    </span>
  )
}
