import {
  BITCOIN_MONEY_PATH,
  BUDGET_PATH,
  CUSTODY_SECURITY_PATH,
  DEBT_PATH,
  GIVING_PATH,
  NET_WORTH_PATH,
  TIME_VOLATILITY_PATH,
} from "@/content/site"

type FrameworkItem = {
  title: string
  description: string
  href: string
  image: string
}

const frameworkItems: FrameworkItem[] = [
  {
    href: BUDGET_PATH,
    image: "/images/stone-symbols/area-01-budget.webp",
    title: "Proračun — vidjeti novac",
    description: "Urediti vlastiti sustav odluka.",
  },
  {
    href: DEBT_PATH,
    image: "/images/stone-symbols/area-02-debt.webp",
    title: "Dug — osloboditi budućnost",
    description: "Prekinuti krug duga i ojačati slobodu.",
  },
  {
    href: GIVING_PATH,
    image: "/images/stone-symbols/area-03-giving.webp",
    title: "Davanje — otvoriti ruku",
    description: "Izgraditi duh velikodušnosti.",
  },
  {
    href: BITCOIN_MONEY_PATH,
    image: "/images/stone-symbols/area-04-bitcoin-money.webp",
    title: "Bitcoin kao novac — primarni saldo",
    description: "Koristiti Bitcoin kao osnovni novac.",
  },
  {
    href: NET_WORTH_PATH,
    image: "/images/stone-symbols/area-05-net-worth.webp",
    title: "Neto imovina — bilanca kao cjelina",
    description: "Gledati cjelokupnu sliku imovine.",
  },
  {
    href: TIME_VOLATILITY_PATH,
    image: "/images/stone-symbols/area-06-time-volatility.webp",
    title: "Vrijeme i volatilnost — pravila kroz cikluse",
    description: "Razumjeti cikluse i ostati dosljedan.",
  },
  {
    href: CUSTODY_SECURITY_PATH,
    image: "/images/stone-symbols/area-07-security-family.webp",
    title: "Sigurnost i obitelj — zaštititi pristup",
    description: "Zaštititi ključeve i pripremiti nasljeđe.",
  },
]

export function FrameworkSection() {
  return (
    <section id="okvir" className="editorial-section framework-section">
      <h2>Okvir iz knjige: 7 područja koja treba urediti</h2>

      <div
        className="framework-sculpture-grid"
        aria-label="Mapa osobnog Bitcoin standarda"
      >
        {frameworkItems.map((item) => (
          <a
            className="framework-sculpture-item"
            href={item.href}
            key={item.title}
          >
            <img
              className="framework-sculpture-image"
              src={item.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <h3 className="framework-sculpture-title">{item.title}</h3>
            <p className="framework-sculpture-description">
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}
