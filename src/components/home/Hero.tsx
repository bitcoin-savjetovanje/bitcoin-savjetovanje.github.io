import { ArrowUpRight, CalendarDays, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BOOKING_URL, EMAIL, PRIMARY_CTA, heroOutcomes } from "@/content/site"

function PlanVisual() {
  const rows = [
    "Uspostava i provedba proračuna nulte razine.",
    "Strategija upravljanja dugovanjem.",
    "Organizacija Bitcoina unutar sveukupne imovine.",
  ]

  return (
    <div className="plan-visual" aria-hidden="true">
      <div className="plan-visual__card">
        <div className="plan-visual__header">
          <div>
            <p className="plan-visual__eyebrow">Praktični Bitcoin standard</p>
            <h2>Okvir za odluke</h2>
            <p>Okvir za Bitcoin unutar cjelokupne imovine.</p>
          </div>
          <div className="plan-visual__bitcoin-mark">
            <img src="/bitcoin-logo.png" alt="" />
          </div>
        </div>
        <div className="plan-visual__rows">
          {rows.map((row) => (
            <div key={row} className="plan-visual__row">
              <Check className="plan-visual__check" />
              <span>{row}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero-section border-b border-border/70">
      <div className="hero-shell">
        <div className="hero-copy">
          <h1 className="hero-title">Imate Bitcoin. Sada trebate pravila.</h1>
          <p className="hero-subtitle">
            Pomažem vam povezati Bitcoin s ostalom imovinom u jasan sustav.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/80">
            Ne radi se o savjetovanju o trgovanju ili kratkoročnim prognozama
            cijene Bitcoina, nego o tome kako Bitcoin tretirati kao primarni
            novac unutar sveukupne neto imovine.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="cta-primary h-12 rounded-full px-6 text-base"
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="hero-booking"
              >
                <CalendarDays className="size-4" />
                {PRIMARY_CTA}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-border/80 bg-background/70 px-6 text-base"
            >
              <a href="#metoda" data-link="hero-method">
                Pogledajte metodu
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Bez naknade. Bez obveze. Cilj je vidjeti ima li smisla nastaviti.
          </p>
          <div className="mt-6">
            <p className="text-sm font-semibold text-foreground">
              Nakon rada imate:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {heroOutcomes.map((outcome) => (
                <span key={outcome} className="hero-benefit">
                  {outcome}
                </span>
              ))}
            </div>
          </div>
          <a
            className="mt-5 inline-block text-sm font-semibold text-muted-foreground hover:text-primary"
            href={`mailto:${EMAIL}`}
            data-link="hero-email"
          >
            Ili pišite izravno: {EMAIL}
          </a>
        </div>
        <PlanVisual />
      </div>
    </section>
  )
}
