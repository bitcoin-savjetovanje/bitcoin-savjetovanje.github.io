import { guides } from "./guides"
import { guideSchema, homeSchema } from "./schema"
import { OG_IMAGE_URL, SITE_UPDATED_AT, SITE_URL, homeSeo } from "./site"

export type RouteType = "home" | "guide" | "not-found"
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

export const guideRouteMetas: RouteMeta[] = guides.map((guide) => ({
  path: `/vodici/${guide.slug}`,
  title: `${guide.title} | Bitcoin Savjetovanje`,
  description: guide.metaDescription,
  canonical: `${SITE_URL}/vodici/${guide.slug}`,
  schema: guideSchema(guide),
  type: "guide",
  lastmod: guide.updatedAt,
  ogType: "article",
  ogImage: OG_IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
}))

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

export const prerenderRoutes: RouteMeta[] = [homeRoute, ...guideRouteMetas]

export function findGuideRouteMeta(slug: string | undefined) {
  return guideRouteMetas.find((route) => route.path === `/vodici/${slug}`)
}
