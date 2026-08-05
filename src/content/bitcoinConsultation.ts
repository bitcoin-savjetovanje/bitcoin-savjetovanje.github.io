import {
  BUSINESS_AUDIENCE_PATH,
  FAMILY_AUDIENCE_PATH,
  PERSONAL_AUDIENCE_PATH,
} from "./site"

export const consultationIncluded = [
  {
    title: "Jasno definirano pitanje",
    copy: "Prije plaćenog razgovora preciziramo koju odluku ili usko grlo obrađujemo.",
  },
  {
    title: "Priprema",
    copy: "Pitanje i relevantni kontekst pregledavaju se unaprijed kako se vrijeme razgovora ne bi trošilo na početno snalaženje.",
  },
  {
    title: "Dubinski razgovor od 60 minuta",
    copy: "Razdvajamo činjenice, pretpostavke, osobne okolnosti, rizike i moguće sljedeće korake.",
  },
  {
    title: "Pisani sažetak",
    copy: "Nakon razgovora dobivate kratak zapis zaključaka, otvorenih pitanja, preporučenih materijala i prvog sljedećeg koraka.",
  },
] as const

export const consultationQuestions = [
  {
    area: "Dug i Bitcoin",
    question:
      "Kako odrediti redoslijed razduživanja i ulogu Bitcoina tijekom prijelaza prema bilanci bez duga?",
  },
  {
    area: "Neto imovina",
    question:
      "Koju ulogu Bitcoin danas ima u mojoj neto imovini i koje odluke iz toga stvarno proizlaze?",
  },
  {
    area: "Obitelj",
    question:
      "Kako partneru objasniti Bitcoin kao primarni novac bez pritiska, žargona i razgovora koji se svodi samo na cijenu?",
  },
  {
    area: "Sigurnost",
    question:
      "Kako urediti sigurnosni model tako da osoba od povjerenja zna prvi korak, ali nema neposredan pristup sredstvima?",
  },
  {
    area: "Veći trošak",
    question:
      "Kako odluku o kupnji nekretnine, automobila ili drugom velikom trošku promatrati iz Bitcoin standarda?",
  },
  {
    area: "Poslovni novac",
    question:
      "Kako razlikovati novac potreban za poreze, plaće i dobavljače od poslovnog novca koji nije potreban za bliske obveze?",
  },
] as const

export const consultationContexts = [
  {
    title: "Osobno",
    copy: "Dug, neto imovina, veći trošak, pravila korištenja Bitcoina ili jedna sigurnosna odluka.",
    href: PERSONAL_AUDIENCE_PATH,
  },
  {
    title: "Obiteljski",
    copy: "Razgovor s partnerom, uloga zajedničke imovine, osoba od povjerenja ili kontinuitet bez vas.",
    href: FAMILY_AUDIENCE_PATH,
  },
  {
    title: "Poslovno",
    copy: "Operativni novac, poslovna pričuva, odvajanje privatnog i poslovnog Bitcoina ili ovlasti i sigurnost.",
    href: BUSINESS_AUDIENCE_PATH,
  },
] as const

export const consultationProcess = [
  {
    title: "Uvodni razgovor — 15 minuta",
    copy: "Provjeravamo je li pitanje dovoljno jasno, pripada li konzultaciji i postoji li bolji oblik rada.",
  },
  {
    title: "Priprema",
    copy: "Prije konzultacije šaljete jednu odluku, relevantan kontekst i pitanja koja se stalno vraćaju. Bez osjetljivih podataka.",
  },
  {
    title: "Bitcoin konzultacija — 60 minuta",
    copy: "Zajedno razdvajamo činjenice, pretpostavke, rizike, moguće smjerove i posljedice odluke.",
  },
  {
    title: "Pisani sažetak",
    copy: "Dobivate zaključke, otvorena pitanja, preporučene materijale i prvi sljedeći korak.",
  },
] as const

export const consultationOutcomes = [
  {
    title: "Jasno definirano pitanje",
    copy: "Znate što zapravo pokušavate odlučiti i koje okolnosti mijenjaju odgovor.",
  },
  {
    title: "Razumljiv zaključak",
    copy: "Možete objasniti logiku odluke sebi, partneru ili poslovnom suradniku bez oslanjanja na žargon ili posljednje kretanje cijene.",
  },
  {
    title: "Konkretan sljedeći korak",
    copy: "Znate treba li nešto provesti, dodatno istražiti, uključiti drugog stručnjaka ili proširiti rad na cijeli osobni Bitcoin standard.",
  },
] as const

export const consultationSummaryExample = {
  question:
    "Kako dug i postojeća nekretnina mijenjaju ulogu Bitcoina u mojoj bilanci?",
  circumstances: [
    "vrsta i rok duga",
    "odnos Bitcoina i druge imovine",
    "redovite obveze",
    "vremenski kontekst",
    "obiteljske posljedice",
  ],
  conclusions:
    "Dug, nekretninu i Bitcoin treba promatrati u jednoj bilanci. Zaključak ne počinje univerzalnim postotkom, nego redoslijedom obveza, vremenskim horizontom i posljedicama svake mogućnosti.",
  openQuestions: [
    "porezni tretman mogućeg prijenosa imovine",
    "pravne posljedice zajedničkog vlasništva",
    "podaci koji nedostaju za usporedbu scenarija",
    "pitanja koja nije moguće zaključiti iz jednog razgovora",
  ],
  nextStep:
    "Popisati preostali dug, fiksne mjesečne obveze i vremenski horizont odluke pa tek zatim usporediti dva izvediva redoslijeda.",
  materials: [
    {
      label: "Dug ili Bitcoin?",
      href: "/vodici/dug-ili-bitcoin/",
    },
    {
      label: "Bitcoin u neto imovini",
      href: "/vodici/bitcoin-u-neto-imovini/",
    },
  ],
} as const

export const consultationBoundaries = [
  "Ne govorim vam koliko Bitcoina morate kupiti.",
  "Ne donosim odluku umjesto vas.",
  "Ne tražim privatne ključeve, Bitcoin Core wallet backup datoteke, wallet passphraseove, početne riječi drugih walleta, lozinke ni pristup uređajima.",
  "Ne izrađujem portfelje drugih kriptovaluta.",
  "Ne savjetujem kada kupiti ili prodati tokene.",
  "Kada je potreban licencirani stručnjak, to se jasno odvaja od Bitcoin konzultacije.",
] as const

export const consultationFaqs = [
  {
    id: "pisani-sazetak",
    question: "Dobivam li nešto pisano nakon konzultacije?",
    answer:
      "Da. Dobivate kratak Sažetak Bitcoin konzultacije s pitanjem, glavnim zaključcima, otvorenim pitanjima, preporučenim materijalima i prvim sljedećim korakom.",
  },
  {
    id: "sudjelovanje-obitelji",
    question: "Može li partner ili član obitelji sudjelovati?",
    answer:
      "Da, kada je pitanje zajedničko ili kada odluka utječe na obiteljsku imovinu, sigurnost ili kontinuitet.",
  },
  {
    id: "financijski-dokumenti",
    question: "Moram li slati financijske dokumente?",
    answer:
      "Ne. Prije razgovora šaljete samo onoliko konteksta koliko je potrebno da se pitanje razumije. Ne šaljete osjetljive pristupne podatke.",
  },
  {
    id: "poslovno-pitanje",
    question: "Može li pitanje biti poslovno?",
    answer:
      "Da, ako je dovoljno ograničeno: primjerice odvajanje operativnih obveza od poslovnog novca koji nije potreban za bliska plaćanja.",
  },
  {
    id: "presiroko-pitanje",
    question: "Što ako se pokaže da je pitanje preširoko?",
    answer:
      "Tada razgovor može pokazati da je bolji sljedeći korak Osobni Bitcoin standard ili rad s drugim stručnjakom.",
  },
  {
    id: "koliko-bitcoina",
    question: "Hoćete li mi reći koliko Bitcoina trebam kupiti?",
    answer:
      "Ne. Konzultacija uređuje okvir odluke i relevantne okolnosti, ali ne daje univerzalni postotak niti nalog za kupnju.",
  },
] as const
