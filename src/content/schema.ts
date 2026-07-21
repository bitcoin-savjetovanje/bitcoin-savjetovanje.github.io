import {
  findGuide,
  guideHref,
  guidesIndexOrderedSlugs,
  guidesIndexPrimaryItems,
  type Guide,
} from "./guides"
import { offerFacts, offers } from "./offers"
import { audienceCanonical, type AudiencePage } from "./audiences"
import {
  EMAIL,
  OG_IMAGE_URL,
  SITE_URL,
  bitcoinAdviceSeo,
  bitcoinConsultationSeo,
  bitcoinStandardCheckSeo,
  conversationSeo,
  guidesIndexSeo,
  personalBitcoinStandardSeo,
  privacySeo,
  samplePersonalBitcoinStandardSeo,
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
          "Konzultacije za pojedince, obitelji i poduzetnike koji žele Bitcoin shvatiti kao novac i urediti proračun, dug, davanje, neto imovinu, volatilnost i sigurnost. Prvi korak je 15-minutni uvodni razgovor bez naknade i bez obveze. Nije financijsko, porezno, pravno ili računovodstveno savjetovanje, upravljanje imovinom ili skrbništvo nad Bitcoinom.",
        audience: [
          { "@type": "Audience", audienceType: "individuals" },
          { "@type": "Audience", audienceType: "families" },
          { "@type": "Audience", audienceType: "entrepreneurs" },
          { "@type": "Audience", audienceType: "business owners" },
        ],
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

export function bitcoinAdvicePageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Bitcoin savjetovanje u Hrvatskoj",
        description: bitcoinAdviceSeo.description,
        url: bitcoinAdviceSeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "Bitcoin savjetovanje",
          "Bitcoin sigurnost",
          "Bitcoin konzultacije",
          "osobni Bitcoin standard",
          "poslovna riznica",
          "Bitcoin nasljeđivanje",
        ],
      },
      {
        "@type": "Service",
        name: "Bitcoin savjetovanje",
        serviceType:
          "Bitcoin savjetovanje jedan-na-jedan, uvodni razgovor i Bitcoin konzultacija",
        description:
          "Savjetodavni rad za pojedince, obitelji i poduzetnike koji žele razjasniti Bitcoin, sigurnost, obitelj, dug, proračun, poslovnu riznicu i osobni okvir za odluke. Ne uključuje upravljanje sredstvima, prognoze cijene, porezni, pravni ili računovodstveni savjet.",
        provider: {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#service`,
          name: "Bitcoin Savjetovanje",
        },
        areaServed: ["Hrvatska", "Online"],
        audience: [
          { "@type": "Audience", audienceType: "individuals" },
          { "@type": "Audience", audienceType: "families" },
          { "@type": "Audience", audienceType: "entrepreneurs" },
          { "@type": "Audience", audienceType: "business owners" },
        ],
        url: bitcoinAdviceSeo.canonical,
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        {
          name: "Bitcoin savjetovanje",
          item: bitcoinAdviceSeo.canonical,
        },
      ]),
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
        serviceType: "Dijagnostička Bitcoin konzultacija",
        description:
          "Jedan dubinski razgovor za jasniju definiciju ozbiljnog osobnog, obiteljskog ili poslovnog Bitcoin pitanja, pregled glavnih rizika i kompromisa te konkretan sljedeći korak. Bez naloga za kupnju ili prodaju, prognoza cijene i traženja početnih riječi.",
        provider: {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#service`,
          name: "Bitcoin Savjetovanje",
        },
        offers: {
          "@type": "Offer",
          name: offerFacts.bitcoinConsultation.title,
          price: String(offerFacts.bitcoinConsultation.priceAmount),
          priceCurrency: "EUR",
          url: `${SITE_URL}${offerFacts.bitcoinConsultation.detailsHref}`,
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

export function personalBitcoinStandardPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Osobni Bitcoin standard",
        description: personalBitcoinStandardSeo.description,
        url: personalBitcoinStandardSeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "osobni Bitcoin standard",
          "Bitcoin kao novac",
          "proračun",
          "dug",
          "davanje",
          "neto imovina",
          "poslovna riznica",
          "Bitcoin sigurnost",
          "obiteljski pristup Bitcoinu",
        ],
      },
      {
        "@type": "Service",
        name: "Osobni Bitcoin standard",
        serviceType:
          "Privatni program za donošenje i provedbu odluka za život s Bitcoinom",
        description:
          "Privatni program od 4 do 6 tjedana za prioritizaciju, donošenje pravila, stres-test, provedbu i reviziju odluka o proračunu, dugu, davanju, Bitcoinu kao novcu, neto imovini, sigurnosti i obitelji. Pisani standard bilježi donesene odluke, ali ne zamjenjuje proces. Program ne uključuje upravljanje sredstvima, prognoze cijene ni porezni, pravni ili računovodstveni savjet.",
        provider: {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#service`,
          name: "Bitcoin Savjetovanje",
          founder: {
            "@type": "Person",
            "@id": `${SITE_URL}/#pavao-pahljina`,
            name: "Pavao Pahljina",
          },
        },
        areaServed: ["Hrvatska", "Online"],
        audience: [
          { "@type": "Audience", audienceType: "individuals" },
          { "@type": "Audience", audienceType: "families" },
          { "@type": "Audience", audienceType: "entrepreneurs" },
          { "@type": "Audience", audienceType: "business owners" },
        ],
        url: personalBitcoinStandardSeo.canonical,
        offers: {
          "@type": "Offer",
          name: offerFacts.personalStandard.title,
          price: String(offerFacts.personalStandard.priceAmount),
          priceCurrency: "EUR",
          url: `${SITE_URL}${offerFacts.personalStandard.detailsHref}`,
        },
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        {
          name: "Osobni Bitcoin standard",
          item: personalBitcoinStandardSeo.canonical,
        },
      ]),
    ],
  }
}

export function samplePersonalBitcoinStandardPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Kako izgleda rezultat rada",
        description: samplePersonalBitcoinStandardSeo.description,
        url: samplePersonalBitcoinStandardSeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "osobni Bitcoin standard",
          "rezultat savjetodavnog procesa",
          "osobna pravila odluke",
          "Bitcoin kao novac",
          "proračun",
          "dug",
          "davanje",
          "neto imovina",
          "volatilnost",
          "Bitcoin sigurnost",
          "obiteljski pristup Bitcoinu",
        ],
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        {
          name: "Osobni Bitcoin standard",
          item: personalBitcoinStandardSeo.canonical,
        },
        {
          name: "Kako izgleda rezultat rada",
          item: samplePersonalBitcoinStandardSeo.canonical,
        },
      ]),
    ],
  }
}

export function bitcoinStandardCheckPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Provjera osobnog Bitcoin standarda",
        description: bitcoinStandardCheckSeo.description,
        url: bitcoinStandardCheckSeo.canonical,
        inLanguage: "hr-HR",
        isAccessibleForFree: true,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "osobni Bitcoin standard",
          "interaktivna samoprocjena",
          "Bitcoin kao novac",
          "proračun",
          "dug",
          "davanje",
          "neto imovina",
          "volatilnost",
          "Bitcoin sigurnost",
          "obiteljski pristup Bitcoinu",
        ],
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        {
          name: "Provjera osobnog Bitcoin standarda",
          item: bitcoinStandardCheckSeo.canonical,
        },
      ]),
    ],
  }
}

export function audiencePageSchema(page: AudiencePage) {
  const canonical = audienceCanonical(page)

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        description: page.seo.description,
        url: canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "Bitcoin savjetovanje",
          "osobni Bitcoin standard",
          "sustav odluka",
          "Bitcoin kao novac",
          page.eyebrow,
        ],
      },
      {
        "@type": "Service",
        name: page.eyebrow,
        serviceType:
          "Bitcoin savjetovanje za osobni, obiteljski ili poslovni okvir odluka",
        description: page.seo.description,
        provider: {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#service`,
          name: "Bitcoin Savjetovanje",
        },
        areaServed: ["Hrvatska", "Online"],
        url: canonical,
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: page.eyebrow, item: canonical },
      ]),
    ],
  }
}

export function guideSchema(guide: Guide) {
  const guideUrl = `${SITE_URL}${guideHref(guide.slug)}`
  const guideImageUrl = guide.cover?.src
    ? `${SITE_URL}${guide.cover.src}`
    : OG_IMAGE_URL
  const faqSchema = guide.faq?.length
    ? [
        {
          "@type": "FAQPage",
          mainEntity: guide.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
      ]
    : []

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
        image: guideImageUrl,
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
      ...faqSchema,
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
        name: "Bitcoin vodiči i istraživačke bilješke",
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
        name: "Bitcoin sigurnost i povjerljivost",
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
        {
          name: "Bitcoin sigurnost i povjerljivost",
          item: securitySeo.canonical,
        },
      ]),
    ],
  }
}

export function privacyPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Privatnost i podaci",
        description: privacySeo.description,
        url: privacySeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: "Privatnost i podaci", item: privacySeo.canonical },
      ]),
    ],
  }
}
