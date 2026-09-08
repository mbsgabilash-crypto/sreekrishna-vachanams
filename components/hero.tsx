import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { BrandEmblem } from '@/components/brand-emblem'
import { TOTAL_VACHANAMS } from '@/lib/vachanams'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/krishna-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.19_0.03_265_/_0.55)] via-[oklch(0.19_0.03_265_/_0.72)] to-background" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pt-10 pb-8 text-center">
        <BrandEmblem className="size-16" sizes="64px" />
        <h1 className="mt-4 text-balance font-serif text-3xl font-bold tracking-tight text-white text-shadow-soft sm:text-4xl">
          ശ്രീകൃഷ്ണ വചനങ്ങൾ
        </h1>
        <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-white/80">
          കർമ്മം, ധർമ്മം, ഭക്തി, സ്നേഹം, ശാന്തി, ജ്ഞാനം — {TOTAL_VACHANAMS.toLocaleString('en-IN')} പ്രചോദിത
          വചനങ്ങൾ ഒരു ഹൃദയത്തിൽ നിന്ന്.
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <Sparkles className="size-3.5 text-gold" />
          ശ്രീകൃഷ്ണ പ്രചോദിത വചനങ്ങൾ
        </span>
      </div>
    </section>
  )
}
