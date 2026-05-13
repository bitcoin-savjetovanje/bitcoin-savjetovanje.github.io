import { ArrowDown, CalendarDays } from "lucide-react"

import { BitcoinStressTestVisual } from "@/components/home/BitcoinStressTestVisual"
import { Button } from "@/components/ui/button"
import { CONVERSATION_PATH, PRIMARY_CTA, SECONDARY_CTA } from "@/content/site"

export function Hero() {
  return (
    <section className="hero-section border-b border-border/70">
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Bitcoin savjetovanje jedan-na-jedan
          </p>
          <h1 className="hero-title mt-4">
            Imate Bitcoin pitanje koje utječe na stvarnu odluku?
          </h1>
          <p className="hero-subtitle">
            Dođite s jednim pitanjem. U 15 minuta razjasnimo što prvo treba
            posložiti: Bitcoin tezu, dug, proračun, sigurnost, obitelj ili ulogu
            Bitcoina u vašoj imovini.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/80">
            Ne morate unaprijed znati trebate li konzultaciju, program ili samo
            kratak odgovor. Uvodni razgovor postoji da to razjasnimo.
          </p>

          <div className="mt-8 flex w-full max-w-2xl flex-col gap-3 sm:mt-9 lg:max-w-none lg:flex-row lg:items-center">
            <Button
              asChild
              size="lg"
              className="cta-primary h-12 w-full rounded-full px-5 text-base lg:w-auto lg:px-6"
            >
              <a
                href={CONVERSATION_PATH}
                className="justify-center text-center"
                data-cta="hero-intro-call"
              >
                <CalendarDays className="size-4" />
                {PRIMARY_CTA}
              </a>
            </Button>{" "}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 w-full rounded-full px-5 text-base lg:w-auto lg:px-6"
            >
              <a
                href="#pitanja"
                className="justify-center text-center"
                data-cta="hero-questions"
              >
                <ArrowDown className="size-4" />
                {SECONDARY_CTA}
              </a>
            </Button>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-6 font-medium text-muted-foreground">
            Uvodni razgovor je bez naknade i bez obveze. Ne upravljam
            sredstvima, ne prognoziram cijenu i ne tražim seed phrase, privatne
            ključeve ni pristup novčaniku.
          </p>
        </div>
        <BitcoinStressTestVisual />
      </div>
    </section>
  )
}
