import {
  ArrowUpRight,
  CalendarDays,
  ClipboardList,
  MessageCircle,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { offers } from "@/content/offers"

const offerIcons = {
  "Uvodni razgovor": MessageCircle,
  "Bitcoin konzultacija": ClipboardList,
  "Osobni Bitcoin standard": Star,
} as const

export function OffersSection() {
  return (
    <section id="ponude" className="section-shell">
      <div className="offer-section-panel offers-editorial-grid">
        <div className="offers-editorial-copy">
          <p className="section-kicker">Uvodni razgovor</p>
          <h2>
            U 15 minuta ne gradimo cijeli sustav. Pronalazimo prvo usko grlo.
          </h2>
          <p>Zatim birate sljedeći korak.</p>
        </div>

        <ol className="offer-path" aria-label="Mogući nastavci">
          {offers.map((offer) => {
            const Icon = offerIcons[offer.title as keyof typeof offerIcons]

            return (
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
                  } ${
                    offer.title === "Uvodni razgovor" ? "offer-card--intro" : ""
                  }`}
                >
                  <span className="offer-card__icon" aria-hidden="true">
                    <Icon className="size-7" />
                  </span>
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
                  <ul className="offer-cta-list">
                    <li>
                      <Button
                        asChild
                        className="cta-primary h-auto min-h-8 max-w-full rounded-md px-4 py-2 whitespace-normal"
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
            )
          })}
        </ol>
      </div>
    </section>
  )
}
