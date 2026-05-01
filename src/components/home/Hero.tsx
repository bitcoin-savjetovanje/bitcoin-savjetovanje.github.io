import { ArrowUpRight, CalendarDays } from "lucide-react"

import { StandardPathVisual } from "@/components/home/StandardPathVisual"
import { Button } from "@/components/ui/button"
import { BOOKING_URL, EMAIL } from "@/content/site"

export function Hero() {
  return (
    <section className="hero-section border-b border-border/70">
      <div className="hero-shell">
        <div className="hero-copy">
          <h1 className="hero-title">
            Imate Bitcoin? Izgradite osobni Bitcoin standard.
          </h1>
          <p className="hero-subtitle">
            Bitcoin ne treba stajati sa strane vašeg života. Pomažem vam
            napisati pravila za osobni proračun, dug, darivanje, Bitcoin kao
            novac, neto imovinu, sigurnost i obitelj.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/80">
            Bez prognoza cijene. Bez trgovanja. Bez upravljanja vašim
            sredstvima.
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
                data-cta="hero-booking"
              >
                <CalendarDays className="size-4" />
                Dogovorite uvodni razgovor
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 w-full rounded-full border-border/80 bg-background/70 px-5 text-base sm:w-auto sm:px-6"
            >
              <a href="#metoda" data-link="hero-method">
                Pogledajte redoslijed
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Uvodni razgovor je bez naknade i traje 15 minuta. Vidimo gdje ste i
            koji je sljedeći razuman korak.
          </p>
          <a
            className="mt-6 inline-block text-sm font-semibold break-all text-muted-foreground hover:text-primary sm:break-normal"
            href={`mailto:${EMAIL}`}
            data-link="hero-email"
          >
            Ili pišite izravno: {EMAIL}
          </a>
        </div>
        <StandardPathVisual />
      </div>
    </section>
  )
}
