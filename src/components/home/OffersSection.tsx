import { CalendarDays, Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { programSteps } from "@/content/method"
import { offers } from "@/content/offers"
import { BOOKING_URL } from "@/content/site"

const offerCtaAttributes: Record<string, string> = {
  "Uvodna provjera": "offers-intro-standard-check",
  "Provjera osobnog Bitcoin standarda": "offers-paid-standard-check",
  "Izgradnja osobnog Bitcoin standarda": "program-standard-check",
}

export function OffersSection() {
  return (
    <section id="program" className="section-shell section-muted">
      <div className="grid gap-10 lg:grid-cols-[0.84fr_1fr] lg:items-start">
        <div>
          <SectionHeader
            title="Izgradnja osobnog Bitcoin standarda"
            copy="4–6 tjedana · 1.500 €. Ne dobivate prognozu cijene. Ne dobivate uputu za trgovanje. Dobivate pisana pravila za novac, dug, darivanje, Bitcoin, kupovnu moć, neto imovinu, sigurnost i obitelj."
          />
          <div className="program-summary">
            <p>
              Na kraju imate pisani osobni Bitcoin standard: dokument s
              pravilima koja možete koristiti, preispitivati i objasniti
              obitelji.
            </p>
          </div>
        </div>
        <div className="case-panel bg-card">
          <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Vremenski proces
          </p>
          <ol className="mt-5 grid gap-3">
            {programSteps.map((step) => (
              <li key={step.title} className="program-card bg-background/70">
                <h3 className="text-lg">{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {offers.map((offer) => {
          const isProgram =
            offer.title === "Izgradnja osobnog Bitcoin standarda"

          return (
            <article
              key={offer.title}
              className={`process-card ${isProgram ? "border-primary/45 bg-primary/5" : ""}`}
            >
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
          )
        })}
      </div>
    </section>
  )
}
