import { CalendarDays, Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { offers } from "@/content/offers"

export function OffersSection() {
  return (
    <section id="ponude" className="section-shell section-muted">
      <div className="case-panel border-primary/25 bg-card">
        <SectionHeader
          title="Ako nakon uvodnog razgovora postoji jasan sljedeći korak, postoje dva plaćena puta."
          copy="Uvodni razgovor služi tome da vidimo vrijedi li uopće raditi dublje. Ako vrijedi, plaćeni rad može biti jedan dubinski razgovor ili izgradnja pisanog osobnog Bitcoin standarda."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.title}
              className="program-card bg-background/70"
            >
              <div className="mt-4 flex items-start justify-between gap-4">
                <h3>{offer.title}</h3>
                <strong className="price-badge price-badge--soft">
                  {offer.price}
                </strong>
              </div>
              {offer.duration ? (
                <p className="mt-3 text-sm font-semibold text-muted-foreground">
                  {offer.duration}
                </p>
              ) : null}
              {offer.badge ? (
                <p className="mt-3 inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {offer.badge}
                </p>
              ) : null}
              <p>{offer.detail}</p>
              <ul className="mt-6 grid gap-3 text-base leading-7 text-muted-foreground">
                {offer.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="positive-icon mt-1 size-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="cta-primary mt-6 rounded-full">
                <a
                  href={offer.href}
                  className="justify-center text-center"
                  data-cta={offer.dataCta}
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
