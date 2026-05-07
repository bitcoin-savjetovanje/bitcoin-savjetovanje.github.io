import { CalendarDays } from "lucide-react"

import { BitcoinStressTestVisual } from "@/components/home/BitcoinStressTestVisual"
import { Button } from "@/components/ui/button"
import { BOOKING_URL, PRIMARY_CTA } from "@/content/site"

export function Hero() {
  return (
    <section className="hero-section border-b border-border/70">
      <div className="hero-shell">
        <div className="hero-copy">
          <h1 className="hero-title">Imate Bitcoin. Sada trebate pravila.</h1>
          <p className="hero-subtitle">
            Bitcoin nije problem. Problem je kada odluke o novcu, dugu,
            troškovima, sigurnosti i obitelji nisu zapisane prije pritiska.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/80">
            Pomažem vam izgraditi osobni Bitcoin standard: jasan skup pravila za
            proračun, dug, davanje, Bitcoin kao novac, neto imovinu i obiteljski
            pristup.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="cta-primary h-12 w-full rounded-full px-5 text-base sm:w-auto sm:px-6"
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="hero-intro-call"
              >
                <CalendarDays className="size-4" />
                {PRIMARY_CTA}
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            15 minuta. Bez naknade. Bez obveze.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-6 font-medium text-muted-foreground">
            Bez prognoza cijene. Bez upravljanja vašim sredstvima. Bez traženja
            početnih riječi.
          </p>
        </div>
        <BitcoinStressTestVisual />
      </div>
    </section>
  )
}
