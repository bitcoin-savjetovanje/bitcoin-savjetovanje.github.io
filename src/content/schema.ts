import { faqs } from "./faq"
import type { Guide } from "./guides"
import { offers } from "./offers"
import { EMAIL, SITE_URL } from "./site"

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
        serviceType: "Bitcoin education and advisory framework",
        description:
          "Edukativan i savjetodavan okvir za Bitcoin odluke, budžet, dug, neto imovinu, skrbništvo i sigurnost. Nije licencirano financijsko, porezno ili pravno savjetovanje.",
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
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  }
}

export function guideSchema(guide: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    author: {
      "@type": "Person",
      name: "Pavao Pahljina",
    },
    publisher: {
      "@type": "Organization",
      name: "Bitcoin Savjetovanje",
    },
    mainEntityOfPage: `${SITE_URL}/vodici/${guide.slug}`,
    inLanguage: "hr-HR",
  }
}
