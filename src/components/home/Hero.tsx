import { ArrowUpRight, CalendarDays, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BOOKING_URL, EMAIL, PRIMARY_CTA, heroOutcomes } from "@/content/site"

function PlanVisual() {
  const rows = [
    "osobni proračun",
    "plan izlaska iz duga",
    "Bitcoin kao novac",
    "kupovna moć",
  ]

  return (
    <div className="plan-visual" aria-hidden="true">
      <div className="plan-visual__card">
        <div className="plan-visual__header">
          <div>
            <p className="plan-visual__eyebrow">Praktični Bitcoin standard</p>
            <h2>Osobni standard</h2>
            <p>Bitcoin, dug i proračun u jednom sustavu.</p>
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
          <h1 className="hero-title">
            Imate Bitcoin? Izgradite osobni Bitcoin standard.
          </h1>
          <p className="hero-subtitle">
            Bitcoin nije samo imovina koju držite. Bitcoin je novac. Pomažem vam
            urediti osobni proračun, ukloniti dug, odrediti ulogu Bitcoina,
            uskladiti kupovnu moć i napisati pravila za odluke kroz vrijeme.
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
                {PRIMARY_CTA}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 w-full rounded-full border-border/80 bg-background/70 px-5 text-base sm:w-auto sm:px-6"
            >
              <a href="#metoda" data-link="hero-method">
                Pogledajte metodu
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Uvodni razgovor je besplatan i traje 15 minuta. Vidimo gdje ste i
            koji je sljedeći razuman korak.
          </p>
          <div className="mt-6">
            <p className="text-sm font-semibold text-foreground">
              Nakon rada imate:
            </p>
            <div className="mt-3 grid gap-2 sm:flex sm:flex-wrap">
              {heroOutcomes.map((outcome) => (
                <span key={outcome} className="hero-benefit">
                  {outcome}
                </span>
              ))}
            </div>
          </div>
          <a
            className="mt-5 inline-block text-sm font-semibold break-all text-muted-foreground hover:text-primary sm:break-normal"
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
