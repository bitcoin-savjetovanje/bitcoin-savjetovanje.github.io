export const SITE_URL = "https://bitcoin-savjetovanje.com"
export const BOOKING_URL = "https://cal.com/btcpavao/uvodni-bitcoin-razgovor"
export const CAL_BOOKING_LINK = "btcpavao/uvodni-bitcoin-razgovor"
export const CAL_BOOKING_NAMESPACE = "uvodni-bitcoin-razgovor"
export const EMAIL = "pavao@hey.com"
export const PRIMARY_CTA = "Dogovorite 15-minutni uvodni razgovor"
export const SECONDARY_CTA = "Pogledajte okvir"
export const BITCOIN_ADVICE_PATH = "/bitcoin-savjetovanje/"
export const CONVERSATION_PATH = "/razgovor/"
export const BITCOIN_CONSULTATION_PATH = "/bitcoin-konzultacija/"
export const PERSONAL_BITCOIN_STANDARD_PATH = "/osobni-bitcoin-standard/"
export const PRIVACY_PATH = "/privatnost/"
export const SITE_UPDATED_AT = "2026-05-15"
export const OG_IMAGE_PATH = "/og-bitcoin-logo.png"
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`
export const PRACTICAL_BITCOIN_STANDARD_URL = "/vodici/"
export const OPEN_MANUSCRIPT_URL =
  "https://btcpavao.gitbook.io/practical-bitcoin-standard"
export const DVADESET_JEDAN_URL = "https://dvadesetjedan.com"
export const SAIFEDEAN_AMMOUS_URL = "https://saifedean.com"
export const SAIF_HOUSE_URL = "https://thesaifhouse.com/"
export const BITCOIN_STANDARD_AUDIO_URL = "https://saifedean.com/podcast"
export const BITCOIN_STANDARD_BOOK_URL = "https://saifedean.com/tbs"
export const TWENTYONE_URL = "https://twentyone.world"

export const homeSeo = {
  title: "Bitcoin kao novac | Bitcoin Savjetovanje",
  description:
    "Od držanja Bitcoina do uređenog sustava odluka. Uvodni 15-minutni razgovor za ljude koji žele povezati Bitcoin s proračunom, dugom, neto imovinom, sigurnošću i obitelji.",
  canonical: `${SITE_URL}/`,
}

export const bitcoinAdviceSeo = {
  title: "Bitcoin savjetovanje u Hrvatskoj | Bitcoin Savjetovanje",
  description:
    "Bitcoin savjetovanje jedan-na-jedan za ljude u Hrvatskoj koji žele razjasniti Bitcoin, sigurnost, dug, obitelj i osobni okvir za odluke.",
  canonical: `${SITE_URL}${BITCOIN_ADVICE_PATH}`,
}

export const conversationSeo = {
  title: "Uvodni razgovor | Bitcoin kao novac",
  description:
    "Dogovorite 15-minutni uvodni razgovor i vidite gdje ste na putu od držanja Bitcoina do uređenog sustava odluka.",
  canonical: `${SITE_URL}${CONVERSATION_PATH}`,
}

export const bitcoinConsultationSeo = {
  title: "Bitcoin konzultacija od 200 € | Bitcoin Savjetovanje",
  description:
    "Jedan dubinski razgovor za jedno ozbiljno pitanje o Bitcoinu, proračunu, dugu, neto imovini, sigurnosti ili obitelji.",
  canonical: `${SITE_URL}${BITCOIN_CONSULTATION_PATH}`,
}

export const personalBitcoinStandardSeo = {
  title: "Osobni Bitcoin standard | Bitcoin Savjetovanje",
  description:
    "Program od 4–6 tjedana za izgradnju pisanog sustava odluka za proračun, dug, davanje, Bitcoin kao novac, neto imovinu, volatilnost, sigurnost i obitelj.",
  canonical: `${SITE_URL}${PERSONAL_BITCOIN_STANDARD_PATH}`,
}

export const guidesIndexSeo = {
  title: "Vodiči za knjigu Bitcoin kao novac | Bitcoin Savjetovanje",
  description:
    "Vodiči za život s Bitcoinom kao novcem: proračun, dug, davanje, Bitcoin kao primarni novac, neto imovina, volatilnost, sigurnost i obitelj.",
  canonical: `${SITE_URL}/vodici/`,
}

export const securitySeo = {
  title: "Sigurnost i povjerljivost | Bitcoin Savjetovanje",
  description:
    "Sigurnosni okvir za Bitcoin bez dijeljenja seed phrase, privatnih ključeva, lozinki ili pristupa novčaniku.",
  canonical: `${SITE_URL}/sigurnost/`,
}

export const privacySeo = {
  title: "Privatnost i podaci | Bitcoin Savjetovanje",
  description:
    "Što trebate podijeliti za uvodni Bitcoin razgovor, što nikada ne šaljete i kako se čuvaju povjerljivost i sigurnosna pravila.",
  canonical: `${SITE_URL}${PRIVACY_PATH}`,
}

export const heroOutcomes = [
  "Svaki euro ima namjenu.",
  "Dug ima plan izlaska.",
  "Davanje ima mjesto.",
  "Bitcoin ima ulogu novca.",
]

export const trustCards = [
  {
    title: "U Bitcoinu od 2014.",
    copy: "Iskustvo kroz više ciklusa, bez potrebe za prognozama cijene.",
  },
  {
    title: "Bitcoin standard od 2020.",
    copy: "Okvir je nastao iz pokušaja življenja s Bitcoinom kao novcem.",
  },
  {
    title: "Profesionalan rad u industriji",
    copy: "Radio sam u Bitcoin industriji i sa Saifedeanom Ammousom.",
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
    href: BITCOIN_STANDARD_AUDIO_URL,
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
