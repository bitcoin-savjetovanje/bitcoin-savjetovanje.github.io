export const entrepreneurConversationPath = "/razgovor/?tema=poduzetnik"

export const entrepreneurFitContexts = [
  {
    number: "01",
    title: "Samostalno vodite posao",
    copy: "Vi donosite gotovo sve odluke, ali trebate razdvojiti novac poslovanja od osobnog Bitcoin standarda.",
    note: "Prirodan sljedeći korak može biti jedna Bitcoin konzultacija.",
  },
  {
    number: "02",
    title: "Vlasnik ste manjeg društva",
    copy: "Posao ima računovođu, zaposlenike ili druge obveze, ali Bitcoin pitanje još uvijek uglavnom ovisi o vama.",
    points: [
      "poslovne obveze",
      "dugoročni poslovni saldo",
      "privatna imovina vlasnika",
      "ovlasti",
      "pitanja za vanjske stručnjake",
    ],
  },
  {
    number: "03",
    title: "Imate upravu, financijski tim ili više ovlaštenih osoba",
    copy: "Vaše pitanje više nije samo osobna odluka vlasnika. Potreban je zajednički jezik, podjela odgovornosti i pripremljeni sastanak uprave.",
    href: "/za-tvrtke/",
    linkLabel: "Pogledajte Bitcoin briefing za upravu",
  },
] as const

export const businessMoneyLayers = [
  {
    id: "operativni-novac",
    number: "01",
    label: "Bliske obveze",
    title: "Operativni novac poslovanja",
    copy: "Novac potreban za obveze i normalno poslovanje u bliskom vremenskom razdoblju.",
    examples: [
      "porezi",
      "plaće",
      "dobavljači",
      "najam",
      "zalihe",
      "oprema",
      "ugovorene obveze",
      "razumna operativna pričuva",
    ],
    conclusion:
      "Taj novac nije poslovni Bitcoin kapital samo zato što se trenutačno nalazi na računu.",
  },
  {
    id: "dugorocni-poslovni-saldo",
    number: "02",
    label: "Dugoročna svrha",
    title: "Dugoročni poslovni saldo",
    copy: "Poslovni novac koji nije potreban za bliske obveze i za koji je tvrtka jasno odredila svrhu, vremenski horizont, odgovorne osobe i način odobravanja.",
    prompt: "Prije bilo kakve Bitcoin odluke treba razjasniti:",
    examples: [
      "zašto taj saldo postoji",
      "koliko dugo nije potreban",
      "koje poslovne promjene mogu promijeniti odluku",
      "tko smije predložiti i odobriti potez",
      "kako se odluka evidentira",
      "koji vanjski stručnjaci trebaju biti uključeni",
      "kako izgleda sigurnosni model",
    ],
    conclusion:
      "Bitcoin može dobiti ulogu u ovom sloju tek nakon što su ta pitanja uređena.",
  },
  {
    id: "osobna-bilanca",
    number: "03",
    label: "Vlasnikova bilanca",
    title: "Osobni novac i Bitcoin vlasnika",
    copy: "Novac koji pripada vlasnikovoj osobnoj bilanci nakon što je njegov poslovni, vlasnički, pravni, računovodstveni i porezni status jasno uređen.",
    prompt: "Ovaj sloj pripada:",
    examples: [
      "osobnom proračunu",
      "osobnom dugu",
      "obiteljskoj imovini",
      "osobnom Bitcoin standardu",
      "privatnom skrbništvu",
      "obiteljskom kontinuitetu",
    ],
  },
] as const

export const entrepreneurTriggers = [
  {
    title: "Klijent želi platiti Bitcoinom",
    copy: "Nije jasno tko tehnički prima plaćanje, ostaje li Bitcoin u poslovanju, koji pružatelj sudjeluje i koja pitanja pripadaju računovođi, pravniku ili poreznom stručnjaku.",
  },
  {
    title: "Na poslovnom računu postoji veći saldo",
    copy: "Vlasnik razmatra Bitcoin, ali još nije jasno koje obveze tek dolaze, koliko novca mora ostati operativno dostupno i pripada li odluka poslovanju ili vlasniku.",
  },
  {
    title: "Bitcoin je već kupljen preko poslovanja",
    copy: "Ne postoji jasan postupak odobravanja, evidentiranja, odvajanja od privatnog Bitcoina ili postupanja kada vlasnik nije dostupan.",
  },
  {
    title: "Privatni Bitcoin financira poslovanje ili obrnuto",
    copy: "Granica između osobne i poslovne bilance postaje nejasna, a odluke se donose bez pisanih pravila.",
  },
  {
    title: "Samo vlasnik razumije cijeli sustav",
    copy: "Posao ovisi o jednoj osobi, njezinu uređaju, pamćenju i dostupnosti.",
  },
] as const

export const fictionalEntrepreneur = {
  label: "IZMIŠLJENI OGLEDNI PRIMJER",
  name: "Ivan vodi malu uslužnu tvrtku",
  companyFacts: [
    "redovite mjesečne obveze",
    "novac potreban za poreze",
    "nekoliko dobavljača",
    "dvoje zaposlenika",
    "operativnu pričuvu",
    "plan kupnje nove opreme",
    "dodatni dugoročni poslovni saldo",
    "privatni Bitcoin vlasnika",
  ],
  businessQuestions: [
    "Koliko je novca potrebno za bliske obveze?",
    "Koji planovi ulaganja mogu promijeniti odluku?",
    "Tko treba pregledati računovodstvena i pravna pitanja?",
    "Tko smije odobriti poslovni Bitcoin korak?",
    "Kako se poslovni pristupi odvajaju od privatnih?",
    "Što se događa ako vlasnik nije dostupan?",
  ],
  personalQuestions: [
    "Kada je novac postao dio osobne bilance?",
    "Kako ulazi u osobni proračun i Bitcoin standard?",
    "Kako se privatno skrbništvo odvaja od poslovnog?",
    "Kako se uključuju partner, obitelj i osoba od povjerenja?",
  ],
  boundaryRules: [
    "Poslovni novčanik nije privatni novčanik.",
    "Privatni ključevi, wallet backup datoteke, wallet passphraseovi i početne riječi drugih walleta ne ulaze u poslovnu dokumentaciju.",
    "Osobno uvjerenje vlasnika nije automatski odluka društva.",
  ],
} as const

export const securityRoles = [
  {
    number: "01",
    title: "Predlaganje",
    copy: "Tko smije otvoriti prijedlog i koje obrazloženje mora pripremiti.",
  },
  {
    number: "02",
    title: "Odobravanje",
    copy: "Tko potvrđuje da je prijedlog u skladu sa svrhom novca i ovlastima.",
  },
  {
    number: "03",
    title: "Izvršenje",
    copy: "Tko tehnički može provesti odobrenu transakciju i prema kojem postupku.",
  },
  {
    number: "04",
    title: "Evidencija",
    copy: "Tko čuva poslovni trag odluke i podatke potrebne za računovodstvo.",
  },
  {
    number: "05",
    title: "Nadzor",
    copy: "Tko provjerava jesu li odobrenje, izvršenje i evidencija usklađeni.",
  },
] as const

export const businessSecurityQuestions = [
  "tko zna da Bitcoin postoji",
  "tko predlaže transakciju",
  "tko je odobrava",
  "tko je tehnički može provesti",
  "tko vodi evidenciju",
  "tko provjerava da su postupci ispoštovani",
  "što se događa ako vlasnik ili direktor nije dostupan",
  "koji dokument opisuje postupak",
  "koje informacije nikada ne ulaze u taj dokument",
] as const

export const entrepreneurServicePaths = [
  {
    context: "Jedno konkretno pitanje",
    title: "Bitcoin konzultacija",
    copy: "Za unaprijed definirano pitanje koje se može pripremiti i razjasniti u jednom razgovoru.",
    examples: [
      "Kako odvojiti privatni i poslovni Bitcoin?",
      "Koji dio pitanja trebam odnijeti računovođi?",
      "Kako organizacijski pristupiti prihvatu Bitcoin plaćanja?",
      "Što treba biti zapisano ako poslovanje već drži Bitcoin?",
    ],
    facts: "60 minuta · 200 € · priprema · pisani sažetak",
    href: "/bitcoin-konzultacija/",
    linkLabel: "Pogledajte Bitcoin konzultaciju",
    dataLink: "entrepreneurs-consultation",
  },
  {
    context: "Vlasnikov osobni sustav",
    title: "Osobni Bitcoin standard",
    copy: "Za pitanja koja zajedno uključuju osobni prihod, dug, obiteljsku imovinu, trošenje, privatno skrbništvo, nasljeđivanje i odnos Bitcoina s drugom imovinom.",
    facts: "4–6 tjedana · pisani osobni Bitcoin standard",
    href: "/osobni-bitcoin-standard/",
    linkLabel: "Pogledajte Osobni Bitcoin standard",
    dataLink: "entrepreneurs-personal-standard",
  },
  {
    context: "Organizacijski sustav tvrtke",
    title: "Bitcoin briefing za upravu",
    copy: "Za situacije s upravom, financijskim timom, više odgovornih osoba, formalnim ovlastima, zajedničkim poslovnim dokumentom i više vanjskih stručnjaka.",
    href: "/za-tvrtke/",
    linkLabel: "Pogledajte Bitcoin briefing za upravu",
    dataLink: "entrepreneurs-business-briefing",
  },
] as const

export const entrepreneurGuides = [
  {
    title: "Uplata na račun nije završena odluka o namjeni novca",
    copy: "Kako razmišljati o porezima, plaćama, dobavljačima, pričuvama i drugim obvezama prije dugoročne odluke o poslovnom novcu.",
    href: "/vodici/prihod-nije-slobodan-novac/",
    image: "/images/prihod-nije-slobodan-novac-cover-20260625.webp",
    imageAlt: "Urednički prikaz poslovnih primitaka i obveza na radnom stolu.",
    dataLink: "entrepreneurs-guide-revenue",
  },
  {
    title: "Poslovni Bitcoin nije privatni Bitcoin",
    copy: "Zašto poslovni Bitcoin traži evidenciju, ovlasti, postupak odobravanja i plan za nedostupnost ključne osobe.",
    href: "/vodici/poslovni-bitcoin-nije-privatni-bitcoin/",
    image: "/images/poslovni-bitcoin-nije-privatni-bitcoin-cover-20260625.webp",
    imageAlt:
      "Odvojeni poslovni i privatni sigurnosni postupci prikazani na uredničkom radnom stolu.",
    dataLink: "entrepreneurs-guide-separation",
  },
] as const

export const entrepreneurFounderFacts = [
  "Suosnivač i bivši direktor STEMI-ja.",
  "Iskustvo izgradnje tvrtke te upravljanja ljudima, proizvodima, prihodima, troškovima i operativnim ograničenjima.",
  "Bitcoin od srpnja 2014.; sustavno proučavanje od približno 2018.",
  "Rad u Bitcoin industriji od 2020. i puni Bitcoin standard od listopada 2020.",
  "Više od 10.000 sati rada i učenja te bliski rad sa Saifedeanom Ammousom.",
  "Javni edukativni rad kroz DvadesetJedan od 2022.",
] as const

export const entrepreneurResponsibilities = {
  advisory: [
    "razdvaja osobni i poslovni kontekst",
    "pomaže definirati pitanje",
    "uređuje redoslijed odluka",
    "mapira odgovornosti i ovlasti",
    "priprema pitanja za vanjske stručnjake",
    "objašnjava Bitcoin i sigurnosne principe",
    "daje pisani sažetak konzultacije",
    "pomaže odabrati prikladan sljedeći oblik rada",
  ],
  external: [
    "pravni oblik i vlasničke odluke",
    "pravno mišljenje",
    "porezni tretman",
    "računovodstveno evidentiranje",
    "formalna procjena likvidnosti",
    "revizorsko mišljenje",
    "kupnja, prodaja i razmjena",
    "skrbništvo",
    "platne usluge",
    "izvršenje transakcija",
    "druge regulirane usluge",
  ],
} as const
