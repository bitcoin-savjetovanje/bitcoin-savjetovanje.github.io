import { IconMedallion } from "@/components/home/IconMedallion"
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
  cta: string
  href: string
  dataCta: string
  iconSrc: string
}

const services: ServiceCard[] = [
  {
    title: "Uvodni razgovor",
    price: "0 €",
    copy: "15 minuta da se upoznamo, razumijemo kontekst i vidimo je li suradnja smislena.",
    cta: "Dogovorite razgovor",
    href: CONVERSATION_PATH,
    dataCta: "service-intro-call",
    iconSrc: "/images/medallions/26-mentorstvo.png",
  },
  {
    title: "Bitcoin konzultacija",
    price: "200 €",
    copy: "60 minuta rada na vašem kontekstu. Jasni prijedlozi i konkretni koraci koje možete odmah primijeniti.",
    cta: "Saznajte više",
    href: BITCOIN_CONSULTATION_PATH,
    dataCta: "service-consultation",
    iconSrc: "/images/medallions/14-edukacija.png",
  },
  {
    title: "Osobni Bitcoin standard",
    price: "1.500 €",
    copy: "Cjelovit, pisani okvir vašeg sustava: pravila, procesi i plan za provedbu u vašem životu ili poslovanju.",
    cta: "Saznajte više",
    href: PERSONAL_BITCOIN_STANDARD_PATH,
    dataCta: "service-personal-standard",
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
        <p>Zatim birate sljedeći korak.</p>
      </div>

      <div className="services-card-grid" aria-label="Usluge">
        {services.map(({ copy, cta, dataCta, href, iconSrc, price, title }) => (
          <article key={title} className="service-card">
            <IconMedallion
              imageSrc={iconSrc}
              className="service-card__medallion"
            />
            <div className="service-card__heading">
              <h3>{title}</h3>
              <strong>{price}</strong>
            </div>
            <p>{copy}</p>
            <Button asChild variant="outline" className="home-outline-button">
              <a href={href} data-cta={dataCta}>
                {cta}
              </a>
            </Button>
          </article>
        ))}
      </div>
    </section>
  )
}
