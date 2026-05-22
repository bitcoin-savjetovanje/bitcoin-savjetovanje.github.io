import { StoneSymbol } from "@/components/home/StoneSymbol"
import {
  BITCOIN_MONEY_PATH,
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
  area: "budget" | "debt" | "giving" | "bitcoin" | "worth" | "time" | "security"
  imageSrc: string
  fallbackSrc: string
  lines: string[]
  copy: string
  visualBrief: string
}

const frameworkCards: FrameworkCard[] = [
  {
    number: "01",
    href: BUDGET_PATH,
    area: "budget",
    imageSrc: "/images/stone-symbols/area-01-budget.webp",
    fallbackSrc: "/images/medallions/16-proracun.png",
    lines: ["Proračun —", "vidjeti novac"],
    copy: "Urediti vlastiti sustav odluka.",
    visualBrief:
      "Kamena ploča/clipboard s kategorijama, kvačicama i složenim žetonima.",
  },
  {
    number: "02",
    href: DEBT_PATH,
    area: "debt",
    imageSrc: "/images/stone-symbols/area-02-debt.webp",
    fallbackSrc: "/images/medallions/03-dug.png",
    lines: ["Dug —", "osloboditi", "budućnost"],
    copy: "Prekinuti krug duga i ojačati slobodu.",
    visualBrief: "Otvoreni kameni lanac ili slomljena karika na postolju.",
  },
  {
    number: "03",
    href: GIVING_PATH,
    area: "giving",
    imageSrc: "/images/stone-symbols/area-03-giving.webp",
    fallbackSrc: "/images/medallions/04-davanje.png",
    lines: ["Davanje —", "otvoriti ruku"],
    copy: "Izgraditi duh velikodušnosti.",
    visualBrief: "Otvorena kamena ruka s mladicom ili maslinovom grančicom.",
  },
  {
    number: "04",
    href: BITCOIN_MONEY_PATH,
    area: "bitcoin",
    imageSrc: "/images/stone-symbols/area-04-bitcoin-money.webp",
    fallbackSrc: "/images/medallions/17-primarni-novac.png",
    lines: ["Bitcoin kao", "novac —", "primarni saldo"],
    copy: "Koristiti Bitcoin kao osnovni novac.",
    visualBrief:
      "Centralni kameni Bitcoin simbol, najbliži hero slici, s toplim narančastim/zlatnim akcentom.",
  },
  {
    number: "05",
    href: NET_WORTH_PATH,
    area: "worth",
    imageSrc: "/images/stone-symbols/area-05-net-worth.webp",
    fallbackSrc: "/images/medallions/05-neto-imovina.png",
    lines: ["Neto imovina —", "bilanca kao", "cjelina"],
    copy: "Gledati cjelokupnu sliku imovine.",
    visualBrief:
      "Vaga, bilanca ili složeni kameni blokovi koji pokazuju cjelinu.",
  },
  {
    number: "06",
    href: TIME_VOLATILITY_PATH,
    area: "time",
    imageSrc: "/images/stone-symbols/area-06-time-volatility.webp",
    fallbackSrc: "/images/medallions/10-volatilnost-i-rast.png",
    lines: ["Vrijeme i", "volatilnost —", "pravila kroz", "cikluse"],
    copy: "Razumjeti cikluse i ostati dosljedan.",
    visualBrief:
      "Pješčani sat, ciklični luk ili valovita linija urezana u kameni disk.",
  },
  {
    number: "07",
    href: CUSTODY_SECURITY_PATH,
    area: "security",
    imageSrc: "/images/stone-symbols/area-07-security-family.webp",
    fallbackSrc: "/images/medallions/15-sigurnost-i-nasljedivanje.png",
    lines: ["Sigurnost", "i obitelj —", "zaštititi pristup"],
    copy: "Zaštititi ključeve i pripremiti nasljeđe.",
    visualBrief: "Štit, ključ ili obiteljski pečat u kamenu.",
  },
]

function FrameworkCardContent({
  area,
  copy,
  fallbackSrc,
  imageSrc,
  lines,
  number,
}: FrameworkCard) {
  return (
    <>
      <div
        className="editorial-framework-visual"
        data-embedded-number={area === "budget" ? "true" : undefined}
      >
        <StoneSymbol
          imageSrc={imageSrc}
          fallbackSrc={fallbackSrc}
          variant="sculpture"
          className="framework-stone-symbol"
        />
        <span className="editorial-card-number" aria-hidden="true">
          {number}
        </span>
      </div>
      <h3 aria-label={lines.join(" ")}>
        {lines.map((line) => (
          <span key={line}>{line} </span>
        ))}
      </h3>
      <p className="editorial-framework-card-copy">{copy}</p>
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
              data-area={card.area}
              data-bitcoin={card.number === "04" ? "true" : undefined}
              href={card.href}
            >
              <FrameworkCardContent {...card} />
            </a>
          ) : (
            <article
              key={card.number}
              className="editorial-framework-card"
              data-area={card.area}
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
