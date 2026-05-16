import { ArrowUpRight, CalendarDays, Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { offers } from "@/content/offers"

export function OffersSection() {
  return (
    <section id="ponude" className="section-shell section-muted">
      <div className="offer-section-panel">
        <SectionHeader
          title="Ako vrijedi ići dublje"
          copy="Uvodni razgovor ne postoji da vas gura u plaćeni nastavak. Postoji da se vidi koji je sljedeći razuman korak."
        />

        <ol className="offer-path mt-10" aria-label="Mogući nastavci">
          {offers.map((offer) => (
            <li key={offer.title} className="offer-path__item">
              <article
                className={`offer-card ${
                  offer.title === "Bitcoin konzultacija"
                    ? "offer-card--featured"
                    : ""
                } ${
                  offer.title === "Osobni Bitcoin standard"
                    ? "offer-card--standard"
                    : ""
                } ${offer.title === "Uvodni razgovor" ? "offer-card--intro" : ""}`}
              >
                <span className="offer-step" aria-hidden="true" />
                <div className="offer-card__heading">
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
                <p>{offer.detail}</p>
                {offer.title === "Osobni Bitcoin standard" ? (
                  <div
                    className="standard-layers-preview"
                    aria-label="Tri sloja osobnog Bitcoin standarda"
                  >
                    <ol>
                      <li>
                        <strong>Novac i odluke</strong>
                      </li>
                      <li>
                        <strong>Imovina i posao</strong>
                      </li>
                      <li>
                        <strong>Sigurnost i prijenos</strong>
                      </li>
                    </ol>
                  </div>
                ) : null}
                <ul className="mt-6 grid gap-3 text-sm leading-6 text-muted-foreground">
                  {offer.includes.slice(0, 3).map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="positive-icon mt-1 size-4 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="offer-cta-list">
                  <li>
                    <Button
                      asChild
                      className="cta-primary h-auto min-h-8 max-w-full rounded-full px-4 py-2 whitespace-normal"
                    >
                      <a
                        href={offer.href}
                        className="min-w-0 justify-center text-center leading-tight"
                        data-cta={offer.dataCta}
                      >
                        <CalendarDays className="size-4" />
                        {offer.cta}
                      </a>
                    </Button>
                  </li>
                  {offer.detailLink ? (
                    <li>
                      <span className="sr-only"> ili </span>
                      <a
                        href={offer.detailLink.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
                        data-link={offer.detailLink.dataLink}
                      >
                        {offer.detailLink.label}
                        <ArrowUpRight className="size-4" />
                      </a>
                    </li>
                  ) : null}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
