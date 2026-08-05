export const securitySituations = [
  {
    title: "Bitcoin je na burzi ili kod skrbnika",
    copy: "Sustav je operativno jednostavan, ali ovisi o pružatelju, korisničkom računu, identifikaciji, pravilima povlačenja i njegovu kontinuitetu.",
  },
  {
    title: "Imate samostalno skrbništvo, ali jednu točku oporavka",
    copy: "Imate uređaj i sigurnosnu kopiju, ali gubitak jednoga mjesta, dokumenta ili dijela znanja može ugroziti oporavak.",
  },
  {
    title: "Samo vi razumijete sustav",
    copy: "Partner ili obitelj znaju da Bitcoin postoji, ali ne znaju odakle početi, što ne smiju napraviti i koga kontaktirati.",
  },
  {
    title: "Sustav je postao složeniji od vašeg života",
    copy: "Postoji više uređaja, lokacija, dodatnih pristupnih lozinki ili osoba, ali nije jasno možete li cijeli postupak pouzdano provesti pod pritiskom.",
  },
  {
    title: "Bitcoin pripada poslu ili uključuje više odgovornih osoba",
    copy: "Tada sigurnost više nije samo osobna odluka. Potrebni su evidencija, ovlasti, odobravanje, nadzor i plan nedostupnosti ključne osobe.",
  },
] as const

export const securityRiskDimensions = [
  {
    id: "unauthorized-access",
    number: "01",
    title: "Neovlašteni pristup",
    summary: "Tko bi bez dopuštenja mogao povezati dovoljno dijelova sustava?",
    checks: [
      "može li netko bez dopuštenja doći do dovoljno podataka",
      "postoji li previše informacija na jednom mjestu",
      "jesu li uređaji, dokumenti ili računi dostupni drugim osobama",
      "oslanja li se sustav na jednu lozinku ili jednu osobu",
    ],
  },
  {
    id: "permanent-loss",
    number: "02",
    title: "Trajni gubitak pristupa",
    summary: "Može li se sustav pouzdano oporaviti nakon stvarnog gubitka?",
    checks: [
      "što se događa pri gubitku uređaja",
      "što se događa pri oštećenju ili gubitku sigurnosne kopije",
      "postoji li zaboravljena dodatna pristupna lozinka",
      "može li požar, poplava ili selidba uništiti sve primjerke",
      "je li postupak oporavka stvarno razumljiv",
    ],
  },
  {
    id: "key-person",
    number: "03",
    title: "Nedostupnost ključne osobe",
    summary: "Može li druga osoba sačuvati sustav bez panične improvizacije?",
    checks: [
      "zna li druga osoba da sustav postoji",
      "zna li prvi siguran korak",
      "zna li što nikada ne smije napraviti",
      "zna li pronaći neskrivenu uputu",
      "zna li koga kontaktirati",
      "može li se sustav očuvati bez paničnog premještanja sredstava",
    ],
  },
  {
    id: "information-exposure",
    number: "04",
    title: "Nepotrebno izlaganje informacija",
    summary: "Zna li svaka osoba samo ono što njezina uloga zahtijeva?",
    checks: [
      "koliko ljudi zna da Bitcoin postoji",
      "zna li netko više nego što njegova uloga zahtijeva",
      "pojavljuju li se lokacije ili iznosi u digitalnim bilješkama",
      "ulaze li tajni podaci u e-poštu, oblak, fotografije ili institucijske dokumente",
      "dijele li se informacije koje nisu potrebne za oporavak",
    ],
  },
] as const

export const custodyModels = [
  {
    id: "self-custody",
    title: "Samostalno skrbništvo",
    summary:
      "Najviše neposredne kontrole, uz najveću osobnu operativnu odgovornost.",
    gains: [
      "neposrednu kontrolu",
      "manju ovisnost o pružatelju",
      "mogućnost vlastitog sigurnosnog dizajna",
    ],
    dependencies: [
      "vlastitom znanju",
      "disciplini",
      "dokumentaciji",
      "pravilnom oporavku",
      "održavanju kroz vrijeme",
    ],
    risks: [
      "korisnička pogreška",
      "zaborav",
      "jedna osoba koja zna sve",
      "previše složen sustav",
      "netestirani oporavak",
    ],
    fit: "Kada osoba razumije odgovornost, može održavati sustav i ima smislen plan kontinuiteta.",
  },
  {
    id: "custodian",
    title: "Skrbnik ili platforma",
    summary:
      "Manji tehnički teret, uz ovisnost o računu, pružatelju i njegovim pravilima.",
    gains: [
      "jednostavniji pristup",
      "korisničku podršku",
      "mogućnost institucionalnog oporavka računa",
      "manji tehnički teret",
    ],
    dependencies: [
      "pružatelju",
      "njegovoj solventnosti",
      "pravilima računa",
      "identifikaciji",
      "dostupnosti usluge",
      "regulatornom i pravnom okruženju",
    ],
    risks: [
      "gubitak pristupa računu",
      "ograničenja povlačenja",
      "propast ili kompromitacija pružatelja",
      "manjak privatnosti",
      "promjena pravila",
    ],
  },
  {
    id: "layered",
    title: "Slojeviti ili hibridni model",
    summary:
      "Različite namjene imaju različite slojeve, ali cijeli sustav traži jasnu evidenciju.",
    gains: [
      "različite modele za različite namjene",
      "smanjenje oslanjanja na jednu točku",
      "postupni prijelaz prema većoj samostalnosti",
      "odvajanje operativnog i dugoročnog sloja",
    ],
    dependencies: [
      "jasnom razumijevanju svrhe svakog sloja",
      "dobroj evidenciji",
      "više postupaka",
      "redovitoj reviziji",
    ],
    risks: [
      "zbunjenost",
      "neusklađena dokumentacija",
      "zaboravljena sredstva",
      "previše različitih postupaka",
    ],
  },
  {
    id: "collaborative",
    title: "Suradnički ili profesionalno potpomognut model",
    summary:
      "Odgovornost se raspodjeljuje, uz veću potrebu za jasnim ulogama i koordinacijom.",
    gains: [
      "raspodjelu odgovornosti",
      "mogućnost višestrukog odobravanja",
      "stručnu podršku",
      "smanjenu ovisnost o jednoj osobi",
    ],
    dependencies: [
      "kvaliteti pružatelja",
      "ugovorima",
      "komunikaciji",
      "razumijevanju uloga",
      "dugoročnom kontinuitetu drugih strana",
    ],
    risks: [
      "nejasne odgovornosti",
      "ovisnost o drugim osobama",
      "pogrešno razumijevanje modela",
      "lažan osjećaj sigurnosti",
      "regulatorni ili ugovorni rizici",
    ],
  },
] as const

export const exampleStartingPoint = [
  "jedan signer wallet i jedna neprovjerena sigurnosna kopija",
  "wallet passphrase koju pamti samo vlasnik",
  "partner zna da Bitcoin postoji, ali ne zna prvi korak",
  "nema neskrivene obiteljske upute",
  "oporavak nikada nije testiran",
  "nema datuma sigurnosne revizije",
  "previše povezanih informacija nalazi se na jednom mjestu",
] as const

export const exampleRisks = [
  "jedna ključna osoba",
  "jedna lokacija",
  "zaborav ili gubitak wallet passphrase",
  "netestiran oporavak",
  "partner bez sigurnog prvog koraka",
  "dokumentacija koja ne razlikuje upute od tajni",
] as const

export const exampleAfterReview = [
  "odabran model prikladan stvarnoj situaciji",
  "razdvojene pojedinačne točke kvara",
  "neskrivena uputa bez pristupnih tajni",
  "jasno određena osoba od povjerenja",
  "zapisan prvi korak oporavka",
  "pravila što se nikada ne smije napraviti",
  "testiran postupak bez otkrivanja ili premještanja sredstava",
  "datum sljedeće sigurnosne revizije",
] as const

export const securityPlanParts = [
  {
    title: "Odabrani model",
    items: [
      "samostalni",
      "skrbnički",
      "slojeviti",
      "suradnički ili profesionalno potpomognut",
    ],
  },
  {
    title: "Glavni rizici",
    items: [
      "neovlašteni pristup",
      "trajni gubitak pristupa",
      "pojedinačne točke kvara",
      "nedostupnost ključne osobe",
      "nepotrebno izlaganje informacija",
    ],
  },
  {
    title: "Uloge",
    items: [
      "vlasnik",
      "partner",
      "osoba od povjerenja",
      "tehnička osoba",
      "pravna ili druga stručna osoba",
    ],
  },
  {
    title: "Prvi korak oporavka",
    items: [
      "što napraviti prije otvaranja wallet backupa, unošenja passphrasea ili početnih riječi drugog walleta, uključivanja uređaja ili premještanja sredstava",
    ],
  },
  {
    title: "Dokumentacija",
    items: [
      "što postoji i tko zna da postoji",
      "gdje se nalazi neskrivena uputa",
      "tko održava dokument",
      "što se nikada ne zapisuje",
    ],
  },
  {
    title: "Test i revizija",
    items: [
      "što se provjerava i tko sudjeluje",
      "kada se test ponavlja",
      "koje životne promjene traže novu reviziju",
    ],
  },
] as const

export const trustedPersonShouldKnow = [
  "da sustav postoji",
  "koju ulogu Bitcoin ima",
  "gdje se nalazi neskrivena uputa",
  "koji je prvi siguran korak",
  "koga kontaktirati",
  "koje uređaje ili dokumente treba sačuvati",
  "što nikada ne smiju napraviti",
  "kada je sustav posljednji put provjeren",
] as const

export const trustedPersonDoesNotNeed = [
  "privatne ključeve",
  "Bitcoin Core wallet backup datoteke",
  "wallet passphraseove",
  "početne riječi drugih walleta",
  "PIN-ove",
  "dodatne pristupne lozinke",
  "sve lokacije sigurnosnih kopija",
  "neposredan pristup cijelom iznosu",
  "mogućnost samostalnog improviziranja pod pritiskom",
] as const

export const securityTests = [
  {
    id: "understanding",
    title: "Razumijevanje",
    items: [
      "zna li vlasnik objasniti model bez oslanjanja na pamćenje",
      "razumije li partner svoju ulogu",
      "zna li osoba od povjerenja prvi korak",
    ],
  },
  {
    id: "documentation",
    title: "Dokumentacija",
    items: [
      "postoji li neskrivena uputa i može li se pronaći",
      "razlikuje li jasno upute od tajnih podataka",
      "ima li datum posljednje revizije",
    ],
  },
  {
    id: "unavailability",
    title: "Nedostupnost",
    items: [
      "može li partner sačuvati sustav ako je vlasnik privremeno nedostupan",
      "zna li koga kontaktirati",
      "zna li što ne treba dirati",
    ],
  },
  {
    id: "life-change",
    title: "Promjena okolnosti",
    items: [
      "selidba",
      "promjena partnera ili obitelji",
      "promjena iznosa, uređaja ili skrbnika",
      "promjena osobe od povjerenja",
      "bolest ili druga životna promjena",
    ],
  },
] as const

export const redLineItems = [
  "privatne ključeve",
  "Bitcoin Core wallet backup datoteke",
  "wallet passphraseove i druge pristupne lozinke",
  "početne riječi drugih walleta",
  "PIN-ove",
  "fotografije sigurnosnih kopija",
  "točne lokacije kopija",
  "pristup burzi",
  "pristup novčaniku",
  "pristup uređajima",
  "udaljeni pristup računalu",
  "Bitcoin ili potpisanu transakciju na zahtjev savjetnika",
  "dokument koji samostalno omogućuje pristup sredstvima",
] as const

export const enoughToDescribe = [
  "vrstu postojećeg modela",
  "vrste uređaja samo kada su relevantne, bez serijskih brojeva ili identifikatora",
  "broj uključenih osoba",
  "glavne rizike",
  "obiteljske ili poslovne odgovornosti",
  "što pokušavate postići",
  "gdje osjećate da sustav ovisi o jednoj točki",
] as const

export const notNeededToDescribe = [
  "količinu Bitcoina",
  "adrese",
  "privatne ključeve",
  "wallet backup datoteke",
  "wallet passphraseove",
  "početne riječi drugih walleta",
  "lokacije sigurnosnih kopija",
  "tekst drugih pristupnih lozinki",
  "fotografije uređaja i sigurnosnih dokumenata",
  "detalje koji omogućuju povezivanje svih dijelova sustava",
] as const

export const securityContexts = [
  {
    id: "personal",
    title: "Osobni Bitcoin",
    copy: "Fokus je na modelu skrbništva, sigurnosnim navikama, pojedinačnim točkama kvara, oporavku, dokumentaciji i osobi od povjerenja.",
    href: "/osobno/",
    linkLabel: "Pogledajte osobni Bitcoin sustav",
    dataLink: "security-context-personal",
  },
  {
    id: "family",
    title: "Obiteljski Bitcoin",
    copy: "Fokus je na zajedničkom razumijevanju, partnerovu prvom koraku, podjeli informacija, kontinuitetu te razlikovanju sigurnosnog i pravnog nasljeđivanja.",
    href: "/obitelj/",
    linkLabel: "Pogledajte Bitcoin u obitelji",
    dataLink: "security-context-family",
  },
  {
    id: "business",
    title: "Poslovni Bitcoin",
    copy: "Fokus je na evidenciji, ovlastima, odobravanju, razdvajanju privatnog i poslovnog Bitcoina, nedostupnosti ključne osobe te vanjskim stručnjacima.",
    links: [
      {
        href: "/poduzetnici/",
        label: "Pogledajte Bitcoin za poduzetnike",
        dataLink: "security-context-entrepreneurs",
      },
      {
        href: "/za-tvrtke/",
        label: "Pogledajte Bitcoin briefing za upravu",
        dataLink: "security-context-business",
      },
    ],
  },
] as const

export const securityServicePaths = [
  {
    id: "assessment",
    kicker: "Još ne znate gdje je problem",
    title: "Besplatna provjera Bitcoin standarda",
    copy: "Deset pitanja u oko tri minute. Ne traži e-adresu, a odgovori ostaju samo u radnoj memoriji otvorene stranice.",
    meta: "10 pitanja · oko 3 minute · bez e-adrese",
    href: "/provjera-bitcoin-standarda/",
    linkLabel: "Napravite besplatnu provjeru",
    dataLink: "security-service-assessment",
  },
  {
    id: "consultation",
    kicker: "Imate jedno konkretno sigurnosno pitanje",
    title: "Bitcoin konzultacija",
    copy: "Za odabir tipa skrbništva, pojedinačne točke kvara, partnerov prvi korak, oporavak ili postupni prijelaz prema većoj samostalnosti.",
    meta: "60 minuta · 200 € · priprema · pisani sažetak",
    href: "/bitcoin-konzultacija/",
    linkLabel: "Pogledajte Bitcoin konzultaciju",
    dataLink: "security-service-consultation",
  },
  {
    id: "standard",
    kicker: "Sigurnost je dio šireg životnog sustava",
    title: "Osobni Bitcoin standard",
    copy: "Za situacije u kojima su sigurnost, prihod, dug, partner, obitelj, neto imovina, nekretnine, posao i kontinuitet međusobno povezani.",
    meta: "4–6 tjedana · 1.500 € · pisani standard · provedba · revizija",
    href: "/osobni-bitcoin-standard/",
    linkLabel: "Pogledajte Osobni Bitcoin standard",
    dataLink: "security-service-personal-standard",
  },
] as const

export const founderExperience = [
  "Bitcoin od srpnja 2014.",
  "sustavno proučavanje od približno 2018.",
  "rad u Bitcoin industriji od 2020.",
  "puni Bitcoin standard od listopada 2020.",
  "više od 10.000 sati rada i učenja",
  "rad sa Saifedeanom Ammousom",
  "javni edukativni rad kroz DvadesetJedan",
  "primjena sigurnosnih pitanja unutar osobnog Bitcoin standarda",
] as const
