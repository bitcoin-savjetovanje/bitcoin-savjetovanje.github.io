export const conversationTopics = {
  "bitcoin-kao-novac": {
    label: "Bitcoin kao primarni novac",
    context: "osobno",
    question:
      "Koji dio prijelaza prema Bitcoinu kao primarnom novcu želite razjasniti?",
  },
  osobno: {
    label: "Osobni Bitcoin sustav",
    context: "osobno",
    question: "Koju osobnu Bitcoin odluku želite razjasniti?",
  },
  dug: {
    label: "Dug",
    context: "osobno",
    question:
      "Kako odrediti redoslijed razduživanja i ulogu Bitcoina tijekom tog prijelaza?",
  },
  obitelj: {
    label: "Obitelj",
    context: "obiteljski",
    question: "Koju obiteljsku odluku ili odgovornost želite razjasniti?",
  },
  sigurnost: {
    label: "Sigurnost",
    context: "obiteljski",
    question: "Koji dio svojeg modela skrbništva želite razjasniti?",
  },
  imovina: {
    label: "Imovina",
    context: "osobno",
    question:
      "Koju ulogu Bitcoin ima u mojoj neto imovini i koju odluku prvo trebam razjasniti?",
  },
  poslovno: {
    label: "Poslovno",
    context: "poslovno",
    question:
      "Kako odvojiti poslovne obveze od poslovnog novca koji nije potreban za bliska plaćanja?",
  },
  poduzetnik: {
    label: "Razgovor za poduzetnika",
    context: "poduzetnički",
    question: "Što pokušavate razdvojiti između poslovanja i osobne bilance?",
  },
  tvrtka: {
    label: "Bitcoin briefing za upravu",
    context: "poslovno",
    question: "Što je otvorilo Bitcoin kao poslovno pitanje u vašoj tvrtki?",
  },
} as const

export type ConversationTopicId = keyof typeof conversationTopics
export type ConversationTopic = (typeof conversationTopics)[ConversationTopicId]

export function isConversationTopicId(
  value: string | null
): value is ConversationTopicId {
  return Boolean(value && Object.hasOwn(conversationTopics, value))
}

export const conversationQuestionExamples = [
  "Kako odrediti redoslijed razduživanja i ulogu Bitcoina tijekom tog prijelaza?",
  "Kako partneru objasniti Bitcoin kao primarni novac?",
  "Kako urediti prvi korak oporavka za osobu od povjerenja?",
  "Kako odvojiti poslovne obveze od poslovnog novca koji nije potreban za bliska plaćanja?",
] as const

export const personalConversationPreparation = [
  "Prihod i operativni euri.",
  "Dug.",
  "Veći trošak.",
  "Bitcoin u neto imovini.",
  "Sigurnost.",
  "Davanje.",
  "Prijelaz na Bitcoin kao primarni novac.",
] as const

export const familyConversationPreparation = [
  "Partner ne razumije ulogu Bitcoina.",
  "Nemamo zajednička pravila za prihod i trošenje.",
  "Sigurnost ovisi samo o meni.",
  "Partner ne zna prvi korak.",
  "Dug i Bitcoin stvaraju napetost.",
  "Želimo urediti obiteljski kontinuitet.",
] as const

export const securityConversationPreparation = [
  "Odabir modela skrbništva.",
  "Pojedinačna točka kvara.",
  "Oporavak.",
  "Partnerov prvi korak.",
  "Prijelaz prema većoj samostalnosti.",
  "Operativni i dugoročni sloj.",
  "Poslovne ovlasti.",
] as const

export const conversationPurpose = {
  is: [
    "kratka procjena konteksta",
    "određivanje prvog uskog grla",
    "provjera koji oblik rada ima smisla",
    "prilika da postavite jedno početno pitanje",
    "način da utvrdimo odgovara li vam moj pristup",
  ],
  isNot: [
    "potpuna Bitcoin konzultacija",
    "predviđanje cijene",
    "nalog za kupnju ili prodaju",
    "pregled cijele financijske situacije",
    "tehničko postavljanje skrbništva",
    "porezni, pravni ili računovodstveni savjet",
  ],
} as const

export const conversationOutcomes = [
  {
    title: "Vodič ili materijal",
    copy: "Za pitanje nije potrebna plaćena suradnja. Dobit ćete smjer prema odgovarajućem sadržaju ili području za daljnje proučavanje.",
  },
  {
    title: "Bitcoin konzultacija",
    copy: "Jedno unaprijed definirano pitanje, pripremljeni razgovor od 60 minuta i pisani sažetak.",
    price: "200 €",
    href: "/bitcoin-konzultacija/",
    dataLink: "conversation-bitcoin-consultation",
  },
  {
    title: "Osobni Bitcoin standard",
    copy: "Povezivanje proračuna, duga, imovine, korištenja Bitcoina, sigurnosti i obiteljskog kontinuiteta kroz program od 4–6 tjedana.",
    price: "1.500 €",
    href: "/osobni-bitcoin-standard/",
    dataLink: "conversation-personal-standard",
  },
  {
    title: "Bez nastavka ili drugi stručnjak",
    copy: "Moguće je da trenutačno nije potreban daljnji rad ili da vaše pitanje pripada poreznom, pravnom, računovodstvenom ili drugom stručnjaku.",
  },
] as const

export const conversationQuestionGroups = [
  {
    title: "Osobno",
    items: [
      "Kako dug mijenja redoslijed mojih Bitcoin odluka?",
      "Koju ulogu Bitcoin ima u mojoj neto imovini?",
    ],
  },
  {
    title: "Obiteljski",
    items: [
      "Kako partneru objasniti prijelaz na Bitcoin kao primarni novac?",
      "Kako urediti prvi sigurnosni korak bez dijeljenja tajni?",
    ],
  },
  {
    title: "Poslovno",
    items: [
      "Kako odvojiti privatni i poslovni Bitcoin?",
      "Koji poslovni novac mora ostati za bliske obveze?",
    ],
  },
] as const

export const conversationAlternativePaths = [
  {
    title: "Napravite besplatnu samoprovjeru",
    copy: "U sedam područja provjerite gdje vam nedostaje jasno pravilo.",
    href: "/provjera-bitcoin-standarda/",
    dataLink: "conversation-standard-check",
  },
  {
    title: "Pogledajte ogledni osobni Bitcoin standard",
    copy: "Izmišljeni ogledni primjer pokazuje kako izgleda završni pisani sustav.",
    href: "/primjer-osobnog-bitcoin-standarda/",
    dataLink: "conversation-sample-standard",
  },
  {
    title: "Pročitajte vodiče",
    copy: "Možda je za vaš sljedeći korak već dovoljan javno dostupan materijal.",
    href: "/vodici/",
    dataLink: "conversation-guides",
  },
] as const

export const businessConversationPreparation = [
  "Klijent je pitao može li platiti Bitcoinom, a nemamo interni odgovor.",
  "Vlasnik je otvorio pitanje poslovnog novca, a uprava još nema zajednički jezik.",
  "Želimo razdvojiti privatna uvjerenja vlasnika od odgovornosti pravne osobe.",
] as const

export const entrepreneurConversationPreparation = [
  "Privatni i poslovni Bitcoin.",
  "Poslovne obveze i dugoročni poslovni saldo.",
  "Bitcoin plaćanja.",
  "Ovlasti i sigurnost.",
  "Pitanje koje treba uputiti računovođi ili pravniku.",
] as const

export const entrepreneurConversationOutcomes = [
  {
    title: "Vodič ili materijal",
    copy: "Za početak je dovoljan postojeći vodič o namjeni poslovnog novca ili odvajanju privatnog i poslovnog Bitcoina.",
  },
  {
    title: "Bitcoin konzultacija",
    copy: "Jedno unaprijed definirano pitanje, pripremljeni razgovor od 60 minuta i pisani sažetak.",
    price: "200 €",
    href: "/bitcoin-konzultacija/",
    dataLink: "conversation-entrepreneur-consultation",
  },
  {
    title: "Osobni Bitcoin standard",
    copy: "Pitanje pripada vlasnikovu osobnom proračunu, dugu, imovini, skrbništvu ili obiteljskom kontinuitetu.",
    href: "/osobni-bitcoin-standard/",
    dataLink: "conversation-entrepreneur-personal-standard",
  },
  {
    title: "Bitcoin briefing za upravu",
    copy: "Pitanje uključuje upravu, financijski tim, više odgovornih osoba, formalne ovlasti ili više vanjskih stručnjaka.",
    href: "/za-tvrtke/",
    dataLink: "conversation-entrepreneur-business-briefing",
  },
] as const

export const entrepreneurConversationAlternativePaths = [
  {
    title: "Uplata na račun nije završena odluka o namjeni novca",
    copy: "Pročitajte kako razdvojiti bliske poslovne obveze od dugoročnih odluka.",
    href: "/vodici/prihod-nije-slobodan-novac/",
    dataLink: "conversation-entrepreneur-revenue-guide",
  },
  {
    title: "Poslovni Bitcoin nije privatni Bitcoin",
    copy: "Pročitajte zašto poslovni Bitcoin traži evidenciju, ovlasti i kontinuitet.",
    href: "/vodici/poslovni-bitcoin-nije-privatni-bitcoin/",
    dataLink: "conversation-entrepreneur-separation-guide",
  },
  {
    title: "Vratite se na stranicu za poduzetnike",
    copy: "Usporedite tri novčana sloja i tri moguća oblika rada.",
    href: "/poduzetnici/",
    dataLink: "conversation-entrepreneur-page",
  },
] as const

export const businessConversationOutcomes = [
  {
    title: "Bitcoin briefing za upravu",
    copy: "Pripremljeni radni sastanak za razdvajanje odluka, odgovornosti i otvorenih stručnih pitanja.",
  },
  {
    title: "Dodatno stručno mišljenje",
    copy: "Prvo pitanje pripada pravniku, poreznom savjetniku, računovođi ili drugom odgovarajućem stručnjaku.",
  },
  {
    title: "Materijal ili edukacija",
    copy: "Za sada je dovoljan javni materijal ili neutralna edukacija uprave ili zaposlenika.",
  },
  {
    title: "Bez nastavka",
    copy: "Tvrtka trenutačno nema poslovni razlog za daljnji rad i razgovor završava bez obveze.",
  },
] as const

export const businessConversationAlternativePaths = [
  {
    title: "Otvorite Bitcoin briefing za upravu",
    copy: "Pogledajte dnevni red, pisani rezultat, podjelu odgovornosti i način ugovaranja.",
    href: "/za-tvrtke/",
    dataLink: "conversation-business-briefing",
  },
  {
    title: "Otvorite sažetak za interno dijeljenje",
    copy: "Kratka mrežna stranica koju možete poslati ostalim članovima uprave.",
    href: "/za-tvrtke/one-pager/",
    dataLink: "conversation-business-one-pager",
  },
  {
    title: "Više o Pavlu",
    copy: "Poslovno iskustvo, rad u Bitcoin industriji i pristup savjetovanju.",
    href: "/pavao-pahljina/",
    dataLink: "conversation-business-founder",
  },
] as const
