import { CalendarDays, Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { offers } from "@/content/offers"
import { BOOKING_URL } from "@/content/site"

const offerCtaAttributes: Record<string, string> = {
  "Uvodni razgovor": "offers-intro",
  "Savjetodavni razgovor": "offers-paid-call",
  "Strukturirani program": "offers-program",
}

export function OffersSection() {
  return (
    <section id="program" className="section-shell">
      <SectionHeader
        title="Prvi korak je 15 minuta."
        copy="Ne morate odmah znati koji program trebate. U razgovoru vidimo gdje ste u odnosu na Praktični Bitcoin standard: proračun, dug, darivanje, Bitcoin, imovina i sigurnost."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {offers.map((offer) => (
          <article key={offer.title} className="process-card">
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
            <p>{offer.purpose}</p>
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
      <p className="negative-note mt-6">
        Ne upravljam vašim novcem, ne kupujem Bitcoin za vas, ne čuvam vaše
        ključeve i ne dajem porezno, pravno ili licencirano investicijsko
        mišljenje.
      </p>
    </section>
  )
}
