import { audiencePages } from "./audiences"
import { guideHref, guides, type Guide, type GuideSection } from "./guides"
import {
  BITCOIN_ADVICE_PATH,
  BITCOIN_CONSULTATION_PATH,
  BITCOIN_MONEY_PATH,
  BITCOIN_STANDARD_CHECK_PATH,
  BUDGET_PATH,
  CONVERSATION_PATH,
  CUSTODY_SECURITY_PATH,
  DEBT_PATH,
  GIVING_PATH,
  NET_WORTH_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
  PRIVACY_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
  TIME_VOLATILITY_PATH,
  bitcoinAdviceSeo,
  bitcoinConsultationSeo,
  bitcoinMoneySeo,
  bitcoinStandardCheckSeo,
  budgetSeo,
  conversationSeo,
  custodySecuritySeo,
  debtSeo,
  givingSeo,
  guidesIndexSeo,
  homeSeo,
  netWorthSeo,
  personalBitcoinStandardSeo,
  privacySeo,
  samplePersonalBitcoinStandardSeo,
  securitySeo,
  timeVolatilitySeo,
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
    title: plainTitle(budgetSeo.title),
    description: budgetSeo.description,
    href: BUDGET_PATH,
    kind: "Stranica",
    category: "Okvir",
    keywords: "proračun stvarni višak novac namjena nulta osnova",
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
    title: plainTitle(custodySecuritySeo.title),
    description: custodySecuritySeo.description,
    href: CUSTODY_SECURITY_PATH,
    kind: "Stranica",
    category: "Okvir",
    keywords: "skrbništvo sigurnost privatni ključevi backup nasljeđivanje",
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
    category: "Preuzimanje",
    keywords: "primjer osobnog bitcoin standarda pdf ogledni dokument",
  },
  {
    title: plainTitle(bitcoinStandardCheckSeo.title),
    description: bitcoinStandardCheckSeo.description,
    href: BITCOIN_STANDARD_CHECK_PATH,
    kind: "Stranica",
    category: "Preuzimanje",
    keywords: "provjera bitcoin standarda radni pdf sedam provjera",
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
    keywords: "povjerljivost seed phrase privatni ključevi lozinke novčanik",
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
