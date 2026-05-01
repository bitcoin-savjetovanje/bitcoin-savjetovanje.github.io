import { PRIMARY_CTA } from "./site"

export type Offer = {
  title: string
  price: string
  duration?: string
  forWhom: string
  detail: string
  purpose: string
  includes: string[]
  cta: string
}

export const offers: Offer[] = [
  {
    title: "Uvodni razgovor",
    price: "0 €",
    duration: "15 minuta",
    forWhom: "Za prvi korak.",
    detail: "15 minuta. Bez naknade.",
    purpose:
      "Vidimo gdje ste, što pokušavate odlučiti i ima li smisla nastaviti.",
    includes: [
      "imate li Bitcoin",
      "postoji li dug",
      "što je glavno pitanje",
      "jedno pitanje o Bitcoinu koje vam nije jasno",
      "ima li smisla nastaviti",
    ],
    cta: PRIMARY_CTA,
  },
  {
    title: "Savjetodavni razgovor",
    price: "200 €",
    duration: "60 do 90 minuta",
    forWhom: "Za odluku koju želite razjasniti prije sljedećeg koraka.",
    detail: "60 - 90 minuta, po potrebi.",
    purpose:
      "Prođemo situaciju, mogućnosti i granice odluke koju želite donijeti.",
    includes: [
      "dug ili Bitcoin",
      "prodati ili čekati",
      "sigurnost",
      "obiteljski pristup",
      "proračun i stvarni višak",
    ],
    cta: PRIMARY_CTA,
  },
  {
    title: "Strukturirani program",
    price: "1.500 €",
    duration: "4–6 tjedana",
    forWhom: "Za izgradnju cijelog osobnog Bitcoin standarda.",
    detail: "4-6 tjedana. Kontinuirana komunikacija.",
    purpose:
      "Pisana pravila za novac, dug, darivanje, Bitcoin, neto imovinu i sigurnost.",
    includes: [
      "pripremni upitnik",
      "4 radna razgovora kroz 4–6 tjedana",
      "osobni dokument s pravilima",
      "sigurnosni i obiteljski pregled",
      "odgovori na Bitcoin pitanja tijekom rada",
      "završni razgovor nakon 30 dana",
    ],
    cta: PRIMARY_CTA,
  },
]
