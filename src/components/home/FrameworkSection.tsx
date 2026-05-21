import { IconMedallion } from "@/components/home/IconMedallion"
import {
  BUDGET_PATH,
  CUSTODY_SECURITY_PATH,
  DEBT_PATH,
  GIVING_PATH,
  NET_WORTH_PATH,
  TIME_VOLATILITY_PATH,
} from "@/content/site"

type FrameworkCard = {
  number: string
  href?: string
  iconSrc: string
  lines: string[]
}

const frameworkCards: FrameworkCard[] = [
  {
    number: "01",
    href: BUDGET_PATH,
    iconSrc: "/images/medallions/16-proracun.png",
    lines: ["Proračun —", "vidjeti novac"],
  },
  {
    number: "02",
    href: DEBT_PATH,
    iconSrc: "/images/medallions/03-dug.png",
    lines: ["Dug —", "osloboditi", "budućnost"],
  },
  {
    number: "03",
    href: GIVING_PATH,
    iconSrc: "/images/medallions/04-davanje.png",
    lines: ["Davanje —", "otvoriti ruku"],
  },
  {
    number: "04",
    iconSrc: "/images/medallions/17-primarni-novac.png",
    lines: ["Bitcoin kao", "novac —", "primarni saldo"],
  },
  {
    number: "05",
    href: NET_WORTH_PATH,
    iconSrc: "/images/medallions/05-neto-imovina.png",
    lines: ["Neto imovina —", "bilanca kao", "cjelina"],
  },
  {
    number: "06",
    href: TIME_VOLATILITY_PATH,
    iconSrc: "/images/medallions/10-volatilnost-i-rast.png",
    lines: ["Vrijeme i", "volatilnost —", "pravila kroz", "cikluse"],
  },
  {
    number: "07",
    href: CUSTODY_SECURITY_PATH,
    iconSrc: "/images/medallions/15-sigurnost-i-nasljedivanje.png",
    lines: ["Sigurnost", "i obitelj —", "zaštititi pristup"],
  },
]

function FrameworkCardContent({ iconSrc, lines, number }: FrameworkCard) {
  return (
    <>
      <span className="editorial-card-number">{number}</span>
      <IconMedallion
        imageSrc={iconSrc}
        className="editorial-framework-medallion"
      />
      <h3 aria-label={lines.join(" ")}>
        {lines.map((line) => (
          <span key={line}>{line} </span>
        ))}
      </h3>
    </>
  )
}

export function FrameworkSection() {
  return (
    <section id="okvir" className="editorial-section framework-section">
      <h2>Okvir iz knjige: 7 područja koja treba urediti</h2>

      <div
        className="editorial-framework-grid"
        aria-label="Mapa osobnog Bitcoin standarda"
      >
        {frameworkCards.map((card) =>
          card.href ? (
            <a
              key={card.number}
              className="editorial-framework-card"
              data-bitcoin={card.number === "04" ? "true" : undefined}
              href={card.href}
            >
              <FrameworkCardContent {...card} />
            </a>
          ) : (
            <article
              key={card.number}
              className="editorial-framework-card"
              data-bitcoin={card.number === "04" ? "true" : undefined}
            >
              <FrameworkCardContent {...card} />
            </article>
          )
        )}
      </div>
    </section>
  )
}
