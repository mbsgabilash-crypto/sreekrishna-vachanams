import { BrandEmblem } from '@/components/brand-emblem'

export function VachanamCard({
  text,
  categoryLabel,
  number,
  total,
}: {
  text: string
  categoryLabel: string
  number: number
  total: number
}) {
  return (
    <figure
      key={number}
      className="quote-surface animate-vachanam relative flex aspect-[4/5] flex-col items-center justify-between overflow-hidden rounded-3xl p-6 text-center shadow-xl ring-1 ring-white/10 sm:aspect-square sm:p-8"
    >
      {/* Faint feather watermark motif */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-8 size-40 rotate-12 rounded-full bg-white/5 blur-2xl"
      />

      <div className="flex w-full items-center justify-between">
        <span className="inline-flex items-center rounded-full border border-gold/40 bg-white/10 px-3 py-1 text-xs font-medium text-gold">
          {categoryLabel}
        </span>
        <span className="font-mono text-xs text-white/60">
          {number} / {total}
        </span>
      </div>

      <blockquote className="flex flex-1 items-center px-1 py-6">
        <p className="text-balance font-serif text-2xl font-semibold leading-snug text-white text-shadow-soft sm:text-[1.75rem]">
          {text}
        </p>
      </blockquote>

      <figcaption className="flex w-full items-center justify-center gap-2 text-white/85">
        <BrandEmblem className="size-6" sizes="24px" />
        <span className="text-[13px] font-medium tracking-wide">
          ശ്രീകൃഷ്ണ പ്രചോദിത വചനങ്ങൾ
        </span>
      </figcaption>
    </figure>
  )
}
