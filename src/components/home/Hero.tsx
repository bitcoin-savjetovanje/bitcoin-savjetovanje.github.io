import { ArrowUpRight, CalendarDays } from "lucide-react"

import { BitcoinStressTestVisual } from "@/components/home/BitcoinStressTestVisual"
import { Button } from "@/components/ui/button"
import { BOOKING_URL, EMAIL, PRIMARY_CTA, SECONDARY_CTA } from "@/content/site"

export function Hero() {
  return (
    <section className="hero-section border-b border-border/70">
      <div className="hero-shell">
        <div className="hero-copy">
          <h1 className="hero-title">
            Imate Bitcoin. Ali imate li Bitcoin standard?
          </h1>
          <p className="hero-subtitle">
            Ako pad cijene stvara paniku, ako dug odlučuje umjesto nas, ako ne
            znate što je stvarni višak ili ako obitelj ne zna plan, problem nije
            Bitcoin. Problem je sustav oko njega.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/80">
            Pomažem vam provjeriti i izgraditi osobna pravila za proračun nulte
            osnove, život bez duga, darivanje, Bitcoin kao novac, kupovnu moć,
            neto imovinu, sigurnost i obiteljski pristup.
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
                data-cta="hero-standard-check"
              >
                <CalendarDays className="size-4" />
                {PRIMARY_CTA}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 w-full rounded-full border-border/80 bg-background/70 px-5 text-base sm:w-auto sm:px-6"
            >
              <a href="#provjera" data-cta="hero-where-you-stand">
                {SECONDARY_CTA}
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            15 minuta. Bez naknade. Bez prognoza cijene. Bez upravljanja vašim
            sredstvima.
          </p>
          <a
            className="mt-6 inline-block text-sm font-semibold break-all text-muted-foreground hover:text-primary sm:break-normal"
            href={`mailto:${EMAIL}`}
            data-link="hero-email"
          >
            Ili pišite izravno: {EMAIL}
          </a>
        </div>
        <BitcoinStressTestVisual />
      </div>
    </section>
  )
}
