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
    purpose: "U 15 minuta vidimo gdje ste i ima li smisla nastaviti.",
    includes: [
      "vaša situacija",
      "glavna odluka",
      "sljedeći korak",
      "bez obveze",
    ],
    cta: PRIMARY_CTA,
  },
  {
    title: "Savjetodavni razgovor",
    price: "200 €",
    duration: "60–90 minuta",
    purpose: "Jedan razgovor za jedno glavno pitanje.",
    includes: [
      "pregled proračuna, duga, Bitcoina i ostatka imovine",
      "jasnije pitanje koje pokušavate riješiti",
      "smjer za ulogu Bitcoina u vašoj situaciji",
      "kratki pisani sažetak",
      "preporuka ima li smisla nastaviti",
    ],
    cta: PRIMARY_CTA,
  },
  {
    title: "Strukturirani program",
    price: "1.500 €",
    purpose: "Tri poziva za osobna pravila o Bitcoinu i imovini.",
    includes: [
      "pripremni upitnik",
      "poziv 1: proračun, dug i stvarni višak",
      "poziv 2: Bitcoin, imovina i kupovna moć",
      "poziv 3: pravila kupnje, čekanja, trošenja i preispitivanja",
      "sigurnost i obiteljski pristup",
      "osobni dokument s pravilima",
      "razgovor nakon 30 dana",
    ],
    cta: PRIMARY_CTA,
  },
]
