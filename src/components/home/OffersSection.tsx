import { ArrowUpRight, CalendarDays, Check } from "lucide-react"

import { StoneSymbol } from "@/components/home/StoneSymbol"
import { Button } from "@/components/ui/button"
import { offers } from "@/content/offers"

const offerVisuals = {
  "offer-intro-call": {
    eyebrow: "Početak",
    imageSrc: "/images/stone-symbols/offer-intro-call.webp",
    fallbackSrc: "/images/medallions/26-mentorstvo.png",
    visualBrief:
      "Mali kameni ulazni marker, otvorena pločica ili kalendar s jednim označenim poljem.",
  },
  "offer-bitcoin-consultation": {
    eyebrow: "Jedno usko grlo",
    imageSrc: "/images/stone-symbols/offer-consultation.webp",
    fallbackSrc: "/images/medallions/12-proracun-i-plan.png",
    visualBrief:
      "Kamena radna ploča s urezanom listom, jednim označenim problemom i suptilnim Bitcoin tragom.",
  },
  "offer-personal-standard": {
    eyebrow: "Cijeli sustav",
    imageSrc: "/images/stone-symbols/offer-personal-standard.webp",
    fallbackSrc: "/images/medallions/17-primarni-novac.png",
    visualBrief:
      "Dovršena kamena knjiga, pisani standard ili arhitektonska ploča s pečatom.",
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
          <StoneSymbol
            imageSrc="/images/stone-symbols/bottleneck-stone-channel.webp"
            fallbackSrc="/images/medallions/21-stvarni-visak.png"
            variant="bottleneck"
            className="offers-bottleneck-visual"
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
                  <StoneSymbol
                    imageSrc={visual.imageSrc}
                    fallbackSrc={visual.fallbackSrc}
                    variant="offer"
                    className="offer-card-visual"
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
