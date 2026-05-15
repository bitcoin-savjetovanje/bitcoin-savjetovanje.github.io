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

export const offers: Offer[] = [
  {
    title: "Uvodni razgovor",
    price: "0 €",
    duration: "15 minuta",
    forWhom: "Bez naknade i bez obveze.",
    detail:
      "Prvi korak. Vidimo što prvo treba razjasniti i ima li smisla ići dublje.",
    purpose:
      "Kažete gdje ste sada, prepoznamo prvo usko grlo i dobijete jasniju procjenu sljedećeg koraka.",
    includes: [
      "15 minuta",
      "Bez naknade i bez obveze",
      "Cilj: kratak odgovor, Bitcoin konzultacija ili osobni Bitcoin standard",
    ],
    cta: "Dogovorite uvodni razgovor",
    href: CONVERSATION_PATH,
    dataCta: "offer-intro-call",
  },
  {
    title: "Bitcoin konzultacija",
    price: "200 €",
    duration: "Jedan dubinski razgovor",
    forWhom:
      "Jedan dubinski razgovor za jedno ozbiljno pitanje koje utječe na odluku.",
    detail: "Jedno pitanje. Jedna odluka. Jedan dubinski razgovor.",
    purpose:
      "Razjašnjavamo Bitcoin tezu, osobnu, obiteljsku ili poslovnu situaciju, prepreke i sljedeći razuman korak bez preuzimanja odluke.",
    includes: [
      "Jedan dubinski razgovor",
      "Za jedno ozbiljno pitanje",
      "Razjašnjenje osobne situacije bez preuzimanja odluke",
    ],
    cta: "Prvo dogovorite uvodni razgovor",
    href: CONVERSATION_PATH,
    dataCta: "offer-bitcoin-consultation",
    badge: "Prvi plaćeni korak",
    detailLink: {
      label: "Što je Bitcoin konzultacija?",
      href: BITCOIN_CONSULTATION_PATH,
      dataLink: "offer-bitcoin-consultation-details",
    },
  },
  {
    title: "Osobni Bitcoin standard",
    price: "1.500 €",
    duration: "4–6 tjedana",
    forWhom:
      "Za osobu, obitelj ili vlasnika posla koji želi pisana pravila za novac, dug, Bitcoin, sigurnost i obiteljski ili poslovni pristup.",
    detail: "Cijeli sustav. Više tjedana. Pisani okvir.",
    purpose:
      "Izgradnja pisanog osobnog Bitcoin standarda za mirnije odluke, sigurnosni okvir i privatna, obiteljska ili poslovna pravila bez predaje kontrole.",
    includes: [
      "4–6 tjedana",
      "Pisani standard",
      "Pravila za privatni, obiteljski i po potrebi poslovni sloj",
      "Sigurnosni i operativni okvir",
    ],
    cta: "Krenite od uvodnog razgovora",
    href: CONVERSATION_PATH,
    dataCta: "offer-personal-standard",
    detailLink: {
      label: "Pogledajte program",
      href: PERSONAL_BITCOIN_STANDARD_PATH,
      dataLink: "offer-personal-standard-details",
    },
  },
]
