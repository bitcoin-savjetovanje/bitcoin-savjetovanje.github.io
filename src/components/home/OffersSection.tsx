import { CalendarDays, Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { programSteps } from "@/content/method"
import { offers } from "@/content/offers"
import { BOOKING_URL } from "@/content/site"

const offerCtaAttributes: Record<string, string> = {
  "Uvodna provjera": "offers-intro-standard-check",
  "Dubinska provjera osobnog Bitcoin standarda": "offers-paid-standard-check",
  "Izgradnja osobnog Bitcoin standarda": "program-standard-check",
}

export function OffersSection() {
  const mainProgram = offers.find(
    (offer) => offer.title === "Izgradnja osobnog Bitcoin standarda"
  )

  if (!mainProgram) {
    return null
  }

  const entryOffers = offers.filter(
    (offer) => offer.title !== mainProgram.title
  )

  return (
    <section id="program" className="section-shell section-muted">
      <div className="case-panel border-primary/25 bg-card">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Glavni program
            </p>
            <SectionHeader
              title={mainProgram.title}
              copy={`${mainProgram.duration} · ${mainProgram.price}. ${mainProgram.purpose}`}
            />
            <div className="program-summary">
              <p>
                Na kraju imate pisani osobni Bitcoin standard: dokument s
                pravilima koja možete koristiti, preispitivati i objasniti
                obitelji.
              </p>
            </div>
            <Button asChild className="cta-primary mt-6 rounded-full">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={offerCtaAttributes[mainProgram.title]}
              >
                <CalendarDays className="size-4" />
                {mainProgram.cta}
              </a>
            </Button>
          </div>
          <div className="rounded-2xl border border-border/80 bg-background/70 p-5 shadow-sm sm:p-6">
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Vremenski proces
            </p>
            <ol className="mt-5 grid gap-3">
              {programSteps.map((step) => (
                <li key={step.title} className="program-card bg-card">
                  <h3 className="text-lg">{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border/80 bg-background/70 p-5 shadow-sm sm:p-6 lg:p-8">
        <div className="max-w-3xl">
          <h3 className="text-2xl font-semibold tracking-[-0.015em]">
            Niste sigurni jeste li spremni za cijeli program?
          </h3>
          <p className="mt-3 text-base leading-8 text-muted-foreground">
            Krenite manjom provjerom. Cilj je vidjeti gdje ste, što je nejasno i
            treba li uopće graditi cijeli pisani standard.
          </p>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {entryOffers.map((offer) => (
            <article key={offer.title} className="process-card bg-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3>{offer.title}</h3>
                  {offer.duration ? (
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {offer.duration}
                    </p>
                  ) : null}
                </div>
                <strong className="price-badge price-badge--strong">
                  {offer.price}
                </strong>
              </div>
              <div className="mt-5 grid gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    Za koga
                  </p>
                  <p className="mt-2 text-base leading-7 text-foreground">
                    {offer.forWhom}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    Okvir
                  </p>
                  <p className="mt-2 text-base leading-7 text-foreground">
                    {offer.detail}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    Što dobijete
                  </p>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    {offer.purpose}
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-muted-foreground">
                {offer.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="positive-icon mt-1 size-3.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="cta-primary mt-6 w-full rounded-full">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="justify-center text-center"
                  data-cta={offerCtaAttributes[offer.title]}
                >
                  <CalendarDays className="size-4" />
                  {offer.cta}
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
