import { bip110Guide } from "./bip110Guide"
import {
  bitcoinCoreStandardGuide,
  selfCustodyOrCustodianGuide,
} from "./bitcoinCoreStandard"
import { guideHref } from "./guideLinks"
import { PRIMARY_CTA } from "./site"

export { guideHref } from "./guideLinks"

export type GuideSection = {
  heading: string
  body: string[]
  hideFromToc?: boolean
  showSecurityReviewDate?: boolean
  calloutAfterItems?: boolean
  calloutTitle?: string
  callout?: string
  subsections?: GuideSectionSubsection[]
  cards?: GuideCard[]
  dataCards?: GuideDataCard[]
  table?: GuideTable
  items?: string[]
  orderedItems?: string[]
  links?: Array<{
    label: string
    href: string
  }>
  visual?: GuideSectionVisual
  link?: {
    before: string
    label: string
    href: string
    after?: string
  }
}

export type GuideSectionSubsection = {
  heading: string
  body: string[]
  calloutTitle?: string
  callout?: string
  table?: GuideTable
  items?: string[]
  orderedItems?: string[]
  cards?: GuideCard[]
  links?: Array<{
    label: string
    href: string
  }>
  link?: {
    before: string
    label: string
    href: string
    after?: string
  }
}

export type GuideSectionVisual =
  | {
      type: "logo-grid"
      title: string
      caption?: string
      items: Array<{
        name: string
        description?: string
        src: string
        alt: string
        href?: string
        credit?: string
        variant?: "mark" | "wordmark"
      }>
    }
  | {
      type: "image-card"
      title: string
      caption: string
      src: string
      alt: string
      href?: string
      credit?: string
      variant?: "full-width"
    }
  | {
      type: "chart-gallery"
      title: string
      caption?: string
      items: Array<{
        name: string
        value?: string
        description?: string
        src: string
        alt: string
        href?: string
        credit?: string
      }>
    }
  | {
      type: "image-grid"
      title: string
      caption?: string
      items: Array<{
        name: string
        description?: string
        src: string
        alt: string
        href?: string
        credit?: string
      }>
    }

export type GuideVisual =
  | {
      type: "sequence"
      title: string
      steps: string[]
      caption?: string
    }
  | {
      type: "equation"
      title: string
      parts: string[]
      result: string
      caption?: string
    }
  | {
      type: "split"
      title: string
      leftLabel: string
      leftItems: string[]
      rightLabel: string
      rightItems: string[]
      caption?: string
    }
  | {
      type: "cycle"
      title: string
      nodes: string[]
      center?: string
      caption?: string
    }
  | {
      type: "trend"
      title: string
      states: Array<{ label: string; description: string }>
      caption?: string
    }
  | {
      type: "thirds"
      title: string
      columns: Array<{ label: string; description: string }>
      caption?: string
    }
  | {
      type: "network"
      title: string
      center: string
      nodes: string[]
      caption?: string
    }
  | {
      type: "safety"
      title: string
      zones: Array<{ label: string; description: string }>
      caption?: string
    }

export const guideCategories = [
  "Osobni proračun nulte osnove",
  "Život bez duga",
  "Davanje",
  "Bitcoin kao novac",
  "Neto imovina",
  "Vrijeme i volatilnost",
  "Sigurnost i obitelj",
  "Poslovanje",
] as const

export type GuideCategory = (typeof guideCategories)[number]
export type GuideDifficulty = "Početno" | "Srednje" | "Napredno"
export type GuideFreshness = "stabilno" | "često se mijenja"
export type GuideTheme =
  | "budget"
  | "debt"
  | "giving"
  | "bitcoin"
  | "worth"
  | "time"
  | "security"

export type GuideCover = {
  src: string
  webpSrc?: string
  alt: string
  position?: string
  caption?: string
  artPrompt?: string
}

export type GuideVideo = {
  youtubeId: string
  title: string
  sourceUrl: string
  caption?: string
}

export type GuideDataCard = {
  value: string
  label: string
}

export type GuideCard = {
  title: string
  text?: string
}

export type GuideTable = {
  columns: string[]
  rows: string[][]
}

export type GuideFaq = {
  question: string
  answer: string
}

export type GuideSecurityAlert = {
  title: string
  body: string[]
  items: string[]
  afterItems?: string[]
  emphasis: string
  link: {
    label: string
    href: string
  }
}

export const guideCategoryDescriptions: Record<GuideCategory, string> = {
  "Osobni proračun nulte osnove":
    "Prvi korak je red. Svaki euro dobiva namjenu prije Bitcoin odluke.",
  "Život bez duga":
    "Dug nije samo obveza. Dug je stanje koje s vremenom pojačava nemir, osjećaj zarobljenosti i zbunjenost. Bitcoin standard počinje izlaskom iz duga i prestankom trošenja budućeg novca.",
  Davanje: "Nakon izlaska iz duga, dio novca dobiva namjenu za druge ljude.",
  "Bitcoin kao novac":
    "Bitcoin se promatra kao novac i novčana zaliha, uz pravila za vrijeme, kupovnu moć i proračun nulte osnove.",
  "Neto imovina":
    "Novac, potrošna dobra i proizvodna imovina imaju različite uloge.",
  "Vrijeme i volatilnost":
    "Vrijeme, ciklusi i volatilnost služe kao povod za jasnija osobna pravila, a ne kao zamjena za njih.",
  "Sigurnost i obitelj":
    "Bitcoin mora ostati pod vašom kontrolom, ali sustav ne smije ovisiti samo o vama.",
  Poslovanje:
    "Poslovni Bitcoin okvir počinje poslovnim modelom, likvidnošću, evidencijom, sigurnošću i jasnom odgovornošću.",
}

export type Guide = {
  slug: string
  previousSlugs?: string[]
  title: string
  eyebrow?: string
  seoTitle?: string
  ogTitle?: string
  ogDescription?: string
  metaDescription: string
  excerpt: string
  category: GuideCategory
  difficulty?: GuideDifficulty
  freshness?: GuideFreshness
  theme?: GuideTheme
  cover?: GuideCover
  safetyNote?: string
  securityReviewDate?: string
  securityAlert?: GuideSecurityAlert
  order: number
  readingMinutes?: number
  featured?: boolean
  publishedAt: string
  updatedAt: string
  practicalQuestion: string
  relatedSlugs: string[]
  visual?: GuideVisual
  video?: GuideVideo
  statusNotes?: string[]
  summary?: {
    title: string
    items: string[]
  }
  intro?: string[]
  introVisual?: GuideSectionVisual
  heroPrimaryCta?: {
    label: string
    href: string
    dataCta: string
  }
  heroSecondaryCta?: {
    label: string
    href: string
    dataCta: string
  }
  tocExtraLinks?: Array<{
    heading: string
    id: string
  }>
  sections: GuideSection[]
  faq?: GuideFaq[]
  disclaimer?: string
  finalCta: string
  finalCtaTitle?: string
  finalCtaPrompt?: string
  finalCtaPromptStandalone?: boolean
  finalCtaNote?: string
  finalSecondaryCta?: {
    label: string
    href: string
    dataCta: string
  }
  extraCta?: {
    id?: string
    title: string
    text: string
    items?: string[]
    finalText?: string
    label: string
    href: string
    dataCta: string
  }
  hideDefaultFinalCta?: boolean
}

function zabaSectionImage(
  title: string,
  caption: string,
  fileName: string,
  alt: string
): GuideSectionVisual {
  return {
    type: "image-card",
    title,
    caption,
    src: `/images/guide-sections/${fileName}`,
    alt,
  }
}

function etfTreasurySectionImage(
  title: string,
  caption: string,
  fileName: string,
  alt: string
): GuideSectionVisual {
  return {
    type: "image-card",
    title,
    caption,
    src: `/images/guide-sections/${fileName}`,
    alt,
  }
}

function balanceExposureSectionImage(
  title: string,
  caption: string,
  fileName: string,
  alt: string
): GuideSectionVisual {
  return {
    type: "image-card",
    title,
    caption,
    src: `/images/guide-sections/${fileName}`,
    alt,
  }
}

const guideEntries: Guide[] = [
  {
    slug: "zaba-bitcoin-etf-certifikat",
    title: "UniCreditov Bitcoin ETF certifikat u Zabi",
    seoTitle:
      "UniCreditov Bitcoin ETF certifikat u Zabi: troškovi, zaštita i ograničenje prinosa",
    ogTitle:
      "UniCreditov Bitcoin certifikat u Zabi: koliko košta zaštita glavnice?",
    ogDescription:
      "Detaljan prikaz UniCreditova certifikata koji distribuira Zaba: isplata, troškovi, rizik izdavatelja i ograničenje prinosa.",
    metaDescription:
      "Što kupujete Zabinim Bitcoin ETF certifikatom, kada vrijedi zaštita glavnice, koliki su troškovi i što ograničenje prinosa znači za mogući rast.",
    excerpt:
      "Zaštita glavnice ima cijenu: troškove, rok, rizik izdavatelja i ograničenje prinosa na 50%.",
    category: "Neto imovina",
    difficulty: "Napredno",
    theme: "worth",
    order: 92.5,
    readingMinutes: 10,
    publishedAt: "2026-06-18",
    updatedAt: "2026-06-18",
    practicalQuestion: "",
    relatedSlugs: [],
    cover: {
      webpSrc: "/images/zaba-bitcoin-etf-certifikat-cover-20260625.webp",
      src: "/images/zaba-bitcoin-etf-certifikat-cover-20260625.png",
      alt: "Mediteranska kamena scena sa strukturiranim certifikatom, zaštitom glavnice i odvojenim Bitcoin simbolom",
      position: "50% 50%",
      caption:
        "Certifikat povezan s Bitcoinom nije Bitcoin, nego strukturirani proizvod s izdavateljem, rokom i ograničenjem prinosa.",
    },
    intro: [
      "Zagrebačka banka ponudila je hrvatskim klijentima certifikat povezan s iShares Bitcoin Trust ETF-om, odnosno IBIT-om.",
      "To je dobra vijest.",
      "Bitcoin više nije tema koju velike financijske institucije mogu jednostavno ignorirati. Banka sada klijentima koji ne žele kupovati Bitcoin izravno, upravljati privatnim ključevima ili otvarati vlastiti novčanik nudi reguliran financijski proizvod čiji prinos ovisi o kretanju instrumenta koji prati Bitcoin.",
      "Takav proizvod može otvoriti razgovor s ljudima koji se Bitcoina godinama boje. Može im pomoći napraviti prvi korak prema razumijevanju nove monetarne imovine. Može biti prikladan određenoj skupini klijenata.",
      "Ali nije Bitcoin s besplatnom zaštitnom mrežom.",
      "Operativno može biti jednostavniji od vlastitog skrbništva. Financijski je složeniji. Sam KID upozorava da proizvod nije jednostavan i da ga može biti teško razumjeti.",
    ],
    introVisual: {
      type: "image-card",
      variant: "full-width",
      title: "Službena stranica proizvoda",
      caption:
        "Screenshot službene Zaba stranice za certifikat sa 100% zaštitom glavnice povezan s Bitcoin ETF-om.",
      src: "/images/zaba-bitcoin-etf-certifikat-product-page-20260618.jpg",
      alt: "Screenshot službene stranice Zagrebačke banke s naslovom Certifikat sa 100% zaštitom glavnice – Bitcoin ETF",
      href: "https://www.zaba.hr/home/certifikat-sa-100-zastitom-glavnice-kripto",
      credit: "Izvor: zaba.hr",
    },
    statusNotes: [
      "Objavljeno i provjereno: 18. lipnja 2026.",
      "Razdoblje upisa: 12. lipnja – 20. srpnja 2026., ili ranije u slučaju dosezanja maksimalnog iznosa izdanja.",
    ],
    summary: {
      title: "Sažetak u 30 sekundi",
      items: [
        "Za jedan certifikat klijent plaća 1.020 USD.",
        "Iznos za izračun isplate iznosi 1.000 USD.",
        "Minimalna isplata na dospijeću iznosi 1.000 USD, pod uvjetom da izdavatelj ispuni svoju obvezu.",
        "Maksimalna isplata iznosi 1.500 USD.",
        "Maksimalni prinos na stvarno uplaćenih 1.020 USD iznosi 47,06%, odnosno približno 7,75% godišnje prije zasebnog skrbništva, osobnog poreznog tretmana i valutnog učinka.",
        "Kupac ne posjeduje Bitcoin ni udjel u IBIT-u, nego dužnički certifikat čija isplata ovisi o kretanju IBIT-a.",
        "Zaštita vrijedi samo na dospijeću; prijevremeni izlazak može dovesti do gubitka.",
      ],
    },
    sections: [
      {
        heading: "Tri različite stvari",
        body: ["Prije analize treba razlikovati tri razine:"],
        calloutTitle: "Prvo imenovati stvar",
        callout:
          "Ako osoba misli da kupuje Bitcoin, a zapravo kupuje dužnički certifikat vezan uz IBIT, odluka počinje na pogrešnom mjestu.",
        table: {
          columns: ["Proizvod", "Što osoba posjeduje"],
          rows: [
            ["Bitcoin", "samu digitalnu novčanu imovinu"],
            [
              "IBIT",
              "udjel u trustu koji drži Bitcoin i nastoji pratiti njegovu cijenu",
            ],
            [
              "Zabin certifikat",
              "neosigurano potraživanje prema UniCreditu čija se isplata računa prema kretanju IBIT-a",
            ],
          ],
        },
        items: [
          "To znači da kupac certifikata nema Bitcoin. Nema privatne ključeve. Nema ni izravna prava prema IBIT-u. Posjeduje dužnički instrument koji je izdao UniCredit.",
          "IBIT sam po sebi naplaćuje sponzorsku naknadu od 0,25% godišnje. Ta se naknada ne pojavljuje kao zaseban račun Zabinom klijentu, nego je ugrađena u kretanje vrijednosti IBIT-a, jer trust prodaje dio Bitcoina radi podmirenja svojih troškova.",
        ],
        visual: zabaSectionImage(
          "Tri sloja nisu ista stvar.",
          "Bitcoin, ETF udjel i bankarski certifikat mogu pratiti istu temu, ali nose različita prava, rizike i razinu kontrole.",
          "zaba-bitcoin-certifikat-tri-sloja-20260630.webp",
          "Mediteranska radna scena s odvojenim kamenim Bitcoin simbolom, investicijskom mapom i certifikatom iza stakla"
        ),
      },
      {
        heading: "Kako se računa isplata",
        body: ["Za jedan certifikat vrijedi:"],
        calloutTitle: "Strop je dio proizvoda",
        callout:
          "Zaštita glavnice i ograničenje prinosa dolaze u istom paketu: certifikat smanjuje jedan oblik pada, ali odrezuje rast iznad dogovorene granice.",
        dataCards: [
          {
            value: "1.020 USD",
            label: "izdajna cijena jednog certifikata",
          },
          {
            value: "1.000 USD",
            label: "nominala i donja granica isplate na dospijeću",
          },
          {
            value: "1.500 USD",
            label: "najviša isplata po certifikatu na dospijeću",
          },
          {
            value: "23. rujna 2031.",
            label: "datum dospijeća iz dokumentacije proizvoda",
          },
        ],
        items: [
          "Pojednostavljena formula glasi: Isplata = min(1.500, max(1.000, 1.000 × završna cijena IBIT-a / početna cijena IBIT-a)).",
          "KID navodi početni datum promatranja 21. srpnja 2026., završni datum promatranja 16. rujna 2031. i dospijeće 23. rujna 2031.",
          "Primjeri po jednom certifikatu:",
        ],
        table: {
          columns: [
            "Promjena IBIT-a",
            "Isplata",
            "Prinos na uplaćenih 1.020 USD",
          ],
          rows: [
            ["–50%", "1.000 USD", "–1,96%"],
            ["0%", "1.000 USD", "–1,96%"],
            ["+2%", "1.020 USD", "0% prije skrbništva"],
            ["+35%", "1.350 USD", "+32,35%"],
            ["+50%", "1.500 USD", "+47,06%"],
            ["+100%", "1.500 USD", "+47,06%"],
            ["+500%", "1.500 USD", "+47,06%"],
          ],
        },
        subsections: [
          {
            heading: "Maksimalni prinos",
            body: [
              "Maksimalni prinos od 50% računa se na nominalnih 1.000 USD. Budući da je klijent stvarno uplatio 1.020 USD, njegov maksimalni ukupni prinos na uplaćeni novac iznosi: 1.500 / 1.020 − 1 = 47,06%.",
              "Tijekom približno 5,17 godina to odgovara složenom godišnjem prinosu od oko: (1.500 / 1.020)^(1/5,17) − 1 ≈ 7,75%.",
              "KID za svoj primjer navodi približno 7,7% godišnje nakon troškova samog proizvoda.",
            ],
          },
        ],
        visual: zabaSectionImage(
          "Isplata se kreće unutar zadanog raspona.",
          "Na dospijeću postoji donja granica izračuna, ali postoji i gornja granica koja zaustavlja prinos iznad 50% nominale.",
          "zaba-bitcoin-certifikat-raspon-isplate-20260630.webp",
          "Mediteranska kamena scena s Bitcoin simbolom između niske kamene podloge i prozirnog gornjeg ograničenja"
        ),
      },
      {
        heading: "Što znači 100% zaštita glavnice",
        body: [
          "Najpreciznije je reći:",
          "Na dospijeću je zaštićeno 100% iznosa izračuna od 1.000 USD po certifikatu, pod uvjetom da izdavatelj ispuni svoje obveze.",
          "Nije zaštićeno:",
        ],
        table: {
          columns: ["Nije zaštićeno", "Zašto"],
          rows: [
            ["svih uplaćenih 1.020 USD", "minimalna isplata iznosi 1.000 USD"],
            ["skrbničke naknade", "naplaćuju se dodatno"],
            [
              "kupovna moć dolara",
              "1.000 USD 2031. ne mora kupovati isto što i 2026.",
            ],
            ["vrijednost u eurima", "rezultat ovisi i o tečaju USD/EUR"],
            [
              "vrijednost pri ranom izlasku",
              "zaštita vrijedi samo na dospijeću",
            ],
            ["rizik izdavatelja", "UniCredit možda neće moći ispuniti obvezu"],
            [
              "kupovna moć izražena u Bitcoinu",
              "Bitcoin može porasti mnogo više od 50%",
            ],
          ],
        },
        cards: [
          {
            title: "Samo na dospijeću",
            text: "Zaštita se ne ponaša isto ako klijent izlazi prije roka.",
          },
          {
            title: "Samo ako izdavatelj plati",
            text: "Minimalna isplata ovisi o sposobnosti izdavatelja da ispuni obvezu.",
          },
          {
            title: "Samo nominalno u USD",
            text: "Zaštićeni iznos nije isto što i očuvana kupovna moć u eurima ili Bitcoinu.",
          },
        ],
        items: [
          "KID izričito upozorava da zaštita ne vrijedi pri ranom izlasku te da bi u slučaju nemogućnosti isplate izdavatelja ulagatelj mogao izgubiti cjelokupni kapital. Proizvod nije pokriven osiguranjem depozita, a u postupku sanacije potraživanje može biti smanjeno, ukinuto ili pretvoreno u dionice izdavatelja.",
          "Zato „zaštićena glavnica” nije isto što i bankovni depozit.",
        ],
        visual: zabaSectionImage(
          "Zaštita ima granice.",
          "Zaštićena glavnica ne uklanja sve rizike: rok, izdavatelj, valuta, troškovi i Bitcoin kupovna moć ostaju odvojena pitanja.",
          "zaba-bitcoin-certifikat-zastita-glavnice-20260630.webp",
          "Mediteranska scena s dokumentom u kamenoj zaštitnoj podlozi, kalendarom i odvojenim simbolima rizika oko njega"
        ),
      },
      {
        heading: "Koliki su troškovi",
        body: [
          "Na javnoj stranici istaknuti su:",
          "ulazna naknada od 2%",
          "skrbnička naknada od 0,16% plus PDV godišnje, odnosno približno 0,20% s PDV-om.",
          "Regulatorni dokumenti pokazuju širu sliku.",
          "KID za pretpostavljeno ulaganje od 10.000 USD prikazuje:",
          "588 USD troškova proizvoda pri držanju do dospijeća",
          "godišnji utjecaj troškova od 1,3%",
          "očekivani godišnji prinos od 9% prije troškova i 7,7% nakon troškova proizvoda.",
          "Zabin zaseban dokument o troškovima za pretpostavljenih 10.000 USD prikazuje:",
        ],
        calloutTitle: "Trošak nije samo jedna naknada",
        callout:
          "Kod strukturiranog proizvoda dio troška vidi se odmah, a dio je ugrađen u cijenu, dokumentaciju i godišnji utjecaj na povrat.",
        table: {
          columns: ["Stavka", "Iznos"],
          rows: [
            ["Trošak proizvoda uključen u prodajnu cijenu", "638 USD"],
            ["Od toga poticaj distributeru", "400 USD"],
            ["Trošak usluge i skrbništva", "100 USD"],
            ["Ukupni zbroj troškova i naknada", "738 USD"],
            ["Procijenjeni utjecaj na povrat pri dospijeću", "688 USD"],
            ["Godišnji utjecaj na povrat pri dospijeću", "1,50%"],
          ],
        },
        cards: [
          {
            title: "Vidljivi agio",
            text: "Klijent plaća 1.020 USD za nominalu od 1.000 USD.",
          },
          {
            title: "Ugrađeni trošak proizvoda",
            text: "Dio ekonomskog troška nalazi se u konstrukciji i prodajnoj cijeni proizvoda.",
          },
          {
            title: "Skrbništvo i usluga",
            text: "Zasebne naknade treba gledati uz rok držanja i stvarni povrat.",
          },
        ],
        items: [
          "Poticaj distributeru od 400 USD uključen je u iskazane troškove proizvoda i nije dodatna naknada povrh ukupnog iznosa.",
          "Dokumenti koriste različite pojmove: ukupni trošak, trošak proizvoda, trošak usluge i utjecaj troškova na povrat. Zato ih ne treba nekritički zbrajati.",
          "Najpošteniji sažetak glasi:",
          "Vidljivi agio iznosi 2%, ali ukupni ekonomski trošak proizvoda veći je od samog agija. Zabin dokument procjenjuje ukupan godišnji utjecaj troškova pri držanju do dospijeća na približno 1,5%.",
        ],
        visual: zabaSectionImage(
          "Troškovi su slojeviti.",
          "Jedan proizvod može imati vidljiv ulazni trošak, ugrađene troškove proizvoda i zasebne usluge koje zajedno utječu na povrat.",
          "zaba-bitcoin-certifikat-troskovi-20260630.webp",
          "Mediteranska radna scena sa slojevima papira i kamena, certifikatom i povećalom za pregled troškova"
        ),
      },
      {
        heading: "Power Law kao ilustracija oportunitetnog troška",
        body: [
          "Za ovu usporedbu koristim Leo Heartov model koji vrijeme Bitcoina izražava kroz blokove i halving cikluse.",
          "To nije kristalna kugla. Model ne obvezuje tržište da slijedi određenu cijenu. Visoki povijesni R² ne predstavlja vjerojatnost budućeg ishoda. Model služi kao okvir za procjenu dugoročnog smjera i relativnog položaja tržišne cijene.",
          "Prema očitanju modela na dan 18. lipnja 2026.:",
        ],
        calloutTitle: "Važna metodološka napomena",
        callout:
          "Certifikat svoj prinos računa prema promjeni zaključne cijene IBIT-a između 21. srpnja 2026. i 16. rujna 2031. Power Law usporedba u nastavku polazi od tržišne cijene Bitcoina 18. lipnja 2026. Zato ona nije projekcija stvarne isplate certifikata, nego ilustracija reda veličine mogućeg oportunitetnog troška.",
        link: {
          before: "Izvor:",
          label: "Leo Heartov model",
          href: "https://bitcoinwave.net/rootchart.htm",
        },
        table: {
          columns: ["Linija", "USD"],
          rows: [
            ["Tržišna cijena", "64.362"],
            ["–2 standardne devijacije", "66.990"],
            ["Medijalni trend", "101.508"],
          ],
        },
        cards: [
          {
            title: "Nije prognoza",
            text: "Model pomaže razmišljati o redu veličine, ali ne jamči buduću cijenu.",
          },
          {
            title: "Nije formula certifikata",
            text: "Certifikat se računa prema IBIT-u i datumima iz dokumentacije proizvoda.",
          },
          {
            title: "Jedinica mjere je važna",
            text: "Dolarni rezultat može izgledati zaštićeno dok kupovna moć izražena u Bitcoinu pada.",
          },
        ],
        visual: {
          type: "chart-gallery",
          title: "Power Law scenariji za rujan 2031.",
          caption:
            "Četiri očitanja Leo Heartova modela prikazuju raspon od PL-3 do PL5. Screenshoti su očitanja za 15. rujna 2031.; izračuni u tekstu koriste 16. rujna 2031. iz zasebnog očitanja.",
          items: [
            {
              name: "PL-3: tri standardne devijacije ispod trenda",
              value: "256.469,79 USD na screenshotu",
              description:
                "Konzervativniji modelni scenarij ispod dugoročnog trenda.",
              src: "/images/power-law-pl-minus-3-20310915.png",
              alt: "Power Law graf s PL-3 linijom i očitanjem oko 256.469 USD za rujan 2031.",
              href: "https://bitcoinwave.net/rootchart.htm",
              credit: "Izvor: bitcoinwave.net/rootchart.htm",
            },
            {
              name: "PL-2: dvije standardne devijacije ispod trenda",
              value: "298.523,84 USD na screenshotu",
              description:
                "Donji scenarij koji pokazuje red veličine ispod medijalnog trenda.",
              src: "/images/power-law-pl-minus-2-20310915.png",
              alt: "Power Law graf s PL-2 linijom i očitanjem oko 298.523 USD za rujan 2031.",
              href: "https://bitcoinwave.net/rootchart.htm",
              credit: "Izvor: bitcoinwave.net/rootchart.htm",
            },
            {
              name: "PL0: medijalni trend",
              value: "404.449,79 USD na screenshotu",
              description:
                "Medijalna linija modela, najbliža vrijednosti korištenoj u glavnom izračunu.",
              src: "/images/power-law-pl0-20310915.png",
              alt: "Power Law graf s PL0 medijalnom linijom i očitanjem oko 404.449 USD za rujan 2031.",
              href: "https://bitcoinwave.net/rootchart.htm",
              credit: "Izvor: bitcoinwave.net/rootchart.htm",
            },
            {
              name: "PL5: ultra bullish scenarij",
              value: "864.129,04 USD na screenshotu",
              description:
                "Gornji ekstremni scenarij koji pokazuje širinu modela, ne prognozu.",
              src: "/images/power-law-pl5-20310915.png",
              alt: "Power Law graf s PL5 linijom i očitanjem oko 864.129 USD za rujan 2031.",
              href: "https://bitcoinwave.net/rootchart.htm",
              credit: "Izvor: bitcoinwave.net/rootchart.htm",
            },
          ],
        },
        subsections: [
          {
            heading: "Za 16. rujna 2031.",
            body: [
              "Današnja cijena je približno 36,6% ispod medijalnog trenda i 3,9% ispod linije –2 standardne devijacije.",
              "Za 16. rujna 2031.:",
            ],
            table: {
              columns: ["Linija", "USD"],
              rows: [
                ["–2 standardne devijacije", "298.818"],
                ["Medijalni trend", "404.820"],
              ],
            },
          },
          {
            heading: "Donji scenarij modela",
            body: [
              "298.818 ÷ 64.362 − 1 = 364,28%",
              "Bitcoin bi bio 4,64 puta skuplji, što odgovara približno 34,0% godišnje.",
            ],
          },
          {
            heading: "Medijalni scenarij modela",
            body: [
              "404.820 ÷ 64.362 − 1 = 528,97%",
              "Bitcoin bi bio 6,29 puta skuplji, što odgovara približno 42,0% godišnje.",
              "Drugi scenarij uključuje povratak cijene s današnjeg izrazito niskog položaja prema medijalnoj liniji. Sama medijalna linija od 101.508 do 404.820 raste približno 30,2% godišnje.",
              "Čak i donji modelni scenarij daleko prelazi ograničenje certifikata od 50%.",
            ],
          },
        ],
      },
      {
        heading: "Ilustracija na 10.200 USD",
        body: [
          "Deset certifikata košta 10.200 USD.",
          "Maksimalna isplata certifikata iznosi:",
          "10×1.500=15.000 USD",
          "Da je istih 10.200 USD 18. lipnja 2026. pretvoreno izravno u Bitcoin po cijeni od 64.362 USD, dobilo bi se približno:",
          "10.200 / 64.362 = 0,15848 BTC",
          "Modelni ishodi bili bi:",
        ],
        calloutTitle: "Oportunitetni trošak nije naknada",
        callout:
          "Razlika u ovim scenarijima nije novac koji banka dodatno naplaćuje, nego rast kojega se klijent odriče kada prihvati gornju granicu isplate.",
        table: {
          columns: [
            "Scenarij za 16. 9. 2031.",
            "Ilustrativna vrijednost 0,15848 BTC",
            "Maksimalna isplata certifikata",
          ],
          rows: [
            ["Donja linija: 298.818 USD", "47.356 USD", "15.000 USD"],
            ["Medijalna linija: 404.820 USD", "64.155 USD", "15.000 USD"],
          ],
        },
        items: [
          "Razlika iznosi približno 32.356 USD u donjem scenariju i 49.155 USD u medijalnom scenariju.",
          "To nije naknada koju banka naplaćuje niti zajamčeni gubitak. To je ilustracija mogućeg rasta kojega se klijent odriče u zamjenu za nominalnu zaštitu na dospijeću.",
          "U Bitcoin jedinici rezultat je još vidljiviji:",
          "početnih 10.200 USD predstavlja 0,15848 BTC",
          "15.000 USD pri cijeni od 298.818 USD predstavlja 0,05020 BTC",
          "15.000 USD pri cijeni od 404.820 USD predstavlja 0,03705 BTC",
          "U modelnim scenarijima maksimalna isplata certifikata izgubila bi približno 68,3%, odnosno 76,6% početne kupovne moći izražene u Bitcoinu.",
        ],
        visual: zabaSectionImage(
          "Ograničena isplata mijenja mogući ishod.",
          "Certifikat može imati mirniji nominalni okvir, ali u snažnom Bitcoin scenariju otvoreni rast i gornja granica prinosa brzo se razdvoje.",
          "zaba-bitcoin-certifikat-oportunitetni-trosak-20260630.webp",
          "Mediteranska scena s papirom na kojem se jedan put zaustavlja kod certifikata, a drugi nastavlja prema Bitcoin simbolu na višoj kamenoj razini"
        ),
      },
      {
        heading: "Kome proizvod može odgovarati",
        body: ["Proizvod može biti racionalan za osobu koja:"],
        calloutTitle: "Ovo nije početnički proizvod",
        callout:
          "Prikladnost ovisi o roku, valuti, znanju, toleranciji na rizik izdavatelja i spremnosti da se rast iznad 50% prepusti.",
        cards: [
          {
            title: "Rok odgovara cilju",
            text: "Novac ne bi trebao trebati prije dospijeća proizvoda.",
          },
          {
            title: "USD rizik je razumljiv",
            text: "Rezultat se mora gledati i kroz valutni učinak, ne samo kroz cijenu Bitcoina.",
          },
          {
            title: "Struktura je jasna",
            text: "Osoba razumije da ne posjeduje Bitcoin ni izravni udjel u IBIT-u.",
          },
        ],
        items: [
          "već ima imovinu i obveze u USD",
          "neće trebati novac prije rujna 2031.",
          "ne želi samostalno skrbništvo",
          "nominalnu zaštitu u USD cijeni više od mogućeg rasta iznad 50%",
          "razumije strukturirane proizvode i rizik izdavatelja",
          "prihvaća da nema Bitcoin ni izravna prava prema IBIT-u.",
          "Službena dokumentacija proizvod ne svrstava u početnički „probni” instrument. Negativno ciljano tržište obuhvaća osobe bez prethodnog znanja i osobe samo s osnovnom razinom znanja, dok javna stranica navodi naprednu razinu znanja i iskustva.",
        ],
        visual: zabaSectionImage(
          "Prikladnost je pitanje konteksta.",
          "Isti proizvod može imati smisla jednoj osobi, a biti pogrešan za drugu ako se razlikuju rok, valuta, znanje i cilj.",
          "zaba-bitcoin-certifikat-prikladnost-20260630.webp",
          "Mediteranski savjetodavni stol s checklistom, certifikatom, kalendarom, neutralnim kovanicama i odvojenim Bitcoin simbolom"
        ),
      },
      {
        heading: "Zaključak",
        body: [
          "Zabin certifikat je dobra vijest za Bitcoin.",
          "Pokazuje da je Bitcoin postao dovoljno relevantan da se oko njega grade bankarski strukturirani proizvodi za hrvatsko tržište. Donosi novu mogućnost ljudima koji žele reguliran okvir i nominalnu zaštitu na dospijeću.",
          "Ali nije Bitcoin bez rizika.",
          "Kupac zamjenjuje jednu vrstu rizika drugom:",
        ],
        calloutTitle: "Dobra vijest nije isto što i jednostavna odluka",
        callout:
          "Važno je da banke uopće nude proizvode povezane s Bitcoinom, ali kupac i dalje mora znati koju vrstu prava, rizika i ograničenja zapravo prihvaća.",
        cards: [
          {
            title: "Izloženost cijeni",
            text: "Sudjelujete u kretanju instrumenta koji prati Bitcoin, ali ne držite Bitcoin.",
          },
          {
            title: "Strukturirani proizvod",
            text: "Dobivate unaprijed zadanu isplatu s rokom, izdavateljem i gornjom granicom.",
          },
          {
            title: "Vlastiti Bitcoin",
            text: "Druga odluka, s drugim obvezama: privatni ključevi, oporavak i odgovornost.",
          },
        ],
        items: [
          "dobiva pravo na minimalnu isplatu od 1.000 USD po certifikatu na dospijeću, iako je pri upisu platio 1.020 USD, pod uvjetom da izdavatelj može ispuniti svoju obvezu",
          "prihvaća rizik izdavatelja",
          "prihvaća troškove, ograničenu likvidnost i mogućnost gubitka pri izlasku prije dospijeća",
          "prihvaća USD valutni rezultat",
          "odriče se rasta iznad 50%.",
        ],
        subsections: [
          {
            heading: "Prava pitanja",
            body: [
              "Zato pravo pitanje nije:",
              "„Je li certifikat dobar ili loš?”",
              "Prava pitanja su:",
            ],
            items: [
              "Što zapravo posjedujem?",
              "Od kojeg se rizika želim zaštititi?",
              "Koliko sam spreman platiti za tu zaštitu?",
              "U kojoj jedinici mjerim uspjeh: u dolarima, eurima ili Bitcoinu?",
            ],
          },
          {
            heading: "Tri različite odluke",
            body: [
              "Zabin proizvod može biti dobar za određeni cilj.",
              "Ali izloženost cijeni Bitcoina, udjel u Bitcoin ETF-u i posjedovanje Bitcoina tri su različite odluke.",
            ],
          },
        ],
        visual: zabaSectionImage(
          "Tri odluke treba držati odvojeno.",
          "Izloženost cijeni Bitcoina, udjel u Bitcoin ETF-u i držanje Bitcoina pod vlastitom kontrolom nisu ista odluka.",
          "zaba-bitcoin-certifikat-tri-odluke-20260630.webp",
          "Mediteranska konzultacijska scena s tri odvojene kamene kartice za tržišnu izloženost, fond i Bitcoin s ključem"
        ),
      },
      {
        heading: "Izvori i dokumenti",
        body: [
          "Za ovaj vodič korišteni su službeni dokumenti proizvoda, službena stranica IBIT-a i javni prikaz Power Law modela.",
        ],
        links: [
          {
            label:
              "Službena stranica proizvoda Zagrebačke banke: Certifikat sa 100% zaštitom glavnice – Bitcoin ETF",
            href: "https://www.zaba.hr/home/certifikat-sa-100-zastitom-glavnice-kripto",
          },
          {
            label:
              "Dokument s ključnim informacijama, ažuriran 8. lipnja 2026. — dostupan u kartici Dokumenti službene stranice proizvoda",
            href: "https://www.zaba.hr/home/certifikat-sa-100-zastitom-glavnice-kripto",
          },
          {
            label:
              "Informacije o troškovima, naknadama i negativnom ciljanom tržištu, 12. lipnja 2026. — dostupno u kartici Dokumenti službene stranice proizvoda",
            href: "https://www.zaba.hr/home/certifikat-sa-100-zastitom-glavnice-kripto",
          },
          {
            label: "Službena stranica iShares Bitcoin Trust ETF-a",
            href: "https://www.ishares.com/us/products/333011/ishares-bitcoin-trust-etf",
          },
          {
            label: "Leo Heartov Bitcoin Root-Scale Cycles graf",
            href: "https://bitcoinwave.net/rootchart.htm",
          },
        ],
        items: [
          "Brojke, dokumenti i dostupnost proizvoda provjereni su 18. lipnja 2026.",
        ],
      },
    ],
    finalCta: "Dogovorite uvodni razgovor",
    finalCtaTitle:
      "Razmišljate kako se proizvod povezan s Bitcoinom uklapa u vašu imovinu?",
    finalCtaPrompt:
      "Ne morate unaprijed imati spreman odgovor. U kratkom uvodnom razgovoru možemo razjasniti što zapravo posjedujete, koje rizike preuzimate, čega se odričete i koja pitanja trebate postaviti prije vlastite odluke.",
    finalCtaPromptStandalone: true,
    finalCtaNote:
      "Razgovor je bez naknade i obveze. Ne upravljam vašim novcem i odluka uvijek ostaje vaša.",
  },
  {
    slug: "svaki-euro-ima-namjenu",
    title: "Svaki euro ima namjenu",
    metaDescription:
      "Vodič o osobnom proračunu nulte osnove i zašto Bitcoin odluke počinju tek kada svaki euro ima jasnu namjenu.",
    excerpt:
      "Osobni Bitcoin standard ne počinje pitanjem koliko Bitcoina kupiti. Počinje pitanjem zna li svaki euro što treba raditi.",
    category: "Osobni proračun nulte osnove",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 10,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-08-04",
    practicalQuestion:
      "Možete li za svaki euro koji imate reći što treba napraviti prije nego što odlučite kupiti Bitcoin?",
    relatedSlugs: [
      "stvarni-visak",
      "starost-novca",
      "davanje-u-proracunu-nulte-osnove",
    ],
    visual: {
      type: "sequence",
      title: "Od prihoda do reda",
      steps: ["novac ulazi", "namjena", "0 neraspoređeno"],
      caption:
        "Osobni proračun nulte osnove počinje kada svaki euro dobije posao.",
    },
    sections: [
      {
        heading: "Proračun nulte osnove nije kazna",
        body: [
          "Mnogi ljudi osobni proračun nulte osnove čuju kao zabranu. Kao popis stvari koje više ne smiju raditi. U osobnom Bitcoin standardu proračun nulte osnove ima drukčiju ulogu: ne služi kao kazna, nego kao način da se uvede red. Pokazuje što vaš novac treba napraviti prije nego što ga potrošite, darujete, čuvate ili pretvorite u Bitcoin.",
          "Bez proračuna nulte osnove, odluka izgleda slobodno, ali često nije slobodna. Novac na računu stvara osjećaj prostora. Onda dođe rata, popravak, porez, zdravstveni trošak ili obiteljska potreba. Ono što je izgledalo kao višak odjednom postaje novac koji je već trebao imati namjenu.",
        ],
      },
      {
        heading: "Svaki euro već ima posao",
        body: [
          "Svaki euro koji imate već nekamo ide. Ako mu vi ne date posao, posao će mu dati navika, hitnost ili tuđi zahtjev. Zato proračun nulte osnove počinje jednostavnom rečenicom: svaki euro mora dobiti namjenu. Ne zato da biste sve potrošili, nego zato da ništa ne ostane nejasno.",
          "Jedan dio novca ide na redovne troškove. Jedan dio na izlazak iz duga. Jedan dio na buduća plaćanja. Jedan dio na sigurnosnu zalihu. Jedan dio može ići na davanje. Tek nakon toga možete mirno reći koji dio novca stvarno može postati Bitcoin odluka. Red dolazi prije kupnje.",
        ],
      },
      {
        heading: "Bez namjene nema stvarnog viška",
        body: [
          "Stvarni višak nije iznos koji vidite na računu. Stvarni višak je novac koji je slobodan nakon što su poznati troškovi, obveze, dugovi i budući troškovi. Ako novac za dva mjeseca mora platiti nešto važno, on nije višak. On samo čeka svoj red.",
          "Zato je opasno kupovati Bitcoin samo zato što se danas čini da ima prostora. Možda prostor postoji. Možda ne postoji. Proračun nulte osnove je način da to prestane biti dojam. On pokazuje koji novac možete rasporediti bez toga da sutra morate prodati Bitcoin ili se zadužiti za nešto što ste mogli vidjeti unaprijed.",
        ],
      },
      {
        heading: "Bitcoin odluka počinje prije kupnje",
        body: [
          "Bitcoin odluka ne počinje na burzi. Počinje u proračunu nulte osnove. Počinje pitanjem: što ovaj novac već mora napraviti? Ako odgovor nije jasan, kupnja nije zrela odluka. Može biti dobra namjera, ali nije dio osobnog Bitcoin standarda.",
          "Kada proračun nulte osnove postoji, kupnja postaje mirnija. Ne morate pogađati osjećaj. Vidite koliko novca ima namjenu, koliko ga treba čekati i koliko ga je stvarno slobodno. Tada Bitcoin ulazi u sustav kao novac, a ne kao pokušaj bijega od neuređenog proračuna.",
        ],
      },
      {
        heading: "Pravilo koje treba zapisati",
        body: [
          "Prvo pravilo može biti vrlo jednostavno: ne donosim Bitcoin odluku dok svaki euro nema namjenu. To pravilo ne govori koliko trebate kupiti. Ono štiti redoslijed. Prvo proračun nulte osnove, zatim stvarni višak, tek onda kupnja, čekanje ili trošenje.",
          "Ako to pravilo možete objasniti sebi i obitelji, već ste napravili velik korak. Bitcoin standard nije samo posjedovanje Bitcoina. Počinje kada novac prestane lutati i kada svaka odluka ima mjesto u pisanom sustavu.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako ne znate koji je novac stvarno slobodan za Bitcoin odluku, to vrijedi razjasniti u uvodnom razgovoru.",
  },
  {
    slug: "stvarni-visak",
    title: "Što je stvarni višak?",
    metaDescription:
      "Vodič o tome kako osobni proračun nulte osnove, dug, buduća plaćanja i novčana zaliha pokazuju koji je novac stvarno slobodan za Bitcoin odluke.",
    excerpt:
      "Stvarni višak je novac koji je slobodan tek nakon što svaki euro ima namjenu i nakon što su buduća plaćanja vidljiva.",
    category: "Osobni proračun nulte osnove",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 15,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Koji novac danas zovete viškom, a možda već pripada budućem trošku?",
    relatedSlugs: [
      "svaki-euro-ima-namjenu",
      "starost-novca",
      "dca-nije-dovoljan",
    ],
    visual: {
      type: "equation",
      title: "Što ostaje nakon obveza",
      parts: ["novac koji ulazi", "obveze", "buduća plaćanja"],
      result: "stvarni višak",
      caption:
        "Višak nije stanje na računu. Višak je ono što ostaje nakon namjena.",
    },
    sections: [
      {
        heading: "Višak nije stanje na računu",
        body: [
          "Novac koji stoji na računu može izgledati slobodno. Ali račun ne zna što dolazi. Ne zna za registraciju auta, porez, popravak, školarinu, put, liječnika ili mjesec u kojem prihod kasni. Zbog toga stanje na računu nije isto što i stvarni višak.",
          "Stvarni višak postoji tek nakon što su vidljivi osobni proračun nulte osnove, dug, buduća plaćanja i sigurnosna zaliha. Sve prije toga je samo dojam. A dojam je loš temelj za Bitcoin odluke.",
          "Drugim riječima, stvarni višak je novac bez druge namjene: ne pripada budućem plaćanju, ne treba za izlazak iz duga i ne slabi sigurnosnu zalihu.",
        ],
      },
      {
        heading: "Novac može biti zauzet i kada miruje",
        body: [
          "Novac ne mora biti potrošen da bi već bio zauzet. Može čekati obvezu. Može čekati račun. Može čekati mjesec u kojem će troškovi biti veći od prihoda. Ako ga tada nazovete viškom, sami sebi stvarate budući pritisak.",
          "Osobni Bitcoin standard zato traži da se buduća plaćanja vide unaprijed. Kada se vide, odluka je mirnija. Možda kupujete manje Bitcoina nego što ste mislili, ali ono što kupite ne ugrožava sustav.",
        ],
      },
      {
        heading: "Dug mijenja značenje viška",
        body: [
          "Ako postoji dug, višak se mora gledati strože. Dug je budući novac koji ste već potrošili. On ima pravo na dio budućih prihoda prije nego što vi donesete novu odluku. Zato dug može učiniti da novac koji izgleda slobodno zapravo nije slobodan.",
          "To ne znači da osoba u dugu nikada ne smije kupovati Bitcoin, nego da stanje duga mora biti u slici. Ako ga nema u slici, dug odlučuje skriveno. A skriveni dug često odlučuje u najgorem trenutku.",
        ],
      },
      {
        heading: "Višak mora preživjeti vrijeme",
        body: [
          "Dobar test je vrijeme. Ako isti novac može mirno preživjeti nekoliko mjeseci bez toga da ugrozi obveze, vjerojatnije je da je stvarno slobodan. Ako nestaje čim dođe prvi veći trošak, nije višak. Bio je samo kratka pauza između dva plaćanja.",
          "Zato osobni proračun nulte osnove ne smije gledati samo ovaj mjesec. Treba gledati i ono što dolazi. Bitcoin odluka koja ne vidi budućnost lako postane odluka koju morate popravljati prodajom, zaduživanjem ili stresom.",
        ],
      },
      {
        heading: "Jednostavno pravilo",
        body: [
          "Pravilo može glasiti: stvarni višak je novac bez druge namjene: ne pripada budućem plaćanju, ne treba za izlazak iz duga i ne slabi sigurnosnu zalihu. Sve ostalo još nije višak.",
          "Kada ovo zapišete, Bitcoin odluke postaju čišće. Manje je nagađanja, manje hitnosti i manje potrebe da cijena odlučuje umjesto vas. Prvo znate što je slobodno. Tek onda odlučujete što s tim novcem.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako niste sigurni koji je novac stvarno višak, a koji već pripada budućim obvezama, uvodni razgovor može pomoći da to stavimo u jasniju sliku.",
  },
  {
    slug: "starost-novca",
    title: "Starost novca: koliko dugo vaš novac preživi?",
    metaDescription:
      "Vodič o starosti novca, budućim plaćanjima i zašto mirnije Bitcoin odluke traže novac koji nije odmah pod pritiskom.",
    excerpt:
      "Novac koji mora odmah nestati ne daje slobodu. Što je novac stariji, to je lakše donositi mirne Bitcoin odluke.",
    category: "Osobni proračun nulte osnove",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 20,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Koliko dana vaš novac u prosjeku preživi prije nego što ga morate potrošiti?",
    relatedSlugs: [
      "svaki-euro-ima-namjenu",
      "stvarni-visak",
      "dug-ili-bitcoin",
    ],
    visual: {
      type: "sequence",
      title: "Novac kroz vrijeme",
      steps: ["danas", "30 dana", "90 dana"],
      caption:
        "Što duže novac preživi prije potrošnje, to odluke postaju mirnije.",
    },
    sections: [
      {
        heading: "Novac koji odmah nestaje",
        body: [
          "Ako novac stigne danas i nestane sutra, on ne daje mnogo slobode. Možda pokriva trošak, ali ne stvara prostor. Živite blizu sljedećeg računa. Svako novo plaćanje traži brzu odluku, a svaka promjena cijene Bitcoina izgleda važnije nego što možda jest.",
          "Takav život nije uvijek posljedica neodgovornosti. Ponekad je posljedica malog prihoda, visokih troškova, duga ili obiteljskih okolnosti. Ali dok novac odmah nestaje, Bitcoin odluke su pod pritiskom. Nije dovoljno imati uvjerenje. Treba imati vrijeme.",
        ],
      },
      {
        heading: "Stariji novac daje prostor",
        body: [
          "Starost novca pokazuje koliko dugo novac može ostati u vašem sustavu prije nego što mora otići. Ako današnje troškove plaćate novcem koji je stigao prije mjesec dana, imate više prostora nego osoba koja svaki račun čeka s novom uplatom.",
          "Taj prostor mijenja odluke. Lakše je čekati. Lakše je reći ne potrošnji. Lakše je ne prodati Bitcoin zbog troška koji ste mogli predvidjeti. Stariji novac ne uklanja životne probleme, ali smanjuje hitnost.",
          "Mjerite starost novca jednostavno: koliko dana prođe između trenutka kada novac dođe i trenutka kada mora otići. Cilj nije savršen broj, nego postupno povećanje prostora za mirnije odluke.",
        ],
      },
      {
        heading: "Buduća plaćanja moraju biti vidljiva",
        body: [
          "Starost novca ne raste samo tako da trošite manje. Raste kada buduća plaćanja postanu vidljiva. Godišnje osiguranje, veći servis, porez, oprema za posao i obiteljski troškovi trebaju dobiti mjesto prije nego se pojave.",
          "Ako ta plaćanja nisu zapisana, iznenađuju nas svaki put. Tada novac koji ste mislili koristiti za Bitcoin odjednom mora pokriti nešto drugo. Nije problem u Bitcoinu. Problem je u tome što budući novac nije bio imenovan na vrijeme.",
        ],
      },
      {
        heading: "Zašto ovo mijenja Bitcoin odluke",
        body: [
          "Bitcoin traži sposobnost čekanja. Ako svaka uplata odmah mora pokriti nekoliko obveza, teško je čekati. Kupnja može biti prenapeta, prodaja može biti prebrza, a pad kupovne moći može izgledati kao osobna kriza.",
          "Kada novac ima veću starost, Bitcoin odluka ima mirniji temelj. Možete gledati osobni proračun nulte osnove, dug i neto imovinu bez osjećaja da svaka promjena traži hitan potez. Tada osobni Bitcoin standard počinje biti stvaran, a ne samo ideja.",
        ],
      },
      {
        heading: "Kako zapisati prvo pravilo",
        body: [
          "Prvo pravilo može biti jednostavno: dio novca koji ulazi ne diram dok ne pokrije poznata buduća plaćanja. Tek kada su ta plaćanja vidljiva, gledam stvarni višak i Bitcoin odluku. To pravilo stvara vrijeme.",
          "Nije potrebno početi savršeno. Dovoljno je mjeriti koliko dana novac preživi i postupno povećavati taj broj. Svaki dodatni dan smanjuje pritisak. A manji pritisak znači bolje odluke.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako novac nestane čim dođe prvi veći trošak, uvodni razgovor može pomoći vidjeti gdje sustav nema dovoljno vremena.",
  },
  {
    slug: "dca-nije-dovoljan",
    title: "Zašto redovita kupnja nije cijeli sustav?",
    metaDescription:
      "Redovita kupnja može biti korisna navika, ali ne zamjenjuje osobni proračun nulte osnove, stvarni višak, dug, kupovnu moć i pisana pravila.",
    excerpt:
      "Redovita kupnja može smanjiti impulzivnost, ali ne zamjenjuje osobni proračun nulte osnove, stvarni višak i pravila kupovne moći.",
    category: "Osobni proračun nulte osnove",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 25,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Znate li zašto je vaš trenutni iznos redovite kupnje baš takav i kada bi se trebao promijeniti?",
    relatedSlugs: [
      "svaki-euro-ima-namjenu",
      "stvarni-visak",
      "uskladivanje-kupovne-moci-bitcoina",
    ],
    sections: [
      {
        heading: "Dobra navika nije cijeli sustav",
        body: [
          "Redovita kupnja Bitcoina može biti korisna. Smanjuje impulzivne odluke i uklanja potrebu da svaki mjesec iznova odlučujete. Ali dobra navika nije isto što i osobni Bitcoin standard. Ona ne zna jeste li u dugu, imate li budući trošak, premalu zalihu ili obiteljsku obvezu.",
          "Ako redovita kupnja stoji odvojeno od proračuna nulte osnove, ona može skrivati problem. Iznos se ponavlja, osjećaj discipline postoji, ali nitko ne provjerava ima li novac stvarno pravo otići u Bitcoin. Automatizam ne smije zamijeniti red.",
        ],
      },
      {
        heading: "Iznos mora imati razlog",
        body: [
          "Ne gledajte samo kupujete li redovito. Važnije je zašto kupujete baš taj iznos. Je li nastao iz stvarnog viška? Je li stanje duga vidljivo? Jesu li buduća plaćanja vidljiva? Je li sigurnosna zaliha dovoljna?",
          "Ako ne možete odgovoriti u jednoj jasnoj rečenici, iznos možda nije pravilo. Možda je navika. Navika može biti korisna, ali bez razloga ne može nositi ozbiljne Bitcoin odluke kroz vrijeme.",
        ],
      },
      {
        heading: "Proračun nulte osnove dolazi prije kupnje",
        body: [
          "Osobni Bitcoin standard počinje osobnim proračunom nulte osnove. Prvo se vidi svaki euro, svaki dug, svako veće buduće plaćanje i svaki dio novčane zalihe. Tek zatim se određuje koliko novca može ići u Bitcoin.",
          "Ovaj redoslijed štiti od dvije pogreške. Prva je kupnja novcem koji već pripada drugoj obvezi. Druga je premala kupnja iz straha, iako stvarni višak postoji. Proračun nulte osnove ne služi zabrani. Služi jasnoći.",
        ],
      },
      {
        heading: "Kupovna moć mijenja pravilo",
        body: [
          "Isti iznos kupnje ne znači isto u svakom trenutku. Troškovi se mijenjaju. Prihodi se mijenjaju. Kupovna moć Bitcoina se mijenja. Zato pravilo redovite kupnje treba povremeno provjeriti.",
          "Provjera ne znači stalno reagirati na cijenu. Znači pitati je li iznos još u skladu s proračunom nulte osnove, stanjem duga, neto imovinom i budućim plaćanjima. Ponekad je dobro nastaviti. Ponekad je bolje čekati. Ponekad je zrelije prvo izaći iz duga.",
        ],
      },
      {
        heading: "Pravilo za promjenu",
        body: [
          "Dobro pravilo kaže kada se kupnja mijenja. Primjerice: nakon novog duga, promjene prihoda, otplate duga, većeg troška ili promjene uloge Bitcoina u neto imovini. Bez tih uvjeta, odluka se mijenja tek kada emocije postanu jake.",
          "Redovita kupnja može ostati dio sustava. Ali ne smije biti sustav. Osobni Bitcoin standard traži da znate kada kupujete, kada čekate i zašto ne dirate novac koji ima drugu namjenu.",
          "Ako ne znate kada bi se iznos redovite kupnje trebao promijeniti, to vrijedi razjasniti u uvodnom razgovoru.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako ne znate kada bi se iznos redovite kupnje trebao promijeniti, to vrijedi razjasniti u uvodnom razgovoru.",
  },
  {
    slug: "dug-je-buduci-novac",
    previousSlugs: ["kredit-je-buduci-novac"],
    title: "Dug je budući novac koji ste već potrošili",
    metaDescription:
      "Vodič o dugu kao budućem novcu koji ste već potrošili, životu bez duga, vremenu provedenom u dugu i zašto dug može odlučivati umjesto vas.",
    excerpt:
      "Dug nije samo financijska stavka. Dug je budući novac koji ste već potrošili i stanje koje oblikuje odluke.",
    category: "Život bez duga",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 30,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Koliko ćete vremena do kraja života provesti u jednom od ova dva stanja: u dugu ili bez duga?",
    relatedSlugs: [
      "dug-ili-bitcoin",
      "ne-zaduzujte-se-za-bitcoin",
      "davanje-bez-duga",
    ],
    visual: {
      type: "split",
      title: "Dva stanja novca",
      leftLabel: "Život u dugu",
      leftItems: [
        "budući novac",
        "nemir",
        "zbunjenost",
        "osjećaj zarobljenosti",
      ],
      rightLabel: "Život bez duga",
      rightItems: ["prošli novac", "mir", "jasnoća", "sloboda"],
      caption: "Vrijeme zalijeva stanje u kojem živite.",
    },
    sections: [
      {
        heading: "Dug nije samo broj",
        body: [
          "Dug se najčešće promatra matematički: kolika je kamata, kolika je rata, koliko traje otplata i može li se zadržavanje duga isplatiti u usporedbi s nečim drugim. Taj pogled vidi tablicu, ali propušta čovjeka.",
          "Dug nije samo financijska stavka u bilanci. Dug je stanje. Dok dug postoji, dio budućeg rada već je obećan prije nego što je odrađen. Zato dug ne stoji sa strane Bitcoin odluke. On je već u njoj.",
        ],
      },
      {
        heading: "Dva stanja odlučivanja",
        body: [
          "Biti u dugu i biti bez duga nisu samo dvije različite bilance. To su dva različita stanja odlučivanja. Jedno oblikuje osobu kroz pritisak, rokove i obveze. Drugo oblikuje osobu kroz mir, jasnoću i slobodu.",
          "Svako stanje s vremenom raste. Ako ste u dugu, vrijeme često pojačava osjećaj zarobljenosti, nemira i zbunjenosti. Ako ste bez duga, vrijeme jača osjećaj slobode, mira i jasnoće.",
        ],
      },
      {
        heading: "Dubina duga",
        body: [
          "Dubina duga označava odnos između vrijednosti duga i vrijednosti imovine. Plitak dug može izgledati bezazleno. Ako je dug mali u odnosu na imovinu, lako ga je opravdati jer se čini da je sve pod kontrolom.",
          "Ali kada dug postane dublji, mijenja se osjećaj. Na dvadeset, pedeset ili osamdeset posto imovine težina se više ne promatra samo u tablici. Ako dug prijeđe vrijednost imovine, čovjek je pod vodom. Tada se ne radi samo o financijskom pritisku. Odlučivanje postaje sve više pod pritiskom i tražite malo zraka, mira i jasnoće.",
        ],
      },
      {
        heading: "Vrijeme provedeno u dugu",
        body: [
          "Druga dimenzija duga još je važnija: vrijeme provedeno u dugu. Ako na svojoj bilanci imate obvezu prema nekome, nalazite se u stanju duga. Tada pitanje nije samo koliko dugujete, nego koliko dugo to stanje nosite.",
          "Vrijeme pojačava stanje u kojem živite. Petnaest godina plitkog duga može stvoriti snažan osjećaj zarobljenosti, nemira i zbunjenosti. Dva tjedna bez duga je dragocjeno, ali to je tek početak slobode, mira i jasnoće. Treba joj vrijeme i zaštita.",
        ],
      },
      {
        heading: "Zašto dug stvara zbunjenost",
        body: [
          "Dug stvara pogrešno vrednovanje kroz vrijeme. Zaduživanjem kupujete sadašnje dobro budućim novcem. Danas vidite automobil, uređaj, putovanje ili komfor. Ali odluku zapravo donosite o budućem novcu, budućim okolnostima i budućoj verziji sebe.",
          "Budući novac još nemate. Buduće okolnosti ne poznajete. Buduća verzija nas možda neće vrednovati istu stvar jednako. Zato je dug izvor zbunjenosti: sadašnju želju miješa s nepoznatom budućnošću.",
        ],
      },
      {
        heading: "Kako plitak dug postaje dubok dug",
        body: [
          "Opasnost plitkog duga je u tome što izgleda bezazleno. Čovjek godinama nosi malu obvezu, uredno plaća i izvana sve izgleda mirno. Ali sve to vrijeme zalijeva isti korijen.",
          "Kasnije lakše prihvati veći dug jer je stanje duga već postalo normalno. Mala obveza postane veća obveza. Veća obveza postane pritisak. Pritisak postane nemir. A nemir počne tražiti izlaz koji često pogorša situaciju.",
        ],
      },
      {
        heading: "Dug i Bitcoin: opasna kombinacija",
        body: [
          "Bitcoin može biti snažan oblik štednje, ali Bitcoin i dug su opasna kombinacija. Ne zato što je Bitcoin problem, nego zato što stanje duga mijenja vaše odluke.",
          "Kad dug postane težak, čovjek može pokušati istrgovati izlaz iz problema. Umjesto da prihvati težak, ali čistiji put, može početi tražiti brze dobitke, riskirati s Bitcoinom i donositi odluke iz očaja. Dug tada više nije samo financijski teret. On postaje izvor ponašanja koje produbljuje problem.",
        ],
      },
      {
        heading: "Kamata nije glavna stvar",
        body: [
          "Visoka kamata može ubrzati štetu, ali kamata nije glavna stvar. Ponekad je najopasniji dug baš onaj koji možete nositi godinama jer ne boli dovoljno brzo da nas probudi.",
          "Dug koji se čini podnošljivim može polako oblikovati osobu. Što dulje ostajete u stanju duga, to je teže izaći. Ako ne izađete voljno, postoji opasnost da ćete izaći prisilno: kroz prodaju pod pritiskom, likvidaciju, bankrot ili veliki životni lom.",
        ],
      },
      {
        heading: "Stanje bez duga",
        body: [
          "Stanje bez duga znači da kupujete samo novcem koji već imate. Ne trošite budući novac. Ne obećavate budući rad sadašnjoj želji. Vaše odluke više ne dolaze iz pritiska obveze prema nekome drugome.",
          "Desetljeća bez duga stvaraju duboko ukorijenjen osjećaj slobode, mira i jasnoće. Takva osoba ima veći kapacitet za razuman rizik jer ne riskira iz očaja. Ima veću slobodu jer nikome ne duguje.",
        ],
      },
      {
        heading: "Praktičan zaključak",
        body: [
          "Zato je cilj jednostavan: izađite iz duga što je brže moguće i ostanite bez duga zauvijek. Ne trošite budući novac. Kupujte samo novcem koji već imate.",
          "Ako ste u dugu, prihvatite težak, ali čistiji put: smanjite standard, prodajte što treba prodati, likvidirajte dio imovine ako je potrebno i očistite bilancu. To može boljeti kratkoročno, ali vraća zrak, mir i jasnoću.",
          "Kad postanete bez duga, tek tada gradite pravi temelj za sljedeću praksu: davanje. Nakon što se smanji osjećaj zarobljenosti, nemira i zbunjenosti, možete početi graditi velikodušnost.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako dug utječe na vaše Bitcoin odluke, uvodni razgovor može pomoći da ga stavimo u jasnu sliku.",
  },
  {
    slug: "dug-ili-bitcoin",
    previousSlugs: ["kredit-ili-bitcoin"],
    title: "Dug ili Bitcoin?",
    metaDescription:
      "Vodič o tome zašto se odluka između duga i Bitcoina ne donosi samo matematički, nego iz stanja mira, jasnoće i slobode.",
    excerpt:
      "Ne odlučujete između duga i Bitcoina samo matematički. Odlučujete između dva stanja.",
    category: "Život bez duga",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 35,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Je li vaša Bitcoin odluka donesena iz mira i jasnoće ili iz pritiska duga?",
    relatedSlugs: [
      "dug-je-buduci-novac",
      "ne-zaduzujte-se-za-bitcoin",
      "stvarni-visak",
    ],
    sections: [
      {
        heading: "Pogrešno pitanje",
        body: [
          "Pogrešno pitanje glasi: je li kamata na dug niža od moguće buduće kupovne moći Bitcoina? Takav matematički pogled propušta stanje osobe koja odlučuje.",
          "Ne odlučujete između duga i Bitcoina samo matematički. Odlučujete između dva stanja. Dug povećava nemir i skraćuje vrijeme za odluku. Bitcoin traži mir, vrijeme i jasnoću.",
        ],
      },
      {
        heading: "Bitcoin traži sposobnost čekanja",
        body: [
          "Bitcoin može biti snažan oblik štednje, ali štednja traži sposobnost čekanja. Čekanje traži mir. Dug smanjuje mir, skraćuje vremenski horizont i čini svaku promjenu kupovne moći osobnijom nego što treba biti.",
          "Ako odluku donosite iz stanja duga, pitanje više nije samo što mislite o Bitcoinu. Pitanje je koliko dugo možete nositi obvezu, rok i nemir bez očajnih poteza.",
        ],
      },
      {
        heading: "Dug može natjerati prodaju",
        body: [
          "Rata ne čeka. Obveza ne pita za cijenu Bitcoina. Ako dug postoji, on može natjerati prodaju u trenutku kada biste inače čekali.",
          "Tada ne prodajete zato što je to mirna odluka. Prodajete zato što budući novac koji ste već potrošili sada traži naplatu. Dug sužava izbor prije nego što odluka postane mirna.",
        ],
      },
      {
        heading: "Ne pokušavajte istrgovati izlaz",
        body: [
          "Najopasniji trenutak dolazi kada čovjek pokuša istrgovati izlaz iz duga. Tada Bitcoin više nije novac koji se drži iz mira, nego sredstvo očajnog spašavanja bilance.",
          "Ne koristite Bitcoin za panično popravljanje stanja duga. Ne tražite brzi izlaz kroz trgovanje. Ako je dug postao težak, problem treba riješiti u bilanci, proračunu nulte osnove i životnom standardu.",
        ],
      },
      {
        heading: "Težak, ali čistiji put",
        body: [
          "Težak, ali čistiji put može biti smanjiti standard, prodati što treba prodati, očistiti bilancu i vratiti zrak, mir i jasnoću. Nije ugodno, ali vraća odluke iz očaja u red.",
          "Pravilo je jednostavno: ako dug stvara nemir, prvo dug. Bitcoin standard počinje kada ne trošite budući novac. Nakon izlaska iz duga Bitcoin odluke postaju mirnije jer više ne pokušavate spasiti sadašnjost budućim novcem.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako imate dug i niste sigurni treba li prvo čistiti bilancu ili nastaviti s Bitcoinom, to vrijedi razjasniti u uvodnom razgovoru.",
  },
  {
    slug: "ne-zaduzujte-se-za-bitcoin",
    previousSlugs: ["ne-uzimajte-kredit-za-bitcoin"],
    title: "Ne zadužujte se za Bitcoin",
    metaDescription:
      "Zašto kupnja Bitcoina budućim novcem nije Bitcoin standard, nego fiat ponašanje primijenjeno na Bitcoin.",
    excerpt:
      "Zadužiti se za Bitcoin znači pokušati kupiti novac budućim novcem. To nije Bitcoin standard.",
    category: "Život bez duga",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 40,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Pokušavate li kupiti Bitcoin novcem koji još niste zaradili?",
    relatedSlugs: ["dug-je-buduci-novac", "dug-ili-bitcoin", "stvarni-visak"],
    visual: {
      type: "split",
      title: "Dva puta prema Bitcoinu",
      leftLabel: "Dug",
      leftItems: ["obveza", "pritisak", "prisilna odluka"],
      rightLabel: "Stvarni višak",
      rightItems: ["sloboda", "pravilo", "mirno čekanje"],
      caption: "Bitcoin kupujete iz stvarnog viška, ne iz budućeg novca.",
    },
    sections: [
      {
        heading: "Bitcoin nije opravdanje za dug",
        body: [
          "Zadužiti se za Bitcoin znači pokušati kupiti novac budućim novcem. To nije Bitcoin standard, nego fiat ponašanje primijenjeno na Bitcoin.",
          "Bitcoin nije opravdanje za dug. Ako se pravilo slomi zato što vjerujete u buduću cijenu, tada Bitcoin više nije novac u sustavu. Postaje razlog za trošenje novca koji još niste zaradili.",
        ],
      },
      {
        heading: "Ne kupujte novac budućim novcem",
        body: [
          "Ne trošite budući novac, čak ni za Bitcoin. Bitcoin traži mir, vrijeme i jasnoću. Dug traži rok, naplatu i odluke pod pritiskom.",
          "Kupnja Bitcoina iz stvarnog viška ima drukčiji karakter. Ako cijena padne, možete čekati. Ako kupujete iz duga, čekanje ima mjesečnu cijenu koja se javlja bez obzira na vaše uvjerenje.",
        ],
      },
      {
        heading: "Dug mijenja vaše odluke",
        body: [
          "Ne zato što je Bitcoin problem, nego zato što stanje duga mijenja vaše odluke. Dug pojačava nemir, osjećaj zarobljenosti i zbunjenost. Kada se to stanje spoji s promjenjivom kupovnom moći Bitcoina, odluke lako postanu očajne.",
          "Tada se više ne pitate što je ispravno pravilo, nego što će nas izvući do sljedeće rate. Umjesto slobode dobivate pritisak obučen u Bitcoin jezik.",
        ],
      },
      {
        heading: "Volatilnost i dug proizvode očaj",
        body: [
          "Promjenjiva kupovna moć Bitcoina sama po sebi traži strpljenje. Dug joj dodaje sat koji otkucava. Ako cijena padne, rata ostaje. Ako prihod kasni, obveza ostaje. Ako se pojavi trošak, dug ostaje.",
          "Zato volatilnost i dug proizvode očaj. Osoba počinje tražiti brze dobitke, pokušava pogoditi kretanje i gubi sposobnost mirnog čekanja.",
        ],
      },
      {
        heading: "Ne pokušavajte istrgovati izlaz",
        body: [
          "Ne pokušavajte istrgovati izlaz iz duga. Ne koristite Bitcoin kao očajno spašavanje bilance. Ako dug stvara pritisak, potreban je plan izlaska iz stanja duga, a ne veća oklada.",
          "Ako već imate dug i Bitcoin, to ne znači da je odgovor automatski prodati sve. Znači da dug mora biti vidljiv u odluci.",
          "Pravilo je kratko: Bitcoin kupujete iz stvarnog viška, ne iz budućeg novca. Ako želite više Bitcoina, prvo smanjite troškove, povećajte prihode, očistite bilancu i prestanite trošiti budući novac.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako već imate dug i Bitcoin, odgovor nije uvijek automatski isti. Uvodni razgovor može pomoći da dug bude vidljiv u odluci.",
  },
  {
    slug: "davanje-u-proracunu-nulte-osnove",
    previousSlugs: [
      "sustavno-davanje-u-proracunu-nulte-razine",
      "davanje-u-proracunu",
    ],
    title: "Davanje mijenja vaš odnos prema novcu",
    metaDescription:
      "Vodič o davanju u osobnom Bitcoin standardu: bez očekivanja povrata, nakon izlaska iz duga i iz uređenog proračuna nulte osnove.",
    excerpt:
      "Davanje nije ostatak novca niti moralni pritisak. U osobnom Bitcoin standardu ono dolazi nakon reda i izlaska iz duga.",
    category: "Davanje",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 50,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Imate li u osobnom proračunu nulte osnove prostor za davanje koje ne očekuje ništa natrag?",
    relatedSlugs: [
      "davanje-bez-duga",
      "novac-dolazi-od-ljudi",
      "svaki-euro-ima-namjenu",
    ],
    visual: {
      type: "cycle",
      title: "Krug davanja",
      nodes: ["ljudi", "vrijednost", "prihod", "davanje"],
      center: "velikodušnost",
      caption: "Davanje nas vraća ljudima, a novac dolazi od ljudi.",
    },
    sections: [
      {
        heading: "Davanje nije ostatak",
        body: [
          "Davanje nije ono što se dogodi ako nešto slučajno ostane. Ako je samo ostatak, tada ovisi o raspoloženju, krivnji ili pritisku trenutka. Jedan mjesec postoji, drugi mjesec nestane. Nema pravilo i nema mir.",
          "Ne radi se o dokazivanju dobrote novcem. Ova praksa ima smisla tek kada proračun i dug ne stvaraju pritisak.",
          "U osobnom Bitcoin standardu davanje dobiva mjesto u osobnom proračunu nulte osnove. Ne zato da bi netko dokazao dobrotu, nego zato da novac prestane biti nejasan. Svaki euro treba namjenu. Dio novca, kada je temelj uređen, može dobiti namjenu za druge ljude.",
        ],
      },
      {
        heading: "Davanje dolazi nakon izlaska iz duga",
        body: [
          "Dug stvara pritisak. Dug traži buduća plaćanja. Dug može učiniti da i dobra odluka postane izvor nemira. Zato davanje u ovom okviru ne smije usporiti izlazak iz duga niti prikriti neuređen proračun nulte osnove.",
          "Redoslijed je važan. Prvo osobni proračun nulte osnove. Zatim život bez duga. Tek tada redovito davanje. Osoba u dugu i dalje može pomoći nekome, ali davanje kao praksa osobnog Bitcoin standarda dolazi iz reda i slobode, a ne iz pritiska.",
        ],
      },
      {
        heading: "Bez očekivanja povrata",
        body: [
          "Ako očekujete povrat, ne govorimo više o davanju, nego o dogovoru, razmjeni ili skrivenoj obvezi. Davanje u ovom okviru ne traži da primatelj vrati uslugu, zahvalnost, naklonost ili buduću korist.",
          "To čuva dostojanstvo primatelja. Dar ne smije postati nevidljiv dug. Ako poklon stvara obvezu, više nije čist dar. Zato pravilo mora biti jasno: darujem bez očekivanja povrata i bez stvaranja pritiska na osobu koja prima.",
        ],
      },
      {
        heading: "Davanje nas okreće prema ljudima",
        body: [
          "Davanje nije zato što ste nešto uzeli od društva. Pošteno zarađen novac već znači da ste nekome pružili vrijednost. Netko je dobrovoljno dao svoj novac jer je ono što ste ponudili bilo vrijedno.",
          "Davanje zato ima drukčiju ulogu. Ono nas okreće izvan sebe. Podsjeća da novac nije samo obrana od straha, nego i način odnosa prema ljudima. Kada dio proračuna nulte osnove dobije namjenu za druge, novac postaje manje zatvoren i više usmjeren na služenje.",
        ],
      },
      {
        heading: "Velikodušnost mijenja način rada",
        body: [
          "Velikodušna osoba lakše sluša. Lakše vidi što drugoj osobi stvarno treba. Lakše prima povratnu informaciju, pregovara bez sitničavosti i gradi odnose koji traju. To ne jamči veći prihod. Ali povećava sposobnost stvaranja vrijednosti.",
          "Zato davanje nije sporedna stavka proračuna nulte osnove. Ono vježba smjer iz kojeg dolazi pošten prihod: prema ljudima, njihovim problemima i vrijednosti koju možete stvoriti. Bolji novac ne bi smio čovjeka učiniti tvrđim. Trebao bi mu dati više reda i više slobode za velikodušnost.",
        ],
      },
      {
        heading: "Prvo pravilo davanja",
        body: [
          "Pravilo može biti jednostavno: kada osobni proračun nulte osnove ima red i dug više ne stvara pritisak, dio novca dobiva namjenu za davanje bez očekivanja povrata. Ne iz krivnje. Ne zbog povrata. Nego zato što novac treba služiti i drugima.",
          "Manji i češći darovi često su bolji od velikih i rijetkih. Lakše ih je održati, manje stvaraju pritisak i više nalikuju praksi. Cilj nije dokazati veličinu dara. Cilj je vježbati velikodušnost bez novog duga, bez skrivenih očekivanja i bez narušavanja proračuna nulte osnove.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako vam davanje zvuči važno, ali ne znate kako ga uklopiti bez pritiska, to je dobar razlog za razgovor.",
  },
  {
    slug: "davanje-bez-duga",
    previousSlugs: ["sustavno-davanje-bez-kredita"],
    title: "Davanje bez duga",
    metaDescription:
      "Vodič o tome zašto davanje u osobnom Bitcoin standardu dolazi nakon osobnog proračuna nulte osnove i izlaska iz duga.",
    excerpt:
      "Kad se smanji osjećaj zarobljenosti, nemira i zbunjenosti, možete graditi praksu velikodušnosti.",
    category: "Davanje",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 55,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Pokušavate li graditi velikodušnost dok dug još stvara osjećaj zarobljenosti, nemira i zbunjenosti?",
    relatedSlugs: [
      "davanje-u-proracunu-nulte-osnove",
      "novac-dolazi-od-ljudi",
      "dug-je-buduci-novac",
    ],
    visual: {
      type: "sequence",
      title: "Redoslijed je važan",
      steps: ["red", "bez duga", "davanje"],
      caption: "Davanje ne dolazi iz pritiska, nego iz slobode.",
    },
    sections: [
      {
        heading: "Davanje ne dolazi iz stanja duga",
        body: [
          "Davanje ne dolazi iz stanja duga kao pravilo ovog okvira. Dug često pojačava osjećaj zarobljenosti, nemira i zbunjenosti. Davanje treba graditi drukčiji smjer: velikodušnost, slobodu i otvorenost prema ljudima.",
          "Ovdje ne govorimo o tome da osoba u dugu nikada ne smije nikome pomoći. Govorimo o redovitoj proračunskoj praksi davanja kao dijelu osobnog Bitcoin standarda. Ta praksa treba počivati na redu, ne na pritisku.",
          "Ako darujete dok još živite u stanju duga, dar lako postane novi izvor pritiska. Umjesto mira pojavljuje se otpor. Umjesto velikodušnosti pojavljuje se krivnja. Zato je redoslijed važan.",
        ],
      },
      {
        heading: "Prvo sloboda, mir i jasnoća",
        body: [
          "Nakon izlaska iz duga stanje bez duga je mlada biljka. Treba joj vrijeme, voda i zaštita. Ne treba je odmah opteretiti novom praksom koja će vratiti nemir.",
          "Prvo prestajete trošiti budući novac. Prvo čistite bilancu. Prvo vraćate zrak, mir i jasnoću. Tek tada davanje može postati praksa koja raste iz slobode.",
        ],
      },
      {
        heading: "Tek tada velikodušnost",
        body: [
          "Kad postanete bez duga, tek tada gradite pravi temelj za sljedeću praksu: davanje. Nakon što se smanji osjećaj zarobljenosti, nemira i zbunjenosti, možete početi graditi velikodušnost.",
          "Davanje dolazi nakon što prestanete trošiti budući novac. Tada nije bijeg od krivnje, nije dokazivanje i nije pokušaj popravljanja osjećaja. Postaje praksa odnosa prema ljudima.",
        ],
      },
      {
        heading: "Davanje nije dug",
        body: [
          "Davanje nije dug, skriveni dogovor ni način da kod primatelja stvorite obvezu. Ako očekujete povrat, više ne darujete. Tada stvarate račun.",
          "Dar je dar samo ako ne traži povrat i ne stvara pritisak. To čuva dostojanstvo primatelja i čuva vaš odnos prema novcu.",
        ],
      },
      {
        heading: "Prvi mali dar",
        body: [
          "Kada se temelj uredi, početak može biti malen. To je često i bolje: velikodušnost se ne mora dokazivati veličinom. Često je bolje darivati manje i češće nego rijetko napraviti veliki potez koji optereti proračun nulte osnove.",
          "Prvi mali dar uči nas primijetiti osobu, potrebu i trenutak. Uči nas dati bez unutarnjeg računa. Uči nas da novac ima ljudsku stranu. Više je vježba nego predstava.",
        ],
      },
      {
        heading: "Praktično pravilo",
        body: [
          "Zapišite pravilo: davanje ne smije stvarati novi dug, ne smije usporiti izlazak iz starog duga i ne smije očekivati povrat. Ako to pravilo nije zadovoljeno, davanje čeka.",
          "To možda zvuči strogo, ali čuva velikodušnost. Davanje koje počiva na dugu lako postane gorčina. Davanje koje počiva na redu može trajati. Prvo sloboda. Zatim velikodušnost. Tek tada davanje postaje dio osobnog Bitcoin standarda.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako želite pomagati drugima, ali dug još stvara pritisak, razgovor može pomoći razlikovati spontanu pomoć od stalne proračunske prakse.",
  },
  {
    slug: "novac-dolazi-od-ljudi",
    title: "Novac dolazi od ljudi",
    metaDescription:
      "Vodič o tome kako davanje, odnosi s ljudima i stvaranje vrijednosti povećavaju sposobnost za budući prihod.",
    excerpt:
      "Prihod ne dolazi iz apstraktnog sustava. Prihod dolazi od ljudi kojima ste pružili vrijednost.",
    category: "Davanje",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 57,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion: "Kome vaš rad danas stvarno pomaže?",
    relatedSlugs: [
      "davanje-u-proracunu-nulte-osnove",
      "davanje-bez-duga",
      "pozitivni-neto-priljev",
    ],
    visual: {
      type: "network",
      title: "Novac dolazi od ljudi",
      center: "vrijednost",
      nodes: ["kupac", "klijent", "poslodavac", "obitelj", "zajednica"],
      caption: "Novac dolazi kroz dobrovoljnu razmjenu s ljudima.",
    },
    sections: [
      {
        heading: "Novac nije odvojen od ljudi",
        body: [
          "Novac ne dolazi iz magle, aplikacije ili apstraktnog sustava. U stvarnom životu dolazi kroz dobrovoljnu razmjenu s ljudima. Netko vidi vrijednost u onome što nudite i odluči dati svoj novac jer ono što prima vrijedi više od novca koji predaje.",
          "Misao je jednostavna, ali važna. Kada gledate samo saldo, lako zaboravite da iza svakog eura koji ulazi postoji osoba, obitelj, kupac, klijent ili zajednica. Osobni Bitcoin standard zato ne zatvara čovjeka u stanje na računu. Vraća ga pitanju: kome stvaram vrijednost?",
        ],
      },
      {
        heading: "Prihod je potvrda vrijednosti",
        body: [
          "Pošten prihod nije dokaz da ste nekome nešto uzeli. On je potvrda da ste nekome pružili vrijednost. Druga osoba mogla je zadržati svoj novac. Nije morala platiti. Platila je zato što je procijenila da joj ono što dobiva pomaže više od novca koji daje.",
          "Zato odnos prema prihodu ne treba počivati na krivnji. Treba počivati na odgovornosti. Ako novac dolazi od ljudi, tada veća sposobnost stvaranja prihoda traži veću sposobnost služenja ljudima: bolje slušanje, jasniji rad, pošteniju isporuku i manje očaja u razgovorima.",
        ],
      },
      {
        heading: "Davanje nije vraćanje duga društvu",
        body: [
          "Davanje ne treba opisivati kao vraćanje društvu. Pošteno zarađen novac već znači da ste nekome pružili vrijednost u dobrovoljnoj razmjeni. Niste prvo nešto uzeli pa sada morate vratiti. To stvara pogrešan ton i pretvara davanje u moralni račun.",
          "Davanje ima drukčiju ulogu. Ono je praksa kojom želite postati osoba koja može stvarati više vrijednosti. Davanje ne kupuje povrat. Davanje gradi osobu koja može stvoriti veći povrat. Bez jamstva, bez potraživanja i bez pritiska na onoga tko prima.",
        ],
      },
      {
        heading: "Davanje širi pogled",
        body: [
          "Kada je sav novac zatvoren u vlastiti strah, pogled se sužava. Vidite samo svoje račune, svoje ciljeve i svoje rizike. To je razumljivo, posebno ako postoji dug ili neuređen proračun nulte osnove. Ali dugoročno takav pogled slabi sposobnost stvaranja vrijednosti.",
          "Redovito davanje, nakon reda i izlaska iz duga, širi pogled. Uči nas primijetiti ljude, potrebe i male prilike za služenje. Ne zato da biste odmah nešto dobili natrag, nego zato da novac ne postane zid između nas i stvarnog svijeta.",
        ],
      },
      {
        heading: "Velikodušnost mijenja razgovore",
        body: [
          "Velikodušna osoba ulazi u poslovne i ljudske razgovore drukčije. Manje očajno. Više otvoreno. Lakše sluša. Lakše prima primjedbu. Lakše pregovara jer ne mora iz svakog razgovora izvući najviše za sebe u tom trenutku.",
          "To ne znači da velikodušnost jamči veći prihod. Ne jamči. Ali povećava kapacitet za stvaranje vrijednosti. Ljudi lakše vjeruju osobi koja nije stisnuta oko svakog eura i svakog ustupka. A novac, kada dolazi pošteno, dolazi od ljudi kojima ste pomogli.",
        ],
      },
      {
        heading: "Bitcoin standard nije bijeg od ljudi",
        body: [
          "Bitcoin kao novac ne znači povlačenje iz svijeta. Ne znači da se čovjek zatvara u hladno čuvanje kupovne moći i prestaje gledati ljude. Dobar novac treba dati više jasnoće, više strpljenja i više slobode za stvaranje vrijednosti u svijetu.",
          "Bitcoin standard nije bijeg u novčanik. Ako je Bitcoin bolji novac, trebao bi vam pomoći da jasnije služite ljudima, ne da se od njih zatvorite.",
          "Zato davanje ima mjesto u osobnom Bitcoin standardu. Prvo red. Zatim izlazak iz duga. Tek tada davanje. Ne kao predstava, ne kao krivnja i ne kao ulaganje s očekivanim povratom. Kao praksa koja nas vraća ljudima od kojih novac i dolazi.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako želite da Bitcoin standard ne zatvori odnos prema ljudima, nego ga učini jasnijim, to je pitanje koje ne treba ostati samo u glavi.",
  },
  {
    slug: "niste-zakasnili-u-bitcoin",
    title: "Niste zakasnili u Bitcoin",
    seoTitle: "Niste zakasnili u Bitcoin",
    metaDescription:
      "Prije deset godina Bitcoin je bio jeftiniji u državnom novcu, ali je razumijevanje bilo skuplje u vremenu. Danas je lakše doći do jasnog okvira za odluku i primjenu.",
    excerpt:
      "Bitcoin je prije bio jeftiniji, ali je razumijevanje bilo skuplje. Danas je lakše doći do jasnog okvira za odluku, proračun, dug, sigurnost i ulogu Bitcoina u imovini.",
    category: "Bitcoin kao novac",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 58,
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-13",
    practicalQuestion:
      "Gledate li samo cijenu koju ste propustili ili i cijenu razumijevanja koju danas možete skratiti?",
    relatedSlugs: [
      "bitcoin-kao-novac",
      "dca-nije-dovoljan",
      "uskladivanje-kupovne-moci-bitcoina",
      "svaki-euro-ima-namjenu",
    ],
    visual: {
      type: "split",
      title: "Cijena i razumijevanje",
      leftLabel: "Prije",
      leftItems: [
        "niža cijena",
        "manje signala",
        "više šuma",
        "dulji put do razumijevanja",
      ],
      rightLabel: "Danas",
      rightItems: [
        "više materijala",
        "više iskustva",
        "jasniji okvir",
        "brža primjena",
      ],
      caption:
        "Ranije nije značilo nužno lakše. Cijena je bila niža, ali je razumijevanje bilo skuplje.",
    },
    sections: [
      {
        heading: "Niža cijena nije isto što i bolji trenutak",
        body: [
          "Jedna od najčešćih rečenica koju ljudi izgovore kada počnu ozbiljnije gledati Bitcoin glasi: “Da sam barem ušao ranije.” Na prvi pogled, ta rečenica zvuči razumno. Bitcoin je nekada vrijedio nekoliko dolara, zatim nekoliko stotina dolara, zatim nekoliko tisuća dolara. Tko danas gleda povijesni graf, lako može steći dojam da je pravi trenutak već prošao.",
          "Ali taj pogled propušta najvažniji dio priče. Kada sam prvi put kupio Bitcoin u srpnju 2014., cijena je bila oko 600 dolara po Bitcoinu. Kupio sam oko 20 dolara vrijednosti Bitcoina, više kao pokus nego kao ozbiljan financijski korak. Cijena je bila niska, ali moje razumijevanje nije bilo dovoljno za veliku odluku.",
          "Nije dovoljno da je cijena niska. Trebate znati što radite, zašto to radite, koliko rizika preuzimate, što očekujete i što ćete napraviti ako cijena snažno poraste ili snažno padne. Niska cijena bez razumijevanja često ne vodi do dobre odluke. Vodi do pokusa, zaborava, panike, prerane prodaje ili potpunog odustajanja.",
        ],
      },
      {
        heading: "Prije je signal bio slabiji",
        body: [
          "Godine 2014. nije bilo ni približno toliko kvalitetnog Bitcoin sadržaja kao danas. Bilo je manje knjiga, manje dobrih razgovora, manje jasnih objašnjenja i manje ljudi koji su prošli više ciklusa. Netko tko je tada htio doći do ozbiljnog razumijevanja morao je sam prolaziti kroz mnogo šuma.",
          "Godine 2017. šuma je bilo još više: altcoini, ICO-ovi, kratke priče o brzom bogaćenju i stalno miješanje Bitcoina s ostatkom digitalne imovine. Tek nakon toga, osobito od 2018., počeo se jasnije razvijati Bitcoin-only signal kroz knjige, podcaste i ozbiljnije razgovore.",
          "Danas je situacija drukčija. Bitcoin je zreliji. Materijala ima više. Iskustva ima više. Puno toga što je prije bilo nejasno danas se može objasniti brže, jednostavnije i praktičnije. Ranije je cijena bila niža, ali je put do razumijevanja bio skuplji.",
        ],
      },
      {
        heading: "Razumijevanje ima svoju cijenu",
        body: [
          "Informacije o Bitcoinu često su besplatne. Možete čitati knjige, slušati podcaste, gledati predavanja i razgovarati s ljudima. Ali to ne znači da je put besplatan. Plaćate ga vremenom.",
          "Ako trebate stotine sati da razdvojite signal od šuma, taj put ima cijenu. Ako godinama odgađate odluku jer još niste sigurni, i to ima cijenu. Ako napravite pogrešne korake jer niste imali redoslijed, i to ima cijenu.",
          "Zato pitanje “zašto bih platio razgovor ako mogu sam učiti” nije potpuno. Bolje pitanje glasi: koliko me košta da do istog stupnja jasnoće dođem sam? Za nekoga tko ima ozbiljan posao, obitelj, imovinu, obveze ili firmu, vrijeme nije neograničeno.",
        ],
      },
      {
        heading: "Ne morate postati Bitcoin stručnjak za sve",
        body: [
          "Kod Bitcoina postoji česta pogreška: ljudi misle da moraju razumjeti sve prije nego što ga mogu koristiti. Ne moraju.",
          "Da biste vozili auto, ne morate biti automobilski inženjer. Ne morate znati projektirati motor, proizvoditi gume ili popravljati elektroniku. Trebate znati kako sigurno koristiti auto: kako krenuti, kočiti, skretati, gledati retrovizore i doći od točke A do točke B.",
          "Slično vrijedi i za mobitel. Milijarde ljudi koriste mobitele svaki dan, a vrlo mali broj njih može objasniti kako rade čipovi, antene, operativni sustav i proizvodni lanac. To ih ne sprječava da imaju veliku korist od tehnologije.",
          "S Bitcoinom je slično. Dobro je razumjeti osnovnu Bitcoin tezu. Dobro je razumjeti zašto novac postoji, zašto državni novac gubi kupovnu moć, zašto je Bitcoin ograničen i zašto se privatni ključevi ne dijele. Ali ne morate postati stručnjak za svaki dio Bitcoin sustava. Trebate znati dovoljno da ga koristite mudro.",
        ],
      },
      {
        heading: "Važnije pitanje: što ćete napraviti s Bitcoinom?",
        body: [
          "Najvažnije pitanje nije koliko duboko možete objasniti svaki tehnički dio Bitcoina. Najvažnije pitanje je: što ćete napraviti s Bitcoinom u vlastitom životu?",
          "Hoće li Bitcoin biti samo imovina koju držite sa strane? Hoće li postati dio vaše novčane zalihe? Koliko državnog novca trebate ostaviti za kratke potrebe? Imate li dug? Vodite li proračun? Znate li što je stvarni višak? Kako ćete reagirati ako kupovna moć Bitcoina padne? Što ćete napraviti ako snažno poraste? Kako je Bitcoin uklopljen u vašu neto imovinu? Zna li obitelj što smije i što ne smije napraviti?",
          "To su praktična pitanja. Ona često imaju veću vrijednost od dodatnih sati teorijskog proučavanja. Možete imati veliko tehničko razumijevanje Bitcoina, a svejedno donositi loše osobne odluke. Možete razumjeti proof of work, ali ne voditi proračun. Možete znati objasniti rudarenje, ali imati dug koji vas prisiljava na prodaju u lošem trenutku.",
        ],
        link: {
          before: "Za početak osobnog okvira pročitajte vodič ",
          label: "Svaki euro ima namjenu",
          href: "/vodici/svaki-euro-ima-namjenu/",
          after: ".",
        },
      },
      {
        heading: "Prvo red, zatim Bitcoin kao novac",
        body: [
          "U autoškoli ne počinjete s dubokom teorijom motora. Prvo učite kako se auto koristi. Gdje je kočnica. Kako se kreće. Kako se gleda mrtvi kut. Kako se ulazi u promet. Kako se sigurno zaustavlja.",
          "Slično je i s Bitcoinom kao novcem. Na početku morate svjesno urediti osnovne stvari: proračun, dug, stvarni višak, buduća plaćanja, sigurnost i pravila za obitelj. Možda se čini da to nema izravne veze s Bitcoinom, ali ima. Bez toga Bitcoinova volatilnost može pojačati nered koji već postoji.",
          "Ako ne znate koji novac ima koju namjenu, ne znate ni koji novac stvarno može postati Bitcoin. Ako imate dug, dio vaše budućnosti već je potrošen. Ako obitelj ne zna što ne smije napraviti s privatnim ključevima, wallet backup datotekama, passphraseovima ili početnim riječima drugih walleta, sigurnost ovisi o sreći. Ako ne znate što ćete napraviti pri velikom rastu ili padu, cijena će voditi odluku umjesto pravila.",
          "Zato je redoslijed važan: prvo proračun, zatim izlazak iz duga, zatim davanje, zatim Bitcoin kao novac, neto imovina, volatilnost, sigurnost i obitelj.",
        ],
        link: {
          before: "Kada dođete do pitanja uloge Bitcoina, nastavite s vodičem ",
          label: "Bitcoin je novac",
          href: "/vodici/bitcoin-kao-novac/",
          after: ".",
        },
      },
      {
        heading: "Danas je lakše početi nego prije",
        body: [
          "Netko tko danas ulazi u Bitcoin ima prednost koju raniji korisnici nisu imali. Ne mora sam prolaziti kroz isti kaos. Ne mora godinama skupljati fragmente. Ne mora ponavljati sve pogreške. Ne mora postati stručnjak za svaku tehničku i industrijsku granu Bitcoina.",
          "Može krenuti jasnije. Može naučiti osnovnu Bitcoin tezu, razumjeti zašto je Bitcoin novac u procesu monetizacije, vidjeti zašto je volatilnost prirodan dio tog procesa i naučiti kako ga uklopiti u vlastiti proračun, dug, neto imovinu i sigurnosni plan.",
          "Bitcoin savjetovanje nije zamjena za učenje. Nije ni prečac kojim se preskače odgovornost. Ono je skraćivanje puta između pitanja i primjene. Cilj nije da izađete iz razgovora kao Bitcoin stručnjak za sve. Cilj je da izađete s jasnijim sljedećim korakom.",
        ],
      },
      {
        heading: "Zaključak",
        body: [
          "Niste zakasnili u Bitcoin samo zato što je cijena danas viša nego što je bila prije deset godina. Prije je cijena bila niža, ali je razumijevanje bilo skuplje. Danas je cijena viša, ali je put do jasnog okvira kraći. To je važna razlika.",
          "Bitcoin nije samo nešto što treba razumjeti. Bitcoin je novac koji treba znati uklopiti u vlastiti život. Ne morate znati sve. Ali trebate znati dovoljno da donesete mirnije odluke o novcu, dugu, imovini, sigurnosti i obitelji.",
          "Ako imate jedno stvarno Bitcoin pitanje koje utječe na odluku, to je dovoljno dobar početak.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako imate osjećaj da ste zakasnili u Bitcoin, uvodni razgovor može pomoći razjasniti što danas stvarno trebate napraviti.",
  },
  {
    slug: "kada-bitcoin-postane-distrakcija",
    title: "Kada Bitcoin postane distrakcija",
    seoTitle: "Kada Bitcoin postane distrakcija",
    metaDescription:
      "Vodič o tome kako razlikovati korisno učenje, hobi, karijerni put i Bitcoin distrakciju koja zamjenjuje proračun, rad, sigurnost i jasne odluke.",
    excerpt:
      "Tehnologija, trgovanje i zečje rupe nisu zamjena za proračun, rad, vještinu i bolji novac.",
    category: "Bitcoin kao novac",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 58,
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    practicalQuestion:
      "Donosi li vam Bitcoin više jasnoće u novcu, radu i obitelji ili više nemira, provjeravanja i odgađanja stvarnih odluka?",
    relatedSlugs: [
      "bitcoin-kao-novac",
      "bitcoin-nije-kripto-portfelj",
      "svaki-euro-ima-namjenu",
      "dca-nije-dovoljan",
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
    ],
    cover: {
      webpSrc: "/images/kada-bitcoin-postane-distrakcija-cover-20260625.webp",
      src: "/images/kada-bitcoin-postane-distrakcija-cover-20260625.png",
      alt: "Mediteranska radna scena s jasnim Bitcoin planom i tehničkim distrakcijama odmaknutima u stranu",
      position: "56% 52%",
      caption:
        "Bitcoin pomaže tek kada vraća jasnoću u proračun, rad i sigurnost, a ne kada postane odgoda stvarnih odluka.",
    },
    visual: {
      type: "split",
      title: "Jasnoća ili distrakcija",
      leftLabel: "Bitcoin kao novac",
      leftItems: [
        "proračun",
        "dug",
        "sigurnost",
        "obitelj",
        "odluke kroz vrijeme",
      ],
      rightLabel: "Bitcoin kao distrakcija",
      rightItems: [
        "stalni grafovi",
        "tehničko petljanje",
        "poluga",
        "rasprave bez ishoda",
        "odgađanje reda",
      ],
      caption:
        "Učenje ima vrijednost kada služi stvarnom životu. Gubi je kada zamijeni odluke koje su već pred vama.",
    },
    intro: [
      "Neki ljudi u Bitcoin uđu kroz tehnologiju. Drugi uđu kroz cijenu. Prvi se mogu izgubiti u novčanicima, punim čvorovima, UTXO-ima, Lightningu i tehničkim raspravama. Drugi se mogu izgubiti u grafovima, burzama, naknadama, trgovanju, poluzi i alternativnim digitalnim imovinama.",
      "Naizgled su to različiti smjerovi. U praksi se često radi o istoj pogrešci: Bitcoin prestane biti novac i postane stalna distrakcija.",
      "Bitcoin treba povećati jasnoću. Treba pomoći čovjeku da bolje vidi proračun, dug, rad, obitelj, sigurnost, neto imovinu i buduće odluke. Ako se pretvori u beskonačno praćenje, petljanje ili dokazivanje, promašena je njegova najvažnija uloga.",
    ],
    sections: [
      {
        heading: "Dvije zečje rupe",
        body: [
          "Prva je tehnička zečja rupa. Osoba počne učiti o novčanicima, punim čvorovima, UTXO-ima, Lightningu, rudarenju, hardverskim uređajima, privatnosti i sigurnosnim modelima. To može biti korisno. Može biti i uzbudljivo. Bitcoin je stvarna tehnologija i zaslužuje ozbiljno razumijevanje.",
          "Druga je financijska zečja rupa. Osoba počne gledati cijenu, rast, pad, volatilnost, burze, naknade, grafove, trgovanje, polugu i alternativne digitalne imovine. I tu može postojati korisno znanje. Tržišta imaju svoje zakonitosti. Likvidnost, ciklusi i ponašanje sudionika nisu nevažni.",
          "Problem nije u učenju. Problem nastaje kada učenje postane bijeg od odluka koje su stvarno pred vama. Ako Bitcoin više ne vodi prema boljem novcu, nego prema još jednom izvoru nemira, nešto treba zaustaviti i imenovati.",
          "Glavno pitanje nije koliko još možete proučiti. Glavno pitanje glasi: što Bitcoin treba napraviti u vašem životu?",
        ],
      },
      {
        heading: "Tehničko znanje je korisno, ali nije svačiji posao",
        body: [
          "Nije svaka osoba koja koristi Bitcoin dužna postati stručnjak za protokol. Nije svatko dužan znati svaki detalj transakcija, skripti, čvorova, kanala plaćanja i hardverskih uređaja. To ne znači da treba biti nemaran. Znači da razina tehničkog znanja treba služiti stvarnoj potrebi.",
          "Puni čvor, UTXO, Lightning, hardverski novčanici i sigurnosni modeli mogu biti korisni. Za neke ljude oni su nužni. Za druge su sljedeći korak tek nakon što urede osnovni proračun, dug, sigurnosnu zalihu, obiteljske upute i pravila za kupnju ili prodaju.",
          "Zato je dobro postaviti jednostavno pitanje: služi li mi ovo sada ili me odvlači od proračuna, rada, obitelji i sigurnosnog plana? Ako znanje vodi prema jasnijem sustavu, dobro je. Ako postaje stalna promjena alata bez jasnog razloga, možda više ne služite vi Bitcoinu kao novcu, nego vaša pozornost služi novoj distrakciji.",
          "Ako netko želi od Bitcoina napraviti karijeru, to može biti dobar put. Ali to je ozbiljna odluka. Ako ne želi, onda treba naučiti dovoljno za sigurnu uporabu, a ne beskonačno tehnički petljati.",
          "Nije problem pokrenuti puni čvor. Problem je ako puni čvor postane zamjena za proračun, posao, obitelj i stvarni plan.",
        ],
      },
      {
        heading: "Trgovanje nije isto što i Bitcoin standard",
        body: [
          "Mnogi ljudi u Bitcoin uđu kroz rast cijene. To je razumljivo. Cijena privlači pozornost jer pokazuje da se nešto događa. Ali pozornost se brzo može pretvoriti u naviku stalnog provjeravanja. Prvo dolaze grafovi, zatim internetski komentatori, burze, naknade i kratkoročni signali.",
          "Nakon toga često dolaze trgovanje, poluga, stalno uspoređivanje s drugima i alternativne digitalne imovine. Sve to može izgledati kao angažman. U stvarnosti često postane nova forma nemira. Čovjek provjerava više, a odlučuje lošije.",
          "Bitcoin kao novac traži drukčije pitanje. Kako čuvam kupovnu moć? Kako vodim proračun nulte osnove? Kako smanjujem dug? Kako uređujem neto imovinu? Kako čuvam pristup? Kako obitelj zna što se nikada ne smije napraviti?",
          "Ovo nije zabrana učenja o tržištu. Nije tvrdnja da nitko ne smije trgovati. Ovo je upozorenje da trgovanje ne treba miješati s osobnim Bitcoin standardom.",
          "Ako Bitcoin promatrate samo kao priliku za dodatnu zaradu, lako možete završiti u ponašanju koje više sliči klađenju nego štednji u boljem novcu.",
        ],
      },
      {
        heading: "Hobi, posao ili distrakcija?",
        body: [
          "Postoje tri poštena načina da pogledate vlastito ponašanje. Prvi je hobi. Radim ovo jer me zanima. Znam koliko vremena na to trošim. Ne ugrožavam posao, obitelj, proračun i mir. Ne pretvaram hobi u izgovor za lošije odluke.",
          "Drugi je posao. Želim od toga napraviti karijeru. Imam plan učenja. Gradim vještinu. Znam kome ću stvarati vrijednost. Spreman sam uložiti godine rada, a ne samo nekoliko vikenda i nekoliko glasnih mišljenja.",
          "Treći je distrakcija. Stalno otvaram grafove. Mijenjam alate bez jasnog razloga. Ulazim u rasprave koje mi ne pomažu. Učim puno sitnica, ali ne uređujem vlastiti novac. Radim slabije u području u kojem stvarno zarađujem. Bitcoin mi više ne donosi jasnoću, nego nemir.",
          "Korisno je pitati se tri pitanja. Radim li ovo jer me stvarno zanima? Radim li ovo jer želim od toga napraviti karijeru? Ili radim ovo jer bježim od teškog, dosadnog ili neuređenog dijela vlastitog života?",
          "Odgovor ne mora biti dramatičan. Ponekad je dovoljno priznati da je nešto bilo korisno prije šest mjeseci, ali danas više nije najbolja uporaba vremena.",
        ],
      },
      {
        heading: "Ako želite u Bitcoin profesionalno, idite namjerno",
        body: [
          "Ako vas Bitcoin snažno zanima, možda to nije problem. Možda je to znak da želite promijeniti karijerni smjer. Ali tada se to ne radi polovično, uz stalno praćenje utjecajnika, kratkoročne oklade i osjećaj da se uvijek nešto mora kupiti ili prodati.",
          "Profesionalni put može značiti razvoj Bitcoin alata, sigurnost i skrbništvo, edukaciju, istraživanje, pravni, porezni ili računovodstveni rad povezan s Bitcoinom, rad u tvrtki usmjerenoj samo na Bitcoin, pisanje, prijevod, javnu edukaciju ili poslovne modele koji pomažu ljudima koristiti Bitcoin sigurnije i jasnije.",
          "Nijedan od tih smjerova nije lak. Potreban je dugoročan rad. Potrebna je vještina. Potreban je stvaran doprinos. Potrebno je znati kome stvarate vrijednost. Interes nije isto što i sposobnost stvaranja prihoda.",
          "Ako želite da Bitcoin bude vaš posao, tretirajte ga kao posao. Ako ne želite, nemojte mu dopustiti da potajno pojede posao koji već imate.",
        ],
      },
      {
        heading: "Vrijeme ima oportunitetni trošak",
        body: [
          "Svaki sat ima vrijednost. Sat proveden u grafovima, prepirkama, tehničkim sitnicama ili burzama nije neutralan. Taj sat je mogao otići u bolji rad, bolju uslugu, bolji posao, više prihoda, bolji proračun, sigurniji sustav ili mirniji odnos s obitelji.",
          "Nije pitanje smijete li nešto proučavati. Naravno da smijete. Pitanje je je li to sada najbolja uporaba vašeg vremena. Ako imate komparativnu prednost u svojem poslu, možda je najbolji Bitcoin potez upravo bolje raditi taj posao i višak čuvati u boljem novcu.",
          "Oportunitetni trošak nije samo financijski. Vrijeme izgubljeno u distrakciji moglo je postati znanje, vještina, prihod, mir ili više zarađenog Bitcoina. Moglo je postati razgovor s obitelji, jasniji dokument, riješen dug ili bolja usluga klijentu.",
          "Bitcoin treba pomoći da vrijeme ponovno vidite jasnije. Ako vam ga stalno krade, treba promijeniti odnos prema njemu.",
        ],
      },
      {
        heading: "Većina ljudi treba bolji novac, ne novi hobi",
        body: [
          "Za većinu ljudi najbolji Bitcoin koraci nisu stalno pratiti cijenu, mijenjati novčanike bez potrebe, testirati svaki alat, slušati svakog internetskog komentatora, trgovati, koristiti polugu, ulaziti u alternativne digitalne imovine ili se svađati oko tehničkih detalja.",
          "Bolji koraci su često običniji. Bolje raditi svoj posao. Povećati prihode. Smanjiti troškove. Ukloniti dug. Voditi proračun. Štedjeti u boljem novcu. Urediti sigurnost. Objasniti obitelji osnovne stvari. Prestati trošiti pozornost na stvari koje ne mijenjaju stvarni život.",
          "To može zvučati manje uzbudljivo, ali je često zrelije. Bitcoin ne treba biti novi identitet koji proguta sve ostalo. Treba biti novac koji pomaže da vrijednost koju stvarate ne nestaje kroz loš novac, loše navike i nejasne odluke.",
          "Bitcoin nije bijeg od rada. Bitcoin je bolji novac za vrijednost koju stvarate radom.",
        ],
      },
      {
        heading: "Zaključak",
        body: [
          "Bitcoin treba povećati jasnoću, ne rastresenost. Treba pomoći da bolje vidite novac, vrijeme, rizik, rad, dug, obitelj i buduće odluke. Ako proizvodi samo više provjeravanja, više rasprava i više nervoze, vrijeme je za povratak na osnovno pitanje.",
          "Je li Bitcoin u vašem životu novac s jasnom ulogom ili distrakcija koja odgađa stvarne odluke?",
          "Osobni Bitcoin standard ne traži da znate sve. Traži da znate dovoljno za sljedeći dobar korak. Za mnoge ljude taj korak nije još jedan alat, još jedan graf ili još jedna rasprava. Taj korak je red.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaTitle: "Želite provjeriti služi li vam Bitcoin kao novac?",
    finalCtaPrompt:
      "Ako niste sigurni je li Bitcoin u vašem životu jasan sustav ili nova distrakcija, uvodni razgovor može pomoći razdvojiti hobi, karijerni put i osobni Bitcoin standard.",
  },
  {
    slug: "bitcoin-nije-kripto-portfelj",
    title: "Bitcoin nije kripto portfelj",
    seoTitle: "Bitcoin nije kripto portfelj",
    metaDescription:
      "Bitcoin u ovom okviru tretiramo kao novac. Sve ostalo, ako se uopće razmatra, treba promatrati kao rizičnu investiciju koja mora ostvariti pozitivan povrat u Bitcoinu.",
    excerpt:
      "Bitcoin nije jedna stavka u kripto portfelju. U osobnom Bitcoin standardu Bitcoin je novac, a sve ostalo je eventualno rizična investicija s vlastitim troškom, rizikom i mjerilom povrata u Bitcoinu.",
    category: "Bitcoin kao novac",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 59,
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-13",
    practicalQuestion:
      "Mjerite li druge kriptovalute u eurima ili u Bitcoinu koji ste mogli zadržati?",
    relatedSlugs: [
      "bitcoin-kao-novac",
      "niste-zakasnili-u-bitcoin",
      "novac-kapital-potrosnja",
      "bitcoin-u-neto-imovini",
      "pravilo-trecina",
      "dca-nije-dovoljan",
    ],
    visual: {
      type: "split",
      title: "Novac i investicija",
      leftLabel: "Bitcoin kao novac",
      leftItems: [
        "novčana zaliha",
        "mjerilo povrata",
        "dugoročna teza o novcu",
        "pravila koja se teško mijenjaju",
      ],
      rightLabel: "Kriptovalute kao investicija",
      rightItems: [
        "veći specifični rizik",
        "potreba za tezom ulaska i izlaska",
        "oportunitetni trošak proučavanja",
        "povrat se mora mjeriti u Bitcoinu",
      ],
      caption:
        "Ako Bitcoin tretirate kao novac, tada se i sve druge investicije moraju mjeriti u Bitcoinu.",
    },
    sections: [
      {
        heading: "Najčešće pitanje: što je s ostalim kriptovalutama?",
        body: [
          "Jedno od čestih pitanja u Bitcoin razgovorima glasi: “Razumijem Bitcoin, ali što je s ostalim kriptovalutama?” Pitanje je razumljivo. Netko čuje za Ethereum, Solanu, stablecoine, decentralizirane financije, nove mreže, nove tokene i projekte koji obećavaju brže transakcije, bolju korisničku jednostavnost ili veći rast.",
          "Onda se prirodno pojavi misao: možda ne bih trebao imati samo Bitcoin. Možda bih trebao imati kripto portfelj. Najčešći oblik te ideje zvuči ovako: većina u Bitcoinu, manji dio u ostalim kriptovalutama.",
          "Na prvi pogled to zvuči razumno. U klasičnom financijskom jeziku, to se može nazvati diverzifikacijom. Ali na Bitcoin standardu pitanje treba postaviti drukčije. Bitcoin u ovom okviru ne tretiramo kao jednu od kriptovaluta. Tretiramo ga kao novac.",
        ],
      },
      {
        heading: "Bitcoin kao novac, ostalo kao investicija",
        body: [
          "Ako Bitcoin tretirate kao novac, tada se mijenja način razmišljanja. Ne pitate samo: “Može li neka druga kriptovaluta narasti više u eurima?” Pitate: “Ako ulažem svoj Bitcoin u nešto drugo, mogu li ostvariti pozitivan povrat u Bitcoinu nakon rizika, vremena i pogrešaka?”",
          "To je puno stroži kriterij. Ako ste na državnom novcu, lako je mjeriti sve u eurima ili dolarima. Ali ako Bitcoin postaje vaš primarni novac, tada se i investicije moraju mjeriti u Bitcoinu. Nije dovoljno da neka imovina naraste u eurima. Mora nadmašiti Bitcoin.",
          "To vrijedi za nekretnine, dionice, posao, zlato, obveznice, fondove, privatne investicije i kriptovalute. Ako uložite Bitcoin u nešto drugo, pitanje je jednostavno: vraća li vam se više Bitcoina nego što ste uložili, uz rizik koji ste preuzeli?",
        ],
        link: {
          before: "Za temelj te razlike pročitajte i vodič ",
          label: "Bitcoin je novac",
          href: "/vodici/bitcoin-kao-novac/",
          after: ".",
        },
      },
      {
        heading: "Zašto “može narasti više” nije dovoljna teza",
        body: [
          "Naravno da neka kriptovaluta može u nekom razdoblju narasti više od Bitcoina. Manji projekti počinju od manje tržišne vrijednosti. Ako privuku dovoljno pažnje, likvidnosti i narativa, mogu u kratkom vremenu snažno porasti. To nije sporno.",
          "Ali to nije dovoljna investicijska teza. Pitanja su: kada ulazite, kada izlazite, koliko držite, u kojem omjeru, što mora biti istina da biste ostali, što mora biti istina da biste prodali i što radite ako projekt naraste u eurima, ali padne u odnosu na Bitcoin?",
          "Najvažnije pitanje često je još jednostavnije: koliko vremena morate potrošiti da biste uopće znali što radite? Ulaganje u kriptovalute nije samo pitanje novca. To je pitanje vremena, pažnje, znanja, praćenja tržišta, razumijevanja rizika, procjene timova, tehnologije, strukture tokena, likvidnosti, regulatornog rizika i izlazne strategije.",
          "Za veliku većinu ljudi to nije usputna diverzifikacija. To je druga djelatnost.",
        ],
      },
      {
        heading: "Bitcoin ima drukčiju ulogu",
        body: [
          "Bitcoin nije samo projekt s tokenom. Bitcoin je monetarna mreža koja pokušava postati bolji novac. Zato se Bitcoin ne može razumjeti samo kao “najveća kriptovaluta”. Njegova teza je drukčija.",
          "Bitcoin ima strogo ograničenu ponudu, proof of work, globalnu mrežu čvorova i monetarni fokus koji se ne mijenja svakim novim tržišnim narativom. Pravila Bitcoina nalikuju pravilima igre koju ljudi sve šire prihvaćaju upravo zato što se pravila ne mijenjaju lako.",
          "Dobra usporedba je šah. Šah ima pravila. Ako ih promijenite, možda ste izmislili novu igru, ali više ne igrate isti šah. Snaga šaha nije u tome što se pravila stalno prilagođavaju novim željama igrača, nego u tome što ljudi diljem svijeta znaju koju igru igraju.",
          "Bitcoinova snaga dolazi iz slične jasnoće. Znamo pravila igre. Znamo da je ukupna ponuda ograničena. Znamo kako se nove jedinice stvaraju. Znamo tko provjerava pravila. Znamo da je promjena temeljnih pravila iznimno teška.",
          "Kod mnogih drugih kriptovaluta upravo je promjenjivost dio privlačnosti. Mogu se nadograđivati, mijenjati, prilagođavati i eksperimentirati. To može stvoriti inovacije, ali stvara i drukčiju vrstu rizika. Zato ih ne treba stavljati u istu mentalnu kategoriju kao Bitcoin.",
        ],
      },
      {
        heading: "Diverzifikacija ili razvodnjavanje?",
        body: [
          "Kada netko kaže da ima “80% Bitcoin i 20% kriptovalute”, to može zvučati razumno. Ali treba pitati: što tih 20% stvarno radi? Smanjuje li rizik ili uvodi nove rizike koje osoba ne razumije dovoljno?",
          "Ako je Bitcoin novac, a ostale kriptovalute rizične investicije, tada taj omjer nije samo diverzifikacija. To je odluka da dio novca izložite investicijama koje moraju nadmašiti Bitcoin.",
          "To može imati smisla za osobu koja se profesionalno bavi tim tržištem, ima jasnu tezu, razumije rizike, zna što prati i zna kada izlazi. Ali za osobu koja ima posao, obitelj, firmu, dug, nekretninu, sigurnosna pitanja i ograničeno vrijeme, to može biti skupi zaobilazni put.",
          "Ponekad ljudi ne diverzificiraju zato što su sigurni u bolju tezu, nego zato što se boje da će propustiti nešto drugo. To nije strategija. To je nemir.",
        ],
      },
      {
        heading: "Mjerite povrat u Bitcoinu",
        body: [
          "Ako želite razmišljati ozbiljno, mjerite sve u Bitcoinu. Neka kriptovaluta može rasti u eurima, a padati u Bitcoinu. U tom slučaju, na Bitcoin standardu niste ostvarili pozitivan povrat. Samo ste preuzeli dodatni rizik i završili s manje Bitcoina nego što biste imali da niste ništa radili.",
          "To je strogo mjerilo, ali je pošteno. Ako Bitcoin tretirate kao najbolji novac koji imate, tada svaka investicija mora odgovoriti na pitanje: zašto ne bih samo držao Bitcoin?",
          "To ne znači da nikada ne smijete ulagati. Novac se može trošiti, štedjeti, davati i ulagati. Ali ulaganje mora imati tezu, očekivani povrat, rizik i vremenski okvir. I mora biti mjereno u novcu koji vam je najvažniji.",
          "Ako je taj novac Bitcoin, tada je mjerilo Bitcoin.",
        ],
        link: {
          before: "Za širi pogled na novac, kapital i potrošnju pročitajte ",
          label: "Novac, kapital i potrošnja",
          href: "/vodici/novac-kapital-potrosnja/",
          after: ".",
        },
      },
      {
        heading: "Za većinu ljudi bolji je fokus",
        body: [
          "Postoji jednostavna misao koju mnogi Bitcoineri ponavljaju: usavršavaj svoj posao i štedi u Bitcoinu. To nije pravilo za svakoga u svakoj situaciji, ali sadrži važnu intuiciju.",
          "Za većinu ljudi najveća tržišna prednost nije u tome da pokušaju pronaći sljedeću kriptovalutu koja će privremeno nadmašiti Bitcoin. Njihova prednost je u vlastitom poslu, zanimanju, firmi, vještini, mreži odnosa i sposobnosti stvaranja vrijednosti.",
          "Ako već imate područje u kojem imate znanje, ugled, iskustvo i sposobnost stvaranja prihoda, često je mudrije dodatno razvijati to područje nego trošiti vrijeme na tržište u kojem nemate prednost.",
          "Drugim riječima: možda je najbolja investicija upravo ono u čemu već imate stvarnu prednost. A višak koji nastaje iz tog rada možete štedjeti u Bitcoinu.",
        ],
      },
      {
        heading: "Kada ulaganje u kriptovalute može imati smisla?",
        body: [
          "Ulaganje u kriptovalute može imati smisla za vrlo mali broj ljudi. Ako netko želi profesionalno proučavati kripto tržišta, raditi u toj industriji, razumjeti projekte, pratiti likvidnost, tehnologiju, timove, regulatorni rizik, ulaze i izlaze, to je zaseban posao.",
          "Tada govorimo o investicijskoj djelatnosti, ne o usputnoj kupnji nekoliko tokena. To je slično kao da netko želi ulagati u industriju nafte, biotehnologiju, rudarske kompanije ili rizični kapital. Može se. Ali za to treba specifično znanje, vrijeme i prednost.",
          "Ako tu prednost nemate, ne morate se sramiti što ne sudjelujete. Dovoljno je urediti Bitcoin.",
        ],
      },
      {
        heading: "Što savjetovanje ovdje može i ne može napraviti",
        body: [
          "Ovo je Bitcoin savjetovanje. Ne savjetujem ulaganje u druge kriptovalute. Ne govorim koji token kupiti, kada ući, kada izaći ni koliko držati.",
          "Ono što mogu napraviti jest pomoći vam postaviti okvir: što znači tretirati Bitcoin kao novac, kako mjeriti investicije u Bitcoinu, kako razumjeti oportunitetni trošak ulaska u druga tržišta, kako razlikovati novac od rizične investicije i kako prvo urediti proračun, dug, neto imovinu, sigurnost i obitelj.",
          "Nakon toga, što ćete napraviti sa svojim novcem ostaje vaša odluka. Ali odluka će biti jasnija ako prvo znate što je Bitcoin u vašem sustavu.",
        ],
      },
      {
        heading: "Zaključak",
        body: [
          "Bitcoin nije kripto portfelj. Bitcoin je, u ovom okviru, novac. Sve ostalo je eventualno investicija, s vlastitim rizicima, troškovima, neizvjesnošću i potrebom za posebnom tezom.",
          "Možda će neki projekti rasti brže od Bitcoina u određenim razdobljima. Možda će neki stvoriti stvarnu vrijednost. Možda će neki nestati. Ali to ne mijenja osnovno pitanje: imate li dovoljno znanja, vremena i prednosti da u tome ostvarite pozitivan povrat u Bitcoinu?",
          "Ako nemate, nije nužno da nešto propuštate. Možda upravo izbjegavate skupi zaobilazni put.",
          "Za većinu ljudi prvi korak nije kripto portfelj. Prvi korak je razumjeti Bitcoin kao novac, urediti vlastiti proračun, izaći iz duga, zaštititi pristup i znati što Bitcoin treba raditi u njihovoj neto imovini.",
          "Ako imate pitanje o tome gdje Bitcoin završava, a gdje počinje rizična investicija, to je dobro pitanje za uvodni razgovor.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako niste sigurni gdje Bitcoin završava, a gdje počinje rizična investicija, to je dobro pitanje za uvodni razgovor.",
  },
  {
    slug: "bitcoin-kao-novac",
    title: "Bitcoin je novac",
    metaDescription:
      "Vodič o tome zašto okvir Bitcoin kao novac promatra Bitcoin kao novac, a ne kao investiciju sa strane.",
    excerpt:
      "Bitcoin nije samo imovina koju držite. U osobnom Bitcoin standardu Bitcoin ima ulogu novca.",
    category: "Bitcoin kao novac",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 60,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Je li vaš Bitcoin novac u sustavu ili imovina koja stoji sa strane?",
    relatedSlugs: [
      "uskladivanje-kupovne-moci-bitcoina",
      "cijena-kao-mjera-vremena",
      "novac-kapital-potrosnja",
    ],
    visual: {
      type: "thirds",
      title: "Gdje pripada Bitcoin?",
      columns: [
        {
          label: "novac",
          description: "Bitcoin kao novčana zaliha",
        },
        {
          label: "potrošnja",
          description: "dobra za izravnu uporabu",
        },
        {
          label: "proizvodna imovina",
          description: "dobra koja stvaraju vrijednost",
        },
      ],
      caption: "U ovom okviru Bitcoin ima ulogu novca.",
    },
    sections: [
      {
        heading: "Što znači da je Bitcoin novac",
        body: [
          "Novac nije samo ono čime danas plaćate kavu. Novac je dobro koje držite radi buduće razmjene. Njegova bitna vrijednost je kupovna moć kroz vrijeme. U tom smislu okvir Bitcoin kao novac promatra Bitcoin kao novac.",
          "To mijenja pitanje. Ne pitate samo koliko vrijedi danas. Pitate što vam omogućuje sutra. Koliko budućih odluka može pokriti? Koji dio života može zaštititi od impulsa, duga i loše potrošnje?",
        ],
      },
      {
        heading: "Kupovna moć važnija je od broja jedinica",
        body: [
          "Broj jedinica je važan, ali nije dovoljan. Ista količina Bitcoina može imati različitu kupovnu moć u različitim trenucima. Ako gledate samo broj, možete propustiti stvarnu promjenu.",
          "Zato osobni Bitcoin standard povezuje Bitcoin s proračunom nulte osnove. Pita koliko mjeseci troškova pokriva, koja buduća plaćanja može izdržati i što se mijenja kada kupovna moć raste ili pada. Novac se razumije kroz život, ne samo kroz saldo.",
        ],
      },
      {
        heading: "Zašto Bitcoin nije proizvodna imovina",
        body: [
          "Proizvodna imovina povećava produktivnost. To može biti alat, znanje, posao, oprema, zemljište, sustav ili odnos koji stvara vrijednost. Bitcoin u ovom okviru nema tu ulogu. Bitcoin je novac.",
          "Ako Bitcoin nazovete proizvodnom imovinom, miješate pojmove. Tada očekujete da radi posao koji mu ne pripada. Bitcoin čuva kupovnu moć i omogućuje buduću razmjenu. Proizvodna imovina stvara vrijednost. Obje stvari mogu biti važne, ali nisu iste.",
        ],
      },
      {
        heading: "Kada Bitcoin postaje dio proračuna nulte osnove",
        body: [
          "Bitcoin postaje dio proračuna nulte osnove kada dobije namjenu. Koji dio ne dirate? Koji dio promatrate kao novčanu zalihu? Koji dio smije služiti budućem plaćanju? Koji uvjet mora postojati da biste ga potrošili?",
          "Bez tih pravila, Bitcoin stoji sa strane. Može biti važan, ali nije povezan s ostatkom života. Kada pravila postoje, Bitcoin ulazi u osobni sustav. Tada nije samo imovina koju gledate. Tada je novac s ulogom.",
        ],
      },
      {
        heading: "Pravilo za vlastiti sustav",
        body: [
          "Prvo pravilo može glasiti: Bitcoin promatram kao novac, a ne kao kratkoročnu okladu. Zato ga povezujem s proračunom nulte osnove, dugom, budućim plaćanjima, sigurnošću i obitelji.",
          "To pravilo ne govori koliko Bitcoina trebate imati. Govori što Bitcoin jest u vašem sustavu. A bez toga ni veća količina ne stvara osobni Bitcoin standard.",
          "Ako ne možete objasniti sebi ili partneru je li Bitcoin za vas novac, štednja, imovina ili nešto četvrto, to je jedno od najvažnijih pitanja za razgovor.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako ne možete objasniti sebi ili partneru je li Bitcoin za vas novac, štednja, imovina ili nešto četvrto, to je jedno od najvažnijih pitanja za razgovor.",
  },
  {
    slug: "pozitivni-neto-priljev",
    title: "Novac koji ostaje",
    metaDescription:
      "Zašto Bitcoin standard počinje time da vaš mjesec može stajati na vlastitim nogama: prihodi, troškovi, dug i novac koji ostaje.",
    excerpt:
      "Bitcoin standard počinje kada mjesec može stajati na vlastitim nogama.",
    category: "Bitcoin kao novac",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 70,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Ostaje li vam redovito novac nakon troškova, bez oslanjanja na rast cijene Bitcoina?",
    relatedSlugs: [
      "svaki-euro-ima-namjenu",
      "bitcoin-kao-novac",
      "uskladivanje-kupovne-moci-bitcoina",
    ],
    visual: {
      type: "equation",
      title: "Temelj rasta",
      parts: ["novac ulazi", "novac izlazi"],
      result: "novac koji ostaje",
      caption:
        "Bitcoin standard počinje kada mjesec može stajati na vlastitim nogama.",
    },
    sections: [
      {
        heading: "Novac koji ostaje",
        body: [
          "Novac ulazi kroz plaću, posao, klijente, prodaju ili druge izvore. Novac izlazi kroz troškove, račune, dug, obiteljske potrebe i odluke. Ako redovito ulazi više novca nego što izlazi, sustav diše. Ako redovito izlazi više nego što ulazi, sustav se oslanja na dug, prodaju imovine ili nadu.",
          "Gledajte prosjek, ne samo jedan mjesec. Dobar početak je usporediti novac koji ulazi i novac koji izlazi kroz zadnja tri mjeseca.",
          "Osobni Bitcoin standard traži da novac ostaje zato što Bitcoin kao novac treba miran temelj. Ako proračun nulte osnove stalno curi, Bitcoin postaje prva stvar koju morate dirati kada se pojavi pritisak.",
        ],
      },
      {
        heading: "Zašto mjesec koji se troši nije standard",
        body: [
          "Ako redovito izlazi više novca nego što ulazi, sustav se troši. Možda to nije odmah vidljivo. Možda ga skriva dug, štednja ili rast cijene Bitcoina. Ali ako troškovi stalno pobjeđuju prihode, osobni Bitcoin standard nije stabilan.",
          "To nije moralna osuda, nego tehnička stvarnost osobnog novca. Ne možete dugoročno živjeti kao da budući novac uvijek može spasiti sadašnji nered. Dugoročni standard traži da sadašnji mjesec nosi sam sebe.",
        ],
      },
      {
        heading: "Pet načina da više novca ostane u sustavu",
        body: [
          "Prvi način je smanjiti koliko novca izlazi. Drugi je povećati koliko novca ulazi. Treći je izaći iz duga. Četvrti je smanjiti potrošnju koja ne stvara vrijednost. Peti je usmjeriti vrijeme, znanje i proizvodnu imovinu prema većoj sposobnosti stvaranja vrijednosti.",
          "Nijedan od tih koraka nije spektakularan. Ali svi jačaju Bitcoin standard. Više novca koji ostaje znači da Bitcoin ne mora služiti kao hitna zakrpa. Može služiti kao novac koji čuva kupovnu moć kroz vrijeme.",
        ],
      },
      {
        heading: "Kako Bitcoin mijenja novčanu zalihu",
        body: [
          "Kada u sustavu ostaje novac, dio viška može postati novčana zaliha u Bitcoinu. Ne mora sav višak ići u Bitcoin, ali Bitcoin može dobiti jasnu ulogu novca u sustavu.",
          "Ako novčana zaliha raste samo zato što cijena raste, sustav može biti krhak. Ako raste zato što novac redovito ostaje i zato što svaki euro ima namjenu, temelj je jači. Tada rast nije samo tržišni događaj, nego posljedica reda.",
        ],
      },
      {
        heading: "Prvo pravilo koje treba zapisati",
        body: [
          "Prvo pravilo može glasiti: ne povećavam ulogu Bitcoina u svojem sustavu ako mi redovito ne ostaje novac nakon troškova, bez oslanjanja na rast cijene. Prvo popravljam prihode, troškove i stanje duga.",
          "To pravilo možda zvuči jednostavno. Upravo zato je korisno. Bitcoin standard počinje kada mjesec može stajati na vlastitim nogama.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako ne znate raste li vaš sustav zbog reda ili samo zbog tržišta, uvodni razgovor može pomoći da to stavimo u jasniju sliku.",
  },
  {
    slug: "uskladivanje-kupovne-moci-bitcoina",
    title: "Usklađivanje kupovne moći: što raditi kad Bitcoin raste ili pada?",
    seoTitle: "Kad Bitcoin raste ili pada",
    metaDescription:
      "Vodič o tome kako uskladiti osobni proračun nulte osnove s promjenama kupovne moći Bitcoina, bez pogađanja cijene i impulzivnih odluka.",
    excerpt:
      "Kada se kupovna moć Bitcoina mijenja, ne pogađate tržište. Usklađujete osobni proračun nulte osnove.",
    category: "Vrijeme i volatilnost",
    difficulty: "Napredno",
    freshness: "stabilno",
    order: 75,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Kada bi se kupovna moć vašeg Bitcoina snažno promijenila, biste li znali koje kategorije proračuna nulte osnove treba provjeriti?",
    relatedSlugs: [
      "cijena-kao-mjera-vremena",
      "bitcoin-kao-novac",
      "pozitivni-neto-priljev",
    ],
    visual: {
      type: "trend",
      title: "Kupovna moć mijenja proračun nulte osnove",
      states: [
        {
          label: "raste",
          description: "rasporediti višak",
        },
        {
          label: "miruje",
          description: "držati pravila",
        },
        {
          label: "pada",
          description: "smanjiti troškove",
        },
      ],
      caption: "Ne pogađate tržište. Usklađujete proračun nulte osnove.",
    },
    sections: [
      {
        heading: "Cijena nije naredba",
        body: [
          "Kada Bitcoin raste, lako se pojavi osjećaj da morate nešto napraviti. Kada pada, isti osjećaj dolazi iz straha. U oba slučaja cijena se ponaša kao naredba. Osobni Bitcoin standard odbija taj redoslijed.",
          "Cijena može biti povod za provjeru, ali ne smije biti gospodar odluke. Prvo gledate osobni proračun nulte osnove, dug, buduća plaćanja, novčanu zalihu i pravila. Tek nakon toga odlučujete mijenja li se išta.",
        ],
      },
      {
        heading: "Kupovna moć je stvarni podatak",
        body: [
          "Ne zanima nas samo koliko Bitcoin vrijedi u eurima. Zanima nas što njegova kupovna moć može pokriti. Koliko mjeseci troškova? Koje buduće troškove? Koji dio sigurnosne zalihe? Koji dio neto imovine?",
          "Kada gledate kupovnu moć, broj postaje povezan sa životom. Rast i pad više nisu samo vijesti. Postaju promjene koje možete usporediti s proračunom nulte osnove. To smanjuje paniku i smanjuje pohlepu.",
        ],
      },
      {
        heading: "Kada kupovna moć pada",
        body: [
          "Kada kupovna moć pada, prvo se gledaju troškovi. Koji troškovi stvaraju pritisak? Postoji li dug? Je li sigurnosna zaliha dovoljna? Koje buduće plaćanje dolazi brzo?",
          "Pad ne znači automatski prodaju. Možda ne treba napraviti ništa. Ali ako proračun nulte osnove ne može izdržati pad, problem nije samo cijena. Problem je sustav koji nema dovoljno prostora.",
        ],
      },
      {
        heading: "Ako kupovna moć pada, provjerite",
        body: [
          "Pad kupovne moći nije zapovijed za prodaju, nego poziv da mirno provjerite osnovne dijelove sustava.",
        ],
        items: [
          "troškove",
          "dug",
          "sigurnosnu zalihu",
          "buduće troškove",
          "treba li smanjiti potrošnju",
        ],
      },
      {
        heading: "Kada kupovna moć raste",
        body: [
          "Rast kupovne moći može biti jednako opasan kao pad. Može stvoriti osjećaj da je sve dopušteno: veća potrošnja, slabiji oprez, novi dug ili odluke bez pravila.",
          "U osobnom Bitcoin standardu rast dobiva namjenu. Možda se bolje pokrivaju buduća plaćanja. Možda se jača novčana zaliha. Možda se preispituje neto imovina. Ali rast ne smije automatski postati nered.",
        ],
      },
      {
        heading: "Ako kupovna moć raste, provjerite",
        body: [
          "Rast kupovne moći također traži pravila. Cilj nije euforija, nego raspored koji čuva mir.",
        ],
        items: [
          "buduća plaćanja",
          "davanje",
          "neto imovinu",
          "potrošnu i proizvodnu imovinu",
          "sigurnost",
        ],
      },
      {
        heading: "Pravilo za provjeru",
        body: [
          "Dobro pravilo može glasiti: kada se kupovna moć Bitcoina znatno promijeni, prvo pregledavam proračun nulte osnove, dug, buduća plaćanja i novčanu zalihu. Ne kupujem ni ne prodajem samo zato što me cijena pomaknula.",
          "Takvo pravilo vraća odluku vama. Bitcoin ostaje novac u sustavu, a ne izvor stalne hitnosti. Usklađivanje kupovne moći nije pogađanje, nego održavanje reda.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako ne znate što biste napravili nakon velikog pada ili rasta kupovne moći, to vrijedi razjasniti u uvodnom razgovoru.",
  },
  {
    slug: "cijena-kao-mjera-vremena",
    title: "Cijena kao mjera vremena",
    metaDescription:
      "Vodič o tome kako dugoročni potencijski trend Bitcoina pomaže razmišljati o vremenu, kupovnoj moći i osobnom proračunu nulte osnove.",
    excerpt:
      "Ne pokušavamo pogoditi kratkoročnu cijenu. Gledamo odnos cijene, vremena i proračuna nulte osnove.",
    category: "Vrijeme i volatilnost",
    difficulty: "Napredno",
    freshness: "stabilno",
    order: 77,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-07",
    practicalQuestion:
      "Ako je kupovna moć Bitcoina šest mjeseci ispred ili ispod dugoročnog trenda, što se mijenja u vašem proračunu nulte osnove?",
    relatedSlugs: [
      "uskladivanje-kupovne-moci-bitcoina",
      "bitcoin-kao-novac",
      "pozitivni-neto-priljev",
    ],
    visual: {
      type: "trend",
      title: "Cijena kao vrijeme",
      states: [
        {
          label: "iznad trenda",
          description: "riješiti buduća plaćanja",
        },
        {
          label: "blizu trenda",
          description: "držati pravila",
        },
        {
          label: "ispod trenda",
          description: "smanjiti potrošnju",
        },
      ],
      caption: "Dugoročni trend je pomoćni signal, ne prognoza cijene.",
    },
    sections: [
      {
        heading: "Ne pogađamo kratkoročno kretanje",
        body: [
          "Ne koristimo cijenu za prognozu. Koristimo je kao signal za provjeru proračuna.",
          "Cilj osobnog Bitcoin standarda nije pogoditi sutrašnju, mjesečnu ili godišnju cijenu. To bi odluku opet predalo tržištu. Danas biste se osjećali pametno, sutra prestrašeno, a pravila bi se mijenjala prema svakoj promjeni kupovne moći.",
          "Pitanje je jednostavnije: što trenutna kupovna moć znači za proračun nulte osnove? Može li pokriti poznata buduća plaćanja? Mijenja li odnos između novčane zalihe, duga i stvarnog viška? Treba li nešto ranije riješiti ili treba samo držati pravila?",
        ],
      },
      {
        heading: "Dugoročni trend nije jamstvo",
        body: [
          "Dugoročni potencijski obrazac (Bitcoin power law) nije obećanje cijene ni plan za kratkoročnu kupnju ili prodaju. Koristan je kao pomoćni način razmišljanja o odnosu cijene i vremena, posebno kada želite vidjeti je li kupovna moć ispred, blizu ili ispod dugoročnog ritma.",
          "Takav pogled može biti koristan samo ako ostane na svome mjestu. Ne smije zamijeniti osobni proračun nulte osnove. Ne smije potisnuti dug. Ne smije stvoriti osjećaj sigurnosti koji ne postoji. Dugoročni trend je signal za provjeru, ne zapovijed.",
        ],
      },
      {
        heading: "Iznad trenda: buduća plaćanja",
        body: [
          "Ako je kupovna moć ispred očekivanog ritma, ne znači da treba slaviti bez pravila. Znači da možete mirno pogledati buduća plaćanja. Postoji li trošak koji će ionako doći? Postoji li nužna kupnja koju treba riješiti? Postoji li pritisak koji se može smanjiti ranije?",
          "U tom slučaju dio budućih plaćanja možda se može riješiti ranije: unaprijed plaćeni troškovi, nužne kupnje ili smanjenje budućeg pritiska. Ali odluka i dalje mora proći kroz proračun nulte osnove. Rast kupovne moći ne smije postati dopuštenje za nered.",
        ],
      },
      {
        heading: "Ispod trenda: manja potrošnja i veći prihodi",
        body: [
          "Ako je kupovna moć ispod dugoročnog trenda, odgovor nije panika. Odgovor je povratak osnovama. Smanjuju se potrošni troškovi, jačaju prihodi i Bitcoin se akumulira iz stvarnog viška, bez oslanjanja na dug i bez žurbe.",
          "Taj trenutak često pokazuje koliko je sustav stvarno čvrst. Ako je proračun nulte osnove jasan, znate što možete nastaviti. Ako nije jasan, prvo ga uređujete. Ako prihodi nisu dovoljni, radite na sposobnosti stvaranja vrijednosti. Cijena tada ne vodi život, nego otkriva gdje treba više reda.",
        ],
      },
      {
        heading: "Tržišni sentiment ne smije voditi odluke",
        body: [
          "Kada prevlada pohlepa, ljudi kupuju više. Kada prevlada strah, staju. To je normalno ljudsko ponašanje, ali nije osobni Bitcoin standard. Tržišni sentiment može biti koristan podatak, ali ne smije biti upravljač.",
          "Zato pravila moraju biti jača od sentimenta. Ako ste blizu dugoročnog ritma, ne mijenjate sustav samo zato što se raspoloženje promijenilo. Ako ste iznad ili ispod, prvo gledate proračun nulte osnove, dug, buduća plaćanja i stvarni višak. Tek tada odlučujete.",
        ],
      },
      {
        heading: "Proračun nulte osnove ostaje glavni alat",
        body: [
          "Dugoročni trend je pomoćni signal. Osobni proračun nulte osnove ostaje glavni alat. On govori koji novac već ima namjenu, koji dug traži buduća plaćanja, koliko je stvarni višak i koji dio Bitcoina ima ulogu novčane zalihe.",
          "Zato cijena može biti mjera vremena, ali ne i zamjena za red. Ako je kupovna moć ispred, možda nešto rješavate ranije. Ako je ispod, jačate prihode i smanjujete troškove. Ako je blizu, držite pravila. U sva tri slučaja proračun nulte osnove odlučuje prvi.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako cijena previše upravlja vašim odlukama, razgovor može pomoći da je pretvorite u signal za provjeru, ne zapovijed.",
  },
  {
    slug: "saylor-bitcoin-ciklus-ponuda-potraznja",
    title: "Bitcoin više ne pokreće samo prepolovljenje rudarske nagrade",
    seoTitle: "Saylor: ponuda, potražnja i Bitcoin ciklus",
    metaDescription:
      "Saylorov razgovor kao okvir za razumijevanje zašto stari četverogodišnji obrazac nije dovoljan kada kapitalni tokovi, banke, burzovni fondovi i kreditni instrumenti postaju važniji.",
    excerpt:
      "Ovaj vodič ne služi pogađanju cijene. Služi tome da razumijete zašto se tržište Bitcoina mijenja i zašto osobna pravila za proračun, dug, neto imovinu, kratke obveze i sigurnost postaju još važnija.",
    category: "Vrijeme i volatilnost",
    difficulty: "Napredno",
    freshness: "često se mijenja",
    theme: "time",
    safetyNote:
      "Ovaj vodič nije investicijski, porezni ni pravni savjet. Ne preporučuje kupnju ili prodaju Bitcoina, dionica, burzovnih fondova ili drugih financijskih instrumenata. Svrha mu je pomoći vam razumjeti razliku između Bitcoina kao novca, financijske izloženosti Bitcoinu i osobnih pravila za odluke kroz volatilnost.",
    order: 78,
    publishedAt: "2026-05-28",
    updatedAt: "2026-05-28",
    practicalQuestion:
      "Možete li jasno razdvojiti bitcoin koji kontrolirate, financijsku izloženost Bitcoinu i novac koji mora platiti kratke obveze?",
    relatedSlugs: [
      "uskladivanje-kupovne-moci-bitcoina",
      "cijena-kao-mjera-vremena",
      "bitcoin-etfovi-i-riznicke-kompanije",
      "bitcoin-kao-novac",
      "pravilo-trecina",
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
    ],
    visual: {
      type: "thirds",
      title: "Od ponude prema potražnji",
      columns: [
        {
          label: "Prepolovljenje rudarske nagrade",
          description: "Manje nove rudarske ponude kroz vrijeme.",
        },
        {
          label: "Kapitalni tokovi",
          description:
            "Burzovni fondovi, banke, kompanije i financijski instrumenti stvaraju nove izvore potražnje.",
        },
        {
          label: "Osobna pravila",
          description:
            "Proračun, dug, kratke obveze, neto imovina i sigurnost određuju što osoba treba napraviti.",
        },
      ],
      caption:
        "Vizual prikazuje promjenu naglaska, bez signala za kupnju ili prodaju.",
    },
    video: {
      youtubeId: "IZ9_xK1peIs",
      title: "Razgovor s Michaelom Saylorom o Bitcoinu, potražnji i ciklusima",
      sourceUrl: "https://www.youtube.com/watch?v=IZ9_xK1peIs",
      caption:
        "Razgovor je povod za ovaj vodič. Vodič ne prenosi investicijsku preporuku, nego iz razgovora izvlači praktičan okvir za osobni Bitcoin standard.",
    },
    sections: [
      {
        heading: "Zašto je ovaj razgovor važan",
        body: [
          "Saylorov razgovor ne treba čitati kao uputu za pogađanje kratkoročne cijene. Važnija je teza da Bitcoin ulazi u fazu u kojoj prepolovljenje rudarske nagrade više nije dovoljno objašnjenje tržišnih kretanja.",
          "U ranijim godinama nova rudarska ponuda bila je velik dio priče. Tržište je gledalo koliko novog bitcoina dolazi iz rudarenja i kako se ponuda mijenja nakon svakog prepolovljenja rudarske nagrade. Danas su sve važniji kapitalni tokovi, burzovni fondovi, banke, javne kompanije i kreditni instrumenti.",
          "Za osobni Bitcoin standard poruka nije: pogodite sljedeći pomak cijene. Poruka je: što je više kapitala oko Bitcoina, to vaša osobna pravila moraju biti jasnija.",
        ],
      },
      {
        heading: "Od rudarske ponude prema potražnji",
        body: [
          "U ranijoj fazi pitanje je često bilo: što se događa nakon prepolovljenja rudarske nagrade? To pitanje nije nestalo, ali više nije dovoljno. U zrelijoj fazi pitanje postaje: tko je novi kupac, kojim kanalom dolazi i koliko kapitala može ući?",
          "Novi kanali potražnje mogu biti burzovni fondovi, javne kompanije koje drže Bitcoin u riznici, banke koje nude skrbništvo ili kredit povezan s Bitcoinom, financijski instrumenti povezani s kompanijama koje drže Bitcoin te poduzetnici i obitelji koje Bitcoin uključuju u širu sliku neto imovine.",
          "Ti oblici nisu isto. Bitcoin u vlastitom posjedu nije isto što i burzovni fond. Burzovni fond nije isto što i dionica kompanije. Dionica kompanije nije isto što i kreditni instrument.",
        ],
        link: {
          before: "Za detaljniju podjelu tih oblika pročitajte vodič",
          label:
            "Bitcoin ETF-ovi i rizničke kompanije: gdje prestaje Bitcoin, a počinje kapital",
          href: "/vodici/bitcoin-etfovi-i-riznicke-kompanije/",
          after: "jer ta razlika čuva jasnoću u neto imovini.",
        },
      },
      {
        heading:
          "Stari četverogodišnji obrazac nije beskoristan, ali nije dovoljan",
        body: [
          "Povijest ciklusa može biti korisna. Ona pomaže razumjeti da se tržište kroz vrijeme često kretalo u valovima i da se raspoloženje ljudi mijenjalo brže od stvarne monetarne teze Bitcoina. Ali povijest ciklusa ne smije postati osobna strategija.",
          "Kalendar nije strategija. Povijest može pomoći u razumijevanju ritma tržišta, ali osobni proračun, dug, kratke obveze i sigurnost ne smiju ovisiti o tome da se prošlost ponovi.",
          "Ako se cijeli plan oslanja na to da će sljedeće razdoblje izgledati kao prethodno, osoba zapravo nema plan. Ima očekivanje. Osobni Bitcoin standard počinje kada se očekivanje pretvori u pravilo koje može izdržati različite ishode.",
        ],
        link: {
          before: "Za mirniji odnos između cijene i vremena pogledajte",
          label: "Cijena kao mjera vremena",
          href: "/vodici/cijena-kao-mjera-vremena/",
          after: "kao pomoćni okvir, ne kao zamjenu za proračun.",
        },
      },
      {
        heading: "Volatilnost nije nestala",
        body: [
          "Veća institucionalna potražnja može promijeniti oblik volatilnosti, ali je ne uklanja. Može povećati likvidnost, otvoriti nove kanale kupnje i promijeniti profil marginalnog kupca. Ipak, Bitcoin ostaje oskudna imovina kojom se trguje stalno i globalno.",
          "Poluga, kredit i stalna trgovina mogu pojačati pokrete u oba smjera. Kada cijena raste, novi kapital i optimizam mogu ubrzati kretanje. Kada cijena pada, prisilna prodaja, manjak povjerenja ili povlačenje kapitalnih tokova mogu pojačati pad.",
          "Saylor Bitcoin opisuje kao imovinu čiji se tržišni pokreti ponekad mogu pojačati jer se oko nje brzo stvaraju poluga, kredit i raspoloženje tržišta. To nije razlog za strah, ali jest razlog za pravila.",
          "Volatilnost nije naredba. Volatilnost je povod za provjeru vlastitih pravila.",
        ],
        link: {
          before: "Za praktičan rad kroz rastove i padove pročitajte",
          label:
            "Usklađivanje kupovne moći: što raditi kad Bitcoin raste ili pada?",
          href: "/vodici/uskladivanje-kupovne-moci-bitcoina/",
          after: "jer cijena ne bi smjela upravljati životom.",
        },
      },
      {
        heading: "Što STRC pokazuje, a što ne dokazuje",
        body: [
          "STRC treba promatrati oprezno. Ne navodim ga kao proizvod koji treba kupiti. Ne služi kao preporuka. U ovom vodiču STRC je samo primjer toga kako se oko Bitcoin kapitala grade financijski instrumenti.",
          "Ako u razgovoru čujete brojke o prinosu, cijeni ili trgovanju oko nominalne vrijednosti, čitajte ih kao uvjete koji su u razgovoru predstavljeni u tom trenutku. Takvi uvjeti mogu se promijeniti. Pravila instrumenta, odluke izdavatelja, tržišno povjerenje i kapitalni tokovi mogu promijeniti stvarni ishod.",
          "STRC je zanimljiv primjer toga kako se oko Bitcoin kapitala grade financijski instrumenti. Ali STRC nije bitcoin. Nije novac. Nije vlastiti posjed. To je vrijednosni papir jedne kompanije, s pravilima, rizicima i ovisnošću o izdavatelju.",
        ],
        items: [
          "Bitcoin u vlastitom posjedu: novac pod vlastitom kontrolom.",
          "Burzovni fond: vrijednosni papir preko brokera.",
          "MSTR: dionica kompanije.",
          "STRC: financijski instrument povezan s kompanijom i njezinom kapitalnom strukturom.",
        ],
      },
      {
        heading: "Javna kompanija nije obitelj",
        body: [
          "Strategy kao javna kompanija može raditi stvari koje pojedinac ili obitelj ne mogu i ne trebaju preslikavati. Javna kompanija može izdavati dionice, koristiti kreditne instrumente, upravljati kapitalnom strukturom i imati cilj povećavati Bitcoin po dionici.",
          "Obitelj ima drukčiji zadatak. Treba urediti proračun, dug, kratke obveze, sigurnosnu zalihu, davanje, neto imovinu i nasljeđivanje. Cilj obitelji nije pobijediti tržište u sljedećem tromjesečju, nego živjeti stabilnije kroz vrijeme.",
          "Ne preslikavajte kapitalnu strategiju javne kompanije na kućni proračun. Ne koristite budući novac kako biste kupili novac.",
        ],
        link: {
          before: "Za tu granicu posebno je važan vodič",
          label: "Ne zadužujte se za Bitcoin",
          href: "/vodici/ne-zaduzujte-se-za-bitcoin/",
          after: "jer dug može prisiliti na lošu odluku u lošem trenutku.",
        },
      },
      {
        heading: "Kratke obveze ne smiju ovisiti o cijeni Bitcoina",
        body: [
          "Novac potreban u idućih 3, 6, 12 ili 24 mjeseca mora imati jasnu namjenu. To može biti porezna obveza, plaće, školarina, najamnina, poslovne obveze, zdravstveni troškovi ili dogovorene obiteljske obveze.",
          "Ako je obveza kratka i poznata, ona ne smije ovisiti o tome da Bitcoin u pravom trenutku bude iznad određene cijene.",
          "Novac za kratke obveze ne mora biti najsavršeniji novac u filozofskom smislu. Mora biti dostupan kada obveza dođe na naplatu. U osobnom Bitcoin standardu to nije suprotnost Bitcoinu, nego zaštita od prisilne prodaje.",
        ],
      },
      {
        heading: "Ako je Saylor u pravu",
        body: [
          "Moguće je da potražnja za Bitcoinom kroz banke, burzovne fondove, javne kompanije i institucionalne tokove nastavi rasti. To može biti pozitivno za dugoročnu monetizaciju Bitcoina, ali ne smije potaknuti lakomislenost.",
          "Ako kupovna moć snažno poraste, pitanje nije samo koliko je osoba dobila na papiru. Pitanje je što sustav sada traži. Jesu li pokriveni budući troškovi? Postoji li dug? Treba li povećati sigurnost? Ima li obitelj pristup osnovnim uputama? Je li davanje dio sustava? Je li neto imovina u ravnoteži?",
          "Veća vrijednost traži bolji sigurnosni okvir. Rast ne smije ostati samo osjećaj pobjede. Mora postati jasniji raspored odgovornosti.",
        ],
        link: {
          before: "Za sigurnosni dio nastavite s vodičem",
          label: "Sigurnost ne smije ovisiti samo o vama",
          href: "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/",
          after: "jer veća vrijednost traži manje improvizacije.",
        },
      },
      {
        heading: "Ako Saylor nije u pravu",
        body: [
          "Moguće je i suprotno. Kapitalni tokovi se mogu usporiti. Banke mogu kasniti. Kreditni instrumenti mogu izgubiti povjerenje. Burzovni fondovi mogu imati slabije tokove. Bitcoin može ponovno snažno pasti.",
          "Dobar osobni Bitcoin standard mora preživjeti i snažan rast i dubok pad.",
          "Ako pad ruši proračun, problem nije samo pad. Ako rast izaziva zaduživanje, problem nije samo rast. U oba slučaja tržište otkriva gdje osobna pravila nisu dovoljno jasna.",
        ],
      },
      {
        heading: "Praktičan okvir nakon ovog razgovora",
        body: [
          "Prvo razvrstajte ono što posjedujete. Ne pokušavajte sve nazvati Bitcoinom samo zato što je povezano s Bitcoin tezom. Razdvajanje smanjuje zbrku i pomaže obitelji razumjeti što je novac, što je vrijednosni papir, što je potrošnja, što je proizvodna imovina i gdje je dug.",
        ],
        items: [
          "Bitcoin u vlastitom posjedu",
          "Bitcoin kod skrbnika",
          "Burzovni fondovi povezani s Bitcoinom",
          "Dionice kompanija povezanih s Bitcoinom",
          "Kreditni instrumenti povezani s Bitcoinom",
          "Državni novac za kratke obveze",
          "Potrošna dobra",
          "Proizvodna imovina",
          "Dug",
        ],
        link: {
          before: "Za cjelinu imovine posebno pomaže",
          label: "Pravilo trećina u neto imovini",
          href: "/vodici/pravilo-trecina/",
          after: "jer neto imovina mora ostati jedna slika.",
        },
      },
      {
        heading: "Pitanja nakon razvrstavanja",
        body: [
          "Nakon razvrstavanja postavite nekoliko pitanja. Koji dio je novac? Koji dio je financijski instrument? Koji dio je potreban za kratke obveze? Koji dio ovisi o skrbniku ili izdavatelju? Koji dio obitelj razumije?",
          "Zatim dodajte dva stresna pitanja. Koji dio bi stvorio problem ako cijena padne 50%? Koji dio bi stvorio problem ako cijena naglo poraste i izazove loše odluke?",
          "Ova pitanja ne služe tome da sve prodate ili sve kupite. Služe tome da prestanete miješati uloge. Bitcoin kao novac, financijska izloženost Bitcoinu, proizvodna imovina, potrošna dobra i dug ne nose isti zadatak.",
        ],
        link: {
          before: "Za temeljnu ulogu Bitcoina pročitajte",
          label: "Bitcoin je novac",
          href: "/vodici/bitcoin-kao-novac/",
          after:
            "jer bez te podjele ostali instrumenti lako preuzmu krivu ulogu.",
        },
      },
      {
        heading: "Zaključak",
        body: [
          "Bitcoin možda više ne pokreće samo prepolovljenje rudarske nagrade. Ali vaš život ne bi smjela pokretati cijena. Vaš život treba pokretati sustav odluka: proračun, život bez duga, davanje, neto imovina, sigurnost i jasna pravila kroz vrijeme.",
          "Ako Saylorova teza bude točna, pravila će vam trebati zbog rasta. Ako ne bude točna, pravila će vam trebati zbog pada. U oba slučaja osobni Bitcoin standard nije prognoza. To je način da novac, obveze, obitelj i sigurnost ostanu u istom sustavu.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako imate Bitcoin, burzovne fondove, dionice ili druge financijske instrumente povezane s Bitcoinom, ali ne znate kako ih razdvojiti u vlastitom sustavu odluka, uvodni razgovor može pomoći. Cilj nije predvidjeti cijenu, nego urediti pravila.",
  },
  {
    slug: "ne-cekajte-savrseno-dno-bitcoina",
    title: "Ne čekajte savršeno dno Bitcoina",
    seoTitle: "Ne čekajte savršeno dno Bitcoina",
    metaDescription:
      "Vodič o tome zašto osobni Bitcoin standard ne treba graditi na pogađanju tržišnog dna, nego na proračunu, dugu, pričuvi, sigurnosti i pravilima odlučivanja.",
    excerpt:
      "Ciklusi mogu biti koristan kontekst, ali osobni Bitcoin plan ne smije ovisiti o pogađanju jednog kvartala.",
    category: "Vrijeme i volatilnost",
    difficulty: "Srednje",
    freshness: "stabilno",
    theme: "time",
    order: 79,
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    practicalQuestion:
      "Je li vaš Bitcoin plan dovoljno jasan i ako se ciklus ponovi i ako se ciklus promijeni?",
    relatedSlugs: [
      "uskladivanje-kupovne-moci-bitcoina",
      "stvarni-visak",
      "dug-ili-bitcoin",
      "pravilo-trecina",
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
    ],
    visual: {
      type: "cycle",
      title: "Ciklus nije osobni plan",
      center: "pravila",
      nodes: ["proračun", "dug", "pričuva", "sigurnost", "vremenski horizont"],
      caption:
        "Tržišni ciklus može biti kontekst. Osobni Bitcoin standard mora imati pravila za više ishoda.",
    },
    intro: [
      "Bitcoin ljude često nauči jednoj korisnoj stvari: strpljenju.",
      "Ali ponekad ih nauči i jednoj opasnoj stvari: pretjeranom povjerenju u obrasce.",
      "Jedan od najpoznatijih obrazaca u Bitcoin svijetu je četverogodišnji ciklus. Priča je jednostavna. Otprilike svake četiri godine dogodi se halving — prepolovljenje nagrade koju rudari dobivaju za novi blok. Budući da se tada smanjuje količina novih bitcoina koji ulaze u optjecaj, mnogi zaključuju da se tržište mora kretati po istom ritmu: halving, rast, vrh, pad, dno, pa ponovno halving.",
      "Ta logika nije izmišljena. Bitcoin je doista imao izražene cikluse. Nakon ranijih halvinga događali su se snažni rastovi. Nakon snažnih rastova dolazili su bolni padovi. I mnoga tržišna dna do sada su se pojavljivala u vremenskim razmacima koji su ljudima davali dojam da se Bitcoin kreće gotovo po satu.",
      "Zbog toga se danas često može čuti tvrdnja da bi sljedeće veliko dno Bitcoina moglo doći u četvrtom kvartalu 2026. godine.",
      "Ne tvrdim da je ta mogućnost nemoguća.",
      "Ali mislim da je opasno ponašati se kao da je gotovo sigurna.",
    ],
    sections: [
      {
        heading:
          "Problem nije u ciklusima, nego u sigurnosti kojom ih tumačimo",
        body: [
          "Ljudi vole cikluse jer ciklusi daju osjećaj reda. Ako vjerujemo da se tržište kreće po poznatom obrascu, lakše nam je čekati, kupovati, prodavati i objašnjavati ono što se događa.",
          "Problem nastaje kada se povijesni obrazac počne tretirati kao prirodni zakon.",
          "Bitcoin nije mehanički sat. Bitcoin je novac, mreža, tržište, tehnologija, imovina i društveni fenomen u isto vrijeme. Njegova monetarna pravila jesu stroga, ali tržište koje određuje cijenu nije strogo. Cijenu ne određuje samo raspored halvinga, nego i potražnja, likvidnost, kamatne stope, institucionalni kapital, kreditni uvjeti, raspoloženje tržišta, regulacija, porezi, strah, pohlepa i osobne odluke milijuna ljudi.",
          "Halving je važan događaj.",
          "Ali nije jedini događaj.",
          "I što Bitcoin postaje veći, likvidniji i šire prihvaćen, to je manje razumno očekivati da će se ponašati jednako kao u ranijim fazama, kada je tržište bilo manje, pliće i osjetljivije na relativno male promjene ponude i potražnje.",
        ],
      },
      {
        heading: "Što se već promijenilo u prethodnom ciklusu",
        body: [
          "Ako želimo razumjeti zašto nije mudro slijepo čekati dno u Q4 2026., ne trebamo prvo gledati budućnost. Dovoljno je pogledati prethodni ciklus.",
          "Ciklus između trećeg i četvrtog halvinga, otprilike od 2020. do 2024., već se ponašao drukčije od ranijih ciklusa.",
          "Prvo, bull market 2021. nije izgledao kao čist, jednostavan vrh. Umjesto jednog jasnog vrha, tržište je imalo izraženu strukturu dvostrukog vrha. Prvi veliki vrh dogodio se u prvoj polovici 2021., a drugi krajem 2021. godine.",
          "To nije nevažan detalj. Ako cikluse promatramo kao uredne obrasce, onda bi i vrhovi trebali biti relativno uredni. Ali 2021. je već pokazala da stvarnost može biti složenija od modela.",
          "Drugo, dno bear marketa 2022. palo je ispod vrha prethodnog velikog bull marketa iz 2017. godine.",
          "To se prije nije događalo na taj način.",
          "Jedna od popularnih ideja među Bitcoin investitorima bila je da dno sljedećeg bear marketa više ne pada ispod vrha prethodnog bull marketa. U ranijim ciklusima ta se ideja činila uvjerljivom. Ali 2022. ju je tržište slomilo.",
          "Ako je jedan poznati obrazac već prestao vrijediti, treba biti oprezan s pretpostavkom da će drugi obrazac sigurno nastaviti vrijediti.",
          "Treće, Bitcoin je u ožujku 2024. napravio novi povijesni vrh prije četvrtog halvinga.",
          "To je možda najvažnija promjena.",
          "U ranijim ciklusima uobičajena je priča bila da halving dođe prvi, a tek nakon toga, s određenim vremenskim odmakom, dolazi veliki rast i novi vrh. Ali 2024. Bitcoin je već prije halvinga došao na novu najvišu cijenu u povijesti.",
          "To ne znači da halving više nije važan.",
          "Ali znači da više ne možemo jednostavno reći: “Prvo halving, onda tek kasnije novi povijesni vrh.” Tržište je već jednom preskočilo taj redoslijed.",
          "A ako je redoslijed mogao biti drukčiji na putu prema gore, zašto bismo bili sigurni da redoslijed mora ostati isti na putu prema dolje?",
        ],
      },
      {
        heading: "Četverogodišnji ciklus možda slabi",
        body: [
          "Najvažnije pitanje nije: “Postoje li Bitcoin ciklusi?”",
          "Vjerojatno postoje.",
          "Važnije pitanje je: “Što danas pokreće te cikluse?”",
          "U ranijim fazama Bitcoina halving je imao mnogo veći relativni učinak. Nagrada rudarima bila je veća, dnevna količina novih bitcoina bila je značajnija u odnosu na tržište, a ukupna tržišna kapitalizacija bila je mnogo manja.",
          "Danas je Bitcoin drukčiji.",
          "Postoji veće institucionalno sudjelovanje. Postoje spot Bitcoin ETF-ovi. Postoje kompanije koje drže Bitcoin u bilanci. Postoje fondovi, banke, posrednici, analitičari, regulatori, porezni sustavi i velik broj ljudi koji Bitcoin više ne promatraju kao eksperiment, nego kao ozbiljnu monetarnu imovinu.",
          "To ne uklanja cikluse.",
          "Ali može promijeniti njihovu narav.",
          "Umjesto da ciklus bude dominantno vođen halvingom, sve je moguće da Bitcoin sve više ulazi u režim u kojem se cijena kreće pod utjecajem više sila istodobno: dugoročne monetarne oskudice, globalne likvidnosti, institucionalne potražnje, raspoloženja tržišta i sve manjeg relativnog učinka nove ponude.",
          "Drugim riječima: halving ostaje važan, ali možda više nije jedini sat po kojem tržište kuca.",
        ],
      },
      {
        heading: "Zašto je opasno čekati “savršeno dno”",
        body: [
          "U praksi, pitanje Q4 2026. nije samo analitičko pitanje. To je pitanje ponašanja.",
          "Ako osoba vjeruje da dno mora doći u određenom kvartalu, vrlo lako može početi odgađati odluke.",
          "“Neću još kupovati.”",
          "“Čekat ću pravi pad.”",
          "“Sad je prerano.”",
          "“Dno dolazi kasnije.”",
          "To može zvučati racionalno. Ali često nije racionalno. Često je samo drugi oblik neodlučnosti.",
          "Naravno, moguće je da Bitcoin padne. Moguće je da dođe duboki bear market. Moguće je da Q4 2026. bude važan trenutak. Ali iz toga ne slijedi da osobni Bitcoin plan treba biti izgrađen na čekanju tog datuma.",
          "Jer postoji nekoliko problema.",
          "Prvi problem: dno se vidi tek nakon što prođe.",
          "Nitko ne dobije službenu obavijest da je dno upravo nastalo. U trenutku dna atmosfera je obično loša. Ljudi su umorni, sumnjičavi i oprezni. Vijesti su negativne. Komentari su depresivni. Mnogi koji su čekali dno tada više nemaju hrabrosti kupiti.",
          "Drugi problem: tržište ne mora dati cijenu koju čekate.",
          "Bitcoin može pasti manje nego što očekujete. Može dugo ići bočno. Može ponovno rasti prije nego što se psihološki pripremite. Može napraviti dno ranije. Može napraviti dno kasnije. Može napraviti više lokalnih dna bez jednog velikog dramatičnog trenutka.",
          "Treći problem: čekanje dna često skriva nedostatak sustava.",
          "Ako netko nema proračun, nema jasnu pričuvu, nema riješen dug, nema definiranu sigurnost i nema pravila za kupnju, onda mu “čekanje dna” daje privid strategije. Ali to nije strategija. To je samo odgađanje.",
        ],
      },
      {
        heading: "Bolje pitanje od “kada je dno?”",
        body: [
          "Pitanje “kada je dno?” zvuči privlačno, ali za većinu ljudi nije najbolje pitanje.",
          "Bolja pitanja su:",
          "Koliko stvarnog viška imam svaki mjesec?",
          "Koliko dugo mogu držati Bitcoin bez prisile na prodaju?",
          "Imam li dug koji mi povećava ranjivost?",
          "Imam li pričuvu u fiat novcu za kratkoročne obveze?",
          "Znam li koji dio moje imovine je novac, koji dio je kapital, a koji dio su potrošna dobra?",
          "Imam li sigurnosni plan koji bi moja obitelj mogla razumjeti ako mene nema?",
          "Znam li unaprijed što radim ako Bitcoin padne 30, 50 ili 70 posto?",
          "Znam li unaprijed što radim ako Bitcoin naraste mnogo brže nego što sam očekivao?",
          "Ta pitanja nisu uzbudljiva kao prognoza tržišnog dna.",
          "Ali su korisnija.",
          "Jer osobni Bitcoin standard ne nastaje iz pogađanja ciklusa. Nastaje iz reda.",
        ],
      },
      {
        heading: "Kako gledati cikluse bez robovanja ciklusima",
        body: [
          "Cikluse ne treba ignorirati.",
          "Bilo bi naivno reći da povijest Bitcoina nema nikakvu vrijednost. Ima. Povijest nas uči da Bitcoin može rasti iznimno snažno, ali i padati brutalno. Uči nas da euforija i panika dolaze u valovima. Uči nas da ljudi u rastu precjenjuju svoju hrabrost, a u padu podcjenjuju dugoročnu vrijednost onoga što posjeduju.",
          "Zato ciklusi mogu biti korisni kao kontekst.",
          "Ali ne bi trebali biti temelj osobnog plana.",
          "Dobar način razmišljanja je ovaj:",
          "Ciklusi su karta vremena, ali nisu zapovijed.",
          "Mogu vam pomoći da shvatite gdje se možda nalazite u širem tržišnom raspoloženju. Mogu vam pomoći da ne budete previše euforični nakon velikog rasta i ne previše očajni nakon velikog pada. Mogu vam pomoći da prepoznate da Bitcoin nije ravna linija, nego monetizirajuća imovina koja se kreće u snažnim valovima.",
          "Ali ako počnete vjerovati da točno znate kada mora doći sljedeće dno, ciklus prestaje biti alat i postaje zamka.",
        ],
      },
      {
        heading: "Što raditi umjesto čekanja Q4 2026.",
        body: [
          "Ako imate Bitcoin ili ga ozbiljno namjeravate imati, korisnije je napraviti osobni sustav nego čekati savršen trenutak.",
          "Prvi korak je proračun.",
          "Ne okvirni osjećaj. Ne “otprilike znam koliko trošim”. Nego stvarni proračun. Koliko novca dolazi? Koliko odlazi? Koje su obveze već preuzele budući prihod? Koji je stvarni višak? Koji novac je slobodan, a koji samo privremeno stoji na računu prije nego što ode na poreze, režije, kredit, najam, plaće, dobavljače ili obiteljske potrebe?",
          "Bez toga, svaka rasprava o kupnji Bitcoina ostaje maglovita.",
          "Drugi korak je razduživanje.",
          "Dug smanjuje slobodu odlučivanja. Što je osoba više opterećena dugom, to je osjetljivija na pad prihoda, rast kamata, neplanirane troškove i pad cijene imovine. U teoriji se može raspravljati o tome je li neki dug “dobar” ili “loš”. Ali u stvarnom životu dug često znači da budući rad već ima vlasnika.",
          "Bitcoin traži dugoročnost. Dug često skraćuje vremenski horizont.",
          "Treći korak je pričuva.",
          "Osoba koja nema pričuvu može biti prisiljena prodati Bitcoin u najgorem trenutku. Ne zato što je promijenila mišljenje o Bitcoinu, nego zato što je život pritisnuo. Auto se pokvari. Posao uspori. Klijent kasni. Zdravstveni trošak se pojavi. Obitelj treba pomoć.",
          "Pričuva nije suprotnost Bitcoinu. Pričuva štiti Bitcoin.",
          "Četvrti korak su pravila kupnje.",
          "Umjesto da osoba pokušava pogoditi jedno veliko dno, često je bolje definirati pravila: koliko se kupuje redovito, što se radi ako cijena padne, što se radi ako cijena naglo poraste, koji novac se nikada ne koristi za kupnju i pod kojim uvjetima se odluka preispituje.",
          "Pravila smanjuju ovisnost o emocijama.",
          "Peti korak je sigurnost.",
          "Bitcoin nije samo pitanje cijene. Bitcoin je i pitanje čuvanja. Ako osoba ne zna gdje su ključevi, tko ima pristup, što obitelj zna, što obitelj ne smije znati, što se dogaodi u slučaju smrti ili bolesti, i kako izbjeći paniku u kriznoj situaciji, tada njezin Bitcoin standard nije dovršen.",
          "Cijena je samo jedan dio priče.",
          "Sigurnost je drugi.",
        ],
      },
      {
        heading: "Tržišna prognoza nije isto što i osobni standard",
        body: [
          "Netko može biti u pravu oko ciklusa i svejedno imati loš osobni Bitcoin standard.",
          "Može pogoditi dno, ali kupiti novcem koji će mu trebati za tri mjeseca.",
          "Može kupiti odličnu cijenu, ali držati Bitcoin na mjestu koje ne razumije.",
          "Može izbjeći jedan pad, ali ostati bez plana za rast.",
          "Može čekati Q4 2026., a u međuvremenu ne riješiti dug, proračun, pričuvu, obiteljski razgovor i sigurnosni plan.",
          "Zato je najvažnija razlika ova:",
          "Tržišna prognoza pokušava pogoditi što će cijena napraviti.",
          "Osobni Bitcoin standard određuje što ćete vi napraviti u različitim mogućim okolnostima.",
          "To je zreliji pristup.",
          "Ne zato što ignorira tržište, nego zato što ne dopušta tržištu da upravlja svakom vašom odlukom.",
        ],
      },
      {
        heading: "Što ako dno doista bude u Q4 2026.?",
        body: [
          "Moguće je.",
          "Ako se to dogodi, osoba s dobrim sustavom neće biti oštećena time što nije slijepo čekala. Ona će već imati proračun, pričuvu, pravila, sigurnost i vremenski horizont. Ako cijena dođe u povoljnije područje, znat će što može napraviti. Ako ne dođe, neće ostati paralizirana.",
          "To je poanta.",
          "Dobar Bitcoin plan ne ovisi o tome da pogodite jedan kvartal.",
          "Dobar Bitcoin plan preživljava više scenarija.",
          "Ako Bitcoin padne, imate pravila.",
          "Ako Bitcoin raste, imate pravila.",
          "Ako Bitcoin ide bočno dvije godine, imate pravila.",
          "Ako se ciklus ponovi, niste iznenađeni.",
          "Ako se ciklus promijeni, niste izgubljeni.",
        ],
      },
      {
        heading: "Zaključak: ciklus je korisna mapa, ali loš gospodar",
        body: [
          "Četverogodišnji ciklus bio je jedan od najpoznatijih načina gledanja Bitcoina. I dalje ga vrijedi razumjeti. Ali ne vrijedi mu robovati.",
          "Prethodni ciklus već je pokazao da Bitcoin može odstupiti od starih obrazaca. Imao je drukčiju strukturu vrha, dno koje je narušilo raniju pretpostavku i novi povijesni vrh prije halvinga. To su ozbiljni signali da tržište sazrijeva i da se režim cijene mijenja.",
          "Zato ne bih osobni Bitcoin plan gradio na pretpostavci da dno mora doći u Q4 2026.",
          "Možda dođe.",
          "Možda ne dođe.",
          "Ali vaš proračun, dug, pričuva, sigurnost, obiteljski plan i vremenski horizont ne smiju čekati jedan kvartal.",
          "Bitcoin nagrađuje dugoročnost.",
          "Ali dugoročnost nije samo čekanje.",
          "Dugoročnost je sustav.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaTitle: "Želite ovo primijeniti na svoju situaciju?",
    finalCtaPrompt:
      "Ako ne želite Bitcoin odluke graditi na pogađanju dna, nego na osobnom sustavu, uvodni razgovor može pomoći da vidimo gdje trenutno stojite: proračun, dug, pričuva, sigurnost, vremenski horizont i pravila odlučivanja.",
  },
  {
    slug: "novac-kapital-potrosnja",
    title: "Novac, potrošna dobra i proizvodna imovina",
    metaDescription:
      "Vodič o tri uloge imovine: novcu, potrošnim dobrima i proizvodnoj imovini, te o tome zašto Bitcoin pripada ulozi novca.",
    excerpt:
      "Ne služi svaka imovina istoj svrsi. Bitcoin je novac. Potrošna dobra i proizvodna imovina imaju druga pravila.",
    category: "Neto imovina",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 80,
    featured: true,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Koji dio vaše neto imovine je novac, koji dio potrošna dobra, a koji dio proizvodna imovina?",
    relatedSlugs: [
      "bitcoin-kao-novac",
      "bitcoin-u-neto-imovini",
      "uskladivanje-kupovne-moci-bitcoina",
    ],
    visual: {
      type: "thirds",
      title: "Tri uloge neto imovine",
      columns: [
        {
          label: "novac",
          description: "kupovna moć za buduću razmjenu",
        },
        {
          label: "potrošna dobra",
          description: "dobra za izravnu uporabu",
        },
        {
          label: "proizvodna imovina",
          description: "dobra koja povećavaju produktivnost",
        },
      ],
      caption: "Ne služi svaka imovina istoj svrsi.",
    },
    sections: [
      {
        heading: "Tri različite uloge",
        body: [
          "Neto imovina nije jedna masa. U njoj postoje različite uloge. Jedan dio je novac: dobro koje se drži radi buduće razmjene. Jedan dio su potrošna dobra: stvari koje koristite i koje često traže održavanje. Jedan dio je proizvodna imovina: dobra koja povećavaju produktivnost ili stvaraju vrijednost.",
          "Ako te uloge pomiješate, odluke postaju loše. Možete se osjećati bogato zbog skupih potrošnih dobara, a zapravo imati malo novca. Možete imati proizvodnu imovinu, ali premalo sigurnosti. Možete imati Bitcoin, ali ga promatrati kao nešto izvan sustava.",
        ],
      },
      {
        heading: "Bitcoin kao novac",
        body: [
          "Bitcoin je novac u ovom okviru. Njegova uloga nije da bude alat koji proizvodi prihod. Njegova uloga je čuvati kupovnu moć i služiti budućoj razmjeni. Zato ga ne treba miješati s proizvodnom imovinom.",
          "Kada Bitcoin dobije ulogu novca, pitanja postaju jasnija. Koji dio čuvate? Koji dio može služiti budućem plaćanju? Kada se kupovna moć preispituje? Kako se pravila objašnjavaju obitelji?",
        ],
      },
      {
        heading: "Potrošna dobra",
        body: [
          "Potrošna dobra nisu loša. Dom, auto, oprema i stvari koje koristite mogu biti važni. Ali potrošna dobra često vežu novac i stvaraju buduća plaćanja. Ne stvaraju nužno slobodu.",
          "Zato ih treba gledati trijezno. Ne samo koliko vrijede danas, nego koliko traže sutra. Održavanje, porez, vrijeme, osiguranje i zamjena dijelovi su stvarne cijene. Ako se to ne vidi, potrošnja lako izgleda kao imovina koja ne traži ništa.",
        ],
      },
      {
        heading: "Proizvodna imovina",
        body: [
          "Proizvodna imovina su dobra koja povećavaju produktivnost. To može biti posao, alat, znanje, oprema, sustav, zemljište ili odnos koji stvara vrijednost. Ona ima drugu ulogu od novca i potrošnih dobara.",
          "Primjerice: vještina, alat, posao, poslovni sustav, odnos s klijentima ili imovina koja povećava sposobnost stvaranja novca.",
          "Bitcoin ne zamjenjuje potrebu za proizvodnom imovinom. Možete imati dobar novac, a i dalje trebate sposobnost stvaranja vrijednosti. Osobni Bitcoin standard zato ne pita samo koliko Bitcoina imate, nego i kako stvarate prihod.",
        ],
      },
      {
        heading: "Zašto miješanje pojmova stvara loše odluke",
        body: [
          "Ako novac, potrošnju i proizvodnu imovinu stavite u isti koš, gubite jasnoću. Tada možete prodati novac za potrošnju koja će stvarati trošak. Ili zanemariti proizvodnu imovinu koja bi povećala prihode. Ili misliti da Bitcoin treba raditi ono što radi posao.",
          "Dobro pravilo počinje podjelom: što je novac, što je potrošnja, a što proizvodna imovina? Kada je to jasno, neto imovina prestaje biti zbroj stvari. Postaje sustav s pravilima.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako ne znate gdje završava novac, a počinje potrošna ili proizvodna imovina, to je pitanje koje ne treba ostati samo u glavi.",
  },
  {
    slug: "bitcoin-u-neto-imovini",
    title: "Kako uklopiti Bitcoin u neto imovinu?",
    metaDescription:
      "Vodič o tome kako promatrati Bitcoin u neto imovini kroz novac, potrošna dobra, proizvodnu imovinu, dug i osobna pravila.",
    excerpt:
      "Bitcoin ne stoji izvan ostatka imovine. Njegova uloga postaje jasnija kada znate što je novac, što je potrošnja, a što proizvodna imovina.",
    category: "Neto imovina",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 85,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Znate li koju ulogu Bitcoin ima u vašoj neto imovini danas?",
    relatedSlugs: [
      "novac-kapital-potrosnja",
      "pravilo-trecina",
      "bitcoin-kao-novac",
    ],
    sections: [
      {
        heading: "Bitcoin nije odvojen od života",
        body: [
          "Bitcoin odluke postaju nejasne kada se Bitcoin promatra kao zaseban svijet. Iznos na novčaniku ne govori dovoljno. Njegovo značenje ovisi o dugu, prihodima, obitelji, novčanoj zalihi, potrošnim dobrima i proizvodnoj imovini.",
          "Dvije osobe mogu imati isti iznos Bitcoina. Jedna ima dug, nestabilan prihod i velike buduće troškove. Druga nema dug, redovito joj ostaje novac nakon troškova i ima jasna pravila. Isti Bitcoin saldo u ta dva života nema istu ulogu.",
          "Neto imovina daje širu sliku. Ona pokazuje što posjedujete i što dugujete. Tek tada se može razumno pitati koju ulogu Bitcoin ima. Je li novac? Je li novčana zaliha? Je li dio budućeg plana? Ili samo stoji sa strane bez pravila?",
        ],
      },
      {
        heading: "Uloga dolazi prije postotka",
        body: [
          "Ljudi često žele znati koliki postotak neto imovine treba biti u Bitcoinu. Ali postotak bez uloge nije plan. Osoba bez duga, s jasnim prihodima i stabilnom zalihom nije u istoj situaciji kao osoba s kratkim rokovima i velikim dugom.",
          "Prvo pitanje glasi: što Bitcoin radi u sustavu? Čuva kupovnu moć? Služi kao novčana zaliha? Ne dira se osim pod posebnim uvjetima? Kada je uloga jasna, tek tada postotak može imati značenje.",
        ],
      },
      {
        heading: "Pravilo trećina kao ogledalo",
        body: [
          "U okviru osobnog Bitcoin standarda pravilo trećina služi kao provjera ravnoteže. Najmanje trećina u novcu, najviše trećina u potrošnim dobrima i najviše trećina u proizvodnoj imovini. To nije naredba za svaku osobu.",
          "Vrijednost pravila je u pitanju koje postavlja: je li jedna kategorija zauzela previše prostora? Ako potrošna dobra rastu, dug pritišće ili novca nema dovoljno, Bitcoin odluka ne može se gledati izolirano.",
        ],
      },
      {
        heading: "Dug mijenja cijelu sliku",
        body: [
          "Dug smanjuje neto imovinu i povećava buduća plaćanja. Zato osoba s istim iznosom Bitcoina može imati potpuno drukčiji položaj ako ima velik dug. Dug može prisiliti na prodaju upravo onda kada Bitcoin želite držati.",
          "Zato se Bitcoin u neto imovini ne može ozbiljno promatrati bez duga. Dug pokazuje koliko je sustav slobodan, a koliko već obećan budućnosti.",
        ],
      },
      {
        heading: "Pravilo koje možete objasniti",
        body: [
          "Dobra Bitcoin uloga u neto imovini može se objasniti u nekoliko rečenica. Zašto Bitcoin postoji? Što ne dirate? Kada se pravilo preispituje? Kako dug, potrošnja i proizvodna imovina utječu na odluku?",
          "Ako to ne možete objasniti, problem nije u broju. Problem je u nejasnom sustavu. Osobni Bitcoin standard pretvara broj u pravilo koje možete živjeti i objasniti.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako znate koliko Bitcoina imate, ali ne znate koju ulogu ima u neto imovini, to je dobar razlog za razgovor.",
  },
  {
    slug: "pravilo-trecina",
    title: "Pravilo trećina u neto imovini",
    metaDescription:
      "Vodič o pravilu trećina u osobnom Bitcoin standardu: najmanje trećina u novcu, najviše trećina u potrošnji i proizvodnoj imovini.",
    excerpt:
      "Pravilo trećina nije naredba, nego ogledalo koje pokazuje je li vaša neto imovina u ravnoteži.",
    category: "Neto imovina",
    difficulty: "Napredno",
    freshness: "stabilno",
    order: 90,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Koja kategorija u vašoj neto imovini zauzima previše prostora?",
    relatedSlugs: [
      "bitcoin-u-neto-imovini",
      "novac-kapital-potrosnja",
      "bitcoin-kao-novac",
    ],
    visual: {
      type: "thirds",
      title: "Provjera ravnoteže",
      columns: [
        {
          label: "najmanje trećina",
          description: "novac",
        },
        {
          label: "najviše trećina",
          description: "potrošna dobra",
        },
        {
          label: "najviše trećina",
          description: "proizvodna imovina",
        },
      ],
      caption: "Pravilo trećina je ogledalo, ne naredba.",
    },
    sections: [
      {
        heading: "Zašto ravnoteža uopće treba pravilo",
        body: [
          "Bez pravila, neto imovina lako postane zbroj stvari. Malo novca, malo potrošnje, malo duga, malo Bitcoina, malo posla. Sve izgleda poznato, ali nije jasno ima li ravnoteže.",
          "Pravilo trećina u okviru osobnog Bitcoin standarda nije univerzalna naredba. Ono je ogledalo. Pomaže vidjeti je li previše neto imovine vezano u potrošnji, premalo u novcu ili nedovoljno u proizvodnoj imovini.",
          "Ne preporučujem kupnju ili prodaju određene imovine. Pravilo trećina služi za provjeru ravnoteže, ne kao formula koju treba slijepo provesti.",
        ],
      },
      {
        heading: "Najmanje trećina u novcu",
        body: [
          "Novac je dobro koje držite radi buduće razmjene. U ovom okviru Bitcoin ima ulogu novca. Najmanje trećina u novcu znači da sustav treba dovoljno kupovne moći koja nije vezana u potrošnim dobrima ili proizvodnoj imovini.",
          "Ne mora svaka osoba odmah imati isti udio. Važnije je pitati imate li dovoljno novca za buduće odluke. Ako je novca premalo, svaka promjena života može nas prisiliti na loš potez.",
        ],
      },
      {
        heading: "Najviše trećina u potrošnim dobrima",
        body: [
          "Potrošna dobra mogu biti važna, ali ne smiju pojesti sustav. Dom, auto, oprema i stvari koje koristite mogu stvarati udobnost, ali često traže održavanje, porez, osiguranje i pažnju.",
          "Ako potrošna dobra zauzimaju previše prostora, neto imovina može izgledati velika, a sloboda mala. Pravilo trećina tada ne osuđuje. Samo pokazuje da potrošnja možda nosi više težine nego što ste mislili.",
        ],
      },
      {
        heading: "Najviše trećina u proizvodnoj imovini",
        body: [
          "Proizvodna imovina su dobra koja povećavaju produktivnost ili stvaraju vrijednost. To može biti posao, alat, znanje, oprema ili sustav koji povećava prihode. Ona je važna jer novac sam po sebi ne stvara rad.",
          "Ali i proizvodna imovina može biti preteška ako traži previše vremena, duga ili rizika. Zato pravilo trećina ne kaže da proizvodne imovine mora biti što više. Kaže da treba imati jasnu svrhu i granicu.",
        ],
      },
      {
        heading: "Kada pravilo treba preispitati",
        body: [
          "Pravilo treba preispitati kada se promijeni život: novi dug, prodaja imovine, veća kupnja, promjena prihoda, rast ili pad kupovne moći Bitcoina, nova obiteljska odgovornost ili promjena sigurnosnog modela.",
          "Ako je gotovo sve vezano u domu, autu ili poslu, pitanje nije što sada prodati, nego imate li dovoljno novca za buduće odluke.",
          "Preispitivanje ne znači da morate nešto kupiti ili prodati. Možda je zaključak da ne dirate ništa. Ali tada znate zašto. Tako se imovina koja se samo dogodila razlikuje od osobnog Bitcoin standarda.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako želite provjeriti ravnotežu neto imovine bez pretvaranja toga u slijepu formulu, to vrijedi razjasniti u razgovoru.",
  },
  {
    slug: "bitcoin-etfovi-i-riznicke-kompanije",
    title:
      "Bitcoin ETF-ovi i rizničke kompanije: gdje prestaje Bitcoin, a počinje kapital",
    seoTitle:
      "Bitcoin ETF-ovi i rizničke kompanije: gdje prestaje Bitcoin, a počinje kapital",
    metaDescription:
      "Vodič koji objašnjava razliku između bitcoina u vlastitoj pohrani, ETF-ova, burzi i Bitcoin rizničkih kompanija poput Strategyja i MSTR-a.",
    excerpt:
      "ETF-ovi, brokeri, burze i Bitcoin rizničke kompanije mogu imati mjesto u imovini, ali nisu isto što i bitcoin u vlastitom posjedu.",
    category: "Neto imovina",
    difficulty: "Napredno",
    freshness: "često se mijenja",
    order: 92,
    publishedAt: "2026-05-12",
    updatedAt: "2026-07-01",
    practicalQuestion:
      "Znate li posjedujete li bitcoin, vrijednosni papir, potraživanje ili kapitalnu izloženost povezanu s Bitcoinom?",
    relatedSlugs: [
      "samostalna-pohrana-ili-skrbnik",
      "novac-kapital-potrosnja",
      "bitcoin-u-neto-imovini",
    ],
    visual: {
      type: "thirds",
      title: "Tri oblika Bitcoin izloženosti",
      columns: [
        {
          label: "bitcoin",
          description: "novac pod osobnom kontrolom",
        },
        {
          label: "ETF ili burza",
          description: "financijska izloženost uz skrbnika",
        },
        {
          label: "riznička kompanija",
          description: "kapitalno dobro povezano s Bitcoinom",
        },
      ],
      caption:
        "Edukativni okvir za razmišljanje, bez investicijskog, poreznog ili pravnog savjeta.",
    },
    sections: [
      {
        heading: "Bitcoin pitanje je postalo šire",
        body: [
          "Nakon 2024. godine pitanje Bitcoina u osobnoj imovini postalo je šire.",
          "Prije su glavne opcije bile jednostavnije: kupiti bitcoin na burzi, ostaviti ga tamo ili ga povući u vlastiti novčanik.",
          "Danas postoji više slojeva. Postoje Bitcoin ETF-ovi. Postoje brokerski računi. Postoje burze. Postoje kompanije koje drže Bitcoin u vlastitoj riznici. Postoje povlaštene dionice i drugi proizvodi povezani s kompanijama koje koriste Bitcoin kao temelj kapitalne strukture.",
          "Ti proizvodi, naravno, nisu isto što i Bitcoin.",
          "Ali znači da osoba ili obitelj danas može imati različite oblike izloženosti Bitcoinu.",
          "Neki oblici pripadaju području novca pod osobnom kontrolom. Neki pripadaju području kapitalnih dobara. Neki su prijelazna rješenja. Neki su prikladni samo za osobe koje razumiju dodatne rizike.",
          "Zato ih treba jasno razdvojiti.",
        ],
        calloutTitle: "Prvo razdvojiti oblik",
        callout:
          "Kada netko kaže da ima Bitcoin, prvo pitanje nije koliki je iznos, nego u kojem obliku ga ima: vlastiti bitcoin, financijski proizvod ili kapitalnu izloženost povezanu s Bitcoinom.",
        cards: [
          {
            title: "Novac pod kontrolom",
            text: "Bitcoin u vlastitoj pohrani ima ulogu novca koji možete premjestiti bez dopuštenja posrednika.",
          },
          {
            title: "Financijski proizvod",
            text: "ETF ili brokerski proizvod može pratiti temu Bitcoina, ali ostaje unutar pravila financijskog sustava.",
          },
          {
            title: "Kapitalna izloženost",
            text: "Riznička kompanija je poslovna i tržišna odluka, čak i kada je snažno povezana s Bitcoinom.",
          },
        ],
        visual: etfTreasurySectionImage(
          "Tri oblika izloženosti nisu ista stvar.",
          "Bitcoin pod vlastitim ključevima, ETF u brokerskom sustavu i dionica rizničke kompanije mogu biti povezani s istom temom, ali nemaju istu funkciju.",
          "bitcoin-etfovi-riznice-tri-oblika-20260701.webp",
          "Mediteranska scena s tri odvojena pladnja za Bitcoin kamen, financijski omot i mapu kompanije"
        ),
      },
      {
        heading: "Spot Bitcoin ETF-ovi",
        body: [
          "U siječnju 2024. američka Komisija za vrijednosne papire odobrila je uvrštenje i trgovanje više spot Bitcoin proizvoda kojima se trguje na burzi. Time je Bitcoin ušao u standardni brokerski i institucionalni okvir na način koji prije nije postojao u SAD-u.",
          "Među najpoznatijim proizvodima su BlackRock iShares Bitcoin Trust — IBIT, Fidelity Wise Origin Bitcoin Fund — FBTC, Bitwise Bitcoin ETF — BITB, ARK 21Shares Bitcoin ETF — ARKB, Franklin Bitcoin ETF — EZBC, Invesco Galaxy Bitcoin ETF — BTCO, VanEck Bitcoin Trust — HODL, WisdomTree Bitcoin Fund — BTCW i Grayscale Bitcoin Trust — GBTC.",
          "Za osobu koja već ima brokerski račun i portfelj vrijednosnih papira, to je velika promjena.",
          "Bitcoin više nije dostupan samo kroz burze za kriptoimovinu ili vlastiti novčanik. Može biti i dio portfelja vrijednosnih papira.",
          "Prednosti postoje, ali i mane.",
        ],
        visual: {
          type: "logo-grid",
          title: "ETF je vrijednosni papir, ne vlastiti ključ",
          caption:
            "Logotipi izdavatelja pomažu vidjeti da ovdje govorimo o financijskim proizvodima unutar brokerskog sustava, a ne o bitcoinu u vlastitom novčaniku.",
          items: [
            {
              name: "BlackRock",
              description: "iShares Bitcoin Trust, IBIT",
              src: "/guide-assets/blackrock-logo.svg",
              alt: "BlackRock logo",
              href: "https://www.blackrock.com/",
              credit: "Logo: Wikimedia Commons",
            },
            {
              name: "Fidelity",
              description: "Wise Origin Bitcoin Fund, FBTC",
              src: "/guide-assets/fidelity-logo.svg",
              alt: "Fidelity logo",
              href: "https://www.fidelity.com/",
              credit: "Logo: Wikimedia Commons",
            },
            {
              name: "Grayscale",
              description: "Grayscale Bitcoin Trust, GBTC",
              src: "/guide-assets/grayscale-logo.svg",
              alt: "Grayscale logo",
              href: "https://www.grayscale.com/",
              credit: "Logo: Wikimedia Commons",
            },
          ],
        },
      },
      {
        heading: "Prednosti Bitcoin ETF-a",
        body: [
          "Prva prednost je jednostavnost. Ako obitelj već ima brokerski račun, vrijednosne papire i naviku ulaganja kroz brokera, Bitcoin ETF može biti razumljiviji od upravljanja privatnim ključevima, wallet backupima, offline potpisivanjem i oporavkom.",
          "Druga prednost je administracija. ETF se uklapa u brokerske izvještaje, portfelj, nasljeđivanje vrijednosnih papira i uobičajene investicijske procese.",
          "Treća prednost je skrbnička infrastruktura. Kod velikih izdavatelja postoje revizori, skrbnici, brokeri, regulatori, tržišni sudionici i javna izvješća. To ne uklanja rizik, ali znači da proizvod ne ovisi o jednoj osobi koja sama održava cijeli put ključeva, backupa i oporavka.",
          "Četvrta prednost je psihološka. Za obitelj koja se boji samostalne pohrane, ETF može biti prvi korak prema razumijevanju Bitcoina.",
          "ETF ne uklanja volatilnost Bitcoina. On uklanja dio operativne složenosti.",
        ],
        calloutTitle: "Jednostavnije ne znači isto",
        callout:
          "ETF može smanjiti operativnu složenost, ali ne pretvara brokerski račun u vlastiti Bitcoin novčanik.",
        cards: [
          {
            title: "Poznata administracija",
            text: "ETF se može uklopiti u izvještaje, portfelj vrijednosnih papira i postojeći proces nasljeđivanja.",
          },
          {
            title: "Skrbnička infrastruktura",
            text: "Veliki izdavatelji imaju formalne procese, revizore i skrbnike, ali to ne uklanja povjerenje u sustav.",
          },
          {
            title: "Psihološki ulaz",
            text: "Za dio obitelji ETF može biti manje zastrašujući prvi susret s Bitcoin temom.",
          },
        ],
        visual: etfTreasurySectionImage(
          "ETF je financijski omot oko teme Bitcoina.",
          "Prednost ETF-a je jednostavniji ulazak kroz brokerski sustav, ali omot ne daje privatne ključeve ni izravan pristup Bitcoin mreži.",
          "bitcoin-etfovi-riznice-etf-omot-20260701.webp",
          "Bitcoin kameni simbol djelomično prekriven prozirnim financijskim omotom na mediteranskom stolu"
        ),
      },
      {
        heading: "Mane Bitcoin ETF-a",
        body: [
          "Glavna mana je jasna: nemate privatne ključeve. Imate vrijednosni papir.",
          "To može biti korisno, samo ga ne treba izjednačiti s bitcoinom u vlastitom posjedu.",
          "ETF ne daje istu otpornost na cenzuru. Ne možete poslati bitcoin iz ETF-a izravno drugoj osobi. Ne možete koristiti Bitcoin mrežu bez posrednika.",
          "Ovisite o brokeru, izdavatelju, skrbniku, tržišnoj infrastrukturi, regulatornom okruženju i pravilima proizvoda.",
          "Također, ETF ima troškove, strukturu, pravila, moguće razlike između tržišne cijene i vrijednosti imovine u pozadini te pravni okvir koji nije isti kao izravno držanje bitcoina.",
          "Za hrvatske i europske ulagače postoji još jedan praktičan sloj: američki ETF-ovi nisu nužno dostupni svakom malom ulagaču u Europskoj uniji. Konkretna dostupnost ovisi o brokeru, statusu klijenta, jurisdikciji i dokumentaciji proizvoda.",
          "Shvatite ovo kao okvir za razmišljanje, a ne kao porezni, pravni ili investicijski savjet.",
        ],
        table: {
          columns: ["Pitanje", "Bitcoin u vlastitoj pohrani", "Bitcoin ETF"],
          rows: [
            [
              "Tko drži ključeve?",
              "Vi ili vaš vlastiti sigurnosni sustav.",
              "Skrbnik i institucionalna infrastruktura iza proizvoda.",
            ],
            [
              "Možete li poslati bitcoin?",
              "Da, ako imate pristup vlastitim ključevima.",
              "Ne. Možete kupiti ili prodati vrijednosni papir.",
            ],
            [
              "O čemu ovisite?",
              "O vlastitoj sigurnosti, backupu i planu oporavka.",
              "O brokeru, izdavatelju, skrbniku, pravilima proizvoda i tržištu.",
            ],
            [
              "Koja je glavna uloga?",
              "Novac pod osobnom kontrolom.",
              "Financijska izloženost cijeni Bitcoina.",
            ],
          ],
        },
      },
      {
        heading: "ETF kao dio obiteljskog portfelja",
        body: [
          "Za obitelj koja već ima portfelj vrijednosnih papira, ETF može imati mjesto.",
          "Primjerice, obitelj može imati dio imovine u dionicama, dio u obveznicama ili novčanim fondovima, dio u nekretnini, dio u bitcoinu u vlastitoj pohrani i dio u Bitcoin ETF-u.",
          "To može biti razumno ako je jasno zašto se svaki dio drži.",
          "ETF može biti dio koji je administrativno lakši, uklopljen u postojeći brokerski sustav i obitelji razumljiviji.",
          "Vlastiti bitcoin može biti dio koji daje suverenost, otpornost na cenzuru i kontrolu.",
          "Ti dijelovi ne moraju imati istu funkciju.",
        ],
        table: {
          columns: ["Dio portfelja", "Moguća uloga", "Što ne treba zaboraviti"],
          rows: [
            [
              "Vlastiti bitcoin",
              "Novac pod osobnom kontrolom i dugoročna suverenost.",
              "Traži ozbiljan plan sigurnosti, oporavka i nasljeđivanja.",
            ],
            [
              "Bitcoin ETF",
              "Administrativno lakša izloženost kroz brokera.",
              "Nije isti oblik kontrole kao bitcoin u vlastitom novčaniku.",
            ],
            [
              "Burza ili mjenjačnica",
              "Likvidnost, kupnja, prodaja ili prijelazni iznos.",
              "Ne bi smjela postati dugoročna pohrana bez jasnog razloga.",
            ],
            [
              "Riznička kompanija",
              "Kapitalna izloženost poslovnom modelu povezanom s Bitcoinom.",
              "Nosi rizik dionice, bilance, uprave i tržišne premije.",
            ],
          ],
        },
      },
      {
        heading: "Burze i mjenjačnice",
        body: [
          "Burza ili mjenjačnica često je prvi dodir s Bitcoinom, i u tome nema ništa neobično.",
          "Problem nastaje kada burza postane trajna pohrana velikog iznosa bez jasnog razloga.",
          "Burza je korisna za kupnju, prodaju i likvidnost. Ali ako dugoročno držite bitcoin na burzi, preuzimate rizik burze.",
          "Rizik može biti poslovni rizik, regulatorni rizik, sigurnosni rizik, rizik zamrzavanja računa, rizik povlačenja sredstava, rizik da burza nema ono što tvrdi i rizik da obitelj ne zna pristupiti računu.",
          "Zato se ne treba pitati je li burza uvijek loša, nego zašto je taj iznos tamo i koliko dugo treba ostati tamo.",
          "Mali iznos radi likvidnosti može imati smisla. Velik dugoročni iznos bez plana obično nema.",
        ],
        calloutTitle: "Likvidnost nije pohrana",
        callout:
          "Burza može biti koristan ulaz i izlaz, ali ako dugoročni iznos ostane ondje samo zato što nema plana, burza je postala sigurnosni model bez odluke.",
      },
      {
        heading: "Bitcoin rizničke kompanije",
        body: [
          "Zadnjih godina nastao je još jedan sloj: kompanije koje drže Bitcoin kao ključnu imovinu u svojoj riznici.",
          "Najpoznatiji primjer je Strategy, ranije MicroStrategy, s oznakom MSTR.",
          "Ova kompanija nije samo dionica softverske firme. Tržište je sve više gleda kao kompaniju čija je kapitalna struktura izgrađena oko Bitcoina.",
          "MSTR ipak nije bitcoin.",
          "MSTR je dionica kompanije. Ali vrijednost i rizik kompanije snažno su povezani s Bitcoinom.",
        ],
        calloutTitle: "Dionica nije novčanik",
        callout:
          "Riznička kompanija može imati Bitcoin u bilanci, ali osoba koja kupi dionicu ne dobiva privatne ključeve ni izravan zahtjev prema tom Bitcoinu.",
        visual: {
          type: "logo-grid",
          title: "Riznička kompanija nije isto što i bitcoin",
          caption:
            "Logo pomaže razdvojiti pojmove: Strategy je kompanija i vrijednosni papir, dok je bitcoin novac pod vlastitom kontrolom samo kada držite ključeve.",
          items: [
            {
              name: "Strategy",
              description: "kompanija s Bitcoin riznicom i oznakom MSTR",
              src: "/guide-assets/strategy-logo.svg",
              alt: "Strategy logo",
              href: "https://www.strategy.com/",
              credit: "Logo: Strategy",
            },
          ],
        },
      },
      {
        heading: "Rafinerija nafte kao usporedba",
        body: [
          "Michael Saylor često koristi usporedbu s rafinerijom.",
          "Rafinerija ne prodaje samo sirovu naftu. Ona uzima naftu kao ulaznu sirovinu i iz nje proizvodi benzin, dizel, kerozin, motorna ulja, plastiku i kemijske proizvode.",
          "Svaki proizvod ima drugačiju namjenu, kupca, cijenu, rizik i potražnju.",
          "Slična ideja stoji iza Bitcoin rizničke kompanije. Bitcoin je osnovna sirovina. Kompanija zatim koristi kapitalna tržišta da oko tog Bitcoina stvori različite vrijednosne papire: običnu dionicu, povlaštene dionice, kreditne instrumente i proizvode s različitim profilom prinosa i volatilnosti.",
          "Neki ulagači žele snažniju izloženost Bitcoinu. Neki žele prihod. Neki žele manju volatilnost. Neki žele likvidan vrijednosni papir u brokerskom računu. Neki žele proizvod koji se ponaša drukčije od samog Bitcoina.",
          "U tome je smisao usporedbe s rafinerijom. Samo treba biti jasno: ovdje više ne govorimo o čistom Bitcoinu, nego o kapitalnoj strukturi kompanije koja Bitcoin koristi kao temelj.",
        ],
        cards: [
          {
            title: "Bitcoin kao temelj",
            text: "Kompanija može koristiti Bitcoin kao ključnu imovinu oko koje gradi kapitalnu strukturu.",
          },
          {
            title: "Vrijednosni papiri kao proizvodi",
            text: "Dionice, povlašteni instrumenti i kreditni proizvodi mogu imati različite profile rizika.",
          },
          {
            title: "Tržište kao sudac",
            text: "Vrijednost ne ovisi samo o Bitcoinu, nego i o premiji, povjerenju i sposobnosti uprave.",
          },
        ],
        visual: etfTreasurySectionImage(
          "Riznička kompanija je poslovni sloj iznad Bitcoina.",
          "Bitcoin može biti temelj bilance, ali dionica kompanije uključuje dodatne slojeve: upravu, dug, tržišnu premiju i pravila kapitalnih tržišta.",
          "bitcoin-etfovi-riznice-kompanija-20260701.webp",
          "Mediteranska scena s Bitcoin kamenom, mapom kompanije i malim kamenim modelom zgrade"
        ),
      },
      {
        heading: "MSTR kao pojačana izloženost Bitcoinu",
        body: [
          "Dionica MSTR-a često se ponaša kao pojačana izloženost Bitcoinu.",
          "Kada Bitcoin raste, MSTR može rasti jače. Kada Bitcoin pada, MSTR može padati jače.",
          "Razlog je što kompanija ne drži samo bitcoin pasivno. Ona koristi dug, izdavanje dionica, povlaštene instrumente i tržišnu premiju kako bi povećavala količinu bitcoina po dionici.",
          "Takav pristup može stvoriti dodatnu vrijednost, ali i dodatni rizik.",
          "MSTR nije bitcoin. MSTR je dionica kompanije s poslovnom, financijskom, tržišnom i upravljačkom složenošću.",
          "Zato ga ne treba promatrati kao zamjenu za bitcoin u vlastitom posjedu. Više ima smisla promatrati ga kao kapitalno dobro povezano s Bitcoinom.",
        ],
        calloutTitle: "Pojačanje radi u oba smjera",
        callout:
          "Ako instrument može rasti jače od Bitcoina zbog bilance, premije i kapitalnih tržišta, isti slojevi mogu pojačati i pad, stres ili nesporazum ulagača.",
        table: {
          columns: ["Sloj", "Što može pomoći", "Što može povećati rizik"],
          rows: [
            [
              "Bitcoin u bilanci",
              "Vrijednost kompanije može biti snažno vezana uz rast Bitcoina.",
              "Pad Bitcoina može opteretiti tržišno povjerenje i kapitalnu strukturu.",
            ],
            [
              "Dug i izdavanje kapitala",
              "Kompanija može povećavati Bitcoin po dionici ako tržište surađuje.",
              "Uvjeti financiranja, razrjeđenje i refinanciranje postaju važni.",
            ],
            [
              "Tržišna premija",
              "Dionica se može vrednovati iznad same vrijednosti Bitcoina u pozadini.",
              "Premija se može smanjiti i kad Bitcoin nije glavni problem.",
            ],
            [
              "Upravljanje",
              "Dobra izvedba može stvoriti dodatnu vrijednost.",
              "Loše odluke ili promjena povjerenja mogu utjecati na rezultat.",
            ],
          ],
        },
        visual: etfTreasurySectionImage(
          "Bilanca može pojačati i priliku i rizik.",
          "Kod MSTR-a više ne gledamo samo cijenu Bitcoina, nego i slojeve bilance, financiranja, tržišne premije i upravljanja.",
          "bitcoin-etfovi-riznice-bilanca-20260701.webp",
          "Kamena vaga s Bitcoin simbolom na jednoj strani i slojevima kapitalnih papira na drugoj strani"
        ),
      },
      {
        heading: "STRC: Stretch kao drukčiji proizvod",
        body: [
          "STRC je Strategyjev Stretch, promjenjiva povlaštena dionica bez dospijeća.",
          "Strategy ga opisuje kao kratkoročni visokoprinosni kreditni proizvod koji trenutačno plaća 11,50% godišnje dividende u gotovini, mjesečno, s promjenjivom stopom koja se prilagođava kako bi se trgovanje održavalo oko 100 dolara nominalne vrijednosti i smanjila volatilnost cijene.",
          "Tu treba biti vrlo oprezan. Trenutna stopa od 11,50% nije zajamčena zauvijek. Stopa se može mijenjati. Dividenda se isplaćuje samo ako je proglasi nadležno tijelo kompanije i ako postoje zakonski raspoloživa sredstva.",
          "Drugim riječima: nije riječ o obveznici bez rizika, novcu ili bitcoinu u vlastitom posjedu.",
          "Strategy je predložio češću, polumjesečnu isplatu dividendi, s ciljem poboljšanja likvidnosti i stabilnosti cijene.",
          "Zato ga treba čitati drukčije od obične dionice MSTR-a. MSTR privlači veću volatilnost, dok STRC pokušava ponuditi profil bliži nominalnoj vrijednosti od 100 dolara i redovitom novčanom toku.",
          "U pojednostavljenom jeziku: MSTR je više pojačana dionica povezana s Bitcoinom, a STRC je više prihodovni proizvod povezan s kapitalnom strukturom Bitcoin kompanije.",
          "Ne preporučujem kupnju ili prodaju; ovdje samo razdvajam pojmove.",
        ],
        calloutTitle: "Prinos nije isto što i sigurnost",
        callout:
          "Kod prihodovnih instrumenata prvo treba razumjeti tko isplaćuje prihod, pod kojim uvjetima, s kojim senioritetom i što se događa ako se uvjeti promijene.",
        cards: [
          {
            title: "Nije Bitcoin",
            text: "Kupac ne dobiva bitcoin pod vlastitom kontrolom, nego vrijednosni papir povezan s kapitalnom strukturom kompanije.",
          },
          {
            title: "Nije obična dionica",
            text: "Profil se razlikuje od MSTR-a jer je naglasak više na prihodovnom okviru i nominalnoj vrijednosti.",
          },
          {
            title: "Nije bez rizika",
            text: "Dividenda, likvidnost, uvjeti tržišta i sposobnost isplate ostaju ključna pitanja.",
          },
        ],
      },
      {
        heading: "Zašto bi obitelj gledala STRC?",
        body: [
          "Neka obitelj možda ne želi samo držati bitcoin. Možda želi dio portfelja koji ima novčani tok. Možda želi manju volatilnost od MSTR-a. Možda želi vrijednosni papir koji se pokušava održavati oko 100 dolara.",
          "Možda joj 10% godišnjeg prinosa, ako bi se takav prinos u nekom razdoblju stabilizirao, izgleda kao zanimljiv dio kapitalnog portfelja.",
          "Ali tu treba biti vrlo oprezan. Dividenda nije isto što i sigurnost. Visok prinos nikada ne dolazi bez rizika.",
          "STRC ima rizike: rizik Strategyja kao kompanije, rizik Bitcoin cijene, rizik kapitalne strukture, rizik sposobnosti isplate dividendi, rizik promjene tržišnih uvjeta, rizik likvidnosti, rizik regulatornih promjena, rizik da se cijena ne održi oko 100 dolara i rizik da ulagač ne razumije senioritet i uvjete instrumenta.",
          "Zato STRC ne bih stavio u kategoriju novca, nego u kategoriju kapitalnih dobara, odnosno vrijednosnih papira.",
          "Može imati mjesto u portfelju. Ali nije zamjena za bitcoin pod osobnom kontrolom.",
        ],
        table: {
          columns: ["Mogući razlog interesa", "Pitanje koje treba postaviti"],
          rows: [
            [
              "Želja za prihodovnim dijelom portfelja",
              "Odakle prihod dolazi i što se događa ako ga kompanija ne može ili ne želi isplatiti?",
            ],
            [
              "Manja očekivana volatilnost od obične dionice",
              "Koji rizici ostaju i može li tržišna cijena ipak značajno odstupiti?",
            ],
            [
              "Vrijednosni papir u brokerskom računu",
              "Razumije li obitelj instrument, senioritet i postupak nasljeđivanja?",
            ],
            [
              "Povezanost s Bitcoin temom",
              "Je li cilj Bitcoin novac, kapitalni rizik ili prihodovni instrument?",
            ],
          ],
        },
      },
      {
        heading: "Gdje ovo pripada u osobnom Bitcoin standardu?",
        body: [
          "U okviru osobnog Bitcoin standarda razlikujemo novac, kapitalna dobra i potrošačka dobra.",
          "Bitcoin u vlastitom posjedu najčišće pripada dijelu novca.",
          "ETF, MSTR, STRC i slični proizvodi više pripadaju dijelu kapitala, odnosno proizvodne imovine ili financijskih instrumenata.",
          "Ta razlika je važna. Kad osoba kaže da ima bitcoin, prvo treba pitati u kojem obliku.",
          "Bitcoin u vlastitoj pohrani nije isto što i Bitcoin ETF. Bitcoin ETF nije isto što i MSTR. MSTR nije isto što i STRC. STRC nije isto što i bitcoin u višepotpisnom trezoru.",
          "Svi ti oblici mogu biti povezani s Bitcoinom. Ali nemaju istu funkciju.",
        ],
        table: {
          columns: ["Oblik", "Primarna uloga", "Glavna zabuna"],
          rows: [
            [
              "Bitcoin u vlastitoj pohrani",
              "Novac pod osobnom kontrolom.",
              "Podcijeniti odgovornost sigurnosti, oporavka i obitelji.",
            ],
            [
              "Bitcoin ETF",
              "Financijska izloženost kroz brokerski sustav.",
              "Misliti da je to isto što i vlastiti ključ.",
            ],
            [
              "MSTR",
              "Kapitalno dobro povezano s Bitcoinom.",
              "Misliti da je dionica kompanije zamjena za bitcoin.",
            ],
            [
              "STRC i slični instrumenti",
              "Prihodovni ili kreditni sloj kapitalne strukture.",
              "Misliti da prinos znači sigurnost.",
            ],
          ],
        },
        visual: etfTreasurySectionImage(
          "Ovo su različite odluke, ne jedna odluka.",
          "Vlastiti bitcoin, ETF i riznička kompanija mogu stajati u istom planu, ali svaki dio treba imati svoju ulogu i vlastito objašnjenje.",
          "bitcoin-etfovi-riznice-tri-odluke-20260701.webp",
          "Tri odvojene odluke na papiru s Bitcoin ključem, financijskim omotom i kamenim modelom kompanije"
        ),
        link: {
          before: "Za temeljnu podjelu uloga imovine pročitajte vodič",
          label: "Novac, potrošna dobra i proizvodna imovina",
          href: "/vodici/novac-kapital-potrosnja/",
          after: "jer je to osnova ove razlike.",
        },
      },
      {
        heading: "Kako razmišljati o riziku i prinosu?",
        body: [
          "Kod svakog od ovih proizvoda treba pitati što točno posjedujem, tko drži bitcoin, tko ima ključeve, gdje je rizik skrbnika, gdje je pravni rizik i gdje je tržišni rizik.",
          "Treba pitati postoji li prihod, odakle dolazi taj prihod, što se događa ako Bitcoin padne 50%, što se događa ako tržište izgubi povjerenje, što se događa ako kompanija ne može izdavati nove instrumente i što se događa ako obitelj mora naslijediti taj proizvod.",
          "Nije dovoljno gledati samo očekivani prinos. Treba gledati što se događa u lošem scenariju.",
        ],
        calloutTitle: "Prinos dolazi tek nakon strukture",
        callout:
          "Ako ne možete objasniti što posjedujete, tko kontrolira Bitcoin i što se događa u lošem scenariju, očekivani prinos još nije glavna tema.",
        items: [
          "Što točno posjedujem: bitcoin, udjel, dionicu, potraživanje ili prihodovni instrument?",
          "Tko drži privatne ključeve i pod kojim pravilima?",
          "Gdje je skrbnički, pravni, tržišni i poslovni rizik?",
          "Što se događa ako Bitcoin snažno padne ili tržište izgubi povjerenje?",
          "Kako obitelj nasljeđuje taj oblik imovine ako se nešto dogodi vlasniku?",
        ],
        visual: etfTreasurySectionImage(
          "Prije prinosa dolazi provjera pitanja.",
          "Kod svakog Bitcoin povezanog proizvoda korisno je proći istu listu: što posjedujem, tko drži ključeve, gdje je rizik i što se događa pod stresom.",
          "bitcoin-etfovi-riznice-pitanja-20260701.webp",
          "Mediteranska checklist scena s Bitcoin kamenom, ključem, financijskim omotom i mapom kompanije"
        ),
      },
      {
        heading: "Kako ovo može izgledati u osobnom planu?",
        body: [
          "Primjer obiteljskog plana mogao bi izgledati ovako: dio bitcoina u vlastitoj pohrani kao novac, dio izloženosti kroz ETF u brokerskom portfelju, manji dio kroz Bitcoin rizničke kompanije kao kapitalni rizik, mali dio na burzi samo radi likvidnosti i jasan plan prijelaza prema većoj samostalnoj pohrani ako znanje i obiteljska spremnost porastu.",
          "Navedeno nije preporuka, nego primjer kako razmišljati o ulogama različitih dijelova imovine.",
          "Svačija situacija je drukčija. Netko nema obitelj. Netko ima malu djecu. Netko ima supružnika koji ne želi ništa znati o Bitcoinu. Netko ima postojeći portfelj vrijednosnih papira. Netko ima firmu. Netko ima većinu neto imovine u nekretnini. Netko ima dug. Netko tek počinje.",
          "Zato plan ne može biti isti.",
        ],
        cards: [
          {
            title: "Jezgra",
            text: "Dio koji ima ulogu dugoročnog novca i za koji postoji ozbiljan plan sigurnosti.",
          },
          {
            title: "Prijelaz",
            text: "Dio koji ostaje u jednostavnijem obliku dok znanje, obitelj i dokumentacija ne sustignu iznos.",
          },
          {
            title: "Kapitalni rizik",
            text: "Dio koji se svjesno tretira kao vrijednosni papir ili poslovna izloženost, ne kao vlastiti bitcoin.",
          },
          {
            title: "Likvidnost",
            text: "Mali operativni dio koji služi kupnji, prodaji, testiranju ili kratkoročnom prijelazu.",
          },
        ],
        link: {
          before: "Za razliku između samostalne pohrane i skrbnika pogledajte",
          label: "Samostalna pohrana ili skrbnik",
          href: "/vodici/samostalna-pohrana-ili-skrbnik/",
          after: "kao povezani okvir odluke.",
        },
      },
      {
        heading: "Uloga savjetovanja",
        body: [
          "U Bitcoin savjetovanju možemo razgovarati o ovim pitanjima bez ideološkog pritiska.",
          "Ne moramo odmah zaključiti da sve mora biti u samostalnoj pohrani. Ne moramo zaključiti ni da je ETF dovoljan.",
          "Prvo treba razumjeti koliki je iznos, što je cilj, koji je vremenski horizont, koliko obitelj razumije, postoji li brokerski portfelj, postoji li postojeći porezni ili pravni okvir, koliko osoba želi tehničke odgovornosti, koliko je važna otpornost na cenzuru, koliko je važna jednostavnost nasljeđivanja, koliko je važna likvidnost i koliko je važan prihod.",
          "Ja ne mogu dati investicijski, porezni ili pravni savjet o tome što točno kupiti, držati ili prodati.",
          "Ali mogu pomoći razjasniti logiku. Mogu pomoći razlikovati novac od kapitala. Mogu pomoći vidjeti gdje skrbnik ima mjesto, a gdje je nepotreban rizik. Mogu pomoći napraviti plan prijelaza. Mogu pomoći da odluka bude mirnija.",
        ],
        calloutTitle: "Cilj nije pogoditi proizvod",
        callout:
          "Cilj razgovora je razjasniti ulogu: što je novac, što je kapital, što je prijelazno rješenje i gdje obitelj stvarno razumije rizik.",
        link: {
          before: "Ako želite razgovarati o vlastitoj situaciji, krenite od",
          label: "uvodnog Bitcoin razgovora",
          href: "/razgovor/",
          after: "bez potrebe da unaprijed imate gotov odgovor.",
        },
      },
      {
        heading: "Zaključak",
        body: [
          "Bitcoin nije samo jedna odluka. Nije samo kupiti ili ne kupiti. Nije samo burza ili hardverski novčanik. Nije samo ETF ili vlastiti ključevi.",
          "Za ozbiljnu osobu i obitelj, Bitcoin postaje pitanje strukture imovine.",
          "Jedan dio može biti novac pod osobnom kontrolom. Jedan dio može biti kapitalna izloženost. Jedan dio može biti prijelazno rješenje. Jedan dio može biti neprikladan, ako rizik nije shvaćen.",
          "ETF-ovi, burze i Bitcoin rizničke kompanije imaju svoje mjesto. Ali samo ako znamo što jesu.",
          "Nisu isto što i bitcoin u vlastitom posjedu. Nisu isto što i obiteljski višepotpisni trezor. Nisu nužno loši. Nisu nužno dobri.",
          "To su alati, a alati imaju smisla samo kada znamo zašto ih koristimo.",
        ],
        calloutTitle: "Najkraći sažetak",
        callout:
          "Ako je alat povezan s Bitcoinom, to još ne znači da ima istu ulogu kao bitcoin pod vlastitim ključevima.",
        link: {
          before: "Za preporučeni dugoročni sustav pročitajte",
          label: "Bitcoin Core Standard",
          href: "/vodici/bitcoin-core-standard/",
          after: "kao kontrast financijskoj izloženosti Bitcoinu.",
        },
      },
    ],
    finalCta: "Dogovorite uvodni Bitcoin razgovor",
    finalCtaPrompt:
      "Ako imate Bitcoin izloženost kroz ETF, burzu, brokera ili Bitcoin rizničku kompaniju, vrijedi razjasniti što točno posjedujete i koju ulogu to ima u vašoj neto imovini.",
  },
  {
    slug: "bitcoin-bilanca-pojacana-izlozenost",
    title: "Bitcoin, bilanca i pojačana izloženost",
    seoTitle: "Bitcoin, bilanca i pojačana izloženost",
    metaDescription:
      "Napredni vodič o Bitcoin riznicama, povlaštenim instrumentima, digitalnom kreditu, pojačanoj izloženosti i riziku bilance. Nije svaki instrument povezan s Bitcoinom isto što i Bitcoin.",
    excerpt:
      "Financijski instrumenti povezani s Bitcoinom nisu Bitcoin. Prije prinosa treba razumjeti bilancu, kapitalnu strukturu, skrbništvo, izdavatelja i što se događa pod stresom.",
    category: "Neto imovina",
    difficulty: "Napredno",
    freshness: "često se mijenja",
    theme: "worth",
    order: 93,
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    practicalQuestion:
      "Možete li za svaki instrument povezan s Bitcoinom objasniti što točno posjedujete, tko kontrolira Bitcoin i što se događa ako bilanca dođe pod stres?",
    relatedSlugs: [
      "svaki-euro-ima-namjenu",
      "dug-je-buduci-novac",
      "davanje-u-proracunu-nulte-osnove",
      "bitcoin-kao-novac",
      "bitcoin-u-neto-imovini",
      "bitcoin-etfovi-i-riznicke-kompanije",
      "digitalni-kredit-nije-bitcoin",
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
    ],
    safetyNote:
      "Ovaj vodič nije investicijski savjet, nije porezni savjet, nije pravni savjet ni računovodstveni savjet. Ne preporučuje kupnju ili prodaju Bitcoina, Strategyja, Strivea, STRC-a, SATA-e, dionica, povlaštenih dionica, dužničkih instrumenata ili drugih financijskih instrumenata.",
    visual: {
      type: "sequence",
      title: "Slojevi izloženosti",
      steps: [
        "Izravan Bitcoin",
        "Bitcoin kod skrbnika",
        "Dionica poduzeća s Bitcoin riznicom",
        "Povlašteni ili dužnički instrument",
      ],
      caption:
        "Što je sloj udaljeniji od Bitcoina, to je važnije razumjeti pravila, bilancu i ljude koji upravljaju slojem.",
    },
    sections: [
      {
        heading: "Bitcoin nije isto što i instrument izgrađen na Bitcoinu",
        body: [
          "Izravno držanje Bitcoina nije isto što i držanje obične dionice poduzeća koje drži Bitcoin. Dionica poduzeća s Bitcoin riznicom nije isto što i povlaštena dionica tog poduzeća. Instrument koji isplaćuje dividendu nije isto što i Bitcoin.",
          "Čitatelj mora znati što točno posjeduje. Je li to Bitcoin pod vlastitom kontrolom? Je li to potraživanje prema skrbniku? Je li to vlasnički udio u poduzeću? Je li to instrument čija isplata ovisi o pravilima izdavatelja?",
          "Što je sloj udaljeniji od Bitcoina, to više morate razumjeti bilancu, pravila i ljude koji upravljaju tim slojem.",
        ],
        link: {
          before:
            "Ako prvo želite razdvojiti Bitcoin od vrijednosnih papira, pročitajte",
          label:
            "Bitcoin ETF-ovi i rizničke kompanije: gdje prestaje Bitcoin, a počinje kapital",
          href: "/vodici/bitcoin-etfovi-i-riznicke-kompanije/",
          after: "kao uvod u ovu temu.",
        },
      },
      {
        heading: "Četiri sloja izloženosti",
        body: [
          "Prvi sloj je izravan Bitcoin. Posjedujete bitcoin, a glavno pitanje je tko kontrolira ključeve. Ako imate vlastiti posjed, glavni rizik nije izdavatelj, nego sigurnost, oporavak i obiteljski pristup.",
          "Drugi sloj je Bitcoin kod skrbnika. Posjedujete potraživanje ili račun koji vam daje izloženost Bitcoinu. Skrbnik kontrolira operativni pristup, a glavni rizik je povjerenje, pravila računa i dostupnost sredstava.",
          "Treći sloj je obična dionica poduzeća s Bitcoin riznicom. Posjedujete dionicu, ne bitcoin. Uprava poduzeća kontrolira Bitcoin, kapitalnu strukturu i odluke o izdavanju novih instrumenata.",
          "Četvrti sloj je povlašteni ili dužnički instrument izgrađen na Bitcoin bilanci. Posjedujete vrijednosni papir s pravilima isplate, pravima i ograničenjima. Glavni rizik je bilanca izdavatelja, kreditni rizik, tržišna likvidnost i redoslijed naplate.",
        ],
        items: [
          "Što posjedujem: novac, potraživanje, običnu dionicu ili instrument s pravilima isplate?",
          "Tko kontrolira Bitcoin: ja, skrbnik, uprava poduzeća ili struktura izdavatelja?",
          "Koji je glavni rizik: sigurnost, skrbništvo, upravljanje, kreditni rizik ili tržišno povjerenje?",
          "Zašto to nije isto što i Bitcoin: jer svaki dodatni sloj uvodi pravila, ljude i bilancu.",
        ],
        visual: balanceExposureSectionImage(
          "Slojevi nisu ista stvar.",
          "Bitcoin, skrbnički račun, dionica i instrument s pravilima isplate mogu biti povezani s istom temom, ali nose različita prava i različite rizike.",
          "bitcoin-bilanca-pojacana-izlozenost-slojevi-20260702.webp",
          "Mediteranski stol s odvojenim Bitcoin kamenom, mapom, praznim papirima i certifikatom kao slojevima izloženosti"
        ),
      },
      {
        heading:
          "Mala prodaja Bitcoina ne mora značiti odustajanje od Bitcoin teze",
        body: [
          "Poduzeće koje koristi Bitcoin kao kapital može ponekad prodati mali dio Bitcoina radi obveza, dividendi ili upravljanja bilancom. To nije automatski znak slabosti.",
          "Takva prodaja može značiti da se Bitcoin tretira kao likvidan kapital, a ne kao nedodirljiva ikona. Kapital postoji da bi služio pravilima, obvezama i dugoročnom preživljavanju sustava.",
          "Ali postoji velika razlika između male, promišljene prodaje i prisilne prodaje. Promišljena prodaja dolazi iz pravila. Prisilna prodaja dolazi iz stresa, duga, manjka likvidnosti ili izgubljenog povjerenja.",
          "Strategy se u javnim razgovorima često koristi kao primjer poduzeća koje oko Bitcoina gradi kapitalnu strukturu. To ne znači da je Strategy preporuka. Znači samo da primjer pomaže vidjeti kako Bitcoin može postati aktivan dio bilance.",
          "Bitcoin kao novac ne znači da se nikada ne koristi. Znači da se koristi po pravilima, a ne iz panike.",
        ],
      },
      {
        heading: "Bilanca prije prinosa",
        body: [
          "Visok prinos nije prvo pitanje. Prvo pitanje je može li bilanca preživjeti loš scenarij.",
          "Važno je ima li poduzeće dug. Važno je postoji li zid dospijeća. Važno je je li Bitcoin založen ili je riječ o neopterećenom Bitcoinu. Važno je postoji li pričuva za dividende.",
          "Važno je i može li poduzeće preživjeti razdoblje bez pristupa tržištima kapitala. Ako novo izdavanje dionica, povlaštenih dionica ili duga mora stalno dolaziti da bi sustav disao, bilanca je osjetljivija nego što prinos pokazuje.",
          "Novčana pričuva nije detalj. Ona može biti razlika između mirne odluke i prodaje u lošem trenutku.",
          "Prinos bez razumijevanja bilance nije ulaganje. To je nada.",
        ],
        visual: balanceExposureSectionImage(
          "Bilanca dolazi prije prinosa.",
          "Prije pitanja koliko instrument nosi, treba vidjeti može li sustav preživjeti rokove, obveze i razdoblje bez novog kapitala.",
          "bitcoin-bilanca-pojacana-izlozenost-bilanca-prije-prinosa-20260702.webp",
          "Mediteranska scena s vagom, Bitcoin kamenom, kuvertom pričuve i praznim bilančnim papirima"
        ),
        link: {
          before: "Za osobnu stranu iste logike počnite od vodiča",
          label: "Svaki euro ima namjenu",
          href: "/vodici/svaki-euro-ima-namjenu/",
          after: "jer bilanca bez proračuna lako postaje samo dojam.",
        },
      },
      {
        heading: "Pojačana izloženost",
        body: [
          "Pojačana izloženost znači da obična dionica može biti osjetljivija na rast Bitcoina nego sama pasivna Bitcoin imovina u pozadini. To se može dogoditi kada poduzeće kroz kapitalnu strukturu pokušava povećati Bitcoin po dionici.",
          "To može biti korisno u nekim okolnostima. Ali povećana osjetljivost djeluje u oba smjera. Ako Bitcoin pada, ako tržište izgubi povjerenje ili ako bilanca postane krhka, isti mehanizam može pojačati gubitak.",
          "Poluga može biti izravna ili neizravna. Ponekad dolazi iz duga, ponekad iz strukture prava različitih vrijednosnih papira, a ponekad iz tržišnog vrednovanja obične dionice.",
          "Zato je omjer pojačane izloženosti važan podatak, ali nije dovoljan. Još je važnije što stoji ispod njega: dug, rokovi, zalog, pričuve, obične dionice, povlaštene dionice i ponašanje izdavatelja.",
          "Postoje dvije vrste rizika. Prvi je rizik trajnog oštećenja bilance. Drugi je rizik da se ne sudjeluje dovoljno u rastu Bitcoina.",
          "Drugi rizik ima smisla tek kada je prvi strogo ograničen.",
        ],
        visual: balanceExposureSectionImage(
          "Pojačana izloženost nije samo rast.",
          "Leća koja pojačava rast može pojačati i pad. Zato omjer izloženosti nikada nije dovoljan bez bilance ispod njega.",
          "bitcoin-bilanca-pojacana-izlozenost-pojacana-20260702.webp",
          "Mediteranski stol s Bitcoin kamenom, mehaničkom lećom i dvama razdvojenim kamenim putevima"
        ),
      },
      {
        heading: "SATA i dnevne dividende",
        body: [
          "SATA koristim kao primjer instrumenta koji se u razgovoru promatra kroz dnevne dividende, likvidnost i odnos prema Bitcoin bilanci. STRC je drugi primjer instrumenta povezanog s kapitalnom strukturom izdavatelja. Ni SATA ni STRC nisu Bitcoin.",
          "Dnevna dividenda mijenja ponašanje ulagača jer se ne čeka jedan veliki datum. Prinos se doživljava kroz kraći ritam. To može povećati pažnju tržišta i promijeniti način vrednovanja instrumenta.",
          "To ne uklanja rizik. Dnevna dividenda nije jamstvo sigurnosti. Ona je pravilo ili cilj instrumenta, ovisno o njegovim uvjetima i odlukama izdavatelja.",
          "Stabilnija cijena oko nominalne vrijednosti nije isto što i uklanjanje rizika. Nominalna vrijednost je vrijednost zapisana u pravilima instrumenta. Tržišna cijena može se kretati oko nje, ali to ne znači da bilanca nema rizik.",
          "Zato se SATA ne smije gledati samo kroz prinos. Treba gledati izdavatelja, pričuvu za dividende, tržišnu likvidnost, kreditni rizik i ponašanje instrumenta pod stresom.",
        ],
        visual: balanceExposureSectionImage(
          "Dnevni ritam ne uklanja rizik.",
          "Kraći ritam isplate može biti psihološki privlačan, ali sigurnost i dalje ovisi o izdavatelju, pravilima, pričuvi i tržišnoj likvidnosti.",
          "bitcoin-bilanca-pojacana-izlozenost-dnevne-dividende-20260702.webp",
          "Mediteranski stol s nizom praznih dnevnih kartica, kuvertom pričuve i odvojenim Bitcoin kamenom"
        ),
      },
      {
        heading: "Stresno ispitivanje bilance",
        body: [
          "Stresno ispitivanje nije pesimizam. To je način da se odluka donese prije panike.",
          "Što bi se dogodilo ako Bitcoin padne 50%? Što ako pristup tržištima kapitala nestane na godinu dana? Što ako se dividende moraju plaćati iz pričuve? Što ako se potražnja za novim instrumentima uspori?",
          "Što ako obična dionica padne? Što ako tržište izgubi povjerenje u izdavatelja? Što ako založeni Bitcoin mora biti prodan? Što ako dug dospijeva u najgorem trenutku?",
          "Ako odgovor nije jasan, problem nije samo u instrumentu. Problem je u tome što odluka nije prošla kroz loš scenarij prije nego što je donesena.",
        ],
        items: [
          "Bitcoin padne 50%.",
          "Pristup tržištima kapitala nestane na godinu dana.",
          "Dividende se moraju plaćati iz pričuve.",
          "Potražnja za novim instrumentima se uspori.",
          "Obična dionica padne.",
          "Tržište izgubi povjerenje u izdavatelja.",
          "Založeni Bitcoin mora biti prodan.",
          "Dug dospijeva u najgorem trenutku.",
        ],
        visual: balanceExposureSectionImage(
          "Stres test je mirna priprema.",
          "Pitanja o padu, dugu, dividendi, založenom Bitcoinu i likvidnosti treba proći dok je odluka još mirna.",
          "bitcoin-bilanca-pojacana-izlozenost-stres-bilance-20260702.webp",
          "Mediteranski stol s praznim checklistama, Bitcoin kamenom, mapom bilance i olujnim morem u pozadini"
        ),
      },
      {
        heading: "Pojačana izloženost mora se mijenjati kroz cikluse",
        body: [
          "Omjer pojačane izloženosti ne treba biti fiksan. Ista izloženost ne znači isto u mirnom razdoblju, nakon snažnog pada ili nakon razdoblja euforije.",
          "U silaznom tržištu, kada je Bitcoin već snažno pao, pojačana izloženost može imati drukčiju logiku. Tada se često gradi kapacitet, pod uvjetom da bilanca može preživjeti.",
          "U uzlaznom tržištu, kada svi postanu sigurni u sebe, ista pojačana izloženost može postati opasnija. Rast može sakriti slabosti, a samopouzdanje može potaknuti previše duga ili premalo pričuve.",
          "Nitko ne zna savršeno pogoditi ciklus. Zato je važan sustav, a ne osjećaj.",
          "U silaznom tržištu gradi se kapacitet. U uzlaznom tržištu smanjuje se krhkost.",
        ],
        visual: balanceExposureSectionImage(
          "Ciklus mijenja značenje iste izloženosti.",
          "Ista pojačana izloženost ne znači isto nakon pada, u mirnom razdoblju i u euforiji.",
          "bitcoin-bilanca-pojacana-izlozenost-ciklusi-20260702.webp",
          "Mediteranski stol s kamenim ciklusom oko prazne bilježnice i Bitcoin kamenom"
        ),
        link: {
          before: "Za osobna pravila kroz rast i pad pogledajte",
          label:
            "Usklađivanje kupovne moći: što raditi kad Bitcoin raste ili pada?",
          href: "/vodici/uskladivanje-kupovne-moci-bitcoina/",
          after: "jer tržište ne smije donositi odluke umjesto vas.",
        },
      },
      {
        heading: "Digitalni kredit",
        body: [
          "Digitalni kredit je dužnički instrument koji je podržan bilancom u kojoj važnu ulogu ima digitalna imovina, u ovom slučaju Bitcoin.",
          "Kroz povijest su tržišta stvarala instrumente za raspodjelu velikog rizika. Nekada su to bili brodovi i trgovačke ekspedicije. Nizozemska istočnoindijska kompanija, poznata po oznaci VOC, često se spominje kao rani primjer organiziranja kapitala oko velikih i rizičnih pothvata.",
          "Danas se pojavljuju instrumenti izgrađeni oko Bitcoin bilanci. To ne znači da su automatski dobri. To znači da se oko novog novca razvijaju novi oblici kapitala.",
          "Analogija pomaže samo ako ostane skromna. Povijest ne uklanja kreditni rizik, rizik uprave, rizik skrbništva, rizik regulacije ni oportunitetni trošak.",
        ],
        visual: balanceExposureSectionImage(
          "Digitalni kredit je sloj iznad Bitcoina.",
          "Kada se oko Bitcoin bilance grade novi instrumenti, važno je vidjeti most između novca, ugovora i izdavatelja.",
          "bitcoin-bilanca-pojacana-izlozenost-digitalni-kredit-20260702.webp",
          "Mediteranski stol s Bitcoin kamenom, papirnatim mostom od praznih ugovora, kompasom i zatvorenom kuvertom"
        ),
        link: {
          before: "Za osnovnu razliku između novca i ugovora pročitajte",
          label: "Digitalni kredit nije Bitcoin",
          href: "/vodici/digitalni-kredit-nije-bitcoin/",
          after: "kao kraći uvod u ovu temu.",
        },
      },
      {
        heading: "Prije nego kupite instrument povezan s Bitcoinom",
        body: [
          "Prije nego kupite instrument povezan s Bitcoinom, odgovorite na ova pitanja.",
          "Posjedujem li Bitcoin ili potraživanje prema nekome? Tko kontrolira Bitcoin? Je li Bitcoin založen? Postoji li dug? Kada dug dospijeva? Postoji li pričuva za dividende?",
          "Kako se dividenda isplaćuje? Što se događa ako Bitcoin padne 50%? Što se događa ako tržište kapitala zatvori vrata? Mogu li biti razrijeđen kao dioničar?",
          "Koliki je moj povrat izražen u Bitcoinu, a ne samo u eurima ili dolarima? Razumijem li tko prvi prima novac ako stvari krenu loše? Je li ovo ulaganje ili samo složeniji način da izbjegnem držati Bitcoin?",
        ],
        items: [
          "Posjedujem li Bitcoin ili potraživanje prema nekome?",
          "Tko kontrolira Bitcoin?",
          "Je li Bitcoin založen?",
          "Postoji li dug?",
          "Kada dug dospijeva?",
          "Postoji li pričuva za dividende?",
          "Kako se dividenda isplaćuje?",
          "Što se događa ako Bitcoin padne 50%?",
          "Što se događa ako tržište kapitala zatvori vrata?",
          "Mogu li biti razrijeđen kao dioničar?",
          "Koliki je moj povrat izražen u Bitcoinu, a ne samo u eurima ili dolarima?",
          "Razumijem li tko prvi prima novac ako stvari krenu loše?",
          "Je li ovo ulaganje ili samo složeniji način da izbjegnem držati Bitcoin?",
        ],
        link: {
          before:
            "Za širu ravnotežu u kojoj ovakvi instrumenti imaju ili nemaju mjesto pročitajte",
          label: "Bitcoin i ravnoteža neto imovine",
          href: "/vodici/bitcoin-u-neto-imovini/",
          after: ".",
        },
      },
      {
        heading: "Završetak",
        body: [
          "Bitcoin financijski instrumenti nisu Bitcoin. Oni su slojevi iznad Bitcoina. Mogu povećati izloženost, likvidnost i prinos, ali uvode dodatne rizike: bilancu, upravljanje, kapitalnu strukturu, dividende, tržišno povjerenje, skrbništvo, zakonodavni okvir i ponašanje izdavatelja.",
          "Zato ih ne treba procjenjivati samo po tome koliko Bitcoina neka tvrtka drži. Treba gledati cijelu bilancu i što se događa pod stresom.",
          "Ako instrument ne možete objasniti mirno, nećete ga razumjeti bolje kada tržište postane nemirno. Ako bilanca nije jasna, prinos nije dovoljan razlog.",
          "Bitcoin traži više reda, ne manje.",
        ],
        link: {
          before:
            "Ako vrijednost raste, sigurnosna pravila moraju rasti s njom. Za taj dio nastavite s vodičem",
          label: "Sigurnost ne smije ovisiti samo o vama",
          href: "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/",
          after: ".",
        },
      },
    ],
    finalCta: "Dogovorite 15-minutni razgovor",
    finalCtaTitle: "Želite razumjeti što Bitcoin znači za vašu bilancu?",
    finalCtaPrompt:
      "U 15 minuta možemo vidjeti gdje ste sada: proračun, dug, Bitcoin, likvidnost, neto imovina i sigurnost.",
  },
  {
    slug: "bitcoin-kao-stopa-prepreke",
    title: "Bitcoin kao stopa prepreke za financijske odluke",
    metaDescription:
      "Ako Bitcoin postane vaš primarni novac, svaka odluka o potrošnji, ulaganju, poslu i neto imovini treba odgovoriti na jedno pitanje: je li ovo bolje od držanja Bitcoina?",
    excerpt:
      "Bitcoin kao primarni novac mijenja način procjene potrošnje, ulaganja, posla i neto imovine. Svaka odluka mora opravdati zašto je bolja od držanja Bitcoina.",
    category: "Neto imovina",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 91,
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-01",
    practicalQuestion:
      "Koja bi velika odluka u vašoj neto imovini još uvijek imala smisla kada biste je morali usporediti s držanjem Bitcoina?",
    relatedSlugs: [
      "bitcoin-u-neto-imovini",
      "pravilo-trecina",
      "novac-kapital-potrosnja",
      "bitcoin-kao-novac",
    ],
    safetyNote:
      "Ovaj vodič nije investicijski, porezni ni pravni savjet. Ne preporučuje kupnju ili prodaju Bitcoina, nekretnina, dionica, fondova ili drugih financijskih instrumenata.",
    visual: {
      type: "network",
      title: "Bitcoin kao mjerilo odluke",
      center: "Je li ovo bolje od držanja Bitcoina?",
      nodes: ["potrošnja", "ulaganje", "posao", "neto imovina"],
      caption:
        "Stopa prepreke traži jasan razlog za odricanje od kupovne moći.",
    },
    sections: [
      {
        heading: "Početna točka se mijenja",
        body: [
          "Većina ljudi financijske odluke mjeri u državnom novcu. Pita koliko će zaraditi u eurima, koliki je godišnji prinos, koliko će vrijediti nekretnina, koliko kamata plaća banka i koliko može dobiti u odnosu na ono što ima danas.",
          "To je razumljivo. Državni novac je još uvijek novac u kojem se isplaćuju plaće, plaćaju računi, vode porezne obveze i prikazuje većina cijena. Ali kada osoba počne ozbiljno razumijevati Bitcoin, početna točka se mijenja.",
          "Pitanje više nije samo koliko mogu dobiti u eurima. Pitanje postaje: je li ova odluka bolja od držanja Bitcoina? To je Bitcoin kao stopa prepreke. Ne kao formula za brzo bogaćenje, prognoza cijene ili razlog da se sve drugo zanemari, nego kao mjerilo za trezveno odlučivanje.",
          "Ako je Bitcoin novac koji dugoročno može rasti u kupovnoj moći, tada svaka odluka kojom se odričete Bitcoina mora imati dobar razlog. Potrošnja mora opravdati korist. Ulaganje mora opravdati rizik. Poslovni projekt mora opravdati vrijeme, trud i neizvjesnost. Dug mora opravdati budući odljev, a najčešće ga ne može opravdati.",
        ],
      },
      {
        heading: "Što znači stopa prepreke",
        body: [
          "Stopa prepreke znači najmanji prihvatljivi prinos koji neka odluka mora prijeći da bi imala smisla. Ako netko može držati novac u sigurnijem obliku i dobiti određeni rezultat, tada rizičnija odluka mora ponuditi bolji rezultat.",
          "Na državnom novcu ta je logika često iskrivljena. Ako novac gubi kupovnu moć, čovjek osjeća pritisak da nešto napravi s njim. Kupi nekretninu, dionice, fond, poslovni projekt ili nešto samo zato što će novac ionako izgubiti vrijednost.",
          "U takvom okruženju odluka često ne počinje iz jasnoće, nego iz bijega. Bitcoin mijenja to pitanje. Ako imate oblik novca koji ne ovisi o političkom povećanju ponude, držanje novca ponovno postaje ozbiljna odluka. Možete stati, usporediti i pitati zašto biste se odrekli Bitcoina da biste ušli u ovu odluku.",
        ],
        link: {
          before: "Za širi pogled na ulogu Bitcoina u osobnoj slici pročitajte",
          label: "vodič o Bitcoinu u neto imovini",
          href: guideHref("bitcoin-u-neto-imovini"),
          after: ".",
        },
      },
      {
        heading: "Bitcoin ne uklanja ulaganje",
        body: [
          "Bitcoin kao stopa prepreke ne znači da nikada ne treba ulagati, graditi posao, kupovati proizvodnu imovinu ili stvarati druge izvore prihoda. Naprotiv, Bitcoin može pomoći da se bolje odluke jasnije vide.",
          "Ako nešto ne može prijeći Bitcoin kao stopu prepreke, možda nije ulaganje. Možda je samo složeni način da se preuzme rizik koji ne razumijete. Ali ako posao, alat, vještina, odnos, proizvodna imovina ili poslovni projekt povećava sposobnost stvaranja vrijednosti, tada može imati smisla.",
          "Bitcoin ne zamjenjuje rad, služenje klijentima ni sposobnost stvaranja proizvoda, usluge ili poslovnog sustava. Bitcoin samo postavlja strože pitanje: je li ova odluka dovoljno dobra da se odreknem dijela sadašnje ili buduće kupovne moći koju bih mogao držati u Bitcoinu?",
        ],
      },
      {
        heading: "Potrošnja pod Bitcoin standardom",
        body: [
          "Na državnom novcu potrošnja često izgleda manje skupo nego što jest. Ako novac gubi vrijednost, trošenje se može činiti racionalnim. Ali na Bitcoin standardu trošak postaje jasniji.",
          "Kada potrošite novac, ne odričete se samo današnjih eura. Odričete se i mogućnosti da taj dio kupovne moći ostane u tvrđem novcu. To ne znači da ne treba trošiti. Obitelj treba dom, hranu, obrazovanje, zdravlje, alate, vrijeme i pažnju.",
          "Bitcoin kao stopa prepreke pomaže razlikovati potrošnju koja služi životu od potrošnje koja samo puni prazninu. Pitanje nije smijem li ovo kupiti, nego je li korist od ove kupnje veća od kupovne moći koje se odričem.",
        ],
      },
      {
        heading: "Ulaganje pod Bitcoin standardom",
        body: [
          "Na državnom novcu često je dovoljno da ulaganje izgleda dobro nominalno. Ako nešto raste u novcu koji gubi kupovnu moć, nominalni rast može sakriti stvarni gubitak.",
          "Na Bitcoin standardu nije dovoljno pitati hoće li nešto rasti u eurima. Treba pitati hoće li odluka opravdati odricanje od Bitcoina. To vrijedi za nekretnine, dionice, obveznice, poslovne udjele, privatne projekte, financijske instrumente i vlastiti posao.",
          "Dobra odluka mora biti razumljiva, imati razlog za stvaranje vrijednosti, odnos prema vremenu, rizik koji možete podnijeti, izlaz ako ste pogriješili i jasan odnos prema Bitcoinu. Ako nema dobrog odgovora zašto je odluka bolja od držanja Bitcoina, možda ne zaslužuje vaš novac.",
        ],
      },
      {
        heading: "Posao kao proizvodna imovina",
        body: [
          "Bitcoin kao stopa prepreke posebno je važan za poduzetnike. Poduzetnik stalno odlučuje gdje usmjeriti novac: u zalihe, ljude, opremu, prodaju, softver, prostor, edukaciju, pričuvu, smanjenje duga ili Bitcoin na bilanci.",
          "Poslovni novac treba jasne slojeve: kratkoročne obveze, pričuvu za slabije mjesece, Bitcoin na bilanci za dio koji nije potreban odmah i proizvodnu imovinu koja povećava sposobnost stvaranja vrijednosti.",
          "Takav red pomaže vlasniku posla pitati hoće li nova oprema, osoba, trošak prodaje ili projekt stvarno stvoriti više vrijednosti nego da novac ostane u Bitcoinu. To ne usporava posao. To čuva posao od rasipanja.",
        ],
      },
      {
        heading: "Neto imovina kao jedna cjelina",
        body: [
          "Mnogi ljudi razmišljaju odvojeno: malo štednje, malo ulaganja, malo nekretnine, malo mirovinskog fonda, malo Bitcoina, malo potrošnje i možda neki dug. Svaka stavka ima svoju priču, ali ne postoji jedna jasna slika.",
          "Bitcoin standard traži drukčiji pogled. Neto imovina je jedna cjelina. U toj cjelini svaka stavka ima funkciju: Bitcoin je novac, potrošna dobra služe životu, proizvodna imovina pomaže stvarati buduće prihode, financijski instrumenti su ugovori ili vlasnički udjeli, a dug je budući novac koji je već potrošen.",
          "Kada se sve stavi u jednu sliku, pitanje postaje jasnije: koju ulogu ova stavka ima u mom životu? Ako ne znate odgovor, stavka vjerojatno postoji iz navike, straha, nade ili tuđeg savjeta.",
        ],
        link: {
          before: "Ako trebate jednostavniju podjelu, nastavite s",
          label: "pravilom trećina",
          href: guideHref("pravilo-trecina"),
          after: ".",
        },
      },
      {
        heading: "Što ova ideja nije",
        body: [
          "Bitcoin kao stopa prepreke nije poziv da sav novac držite u Bitcoinu, da zanemarite kratkoročne obveze, da ne ulažete u posao, da ne kupite dom ako je to razumna obiteljska odluka ili da svaki obrok, dar i obiteljski izlet mjerite prema budućoj cijeni Bitcoina.",
          "Nije poziv na paralizu. To je poziv na red. Ako Bitcoin postane vaš primarni novac, odluke više ne smiju biti vođene panikom državnog novca. Ne morate bježati u svaku priliku, vjerovati svakoj priči o prinosu, prihvatiti dug kao normalan ili kupovati ono što vam ne treba samo zato što novac stoji.",
        ],
      },
      {
        heading: "Pitanja prije veće odluke",
        body: [
          "Prije veće potrošnje, ulaganja ili poslovne odluke korisno je proći kroz konkretna pitanja. Ako odgovor nije jasan, odluka može pričekati. Državni novac čovjeka gura da žuri. Bitcoin mu vraća prostor za razmišljanje.",
        ],
        items: [
          "Koju funkciju ova odluka ima u mom životu ili poslu?",
          "Je li ovo potrošnja, proizvodna imovina, financijski instrument, darivanje ili obveza?",
          "Koliko se Bitcoina odričem ovom odlukom?",
          "Koji je najgori razuman ishod i mogu li ga podnijeti bez duga ili prisilne prodaje Bitcoina?",
          "Je li očekivana korist veća od jednostavnog držanja Bitcoina?",
          "Razumijem li odluku dovoljno dobro da je mogu objasniti obitelji ili poslovnom partneru?",
          "Je li odluka u skladu s proračunom, sigurnošću i ravnotežom neto imovine?",
        ],
      },
      {
        heading: "Zaključak",
        body: [
          "Bitcoin kao stopa prepreke ne znači da Bitcoin postaje jedina stvar u životu. Znači da Bitcoin postaje mjerilo ozbiljnosti.",
          "Potrošnja mora imati svrhu. Ulaganje mora imati bolji razlog od nominalnog rasta. Posao mora stvarati stvarnu vrijednost. Dug mora biti iznimka, a ne navika. Neto imovina mora imati red.",
          "Kada Bitcoin postane novac, svaka financijska odluka postaje iskrenija. Više nije dovoljno pitati koliko nešto može vrijediti u državnom novcu. Treba pitati što se događa s vašom kupovnom moći, slobodom, vremenom i sposobnošću da mirno odlučujete.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaTitle: "Imate Bitcoin? Izgradite osobni Bitcoin standard.",
    finalCtaPrompt:
      "Ako želite usporediti potrošnju, ulaganja, posao i neto imovinu s Bitcoinom kao mjerilom, krenite od razgovora.",
  },
  {
    slug: "od-duga-prema-vlasnistvu",
    title: "Od društva duga prema društvu vlasništva",
    metaDescription:
      "Državni novac potiče dug, potrošnju budućeg novca i život pod stalnim obvezama. Bitcoin otvara drukčiji put: štednju, vlasništvo, pozitivne priljeve i dugoročnu odgovornost.",
    excerpt:
      "Dug je budući novac koji ste već potrošili. Bitcoin vraća ozbiljnost štednji i pomaže prijeći iz života pod obvezama prema vlasništvu i odgovornosti.",
    category: "Život bez duga",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 32,
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-01",
    practicalQuestion:
      "Koji dio vašeg budućeg novca je već obećan prošlim odlukama?",
    relatedSlugs: [
      "dug-je-buduci-novac",
      "ne-zaduzujte-se-za-bitcoin",
      "stvarni-visak",
      "svaki-euro-ima-namjenu",
    ],
    safetyNote:
      "Ovaj vodič nije kreditni, investicijski, porezni ni pravni savjet. Služi kao okvir za razumijevanje odnosa između duga, štednje, vlasništva i osobnog Bitcoin standarda.",
    visual: {
      type: "split",
      title: "Dug i vlasništvo",
      leftLabel: "Dug",
      leftItems: [
        "budući novac potrošen danas",
        "fiksne obveze",
        "manje izbora",
      ],
      rightLabel: "Vlasništvo",
      rightItems: ["sadašnja odgovornost", "stvarni višak", "više otpornosti"],
      caption: "Bitcoin ne uklanja odgovornost. On je čini vidljivijom.",
    },
    sections: [
      {
        heading: "Dug je postao normalan",
        body: [
          "Dug je postao toliko normalan da ga mnogi ljudi više ne vide kao posebnu odluku. Kartica, minus po računu, kupnja na rate, leasing, stambeni kredit, potrošački kredit, poslovna kreditna linija, refinanciranje i još jedna obveza često izgledaju kao običan dio života.",
          "U državnom novcu dug se često prikazuje kao alat napretka. Ako nešto želite sada, dug vam omogućuje da to dobijete prije nego što ste za to stvarno stvorili novac. Ali dug nije samo financijski proizvod.",
          "Dug je budući novac koji ste već potrošili. To znači da dio vaše budućnosti više nije slobodan. Kada sljedeći prihod dođe, dio tog prihoda ne pripada sadašnjim odlukama. Već je obećan prošlim odlukama.",
          "Bitcoin mijenja način na koji gledamo na dug jer vraća ozbiljnost štednji. Ako novac može dugoročno čuvati ili povećavati kupovnu moć, tada više nije očito da je bolje trošiti sada i plaćati kasnije.",
        ],
      },
      {
        heading: "Društvo duga",
        body: [
          "Društvo duga počinje s tihom pretpostavkom da će budućnost platiti sadašnjost. Osoba kupuje danas i plaća iz buduće plaće. Obitelj povećava životni standard prije nego što ga prihodi mogu nositi. Poduzeće širi poslovanje kreditom prije nego što je dokazalo stabilan stvarni višak.",
          "Ljudi uče razmišljati kroz mjesečnu ratu, ne kroz ukupni trošak. Pitaju mogu li nešto plaćati mjesečno, koliko im banka može odobriti i koliki je prinos ako koriste tuđi novac. Rjeđe pitaju trebaju li to uopće, koliko su stvarno slobodni i što se događa ako budućnost ne bude onakva kakvu su zamislili.",
          "Budućnost često ne surađuje. Prihodi kasne, troškovi rastu, zdravlje se promijeni, posao oslabi, kupovna moć padne ili obitelj treba nešto što nije bilo u planu. Tada dug pokazuje svoju pravu narav. On nije samo broj. On je pritisak.",
        ],
      },
      {
        heading: "Dug kao gubitak izbora",
        body: [
          "Najveći problem duga nije uvijek kamata. Najveći problem duga je gubitak izbora. Osoba bez duga može lakše promijeniti posao, odbiti lošeg klijenta, preživjeti slabiji mjesec, čuvati Bitcoin kroz pad kupovne moći i čekati bolju priliku.",
          "Osoba s dugom često ne može čekati. Mora prodati kada ne želi, prihvatiti posao koji ne želi, smanjiti darivanje, odgoditi sigurnost i donositi odluke iz napetosti. Dug tako ne zauzima samo prihod. Zauzima mir.",
          "Na Bitcoin standardu to postaje posebno važno. Ako osoba ima dug, visoke mjesečne obveze i malo likvidnosti, pad kupovne moći Bitcoina može je prisiliti na lošu odluku.",
        ],
        link: {
          before: "Zato temeljni vodič o dugu počinje jednostavnom rečenicom:",
          label: "dug je budući novac koji ste već potrošili",
          href: guideHref("dug-je-buduci-novac"),
          after: ".",
        },
      },
      {
        heading: "Društvo vlasništva",
        body: [
          "Društvo vlasništva počinje drukčijom pretpostavkom: sadašnjost treba služiti budućnosti. To ne znači da se danas ne smije živjeti. Znači da se budućnost ne smije stalno prodavati.",
          "U društvu vlasništva čovjek prvo stvara višak, zatim odlučuje što s njim. Gradi novčanu zalihu, smanjuje obveze, kupuje stvari koje može održavati, ulaže u proizvodnu imovinu koju razumije, daruje iz slobode i čuva Bitcoin kao novac.",
          "Vlasništvo nije samo posjedovanje imovine. Vlasništvo znači odgovornost. Ako nešto posjedujete, morate znati zašto to posjedujete, kako to čuvate, što to traži od vas i što ćete učiniti ako se okolnosti promijene.",
        ],
      },
      {
        heading: "Zašto državni novac potiče dug",
        body: [
          "Državni novac potiče dug jer stalno slabi povjerenje u štednju. Ako novac gubi kupovnu moć, ljudi ga ne žele držati. Traže nekretnine, dionice, obveznice, poslovne projekte, fondove ili bilo što što izgleda kao zaštita od pada kupovne moći.",
          "U takvom svijetu dug dobiva umjetnu privlačnost. Ako se novac obezvrjeđuje, čini se razumno posuditi danas i vraćati kasnije slabijim novcem. Ako cijene imovine rastu u državnom novcu, čini se razumno koristiti dug za kupnju imovine.",
          "Kada štednja ne radi, dug izgleda kao alat. Kada štednja ponovno postane moguća, dug se vidi jasnije. Bitcoin vraća mogućnost štednje u tvrdom novcu.",
        ],
      },
      {
        heading: "Od fiksne obveze prema vlasničkom riziku",
        body: [
          "Društvo duga voli fiksne obveze. Dužnik obećava plaćanje bez obzira na to što se dogodi. Ako posao uspije, plaća. Ako posao oslabi, plaća. Ako obitelj ima problem, plaća.",
          "U tvrđem novčanom sustavu obećanja se moraju ozbiljnije shvatiti. Ako novac nije lako stvarati iz ničega, rizik se ne može samo sakriti. Mora se nositi.",
          "Zato tvrđi novac prirodno više naglašava vlasništvo. Vlasnik sudjeluje u dobitku, ali nosi i gubitak. Za pojedinca to znači manje obećanja i više stvarnog posjedovanja. Za obitelj manje rata i više pričuve. Za posao manje rasta na dug i više rasta iz stvarnog viška.",
        ],
      },
      {
        heading: "Što to znači ako već imate Bitcoin",
        body: [
          "Ako već imate Bitcoin, pitanje nije samo koliko ga imate. Pitanje je u kakvom sustavu živite. Možete imati Bitcoin i još uvijek živjeti po pravilima državnog novca: imati potrošački dug, nemati proračun, ne znati stvarni višak, nemati plan za obitelj i donositi velike odluke iz osjećaja, straha ili euforije.",
          "To nije osobni Bitcoin standard. Osobni Bitcoin standard počinje kada Bitcoin prestane biti odvojena imovina i postane dio uređenog života.",
          "Redoslijed je važan: osobni proračun, život bez duga, darivanje, Bitcoin kao novac, usklađivanje kupovne moći, ravnoteža neto imovine, sigurnost i obiteljski pristup.",
        ],
      },
      {
        heading: "Što to znači za poduzetnika",
        body: [
          "Za poduzetnika je ova tema još osjetljivija. Posao prirodno traži rizik. Ali postoji razlika između poduzetničkog rizika i dužničkog pritiska.",
          "Poduzetnički rizik kaže da ćete stvoriti vrijednost i preuzeti mogućnost da ne uspije. Dužnički pritisak kaže da je budući novac obećan bez obzira na ishod.",
          "Zreo poslovni pristup prvo zna kratkoročne obveze, zatim pričuvu za slabije mjesece, zatim stvarni višak, zatim dio viška koji može postati Bitcoin na bilanci i dio koji treba ući u proizvodnu imovinu.",
        ],
      },
      {
        heading: "Praktični prijelaz",
        body: [
          "Dug ubrzava sadašnjost. Vlasništvo produbljuje budućnost. Dug kaže: uzmi sada, plati kasnije. Vlasništvo kaže: stvori, čuvaj, održavaj i razvijaj. Ali vlasništvo traži strpljenje.",
        ],
        items: [
          "Prestanite stvarati novi dug.",
          "Napravite potpun popis obveza: iznos, rata, kamata, rok, uvjeti i rizik.",
          "Vodite proračun kako biste znali stvarni višak.",
          "Izgradite novčanu zalihu koja kupuje vrijeme.",
          "Gradite Bitcoin kao novac, ne kao bijeg od nereda.",
        ],
      },
      {
        heading: "Zaključak",
        body: [
          "Društvo duga živi od budućih obećanja. Društvo vlasništva živi od sadašnje odgovornosti.",
          "Državni novac potiče ljude da troše budućnost jer sadašnji novac ne čuva dobro kupovnu moć. Bitcoin otvara drugi put: štednju, strpljenje, pozitivne priljeve, stvarni višak i vlasništvo bez stalne potrebe za dugom.",
          "Smjer je jasan: manje rata, više stvarnog viška; manje obveza, više slobode; manje financijske buke, više pravila; manje života po državnom novcu, više osobnog Bitcoin standarda.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaTitle: "Imate Bitcoin? Izgradite osobni Bitcoin standard.",
    finalCtaPrompt:
      "Ako Bitcoin postoji, ali dug i obveze još uvijek vode odluke, uvodni razgovor može pomoći postaviti pravi redoslijed.",
  },
  {
    slug: "digitalni-kredit-nije-bitcoin",
    title: "Digitalni kredit nije Bitcoin",
    metaDescription:
      "Financijski proizvodi povezani s Bitcoinom mogu imati mjesto u nečijoj bilanci, ali nisu isto što i Bitcoin. Prije prinosa treba razumjeti novac, potraživanje, posrednika i rizik.",
    excerpt:
      "Bitcoin je novac. Digitalni kredit je ugovor, potraživanje ili financijski instrument. Ta razlika mora biti jasna prije bilo kakvog razgovora o prinosu.",
    category: "Bitcoin kao novac",
    difficulty: "Napredno",
    freshness: "često se mijenja",
    order: 72,
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-01",
    practicalQuestion:
      "Znate li koji dio vaše bilance je Bitcoin kao novac, a koji dio je ugovor, potraživanje ili financijski instrument?",
    relatedSlugs: [
      "bitcoin-kao-novac",
      "bitcoin-etfovi-i-riznicke-kompanije",
      "bitcoin-u-neto-imovini",
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
    ],
    safetyNote:
      "Ovaj vodič nije investicijski, porezni ni pravni savjet. Ne preporučuje ulazak u financijske proizvode povezane s Bitcoinom, nego objašnjava razliku između novca, potraživanja, posrednika i rizika.",
    visual: {
      type: "split",
      title: "Novac nije isto što i potraživanje",
      leftLabel: "Bitcoin",
      leftItems: ["novac", "kupovna moć", "jasno skrbništvo"],
      rightLabel: "Digitalni kredit",
      rightItems: ["ugovor", "potraživanje", "posrednik"],
      caption:
        "Prinos nije početak analize. Prvo treba znati što točno posjedujete.",
    },
    sections: [
      {
        heading: "Prva razlika",
        body: [
          "Kako Bitcoin postaje ozbiljniji novac, oko njega se pojavljuje sve više financijskih proizvoda. Neki obećavaju predvidljiviji prinos, nude izloženost Bitcoinu bez izravnog držanja, kombiniraju državni novac, kreditne instrumente i Bitcoin ili su namijenjeni poduzećima i pojedincima.",
          "Neki mogu biti korisni. Neki će biti loše strukturirani. Neki će možda uspjeti. Neki će nestati. Zato je prva rečenica najvažnija: digitalni kredit nije Bitcoin.",
          "Može biti povezan s Bitcoinom, imati Bitcoin u pozadini, koristiti Bitcoinovu tržišnu likvidnost, isplaćivati dio prinosa u Bitcoinu ili biti dio šireg financijskog sustava koji nastaje oko Bitcoina. Ali nije isto što i Bitcoin koji držite kao novac.",
        ],
      },
      {
        heading: "Bitcoin je novac, digitalni kredit je ugovor",
        body: [
          "Bitcoin u vlastitom ili jasno uređenom skrbništvu je novac. Držite ga kao kupovnu moć za buduću razmjenu. Možete ga rasporediti u proračunu, čuvati, koristiti za plaćanje kada je praktično i promatrati kao dio novčane zalihe i neto imovine.",
          "Digitalni kredit je nešto drugo. To je financijski instrument. Kada uđete u takav proizvod, više ne držite samo Bitcoin kao novac. Ulazite u odnos s izdavateljem, posrednikom, ugovorom, pravilima, uvjetima, rokovima, izvorom prinosa i rizikom koji možda nije odmah vidljiv.",
          "Zato se digitalni kredit ne smije staviti u istu mentalnu ladicu kao Bitcoin. Jedno je novac. Drugo je potraživanje, ugovor ili financijska struktura.",
        ],
        link: {
          before:
            "Ako još nije jasno zašto se Bitcoin ovdje promatra kao novac, krenite od vodiča",
          label: "Bitcoin je novac",
          href: guideHref("bitcoin-kao-novac"),
          after: ".",
        },
      },
      {
        heading: "Zašto prinos privlači pažnju",
        body: [
          "Prinos uvijek privlači pažnju. To je posebno istinito nakon desetljeća u kojima je štednja u državnom novcu bila slaba, a mnogi ljudi su tražili zaštitu kupovne moći kroz ulaganja koja nisu uvijek razumjeli.",
          "Ako nešto nudi veći prinos, mora postojati razlog. Taj razlog može biti nova tehnologija, bolja struktura, veća transparentnost ili tržišna neučinkovitost. Ali može biti i veći rizik: rizik izdavatelja, likvidnosti, složenosti ili toga da kupac ne razumije što zapravo posjeduje.",
          "Zato je opasno gledati samo postotak. Postotak je kraj razgovora, ne početak. Prvo pitanje nije koliki je prinos. Prvo pitanje je što točno posjedujem.",
        ],
      },
      {
        heading: "Pet razlika između Bitcoina i digitalnog kredita",
        body: [
          "Prva razlika je kontrola. Kod Bitcoina pitanje je tko može potrošiti novac. Kod financijskog proizvoda pitanje je tko upravlja strukturom, tko vodi evidenciju, tko ispunjava obveze i što se događa ako posrednik zakaže.",
          "Druga razlika je izvor vrijednosti. Bitcoinovu ponudu ne povećava uprava, banka ili država. Kod digitalnog kredita vrijednost ovisi o ugovoru, bilanci, novčanim tokovima, tržištu i sposobnosti drugih strana da ispune obveze.",
          "Treća razlika je rizik. Bitcoin ima promjenjivu kupovnu moć. To je vidljiv rizik. Digitalni kredit može imati manje vidljivu promjenjivost, ali više ugovornog, kreditnog i posredničkog rizika.",
          "Četvrta razlika je likvidnost. Bitcoin se trguje stalno i globalno. Financijski proizvod može imati ograničenja, rokove, uvjete isplate ili tržište koje nije jednako duboko u svim okolnostima.",
          "Peta razlika je svrha. Bitcoin držite kao novac. Digitalni kredit držite radi prinosa ili specifične financijske funkcije.",
        ],
      },
      {
        heading: "Gdje može imati mjesto",
        body: [
          "Digitalni kredit, ako je dobro razumljiv i odgovara osobi ili poduzeću, može imati mjesto u širem sustavu. Ali tek nakon temelja: osobni proračun, život bez duga, darivanje, Bitcoin kao novac, ravnoteža neto imovine i sigurnost.",
          "Osoba bez proračuna ne zna koliko novca stvarno može izložiti riziku. Osoba u dugu često traži prinos dok istovremeno plaća cijenu prošlih odluka. Osoba bez pričuve može biti prisiljena izaći iz proizvoda u lošem trenutku. Osoba koja ne razumije Bitcoin kao novac može zamijeniti potraživanje za stvarni novac.",
        ],
      },
      {
        heading: "Kada nema smisla",
        body: [
          "Digitalni kredit nema smisla ako ga kupujete samo zato što prinos zvuči privlačno, ako ne razumijete tko je druga strana, ako ne razumijete što se događa u lošem scenariju, ako ste u potrošačkom dugu ili ako nemate pričuvu.",
          "Nema smisla ako biste zbog gubitka morali prodati Bitcoin, ući u dug ili ugroziti obiteljske obveze. Nema smisla ako ga zovete štednjom, a ponaša se kao rizični financijski instrument.",
          "Najopasnija rečenica u financijama često zvuči ovako: to je skoro isto kao novac, samo nosi veći prinos. Nije isto. Ako nosi veći prinos, vjerojatno nosi i drukčiji rizik.",
        ],
      },
      {
        heading: "Kako ga smjestiti u neto imovinu",
        body: [
          "Ako netko ipak razmatra digitalni kredit, treba ga smjestiti u ispravnu kategoriju. Ne pod Bitcoin saldo, ne pod novac za kratkoročne obveze i ne pod sigurnosnu pričuvu, nego pod financijske instrumente.",
          "To znači da osoba priznaje: ovo nije moj primarni novac. Ovo je ugovor ili potraživanje koje ima očekivani prinos i rizik.",
          "Ako je nešto Bitcoin saldo, tada ulazi u proračun kao novac. Ako je nešto financijski instrument, tada se promatra kroz rizik, rok, likvidnost, porezne posljedice, izdavatelja i ulogu u neto imovini.",
        ],
      },
      {
        heading: "Kako ga smjestiti u poslovnu bilancu",
        body: [
          "Kod poduzeća je razlika još važnija. Poslovni novac ima obveze: plaće, poreze, dobavljače, najam, opremu, zalihe i pričuvu.",
          "Ako se novac potreban za obveze stavi u proizvod s rizikom, posao može postati krhak. Čak i ako proizvod dugoročno uspije, kratkoročna nelikvidnost može stvoriti problem.",
          "Zato poslovni pristup treba biti slojevit: kratkoročne obveze u obliku koji je stabilan i dostupan, pričuva za slabije mjesece, Bitcoin na bilanci kao novčana zaliha za dio koji nije potreban odmah, proizvodna imovina i tek zatim financijski instrumenti ako ih vlasnik razumije.",
        ],
      },
      {
        heading: "Pitanja prije ulaska",
        body: [
          "Prije bilo kakve odluke korisno je proći kroz konkretna pitanja. Ako ne možete jasno odgovoriti na njih, odluka nije zrela.",
        ],
        items: [
          "Što točno posjedujem: Bitcoin, udio, dug, potraživanje ili pravo na budući novčani tok?",
          "Tko je izdavatelj, tko čuva imovinu i tko može zaustaviti isplatu?",
          "Iz čega dolazi prinos i tko ga plaća?",
          "Što se događa ako Bitcoin snažno padne ili dugo ne raste?",
          "Što se događa ako posrednik ima problem?",
          "Mogu li izaći kada želim ili postoje rokovi, kazne i ograničenja?",
          "Kako se instrument uklapa u moj proračun i neto imovinu?",
          "Koliki gubitak mogu podnijeti bez promjene osnovnog životnog plana?",
          "Što bi član obitelji trebao znati ako mi se nešto dogodi?",
        ],
      },
      {
        heading: "Predvidljivost nije isto što i sigurnost",
        body: [
          "Jedan od razloga zašto digitalni kredit privlači ljude jest predvidljivost. Bitcoinova kupovna moć se kratkoročno može snažno mijenjati. Financijski proizvod koji nudi redovitiji novčani tok može djelovati mirnije.",
          "Ali mirniji prikaz ne znači nužno manji rizik. Neki rizici su vidljivi svaki dan. Cijena Bitcoina je vidljiva. Drugi rizici su skriveni dok se nešto ne dogodi. Rizik posrednika, ugovora, likvidnosti i bilance mogu dugo izgledati nevažno, a zatim postati presudni.",
          "Zato ne treba uspoređivati samo promjenjivost. Treba uspoređivati narav rizika. Bitcoin ima jedan skup rizika. Digitalni kredit ima drugi skup rizika.",
        ],
      },
      {
        heading: "Zaključak",
        body: [
          "Digitalni kredit može biti zanimljiv razvoj u financijskom sustavu oko Bitcoina. Ali nije Bitcoin.",
          "Nije zamjena za osobni proračun, izlaz iz duga, sigurnosna pričuva, samostalno čuvanje, obiteljski plan ili novac koji treba bez razmišljanja staviti u istu kategoriju kao Bitcoin saldo.",
          "Može biti financijski instrument. A financijski instrument treba razumjeti prije nego što mu se povjeri novac. Na osobnom Bitcoin standardu redoslijed je važniji od prinosa: prvo red, zatim rizik; prvo novac, zatim instrumenti.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaTitle: "Imate Bitcoin? Izgradite osobni Bitcoin standard.",
    finalCtaPrompt:
      "Ako imate Bitcoin i financijske instrumente povezane s Bitcoinom, ali ih još ne razdvajate jasno u neto imovini, uvodni razgovor može pomoći.",
  },
  {
    slug: "digitalni-kredit-bitcoin-saylor",
    title: "Digitalni kredit: sljedeća faza institucionalnog Bitcoina",
    seoTitle:
      "Digitalni kredit i Bitcoin: Saylorova vizija nove financijske mreže",
    ogTitle: "Digitalni kredit: sljedeća faza institucionalnog Bitcoina",
    ogDescription:
      "Bitcoin je baza. Digitalni kredit je most prema kapitalu koji ne može držati punu Bitcoin volatilnost.",
    metaDescription:
      "Michael Saylor i Matt Cole objašnjavaju kako Bitcoin postaje temelj za digitalni kredit, digitalni novac i Bitcoin treasury kompanije. Što znači tržište kredita od 300 bilijuna dolara?",
    excerpt:
      "Michael Saylor i Matt Cole tvrde da Bitcoin više nije samo digitalna štednja. On postaje baza za digitalni kredit, digitalni novac i novu generaciju financijskih proizvoda.",
    category: "Bitcoin kao novac",
    difficulty: "Napredno",
    freshness: "često se mijenja",
    theme: "bitcoin",
    order: 73,
    publishedAt: "2026-06-11",
    updatedAt: "2026-06-11",
    practicalQuestion:
      "Koji dio vaše imovine treba ostati u samom Bitcoinu, a koji dio uopće smije razmatrati instrumente iznad Bitcoina?",
    relatedSlugs: [
      "digitalni-kredit-nije-bitcoin",
      "bitcoin-bilanca-pojacana-izlozenost",
      "bitcoin-etfovi-i-riznicke-kompanije",
      "bitcoin-nije-kripto-portfelj",
      "poslovni-bitcoin-nije-privatni-bitcoin",
      "samostalna-pohrana-ili-skrbnik",
    ],
    visual: {
      type: "split",
      title: "Baza i most",
      leftLabel: "Bitcoin",
      leftItems: ["temeljna imovina", "samostalna pohrana", "puna volatilnost"],
      rightLabel: "Digitalni kredit",
      rightItems: ["kreditni instrument", "niža volatilnost", "fiat mandat"],
      caption:
        "Digitalni kredit ima smisla samo ako ostane jasno odvojen od samog Bitcoina.",
    },
    intro: [
      "Ako je Bitcoin digitalni kapital, sljedeće pitanje glasi: može li se oko njega izgraditi kreditni sustav koji će privući kapital iz tradicionalnih financija? U razgovoru Saylora i Colea pojavljuje se upravo ta teza: najveći rast Bitcoina možda neće doći samo kroz kupnju spot Bitcoina, nego kroz proizvode koji tradicionalnim investitorima nude nižu volatilnost, prinos i Bitcoin-backed sigurnost.",
    ],
    sections: [
      {
        heading: "Uvod: Bitcoin ulazi u novu fazu",
        body: [
          "Bitcoin je godinama objašnjavan kao digitalno zlato, štedna tehnologija i monetarna mreža bez centralnog izdavatelja. No u razgovoru Michaela Saylora i Matta Colea fokus se pomiče na sljedeću fazu: što se događa kada Bitcoin postane temelj za kredit, prinos i nove financijske instrumente?",
          "Saylorova teza je jednostavna, ali ambiciozna: Bitcoin je osnovni sloj. On je digitalni kapital. Ali većina svjetskog kapitala još uvijek živi u fiat sustavu. Zato, ako Bitcoin želi privući bilijune dolara iz tradicionalnog financijskog sustava, mora postojati most između Bitcoin standarda i potreba investitora koji razmišljaju u dolarima, eurima, jenima, prinosima, riziku i volatilnosti.",
          "Taj most Saylor naziva digitalnim kreditom.",
        ],
      },
      {
        heading: "Što je digitalni kapital?",
        body: [
          "Digitalni kapital je način na koji Saylor opisuje Bitcoin u jeziku tradicionalnih financija.",
          "Za pogled blizak Bitcoinu, Bitcoin je novac. On nema klasični rizik druge strane, ne ovisi o obećanju banke, države ili kompanije i može se držati u vlastitom skrbništvu.",
          "No za institucionalni svijet, pojam digitalni kapital lakše sjeda u postojeću mentalnu mapu. U tom okviru Bitcoin konkurira drugim oblicima kapitala: zlatu, nekretninama, dionicama, obveznicama, privatnom kreditu, državnim obveznicama i korporativnom kreditu.",
          "Ključna ideja: Bitcoin je imovina. Digitalni kapital je način kako tu imovinu objasniti fiat svijetu.",
        ],
        link: {
          before: "Za temeljni okvir pročitajte vodič",
          label: "Bitcoin je novac",
          href: guideHref("bitcoin-kao-novac"),
          after:
            "prije nego što se Bitcoin počne promatrati kroz slojeve kapitala.",
        },
      },
      {
        heading: "Što je digitalni kredit?",
        body: [
          "Digitalni kredit je kreditni instrument koji se oslanja na Bitcoin kao temeljnu imovinu.",
          "To može značiti vrijednosni papir, preferencijalnu dionicu, kreditni proizvod ili yield instrument čija logika proizlazi iz Bitcoin-backed kapitalne strukture.",
          "Saylor i Cole tvrde da takvi instrumenti imaju važnu ulogu jer ne može svaki investitor držati imovinu koja može pasti 30%, 40% ili 50% u relativno kratkom roku. Obitelj koja treba novac za školarinu, kompanija koja upravlja likvidnošću ili fond koji ima mandat za kreditne instrumente neće nužno kupiti spot Bitcoin.",
          "Ali možda može kupiti instrument koji ima nižu volatilnost, isplaćuje prinos, denominiran je u dolaru ili drugoj fiat valuti, a u pozadini se oslanja na Bitcoin.",
          "Tu digitalni kredit postaje most između dvije realnosti: Bitcoin standarda i fiat financijskog sustava.",
        ],
      },
      {
        heading: "Digitalni kredit nije zamjena za Bitcoin",
        body: [
          "Ovo je najvažnija poruka za Bitcoin publiku.",
          "Digitalni kredit nije namijenjen tome da Bitcoineri prodaju Bitcoin koji drže u samostalnoj pohrani i kupe neki financijski proizvod. Saylor upravo suprotno naglašava: ljudi koji kupuju takve instrumente najčešće ne izlaze iz Bitcoina, nego izlaze iz money market fondova, bankovnih depozita, stablecoina ili tradicionalnih kreditnih proizvoda.",
          "Zato digitalni kredit ne treba promatrati kao konkurenciju Bitcoinu, nego kao dodatni sloj koji može privući kapital koji inače ne bi ušao u Bitcoin ekosustav.",
        ],
        callout:
          "Bitcoin je baza. Digitalni kredit je most. Digitalni novac je korisnički proizvod za fiat svijet.",
        link: {
          before: "Kraći uvod u ovu razliku nalazi se u vodiču",
          label: "Digitalni kredit nije Bitcoin",
          href: guideHref("digitalni-kredit-nije-bitcoin"),
          after: ".",
        },
      },
      {
        heading: "Ključne brojke iz razgovora",
        body: [
          "Brojevi iz razgovora ne služe kao prognoza koju treba slijediti, nego kao mapa veličine problema koji Saylor i Cole pokušavaju opisati.",
        ],
        dataCards: [
          {
            value: "300 bilijuna USD",
            label: "procijenjena veličina globalnog kreditnog tržišta",
          },
          {
            value: "15–30 bilijuna USD",
            label:
              "potencijalnih 5–10% globalnog kredita koji bi mogao prijeći u Bitcoin-backed kreditne instrumente",
          },
          {
            value: "1.000 bilijuna USD",
            label: "Saylorova procjena kapitala izvan Bitcoina",
          },
          {
            value: "1 bilijun USD",
            label: "zaokružena procjena kapitala u Bitcoinu",
          },
          {
            value: "99,9%",
            label:
              "udio globalnog kapitala koji je još uvijek na fiat standardu",
          },
          {
            value: "99,99999%",
            label:
              "tvrdnja o udjelu svjetskih cijena denominiranih u fiat valutama",
          },
          {
            value: "50–51%",
            label:
              "pad Bitcoina od razine oko 125.000 USD u primjeru iz razgovora",
          },
          {
            value: "90%",
            label:
              "procjena koliko je digitalni kredit uspio skinuti Bitcoin volatilnosti",
          },
          {
            value: "95%",
            label: "ambiciozni cilj uklanjanja volatilnosti",
          },
          {
            value: "40 vol",
            label: "spomenuta Bitcoin volatilnost kroz zadnjih 12 mjeseci",
          },
          {
            value: "68–69%",
            label: "procjena Bitcoin dominacije bez stablecoina",
          },
          {
            value: "7%+",
            label:
              "prag prinosa koji Saylor navodi kao relevantan za nadmašivanje monetarnog obezvređenja",
          },
          {
            value: "3%–3,2% godišnje",
            label:
              "minimalan rast Bitcoina koji se spominje kao važan za održivost kreditne strukture",
          },
          {
            value: "8,5% godišnje",
            label: "procijenjeni dugoročni trošak kapitala u jednom primjeru",
          },
          {
            value: "10% godišnje",
            label: "prag iznad kojeg equity strategija može nadmašiti Bitcoin",
          },
          {
            value: "20%, 30%, 40% CAGR",
            label:
              "Coleov right-tail scenarij za Bitcoin u sljedećih 10–15 godina",
          },
        ],
      },
      {
        heading: "Zašto je volatilnost glavni problem",
        body: [
          "Bitcoin je dugoročno najjači monetarni signal, ali kratkoročno je vrlo volatilan. Upravo tu nastaje problem za institucionalni kapital.",
          "Za uvjerenog Bitcoinera volatilnost nije nužno problem. On gleda dugoročno, razumije cikluse i spreman je držati kroz padove. Ali većina kapitala u svijetu nije tako pozicionirana.",
          "Zato Saylor tvrdi da edukacija sama po sebi nije dovoljna. Možete ljudima objasniti Bitcoin, ali ako njihov kapital ne može podnijeti 40 vol, oni ga neće kupiti u velikom postotku.",
          "Rješenje koje predlaže: proizvodi koji zadržavaju Bitcoin kao temelj, ali smanjuju volatilnost za krajnjeg investitora.",
        ],
        items: [
          "Kompanija ne može riskirati operativnu likvidnost.",
          "Obitelj ne može držati novac za školarinu u imovini koja može pasti 50%.",
          "Fond menadžer ima mandate i limite rizika.",
          "Korporativna riznica mora opravdati kratkoročne gubitke.",
          "Investicijski odbor često želi stabilnost i predvidljivost.",
        ],
      },
      {
        heading: "Što znači “skinuti 90% volatilnosti”?",
        body: [
          "Jedna od najzanimljivijih tvrdnji iz razgovora jest da digitalni kredit može ukloniti približno 90% Bitcoin volatilnosti.",
          "To ne znači da rizik nestaje. To znači da se rizik preraspodjeljuje kroz kapitalnu strukturu.",
          "Pojednostavljeno, spot Bitcoin nosi punu volatilnost. Equity Bitcoin treasury kompanije može imati pojačanu volatilnost. Kreditni instrument može imati nižu volatilnost. Digitalni novac želi biti gotovo bez volatilnosti prema fiat valuti.",
        ],
        table: {
          columns: ["Sloj", "Za koga je"],
          rows: [
            ["Spot Bitcoin", "Za one koji žele držati temeljnu imovinu"],
            [
              "Bitcoin treasury equity",
              "Za one koji žele pojačanu Bitcoin izloženost",
            ],
            ["Digitalni kredit", "Za one koji žele prinos i nižu volatilnost"],
            [
              "Digitalni novac",
              "Za one koji žele fiat stabilnost, prinos i Bitcoin-backed strukturu",
            ],
          ],
        },
      },
      {
        heading: "Digitalni novac: fiat proizvod na Bitcoin temeljima",
        body: [
          "Saylor pojam digitalni novac ne koristi u Bitcoin maksimalističkom smislu. U Bitcoin standardu, Bitcoin je novac, a sve ostalo je kredit.",
          "Ali kada govori o digitalnom novcu u ovom kontekstu, govori iz perspektive fiat svijeta. Za većinu ljudi i institucija novac znači nešto što je stabilno u odnosu na dolar, euro ili jen.",
          "To je proizvod namijenjen ljudima koji možda još nisu spremni kupiti Bitcoin, ali žele bolje rješenje od bankovnog depozita, stablecoina bez prinosa ili money market fonda s niskim prinosom.",
        ],
        items: [
          "Vezanost uz fiat valutu.",
          "Vrlo niska ili nulta volatilnost.",
          "Mogućnost razmjene bez velikih trenja.",
          "Prinos.",
          "Bitcoin-backed sigurnost u pozadini.",
        ],
      },
      {
        heading: "Zašto je tržište toliko veliko?",
        body: [
          "Najvažnija makro brojka iz razgovora je 300 bilijuna USD globalnog kreditnog tržišta.",
          "Saylorova ambicija nije da cijelo tržište prijeđe na Bitcoin-backed kredit. Njegova teza je da bi i mali postotak bio ogroman.",
          "Ako samo 5% globalnog kreditnog tržišta prijeđe u Bitcoin-backed instrumente, to je oko 15 bilijuna USD. Ako prijeđe 10%, to je oko 30 bilijuna USD.",
          "U kontekstu Bitcoina, to su ogromne brojke. Zato je digitalni kredit potencijalno veća priča od same kategorije još jedan financijski proizvod.",
          "Radi se o pokušaju da Bitcoin postane kolateralni i kapitalni temelj za dio globalnog kreditnog sustava.",
        ],
      },
      {
        heading: "Bitcoin treasury kompanije i pitanje razrjeđenja",
        body: [
          "Drugi veliki dio razgovora odnosi se na Bitcoin treasury kompanije. To su kompanije koje koriste svoju kapitalnu strukturu kako bi kupovale i držale Bitcoin.",
          "Kod takvih kompanija investitori često raspravljaju o razrjeđenju. Ako kompanija izdaje nove dionice, je li to štetno za postojeće dioničare?",
          "Saylorov odgovor: ne nužno.",
          "Prema njemu, ključno pitanje nije samo izdaje li se novi equity, nego što kompanija dobiva zauzvrat. Ako izdaje dionice iznad neto vrijednosti imovine po dionici i kupuje Bitcoin ili gotovinu koja jača kreditnu strukturu, transakcija može biti akretivna. Ako izdaje equity i kupuje imovinu koja vrijedi manje od plaćenog iznosa, tada je transakcija razrjeđujuća.",
        ],
        table: {
          columns: ["Transakcija", "Mogući učinak"],
          rows: [
            [
              "Equity izdan iznad NAV-a za kupnju Bitcoina",
              "Potencijalno akretivno",
            ],
            [
              "Equity izdan za gotovinu koja jača kreditnu sposobnost",
              "Može biti akretivno ako podržava poslovni model",
            ],
            ["Equity izdan za precijenjenu imovinu", "Razrjeđujuće"],
            ["Equity izdan ispod neto vrijednosti imovine", "Razrjeđujuće"],
            ["Kratkoročni dug za kupnju Bitcoina", "Visok rizik likvidacije"],
            [
              "Dugoročni ili perpetual kapital",
              "Manji rizik prisilne likvidacije",
            ],
          ],
        },
        link: {
          before: "Za širi okvir poslovne bilance pročitajte",
          label: "Bitcoin, bilanca i pojačana izloženost",
          href: guideHref("bitcoin-bilanca-pojacana-izlozenost"),
          after: ".",
        },
      },
      {
        heading: "MNAV: korisna metrika, ali ne jedina",
        body: [
          "MNAV, odnosno multiple to net asset value, jedna je od najčešće korištenih metrika za Bitcoin treasury kompanije. Ona pokušava odgovoriti na pitanje: koliko tržište plaća kompaniju u odnosu na vrijednost Bitcoina i druge neto imovine koju kompanija drži?",
          "Ali Saylor upozorava da ne postoji jedna savršena MNAV formula. Različiti investitori mogu drugačije tretirati dug, konvertibilne obveznice, preferred equity, perpetual instrumente, gotovinu, Bitcoin, opcionalnost instrumenata, dospijeća i kreditni rizik.",
        ],
        callout:
          "MNAV nije čarobna brojka. Kod Bitcoin treasury kompanija treba gledati cijelu kapitalnu strukturu, a ne samo broj Bitcoina po dionici.",
        link: {
          before:
            "Ako trebate razliku između Bitcoina, ETF-a i rizničke kompanije, krenite od vodiča",
          label:
            "Bitcoin ETF-ovi i rizničke kompanije: gdje prestaje Bitcoin, a počinje kapital",
          href: guideHref("bitcoin-etfovi-i-riznicke-kompanije"),
          after: ".",
        },
      },
      {
        heading: "Zaključak",
        body: [
          "Saylor i Cole ne govore samo o novom investicijskom proizvodu. Oni govore o tome kako bi Bitcoin mogao ući u samu strukturu globalnih financija.",
          "Prva faza Bitcoina bila je razumijevanje: što je Bitcoin i zašto je važan. Druga faza bila je akumulacija: pojedinci, fondovi i kompanije kupuju Bitcoin. Treća faza mogla bi biti financijalizacija: Bitcoin postaje temelj za kredit, prinos, digitalni novac i nove kapitalne strukture.",
          "To ne znači da Bitcoin u samostalnoj pohrani postaje manje važan. Upravo suprotno. Spot Bitcoin ostaje baza. Ali oko te baze nastaje sve širi financijski ekosustav.",
          "Ako Saylorova teza bude točna, najveći kapitalni tokovi prema Bitcoinu možda neće doći samo od ljudi koji žele kupiti Bitcoin, nego od institucija koje žele bolji kredit, bolji kolateral, bolji prinos i bolji monetarni temelj.",
        ],
      },
    ],
    faq: [
      {
        question: "Je li digitalni kredit isto što i Bitcoin?",
        answer:
          "Nije. Bitcoin je temeljna imovina. Digitalni kredit je financijski instrument koji se može oslanjati na Bitcoin kao kolateral, kapitalnu bazu ili izvor ekonomske sigurnosti.",
      },
      {
        question: "Je li digitalni kredit zamjena za samostalnu pohranu?",
        answer:
          "Ne. Bitcoin u samostalnoj pohrani ostaje najčišći način držanja Bitcoina. Digitalni kredit je proizvod za kapital koji traži nižu volatilnost, prinos ili fiat denominaciju.",
      },
      {
        question: "Zašto bi netko kupio digitalni kredit umjesto Bitcoina?",
        answer:
          "Zato što ne može svaki investitor podnijeti Bitcoinovu volatilnost. Neki investitori trebaju stabilniji instrument, poznatu valutu, prinos ili kreditni profil.",
      },
      {
        question: "Zašto Saylor spominje tržište od 300 bilijuna dolara?",
        answer:
          "Zato što globalno kreditno tržište predstavlja ogroman izvor kapitala. Ako bi se i mali postotak tog tržišta prebacio u Bitcoin-backed kreditne instrumente, radilo bi se o bilijunima dolara potencijalne potražnje.",
      },
      {
        question: "Što je digitalni novac u ovom kontekstu?",
        answer:
          "U ovom kontekstu digitalni novac znači fiat-denominirani instrument s vrlo niskom volatilnošću, prinosom i Bitcoin-backed strukturom. To nije isto što i Bitcoin kao novac u austrijskom ili Bitcoin standardu.",
      },
      {
        question: "Što je MNAV?",
        answer:
          "MNAV je omjer tržišne vrijednosti kompanije i neto vrijednosti njezine imovine. Kod Bitcoin treasury kompanija često se koristi za usporedbu tržišne cijene s vrijednošću Bitcoina koji kompanija drži, ali nije dovoljna metrika sama za sebe.",
      },
    ],
    disclaimer:
      "Ovaj članak je edukativnog karaktera i ne predstavlja investicijski savjet. Digitalni kredit, preferred equity, Bitcoin treasury kompanije i slični instrumenti mogu imati složene rizike, uključujući kreditni rizik, tržišni rizik, likvidnosni rizik i rizik kapitalne strukture.",
    finalCta: "Zatraži Bitcoin savjetovanje",
    finalCtaTitle:
      "Želite razumjeti kako Bitcoin može ući u vašu osobnu ili poslovnu strategiju?",
    finalCtaPrompt:
      "Bitcoin više nije samo tema za pojedince. Sve više kompanija, investitora i obiteljskih ureda razmatra kako ga uključiti u dugoročnu strategiju štednje, riznice i zaštite kapitala. Kroz Bitcoin savjetovanje pomažemo razumjeti osnovne principe, rizike, samostalnu pohranu, regulativni kontekst i strateške mogućnosti.",
    finalSecondaryCta: {
      label: "Pročitaj više vodiča",
      href: "/vodici/",
      dataCta: "guide-final-guides-index",
    },
  },
  {
    slug: "obiteljski-pristup-bitcoinu",
    title: "Kako obitelj može pristupiti Bitcoinu ako vam se nešto dogodi?",
    seoTitle: "Bitcoin nasljeđivanje i obitelj",
    metaDescription:
      "Kako razmišljati o obiteljskom pristupu Bitcoinu bez otkrivanja osjetljivih podataka, žurbe i prepuštanja kontrole.",
    excerpt:
      "Ako Bitcoin ima važnu ulogu u neto imovini, osobni sustav mora biti razumljiv osobi od povjerenja u izvanrednim okolnostima.",
    category: "Sigurnost i obitelj",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 105,
    publishedAt: "2026-04-30",
    updatedAt: "2026-08-04",
    practicalQuestion:
      "Bi li osoba od povjerenja znala što napraviti, a što nikada ne napraviti, ako vam se nešto dogodi?",
    relatedSlugs: [
      "bitcoin-core-standard",
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
      "bitcoin-kao-novac",
      "bitcoin-u-neto-imovini",
    ],
    visual: {
      type: "safety",
      title: "Obiteljski pristup",
      zones: [
        {
          label: "što postoji",
          description: "osnovna informacija",
        },
        {
          label: "što ne dirati",
          description:
            "privatni ključevi, wallet backupi i passphraseovi se ne dijele",
        },
        {
          label: "kome se javiti",
          description: "osoba ili uputa za pomoć",
        },
      ],
      caption: "Informacija nije isto što i pristup.",
    },
    sections: [
      {
        heading: "Nije dovoljno da samo vi znate",
        body: [
          "Ako Bitcoin ima ozbiljnu ulogu u neto imovini, sustav nije dovršen ako postoji samo u vašoj glavi. Vi možda znate gdje je što, ali osoba od povjerenja može ostati bez osnovnog smjera u izvanrednoj situaciji.",
          "Obitelji ne treba dati pristup svemu. Treba joj dati put: što postoji, gdje su opće upute, kome se smije javiti i što se nikada ne smije napraviti.",
        ],
      },
      {
        heading: "Informacija nije isto što i pristup",
        body: [
          "Informacija može glasiti da Bitcoin postoji i da postoje upute. Kontrola znači mogućnost pomicanja Bitcoina. Te dvije stvari ne smiju se miješati.",
          "Dobar obiteljski pristup daje dovoljno informacija da osoba ne bude izgubljena, ali ne izlaže osjetljive podatke bez potrebe. Tu se traži ravnoteža između kontinuiteta i sigurnosti.",
        ],
      },
      {
        heading: "Tajne i sigurnosne kopije nikada se ne dijele",
        body: [
          "Mnogi walleti koriste BIP39 početne riječi, dok opisani Bitcoin Core workflow kao primarni korisnički backup koristi Bitcoin Core wallet backup datoteku i odvojeno čuvanu wallet passphrase. Ni jedan od tih osjetljivih podataka ne šalje se porukom, ne fotografira i ne unosi u mrežni obrazac.",
          "Obitelj treba znati da nitko ozbiljan neće tražiti privatni ključ, wallet backup datoteku, wallet passphrase ili početne riječi drugog walleta u poruci ili pozivu. To pravilo mora biti kratko, jasno i zapisano.",
        ],
      },
      {
        heading: "Što obitelj smije znati",
        body: [
          "Osoba od povjerenja može znati da Bitcoin postoji, da je dio neto imovine, gdje se nalaze opće upute i koga smije kontaktirati. Može znati i što ne smije napraviti.",
          "Ne mora znati sve tehničke detalje. Ne mora imati pristup odmah. Cilj je da u teškom trenutku ne krene krivim putem i ne preda kontrolu nepoznatoj osobi.",
        ],
      },
      {
        heading: "Pravila prije krize",
        body: [
          "Obiteljski pristup treba postaviti prije krize. U krizi ljudi žure, boje se i traže brze odgovore. Tada su pogreške najskuplje.",
          "Zato osobni Bitcoin standard uključuje kratke upute, jasne zabrane i osobu od povjerenja. Kontrola ostaje kod vlasnika, ali sustav ne ovisi samo o jednoj osobi.",
        ],
      },
      {
        heading: "Minimalna obiteljska uputa",
        body: [
          "Upute ne moraju biti duge da bi bile korisne. Važno je da prva pravila budu kratka, jasna i razumljiva u stresnom trenutku.",
        ],
        items: [
          "Bitcoin postoji i dio je neto imovine.",
          "Privatni ključevi, wallet backup datoteke, passphraseovi i početne riječi drugih walleta ne šalju se nikome.",
          "U izvanrednoj situaciji prvo se čitaju upute i kontaktira osoba od povjerenja.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako obitelj zna da Bitcoin postoji, ali nema jasne upute što smije i ne smije napraviti, to je pitanje koje ne treba ostati samo u glavi.",
  },
  {
    slug: "sigurnost-ne-smije-ovisiti-samo-o-vama",
    title: "Sigurnost ne smije ovisiti samo o vama",
    metaDescription:
      "Vodič o sigurnosti i obiteljskom pristupu Bitcoinu: kontrola ostaje kod vas, ali sustav ne smije ovisiti samo o vama.",
    excerpt:
      "Vaš Bitcoin mora ostati pod vašom kontrolom. Ali ako nitko ne zna što napraviti u izvanrednoj situaciji, sustav nije dovršen.",
    category: "Sigurnost i obitelj",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 100,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-08-04",
    practicalQuestion:
      "Bi li osoba od povjerenja znala što napraviti, a što nikada ne napraviti, ako vam se nešto dogodi?",
    relatedSlugs: [
      "bitcoin-core-standard",
      "obiteljski-pristup-bitcoinu",
      "bitcoin-kao-novac",
      "bitcoin-u-neto-imovini",
    ],
    visual: {
      type: "safety",
      title: "Sigurnost s jasnim oporavkom",
      zones: [
        {
          label: "kontrola",
          description: "Bitcoin ostaje pod vašom kontrolom",
        },
        {
          label: "upute",
          description: "osoba od povjerenja zna što ne smije napraviti",
        },
        {
          label: "pristup",
          description: "put postoji, ali ne otkriva osjetljive podatke",
        },
      ],
      caption: "Sigurnost mora biti razumljiva i obitelji.",
    },
    sections: [
      {
        heading: "Kontrola ostaje kod vas",
        body: [
          "Sigurnost u osobnom Bitcoin standardu počinje od jednostavne granice: kontrola ostaje kod vas. Nitko ne treba privatni ključ, Bitcoin Core wallet backup datoteku, wallet passphrase, početne riječi drugog walleta, lozinku ili pristup računu da bi s vama razgovarao o sustavu.",
          "Ali kontrola ne znači izolaciju. Ako nitko ne zna što postoji, gdje su opće upute i što nikada ne smije napraviti, sustav ovisi samo o vama. Za ozbiljnu neto imovinu to nije dovoljno.",
        ],
        link: {
          before: "Za preporučeni dugoročni sigurnosni smjer pročitajte",
          label: "Bitcoin Core Standard za dugoročnu štednju",
          href: "/vodici/bitcoin-core-standard/",
          after: ".",
        },
      },
      {
        heading: "Jedna osoba nije sustav",
        body: [
          "Ako sve znate samo vi, nastaje situacija u kojoj jedna greška znači gubitak pristupa. Bolest, nesreća, smrt ili obična pogreška mogu ostaviti obitelj bez smjera.",
          "Dobar sustav ne predaje kontrolu drugima, ali uklanja potpunu ovisnost o jednoj osobi. Postoje upute, osobe od povjerenja i jasna pravila opreza. Takav pristup praktično nadograđuje Bitcoin standard.",
        ],
      },
      {
        heading: "Informacija nije isto što i pristup",
        body: [
          "Osoba od povjerenja može imati informaciju bez pristupa. Može znati da Bitcoin postoji, gdje su opće upute i koga smije kontaktirati, ali ne mora imati mogućnost pomicanja Bitcoina.",
          "Ta razlika čuva sigurnost. Potpuna tajnost može uništiti kontinuitet. Preširoko dijeljenje može uništiti kontrolu. Između toga postoji uređen put.",
        ],
      },
      {
        heading: "Što obitelj smije znati",
        body: [
          "Obitelj smije znati osnovni kontekst: Bitcoin postoji, dio je neto imovine, ne treba žuriti, postoje upute i postoje stvari koje nitko ne smije tražiti. Za prvi korak, toliko je dovoljno.",
          "Ne mora znati sve detalje. Ne mora čuvati osjetljive podatke ako za to nije spremna. Cilj nije prebaciti odgovornost, nego ukloniti paniku i pogrešne prve poteze.",
        ],
      },
      {
        heading: "Što nitko ne smije tražiti",
        body: [
          "Nitko ne smije tražiti privatni ključ, Bitcoin Core wallet backup datoteku, wallet passphrase, početne riječi drugog walleta, lozinku, pristup burzi, pristup novčaniku ili slanje Bitcoina na svoju adresu radi čuvanja. Ta pravila trebaju biti kratka i razumljiva.",
          "Ako osoba od povjerenja zapamti samo jedno, neka zapamti ovo: prvo stati, ne žuriti, ne slati osjetljive podatke i ne vjerovati nikome tko traži kontrolu. Sigurnost počinje jasnim ne.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako Bitcoin postoji, ali obitelj ne zna što napraviti u izvanrednoj situaciji, uvodni razgovor može pomoći da to stavimo u jasniju sliku.",
    extraCta: {
      title: "Širi sigurnosni okvir",
      text: "Za širi sigurnosni okvir pročitajte i sigurnosnu stranicu.",
      label: "Pročitajte sigurnosna pravila",
      href: "/sigurnost/",
      dataCta: "guide-security-page",
    },
  },
  {
    slug: "prihod-nije-slobodan-novac",
    title: "Prihod nije slobodan novac",
    metaDescription:
      "Kod posla klijentova uplata ne pripada odmah vlasniku. Prvo treba vidjeti poreze, plaće, dobavljače, buduće troškove, pričuvu i vlasničke odluke.",
    excerpt:
      "Kod posla klijentova uplata ne pripada odmah vlasniku. Prvo treba vidjeti poreze, plaće, dobavljače, buduće troškove, pričuvu i vlasničke odluke.",
    category: "Osobni proračun nulte osnove",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 18,
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-15",
    practicalQuestion:
      "Znate li koji novac u poslu stvarno možete rasporediti, a koji već pripada obvezama?",
    relatedSlugs: [
      "svaki-euro-ima-namjenu",
      "stvarni-visak",
      "poslovni-bitcoin-nije-privatni-bitcoin",
    ],
    visual: {
      type: "split",
      title: "Uplata nije isto što i slobodan novac",
      leftLabel: "Prvo obveze",
      leftItems: ["porezi", "plaće", "dobavljači", "pričuva"],
      rightLabel: "Tek zatim višak",
      rightItems: ["vlasnička odluka", "riznica", "Bitcoin pravila"],
      caption:
        "Poslovni Bitcoin okvir počinje razlikovanjem operativnog novca i viška riznice.",
    },
    sections: [
      {
        heading: "Prihod nije isto što i dobit",
        body: [
          "Kod posla je lako pomiješati novac koji je ušao s novcem koji je slobodan. Klijentova uplata može izgledati kao prostor za odluku, ali dio tog novca već pripada porezima, plaćama, dobavljačima, najmu, zalihama, opremi ili kratkoročnim ugovorenim obvezama.",
          "Zato poslovni Bitcoin okvir ne počinje pitanjem treba li kupiti Bitcoin. Počinje pitanjem što taj novac već mora napraviti. Prihod je tek početak razgovora, ne dokaz da višak postoji.",
        ],
      },
      {
        heading: "Dobit nije isto što i slobodan novac",
        body: [
          "Dobit može postojati na papiru, a slobodan novac može biti vezan u zalihama, opremi, nenaplaćenim potraživanjima ili budućim obvezama. Vlasnik posla zato ne smije gledati samo saldo na računu.",
          "Prije Bitcoin odluke treba odvojiti operativni novac od viška riznice. Operativni novac čuva sposobnost posla da ispuni obveze. Višak riznice je ono što ostaje nakon što su kratkoročne obveze, pričuva i vlasničke odluke jasno imenovane.",
        ],
      },
      {
        heading: "Operativni novac ne smije ovisiti o tržištu",
        body: [
          "Novac za poreze, plaće, najam, dobavljače i kratkoročne ugovorene obveze ne smije ovisiti o nadi da će se tržište ponašati povoljno. Ako taj novac sutra treba biti dostupan u državnom novcu, tada to nije novac za riznicu.",
          "Bitcoin može imati smisla kao dio šireg poslovnog okvira, ali ne kao zamjena za osnovnu operativnu disciplinu. Posao prvo mora moći preživjeti mjesec, kvartal i obveze koje su već preuzete.",
        ],
      },
      {
        heading: "Prvo pitanje vlasnika posla",
        body: [
          "Prvo pitanje nije koliko Bitcoina kupiti. Prvo pitanje je: koji dio poslovnog novca je stvarno slobodan nakon obveza, pričuve, plana rasta i vlasničkih odluka?",
          "Ako odgovor nije jasan, Bitcoin odluka je prerana. Ako je odgovor jasan, višak riznice može dobiti pravila: kada se smije pretvoriti u Bitcoin, kada se ne dira i tko mora razumjeti odluku.",
        ],
      },
      {
        heading: "Granica savjetovanja",
        body: [
          "Ovo nije računovodstveni ili porezni savjet. Ovo je praktični okvir za pitanja koja vlasnik mora znati postaviti prije nego što se Bitcoin pojavi u poslovnoj riznici.",
          "Porezni, pravni i računovodstveni dio treba provjeriti s odgovarajućim stručnjacima. Bitcoin savjetovanje pomaže urediti redoslijed pitanja, pravila odluke i sigurnosne granice.",
        ],
      },
    ],
    finalCta: "Imate poslovnu Bitcoin odluku? Dogovorite uvodni razgovor.",
    finalCtaPrompt:
      "Ako niste sigurni koji je poslovni novac stvarno slobodan, to je dobro pitanje za uvodni razgovor.",
  },
  {
    slug: "prihvacanje-bitcoina-u-poslovanju",
    title: "Prihvaćanje Bitcoina u poslovanju",
    eyebrow: "Bitcoin za tvrtke",
    seoTitle: "Prihvaćanje Bitcoina u poslovanju",
    metaDescription:
      "Kako tvrtka, obrt, trgovina, restoran, hotel ili event može prihvatiti Bitcoin plaćanja i odlučiti hoće li zadržati Bitcoin ili primati eure.",
    excerpt:
      "Bitcoin plaćanja mogu biti novi kanal prodaje, marketinška prednost i način da dođete do kupaca koji aktivno traže mjesta na kojima mogu plaćati Bitcoinom. Pravo pitanje nije samo kako tehnički primiti uplatu, nego što će vaše poslovanje napraviti s primljenim Bitcoinom.",
    category: "Poslovanje",
    difficulty: "Srednje",
    freshness: "često se mijenja",
    theme: "bitcoin",
    order: 19,
    readingMinutes: 12,
    publishedAt: "2026-06-11",
    updatedAt: "2026-06-11",
    practicalQuestion:
      "Želite li Bitcoin samo kao novi kanal naplate ili primljeni Bitcoin stvarno postaje dio poslovne imovine?",
    relatedSlugs: [
      "prihod-nije-slobodan-novac",
      "poslovni-bitcoin-nije-privatni-bitcoin",
      "bitcoin-kao-novac",
    ],
    heroPrimaryCta: {
      label: "Dogovorite razgovor o implementaciji",
      href: "/razgovor/",
      dataCta: "guide-business-bitcoin-payments-hero",
    },
    heroSecondaryCta: {
      label: "Prvo pročitajte vodič",
      href: "#guide-toc-heading",
      dataCta: "guide-business-bitcoin-payments-toc",
    },
    tocExtraLinks: [
      { heading: "FAQ", id: "faq" },
      {
        heading: "Razgovor o implementaciji",
        id: "razgovor-o-implementaciji",
      },
    ],
    sections: [
      {
        heading: "Uvod",
        hideFromToc: true,
        body: [
          "Svako poslovanje već prihvaća određene oblike plaćanja: gotovinu, kartice, bankovne transfere, online plaćanja, ponekad strane valute, vaučere ili prepaid sustave.",
          "Prihvaćanje Bitcoina može se promatrati kao dodavanje još jednog načina plaćanja. Ali Bitcoin nije samo tehnička opcija na blagajni. On može otvoriti pristup posebnoj skupini kupaca: ljudima koji aktivno žele koristiti Bitcoin kao novac.",
          "To je posebno vidljivo u turizmu, ugostiteljstvu, eventima, konferencijama, webshopovima i poslovanjima koja imaju međunarodne kupce.",
          "Kada se veći broj Bitcoin korisnika okupi na jednom mjestu, vrlo brzo postane jasno da postoji stvarna potražnja za Bitcoin plaćanjem. U takvoj situaciji poslovanje koje prihvati Bitcoin ne dobiva samo još jedan način naplate. Dobiva signal tržištu: ovdje razumijemo što dio naših kupaca želi.",
        ],
        link: {
          before: "Vanjski pregled takve potražnje možete provjeriti kroz",
          label: "BTC Map",
          href: "https://btcmap.org/",
          after:
            "koji prikazuje lokacije koje prihvaćaju Bitcoin i omogućuje Bitcoin korisnicima da ih lakše pronađu.",
        },
      },
      {
        heading: "Zašto prihvatiti Bitcoin?",
        body: [
          "Za tvrtke, obrte, trgovine, restorane, hotele i evente Bitcoin plaćanje može imati više uloga. Nekome je dovoljno da kupac ima još jedan način plaćanja. Nekome je važan signal prema Bitcoin zajednici. Nekome je to prvi korak prema poslovnoj Bitcoin pričuvi.",
        ],
        table: {
          columns: ["Korist", "Što to znači u praksi"],
          rows: [
            [
              "Novi kanal naplate",
              "Kupac može platiti izravno iz Bitcoin novčanika.",
            ],
            [
              "Marketinška diferencijacija",
              "Poslovanje se razlikuje od konkurencije.",
            ],
            [
              "Pristup Bitcoin zajednici",
              "Bitcoin korisnici često dijele informacije o mjestima koja prihvaćaju Bitcoin.",
            ],
            [
              "Međunarodna dostupnost",
              "Bitcoin je globalan i nije vezan uz kartične mreže ili lokalne bankovne navike.",
            ],
            [
              "Mogućnost štednje u Bitcoinu",
              "Poslovanje može dio primljenih sredstava zadržati kao Bitcoin pričuvu.",
            ],
            [
              "Učenje o novcu",
              "Tvrtka počinje jasnije razmišljati o prihodu, pričuvi, riziku i likvidnosti.",
            ],
          ],
        },
        callout:
          "Ali postoji i opasnost: uvesti Bitcoin plaćanja bez jasnog poslovnog plana. Zato ovaj vodič ne počinje tehnologijom. Počinje najvažnijim pitanjem.",
        link: {
          before: "Za širi monetarni okvir pročitajte i vodič",
          label: "Bitcoin kao novac",
          href: "/vodici/bitcoin-kao-novac/",
          after:
            "jer prihvaćanje Bitcoina ima smisla tek kada znate koju ulogu novac ima u sustavu.",
        },
      },
      {
        heading: "Prvo pitanje: što ćete napraviti s primljenim Bitcoinom?",
        body: [
          "Prihvaćanje Bitcoina nije samo tehnička odluka. To je poslovna odluka. Pravo pitanje nije samo koji alat koristiti, nego što će poslovanje napraviti s primljenim Bitcoinom.",
        ],
        subsections: [
          {
            heading: "Kupac plaća Bitcoinom, vi primate eure",
            body: [
              "Ovo je često najjednostavniji početak za hrvatska poslovanja. Kupac dobije mogućnost plaćanja Bitcoinom, a poslovanje ne mora odmah upravljati Bitcoinom, privatnim ključevima ili vlastitom infrastrukturom.",
              "PayCek je primjer lokalnog procesorskog rješenja za takav početak. U tom modelu račun može biti temeljen u eurima, a sustav pretvara plaćanje u euro iznos koji poslovanje prima. To može biti praktično za trgovinu, restoran, hotel, event ili webshop koji želi testirati potražnju bez promjene cijelog sustava naplate.",
              "Ovo nije porezni, pravni ni računovodstveni savjet. Prije implementacije treba provjeriti kako se računi, evidencija, naknade i izvještaji uklapaju u vaš konkretan poslovni proces.",
            ],
            link: {
              before: "Više o lokalnom procesorskom rješenju pogledajte na",
              label: "PayCek",
              href: "https://paycek.io/",
              after: ".",
            },
          },
          {
            heading: "Dio zadržavate u Bitcoinu, dio pretvarate u eure",
            body: [
              "Prijelazni model često je zdraviji od naglog skoka u potpuno Bitcoin-native sustav. Primjerice, poslovanje može odlučiti da se 80 % primljenog iznosa pretvara u eure, a 20 % ostaje u Bitcoinu.",
              "Takav model priznaje dvije stvarnosti odjednom: posao treba euro likvidnost za poreze, plaće, dobavljače i kratkoročne obveze, ali želi postupno graditi Bitcoin pričuvu. Tu odluku treba zapisati, pratiti i redovito preispitivati.",
            ],
            link: {
              before:
                "Ako još nije jasno koji novac u poslu stvarno može ostati po strani, prvo uredite",
              label: "proračun i namjenu novca",
              href: "/proracun/",
              after: ".",
            },
          },
          {
            heading: "Bitcoin zadržavate kao Bitcoin",
            body: [
              "Ovo je najzahtjevniji model. Poslovanje stvarno prima Bitcoin i čuva ga kao dio svoje poslovne imovine. To traži jasnu euro likvidnost, sigurnost, računovodstvo i odgovornost.",
              "Takva odluka više nije samo platna integracija. To je dio upravljanja poslovnom imovinom. Treba biti jasno tko smije odlučiti, tko smije provesti transakciju, kako se čuva pristup, što se događa ako odgovorna osoba nije dostupna i kako se odluka objašnjava računovodstveno.",
            ],
            link: {
              before:
                "Za taj sloj prije tehničke implementacije vrijedi pročitati i",
              label: "sigurnosni okvir",
              href: "/sigurnost/",
              after: ".",
            },
          },
        ],
      },
      {
        heading: "Tri osnovna modela implementacije",
        body: [
          "Kako prihvatiti Bitcoin ovisi o tome što poslovanje želi postići. Isti QR kod na blagajni može skrivati vrlo različite poslovne modele.",
        ],
        subsections: [
          {
            heading:
              "Model 1: Lokalni procesor koji kupcu omogućuje Bitcoin, a poslovanju euro",
            body: [
              "PayCek i Electrocoin su relevantni lokalni pojmovi kada hrvatsko poslovanje želi brzo omogućiti Bitcoin plaćanje, a primati eure. Taj model je praktičan kada poslovanje ne želi izravno upravljati privatnim ključevima i želi podršku na hrvatskom jeziku.",
              "Prema Hanfa objavi od 9. travnja 2026., Electrocoin d.o.o. dobio je Hanfino odobrenje za rad kao pružatelj usluga povezanih s kriptoimovinom prema MiCA okviru. Takve informacije treba uvijek provjeriti na službenom izvoru jer se regulatorni status i opseg usluga mogu mijenjati.",
              "Ovaj model je dobar kada poslovanje želi brzo omogućiti Bitcoin plaćanje, primati eure, izbjeći izravno upravljanje privatnim ključevima, imati podršku na hrvatskom jeziku i uklopiti plaćanje u postojeće prodajne procese.",
            ],
            callout:
              "Glavni nedostatak: ovo nije Bitcoin-native pristup. Poslovanje zapravo ne koristi Bitcoin kao vlastiti novac, nego omogućuje kupcu da plati Bitcoinom dok poslovanje prima eure.",
            links: [
              { label: "PayCek", href: "https://paycek.io/" },
              { label: "Electrocoin", href: "https://electrocoin.eu/" },
              {
                label: "Hanfa objava o MiCA odobrenju",
                href: "https://www.hanfa.hr/news/hanfa-board-meeting-electrocoin-doo-becomes-the-first-company-to-obtain-hanfa-s-authorisation-to-operate-in-accordance-with-mica/",
              },
            ],
          },
          {
            heading: "Model 2: Bitcoin procesor s Lightning podrškom",
            body: [
              "OpenNode je primjer procesora koji omogućuje Bitcoin i Lightning plaćanja bez toga da poslovanje mora voditi vlastiti čvor. Taj model može biti koristan za online prodaju, evente i međunarodne kupce.",
              "Ovaj model je dobar kada poslovanje želi Lightning plaćanja, bržu Bitcoin-native implementaciju, manje tehničkog održavanja nego kod vlastitog servera, mogućnost primanja Bitcoina ili lokalne valute i praktičan model za prodaju s većim brojem kupaca.",
            ],
            callout:
              "Glavni nedostatak: oslanjanje na tuđu infrastrukturu. To nije isto kao vlastiti Bitcoin čvor i vlastito skrbništvo.",
            links: [{ label: "OpenNode", href: "https://opennode.com/" }],
          },
          {
            heading: "Model 3: Vlastiti BTCPay Server",
            body: [
              "BTCPay Server je self-hosted open-source procesor za Bitcoin plaćanja. Ovo je najviše u duhu Bitcoina, ali traži najviše odgovornosti.",
              "Dobar je za tehnički sposobna poslovanja, webshopove koji žele samostalnu infrastrukturu, Bitcoin-only brendove, organizatore Bitcoin događaja, poduzeća koja žele zadržavati Bitcoin i poslovanja koja žele izbjeći ovisnost o procesoru.",
            ],
            cards: [
              {
                title: "Prednosti",
                text: "Veća kontrola, nema klasičnog platnog posrednika, open-source infrastruktura, mogućnost on-chain i Lightning plaćanja i izravniji odnos prema vlastitom Bitcoin novcu.",
              },
              {
                title: "Nedostaci",
                text: "Tehničko održavanje, potreba za internim znanjem, sigurnosna odgovornost, upravljanje Lightning likvidnošću i jasni procesi u slučaju greške, bolesti, odlaska zaposlenika ili promjene odgovorne osobe.",
              },
            ],
            link: {
              before: "Saznajte više na službenoj stranici",
              label: "BTCPay Server",
              href: "https://btcpayserver.org/",
              after: ".",
            },
          },
        ],
      },
      {
        heading: "On-chain ili Lightning?",
        body: [
          "Bitcoin plaćanje nije uvijek ista tehnička situacija. Veći i rjeđi iznosi mogu imati drukčije potrebe od kave, pića, ulaznice ili brzog računa na eventu.",
        ],
        subsections: [
          {
            heading: "On-chain plaćanje",
            body: [
              "On-chain transakcija se zapisuje izravno u Bitcoin blockchain. Prikladna je za veće iznose, rjeđe uplate, situacije u kojima nije problem čekati potvrdu i uplate gdje je sigurnost važnija od brzine.",
              "Nije idealna za kave, pića, male račune, gužve na blagajni i evente s puno brzih transakcija.",
            ],
          },
          {
            heading: "Lightning plaćanje",
            body: [
              "Lightning Network je drugi sloj iznad Bitcoina koji omogućuje brže i jeftinije uplate. Zato su lightning plaćanja posebno korisna kada je račun mali, kupac čeka ispred blagajne i potvrda mora biti praktično trenutna.",
              "Lightning je prikladan za kafiće, restorane, male trgovine, suvenirnice, događaje, naplatu ulaznica, naplatu pića i hrane, turističke lokacije i veći broj manjih transakcija.",
            ],
            link: {
              before: "Osnovni opis mreže dostupan je na stranici",
              label: "Lightning Network",
              href: "https://lightning.network/",
              after: ".",
            },
          },
          {
            heading: "Što je Lightning inbound likvidnost?",
            body: [
              "Ako koristite vlastiti Lightning čvor, nije dovoljno samo uključiti Lightning. Da biste mogli primati uplate, vaši kanali moraju imati kapacitet za primanje. To se zove inbound likvidnost.",
              "Vlastiti Lightning čvor daje više kontrole, ali ta kontrola dolazi s operativnom odgovornošću.",
            ],
          },
        ],
      },
      {
        heading: "Kako odabrati pravo rješenje?",
        body: [
          "Pravo rješenje nije ono koje zvuči najnaprednije. Pravo rješenje je ono koje odgovara vašem poslovnom modelu, kupcima, likvidnosti, računovodstvu, sigurnosti i tehničkom kapacitetu.",
        ],
        table: {
          columns: ["Pitanje", "Zašto je važno"],
          rows: [
            [
              "Želite li zadržavati Bitcoin?",
              "Ako ne želite, treba vam procesor s automatskom konverzijom.",
            ],
            [
              "Imate li puno malih računa?",
              "Ako imate, Lightning je vjerojatno važan.",
            ],
            ["Imate li webshop?", "Treba provjeriti integracije s platformom."],
            ["Imate li fizičku lokaciju?", "Treba POS ili web POS rješenje."],
            [
              "Imate li računovođu koji razumije proces?",
              "Evidencija mora biti jasna od prvog dana.",
            ],
            [
              "Imate li osobu za tehničko održavanje?",
              "Ako nemate, self-hosted rješenje može biti previše.",
            ],
            [
              "Koliko je Bitcoin važan za vaš brend?",
              "Ako je jako važan, Bitcoin-native pristup ima više smisla.",
            ],
            [
              "Koliko brzo želite krenuti?",
              "Brz pilot i idealna arhitektura nisu uvijek ista stvar.",
            ],
          ],
        },
      },
      {
        heading: "Preporučeni redoslijed implementacije",
        body: [
          "Uvođenje Bitcoin plaćanja najbolje funkcionira kada se prvo postavi redoslijed odluka, a tek onda bira alat.",
        ],
        items: [
          "1. Odrediti poslovni cilj.",
          "2. Odrediti politiku zadržavanja Bitcoina.",
          "3. Provjeriti računovodstvo i porezni tretman. Ovaj vodič nije porezni, pravni ni računovodstveni savjet.",
          "4. Odabrati tehnički model.",
          "5. Napraviti pilot.",
          "6. Komunicirati da prihvaćate Bitcoin.",
          "7. Pregled nakon 30 i 90 dana.",
        ],
        link: {
          before:
            "Ako Bitcoin uvodite dok se posao još bori s obvezama, prvo prođite okvir za",
          label: "dug i budući novac",
          href: "/dug/",
          after: ".",
        },
      },
      {
        heading: "Najčešće pogreške",
        body: [
          "Najveće pogreške ne događaju se zato što poslovanje nije izabralo savršen alat. Događaju se zato što nitko nije jasno odredio što alat treba postići.",
        ],
        cards: [
          {
            title: "Krenuti od tehnologije umjesto od poslovne odluke",
            text: "Alat ne može zamijeniti odluku o tome želite li eure, Bitcoin ili kombinaciju.",
          },
          {
            title: "Uvesti Bitcoin bez računovodstvenog procesa",
            text: "Svaka naplata mora imati jasan trag, izvještaj i način evidentiranja.",
          },
          {
            title: "Zadržavati Bitcoin bez plana likvidnosti",
            text: "Posao mora znati iz čega plaća poreze, plaće, dobavljače i kratkoročne obveze.",
          },
          {
            title: "Koristiti self-hosted rješenje bez osobe koja ga razumije",
            text: "Samostalna infrastruktura ima smisla samo ako netko stvarno zna što održava.",
          },
          {
            title: "Ignorirati sigurnost",
            text: "Ako Bitcoin ostaje u poslu, sigurnost pristupa postaje poslovni proces.",
          },
          {
            title: "Ne educirati zaposlenike",
            text: "Zaposlenici ne moraju biti stručnjaci, ali moraju znati provesti osnovnu naplatu.",
          },
          {
            title: "Ne reći tržištu da prihvaćate Bitcoin",
            text: "Marketinška prednost postoji samo ako kupci mogu saznati da Bitcoin plaćanje postoji.",
          },
        ],
      },
      {
        heading: "Koji model je za vas?",
        body: [
          "Ovo nije konačna preporuka za svako poslovanje, nego početna mapa odluke. Pravi izbor ovisi o iznosima, broju transakcija, kupcima, računovodstvu, sigurnosti i spremnosti za tehničko održavanje.",
        ],
        table: {
          columns: ["Situacija", "Najvjerojatnije rješenje"],
          rows: [
            [
              "Turistički objekt želi brzo omogućiti Bitcoin plaćanje, ali primati eure",
              "PayCek ili slično lokalno procesorsko rješenje.",
            ],
            [
              "Restoran ili kafić želi testirati potražnju među Bitcoinerima",
              "PayCek za početak ili OpenNode ako je Lightning važan.",
            ],
            [
              "Event s mnogo malih transakcija",
              "Lightning rješenje, često OpenNode ili dobro pripremljen BTCPay.",
            ],
            [
              "Webshop koji želi jednostavnu integraciju",
              "PayCek, OpenNode ili BTCPay, ovisno o cilju.",
            ],
            ["Bitcoin-only brend", "BTCPay Server."],
            [
              "Tvrtka želi graditi Bitcoin pričuvu",
              "BTCPay ili procesor koji omogućuje zadržavanje dijela Bitcoina.",
            ],
            [
              "Poslovanje nema tehničku osobu",
              "Ne počinjati sa self-hosted rješenjem.",
            ],
            ["Poslovanje ima tehnički tim i želi kontrolu", "BTCPay Server."],
          ],
        },
      },
      {
        heading: "Zaključak",
        hideFromToc: true,
        body: [
          "Prihvaćanje Bitcoina nije samo tehnička odluka.",
          "To je poslovna odluka.",
          "Može biti jednostavna: kupac plaća Bitcoinom, vi primate eure.",
          "Može biti prijelazna: dio primljenog iznosa ostaje u Bitcoinu.",
          "Može biti potpuno Bitcoin-native: poslovanje prima i čuva Bitcoin kao dio svoje novčane pričuve.",
          "Svaki model može biti dobar ako odgovara stvarnosti poslovanja.",
          "Problem nastaje kada se model izabere bez plana.",
          "Zato prije implementacije treba jasno vidjeti poslovni cilj, očekivane kupce, računovodstveni proces, tehničku odgovornost, sigurnost, politiku zadržavanja ili konverzije i način komunikacije prema tržištu.",
          "Bitcoin plaćanja mogu otvoriti nova vrata.",
          "Ali najbolji rezultat nastaje kada se ne uvode kao trik, nego kao dio uređenog poslovnog sustava.",
        ],
      },
    ],
    faq: [
      {
        question: "Treba li tvrtka zadržati Bitcoin koji primi?",
        answer:
          "Ne nužno. Mnogim poslovanjima je najjednostavnije započeti tako da kupac plaća Bitcoinom, a poslovanje prima eure. Zadržavanje Bitcoina ima smisla tek kada poslovanje ima jasan proračun, dovoljno euro likvidnosti, računovodstveni proces i sigurnosni plan.",
      },
      {
        question: "Može li kupac platiti Bitcoinom, a poslovanje primiti eure?",
        answer:
          "Da. To je jedan od najpraktičnijih modela za početak. Kupac koristi Bitcoin, a platni procesor izvršava konverziju i poslovanje prima euro iznos.",
      },
      {
        question: "Što je Lightning Network?",
        answer:
          "Lightning Network je drugi sloj iznad Bitcoina koji omogućuje brže i jeftinije uplate. Posebno je koristan za manje iznose, ugostiteljstvo, trgovine i evente gdje nije praktično čekati on-chain potvrde.",
      },
      {
        question: "Treba li poslovanju vlastiti Bitcoin node?",
        answer:
          "Ne uvijek. Vlastiti node i BTCPay Server daju više kontrole, ali traže tehničko znanje i odgovornost. Za početak, mnoga poslovanja mogu koristiti procesorsko rješenje. Vlastiti node ima više smisla kada poslovanje želi ozbiljnije zadržavati Bitcoin i upravljati vlastitom infrastrukturom.",
      },
      {
        question: "Je li Bitcoin naplata prikladna za male iznose?",
        answer:
          "Da, ali uglavnom preko Lightninga. On-chain Bitcoin transakcije su prikladnije za veće iznose ili situacije u kojima brzina nije presudna. Za kavu, piće, obrok ili event naplatu Lightning je praktičniji.",
      },
      {
        question: "Što ako zaposlenici ne razumiju Bitcoin?",
        answer:
          "Ne moraju postati Bitcoin stručnjaci. Ali moraju znati osnovni proces naplate: kako otvoriti račun, prikazati QR kod, potvrditi uplatu i kome se obratiti ako nešto zapne. Edukacija zaposlenika je dio implementacije.",
      },
      {
        question: "Je li prihvaćanje Bitcoina marketinška prednost?",
        answer:
          "Može biti. Bitcoin korisnici često aktivno traže mjesta koja prihvaćaju Bitcoin i dijele takve informacije unutar zajednice. Ali marketinška prednost postoji samo ako poslovanje jasno komunicira da prihvaća Bitcoin.",
      },
    ],
    extraCta: {
      id: "razgovor-o-implementaciji",
      title: "Želite prihvaćati Bitcoin u svojem poslovanju?",
      text: "Uvođenje Bitcoin plaćanja može biti jednostavno, ali rješenje treba odgovarati vašoj stvarnoj situaciji.",
      items: [
        "ima li Bitcoin naplata smisla za vaš tip poslovanja",
        "želite li primati eure, Bitcoin ili kombinaciju",
        "koje je rješenje prikladno za vašu lokaciju, webshop ili event",
        "kako uklopiti Bitcoin u postojeći proračun i poslovnu likvidnost",
        "kako postaviti računovodstveni i operativni proces",
        "kako urediti sigurnost ako zadržavate Bitcoin",
        "kako komunicirati Bitcoin plaćanja prema kupcima",
      ],
      finalText:
        "Uvodni razgovor je najjednostavniji prvi korak prema implementaciji koja odgovara vašem poslovanju.",
      label: "Dogovorite uvodni razgovor",
      href: "/razgovor/",
      dataCta: "guide-business-bitcoin-payments-final",
    },
    finalCta: "Dogovorite uvodni razgovor",
    hideDefaultFinalCta: true,
  },
  {
    slug: "poslovni-bitcoin-nije-privatni-bitcoin",
    title: "Poslovni Bitcoin nije privatni Bitcoin",
    metaDescription:
      "Bitcoin koji pripada poslu treba evidenciju, ovlaštene osobe, pravila odobravanja i plan ako vlasnik ili direktor nije dostupan.",
    excerpt:
      "Bitcoin koji pripada poslu treba evidenciju, ovlaštene osobe, pravila odobravanja i plan ako vlasnik ili direktor nije dostupan.",
    category: "Sigurnost i obitelj",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 106,
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-15",
    practicalQuestion:
      "Bi li posao znao što napraviti s poslovnim Bitcoinom ako vlasnik ili direktor nije dostupan?",
    relatedSlugs: [
      "prihod-nije-slobodan-novac",
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
      "obiteljski-pristup-bitcoinu",
    ],
    visual: {
      type: "safety",
      title: "Privatno i poslovno nisu isti sloj",
      zones: [
        {
          label: "evidencija",
          description: "što pripada poslu, a što privatno",
        },
        {
          label: "ovlaštenja",
          description: "tko smije odobriti i što se nikada ne dijeli",
        },
        {
          label: "oporavak",
          description: "što ako ključna osoba nije dostupna",
        },
      ],
      caption:
        "Poslovni Bitcoin treba pravila, a ne samo osobno sjećanje vlasnika.",
    },
    sections: [
      {
        heading:
          "Poslovni Bitcoin ne bi trebao biti pomiješan s privatnim Bitcoinom",
        body: [
          "Privatni Bitcoin i poslovni Bitcoin imaju različite obveze, različitu evidenciju i različite posljedice. Ako se pomiješaju, nastaje maglovita masa koju je teško objasniti sebi, obitelji, poslovnom partneru ili stručnjacima.",
          "Razdvajanje nije samo tehničko pitanje. To je pitanje odgovornosti. Poslovni Bitcoin pripada poslovnom sustavu, a taj sustav ima obveze prema zaposlenicima, dobavljačima, kupcima, partnerima i institucijama.",
        ],
      },
      {
        heading: "Ako je sve u glavi jedne osobe, posao ima operativni rizik",
        body: [
          "Vlasnik ili direktor može razumjeti cijeli sustav, ali posao ne smije ovisiti samo o tome da je ta osoba dostupna, smirena i zdrava. Ako nitko drugi ne zna što postoji, što se ne smije dirati i gdje počinje oporavak, rizik nije vidljiv na računu.",
          "Dobar poslovni okvir ne predaje kontrolu svima. On definira što se dokumentira, tko je ovlašten za koji korak, kako se odobravaju transakcije i što se radi ako ključna osoba nije dostupna.",
        ],
      },
      {
        heading: "Evidencija, ovlaštene osobe i pravila odobravanja",
        body: [
          "Poslovni Bitcoin treba evidenciju, ovlaštene osobe, pravila odobravanja transakcija i plan nedostupnosti ključne osobe. To ne znači da svi znaju sve. Znači da postoji uređen put.",
          "Kod većih iznosa ima smisla razmišljati o razdvajanju dužnosti, profesionalnoj pomoći i dokumentima koji su usklađeni s pravnim i računovodstvenim obvezama. Svaki stručnjak može pomoći u svojem dijelu.",
        ],
      },
      {
        heading: "Što se nikada ne stavlja u pogrešne dokumente",
        body: [
          "Privatni ključevi, Bitcoin Core wallet backup datoteke, wallet passphraseovi, početne riječi drugih walleta i lozinke nikada se ne stavljaju u dokumente koji prolaze kroz institucije ili osobe koje ne smiju imati pristup. Posao može imati evidenciju bez otkrivanja osjetljivih sigurnosnih podataka.",
          "U praksi to znači da dokumenti mogu objasniti postojanje, odgovornosti, kontaktne točke i zabrane. Kontrola nad Bitcoinom ostaje zaštićena od nepotrebnog širenja.",
        ],
      },
      {
        heading: "Nitko ne mora imati sve informacije",
        body: [
          "Računovođa ne mora imati sigurnosne podatke. Pravnik ne mora znati tehničke detalje koje ne treba znati. Tehnička osoba ne mora donositi poslovne odluke. Vlasnik ne mora sve držati samo u glavi.",
          "Cilj je razdvojiti uloge tako da svaka osoba zna svoj dio, a da nitko nepotrebno ne dobije kontrolu. To je sigurnosni i operativni okvir, ne prepuštanje Bitcoina nekome drugome.",
        ],
      },
    ],
    finalCta: "Razgovarajmo o poslovnom Bitcoin okviru.",
    finalCtaPrompt:
      "Ako poslovni Bitcoin postoji ili ga razmatrate, a nije jasno tko smije što napraviti, uvodni razgovor može pomoći razdvojiti privatni, poslovni i sigurnosni sloj.",
  },
]

export const guides = [
  ...guideEntries,
  bitcoinCoreStandardGuide,
  selfCustodyOrCustodianGuide,
  bip110Guide,
].sort((first, second) => {
  if (first.order !== second.order) {
    return first.order - second.order
  }

  return first.title.localeCompare(second.title, "hr")
})

export const foundationalGuideSlugs = [
  "svaki-euro-ima-namjenu",
  "stvarni-visak",
  "prihod-nije-slobodan-novac",
  "starost-novca",
  "dca-nije-dovoljan",
  "dug-je-buduci-novac",
  "od-duga-prema-vlasnistvu",
  "dug-ili-bitcoin",
  "ne-zaduzujte-se-za-bitcoin",
  "davanje-u-proracunu-nulte-osnove",
  "davanje-bez-duga",
  "novac-dolazi-od-ljudi",
  "niste-zakasnili-u-bitcoin",
  "kada-bitcoin-postane-distrakcija",
  "bitcoin-kao-novac",
  "bitcoin-nije-kripto-portfelj",
  "pozitivni-neto-priljev",
  "novac-kapital-potrosnja",
  "bitcoin-u-neto-imovini",
  "bitcoin-kao-stopa-prepreke",
  "pravilo-trecina",
  "uskladivanje-kupovne-moci-bitcoina",
  "sigurnost-ne-smije-ovisiti-samo-o-vama",
  "bitcoin-core-standard",
  "samostalna-pohrana-ili-skrbnik",
  "poslovni-bitcoin-nije-privatni-bitcoin",
  "obiteljski-pristup-bitcoinu",
] as const

export const researchGuideSlugs = [
  "zasto-ne-podrzavam-bip-110-prostor-u-bloku-i-buducnost-bitcoina-kao-novca",
  "digitalni-kredit-nije-bitcoin",
  "digitalni-kredit-bitcoin-saylor",
  "prihvacanje-bitcoina-u-poslovanju",
  "cijena-kao-mjera-vremena",
  "saylor-bitcoin-ciklus-ponuda-potraznja",
  "ne-cekajte-savrseno-dno-bitcoina",
  "bitcoin-etfovi-i-riznicke-kompanije",
  "zaba-bitcoin-etf-certifikat",
  "bitcoin-bilanca-pojacana-izlozenost",
] as const

export type GuidesIndexPrimaryItem = {
  slug: string
  title: string
  category: string
  excerpt: string
}

export const guidesIndexPrimaryItems: GuidesIndexPrimaryItem[] = [
  {
    slug: "svaki-euro-ima-namjenu",
    title: "Svaki euro ima namjenu",
    category: "Proračun",
    excerpt:
      "Proračun nulte osnove pokazuje koji novac je stvarno slobodan za Bitcoin odluku.",
  },
  {
    slug: "dug-je-buduci-novac",
    title: "Dug je budući novac koji ste već potrošili",
    category: "Dug",
    excerpt:
      "Bitcoin i dug ne smiju se promatrati samo matematički. Dug mijenja stanje osobe koja odlučuje.",
  },
  {
    slug: "davanje-u-proracunu-nulte-osnove",
    title: "Davanje mijenja vaš odnos prema novcu",
    category: "Davanje",
    excerpt:
      "Nakon reda i izlaska iz duga, dio novca dobiva namjenu za druge ljude.",
  },
  {
    slug: "bitcoin-kao-novac",
    title: "Bitcoin je novac",
    category: "Bitcoin kao novac",
    excerpt:
      "Bitcoin nije samo imovina koju držite. U osobnom Bitcoin standardu ima ulogu novca.",
  },
  {
    slug: "niste-zakasnili-u-bitcoin",
    title: "Niste zakasnili u Bitcoin",
    category: "Bitcoin kao novac",
    excerpt:
      "Bitcoin je prije bio jeftiniji, ali je razumijevanje bilo skuplje.",
  },
  {
    slug: "bitcoin-nije-kripto-portfelj",
    title: "Bitcoin nije kripto portfelj",
    category: "Bitcoin kao novac",
    excerpt:
      "Bitcoin je novac, a ostale kriptovalute su eventualno rizične investicije koje treba mjeriti u Bitcoinu.",
  },
  {
    slug: "prihvacanje-bitcoina-u-poslovanju",
    title: "Prihvaćanje Bitcoina u poslovanju",
    category: "Poslovanje",
    excerpt:
      "Kako odabrati model za Bitcoin plaćanja: primati eure, zadržati Bitcoin ili koristiti kombinaciju.",
  },
  {
    slug: "cijena-kao-mjera-vremena",
    title: "Cijena kao mjera vremena",
    category: "Kupovna moć",
    excerpt:
      "Dugoročni trend je pomoćni signal, ne prognoza cijene. Proračun odlučuje prvi.",
  },
  {
    slug: "bitcoin-u-neto-imovini",
    title: "Bitcoin i ravnoteža neto imovine",
    category: "Neto imovina",
    excerpt:
      "Novac, potrošna dobra i proizvodna imovina imaju različite uloge.",
  },
  {
    slug: "bitcoin-core-standard",
    title: "Bitcoin Core Standard za dugoročnu štednju",
    category: "Sigurnost i obitelj",
    excerpt:
      "Offline potpisivanje, watch-only koordinacija, vlastiti node, PSBT i provjeren oporavak kao jedan razumljiv sustav.",
  },
]

export const guidesIndexAdditionalGroups = [
  {
    title: "Proračun",
    slugs: [
      "stvarni-visak",
      "prihod-nije-slobodan-novac",
      "starost-novca",
      "dca-nije-dovoljan",
    ],
  },
  {
    title: "Dug",
    slugs: [
      "od-duga-prema-vlasnistvu",
      "dug-ili-bitcoin",
      "ne-zaduzujte-se-za-bitcoin",
    ],
  },
  {
    title: "Davanje",
    slugs: ["davanje-bez-duga", "novac-dolazi-od-ljudi"],
  },
  {
    title: "Bitcoin kao novac",
    slugs: [
      "niste-zakasnili-u-bitcoin",
      "kada-bitcoin-postane-distrakcija",
      "bitcoin-nije-kripto-portfelj",
      "pozitivni-neto-priljev",
      "digitalni-kredit-nije-bitcoin",
      "digitalni-kredit-bitcoin-saylor",
    ],
  },
  {
    title: "Poslovanje",
    slugs: ["prihvacanje-bitcoina-u-poslovanju"],
  },
  {
    title: "Vrijeme i volatilnost",
    slugs: [
      "uskladivanje-kupovne-moci-bitcoina",
      "cijena-kao-mjera-vremena",
      "saylor-bitcoin-ciklus-ponuda-potraznja",
      "ne-cekajte-savrseno-dno-bitcoina",
    ],
  },
  {
    title: "Neto imovina",
    slugs: [
      "novac-kapital-potrosnja",
      "bitcoin-kao-stopa-prepreke",
      "bitcoin-etfovi-i-riznicke-kompanije",
      "zaba-bitcoin-etf-certifikat",
      "bitcoin-bilanca-pojacana-izlozenost",
      "pravilo-trecina",
    ],
  },
  {
    title: "Sigurnost i obitelj",
    slugs: [
      "bitcoin-core-standard",
      "poslovni-bitcoin-nije-privatni-bitcoin",
      "samostalna-pohrana-ili-skrbnik",
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
      "obiteljski-pristup-bitcoinu",
    ],
  },
] as const

export const guidesIndexOrderedSlugs = [
  "zasto-ne-podrzavam-bip-110-prostor-u-bloku-i-buducnost-bitcoina-kao-novca",
  "svaki-euro-ima-namjenu",
  "stvarni-visak",
  "prihod-nije-slobodan-novac",
  "starost-novca",
  "dca-nije-dovoljan",
  "dug-je-buduci-novac",
  "od-duga-prema-vlasnistvu",
  "dug-ili-bitcoin",
  "ne-zaduzujte-se-za-bitcoin",
  "davanje-u-proracunu-nulte-osnove",
  "davanje-bez-duga",
  "novac-dolazi-od-ljudi",
  "niste-zakasnili-u-bitcoin",
  "kada-bitcoin-postane-distrakcija",
  "bitcoin-kao-novac",
  "bitcoin-nije-kripto-portfelj",
  "pozitivni-neto-priljev",
  "digitalni-kredit-nije-bitcoin",
  "digitalni-kredit-bitcoin-saylor",
  "prihvacanje-bitcoina-u-poslovanju",
  "uskladivanje-kupovne-moci-bitcoina",
  "cijena-kao-mjera-vremena",
  "saylor-bitcoin-ciklus-ponuda-potraznja",
  "ne-cekajte-savrseno-dno-bitcoina",
  "novac-kapital-potrosnja",
  "bitcoin-u-neto-imovini",
  "bitcoin-kao-stopa-prepreke",
  "pravilo-trecina",
  "bitcoin-etfovi-i-riznicke-kompanije",
  "zaba-bitcoin-etf-certifikat",
  "bitcoin-bilanca-pojacana-izlozenost",
  "sigurnost-ne-smije-ovisiti-samo-o-vama",
  "bitcoin-core-standard",
  "samostalna-pohrana-ili-skrbnik",
  "poslovni-bitcoin-nije-privatni-bitcoin",
  "obiteljski-pristup-bitcoinu",
]

export const recommendedGuideSlugs = [
  "svaki-euro-ima-namjenu",
  "stvarni-visak",
  "prihod-nije-slobodan-novac",
  "starost-novca",
  "dug-je-buduci-novac",
  "od-duga-prema-vlasnistvu",
  "dug-ili-bitcoin",
  "davanje-u-proracunu-nulte-osnove",
  "niste-zakasnili-u-bitcoin",
  "kada-bitcoin-postane-distrakcija",
  "bitcoin-kao-novac",
  "bitcoin-nije-kripto-portfelj",
  "digitalni-kredit-nije-bitcoin",
  "digitalni-kredit-bitcoin-saylor",
  "prihvacanje-bitcoina-u-poslovanju",
  "uskladivanje-kupovne-moci-bitcoina",
  "saylor-bitcoin-ciklus-ponuda-potraznja",
  "ne-cekajte-savrseno-dno-bitcoina",
  "bitcoin-kao-stopa-prepreke",
  "pravilo-trecina",
  "bitcoin-etfovi-i-riznicke-kompanije",
  "zaba-bitcoin-etf-certifikat",
  "bitcoin-bilanca-pojacana-izlozenost",
  "sigurnost-ne-smije-ovisiti-samo-o-vama",
  "bitcoin-core-standard",
  "samostalna-pohrana-ili-skrbnik",
  "poslovni-bitcoin-nije-privatni-bitcoin",
  "obiteljski-pristup-bitcoinu",
]

export const featuredGuides = guides.filter((guide) => guide.featured)

export const guideRoutes = guides.map((guide) => guideHref(guide.slug))

export function findGuide(slug: string | undefined) {
  return guides.find(
    (guide) => guide.slug === slug || guide.previousSlugs?.includes(slug ?? "")
  )
}

export function guidesByCategory(category: GuideCategory) {
  return guides.filter((guide) => guide.category === category)
}
