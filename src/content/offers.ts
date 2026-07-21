import {
  BITCOIN_CONSULTATION_PATH,
  CONVERSATION_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
} from "./site"

export type Offer = {
  title: string
  price: string
  duration?: string
  forWhom: string
  detail: string
  purpose: string
  includes: string[]
  cta: string
  href: string
  dataCta: string
  badge?: string
  detailLink?: {
    label: string
    href: string
    dataLink: string
  }
}

export type OfferId = "introCall" | "bitcoinConsultation" | "personalStandard"

export type OfferFacts = {
  title: string
  price: string
  priceAmount: number
  duration: string
  bookingHref: string
  detailsHref?: string
}

export const offerFacts = {
  introCall: {
    title: "Uvodni razgovor",
    price: "0 €",
    priceAmount: 0,
    duration: "15 minuta",
    bookingHref: CONVERSATION_PATH,
  },
  bitcoinConsultation: {
    title: "Bitcoin konzultacija",
    price: "200 €",
    priceAmount: 200,
    duration: "60 minuta",
    bookingHref: CONVERSATION_PATH,
    detailsHref: BITCOIN_CONSULTATION_PATH,
  },
  personalStandard: {
    title: "Osobni Bitcoin standard",
    price: "1.500 €",
    priceAmount: 1500,
    duration: "4–6 tjedana",
    bookingHref: CONVERSATION_PATH,
    detailsHref: PERSONAL_BITCOIN_STANDARD_PATH,
  },
} as const satisfies Record<OfferId, OfferFacts>

type OfferCopy = Omit<Offer, "title" | "price" | "duration" | "href">

function withOfferFacts(facts: OfferFacts, copy: OfferCopy): Offer {
  return {
    title: facts.title,
    price: facts.price,
    duration: facts.duration,
    href: facts.bookingHref,
    ...copy,
  }
}

export const offers: Offer[] = [
  withOfferFacts(offerFacts.introCall, {
    forWhom: "Bez naknade i bez obveze.",
    detail:
      "Prvi filter. Jedno pitanje, jedno usko grlo, jedan sljedeći razuman korak.",
    purpose:
      "Kažete gdje ste sada, prepoznamo prvo usko grlo i dobijete jasniju procjenu sljedećeg koraka.",
    includes: [
      "Bez naknade i bez obveze",
      "Jedno pitanje ili odluka",
      "Procjena sljedećeg razumnog koraka",
    ],
    cta: "Dogovorite uvodni razgovor",
    dataCta: "offer-intro-call",
  }),
  withOfferFacts(offerFacts.bitcoinConsultation, {
    forWhom:
      "Jedan dubinski razgovor za jedno ozbiljno pitanje koje utječe na odluku.",
    detail: "Jedno pitanje. Jedna odluka. Jedan dubinski razgovor.",
    purpose:
      "Razjašnjavamo Bitcoin tezu, osobnu, obiteljsku ili poslovnu situaciju, prepreke i sljedeći razuman korak bez preuzimanja odluke.",
    includes: [
      "Za jedno ozbiljno pitanje",
      "Jedan dubinski razgovor",
      "Bez preuzimanja odluke",
    ],
    cta: "Prvo dogovorite uvodni razgovor",
    dataCta: "offer-bitcoin-consultation",
    badge: "Prvi plaćeni korak",
    detailLink: {
      label: "Što je Bitcoin konzultacija?",
      href: offerFacts.bitcoinConsultation.detailsHref,
      dataLink: "offer-bitcoin-consultation-details",
    },
  }),
  withOfferFacts(offerFacts.personalStandard, {
    forWhom:
      "Za osobu, obitelj ili vlasnika posla koji želi razriješiti prioritete i provesti pravila za novac, dug, Bitcoin, sigurnost i obiteljski ili poslovni pristup.",
    detail: "Cijeli sustav. Privatna prosudba. Provedba i revizija.",
    purpose:
      "Privatni rad na prioritizaciji, pravilima, stres-testu, provedbi i reviziji osobnog Bitcoin standarda bez predaje kontrole.",
    includes: [
      "Prioriteti i stres-test",
      "Provedbeni redoslijed",
      "4–6 tjedana rada",
      "Pisani zapis donesenih pravila",
    ],
    cta: "Krenite od uvodnog razgovora",
    dataCta: "offer-personal-standard",
    detailLink: {
      label: "Pogledajte program",
      href: offerFacts.personalStandard.detailsHref,
      dataLink: "offer-personal-standard-details",
    },
  }),
]
