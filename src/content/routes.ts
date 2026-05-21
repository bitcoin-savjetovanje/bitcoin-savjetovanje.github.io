import { guideHref, guides } from "./guides"
import {
  breadcrumbSchema,
  bitcoinConsultationPageSchema,
  bitcoinAdvicePageSchema,
  conversationPageSchema,
  guideSchema,
  guidesIndexSchema,
  homeSchema,
  personalBitcoinStandardPageSchema,
  privacyPageSchema,
  securityPageSchema,
} from "./schema"
import {
  OG_IMAGE_URL,
  SITE_UPDATED_AT,
  SITE_URL,
  budgetSeo,
  bitcoinAdviceSeo,
  bitcoinConsultationSeo,
  conversationSeo,
  custodySecuritySeo,
  debtSeo,
  givingSeo,
  guidesIndexSeo,
  homeSeo,
  netWorthSeo,
  personalBitcoinStandardSeo,
  privacySeo,
  securitySeo,
  timeVolatilitySeo,
} from "./site"

export type RouteType =
  | "home"
  | "budget"
  | "debt"
  | "giving"
  | "net-worth"
  | "time-volatility"
  | "custody-security"
  | "bitcoin-advice"
  | "conversation"
  | "bitcoin-consultation"
  | "personal-bitcoin-standard"
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
}

export const guideRouteMetas: RouteMeta[] = guides.map((guide) => ({
  path: `/vodici/${guide.slug}`,
  title: `${guide.seoTitle ?? guide.title} | Bitcoin Savjetovanje`,
  description: guide.metaDescription,
  canonical: `${SITE_URL}${guideHref(guide.slug)}`,
  schema: guideSchema(guide),
  type: "guide",
  lastmod: guide.updatedAt,
  ogType: "article",
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
    ogImage: OG_IMAGE_URL,
    ogImageWidth: 1200,
    ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
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
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
}

export const prerenderRoutes: RouteMeta[] = [
  homeRoute,
  budgetRoute,
  debtRoute,
  givingRoute,
  netWorthRoute,
  timeVolatilityRoute,
  custodySecurityRoute,
  bitcoinAdviceRoute,
  conversationRoute,
  bitcoinConsultationRoute,
  personalBitcoinStandardRoute,
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
