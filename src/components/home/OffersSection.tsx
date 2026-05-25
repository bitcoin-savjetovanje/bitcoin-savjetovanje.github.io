import { ArrowUpRight, CalendarDays, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { offers } from "@/content/offers"

const offerVisuals = {
  "offer-intro-call": {
    eyebrow: "Početak",
    image: "/images/stone-symbols/offer-intro-call.webp",
  },
  "offer-bitcoin-consultation": {
    eyebrow: "Jedno usko grlo",
    image: "/images/stone-symbols/offer-consultation.webp",
  },
  "offer-personal-standard": {
    eyebrow: "Cijeli sustav",
    image: "/images/stone-symbols/offer-personal-standard.webp",
  },
} as const

type OfferVisualKey = keyof typeof offerVisuals

export function OffersSection() {
  return (
    <section id="ponude" className="section-shell section-muted offers-section">
      <div className="offer-section-panel offers-layout">
        <div className="offers-editorial">
          <h2>
            <span>U 15 minuta ne gradimo</span> <span>cijeli sustav.</span>{" "}
            <span>Pronalazimo prvo usko grlo.</span>
          </h2>
          <p>
            Uvodni razgovor ne postoji da vas gura u plaćeni nastavak. Postoji
            da se vidi koji je sljedeći razuman korak.
          </p>
          <img
            className="offers-bottleneck-stone-image"
            src="/images/stone-symbols/bottleneck-stone-channel.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>

        <ol
          className="offer-path offers-card-grid"
          aria-label="Mogući nastavci"
        >
          {offers.map((offer) => {
            const visual =
              offerVisuals[offer.dataCta as OfferVisualKey] ??
              offerVisuals["offer-intro-call"]

            return (
              <li key={offer.title} className="offer-path__item">
                <article
                  className={`offer-card ${
                    offer.dataCta === "offer-intro-call"
                      ? "offer-card--intro"
                      : ""
                  } ${
                    offer.dataCta === "offer-bitcoin-consultation"
                      ? "offer-card--featured"
                      : ""
                  } ${
                    offer.dataCta === "offer-personal-standard"
                      ? "offer-card--standard"
                      : ""
                  }`}
                >
                  <img
                    className="offer-stone-image"
                    src={visual.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="offer-card-eyebrow">{visual.eyebrow}</span>
                  <div className="offer-card__heading">
                    <h3>{offer.title}</h3>
                    <strong className="offer-card-price">{offer.price}</strong>
                  </div>
                  {offer.duration ? (
                    <p className="offer-card-duration">{offer.duration}</p>
                  ) : null}
                  <p>{offer.detail}</p>
                  <ul className="offer-card-includes">
                    {offer.includes.slice(0, 3).map((item) => (
                      <li key={item}>
                        <Check className="positive-icon" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="offer-card-actions">
                    <li>
                      <Button
                        asChild
                        variant="outline"
                        className="home-outline-button"
                      >
                        <a href={offer.href} data-cta={offer.dataCta}>
                          <CalendarDays className="size-4" aria-hidden="true" />
                          {offer.cta}
                        </a>
                      </Button>
                    </li>
                    {offer.detailLink ? (
                      <li>
                        <a
                          href={offer.detailLink.href}
                          className="offer-card__details-link"
                          data-link={offer.detailLink.dataLink}
                        >
                          {offer.detailLink.label}
                          <ArrowUpRight className="size-4" aria-hidden="true" />
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
