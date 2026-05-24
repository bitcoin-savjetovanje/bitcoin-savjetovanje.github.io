import {
  BITCOIN_MONEY_PATH,
  BUDGET_PATH,
  CONVERSATION_PATH,
  CUSTODY_SECURITY_PATH,
  DEBT_PATH,
  GIVING_PATH,
  NET_WORTH_PATH,
  TIME_VOLATILITY_PATH,
} from "@/content/site"

const hotspots = [
  {
    label: "Proračun — vidjeti novac",
    href: BUDGET_PATH,
    style: { left: "4.3%", top: "10.5%", width: "10.5%", height: "42%" },
  },
  {
    label: "Dug — osloboditi budućnost",
    href: DEBT_PATH,
    style: { left: "16.8%", top: "10.5%", width: "11%", height: "42%" },
  },
  {
    label: "Davanje — otvoriti ruku",
    href: GIVING_PATH,
    style: { left: "29.8%", top: "10.5%", width: "11.5%", height: "42%" },
  },
  {
    label: "Bitcoin kao novac — primarni saldo",
    href: BITCOIN_MONEY_PATH,
    style: { left: "42.7%", top: "8.8%", width: "12.5%", height: "44%" },
  },
  {
    label: "Neto imovina — bilanca kao cjelina",
    href: NET_WORTH_PATH,
    style: { left: "56.8%", top: "10.5%", width: "12%", height: "42%" },
  },
  {
    label: "Vrijeme i volatilnost — pravila kroz cikluse",
    href: TIME_VOLATILITY_PATH,
    style: { left: "70.4%", top: "10.5%", width: "12.5%", height: "42%" },
  },
  {
    label: "Sigurnost i obitelj — zaštititi pristup",
    href: CUSTODY_SECURITY_PATH,
    style: { left: "84.8%", top: "10.5%", width: "11.8%", height: "42%" },
  },
  {
    label: "Razjasnimo prvo usko grlo",
    href: CONVERSATION_PATH,
    style: { left: "4%", top: "86.8%", width: "20.3%", height: "6.4%" },
  },
  {
    label: "Novac nije jasno raspoređen",
    href: CONVERSATION_PATH,
    style: { left: "41.4%", top: "56.5%", width: "16.9%", height: "42.5%" },
  },
  {
    label: "Obitelj ili posao nisu usklađeni",
    href: CONVERSATION_PATH,
    style: { left: "60.2%", top: "56.5%", width: "16.8%", height: "42.5%" },
  },
  {
    label: "Cijena previše pomiče odluke",
    href: CONVERSATION_PATH,
    style: { left: "79.1%", top: "56.5%", width: "17.6%", height: "42.5%" },
  },
] as const

export function RecognitionSection() {
  return (
    <section
      id="okvir"
      className="exact-framework-recognition"
      aria-label="Okvir iz knjige i problemi koje prepoznajete"
    >
      <img
        className="exact-framework-recognition__image"
        src="/images/exact-sections/home-framework-recognition-exact-desktop.webp"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
      />

      {hotspots.map((hotspot) => (
        <a
          key={hotspot.label}
          className="exact-framework-recognition__hotspot"
          href={hotspot.href}
          style={hotspot.style}
        >
          <span className="exact-framework-recognition__label">
            {hotspot.label}
          </span>
        </a>
      ))}
    </section>
  )
}
