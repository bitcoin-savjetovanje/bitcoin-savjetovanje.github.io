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
      "Jedan fokusiran razgovor za jasniju sliku glavnog problema i sljedećeg razumnog koraka.",
    includes: [
      "pregled novčanog toka, duga, Bitcoina i ostatka imovine",
      "identifikacija glavnih rizika i otvorenih odluka",
      "okvirni smjer za Bitcoin u neto imovini",
      "kratki pisani sažetak nakon poziva",
      "preporuka ima li smisla nastaviti u strukturirani program",
    ],
    cta: PRIMARY_CTA,
  },
  {
    title: "Strukturirani program",
    price: "1.500 €",
    purpose:
      "Primjena Practical Bitcoin Standard okvira na vašu konkretnu situaciju.",
    includes: [
      "pripremni upitnik i pregled financijske slike",
      "poziv 1: budžet, dug, višak i obveze",
      "poziv 2: Bitcoin u neto imovini i ciljani raspon izloženosti",
      "poziv 3: pravila kupnje, čekanja, trošenja i preispitivanja",
      "sigurnosni i skrbnički pregled",
      "osobni dokument s pravilima",
      "follow-up nakon 30 dana",
    ],
    cta: PRIMARY_CTA,
  },
]
