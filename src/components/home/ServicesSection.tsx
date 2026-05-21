import { StoneSymbol } from "@/components/home/StoneSymbol"
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
  iconSrc: string
}

const services: ServiceCard[] = [
  {
    title: "Uvodni razgovor",
    price: "0 €",
    copy: "15 minuta da se upoznamo, razumijemo kontekst i vidimo je li suradnja smislena.",
    primaryCta: "Dogovorite razgovor",
    primaryHref: CONVERSATION_PATH,
    dataCta: "service-intro-call",
    iconSrc: "/images/medallions/26-mentorstvo.png",
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
    iconSrc: "/images/medallions/14-edukacija.png",
  },
  {
    title: "Osobni Bitcoin standard",
    price: "1.500 €",
    copy: "Cjelovit, pisani okvir vašeg sustava: pravila, procesi i plan za provedbu u vašem životu ili poslovanju.",
    primaryCta: "Krenite od uvodnog razgovora",
    primaryHref: CONVERSATION_PATH,
    dataCta: "service-personal-standard-intro-call",
    detailHref: PERSONAL_BITCOIN_STANDARD_PATH,
    detailLabel: "Pogledajte detalje",
    dataLink: "service-personal-standard-details",
    iconSrc: "/images/medallions/12-proracun-i-plan.png",
  },
]

export function ServicesSection() {
  return (
    <section id="ponude" className="editorial-section services-section">
      <div className="services-intro-copy">
        <h2>
          <span>U 15 minuta ne gradimo</span> <span>cijeli sustav.</span>{" "}
          <span>Pronalazimo prvo usko grlo.</span>
        </h2>
        <p>
          Ne morate sami izabrati paket. Uvodni razgovor služi tome da vidimo je
          li dovoljan kratak odgovor, jedan dubinski razgovor ili cjelovit
          osobni Bitcoin standard.
        </p>
      </div>

      <div className="services-card-grid" aria-label="Usluge">
        {services.map(
          ({
            copy,
            dataCta,
            dataLink,
            detailHref,
            detailLabel,
            iconSrc,
            price,
            primaryCta,
            primaryHref,
            title,
          }) => (
            <article key={title} className="service-card">
              <StoneSymbol
                imageSrc={iconSrc}
                className="stone-symbol--medium service-stone-symbol"
              />
              <div className="service-card__heading">
                <h3>{title}</h3>
                <strong>{price}</strong>
              </div>
              <p>{copy}</p>
              <Button asChild variant="outline" className="home-outline-button">
                <a href={primaryHref} data-cta={dataCta}>
                  {primaryCta}
                </a>
              </Button>
              {detailHref && detailLabel && dataLink ? (
                <a
                  href={detailHref}
                  className="service-card__details-link"
                  data-link={dataLink}
                >
                  {detailLabel}
                </a>
              ) : null}
            </article>
          )
        )}
      </div>
    </section>
  )
}
