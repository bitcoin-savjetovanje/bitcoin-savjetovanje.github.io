import { guideHref, guides, type Guide } from "./guides"
import { offers } from "./offers"
import {
  EMAIL,
  OG_IMAGE_URL,
  SITE_URL,
  guidesIndexSeo,
  securitySeo,
} from "./site"

type BreadcrumbItem = {
  name: string
  item: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }
}

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Bitcoin Savjetovanje",
        url: `${SITE_URL}/`,
        inLanguage: "hr-HR",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#pavao-pahljina`,
        name: "Pavao Pahljina",
        jobTitle: "Bitcoin savjetnik",
        url: `${SITE_URL}/`,
        email: EMAIL,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "Bitcoin Savjetovanje",
        url: `${SITE_URL}/`,
        email: EMAIL,
        areaServed: ["Hrvatska", "Online"],
        founder: { "@id": `${SITE_URL}/#pavao-pahljina` },
        serviceType: "Provjera i izgradnja osobnog Bitcoin standarda",
        description:
          "Savjetodavni rad za osobna pravila o proračunu, dugu, davanju, Bitcoinu kao novcu, neto imovini, sigurnosti i obitelji. Prvi korak je 15-minutni uvodni razgovor bez naknade i bez obveze. Nije licencirano financijsko, porezno ili pravno savjetovanje.",
      },
      {
        "@type": "OfferCatalog",
        name: "Bitcoin Savjetovanje programi",
        itemListElement: offers.map((offer) => ({
          "@type": "Offer",
          name: offer.title,
          price: offer.price.replace(" €", "").replace(".", ""),
          priceCurrency: "EUR",
          description: offer.purpose,
        })),
      },
    ],
  }
}

export function guideSchema(guide: Guide) {
  const guideUrl = `${SITE_URL}${guideHref(guide.slug)}`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.metaDescription,
        url: guideUrl,
        mainEntityOfPage: guideUrl,
        datePublished: guide.publishedAt,
        dateModified: guide.updatedAt,
        inLanguage: "hr-HR",
        author: {
          "@type": "Person",
          "@id": `${SITE_URL}/#pavao-pahljina`,
          name: "Pavao Pahljina",
        },
        publisher: {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#service`,
          name: "Bitcoin Savjetovanje",
        },
        image: OG_IMAGE_URL,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "Bitcoin",
          "proračun nulte osnove",
          "dug",
          "davanje",
          "kupovna moć",
          "neto imovina",
          "skrbništvo",
          "osobni Bitcoin standard",
        ],
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: "Vodiči", item: guidesIndexSeo.canonical },
        { name: guide.title, item: guideUrl },
      ]),
    ],
  }
}

export function guidesIndexSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Vodiči za osobni Bitcoin standard",
        description: guidesIndexSeo.description,
        url: guidesIndexSeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: guides.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: guide.title,
            url: `${SITE_URL}${guideHref(guide.slug)}`,
          })),
        },
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: "Vodiči", item: guidesIndexSeo.canonical },
      ]),
    ],
  }
}

export function securityPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Sigurnost i povjerljivost",
        description: securitySeo.description,
        url: securitySeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: "Sigurnost i povjerljivost", item: securitySeo.canonical },
      ]),
    ],
  }
}
