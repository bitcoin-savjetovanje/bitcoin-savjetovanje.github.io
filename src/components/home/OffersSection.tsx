import { CalendarDays, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { programOutcomes } from "@/content/home"
import { offers } from "@/content/offers"
import { BOOKING_URL } from "@/content/site"

const offerCtaAttributes: Record<string, string> = {
  "15-minutni uvodni razgovor": "intro-call-primary",
  "Dubinska provjera osobnog Bitcoin standarda": "offers-paid-standard-check",
  "Izgradnja osobnog Bitcoin standarda": "program-intro-call",
}

export function OffersSection() {
  const mainProgram = offers.find(
    (offer) => offer.title === "Izgradnja osobnog Bitcoin standarda"
  )
  const introOffer = offers.find(
    (offer) => offer.title === "15-minutni uvodni razgovor"
  )
  const deepCheckOffer = offers.find(
    (offer) => offer.title === "Dubinska provjera osobnog Bitcoin standarda"
  )

  if (!mainProgram) {
    return null
  }

  const entryOffers = [introOffer, deepCheckOffer].filter(Boolean)

  return (
    <section id="program" className="section-shell section-muted">
      <div className="case-panel border-primary/25 bg-card">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.7fr)] lg:items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Glavni program
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
              {mainProgram.title}
            </h2>
            <p className="mt-4 text-base leading-7 font-semibold text-foreground">
              {`${mainProgram.duration} · ${mainProgram.price}`}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              Za ljude koji ne žele samo još jedan razgovor o Bitcoinu, nego
              pisana pravila za vlastiti život.
            </p>
            <div className="program-summary">
              <p>Na kraju imate:</p>
              <ul className="mt-4 grid gap-2 text-base leading-7 font-medium text-foreground sm:grid-cols-2">
                {programOutcomes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="positive-icon mt-1 size-3.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button asChild className="cta-primary mt-6 rounded-full">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={offerCtaAttributes[mainProgram.title]}
              >
                <CalendarDays className="size-4" />
                Prvo dogovorite 15-minutni uvodni razgovor
              </a>
            </Button>
          </div>
          <aside className="rounded-2xl border border-border/80 bg-background/70 p-5 shadow-sm sm:p-6">
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Prije programa
            </p>
            <ol className="mt-5 grid gap-3">
              {entryOffers.map((offer, index) =>
                offer ? (
                  <li key={offer.title} className="program-card bg-card">
                    <span className="text-sm font-semibold text-muted-foreground">
                      {index === 0 ? "Prvi korak" : "Srednji korak"}
                    </span>
                    <div className="mt-3 flex items-start justify-between gap-4">
                      <h3 className="text-lg">{offer.title}</h3>
                      <strong className="price-badge price-badge--soft">
                        {offer.price}
                      </strong>
                    </div>
                    <p>{offer.detail}</p>
                  </li>
                ) : null
              )}
            </ol>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Dubinska provjera od 200 € može biti dovoljna ako ne trebate
              cijeli pisani program.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
