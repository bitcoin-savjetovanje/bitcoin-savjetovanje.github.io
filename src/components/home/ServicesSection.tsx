import { ArrowUpRight, CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  BITCOIN_CONSULTATION_PATH,
  CONVERSATION_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"

type ServiceCard = {
  title: string
  price: string
  copy: string
  primaryCta: string
  primaryHref: string
  dataCta: string
  detailHref?: string
  detailLabel?: string
  dataLink?: string
  visual: {
    eyebrow: string
    image: string
  }
}

const services: ServiceCard[] = [
  {
    title: "Uvodni razgovor",
    price: "0 €",
    copy: "15 minuta da se upoznamo, razumijemo kontekst i vidimo je li suradnja smislena.",
    primaryCta: "Dogovorite razgovor",
    primaryHref: CONVERSATION_PATH,
    dataCta: "service-intro-call",
    visual: {
      eyebrow: "Početak",
      image: "/images/stone-symbols/offer-intro-call.webp",
    },
  },
  {
    title: "Bitcoin konzultacija",
    price: "200 €",
    copy: "60 minuta rada na vašem kontekstu. Jasni prijedlozi i konkretni koraci koje možete odmah primijeniti.",
    primaryCta: "Krenite od uvodnog razgovora",
    primaryHref: CONVERSATION_PATH,
    dataCta: "service-consultation-intro-call",
    detailHref: BITCOIN_CONSULTATION_PATH,
    detailLabel: "Pogledajte detalje",
    dataLink: "service-consultation-details",
    visual: {
      eyebrow: "Jedno usko grlo",
      image: "/images/stone-symbols/offer-consultation.webp",
    },
  },
  {
    title: "Osobni Bitcoin standard",
    price: "1.500 EUR",
    copy: "Cjelovit, pisani okvir vašeg sustava: pravila, procesi i plan za provedbu u vašem životu ili poslovanju.",
    primaryCta: "Krenite od uvodnog razgovora",
    primaryHref: CONVERSATION_PATH,
    dataCta: "service-personal-standard-intro-call",
    detailHref: PERSONAL_BITCOIN_STANDARD_PATH,
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
          aria-label="Usluge"
        >
          {services.map(
            ({
              copy,
              dataCta,
              dataLink,
              detailHref,
              detailLabel,
              price,
              primaryCta,
              primaryHref,
              title,
              visual,
            }) => (
              <article
                key={title}
                className={`service-card offer-card ${
                  dataCta === "service-intro-call" ? "offer-card--intro" : ""
                } ${
                  dataCta === "service-consultation-intro-call"
                    ? "offer-card--featured"
                    : ""
                } ${
                  dataCta === "service-personal-standard-intro-call"
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
                  <h3>{title}</h3>
                  <strong className="offer-card-price">{price}</strong>
                </div>
                <p>{copy}</p>
                <ul className="offer-card-actions">
                  <li>
                    <Button
                      asChild
                      variant="outline"
                      className="home-outline-button"
                    >
                      <a href={primaryHref} data-cta={dataCta}>
                        <CalendarDays className="size-4" aria-hidden="true" />
                        {primaryCta}
                      </a>
                    </Button>
                  </li>
                  {detailHref && detailLabel && dataLink ? (
                    <li>
                      <a
                        href={detailHref}
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
          )}
        </div>
      </div>
    </section>
  )
}
