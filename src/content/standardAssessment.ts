import { guideHref } from "./guideLinks.ts"

export const STANDARD_AREA_IDS = [
  "proracun",
  "dug",
  "davanje",
  "bitcoin-kao-novac",
  "neto-imovina",
  "vrijeme-volatilnost",
  "sigurnost-obitelj",
] as const

export type StandardAreaId = (typeof STANDARD_AREA_IDS)[number]
export type AssessmentAnswer = 0 | 1 | 2
export type AssessmentStatementId = `${StandardAreaId}-${1 | 2 | 3}`
export type AssessmentAnswers = Partial<
  Record<AssessmentStatementId, AssessmentAnswer>
>
export type StandardAssessmentThemeKey = StandardAreaId | "vise-podrucja"

export interface AssessmentStatement {
  readonly id: AssessmentStatementId
  readonly text: string
}

export interface StandardAssessmentArea {
  readonly id: StandardAreaId
  readonly title: string
  readonly shortTitle: string
  readonly visualArea: string
  readonly themeKey: StandardAreaId
  readonly conversationPrompt: string
  readonly statements: readonly [
    AssessmentStatement,
    AssessmentStatement,
    AssessmentStatement,
  ]
}

export interface StandardAssessmentRecommendation {
  readonly interpretation: string
  readonly firstStep: string
  readonly relevantGuide: {
    readonly title: string
    readonly href: string
  }
  readonly contextualCtaLabel: string
}

export const assessmentAnswerOptions = [
  { value: 0, label: "Nemam pravilo" },
  { value: 1, label: "Djelomično / u glavi" },
  { value: 2, label: "Jasno, zapisano i provedeno" },
] as const satisfies ReadonlyArray<{
  value: AssessmentAnswer
  label: string
}>

export const standardAssessmentAreas = [
  {
    id: "proracun",
    title: "Vodite proračun nulte razine",
    shortTitle: "Proračun",
    visualArea: "vidjeti novac",
    themeKey: "proracun",
    conversationPrompt:
      "Imam Bitcoin, ali ne znam kako ga uklopiti u proračun.",
    statements: [
      {
        id: "proracun-1",
        text: "U svakom trenutku znam za što je namijenjen novac koji trenutačno imam.",
      },
      {
        id: "proracun-2",
        text: "Znam točno koliko sam potrošio po kategorijama — primjerice stanovanje, hrana, prijevoz i ostali troškovi — prije tri mjeseca i prije šest mjeseci.",
      },
      {
        id: "proracun-3",
        text: "Znam koliko je star novac koji trošim, mjereno u danima.",
      },
    ],
  },
  {
    id: "dug",
    title: "Dug: je li budućnost već zauzeta?",
    shortTitle: "Dug",
    visualArea: "osloboditi budućnost",
    themeKey: "dug",
    conversationPrompt: "Imam dug i ne znam kojim redoslijedom krenuti.",
    statements: [
      {
        id: "dug-1",
        text: "Imam potpun popis svih dugova ili sam provjerio da trenutačno nemam dug; za svaki postojeći dug znam iznos, ratu, rok, kamatu, vjerovnika i razlog nastanka.",
      },
      {
        id: "dug-2",
        text: "Ne zadužujem se za kupnju Bitcoina i ne koristim Bitcoin kao izgovor za odgađanje razduživanja.",
      },
      {
        id: "dug-3",
        text: "Ako imam dug, imam plan njegova uklanjanja; ako ga nemam, imam pravilo kojim izbjegavam novi dug.",
      },
    ],
  },
  {
    id: "davanje",
    title: "Davanje: je li ruka otvorena?",
    shortTitle: "Davanje",
    visualArea: "otvoriti ruku",
    themeKey: "davanje",
    conversationPrompt:
      "Želim odrediti jasno mjesto za davanje u svom novčanom sustavu.",
    statements: [
      {
        id: "davanje-1",
        text: "Imam kategoriju Davanje ili znam kada će ona postati stalna praksa nakon izlaska iz duga.",
      },
      {
        id: "davanje-2",
        text: "Davanje dolazi iz raspoređenog novca, a ne iz pritiska, dokazivanja, krivnje ili trenutnog raspoloženja.",
      },
      {
        id: "davanje-3",
        text: "Znam što se u mom sustavu smatra davanjem: pomoć, poklon, podrška, gostoprimstvo, obrazovanje ili služenje drugome.",
      },
    ],
  },
  {
    id: "bitcoin-kao-novac",
    title: "Bitcoin kao novac: je li uloga jasna?",
    shortTitle: "Bitcoin kao novac",
    visualArea: "jasna uloga",
    themeKey: "bitcoin-kao-novac",
    conversationPrompt:
      "Ne znam koju ulogu Bitcoin treba imati u mom novčanom sustavu.",
    statements: [
      {
        id: "bitcoin-kao-novac-1",
        text: "Znam kada je moj Bitcoin samo imovina za praćenje, a kada ga stvarno tretiram kao dio likvidnog proračuna.",
      },
      {
        id: "bitcoin-kao-novac-2",
        text: "Razmjenu eura u Bitcoin ne knjižim kao rashod, nego kao promjenu oblika novčanog salda.",
      },
      {
        id: "bitcoin-kao-novac-3",
        text: "Imam pravila za kupnju, prodaju i trošenje: kada se odluka donosi, tko je odobrava i iz koje kategorije dolazi.",
      },
    ],
  },
  {
    id: "neto-imovina",
    title: "Neto imovina: vidi li se cjelina?",
    shortTitle: "Neto imovina",
    visualArea: "vidjeti cjelinu",
    themeKey: "neto-imovina",
    conversationPrompt: "Imam imovinu, ali nemam jasna pravila.",
    statements: [
      {
        id: "neto-imovina-1",
        text: "Imam jednostavan popis neto imovine: likvidni novac, Bitcoin, dom, vozila, posao, oprema, financijski instrumenti i dugovi.",
      },
      {
        id: "neto-imovina-2",
        text: "Znam koji dio imovine služi potrošnji, koji dio stvara buduće priljeve, a koji dio čuva kupovnu moć.",
      },
      {
        id: "neto-imovina-3",
        text: "Imam pravilo ravnoteže kako jedna vrsta imovine ne bi pojela sve ostale odluke.",
      },
    ],
  },
  {
    id: "vrijeme-volatilnost",
    title: "Vrijeme i volatilnost: imate li pravila?",
    shortTitle: "Vrijeme i volatilnost",
    visualArea: "pravila kroz cikluse",
    themeKey: "vrijeme-volatilnost",
    conversationPrompt:
      "Želim koristiti Bitcoin kao novac, ali bojim se volatilnosti.",
    statements: [
      {
        id: "vrijeme-volatilnost-1",
        text: "Znam što radim ako kupovna moć Bitcoina padne 30%, bez panike i bez novog duga.",
      },
      {
        id: "vrijeme-volatilnost-2",
        text: "Znam što radim ako kupovna moć Bitcoina snažno poraste, bez euforije i bez trošenja iz budućnosti.",
      },
      {
        id: "vrijeme-volatilnost-3",
        text: "Usklađujem proračun sa stvarnim promjenama kupovne moći, a ne s prognozama.",
      },
    ],
  },
  {
    id: "sigurnost-obitelj",
    title: "Sigurnost i obitelj: tko zna prvi korak?",
    shortTitle: "Sigurnost i obitelj",
    visualArea: "prvi korak",
    themeKey: "sigurnost-obitelj",
    conversationPrompt:
      "Osoba kojoj vjerujem ne zna što prvo treba učiniti ako sam nedostupan.",
    statements: [
      {
        id: "sigurnost-obitelj-1",
        text: "Znam gdje je Bitcoin, koji je model skrbništva i koji je prvi korak oporavka — bez unošenja privatnih ključeva, Bitcoin Core wallet backup datoteka, wallet passphraseova ili početnih riječi drugih walleta u ovaj upitnik.",
      },
      {
        id: "sigurnost-obitelj-2",
        text: "Imam provjerenu sigurnosnu kopiju i barem jednom sam testirao postupak oporavka s malim iznosom ili testnim uređajem.",
      },
      {
        id: "sigurnost-obitelj-3",
        text: "Član obitelji ili druga odgovorna osoba koju sam odabrao zna kome se javiti i što prvo učiniti ako sam nedostupan, bez nepotrebnog otkrivanja tajni.",
      },
    ],
  },
] as const satisfies readonly StandardAssessmentArea[]

export const standardAssessmentRecommendations = {
  proracun: {
    interpretation:
      "Bez jasne namjene novca teško je vidjeti stvarni višak i donijeti mirnu Bitcoin odluku.",
    firstStep:
      "Na jednom mjestu zapišite ukupni likvidni novac i namjenu svakog njegova dijela.",
    relevantGuide: {
      title: "Svaki euro ima namjenu",
      href: guideHref("svaki-euro-ima-namjenu"),
    },
    contextualCtaLabel: "Razgovarajmo o stvarnom višku",
  },
  dug: {
    interpretation:
      "Dug unaprijed zauzima budući novac i često mora dobiti prioritet prije šire Bitcoin odluke.",
    firstStep:
      "Napravite potpun popis svih dugova s iznosom, ratom, kamatom i rokom.",
    relevantGuide: {
      title: "Dug je budući novac koji ste već potrošili",
      href: guideHref("dug-je-buduci-novac"),
    },
    contextualCtaLabel: "Razgovarajmo o redoslijedu razduživanja",
  },
  davanje: {
    interpretation:
      "Davanje treba imati održivo mjesto u sustavu kako ne bi ovisilo o pritisku, krivnji ili trenutnom raspoloženju.",
    firstStep:
      "Odredite jedan razuman oblik davanja koji ne stvara novi dug niti ugrožava postojeće obveze.",
    relevantGuide: {
      title: "Davanje mijenja vaš odnos prema novcu",
      href: guideHref("davanje-u-proracunu-nulte-osnove"),
    },
    contextualCtaLabel: "Razgovarajmo o mjestu davanja u sustavu",
  },
  "bitcoin-kao-novac": {
    interpretation:
      "Ako uloga Bitcoina nije jasna, promjena cijene lako počne mijenjati odluke koje bi trebala određivati pravila.",
    firstStep:
      "Dovršite jednu rečenicu: „U mom sustavu Bitcoin trenutačno služi kao...“",
    relevantGuide: {
      title: "Bitcoin je novac",
      href: guideHref("bitcoin-kao-novac"),
    },
    contextualCtaLabel: "Razgovarajmo o ulozi Bitcoina kao novca",
  },
  "neto-imovina": {
    interpretation:
      "Neto imovina pokazuje odnos novca, potrošne i proizvodne imovine, umjesto da se Bitcoin promatra odvojeno.",
    firstStep:
      "Na jednom listu razvrstajte svoju imovinu na novac, potrošnu imovinu i proizvodnu imovinu.",
    relevantGuide: {
      title: "Bitcoin i ravnoteža neto imovine",
      href: guideHref("bitcoin-u-neto-imovini"),
    },
    contextualCtaLabel: "Razgovarajmo o strukturi neto imovine",
  },
  "vrijeme-volatilnost": {
    interpretation:
      "Pravila za promjene kupovne moći smanjuju vjerojatnost da strah ili euforija preuzmu odluku.",
    firstStep:
      "Zapišite jednu odluku koju ne donosite isti dan tijekom velikog pada ili rasta kupovne moći Bitcoina.",
    relevantGuide: {
      title: "Usklađivanje kupovne moći Bitcoina",
      href: guideHref("uskladivanje-kupovne-moci-bitcoina"),
    },
    contextualCtaLabel: "Razgovarajmo o pravilima za promjene kupovne moći",
  },
  "sigurnost-obitelj": {
    interpretation:
      "Sigurnosni sustav mora istodobno smanjiti rizik krađe i rizik trajnog gubitka pristupa.",
    firstStep:
      "Zapišite samo prvi korak koji pouzdana osoba treba poduzeti ako ste nedostupni, bez privatnih ključeva, Bitcoin Core wallet backup datoteka, wallet passphraseova, početnih riječi drugih walleta ili osjetljivih lokacija.",
    relevantGuide: {
      title: "Bitcoin Core Standard za dugoročnu štednju",
      href: guideHref("bitcoin-core-standard"),
    },
    contextualCtaLabel: "Razgovarajmo o sigurnosti i obitelji",
  },
} as const satisfies Record<StandardAreaId, StandardAssessmentRecommendation>

export const standardAssessmentThemePrompts = {
  proracun: "Imam Bitcoin, ali ne znam kako ga uklopiti u proračun.",
  dug: "Imam dug i ne znam kojim redoslijedom krenuti.",
  davanje: "Želim odrediti jasno mjesto za davanje u svom novčanom sustavu.",
  "bitcoin-kao-novac":
    "Ne znam koju ulogu Bitcoin treba imati u mom novčanom sustavu.",
  "neto-imovina": "Imam imovinu, ali nemam jasna pravila.",
  "vrijeme-volatilnost":
    "Želim koristiti Bitcoin kao novac, ali bojim se volatilnosti.",
  "sigurnost-obitelj":
    "Osoba kojoj vjerujem ne zna što prvo treba učiniti ako sam nedostupan.",
  "vise-podrucja":
    "Imam Bitcoin, ali nekoliko dijelova mog novčanog sustava još nema jasna pravila.",
} as const satisfies Record<StandardAssessmentThemeKey, string>
