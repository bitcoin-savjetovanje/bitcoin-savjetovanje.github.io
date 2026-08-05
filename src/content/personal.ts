import {
  BITCOIN_CONSULTATION_PATH,
  BITCOIN_MONEY_PATH,
  BITCOIN_STANDARD_CHECK_PATH,
  BUDGET_PATH,
  CONVERSATION_PATH,
  CUSTODY_SECURITY_PATH,
  DEBT_PATH,
  GIVING_PATH,
  NET_WORTH_PATH,
  PAVAO_PAHLJINA_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
  TIME_VOLATILITY_PATH,
} from "./site"

export const personalHeroFacts = [
  "prihod",
  "dug",
  "trošenje",
  "imovina",
  "vrijeme",
  "sigurnost",
] as const

export const personalHeroFlow = [
  {
    id: "income",
    eyebrow: "01",
    title: "Prihod",
    copy: "ulazi u sustav",
  },
  {
    id: "bitcoin",
    eyebrow: "02",
    title: "Bitcoin saldo",
    copy: "primarni novac",
  },
  {
    id: "purpose",
    eyebrow: "03",
    title: "Namjene",
    copy: "proračun nulte osnove",
  },
  {
    id: "euros",
    eyebrow: "04",
    title: "Operativni euri",
    copy: "za bliska plaćanja",
  },
  {
    id: "life",
    eyebrow: "05",
    title: "Stvarni život",
    copy: "trošenje i obveze",
  },
] as const

export const personalStates = [
  {
    id: "asset",
    number: "01",
    title: "Bitcoin je još uvijek imovina sa strane",
    intro:
      "Bitcoin postoji u bilanci, ali euro i dalje vodi gotovo sve svakodnevne odluke.",
    items: [
      "prihod ostaje u eurima",
      "redoviti troškovi financiraju se samo iz eura",
      "Bitcoin se kupuje povremeno ili iz ostatka",
      "prodaja ili trošenje Bitcoina doživljavaju se kao neuspjeh",
      "euro i dalje upravlja svakodnevnim odlukama",
    ],
  },
  {
    id: "balance-without-system",
    number: "02",
    title: "Veći dio novca držite u Bitcoinu, ali nemate sustav",
    intro:
      "Bitcoin je važan, ali svaka veća obveza ili promjena cijene ponovno otvara iste odluke.",
    items: [
      "često pretvarate eure u Bitcoin",
      "ponekad trošite iz Bitcoina",
      "nemate jasan operativni saldo u eurima",
      "dug, davanje i veliki troškovi nemaju pisana pravila",
      "svaka veća promjena cijene ponovno otvara iste odluke",
    ],
  },
  {
    id: "responsibility",
    number: "03",
    title: "Bitcoin je postao značajan dio vaše imovine i odgovornosti",
    intro:
      "Sustav više ne utječe samo na vas i mora ostati razumljiv kada se okolnosti promijene.",
    items: [
      "odluke utječu na partnera ili obitelj",
      "sigurnost ovisi o jednoj osobi",
      "nekretnine, posao ili dug kompliciraju bilancu",
      "nema pisanog sustava koji druga osoba može razumjeti",
      "potrebni su stres-test i plan kontinuiteta",
    ],
  },
] as const

export const bitcoinMoneyTransition = {
  asset: {
    title: "Bitcoin kao izdvojena imovina",
    items: [
      "prihod dolazi i ostaje u eurima",
      "Bitcoin se kupuje iz ostatka",
      "troškovi se ne promatraju u Bitcoinu",
      "Bitcoin se pokušava nikada ne dirati",
      "cijena određuje osjećaj sigurnosti",
      "osobna bilanca ostaje europska s dodanom Bitcoin pozicijom",
    ],
  },
  money: {
    title: "Bitcoin kao primarni novac",
    items: [
      "prihod se prema pravilu pretvara u Bitcoin",
      "proračun određuje namjenu novca",
      "u eurima ostaje samo operativni iznos",
      "Bitcoin se redovito koristi za stvarne troškove",
      "dug, davanje i imovina uređuju se iz iste novčane pozicije",
      "pravila vrijede i kada cijena raste i kada pada",
    ],
  },
} as const

export const personalAreaGroups = [
  {
    id: "timeless",
    title: "Bezvremenski red u novcu",
    copy: "Temelj koji treba raditi neovisno o cijeni Bitcoina.",
    areas: [
      {
        id: "budget",
        number: "01",
        title: "Proračun nulte osnove",
        summary: "Svaki dio novca dobiva namjenu prije nego što bude potrošen.",
        items: [
          "prihod i obveze",
          "redoviti i veći budući troškovi",
          "davanje i dug",
          "kapitalne odluke",
        ],
        href: BUDGET_PATH,
        linkLabel: "Otvorite područje proračuna",
        assessmentGroup: "Osobne financije",
      },
      {
        id: "debt",
        number: "02",
        title: "Dug",
        summary: "Dug je negativni dio bilance i zahtjev na budući prihod.",
        items: [
          "popis svih dugova",
          "redoslijed uklanjanja",
          "odnos duga i druge imovine",
          "prijelaz prema bilanci bez duga",
        ],
        href: DEBT_PATH,
        linkLabel: "Otvorite područje duga",
        assessmentGroup: "Osobne financije",
      },
      {
        id: "giving",
        number: "03",
        title: "Davanje",
        summary:
          "Davanje je sastavni dio uređenog novčanog sustava, a ne ono što eventualno ostane.",
        items: [
          "odabrano pravilo",
          "prijelaz prema ciljanom udjelu",
          "način provedbe",
          "odnos davanja i ukupnog novca",
        ],
        href: GIVING_PATH,
        linkLabel: "Otvorite područje davanja",
        assessmentGroup: "Osobne financije",
      },
    ],
  },
  {
    id: "bitcoin-practice",
    title: "Bitcoin standard u praksi",
    copy: "Pravila koja povezuju primarni novac, bilancu, vrijeme i ljude koji ovise o vama.",
    areas: [
      {
        id: "bitcoin-money",
        number: "04",
        title: "Bitcoin kao primarni novac",
        summary:
          "Prihod se prema jasnim pravilima pretvara u Bitcoin, euri se drže za bliska plaćanja, a stvarni život financira se iz Bitcoin salda.",
        items: [
          "pretvaranje prihoda",
          "operativni saldo u eurima",
          "redovita potrošnja i veći troškovi",
          "prijelaz s postojećeg sustava",
        ],
        href: BITCOIN_MONEY_PATH,
        linkLabel: "Otvorite područje Bitcoina kao novca",
        assessmentGroup: "Život s Bitcoinom",
      },
      {
        id: "net-worth",
        number: "05",
        title: "Neto imovina",
        summary:
          "Bitcoin, nekretnine, posao, druga imovina i dug promatraju se u jednoj bilanci.",
        items: [
          "novac",
          "potrošnja",
          "kapital",
          "različite uloge bez automatske prodaje imovine",
        ],
        href: NET_WORTH_PATH,
        linkLabel: "Otvorite područje neto imovine",
        assessmentGroup: "Osobne financije",
      },
      {
        id: "time",
        number: "06",
        title: "Vrijeme i volatilnost",
        summary: "Dugoročni trend daje kontekst, ali ne izdaje naloge.",
        items: [
          "pravila prije euforije i straha",
          "veći troškovi u različitim tržišnim razdobljima",
          "datum revizije",
          "situacije u kojima se pravilo smije promijeniti",
        ],
        href: TIME_VOLATILITY_PATH,
        linkLabel: "Otvorite područje vremena i volatilnosti",
        assessmentGroup: "Razumijevanje i odnos prema cijeni",
      },
      {
        id: "security",
        number: "07",
        title: "Sigurnost i kontinuitet",
        summary:
          "Sigurnost mora odgovarati stvarnim rizicima i uključivati ljude koji ovise o vama.",
        items: [
          "model skrbništva i sigurnosne kopije",
          "osoba od povjerenja i prvi korak oporavka",
          "dokumentacija bez tajni",
          "godišnja provjera i plan za nedostupnost",
        ],
        href: CUSTODY_SECURITY_PATH,
        linkLabel: "Otvorite područje sigurnosti",
        assessmentGroup: "Sigurnost i kontinuitet",
      },
    ],
  },
] as const

export const monthlyMoneyFlow = [
  {
    id: "income-arrives",
    number: "01",
    title: "Prihod stigne",
    summary: "Plaća, poslovni prihod ili drugi priljev ulazi u sustav.",
    details: ["priljev postaje vidljiv", "ne troši se prije raspodjele"],
  },
  {
    id: "income-to-bitcoin",
    number: "02",
    title: "Prihod se prema pravilu pretvara u Bitcoin",
    summary:
      "Odmah ili kroz jasno definiran prijelazni plan koji ima rok i razlog.",
    details: ["pravilo je unaprijed zapisano", "prijelaz ima jasan završetak"],
  },
  {
    id: "budget-assigns",
    number: "03",
    title: "Proračun određuje namjenu",
    summary:
      "Bliske obveze, redovita potrošnja, dug, davanje, veći troškovi i dugoročne odluke dobivaju mjesto.",
    details: ["svaki dio novca dobiva namjenu", "odluke se vide kao cjelina"],
  },
  {
    id: "operating-euros",
    number: "04",
    title: "Euri ostaju samo operativno",
    summary:
      "Drži se iznos potreban za najbliža europska plaćanja, a ne zaseban dugoročni europski novčani saldo.",
    details: ["saldo ima svrhu", "iznos prati bliska plaćanja"],
  },
  {
    id: "real-life",
    number: "05",
    title: "Stvarni život financira se iz Bitcoin salda",
    summary: "Bitcoin se prema potrebi izravno troši ili razmjenjuje u eure.",
    details: [
      "trošenje nije neuspjeh standarda",
      "trošak slijedi proračun, ne cijenu",
    ],
  },
  {
    id: "review",
    number: "06",
    title: "Sustav se ponovno provjerava",
    summary:
      "Pri promjeni prihoda, duga, obitelji, imovine, većih troškova ili sigurnosnih okolnosti.",
    details: ["pravila imaju datum revizije", "promjena ima stvaran razlog"],
  },
] as const

export const fictionalPersonalExample = {
  label: "IZMIŠLJENI OGLEDNI PRIMJER",
  name: "Ana",
  situation:
    "Ana prima plaću u eurima, povremeno kupuje Bitcoin iz ostatka i želi ga idealno nikada ne dirati. Ima stambeni dug, osnovnu sigurnosnu kopiju i nekoliko važnih odluka koje svaki put ponovno rješava.",
  before: [
    "prihod ostaje u eurima, a Bitcoin je izdvojena pozicija",
    "dug zauzima dio budućeg prihoda bez jasnog redoslijeda izlaska",
    "operativni saldo i veliki troškovi nisu unaprijed određeni",
    "davanje nema vlastito pravilo",
    "neto imovina ne promatra se kao jedna cjelina",
    "odluke se mijenjaju s cijenom",
    "sigurnost i kontinuitet ovise samo o Ani",
    "datum revizije ne postoji",
  ],
  after: [
    "definirano pretvaranje prihoda u Bitcoin",
    "proračun nulte osnove",
    "određen operativni saldo u eurima",
    "redoslijed uklanjanja duga",
    "uređeno davanje",
    "pravila redovite i velike potrošnje",
    "jedinstveni pregled neto imovine",
    "pravila za različita tržišna razdoblja",
    "sigurnosni smjer i prvi korak za osobu od povjerenja",
    "datum sljedeće revizije",
  ],
} as const

export const writtenStandardPages = [
  {
    id: "main-rules",
    title: "Jedna stranica glavnih pravila",
    copy: "Primarni novac, operativni euri, dug, davanje, trošenje, sigurnost i datum revizije ostaju na jednoj operativnoj stranici.",
    image: "/images/sample-standard/ogledni-standard-v1.webp",
    alt: "Petnaesta stranica izmišljenog oglednog standarda s glavnim pravilima za novac, proračun, dug, davanje, prihod, trošenje, imovinu, vrijeme, sigurnost i pregled.",
    pdfPage: 16,
    documentPage: "15",
  },
  {
    id: "ninety-days",
    title: "Plan prvih 90 dana",
    copy: "Prvi korak, redoslijed, odgovornost, rok i dokaz provedbe raspoređeni su kroz prvih 30, 60 i 90 dana.",
    image: "/images/sample-standard/ogledni-standard-plan-90-dana.webp",
    alt: "Četrnaesta stranica izmišljenog oglednog standarda s planom provedbe za prvih 30, 60 i 90 dana te dokazima provedbe.",
    pdfPage: 15,
    documentPage: "14",
  },
  {
    id: "stress-review",
    title: "Stres-test i revizija",
    copy: "Pad cijene, promjena prihoda, veliki trošak i nedostupnost glavne osobe dobivaju unaprijed provjerene odgovore sustava.",
    image: "/images/sample-standard/ogledni-standard-stres-test.webp",
    alt: "Trinaesta stranica izmišljenog oglednog standarda sa stres-testovima pada cijene, gubitka prihoda, velikog troška, nedostupnosti i naglog rasta.",
    pdfPage: 14,
    documentPage: "13",
  },
] as const

export const personalStressScenarios = [
  {
    id: "price-drop",
    title: "Velik pad cijene",
    items: [
      "nastaju li panične odluke",
      "postoji li način financiranja redovitih troškova",
      "mijenjaju li se pravila bez stvarne promjene životnih okolnosti",
    ],
  },
  {
    id: "price-rise",
    title: "Nagli rast cijene",
    items: [
      "nastaje li euforija",
      "povećavaju li se troškovi bez pravila",
      "treba li unaprijed financirati neki veliki trošak",
      "postoji li razlog za reviziju ili samo emocionalni pritisak",
    ],
  },
  {
    id: "income-change",
    title: "Promjena prihoda",
    items: [
      "kako se prilagođava proračun",
      "koliko eura ostaje operativno",
      "kako se nastavlja plan duga i davanja",
      "koji se troškovi prvi mijenjaju",
    ],
  },
  {
    id: "cost-or-unavailability",
    title: "Veliki trošak ili nedostupnost",
    items: [
      "kako se financira nekretnina, automobil, zdravlje ili drugi veliki trošak",
      "zna li osoba od povjerenja prvi korak",
      "može li se sustav razumjeti bez improvizacije",
    ],
  },
] as const

export const personalServicePaths = [
  {
    id: "assessment",
    eyebrow: "Još ne znate gdje je problem",
    title: "Besplatna provjera Bitcoin standarda",
    facts: ["oko 3 minute", "10 pitanja", "bez e-adrese"],
    copy: "Odgovori ostaju samo u otvorenoj stranici, a rezultat pokazuje prvo područje bez jasnog pravila.",
    label: "Napravite besplatnu provjeru",
    href: BITCOIN_STANDARD_CHECK_PATH,
    kind: "primary",
  },
  {
    id: "consultation",
    eyebrow: "Imate jedno konkretno pitanje",
    title: "Bitcoin konzultacija",
    facts: ["60 minuta", "200 €", "priprema", "pisani sažetak"],
    copy: "Za operativni saldo u eurima, dug, Bitcoin u neto imovini, veliki trošak ili sigurnosni smjer koji se mogu ozbiljno obraditi u jednom pripremljenom razgovoru.",
    label: "Pogledajte Bitcoin konzultaciju",
    href: BITCOIN_CONSULTATION_PATH,
    kind: "secondary",
  },
  {
    id: "program",
    eyebrow: "Trebate povezati cijeli sustav",
    title: "Osobni Bitcoin standard",
    facts: [
      "4–6 tjedana",
      "1.500 €",
      "pisani standard",
      "provedba",
      "revizija nakon 30 dana",
    ],
    copy: "Za situacije u kojima su prihod, proračun, dug, davanje, Bitcoin kao novac, neto imovina, vrijeme, sigurnost i obitelj međusobno povezani.",
    label: "Pogledajte Osobni Bitcoin standard",
    href: PERSONAL_BITCOIN_STANDARD_PATH,
    kind: "secondary",
  },
] as const

export const personalFounderFacts = [
  "Bitcoin od srpnja 2014.",
  "sustavno proučavanje od približno 2018.",
  "rad u Bitcoin industriji od 2020.",
  "puni Bitcoin standard od listopada 2020.",
  "više od 10.000 sati rada i učenja",
  "suosnivač i bivši direktor STEMI-ja",
  "bliski rad sa Saifedeanom Ammousom",
  "DvadesetJedan od 2022.",
  "rad na knjizi Bitcoin kao novac",
] as const

export const personalBoundaries = [
  "ne upravljam sredstvima",
  "ne preuzimam skrbništvo",
  "ne tražim privatne ključeve, wallet backup datoteke, passphraseove ni početne riječi drugih walleta",
  "ne tražim pristup uređajima ili računima",
  "ne dajem naloge za kupnju ili prodaju",
  "ne obećavam prinos",
  "ne pružam porezni, pravni ili računovodstveni savjet",
  "odluke ostaju vaše",
  "kada je potreban drugi stručnjak, to se jasno odvaja",
] as const

export const personalLinks = {
  assessment: BITCOIN_STANDARD_CHECK_PATH,
  program: PERSONAL_BITCOIN_STANDARD_PATH,
  consultation: BITCOIN_CONSULTATION_PATH,
  sample: SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
  samplePdf: "/downloads/sample-osobni-bitcoin-standard.pdf",
  founder: PAVAO_PAHLJINA_PATH,
  conversation: `${CONVERSATION_PATH}?tema=osobno`,
} as const
