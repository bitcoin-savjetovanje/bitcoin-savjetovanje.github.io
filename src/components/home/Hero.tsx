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
            Prijeđite iz “imam Bitcoin” u osobni Bitcoin standard.
          </h1>
          <p className="hero-subtitle">
            Nije dovoljno imati Bitcoin. Trebate plan za pad, rast, trošak, dug
            i obitelj — prije nego što vas život natjera da odlučujete pod
            pritiskom.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/80">
            Pomažem vam urediti pravila za život s Bitcoinom: namjenu novca,
            izlazak iz duga, davanje, ulogu Bitcoina, sigurnost, skrbništvo i
            obiteljski plan.
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
            15 minuta. Bez naknade.
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
