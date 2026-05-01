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
      "sljedeći razuman korak",
      "kratki pisani sažetak",
    ],
    cta: PRIMARY_CTA,
  },
  {
    title: "Strukturirani program",
    price: "1.500 €",
    purpose: "Tri poziva za vaš osobni Bitcoin standard.",
    includes: [
      "poziv 1: osobni proračun, dug i stvarni višak",
      "poziv 2: darivanje, Bitcoin kao novac i kupovna moć",
      "poziv 3: neto imovina, pravila, sigurnost i obitelj",
      "osobni dokument s pravilima",
      "razgovor nakon 30 dana",
    ],
    cta: PRIMARY_CTA,
  },
]
