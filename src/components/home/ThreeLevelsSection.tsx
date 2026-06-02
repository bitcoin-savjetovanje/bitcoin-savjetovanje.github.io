import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  BUSINESS_AUDIENCE_PATH,
  FAMILY_AUDIENCE_PATH,
  PERSONAL_AUDIENCE_PATH,
} from "@/content/site"

const levels = [
  {
    label: "OSOBNO",
    copy: "Urediti proračun, dug, stvarni višak, neto imovinu i reakcije na volatilnost.",
    href: PERSONAL_AUDIENCE_PATH,
    image: "/images/stone-symbols/audience-personal.webp",
    dataLink: "home-personal-audience",
  },
  {
    label: "OBITELJSKI",
    copy: "Uskladiti jezik, sigurnost, prvi korak oporavka i nasljeđivanje.",
    href: FAMILY_AUDIENCE_PATH,
    image: "/images/stone-symbols/audience-family.webp",
    dataLink: "home-family-audience",
  },
  {
    label: "POSLOVNO",
    copy: "Razdvojiti poslovni novac, obveze, pričuvu, višak i Bitcoin riznicu.",
    href: BUSINESS_AUDIENCE_PATH,
    image: "/images/stone-symbols/audience-business.webp",
    dataLink: "home-business-audience",
  },
]

const levelCtas = [
  {
    label: "Osobni put",
    href: PERSONAL_AUDIENCE_PATH,
    dataLink: "home-personal-audience-cta",
  },
  {
    label: "Obiteljski put",
    href: FAMILY_AUDIENCE_PATH,
    dataLink: "home-family-audience-cta",
  },
  {
    label: "Poslovni put",
    href: BUSINESS_AUDIENCE_PATH,
    dataLink: "home-business-audience-cta",
  },
]

export function ThreeLevelsSection() {
  return (
    <section className="editorial-section editorial-levels-section three-levels-section">
      <div className="three-levels-header">
        <h2>Tri razine. Jedan princip.</h2>
        <p className="three-levels-subtitle">
          Isti okvir odluka prilagođava se osobi, obitelji ili poslovnom
          kontekstu.
        </p>
      </div>

      <div className="three-levels-frieze">
        {levels.map(({ copy, dataLink, href, image, label }, index) => (
          <a
            key={label}
            href={href}
            className="three-levels-item"
            data-link={dataLink}
          >
            <img
              className="three-levels-stone-image"
              src={image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <div>
              <h3 className="three-levels-label">{label}</h3>
              <p className="three-levels-copy">{copy}</p>
            </div>
            {index < levels.length - 1 ? (
              <span className="three-levels-separator" aria-hidden="true" />
            ) : null}
          </a>
        ))}
      </div>

      <div className="three-levels-cta">
        <p>
          Odaberite kontekst koji vam je najbliži. Ako niste sigurni, krenite od
          uvodnog razgovora.
        </p>
        <div className="three-levels-actions">
          {levelCtas.map((cta) => (
            <Button
              key={cta.href}
              asChild
              variant="outline"
              className="three-levels-action-button"
            >
              <a href={cta.href} data-link={cta.dataLink}>
                {cta.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
