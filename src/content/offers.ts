import { BITCOIN_CLARITY_PATH, CONVERSATION_PATH } from "./site"

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
    forWhom: "Za prvo pitanje ili odluku koju želite razjasniti.",
    detail:
      "Prvi kontakt bez naknade i bez obveze. Kažete što pokušavate odlučiti, ja postavim nekoliko pitanja i predložim razuman sljedeći korak.",
    purpose:
      "Kažete gdje ste sada, prepoznamo što prvo treba razjasniti i dobijete jasniju procjenu sljedećeg koraka.",
    includes: [
      "Za prvo razjašnjenje jedne odluke ili pitanja",
      "Bez slanja osjetljivih podataka",
      "Bez prodaje Bitcoina, prognoza i upravljanja sredstvima",
    ],
    cta: "Dogovorite uvodni razgovor",
    href: CONVERSATION_PATH,
    dataCta: "offer-intro-call",
  },
  {
    title: "Bitcoin jasnoća",
    price: "200 €",
    duration: "Jedan dubinski razgovor",
    forWhom:
      "Za osobu koja želi jedan ozbiljan razgovor o Bitcoinu, vlastitoj situaciji i odluci koju ne želi donositi napamet.",
    detail:
      "Za osobu koja želi jedan ozbiljan razgovor o Bitcoinu, vlastitoj situaciji i odluci koju ne želi donositi napamet.",
    purpose:
      "Razjašnjavamo Bitcoin tezu, osobnu situaciju, prepreke i sljedeći razuman korak bez preuzimanja odluke.",
    includes: [
      "Jasniji odgovori na pitanja koja se stalno vraćaju",
      "Razjašnjenje Bitcoin teze na jeziku koji možete ponoviti drugima",
      "Pregled osobne slike: dug, proračun, sigurnost, obitelj i struktura imovine",
      "Jasniji okvir za vlastitu odluku o ulozi Bitcoina",
      "Preporuka treba li stati na tome ili ići u puni osobni Bitcoin standard",
    ],
    cta: "Prvo dogovorite uvodni razgovor",
    href: CONVERSATION_PATH,
    dataCta: "offer-bitcoin-jasnoca",
    badge: "Prvi plaćeni korak",
    detailLink: {
      label: "Što je Bitcoin jasnoća?",
      href: BITCOIN_CLARITY_PATH,
      dataLink: "offer-bitcoin-clarity-details",
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
      "Pravila za proračun, stvarni višak i buduća plaćanja",
      "Jasan odnos prema dugu i potrošnji budućeg novca",
      "Uloga Bitcoina u novcu i neto imovini",
      "Pravila za padove, rastove i emocionalni pritisak",
      "Sigurnosni i obiteljski okvir bez predaje kontrole",
    ],
    cta: "Krenite od uvodnog razgovora",
    href: CONVERSATION_PATH,
    dataCta: "offer-personal-standard",
  },
]
