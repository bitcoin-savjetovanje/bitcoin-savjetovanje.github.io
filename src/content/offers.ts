import { BITCOIN_CONSULTATION_PATH, CONVERSATION_PATH } from "./site"

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
      "Bez naknade i bez obveze. Cilj je vidjeti što prvo treba razjasniti i ima li smisla ići dublje.",
    purpose:
      "Kažete gdje ste sada, prepoznamo što prvo treba razjasniti i dobijete jasniju procjenu sljedećeg koraka.",
    includes: [
      "15 minuta",
      "Bez naknade i bez obveze",
      "Cilj: vidjeti što prvo treba razjasniti i ima li smisla ići dublje",
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
      "Jedan dubinski razgovor za jedno ozbiljno Bitcoin pitanje koje utječe na vašu odluku.",
    detail:
      "Jedan dubinski razgovor za jedno ozbiljno Bitcoin pitanje koje utječe na vašu odluku.",
    purpose:
      "Razjašnjavamo Bitcoin tezu, osobnu situaciju, prepreke i sljedeći razuman korak bez preuzimanja odluke.",
    includes: [
      "Jedan dubinski razgovor",
      "Za jedno ozbiljno Bitcoin pitanje",
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
      "Za osobu ili obitelj koja želi pisana pravila za novac, dug, Bitcoin, sigurnost i obiteljski pristup.",
    detail:
      "Za osobu ili obitelj koja ne želi samo odgovore na pitanja, nego pisana pravila za novac, dug, Bitcoin, neto imovinu, sigurnost i obiteljski pristup.",
    purpose:
      "Izgradnja pisanog osobnog Bitcoin standarda za mirnije odluke, sigurnosni okvir i obiteljska pravila bez predaje kontrole.",
    includes: [
      "4–6 tjedana",
      "Pisani okvir za proračun, dug, Bitcoin, neto imovinu, sigurnost i obitelj",
      "Ozbiljniji nastavak kada jedno pitanje više nije dovoljno",
    ],
    cta: "Krenite od uvodnog razgovora",
    href: CONVERSATION_PATH,
    dataCta: "offer-personal-standard",
  },
]
