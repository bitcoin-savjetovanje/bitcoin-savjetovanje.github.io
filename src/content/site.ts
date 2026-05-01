export const SITE_URL = "https://bitcoin-savjetovanje.com"
export const BOOKING_URL = "https://cal.com/btcpavao/uvodni-poziv"
export const EMAIL = "pavao@hey.com"
export const PRIMARY_CTA = "Dogovorite 15-minutni uvodni razgovor"
export const SITE_UPDATED_AT = "2026-04-30"
export const OG_IMAGE_PATH = "/og-image.png"
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`
export const PRACTICAL_BITCOIN_STANDARD_URL =
  "https://btcpavao.gitbook.io/practical-bitcoin-standard/"
export const DVADESET_JEDAN_URL = "https://dvadesetjedan.com"
export const SAIFEDEAN_AMMOUS_URL = "https://saifedean.com"
export const SAIF_HOUSE_URL = "https://thesaifhouse.com/"
export const BITCOIN_STANDARD_PODCAST_URL = "https://saifedean.com/podcast"
export const BITCOIN_STANDARD_BOOK_URL = "https://saifedean.com/tbs"
export const TWENTYONE_URL = "https://twentyone.world"
export const LINKEDIN_URL = "https://www.linkedin.com/in/pavaopahljina/"

export const homeSeo = {
  title: "Bitcoin Savjetovanje | Jasna pravila za Bitcoin i imovinu",
  description:
    "Imate Bitcoin ili imovinu, ali nemate jasan plan? Dogovorite uvodni razgovor i razjasnite proračun, dug, sigurnost i ulogu Bitcoina.",
  canonical: `${SITE_URL}/`,
}

export const guidesIndexSeo = {
  title: "Vodiči za praktične Bitcoin odluke | Bitcoin Savjetovanje",
  description:
    "Kratki hrvatski vodiči o osobnom proračunu, dugu, kupovnoj moći, neto imovini, skrbništvu, obiteljskom pristupu i pravilima odlučivanja na Bitcoin standardu.",
  canonical: `${SITE_URL}/vodici/`,
}

export const securitySeo = {
  title: "Sigurnost i povjerljivost | Bitcoin Savjetovanje",
  description:
    "Kako radim s temama Bitcoina, skrbništva i povjerljivosti: bez početnih riječi za oporavak, bez privatnih ključeva, bez pristupa računima i bez čuvanja sredstava.",
  canonical: `${SITE_URL}/sigurnost/`,
}

export const heroOutcomes = [
  "Jasan proračun.",
  "Jasna uloga Bitcoina.",
  "Pravila za sljedeću odluku.",
]

export const trustCards = [
  {
    title: "U Bitcoinu od 2014.",
    copy: "Više ciklusa, isti fokus: Bitcoin kao novac.",
  },
  {
    title: "Bitcoin standard od 2020.",
    copy: "Praksa korištenja Bitcoina kao primarnog novca.",
  },
  {
    title: "Rad s najboljima.",
    copy: "Direktan rad sa Saifedeanom Ammousom, autorom The Bitcoin Standard.",
  },
]

export const credibilityLogos = [
  {
    name: "Saifedean Ammous",
    src: "/saifedean-ammous-logo.webp",
    href: SAIFEDEAN_AMMOUS_URL,
    className:
      "credibility-logo-strip__logo--compact credibility-logo-strip__logo--dark-white",
  },
  {
    name: "The Bitcoin Standard Podcast",
    src: "/tbs-podcast-logo.svg",
    href: BITCOIN_STANDARD_PODCAST_URL,
    className:
      "credibility-logo-strip__logo--wide credibility-logo-strip__logo--dark-white",
  },
  {
    name: "The Saif House",
    src: "/tsh-logo.avif",
    href: SAIF_HOUSE_URL,
    className:
      "credibility-logo-strip__logo--wide credibility-logo-strip__logo--dark-white",
  },
  {
    name: "TwentyOne",
    src: "/dvadesetjedan-logo.svg",
    darkSrc: "/dvadesetjedan-logo-dark.svg",
    href: TWENTYONE_URL,
    className: "credibility-logo-strip__logo--compact",
  },
  {
    name: "DvadesetJedan",
    src: "/dvadesetjedan-wordmark.png",
    darkSrc: "/dvadesetjedan-wordmark-dark.png",
    href: DVADESET_JEDAN_URL,
    className: "credibility-logo-strip__logo--compact",
  },
]
