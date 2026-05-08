import { CONVERSATION_PATH } from "./site"

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
}

export const offers: Offer[] = [
  {
    title: "Uvodni razgovor",
    price: "0 €",
    duration: "15 minuta",
    forWhom: "Za prvo pitanje ili odluku koja vas koči.",
    detail:
      "Prvi kontakt bez naknade i bez obveze. Kažete gdje ste zapeli, ja postavim nekoliko pitanja i predložim razuman sljedeći korak.",
    purpose:
      "Kažete gdje ste zapeli, prepoznamo glavni čvor i vidimo ima li smisla nastaviti plaćeno.",
    includes: [
      "Za jedno glavno pitanje ili odluku",
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
      "Za osobu koja ima ozbiljna pitanja o Bitcoinu i želi jasniju vlastitu tezu prije veće odluke.",
    detail:
      "Za osobu koja ima ozbiljna pitanja o Bitcoinu i želi jasniju vlastitu tezu prije veće odluke.",
    purpose:
      "Razjašnjavamo Bitcoin tezu, osobnu situaciju, prepreke i sljedeći razuman korak bez preuzimanja odluke.",
    includes: [
      "Odgovori na glavna pitanja koja vas koče",
      "Razjašnjenje Bitcoin teze na jeziku koji možete ponoviti drugima",
      "Pregled prepreka: dug, proračun, sigurnost, obitelj, nejasna imovina",
      "Jasniji okvir za vlastitu odluku o ulozi Bitcoina",
      "Preporuka treba li stati na tome ili ići u puni osobni Bitcoin standard",
    ],
    cta: "Prvo dogovorite uvodni razgovor",
    href: CONVERSATION_PATH,
    dataCta: "offer-bitcoin-jasnoca",
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
      "Pravila za proračun, stvarni višak i buduće odljeve",
      "Jasan odnos prema dugu i potrošnji budućeg novca",
      "Uloga Bitcoina u novcu i neto imovini",
      "Pravila za padove, rastove i emocionalni pritisak",
      "Sigurnosni i obiteljski okvir bez predaje kontrole",
    ],
    cta: "Vidimo ima li smisla za vas",
    href: CONVERSATION_PATH,
    dataCta: "offer-personal-standard",
  },
]
