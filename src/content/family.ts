import {
  BITCOIN_CONSULTATION_PATH,
  CONVERSATION_PATH,
  PAVAO_PAHLJINA_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
} from "./site"

export const familyConversationPath = `${CONVERSATION_PATH}?tema=obitelj`

export const familySeo = {
  title: "Bitcoin u obitelji | Zajednička pravila, sigurnost i kontinuitet",
  description:
    "Za parove i obitelji koji žele povezati prihod, dug, korištenje Bitcoina, sigurnost i prvi korak oporavka u razumljiv obiteljski Bitcoin standard.",
} as const

export const familyHero = {
  eyebrow: "BITCOIN U OBITELJI",
  title:
    "Bitcoin ne smije ovisiti o razumijevanju, sjećanju i dostupnosti jedne osobe.",
  lead: "Za parove i obitelji koji žele uskladiti prihod, proračun nulte osnove, dug, korištenje Bitcoina, sigurnost i plan za slučaj nedostupnosti — bez dijeljenja tajni i bez potrebe da svi postanu tehnički stručnjaci.",
  positioning:
    "Obiteljski Bitcoin standard nije sustav u kojem svi znaju sve. To je sustav u kojem svatko zna dovoljno za svoju ulogu, a nitko ne mora improvizirati pod pritiskom.",
  signals: [
    "zajednički jezik",
    "obiteljski novac",
    "sigurnost",
    "oporavak i kontinuitet",
  ],
  primaryCta: {
    label: "Razjasnite obiteljsko Bitcoin pitanje",
    href: familyConversationPath,
  },
  secondaryCta: {
    label: "Pogledajte kako uređujemo sigurnost bez predaje kontrole",
    href: "/sigurnost/",
  },
  safetyNote:
    "Ne šaljete privatne ključeve, Bitcoin Core wallet backup datoteke, wallet passphrase, početne riječi drugih walleta, iznose ni pristup uređajima. Radimo na razumijevanju, pravilima, odgovornostima i postupcima.",
} as const

export const familySituations = [
  {
    title: "Jedna osoba razumije Bitcoin, druga ne",
    copy: "Problem nije samo objasniti što je Bitcoin. Potrebno je pokazati kako odluka utječe na prihod, dug, trošenje, imovinu i sigurnost obitelji.",
  },
  {
    title: "Oboje prihvaćate Bitcoin, ali nemate zajednička pravila",
    copy: "Nije jasno dogovoreno kako se prihod pretvara u Bitcoin, koliko eura ostaje za bliska plaćanja, kojim se redoslijedom uklanja dug, kako se financiraju troškovi i tko održava sustav.",
  },
  {
    title: "Sigurnost ovisi o jednoj osobi",
    copy: "Postoje uređaji i sigurnosne kopije, ali nitko drugi ne zna odakle početi, što ne smije napraviti i koga kontaktirati.",
  },
  {
    title: "Bitcoin je postao značajan dio obiteljske imovine",
    copy: "Osobni novčanik više nije dovoljan kao jedini sustav. Potreban je dogovor o odgovornostima, oporavku, većim odlukama i kontinuitetu.",
  },
] as const

export const familyUnderstandingLevels = [
  {
    title: "Zajednička suglasnost",
    copy: "Obje osobe razumiju glavna novčana pravila, posljedice odluka i što se događa kada se okolnosti promijene.",
  },
  {
    title: "Različite razine znanja",
    copy: "Jedna osoba može biti tehnički naprednija. Druga mora razumjeti svrhu, granice, odgovornosti i prvi siguran korak.",
  },
  {
    title: "Odluke koje nisu jednostrane",
    copy: "Prihod, dug, nekretnine, veliki troškovi i obiteljska sigurnost ne smiju postati samo Bitcoin odluke osobe koja zna više.",
  },
] as const

export const familyStandardLayers = [
  {
    number: "01",
    title: "Zajednički novčani jezik",
    intro:
      "Obitelj najprije mora razumjeti što Bitcoin predstavlja i zašto se u punom standardu tretira kao primarni novac.",
    items: [
      "što Bitcoin predstavlja za ovu obitelj",
      "što znači trošiti ili razmjenjivati Bitcoin za stvarni život",
      "zašto promjena cijene ne stvara automatski novu odluku",
      "što partner treba razumjeti, a što ne mora tehnički znati",
    ],
  },
  {
    number: "02",
    title: "Obiteljska pravila novca",
    intro:
      "Prihod, proračun, dug, trošenje i imovina moraju djelovati kao jedan sustav, a ne kao nepovezane odluke.",
    items: [
      "proračun nulte osnove i pretvaranje prihoda u Bitcoin",
      "minimalni operativni saldo u eurima za bliska plaćanja",
      "redoslijed uklanjanja duga prema bilanci bez duga",
      "redoviti troškovi, veće kupnje, davanje i datum revizije",
      "različite uloge Bitcoina, nekretnina, operativnih eura i druge imovine",
    ],
  },
  {
    number: "03",
    title: "Sigurnost i podjela znanja",
    intro:
      "Sigurnost nije jednaka količina znanja za sve. Svaka osoba treba dovoljno informacija za svoju ulogu, bez nepotrebnog pristupa.",
    items: [
      "tko zna da Bitcoin postoji i koju ulogu ima",
      "tko razumije osnovnu strukturu i zna prvi korak",
      "tko zna gdje je neskrivena obiteljska uputa",
      "tko zna koga kontaktirati",
      "koje tajne nikada ne ulaze u obiteljski dokument",
    ],
    link: {
      label: "Pročitajte vodič o obiteljskom pristupu bez dijeljenja tajni",
      href: "/vodici/obiteljski-pristup-bitcoinu/",
    },
  },
  {
    number: "04",
    title: "Kontinuitet i provjera",
    intro:
      "Sustav se provjerava prije nego što nastanu bolest, privremena nedostupnost, smrt, gubitak uređaja ili promjena obiteljske situacije.",
    items: [
      "prvi korak pri nedostupnosti glavne osobe",
      "godišnji test razumijevanja i dokumentacije bez pomicanja sredstava",
      "datum sljedeće revizije",
      "odgovornost za održavanje dokumenta",
      "promjene obitelji, imovine i sigurnosnih okolnosti",
    ],
    link: {
      label: "Proučite Bitcoin Core Standard za obiteljski trezor",
      href: "/vodici/bitcoin-core-standard/",
    },
  },
] as const

export const familyExample = {
  label: "IZMIŠLJENI OGLEDNI PRIMJER",
  title:
    "Marko i Ivana imaju zajednički novac i sustav koji ovisi o jednoj osobi",
  profile: [
    "bračni par s dvoje djece",
    "prihod ulazi u eurima",
    "Bitcoin čini značajan dio obiteljske imovine",
    "stambeni dug utječe na budući prihod",
    "postoji jedan wallet i jedna sigurnosna kopija bez testirane obnove",
  ],
  before: [
    "Prihod i troškovi nemaju zajednička pisana pravila.",
    "Operativni saldo u eurima nije jasno određen.",
    "Dug postoji uz Bitcoin, ali bez dogovorenog redoslijeda.",
    "Bitcoinom uglavnom upravlja Marko.",
    "Ivana razumije osnovnu ideju, ali ne zna prvi korak.",
    "Sigurnost tehnički postoji, ali nema obiteljske upute ni datuma revizije.",
  ],
  after: [
    "Dogovoreno je kako se prihod pretvara u Bitcoin.",
    "Određen je operativni saldo u eurima za bliska plaćanja.",
    "Dug ima redoslijed uklanjanja i cilj bilance bez duga.",
    "Postoje pravila za redovitu potrošnju iz Bitcoina i velike troškove.",
    "Uloge su jasno raspodijeljene bez dijeljenja tajni.",
    "Postoje neskrivena obiteljska uputa, prvi korak oporavka i osoba od povjerenja.",
    "Zabilježen je datum sljedeće provjere.",
  ],
  conclusion:
    "Problem nije bio nedostatak uređaja. Problem je bio što sustav nije mogao razumljivo nastaviti bez osobe koja ga je postavila.",
} as const

export const familyKnowledge = {
  needed: [
    "da Bitcoin postoji",
    "koju ulogu ima u obiteljskoj bilanci",
    "koja pravila vrijede za prihod i trošenje",
    "gdje se nalazi neskrivena obiteljska uputa",
    "koji je prvi siguran korak",
    "koga kontaktirati",
    "što se nikada ne smije napraviti",
    "kada se sustav ponovno provjerava",
  ],
  notNeeded: [
    "privatne ključeve",
    "Bitcoin Core wallet backup datoteke",
    "wallet passphraseove",
    "početne riječi drugih walleta",
    "PIN-ove",
    "sve lokacije sigurnosnih kopija",
    "sve tehničko znanje glavne osobe",
    "neposredan pristup cijelom iznosu",
    "sposobnost improviziranja pod pritiskom",
  ],
} as const

export const familyResponsibilityMap = [
  {
    title: "Što obitelj razumije",
    items: [
      "ulogu Bitcoina",
      "glavna pravila prihoda, duga i potrošnje",
      "tko održava sustav",
      "kada se pravila ponovno provjeravaju",
    ],
  },
  {
    title: "Tko zna prvi korak",
    items: [
      "partner",
      "osoba od povjerenja",
      "tehnička osoba, kada postoji",
      "pravna ili druga stručna osoba, kada je potrebna",
    ],
  },
  {
    title: "Što napraviti pri nedostupnosti",
    items: [
      "ne pokušavati nasumično otvarati uređaje",
      "ne učitavati wallet backup i ne unositi passphrase ili početne riječi na mrežne stranice",
      "ne slati fotografije sigurnosnih podataka",
      "pronaći neskrivenu obiteljsku uputu",
      "kontaktirati unaprijed određenu osobu",
      "sačuvati uređaje i dokumente bez improvizacije",
    ],
  },
  {
    title: "Što dokument nikada ne sadrži",
    items: [
      "privatne ključeve",
      "Bitcoin Core wallet backup datoteke",
      "wallet passphraseove, PIN-ove i druge pristupne lozinke",
      "početne riječi drugih walleta",
      "potpune lokacije sigurnosnih kopija",
      "dovoljno podataka za samostalan pristup sredstvima",
    ],
  },
  {
    title: "Datum provjere",
    items: [
      "datum posljednje provjere",
      "datum sljedeće revizije",
      "osobe koje moraju sudjelovati",
      "što se testira bez pomicanja sredstava",
    ],
  },
] as const

export const familyStressTests = [
  {
    title: "Velik pad cijene",
    items: [
      "mijenjaju li se pravila samo zbog straha",
      "postoji li dogovor za redovite troškove",
      "razumiju li obje osobe što se mijenja, a što ostaje isto",
    ],
  },
  {
    title: "Gubitak ili promjena prihoda",
    items: [
      "koliko eura ostaje za bliska plaćanja",
      "kako se prilagođava proračun",
      "kako se Bitcoin koristi za stvarni život",
      "kako se nastavlja plan razduživanja",
    ],
  },
  {
    title: "Veliki obiteljski trošak",
    items: [
      "tko sudjeluje u odluci",
      "kako se procjenjuje nekretnina, automobil, zdravlje, obrazovanje ili drugi veliki trošak",
      "koja pravila imaju prednost",
      "kako odluka utječe na cijelu bilancu",
    ],
  },
  {
    title: "Nedostupnost glavne osobe",
    items: [
      "zna li partner prvi korak",
      "zna li što ne smije napraviti",
      "zna li pronaći neskrivenu uputu",
      "zna li koga kontaktirati",
      "može li se sustav očuvati bez improvizacije",
    ],
  },
] as const

export const familyServicePaths = [
  {
    eyebrow: "Jedno obiteljsko pitanje",
    title: "Bitcoin konzultacija",
    copy: "Za jedno jasno pitanje o partnerovu razumijevanju, sigurnosti, prvom koraku, dugu ili velikom obiteljskom trošku.",
    itemsLabel: "Za pitanja poput:",
    items: [
      "Kako partneru objasniti Bitcoin kao primarni novac?",
      "Što partner mora znati o sigurnosti?",
      "Kako urediti prvi korak bez dijeljenja tajni?",
      "Kako dug mijenja obiteljski Bitcoin okvir?",
      "Kako razgovarati o velikom obiteljskom trošku iz Bitcoin standarda?",
    ],
    facts: "60 minuta · 200 € · priprema · pisani sažetak",
    label: "Pogledajte Bitcoin konzultaciju",
    href: BITCOIN_CONSULTATION_PATH,
    dataLink: "family-service-consultation",
  },
  {
    eyebrow: "Povezan obiteljski sustav",
    title: "Osobni Bitcoin standard",
    copy: "Kada treba povezati prihod, proračun, dug, Bitcoin, trošenje, imovinu, sigurnost, partnera i kontinuitet.",
    itemsLabel: "Rad može povezati:",
    items: [
      "zajednički novčani jezik",
      "pretvaranje prihoda u Bitcoin",
      "proračun nulte osnove",
      "bilancu bez duga",
      "redovito trošenje iz Bitcoina i velike troškove",
      "podjelu odgovornosti",
      "kartu obiteljskog pristupa",
      "reviziju i stres-test",
      "pisani osobni Bitcoin standard",
    ],
    facts: "4–6 tjedana · 1.500 € · pisani standard i revizija",
    label: "Pogledajte Osobni Bitcoin standard",
    href: PERSONAL_BITCOIN_STANDARD_PATH,
    dataLink: "family-service-personal-standard",
  },
  {
    eyebrow: "Sigurnosna orijentacija",
    title: "Sigurnost i skrbništvo",
    copy: "Kada prvo treba razumjeti modele skrbništva, zaštitu od krađe, oporavak, povjerljivost i što se nikada ne dijeli.",
    itemsLabel: "Fokus rada:",
    items: [
      "model skrbništva",
      "zaštita od krađe",
      "oporavak",
      "povjerljivost",
      "što se nikada ne dijeli",
    ],
    label: "Pogledajte sigurnosni pristup",
    href: "/sigurnost/",
    dataLink: "family-service-security",
  },
] as const

export const familyContinuityScope = [
  "odgovornosti",
  "razinu znanja",
  "neskrivene upute",
  "prvi korak",
  "osobu od povjerenja",
  "sigurnosne principe",
  "ritam provjere",
] as const

export const familyLegalScope = [
  "oporuku",
  "nasljedno pravo",
  "bračnu stečevinu",
  "vlasničke odnose",
  "pravne dokumente",
  "porezne posljedice",
] as const

export const familyWorkBoundaries = [
  "Ne upravljam sredstvima.",
  "Ne preuzimam skrbništvo.",
  "Ne tražim privatne ključeve, wallet backup datoteke, wallet passphrase, početne riječi ni pristup novčaniku.",
  "Ne izrađujem oporuku.",
  "Ne dajem pravni ni porezni savjet.",
  "Ne donosim odluke umjesto obitelji.",
  "Ne postavljam tehnički sustav bez odgovarajućeg stručnog opsega.",
  "Konačne odluke ostaju obitelji.",
] as const

export const familyFounder = {
  name: "Pavao Pahljina",
  copy: "Pavao pomaže povezati Bitcoin, osobne financije, obiteljsku odgovornost i sigurnost u sustav koji ne ovisi samo o jednoj osobi.",
  facts: [
    "Bitcoin od srpnja 2014.; sustavno proučavanje od približno 2018.",
    "Rad u Bitcoin industriji od 2020.; puni Bitcoin standard od listopada 2020.",
    "Više od 10.000 sati rada i učenja te bliski rad sa Saifedeanom Ammousom.",
    "Suosnivač i bivši direktor STEMI-ja.",
    "Javni edukativni rad kroz DvadesetJedan od 2022.",
    "Rad na knjizi Bitcoin kao novac.",
  ],
  quote:
    "Cilj rada nije uvjeriti jednog partnera da je drugi u pravu. Cilj je pomoći obitelji izgraditi razumljiv sustav odluka, odgovornosti i sigurnosnih granica.",
  link: {
    label: "Više o Pavlu",
    href: PAVAO_PAHLJINA_PATH,
  },
} as const

export const familyFinalCta = {
  eyebrow: "PRVI KORAK",
  title:
    "Ne morate svi znati sve. Ali sustav ne smije ovisiti samo o jednoj osobi.",
  copy: "U uvodnom razgovoru utvrđujemo je li potrebno razjasniti jedno obiteljsko pitanje, uključiti partnera u zajednički razgovor ili urediti cijeli osobni Bitcoin standard.",
  primaryCta: {
    label: "Dogovorite razgovor o obiteljskom Bitcoin okviru",
    href: familyConversationPath,
  },
  secondaryCta: {
    label: "Pogledajte kako izgleda pisani standard",
    href: SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
  },
  participationNote:
    "Uvodni razgovor može započeti s jednom osobom. Kada odluka utječe na zajednički prihod, dug, imovinu ili sigurnost, smisleno je uključiti partnera u nastavak.",
  safetyNote:
    "Ne šaljete iznose, privatne ključeve, wallet backup datoteke, wallet passphrase, početne riječi, fotografije sigurnosnih kopija ni pristup uređajima.",
} as const
