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
    purpose:
      "Vidimo gdje ste, što pokušavate odlučiti i ima li smisla nastaviti.",
    includes: [
      "kratko upoznavanje situacije",
      "procjena mogu li vam pomoći",
      "preporuka sljedećeg koraka",
      "bez obveze nastavka",
    ],
    cta: PRIMARY_CTA,
  },
  {
    title: "Plaćeni savjetodavni razgovor",
    price: "200 €",
    duration: "60–90 minuta",
    purpose:
      "Jedan fokusiran razgovor za jasniju sliku glavnog pitanja i sljedećeg razumnog koraka.",
    includes: [
      "pregled osobnog proračuna, priljeva, odljeva, duga, Bitcoina i ostatka neto imovine",
      "identifikacija budućih odljeva, rizika i odluka koje nisu zapisane",
      "okvirni smjer za ulogu Bitcoina kao novca u vašoj situaciji",
      "kratki pisani sažetak nakon poziva",
      "preporuka ima li smisla nastaviti u strukturirani program",
    ],
    cta: PRIMARY_CTA,
  },
  {
    title: "Strukturirani program",
    price: "1.500 €",
    purpose:
      "Primjena Praktičnog Bitcoin standarda na vašu konkretnu situaciju.",
    includes: [
      "pripremni upitnik i pregled osobne financijske slike",
      "poziv 1: osobni proračun, priljevi, odljevi, dug i stvarni višak",
      "poziv 2: Bitcoin kao novac, novčana zaliha, neto imovina i kupovna moć",
      "poziv 3: pravila kupnje, čekanja, trošenja, usklađivanja i preispitivanja",
      "sigurnosni i obiteljski pregled",
      "osobni dokument s pravilima",
      "naknadni razgovor nakon 30 dana",
    ],
    cta: PRIMARY_CTA,
  },
]
