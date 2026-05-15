import { ArrowUpRight, CalendarDays, Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { offers } from "@/content/offers"

export function OffersSection() {
  const [introOffer, ...paidOffers] = offers

  return (
    <section id="ponude" className="section-shell section-muted">
      <div className="case-panel border-primary/25 bg-card">
        <SectionHeader
          title="Tri moguća nastavka"
          copy="Uvodni razgovor služi tome da vidimo treba li kratak odgovor, Bitcoin konzultacija ili rad na pisanom osobnom Bitcoin standardu."
        />
        {introOffer ? (
          <article className="offer-card offer-card--intro mt-10">
            <span className="offer-step" aria-hidden="true" />
            <div className="offer-card__heading">
              <div>
                <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Prvi korak
                </p>
                <h3 className="mt-2">{introOffer.title}</h3>
              </div>
              <strong className="price-badge price-badge--soft">
                {introOffer.price}
              </strong>
            </div>
            {introOffer.duration ? (
              <p className="mt-3 text-sm font-semibold text-muted-foreground">
                {introOffer.duration}
              </p>
            ) : null}
            <p>{introOffer.detail}</p>
            <ul className="mt-6 grid gap-3 text-base leading-7 text-muted-foreground">
              {introOffer.includes.map((item) => (
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
                    href={introOffer.href}
                    className="min-w-0 justify-center text-center leading-tight"
                    data-cta={introOffer.dataCta}
                  >
                    <CalendarDays className="size-4" />
                    {introOffer.cta}
                  </a>
                </Button>
              </li>
            </ul>
          </article>
        ) : null}

        <div className="mt-10">
          <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Ako vrijedi ići dublje
          </p>
          <ol
            className="offer-path offer-path--paid mt-5"
            aria-label="Plaćeni nastavci"
          >
            {paidOffers.map((offer) => (
              <li key={offer.title} className="offer-path__item">
                <article
                  className={`offer-card ${
                    offer.title === "Bitcoin konzultacija"
                      ? "offer-card--featured"
                      : ""
                  }`}
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
                          <span aria-hidden="true" className="sr-only">
                            {" "}
                          </span>
                        </a>
                      </Button>
                    </li>
                    {offer.detailLink ? (
                      <li>
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
      </div>
    </section>
  )
}
