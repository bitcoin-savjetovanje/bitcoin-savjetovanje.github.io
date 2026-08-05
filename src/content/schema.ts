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
  PAVAO_PAHLJINA_GITHUB_URL,
  PAVAO_PAHLJINA_IMAGE_URL,
  PAVAO_PAHLJINA_LINKEDIN_URL,
  PAVAO_PAHLJINA_PROFILE_URL,
  PAVAO_PAHLJINA_X_URL,
  SITE_URL,
  bitcoinAdviceSeo,
  bitcoinConsultationSeo,
  bitcoinStandardCheckSeo,
  businessBitcoinSeo,
  businessBitcoinOnePagerSeo,
  conversationSeo,
  guidesIndexSeo,
  missedBitcoinSeo,
  personalBitcoinStandardSeo,
  pavaoPahljinaSeo,
  privacySeo,
  samplePersonalBitcoinStandardSeo,
  securitySeo,
} from "./site"
import { personalBitcoinStandardFaqs } from "./personalBitcoinStandard"
import { businessBitcoinFaqs } from "./business"
import { consultationFaqs } from "./bitcoinConsultation"
import { homepageFaqs } from "./faq"
import { missedBitcoinFaqs } from "./missedBitcoin"

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
        jobTitle: "Bitcoin savjetnik i autor",
        url: PAVAO_PAHLJINA_PROFILE_URL,
        image: PAVAO_PAHLJINA_IMAGE_URL,
        description: pavaoPahljinaSeo.description,
        email: EMAIL,
        sameAs: [
          PAVAO_PAHLJINA_LINKEDIN_URL,
          PAVAO_PAHLJINA_X_URL,
          PAVAO_PAHLJINA_GITHUB_URL,
        ],
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
          "Privatno savjetovanje za pojedince, obitelji i poduzetnike koji žele Bitcoin koristiti kao primarni novac te povezati proračun, dug, imovinu, trošenje i sigurnost. Prvi korak može biti besplatna samoprovjera ili 15-minutni uvodni razgovor. Nije financijsko, porezno, pravno ili računovodstveno savjetovanje, upravljanje imovinom ili skrbništvo nad Bitcoinom.",
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
      {
        "@type": "FAQPage",
        mainEntity: homepageFaqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  }
}

export function pavaoPahljinaProfileSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${PAVAO_PAHLJINA_PROFILE_URL}#profile-page`,
        name: pavaoPahljinaSeo.title,
        description: pavaoPahljinaSeo.description,
        url: PAVAO_PAHLJINA_PROFILE_URL,
        inLanguage: "hr-HR",
        dateModified: "2026-07-24",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#pavao-pahljina` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#pavao-pahljina`,
        name: "Pavao Pahljina",
        givenName: "Pavao",
        familyName: "Pahljina",
        jobTitle: "Bitcoin savjetnik i autor",
        description: pavaoPahljinaSeo.description,
        url: PAVAO_PAHLJINA_PROFILE_URL,
        image: PAVAO_PAHLJINA_IMAGE_URL,
        email: EMAIL,
        sameAs: [
          PAVAO_PAHLJINA_LINKEDIN_URL,
          PAVAO_PAHLJINA_X_URL,
          PAVAO_PAHLJINA_GITHUB_URL,
        ],
        knowsAbout: [
          "Bitcoin",
          "Bitcoin kao novac",
          "osobni Bitcoin standard",
          "Bitcoin sigurnost",
          "Bitcoin za tvrtke",
          "monetarna ekonomija",
        ],
        worksFor: { "@id": `${SITE_URL}/#service` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "Bitcoin Savjetovanje",
        url: `${SITE_URL}/`,
        email: EMAIL,
        areaServed: ["Hrvatska", "Online"],
        founder: { "@id": `${SITE_URL}/#pavao-pahljina` },
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: "Pavao Pahljina", item: PAVAO_PAHLJINA_PROFILE_URL },
      ]),
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

export function missedBitcoinPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Mogao sam kupiti Bitcoin ranije. Što sada?",
        description: missedBitcoinSeo.description,
        url: missedBitcoinSeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "jesam li zakasnio u Bitcoin",
          "kada kupiti Bitcoin",
          "propustio sam Bitcoin",
          "kako početi s Bitcoinom",
          "osobni Bitcoin standard",
          "Bitcoin sigurnost",
        ],
        provider: { "@id": `${SITE_URL}/#service` },
      },
      {
        "@type": "FAQPage",
        mainEntity: missedBitcoinFaqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        {
          name: "Mogao sam kupiti Bitcoin ranije. Što sada?",
          item: missedBitcoinSeo.canonical,
        },
      ]),
    ],
  }
}

export function businessBitcoinPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Bitcoin briefing za upravu i tvrtke",
        description: businessBitcoinSeo.description,
        url: businessBitcoinSeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "Bitcoin briefing za upravu",
          "mapa poslovnih odluka",
          "podjela odgovornosti",
          "Bitcoin plaćanja",
          "poslovni novac",
          "pisani sažetak za upravu",
        ],
      },
      {
        "@type": "Service",
        name: "Bitcoin briefing za upravu",
        serviceType: "Zatvoreni i pripremljeni Bitcoin briefing za upravu",
        description:
          "Radni sastanak za vlasnika, upravu i financijski tim koji razdvaja poslovna pitanja, odgovornosti i potrebna stručna mišljenja te završava pisanim sažetkom. Ne uključuje upravljanje imovinom, skrbništvo, izvršavanje transakcija ni pravno, porezno, računovodstveno ili regulirano savjetovanje o kriptoimovini.",
        provider: {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#service`,
          name: "Bitcoin Savjetovanje",
        },
        areaServed: ["Hrvatska", "Online"],
        audience: [
          { "@type": "BusinessAudience", audienceType: "uprave" },
          { "@type": "BusinessAudience", audienceType: "vlasnici i direktori" },
          { "@type": "BusinessAudience", audienceType: "financijski timovi" },
          { "@type": "BusinessAudience", audienceType: "hrvatske tvrtke" },
        ],
        url: businessBitcoinSeo.canonical,
      },
      {
        "@type": "FAQPage",
        mainEntity: businessBitcoinFaqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: "Bitcoin za tvrtke", item: businessBitcoinSeo.canonical },
      ]),
    ],
  }
}

export function businessBitcoinOnePagerPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Sažetak Bitcoin briefinga za upravu",
        description: businessBitcoinOnePagerSeo.description,
        url: businessBitcoinOnePagerSeo.canonical,
        inLanguage: "hr-HR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        about: [
          "Bitcoin briefing za upravu",
          "poslovni povodi",
          "dnevni red briefinga",
          "pisani sažetak za upravu",
          "podjela odgovornosti",
        ],
      },
      breadcrumbSchema([
        { name: "Početna", item: `${SITE_URL}/` },
        { name: "Bitcoin za tvrtke", item: businessBitcoinSeo.canonical },
        {
          name: "Sažetak Bitcoin briefinga za upravu",
          item: businessBitcoinOnePagerSeo.canonical,
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
        name: "Besplatni uvodni Bitcoin razgovor",
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
        name: "Bitcoin konzultacija | 60 minuta za jedno ozbiljno pitanje",
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
        serviceType: "Pripremljena Bitcoin konzultacija",
        description:
          "Jedno unaprijed definirano pitanje, pripremljen razgovor od 60 minuta i kratak Sažetak Bitcoin konzultacije s glavnim zaključcima, otvorenim pitanjima, preporučenim materijalima i prvim sljedećim korakom.",
        provider: {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#service`,
          name: "Bitcoin Savjetovanje",
        },
        offers: {
          "@type": "Offer",
          name: offerFacts.bitcoinConsultation.title,
          description:
            "Konzultacija se dogovara nakon besplatnog 15-minutnog uvodnog razgovora.",
          price: String(offerFacts.bitcoinConsultation.priceAmount),
          priceCurrency: "EUR",
          url: `${SITE_URL}${offerFacts.bitcoinConsultation.detailsHref}`,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: consultationFaqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
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
          "Privatni program od 4 do 6 tjedana koji povezuje proces donošenja odluka, pisani osobni Bitcoin standard te primjenu i reviziju pravila za proračun, dug, Bitcoin kao primarni novac, neto imovinu, sigurnost i obiteljski kontinuitet.",
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
      {
        "@type": "FAQPage",
        mainEntity: personalBitcoinStandardFaqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
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
        name: "Primjer osobnog Bitcoin standarda",
        description: samplePersonalBitcoinStandardSeo.description,
        url: samplePersonalBitcoinStandardSeo.canonical,
        inLanguage: "hr-HR",
        isAccessibleForFree: true,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Bitcoin Savjetovanje",
        },
        mainEntity: {
          "@type": "DigitalDocument",
          name: "Izmišljeni ogledni primjer osobnog Bitcoin standarda",
          description:
            "Ogledni pisani dokument s 18 stranica sadržaja i naslovnicom.",
          url: `${SITE_URL}/downloads/sample-osobni-bitcoin-standard.pdf`,
          encodingFormat: "application/pdf",
          numberOfPages: 19,
          inLanguage: "hr-HR",
          isAccessibleForFree: true,
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
          name: "Primjer osobnog Bitcoin standarda",
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
          "razumijevanje Bitcoina",
          "osobne financije",
          "život s Bitcoinom",
          "sigurnost i kontinuitet",
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
  const serviceSchema =
    page.slug === "osobno"
      ? []
      : [
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
        ]

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
      ...serviceSchema,
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
  const guideTopics =
    guide.slug === "bitcoin-core-standard"
      ? [
          "Bitcoin Core Standard",
          "Bitcoin Core",
          "offline potpisivanje",
          "watch-only wallet",
          "PSBT",
          "Bitcoin Core wallet backup",
          "obiteljski Bitcoin trezor",
        ]
      : [
          "Bitcoin",
          "proračun nulte osnove",
          "dug",
          "davanje",
          "kupovna moć",
          "neto imovina",
          "skrbništvo",
          "osobni Bitcoin standard",
        ]

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
        about: guideTopics,
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
        name: "Bitcoin sigurnost i skrbništvo",
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
          name: "Bitcoin sigurnost i skrbništvo",
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
