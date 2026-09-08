import { VachanamApp } from '@/components/vachanam-app'
import { TOTAL_VACHANAMS } from '@/lib/vachanams'

export default function Page() {
  return (
    <main className="min-h-dvh">
      <VachanamApp />

      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-3xl space-y-3 px-4 py-8 text-center">
          <p className="text-sm font-medium text-foreground">
            ശ്രീകൃഷ്ണ വചനങ്ങൾ · {TOTAL_VACHANAMS.toLocaleString('en-IN')} പ്രചോദിത വചനങ്ങൾ
          </p>
          <p className="mx-auto max-w-xl text-pretty text-xs leading-relaxed text-muted-foreground">
            ഇവ ശ്രീകൃഷ്ണ ഭഗവാനിൽ നിന്നോ ഭഗവദ്ഗീതയിൽ നിന്നോ ഉള്ള നേരിട്ടുള്ള
            ഉദ്ധരണികളല്ല. ഭക്തിയിൽ നിന്ന് പ്രചോദനം ഉൾക്കൊണ്ട് രചിച്ച മൗലികമായ
            മലയാളം വചനങ്ങളാണ് — <span className="text-foreground">ശ്രീകൃഷ്ണ പ്രചോദിത വചനങ്ങൾ</span>.
          </p>
          <p className="text-xs text-muted-foreground/70">
            These are original Krishna-inspired Malayalam sayings, not direct
            quotations from Lord Krishna or the Bhagavad Gita.
          </p>

          <div className="pt-3">
            <p className="mb-3 text-sm font-semibold">ബന്ധപ്പെടുക</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href="https://instagram.com/mr_.abilash_07"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-background px-4 py-2 text-xs font-medium transition-colors hover:bg-muted"
              >
                Instagram · @mr_.abilash_07
              </a>
              <a
                href="https://wa.me/919409081149"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-background px-4 py-2 text-xs font-medium transition-colors hover:bg-muted"
              >
                WhatsApp
              </a>
              <a
                href="mailto:abhilashbiju875@gmail.com"
                className="rounded-full border border-border bg-background px-4 py-2 text-xs font-medium transition-colors hover:bg-muted"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
