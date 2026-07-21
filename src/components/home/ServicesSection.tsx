import { ArrowUpRight, CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import { offerFacts, type OfferFacts, type OfferId } from "@/content/offers"

type ServiceCard = {
  id: OfferId
  facts: OfferFacts
  copy: string
  primaryCta: string
  dataCta: string
  detailLabel?: string
  dataLink?: string
  visual: {
    eyebrow: string
    image: string
  }
}

const services: ServiceCard[] = [
  {
    id: "introCall",
    facts: offerFacts.introCall,
    copy: "Da se upoznamo, razumijemo kontekst i vidimo je li suradnja smislena.",
    primaryCta: "Dogovorite razgovor",
    dataCta: "service-intro-call",
    visual: {
      eyebrow: "Početak",
      image: "/images/stone-symbols/offer-intro-call.webp",
    },
  },
  {
    id: "bitcoinConsultation",
    facts: offerFacts.bitcoinConsultation,
    copy: "Rad na vašem kontekstu, uz jasne prijedloge i konkretne korake koje možete odmah primijeniti.",
    primaryCta: "Krenite od uvodnog razgovora",
    dataCta: "service-consultation-intro-call",
    detailLabel: "Pogledajte detalje",
    dataLink: "service-consultation-details",
    visual: {
      eyebrow: "Jedno usko grlo",
      image: "/images/stone-symbols/offer-consultation.webp",
    },
  },
  {
    id: "personalStandard",
    facts: offerFacts.personalStandard,
    copy: "Privatna prioritizacija, stres-test, provedba i revizija odluka. Pisani standard na kraju bilježi proces i donesena pravila.",
    primaryCta: "Krenite od uvodnog razgovora",
    dataCta: "service-personal-standard-intro-call",
    detailLabel: "Pogledajte detalje",
    dataLink: "service-personal-standard-details",
    visual: {
      eyebrow: "Cijeli sustav",
      image: "/images/stone-symbols/offer-personal-standard.webp",
    },
  },
]

export function ServicesSection() {
  return (
    <section
      id="ponude"
      className="editorial-section services-section offers-section"
    >
      <div className="offers-layout">
        <div className="services-intro-copy offers-editorial">
          <h2>
            <span>U 15 minuta ne gradimo</span> <span>cijeli sustav.</span>{" "}
            <span>Pronalazimo prvo usko grlo.</span>
          </h2>
          <p>
            Ne morate sami izabrati paket. Uvodni razgovor služi tome da vidimo
            je li dovoljan kratak odgovor, jedan dubinski razgovor ili cjelovit
            osobni Bitcoin standard.
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

        <div
          className="services-card-grid offers-card-grid"
          role="group"
          aria-label="Usluge"
        >
          {services.map(
            ({
              copy,
              dataCta,
              dataLink,
              detailLabel,
              facts,
              id,
              primaryCta,
              visual,
            }) => {
              const { bookingHref, detailsHref, duration, price, title } = facts

              return (
                <article
                  key={id}
                  className={`service-card offer-card ${
                    id === "introCall" ? "offer-card--intro" : ""
                  } ${
                    id === "bitcoinConsultation" ? "offer-card--featured" : ""
                  } ${id === "personalStandard" ? "offer-card--standard" : ""}`}
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
                    <h3>{title}</h3>
                    <strong className="offer-card-price">{price}</strong>
                  </div>
                  <p className="offer-card-duration">{duration}</p>
                  <p>{copy}</p>
                  <ul className="offer-card-actions">
                    <li>
                      <Button
                        asChild
                        variant="outline"
                        className="home-outline-button"
                      >
                        <a href={bookingHref} data-cta={dataCta}>
                          <CalendarDays className="size-4" aria-hidden="true" />
                          {primaryCta}
                        </a>
                      </Button>
                    </li>
                    {detailsHref && detailLabel && dataLink ? (
                      <li>
                        <a
                          href={detailsHref}
                          className="offer-card__details-link"
                          data-link={dataLink}
                        >
                          {detailLabel}
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </article>
              )
            }
          )}
        </div>
      </div>
    </section>
  )
}
