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
    title: "Uvodna provjera",
    price: "0 €",
    duration: "15 minuta",
    forWhom: "Za prvi korak ako želite vidjeti ima li razgovor smisla.",
    detail: "15 minuta. Bez naknade. Bez obveze.",
    purpose:
      "Provjerimo gdje ste: imate li Bitcoin, postoji li dug, znate li stvarni višak i koji dio sustava trenutno stvara najviše pritiska.",
    includes: [
      "kratka provjera osobnog Bitcoin standarda",
      "glavno pitanje koje treba razjasniti",
      "što bi bio razuman sljedeći korak",
      "jasno ne ako ne mogu pomoći",
    ],
    cta: PRIMARY_CTA,
  },
  {
    title: "Provjera osobnog Bitcoin standarda",
    price: "200 €",
    duration: "60–90 minuta",
    forWhom:
      "Za osobu koja već ima Bitcoin i želi provjeriti gdje joj sustav puca.",
    detail: "Jedan dublji razgovor s jasnim zaključcima.",
    purpose:
      "Prođemo proračun nulte osnove, dug, stvarni višak, darivanje, Bitcoin kao novac, sigurnost i obiteljski pristup.",
    includes: [
      "pitanja za provjeru stvarnog viška",
      "pregled rizika prisilne prodaje",
      "provjera pravila za rast i pad kupovne moći",
      "sljedeća pravila koja trebate zapisati",
    ],
    cta: PRIMARY_CTA,
  },
  {
    title: "Izgradnja osobnog Bitcoin standarda",
    price: "1.500 €",
    duration: "4–6 tjedana",
    forWhom:
      "Za izgradnju cijelog pisanog sustava za novac, dug, Bitcoin, sigurnost i obitelj.",
    detail: "4–6 tjedana rada, razgovori i pisani osobni standard.",
    purpose:
      "Ne dobivate prognozu cijene. Ne dobivate uputu za trgovanje. Dobivate pisana pravila za novac, dug, darivanje, Bitcoin, kupovnu moć, neto imovinu, sigurnost i obitelj.",
    includes: [
      "pripremni upitnik",
      "radni razgovori kroz 4–6 tjedana",
      "pisani osobni Bitcoin standard",
      "sigurnosni i obiteljski pregled",
      "pravila za preispitivanje nakon promjena",
    ],
    cta: PRIMARY_CTA,
  },
]
