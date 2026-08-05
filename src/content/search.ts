import { audiencePages } from "./audiences"
import { guideHref, guides, type Guide, type GuideSection } from "./guides"
import {
  BITCOIN_ADVICE_PATH,
  BITCOIN_CONSULTATION_PATH,
  BITCOIN_MONEY_PATH,
  BITCOIN_STANDARD_CHECK_PATH,
  BITCOIN_TODAY_PATH,
  BUDGET_PATH,
  BUDGET_ZERO_PATH,
  BUSINESS_BITCOIN_PATH,
  BUSINESS_BITCOIN_ONE_PAGER_PATH,
  CONVERSATION_PATH,
  CUSTODY_SECURITY_PATH,
  DEBT_PATH,
  GIVING_PATH,
  MISSED_BITCOIN_PATH,
  NET_WORTH_PATH,
  PAVAO_PAHLJINA_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
  PRIVACY_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
  TIME_VOLATILITY_PATH,
  LONG_TERM_TREND_PATH,
  bitcoinAdviceSeo,
  bitcoinConsultationSeo,
  bitcoinMoneySeo,
  bitcoinStandardCheckSeo,
  bitcoinTodaySeo,
  budgetSeo,
  budgetZeroSeo,
  businessBitcoinSeo,
  businessBitcoinOnePagerSeo,
  conversationSeo,
  custodySecuritySeo,
  debtSeo,
  givingSeo,
  guidesIndexSeo,
  homeSeo,
  missedBitcoinSeo,
  netWorthSeo,
  personalBitcoinStandardSeo,
  pavaoPahljinaSeo,
  privacySeo,
  samplePersonalBitcoinStandardSeo,
  securitySeo,
  timeVolatilitySeo,
  longTermTrendSeo,
} from "./site"

export type SearchEntryKind = "Stranica" | "Vodič" | "Publika"

export type SearchEntry = {
  title: string
  description: string
  href: string
  kind: SearchEntryKind
  category: string
  keywords: string
}

function plainTitle(title: string) {
  return title
    .replace(/\s+[|—]\s+Bitcoin Savjetovanje$/u, "")
    .replace(/\s+[|—]\s+Bitcoin kao novac$/u, "")
}

function compact(parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ")
}

function sectionText(section: GuideSection): string {
  return compact([
    section.heading,
    section.body.join(" "),
    section.calloutTitle,
    section.callout,
    section.items?.join(" "),
    section.cards?.map((card) => compact([card.title, card.text])).join(" "),
    section.dataCards
      ?.map((card) => compact([card.value, card.label]))
      .join(" "),
    section.table
      ? compact([
          section.table.columns.join(" "),
          section.table.rows.flat().join(" "),
        ])
      : undefined,
    section.links?.map((link) => link.label).join(" "),
    section.link ? compact([section.link.before, section.link.label]) : "",
    section.visual
      ? compact([
          section.visual.title,
          "caption" in section.visual ? section.visual.caption : undefined,
          "items" in section.visual
            ? section.visual.items
                .map((item) => compact([item.name, item.description]))
                .join(" ")
            : undefined,
        ])
      : undefined,
    section.subsections
      ?.map((subsection) =>
        compact([
          subsection.heading,
          subsection.body.join(" "),
          subsection.calloutTitle,
          subsection.callout,
          subsection.items?.join(" "),
          subsection.cards
            ?.map((card) => compact([card.title, card.text]))
            .join(" "),
          subsection.table
            ? compact([
                subsection.table.columns.join(" "),
                subsection.table.rows.flat().join(" "),
              ])
            : undefined,
          subsection.links?.map((link) => link.label).join(" "),
          subsection.link
            ? compact([subsection.link.before, subsection.link.label])
            : "",
        ])
      )
      .join(" "),
  ])
}

function guideKeywords(guide: Guide) {
  return compact([
    guide.eyebrow,
    guide.seoTitle,
    guide.ogTitle,
    guide.ogDescription,
    guide.practicalQuestion,
    guide.difficulty,
    guide.freshness,
    guide.summary
      ? compact([guide.summary.title, guide.summary.items.join(" ")])
      : "",
    guide.intro?.join(" "),
    guide.statusNotes?.join(" "),
    guide.sections.map(sectionText).join(" "),
    guide.faq?.map((item) => compact([item.question, item.answer])).join(" "),
    guide.disclaimer,
    guide.finalCtaTitle,
    guide.finalCtaPrompt,
    guide.finalCta,
  ])
}

const pageEntries: SearchEntry[] = [
  {
    title: "Početna",
    description: homeSeo.description,
    href: "/",
    kind: "Stranica",
    category: "Bitcoin Savjetovanje",
    keywords:
      "osobni bitcoin standard proračun dug davanje neto imovina volatilnost sigurnost obitelj poduzetnici",
  },
  {
    title: "Pavao Pahljina",
    description: pavaoPahljinaSeo.description,
    href: PAVAO_PAHLJINA_PATH,
    kind: "Stranica",
    category: "O meni",
    keywords:
      "Pavao Pahljina bitcoin savjetnik poduzetnik STEMI Saifedean Ammous bitcoin kao novac",
  },
  {
    title: plainTitle(budgetSeo.title),
    description: budgetSeo.description,
    href: BUDGET_PATH,
    kind: "Stranica",
    category: "Okvir",
    keywords: "proračun stvarni višak novac namjena nulta osnova",
  },
  {
    title: plainTitle(budgetZeroSeo.title),
    description: budgetZeroSeo.description,
    href: BUDGET_ZERO_PATH,
    kind: "Stranica",
    category: "Interaktivni alat",
    keywords:
      "proračun nulte razine računi stanja gotovina tekući račun namjene kategorije još za namijeniti",
  },
  {
    title: plainTitle(debtSeo.title),
    description: debtSeo.description,
    href: DEBT_PATH,
    kind: "Stranica",
    category: "Okvir",
    keywords: "dug kredit leasing kartica budući novac razduživanje",
  },
  {
    title: plainTitle(givingSeo.title),
    description: givingSeo.description,
    href: GIVING_PATH,
    kind: "Stranica",
    category: "Okvir",
    keywords: "davanje zahvalnost velikodušnost novac",
  },
  {
    title: plainTitle(bitcoinMoneySeo.title),
    description: bitcoinMoneySeo.description,
    href: BITCOIN_MONEY_PATH,
    kind: "Stranica",
    category: "Okvir",
    keywords: "bitcoin novac državni novac špekulacija saldo",
  },
  {
    title: plainTitle(netWorthSeo.title),
    description: netWorthSeo.description,
    href: NET_WORTH_PATH,
    kind: "Stranica",
    category: "Okvir",
    keywords: "neto imovina kapital potrošnja pravilo trećina likvidnost",
  },
  {
    title: plainTitle(timeVolatilitySeo.title),
    description: timeVolatilitySeo.description,
    href: TIME_VOLATILITY_PATH,
    kind: "Stranica",
    category: "Okvir",
    keywords: "vrijeme volatilnost ciklusi dugoročni trend cijena",
  },
  {
    title: plainTitle(longTermTrendSeo.title),
    description: longTermTrendSeo.description,
    href: LONG_TERM_TREND_PATH,
    kind: "Stranica",
    category: "Alati",
    keywords:
      "dugoročni trend bitcoin graf power law korijenska skala halving ciklusi cijena model",
  },
  {
    title: plainTitle(bitcoinTodaySeo.title),
    description: bitcoinTodaySeo.description,
    href: BITCOIN_TODAY_PATH,
    kind: "Stranica",
    category: "Bitcoin uživo",
    keywords:
      "bitcoin danas uživo cijena euro bit bitovi kalkulator pretvarač satoshi blok visina naknade mempool sentiment strah pohlepa izdana količina subvencija emisija halving countdown hash rate hashrate težina mreže rudarenje energija gigavat elektrane PL0 power law",
  },
  {
    title: plainTitle(custodySecuritySeo.title),
    description: custodySecuritySeo.description,
    href: CUSTODY_SECURITY_PATH,
    kind: "Stranica",
    category: "Okvir",
    keywords:
      "skrbništvo sigurnost privatni ključevi sigurnosna kopija oporavak kontinuitet pravno nasljeđivanje",
  },
  {
    title: plainTitle(bitcoinAdviceSeo.title),
    description: bitcoinAdviceSeo.description,
    href: BITCOIN_ADVICE_PATH,
    kind: "Stranica",
    category: "Usluge",
    keywords:
      "bitcoin savjetovanje hrvatska jedan na jedan sigurnost dug obitelj",
  },
  {
    title: plainTitle(missedBitcoinSeo.title),
    description: missedBitcoinSeo.description,
    href: MISSED_BITCOIN_PATH,
    kind: "Stranica",
    category: "Početak",
    keywords:
      "jesam li zakasnio bitcoin mogao sam kupiti bitcoin ranije kada kupiti bitcoin propustio sam bitcoin samoprocjena osobni bitcoin standard",
  },
  {
    title: plainTitle(businessBitcoinSeo.title),
    description: businessBitcoinSeo.description,
    href: BUSINESS_BITCOIN_PATH,
    kind: "Stranica",
    category: "Usluge",
    keywords:
      "bitcoin briefing za upravu tvrtke vlasnik direktor financije mapa odluka odgovornosti placanja sigurnost poslovni novac",
  },
  {
    title: plainTitle(businessBitcoinOnePagerSeo.title),
    description: businessBitcoinOnePagerSeo.description,
    href: BUSINESS_BITCOIN_ONE_PAGER_PATH,
    kind: "Stranica",
    category: "Usluge",
    keywords:
      "sazetak bitcoin briefinga uprava interno dijeljenje poslovni povodi dnevni red odgovornosti",
  },
  {
    title: plainTitle(conversationSeo.title),
    description: conversationSeo.description,
    href: CONVERSATION_PATH,
    kind: "Stranica",
    category: "Kontakt",
    keywords: "razgovor uvodni poziv konzultacija dogovoriti termin",
  },
  {
    title: plainTitle(bitcoinConsultationSeo.title),
    description: bitcoinConsultationSeo.description,
    href: BITCOIN_CONSULTATION_PATH,
    kind: "Stranica",
    category: "Usluge",
    keywords: "bitcoin konzultacija dubinski razgovor pitanje",
  },
  {
    title: plainTitle(personalBitcoinStandardSeo.title),
    description: personalBitcoinStandardSeo.description,
    href: PERSONAL_BITCOIN_STANDARD_PATH,
    kind: "Stranica",
    category: "Usluge",
    keywords: "osobni bitcoin standard program sustav odluka",
  },
  {
    title: plainTitle(samplePersonalBitcoinStandardSeo.title),
    description: samplePersonalBitcoinStandardSeo.description,
    href: SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
    kind: "Stranica",
    category: "Program",
    keywords:
      "primjer osobnog bitcoin standarda rezultat rada struktura odluke program",
  },
  {
    title: plainTitle(bitcoinStandardCheckSeo.title),
    description: bitcoinStandardCheckSeo.description,
    href: BITCOIN_STANDARD_CHECK_PATH,
    kind: "Stranica",
    category: "Interaktivna provjera",
    keywords:
      "provjera bitcoin standarda rezultat upitnik prvi prioritet razumijevanje cijena osobne financije proračun dug život pravila sigurnost kontinuitet obitelj",
  },
  {
    title: plainTitle(guidesIndexSeo.title),
    description: guidesIndexSeo.description,
    href: "/vodici/",
    kind: "Stranica",
    category: "Vodiči",
    keywords: "vodiči knjiga bitcoin kao novac mapa",
  },
  {
    title: plainTitle(securitySeo.title),
    description: securitySeo.description,
    href: "/sigurnost/",
    kind: "Stranica",
    category: "Sigurnost",
    keywords: "povjerljivost početne riječi privatni ključevi lozinke novčanik",
  },
  {
    title: plainTitle(privacySeo.title),
    description: privacySeo.description,
    href: PRIVACY_PATH,
    kind: "Stranica",
    category: "Privatnost",
    keywords: "podaci privatnost povjerljivost uvodni razgovor",
  },
]

const audienceEntries: SearchEntry[] = audiencePages.map((page) => ({
  title: page.title,
  description: page.subtitle,
  href: page.path,
  kind: "Publika",
  category: page.eyebrow,
  keywords: compact([
    page.problemTitle,
    page.problems
      .map((problem) => compact([problem.title, problem.text]))
      .join(" "),
    page.outcomeTitle,
    page.outcomes
      .map((outcome) => compact([outcome.title, outcome.text]))
      .join(" "),
    page.methodTitle,
    page.methodSteps.map((step) => compact([step.title, step.text])).join(" "),
    page.trustNote,
    page.seo.title,
    page.seo.description,
  ]),
}))

const guideEntries: SearchEntry[] = guides.map((guide) => ({
  title: guide.title,
  description: guide.excerpt || guide.metaDescription,
  href: guideHref(guide.slug),
  kind: "Vodič",
  category: guide.category,
  keywords: guideKeywords(guide),
}))

export const searchEntries: SearchEntry[] = [
  ...pageEntries,
  ...audienceEntries,
  ...guideEntries,
]
