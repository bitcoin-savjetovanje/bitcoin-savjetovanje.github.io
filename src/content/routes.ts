import {
  audienceCanonical,
  audiencePages,
  type AudienceSlug,
} from "./audiences"
import { guideHref, guides } from "./guides"
import { resolveGuideCover } from "./guideVisuals"
import {
  audiencePageSchema,
  breadcrumbSchema,
  bitcoinConsultationPageSchema,
  bitcoinAdvicePageSchema,
  bitcoinStandardCheckPageSchema,
  conversationPageSchema,
  guideSchema,
  guidesIndexSchema,
  homeSchema,
  personalBitcoinStandardPageSchema,
  privacyPageSchema,
  samplePersonalBitcoinStandardPageSchema,
  securityPageSchema,
} from "./schema"
import {
  SITE_UPDATED_AT,
  SITE_URL,
  budgetSeo,
  bitcoinAdviceSeo,
  bitcoinConsultationSeo,
  bitcoinMoneySeo,
  bitcoinStandardCheckSeo,
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
import { guideCoverSocialImage, socialImages } from "./socialImages"

export type RouteType =
  | "home"
  | "budget"
  | "debt"
  | "giving"
  | "bitcoin-money"
  | "net-worth"
  | "time-volatility"
  | "custody-security"
  | "bitcoin-advice"
  | "conversation"
  | "bitcoin-consultation"
  | "personal-bitcoin-standard"
  | "sample-personal-bitcoin-standard"
  | "bitcoin-standard-check"
  | "audience"
  | "guides-index"
  | "guide"
  | "security"
  | "privacy"
  | "not-found"
export type RouteOgType = "website" | "article"

export type RouteMeta = {
  path: string
  title: string
  description: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
  schema: unknown
  type: RouteType
  lastmod: string
  ogType: RouteOgType
  ogImage: string
  ogImageWidth: number
  ogImageHeight: number
  includeInSitemap?: boolean
}

export const homeRoute: RouteMeta = {
  path: "/",
  title: homeSeo.title,
  description: homeSeo.description,
  canonical: `${SITE_URL}/`,
  schema: homeSchema(),
  type: "home",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.home,
}

export const guidesIndexRoute: RouteMeta = {
  path: "/vodici/",
  title: guidesIndexSeo.title,
  description: guidesIndexSeo.description,
  canonical: guidesIndexSeo.canonical,
  schema: guidesIndexSchema(),
  type: "guides-index",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.guidesIndex,
}

export const budgetRoute: RouteMeta = {
  path: "/proracun/",
  title: budgetSeo.title,
  description: budgetSeo.description,
  canonical: budgetSeo.canonical,
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Proračun",
        description: budgetSeo.description,
        url: budgetSeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "proračun",
          "osobni Bitcoin standard",
          "stvarni višak",
          "upravljanje novcem",
          "Bitcoin kao novac",
        ],
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: "Proračun", item: budgetSeo.canonical },
      ]),
    ],
  },
  type: "budget",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.budget,
}

export const debtRoute: RouteMeta = {
  path: "/dug/",
  title: debtSeo.title,
  description: debtSeo.description,
  canonical: debtSeo.canonical,
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Dug",
        description: debtSeo.description,
        url: debtSeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "dug",
          "razduživanje",
          "osobni Bitcoin standard",
          "stvarni višak",
          "Bitcoin kao novac",
        ],
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: "Dug", item: debtSeo.canonical },
      ]),
    ],
  },
  type: "debt",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.debt,
}

export const givingRoute: RouteMeta = {
  path: "/davanje/",
  title: givingSeo.title,
  description: givingSeo.description,
  canonical: givingSeo.canonical,
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Davanje",
        description: givingSeo.description,
        url: givingSeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "davanje",
          "zahvalnost",
          "osobni Bitcoin standard",
          "proračun",
          "Bitcoin kao novac",
        ],
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: "Davanje", item: givingSeo.canonical },
      ]),
    ],
  },
  type: "giving",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.giving,
}

export const bitcoinMoneyRoute: RouteMeta = {
  path: "/bitcoin-kao-novac/",
  title: bitcoinMoneySeo.title,
  description: bitcoinMoneySeo.description,
  canonical: bitcoinMoneySeo.canonical,
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Bitcoin kao novac",
        description: bitcoinMoneySeo.description,
        url: bitcoinMoneySeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "Bitcoin kao novac",
          "osobni Bitcoin standard",
          "državni novac",
          "proračun",
          "dug",
          "neto imovina",
        ],
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: "Bitcoin kao novac", item: bitcoinMoneySeo.canonical },
      ]),
    ],
  },
  type: "bitcoin-money",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.bitcoinMoney,
}

export const netWorthRoute: RouteMeta = {
  path: "/bitcoin-i-neto-imovina/",
  title: netWorthSeo.title,
  description: netWorthSeo.description,
  canonical: netWorthSeo.canonical,
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Bitcoin i neto imovina",
        description: netWorthSeo.description,
        url: netWorthSeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "Bitcoin i neto imovina",
          "neto imovina",
          "Pravilo trećina",
          "likvidnost",
          "osobni Bitcoin standard",
        ],
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: "Bitcoin i neto imovina", item: netWorthSeo.canonical },
      ]),
    ],
  },
  type: "net-worth",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.netWorth,
}

export const timeVolatilityRoute: RouteMeta = {
  path: "/bitcoin-vrijeme-i-volatilnost/",
  title: timeVolatilitySeo.title,
  description: timeVolatilitySeo.description,
  canonical: timeVolatilitySeo.canonical,
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Bitcoin, vrijeme i volatilnost",
        description: timeVolatilitySeo.description,
        url: timeVolatilitySeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "Bitcoin, vrijeme i volatilnost",
          "dugoročni trend",
          "volatilnost",
          "ciklusi",
          "osobni Bitcoin standard",
        ],
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        {
          name: "Bitcoin, vrijeme i volatilnost",
          item: timeVolatilitySeo.canonical,
        },
      ]),
    ],
  },
  type: "time-volatility",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.timeVolatility,
}

export const custodySecurityRoute: RouteMeta = {
  path: "/skrbnistvo-i-sigurnost/",
  title: custodySecuritySeo.title,
  description: custodySecuritySeo.description,
  canonical: custodySecuritySeo.canonical,
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Bitcoin skrbništvo i sigurnost",
        description: custodySecuritySeo.description,
        url: custodySecuritySeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "Bitcoin skrbništvo i sigurnost",
          "privatni ključevi",
          "backup fraza",
          "nasljeđivanje",
          "obiteljski Bitcoin trezor",
          "osobni Bitcoin standard",
        ],
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        {
          name: "Bitcoin skrbništvo i sigurnost",
          item: custodySecuritySeo.canonical,
        },
      ]),
    ],
  },
  type: "custody-security",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.custodySecurity,
}

export const bitcoinAdviceRoute: RouteMeta = {
  path: "/bitcoin-savjetovanje/",
  title: bitcoinAdviceSeo.title,
  description: bitcoinAdviceSeo.description,
  canonical: bitcoinAdviceSeo.canonical,
  schema: bitcoinAdvicePageSchema(),
  type: "bitcoin-advice",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.bitcoinAdvice,
}

export const conversationRoute: RouteMeta = {
  path: "/razgovor/",
  title: conversationSeo.title,
  description: conversationSeo.description,
  canonical: conversationSeo.canonical,
  schema: conversationPageSchema(),
  type: "conversation",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.conversation,
}

export const bitcoinConsultationRoute: RouteMeta = {
  path: "/bitcoin-konzultacija/",
  title: bitcoinConsultationSeo.title,
  description: bitcoinConsultationSeo.description,
  canonical: bitcoinConsultationSeo.canonical,
  schema: bitcoinConsultationPageSchema(),
  type: "bitcoin-consultation",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.bitcoinConsultation,
}

export const personalBitcoinStandardRoute: RouteMeta = {
  path: "/osobni-bitcoin-standard/",
  title: personalBitcoinStandardSeo.title,
  description: personalBitcoinStandardSeo.description,
  canonical: personalBitcoinStandardSeo.canonical,
  schema: personalBitcoinStandardPageSchema(),
  type: "personal-bitcoin-standard",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.personalBitcoinStandard,
}

export const samplePersonalBitcoinStandardRoute: RouteMeta = {
  path: "/primjer-osobnog-bitcoin-standarda/",
  title: samplePersonalBitcoinStandardSeo.title,
  description: samplePersonalBitcoinStandardSeo.description,
  canonical: samplePersonalBitcoinStandardSeo.canonical,
  schema: samplePersonalBitcoinStandardPageSchema(),
  type: "sample-personal-bitcoin-standard",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.samplePersonalBitcoinStandard,
}

export const bitcoinStandardCheckRoute: RouteMeta = {
  path: "/provjera-bitcoin-standarda/",
  title: bitcoinStandardCheckSeo.title,
  description: bitcoinStandardCheckSeo.description,
  canonical: bitcoinStandardCheckSeo.canonical,
  schema: bitcoinStandardCheckPageSchema(),
  type: "bitcoin-standard-check",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.bitcoinStandardCheck,
}

export const audienceRouteMetas: RouteMeta[] = audiencePages.map((page) => ({
  path: page.path,
  title: page.seo.title,
  description: page.seo.description,
  canonical: audienceCanonical(page),
  schema: audiencePageSchema(page),
  type: "audience",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.audiences[page.slug],
}))

export const guideRouteMetas: RouteMeta[] = guides.map((guide) => ({
  path: `/vodici/${guide.slug}`,
  title: `${guide.seoTitle ?? guide.title} | Bitcoin Savjetovanje`,
  description: guide.metaDescription,
  canonical: `${SITE_URL}${guideHref(guide.slug)}`,
  ogTitle: guide.ogTitle ?? guide.title,
  ogDescription: guide.ogDescription ?? guide.metaDescription,
  schema: guideSchema(guide),
  type: "guide",
  lastmod: guide.updatedAt,
  ogType: "article",
  ...guideCoverSocialImage(resolveGuideCover(guide).src),
}))

export const guideAliasRouteMetas: RouteMeta[] = guides.flatMap((guide) =>
  (guide.previousSlugs ?? []).map((previousSlug) => ({
    path: `/vodici/${previousSlug}`,
    title: `${guide.title} | Bitcoin Savjetovanje`,
    description: guide.metaDescription,
    canonical: `${SITE_URL}${guideHref(guide.slug)}`,
    schema: guideSchema(guide),
    type: "guide" as const,
    lastmod: guide.updatedAt,
    ogType: "article" as const,
    ...guideCoverSocialImage(resolveGuideCover(guide).src),
    includeInSitemap: false,
  }))
)

export const securityRoute: RouteMeta = {
  path: "/sigurnost/",
  title: securitySeo.title,
  description: securitySeo.description,
  canonical: securitySeo.canonical,
  schema: securityPageSchema(),
  type: "security",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.security,
}

export const privacyRoute: RouteMeta = {
  path: "/privatnost/",
  title: privacySeo.title,
  description: privacySeo.description,
  canonical: privacySeo.canonical,
  schema: privacyPageSchema(),
  type: "privacy",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.privacy,
}

export const notFoundRoute: RouteMeta = {
  path: "/404",
  title: "Stranica nije pronađena | Bitcoin Savjetovanje",
  description: "Stranica koju tražite ne postoji.",
  canonical: `${SITE_URL}/404`,
  schema: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Stranica nije pronađena",
    url: `${SITE_URL}/404`,
    inLanguage: "hr-HR",
  },
  type: "not-found",
  lastmod: SITE_UPDATED_AT,
  ogType: "website",
  ...socialImages.default,
}

export const prerenderRoutes: RouteMeta[] = [
  homeRoute,
  budgetRoute,
  debtRoute,
  givingRoute,
  bitcoinMoneyRoute,
  netWorthRoute,
  timeVolatilityRoute,
  custodySecurityRoute,
  bitcoinAdviceRoute,
  conversationRoute,
  bitcoinConsultationRoute,
  personalBitcoinStandardRoute,
  samplePersonalBitcoinStandardRoute,
  bitcoinStandardCheckRoute,
  ...audienceRouteMetas,
  guidesIndexRoute,
  ...guideRouteMetas,
  ...guideAliasRouteMetas,
  securityRoute,
  privacyRoute,
]

export function findGuideRouteMeta(slug: string | undefined) {
  return [...guideRouteMetas, ...guideAliasRouteMetas].find(
    (route) => route.path === `/vodici/${slug}`
  )
}

export function findAudienceRouteMeta(slug: AudienceSlug) {
  const route = audienceRouteMetas.find(
    (routeMeta) =>
      routeMeta.path === audiencePages.find((page) => page.slug === slug)?.path
  )

  if (!route) {
    throw new Error(`Audience route metadata not found for ${slug}`)
  }

  return route
}
