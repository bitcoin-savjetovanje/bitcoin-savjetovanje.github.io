import { PRIMARY_CTA } from "./site"

export type Offer = {
  title: string
  price: string
  duration?: string
  purpose: string
  includes: string[]
  cta: string
}

export const offers: Offer[] = [
  {
    title: "Uvodni razgovor",
    price: "0 €",
    duration: "15 minuta",
    purpose: "Vidimo gdje ste, što vas muči i koji je sljedeći razuman korak.",
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
    duration: "60–90 minuta",
    purpose: "Jedno pitanje. Jedan jasan okvir za odluku.",
    includes: [
      "osobni proračun i stvarni višak",
      "dug i budući odljevi",
      "Bitcoin kao novac",
      "neto imovina",
      "odgovori na otvorene Bitcoin nedoumice",
      "sljedeći razuman korak",
      "kratki pisani sažetak",
    ],
    cta: PRIMARY_CTA,
  },
  {
    title: "Strukturirani program",
    price: "1.500 €",
    duration: "4–6 tjedana",
    purpose:
      "4–6 tjedana rada za vaš osobni Bitcoin standard. Za ljude koji žele postaviti osobni Bitcoin standard, ne samo riješiti jedno pitanje.",
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
