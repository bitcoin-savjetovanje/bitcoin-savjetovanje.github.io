import {
  findGuide,
  guideHref,
  guidesIndexOrderedSlugs,
  guidesIndexPrimaryItems,
  type Guide,
} from "./guides"
import { offers } from "./offers"
import {
  EMAIL,
  OG_IMAGE_URL,
  SITE_URL,
  bitcoinConsultationSeo,
  conversationSeo,
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
        serviceType:
          "Uvodni Bitcoin razgovor, Bitcoin konzultacija i osobni Bitcoin standard",
        description:
          "Savjetodavni rad za razumijevanje Bitcoina, osobna pravila, sigurnost i obiteljski okvir. Prvi korak je 15-minutni uvodni razgovor bez naknade i bez obveze. Nije financijsko, porezno ili pravno savjetovanje, upravljanje imovinom ili skrbništvo nad Bitcoinom.",
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

export function conversationPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Dogovorite 15-minutni uvodni razgovor",
        description: conversationSeo.description,
        url: conversationSeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: "Razgovor", item: conversationSeo.canonical },
      ]),
    ],
  }
}

export function bitcoinConsultationPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Bitcoin konzultacija",
        description: bitcoinConsultationSeo.description,
        url: bitcoinConsultationSeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
      },
      {
        "@type": "Service",
        name: "Bitcoin konzultacija",
        serviceType: "Jedan dubinski Bitcoin razgovor",
        description:
          "Jedan dubinski razgovor za jedno ozbiljno Bitcoin pitanje koje utječe na vašu odluku. Bez savjeta kupi ili prodaj, bez prognoza cijene i bez traženja seed phrase.",
        provider: {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#service`,
          name: "Bitcoin Savjetovanje",
        },
        offers: {
          "@type": "Offer",
          name: "Bitcoin konzultacija",
          price: "200",
          priceCurrency: "EUR",
          url: bitcoinConsultationSeo.canonical,
        },
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        {
          name: "Bitcoin konzultacija",
          item: bitcoinConsultationSeo.canonical,
        },
      ]),
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
  const primaryGuideNames = new Map(
    guidesIndexPrimaryItems.map((guide) => [guide.slug, guide.title])
  )

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
          itemListElement: guidesIndexOrderedSlugs.flatMap((slug, index) => {
            const guide = findGuide(slug)

            if (!guide) {
              return []
            }

            return [
              {
                "@type": "ListItem",
                position: index + 1,
                name: primaryGuideNames.get(slug) ?? guide.title,
                url: `${SITE_URL}${guideHref(guide.slug)}`,
              },
            ]
          }),
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
