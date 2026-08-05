export const custodyDefinitions = [
  {
    term: "Skrbništvo",
    question:
      "Tko može odobriti pristup ili premještanje Bitcoina i pod kojim uvjetima?",
  },
  {
    term: "Sigurnosna kopija",
    question:
      "Koji podatak ili materijal omogućuje obnovu pristupa ako uređaj prestane raditi ili se izgubi?",
  },
  {
    term: "Oporavak",
    question:
      "Koji se postupak provodi kada se izgubi uređaj, pristup ili dio postojeće infrastrukture?",
  },
  {
    term: "Sigurnosni kontinuitet",
    question:
      "Kako se sustav održava kada je vlasnik privremeno ili trajno nedostupan?",
  },
  {
    term: "Pravno nasljeđivanje",
    question:
      "Kako vlasništvo i prava prelaze nakon smrti te koji pravni dokumenti uređuju taj prijenos?",
  },
] as const

export const custodySituations = [
  {
    title: "Bitcoin je kod skrbnika ili na platformi",
    copy: "Pristup je jednostavniji, ali ovisi o računu, identitetu, pravilima pružatelja, njegovoj dostupnosti i sposobnosti isplate.",
  },
  {
    title: "Bitcoin je u samostalnom skrbništvu s jednom sigurnosnom kopijom",
    copy: "Kontrola je kod vlasnika, ali jedna lokacija, dokument ili zaboravljeni podatak mogu postati pojedinačna točka kvara.",
  },
  {
    title: "Postoji više uređaja i lokacija, ali nema jasne dokumentacije",
    copy: "Sustav izgleda otpornije, ali se pod pritiskom može pretvoriti u zbunjenost i trajni gubitak pristupa.",
  },
  {
    title: "Samo jedna osoba razumije cijeli sustav",
    copy: "Partner, obitelj ili suradnici ne znaju prvi siguran korak ako je glavna osoba nedostupna.",
  },
  {
    title: "Isti model koristi se za sve namjene",
    copy: "Operativni saldo, dugoročni Bitcoin, obiteljski Bitcoin i poslovni Bitcoin imaju isti pristup i isti postupak, iako njihovi rizici nisu jednaki.",
  },
] as const

export const custodyModels = [
  {
    id: "skrbnicki",
    number: "01",
    title: "Skrbnički model",
    summary:
      "Treća strana kontrolira tehnički pristup ili izvršavanje prijenosa.",
    gains: [
      "jednostavnije korisničko iskustvo",
      "podršku i mogućnost oporavka računa",
      "manji tehnički teret",
      "potencijalno lakšu integraciju s poslovnim ili nasljednim postupkom",
    ],
    dependencies: [
      "solventnost i sigurnost pružatelja",
      "pravila računa i identifikacija",
      "dostupnost usluge",
      "pravno i regulatorno okruženje",
    ],
    risks: [
      "zabrana ili gubitak pristupa",
      "ograničenja povlačenja",
      "kompromitacija ili propast pružatelja",
      "promjena uvjeta i manjak privatnosti",
    ],
    fit: "Kada osoba još nema znanje ili mogućnost sigurno održavati samostalni sustav, kada je potreban operativni pristup ili kada je ovisnost o pružatelju svjesno prihvaćen kompromis.",
    caution:
      "Kada je neprihvatljiva visoka ovisnost o računu, pružatelju ili njegovim pravilima.",
  },
  {
    id: "samostalni",
    number: "02",
    title: "Samostalno skrbništvo",
    summary: "Vlasnik kontrolira tehničke podatke i odluke.",
    gains: [
      "neposrednu kontrolu",
      "manju ovisnost o pružatelju",
      "veću mogućnost prilagodbe",
      "mogućnost dugoročnog neovisnog pristupa",
    ],
    dependencies: [
      "vlastito znanje i sigurnosne navike",
      "dokumentacija",
      "sigurnosne kopije",
      "sposobnost oporavka i održavanja kroz vrijeme",
    ],
    risks: [
      "korisnička pogreška, krađa ili gubitak",
      "zaborav",
      "jedna osoba koja zna sve",
      "netestirani postupak ili prevelika složenost",
    ],
    fit: "Kada osoba razumije operativnu odgovornost, može održavati sustav i ima realan plan oporavka i kontinuiteta.",
    caution:
      "Kada se sustav ne može pouzdano objasniti, provesti pod pritiskom ili dugoročno održavati.",
  },
  {
    id: "slojeviti",
    number: "03",
    title: "Slojeviti model",
    summary: "Različite namjene koriste različite modele ili razine pristupa.",
    gains: [
      "prilagodbu modela namjeni",
      "manju ovisnost o jednoj točki",
      "mogućnost postupnog prijelaza",
      "odvajanje čestog korištenja od dugoročnog čuvanja",
    ],
    dependencies: [
      "jasna svrha svakog sloja",
      "uredna evidencija",
      "razumljivi postupci",
      "redovita revizija",
    ],
    risks: [
      "zbunjenost i neusklađena dokumentacija",
      "zaboravljena sredstva",
      "previše postupaka",
      "korištenje pogrešnog sloja",
    ],
    fit: "Kada operativni, dugoročni, obiteljski ili poslovni saldo imaju stvarno različite potrebe i svaki sloj ostaje razumljiv.",
    caution:
      "Kada dodatni slojevi stvaraju više postupaka nego što ih osoba ili tim mogu pouzdano održavati.",
  },
  {
    id: "suradnicki",
    number: "04",
    title: "Suradnički ili višestruko odobravani model",
    summary:
      "Kontrola ili oporavak raspoređeni su između više ključeva, osoba ili pružatelja.",
    gains: [
      "manju ovisnost o jednoj osobi",
      "mogućnost više odobrenja",
      "podijeljeni rizik",
      "otpornost na gubitak jednog elementa",
    ],
    dependencies: [
      "jasne uloge",
      "kvaliteta pružatelja",
      "komunikacija i dokumentacija",
      "dugoročni kontinuitet drugih strana",
    ],
    risks: [
      "nejasne odgovornosti i složena koordinacija",
      "ovisnost o drugim osobama",
      "ugovorni ili regulatorni rizik",
      "lažan osjećaj sigurnosti i nerazumijevanje modela",
    ],
    fit: "Kada više odobrenja ili raspodijeljen oporavak rješavaju prepoznat rizik, a svi sudionici razumiju svoju ulogu.",
    caution:
      "Kada korisnik ne razumije kako model radi bez pružatelja ili ključne osobe, odnosno kada koordinacija nije održiva.",
  },
] as const

export const custodyComparisonCriteria = [
  {
    label: "Neposredna kontrola",
    values: [
      "ograničena pravilima pružatelja",
      "izravno kod vlasnika",
      "različita po sloju",
      "podijeljena prema pravilima",
    ],
  },
  {
    label: "Tehnički teret",
    values: [
      "niži za korisnika",
      "viši za korisnika",
      "ovisi o svakom sloju",
      "viši pri postavljanju i provjeri",
    ],
  },
  {
    label: "Operativni teret",
    values: [
      "niži, uz procedure računa",
      "u cijelosti kod vlasnika",
      "ovisi o broju slojeva",
      "uključuje koordinaciju uloga",
    ],
  },
  {
    label: "Ovisnost o trećoj strani",
    values: [
      "visoka ovisnost",
      "niska ili nikakva",
      "različita po sloju",
      "ovisna o izvedbi modela",
    ],
  },
  {
    label: "Rizik korisničke pogreške",
    values: [
      "dio pogrešaka preuzima pružatelj",
      "izravno kod vlasnika",
      "raspodijeljen između postupaka",
      "smanjen za neke, veći za koordinaciju",
    ],
  },
  {
    label: "Privatnost",
    values: [
      "ograničena identifikacijom i evidencijom",
      "može biti viša uz dobre navike",
      "različita po sloju",
      "ovisi o uključenim stranama",
    ],
  },
  {
    label: "Institucionalni oporavak",
    values: [
      "češće dostupan",
      "nije ugrađen",
      "moguć u pojedinim slojevima",
      "često moguć uz ugovorene uloge",
    ],
  },
  {
    label: "Samostalni oporavak",
    values: [
      "ograničen pravilima računa",
      "moguć uz provjeren plan",
      "ovisi o sloju",
      "ovisi o pragu i dostupnim dijelovima",
    ],
  },
  {
    label: "Ovisnost o jednoj osobi",
    values: [
      "niža tehnički, moguća na računu",
      "visoka bez plana kontinuiteta",
      "može se raspodijeliti",
      "niža uz jasno raspoređene uloge",
    ],
  },
  {
    label: "Često korištenje",
    values: [
      "često jednostavnije",
      "moguće uz operativni novčanik",
      "prikladno uz poseban operativni sloj",
      "može biti sporije zbog odobravanja",
    ],
  },
  {
    label: "Dugoročni saldo",
    values: [
      "ovisi o prihvaćenom riziku pružatelja",
      "prikladno uz održiv plan",
      "prikladno uz jasnu namjenu",
      "prikladno kada složenost ima svrhu",
    ],
  },
  {
    label: "Obiteljski kontekst",
    values: [
      "lakši institucionalni prvi korak",
      "traži plan za nedostupnost vlasnika",
      "moguć uz obiteljski sloj",
      "moguć uz jasne i ograničene uloge",
    ],
  },
  {
    label: "Poslovni kontekst",
    values: [
      "moguć uz pravila računa i ovlasti",
      "traži internu podjelu odgovornosti",
      "moguć uz odvojeni poslovni sloj",
      "moguć uz formalna odobrenja",
    ],
  },
  {
    label: "Redovita provjera",
    values: [
      "uvjeta, pristupa i pružatelja",
      "kopija, postupka i znanja",
      "svih slojeva i evidencije",
      "uloga, pragova i dostupnosti strana",
    ],
  },
] as const

export const custodyDecisionCriteria = [
  "Možete li samostalno objasniti kako sustav radi?",
  "Možete li ga provesti pod pritiskom?",
  "Je li postupak oporavka ikada provjeren?",
  "Postoji li jedna osoba bez koje ništa ne funkcionira?",
  "Postoji li jedna lokacija čiji bi gubitak bio presudan?",
  "Koliko često se Bitcoin koristi?",
  "Treba li partner, obitelj ili poslovni suradnik znati prvi korak?",
  "Pripada li Bitcoin samo vama, obitelji ili poslovanju?",
  "Kolike bi bile posljedice trajnog gubitka?",
  "Jeste li spremni dugoročno održavati odabranu složenost?",
] as const

export const custodyTransitionSteps = [
  {
    title: "Popisati postojeći model",
    items: [
      "gdje se Bitcoin nalazi",
      "tko kontrolira pristup",
      "koji pružatelji i uređaji sudjeluju",
      "za koju namjenu svaki saldo postoji",
    ],
  },
  {
    title: "Prepoznati pojedinačne točke kvara",
    items: [
      "jedna osoba",
      "jedan račun",
      "jedan uređaj",
      "jedan dokument",
      "jedna lokacija",
      "jedna dodatna pristupna lozinka",
    ],
  },
  {
    title: "Odvojiti različite namjene",
    items: [
      "operativni saldo",
      "dugoročni saldo",
      "obiteljski sloj",
      "poslovni sloj",
    ],
  },
  {
    title: "Urediti dokumentaciju bez tajni",
    items: [
      "tko zna što",
      "gdje se nalazi neskrivena uputa",
      "koji je prvi korak",
      "koga kontaktirati",
      "što se nikada ne zapisuje",
    ],
  },
  {
    title: "Provjeriti razumijevanje i oporavak",
    items: [
      "bez slanja sredstava savjetniku",
      "bez otkrivanja privatnih ključeva, wallet backup datoteka, wallet passphrasea ili početnih riječi drugih walleta",
      "bez nasumičnog pokušavanja oporavka glavnog novčanika",
    ],
  },
  {
    title: "Tek zatim povećavati samostalnost ili složenost",
    items: [
      "samo kada korisnik razumije dodatnu odgovornost",
      "samo kada se novi postupak može dugoročno održavati",
    ],
  },
] as const

export const custodyExample = {
  startingPoint: [
    "manji dio Bitcoina kod skrbnika",
    "veći dio u nedokumentiranom sustavu samostalne pohrane",
    "jedna neprovjerena sigurnosna kopija",
    "passphrase koju pamti samo vlasnik",
    "vlasnik jedini zna cijeli postupak",
    "partner zna da Bitcoin postoji, ali ne zna prvi korak",
    "sustav nikada nije provjeren",
    "ne postoje pisani pregled namjena ni datum revizije",
  ],
  weaknesses: [
    "jedna ključna osoba",
    "jedna lokacija sigurnosne kopije",
    "različiti modeli bez zajedničke dokumentacije",
    "zaborav wallet passphrasea",
    "partner bez sigurnog prvog koraka",
    "nejasna granica između operativnog i dugoročnog salda",
  ],
  after: [
    "svaki saldo ima jasnu namjenu",
    "operativni i dugoročni sloj imaju odgovarajuće modele",
    "prepoznate su pojedinačne točke kvara",
    "postoji neskrivena uputa",
    "partner zna što smije i što ne smije napraviti",
    "određena je osoba od povjerenja",
    "zapisan je prvi korak oporavka",
    "utvrđeni su postupak provjere i datum sljedeće revizije",
  ],
} as const

export const custodyPlanParts = [
  {
    title: "Namjene i modeli",
    items: [
      "koji saldo postoji i čemu služi",
      "koji model koristi",
      "tko je odgovoran",
    ],
  },
  {
    title: "Ovisnosti",
    items: [
      "skrbnici, uređaji, osobe i dokumenti",
      "lokacije opisane samo na razini koja ne daje pristup",
    ],
  },
  {
    title: "Pojedinačne točke kvara",
    items: [
      "što bi moglo omogućiti neovlašteni pristup",
      "što bi moglo uzrokovati trajni gubitak",
      "koja osoba ili pružatelj ima kritičnu ulogu",
    ],
  },
  {
    title: "Prvi korak oporavka",
    items: [
      "što napraviti prije otvaranja wallet backupa, unošenja passphrasea ili početnih riječi drugog walleta",
      "što napraviti prije uključivanja uređaja",
      "koga kontaktirati prije premještanja sredstava",
    ],
  },
  {
    title: "Obiteljske ili poslovne uloge",
    items: [
      "tko zna da sustav postoji i može pronaći neskrivenu uputu",
      "tko može predložiti ili odobriti postupak",
      "tko vodi evidenciju",
    ],
  },
  {
    title: "Provjera i datum revizije",
    items: [
      "što je posljednji put provjereno i tko je sudjelovao",
      "kada se sustav ponovno pregledava",
      "koje promjene zahtijevaju novu reviziju",
    ],
  },
] as const

export const custodyPlanExclusions = [
  "privatne ključeve",
  "Bitcoin Core wallet backup datoteke",
  "wallet passphraseove",
  "početne riječi drugih walleta",
  "PIN-ove",
  "potpune lokacije sigurnosnih kopija",
  "dovoljno podataka za neposredan pristup sredstvima",
] as const

export const custodyKnowledgeRoles = {
  shouldKnow: [
    "da sustav postoji",
    "čemu određeni saldo služi",
    "gdje se nalazi neskrivena uputa",
    "koji je prvi siguran korak",
    "koga kontaktirati",
    "što treba sačuvati",
    "što nikada ne smije napraviti",
    "kada je sustav posljednji put provjeren",
  ],
  doesNotNeed: [
    "privatne ključeve",
    "Bitcoin Core wallet backup datoteke",
    "wallet passphraseove",
    "početne riječi drugih walleta",
    "PIN-ove",
    "sve lokacije sigurnosnih kopija",
    "neposredan pristup cijelom iznosu",
    "mogućnost samostalnog premještanja sredstava",
    "više podataka nego što njihova uloga zahtijeva",
  ],
} as const

export const custodyContinuity = [
  "tko zna da Bitcoin postoji",
  "tko zna prvi korak",
  "kako se čuvaju uređaji i dokumenti",
  "koga treba kontaktirati",
  "kako se izbjegava improvizacija",
  "kako se sustav održava pri bolesti ili nedostupnosti",
] as const

export const custodyLegalInheritance = [
  "oporuka",
  "zakonski nasljednici",
  "bračna stečevina",
  "vlasnička prava",
  "pravni dokumenti",
  "porezne posljedice",
  "provedba nakon smrti",
] as const

export const custodyContexts = [
  {
    id: "personal",
    eyebrow: "Osobni Bitcoin",
    title: "Vlastito znanje i oporavak",
    copy: "Model skrbništva, sigurnosne navike, oporavak i pojedinačne točke kvara.",
    label: "Pogledajte osobni Bitcoin sustav",
    href: "/osobno/",
  },
  {
    id: "family",
    eyebrow: "Obiteljski Bitcoin",
    title: "Kontinuitet bez glavne osobe",
    copy: "Partnerovo razumijevanje, osoba od povjerenja, prvi korak i podjela informacija.",
    label: "Pogledajte Bitcoin u obitelji",
    href: "/obitelj/",
  },
  {
    id: "entrepreneurs",
    eyebrow: "Poslovni Bitcoin",
    title: "Evidencija, ovlasti i odgovornost",
    copy: "Odvajanje privatnog i poslovnog Bitcoina, predlaganje, odobravanje i nedostupnost vlasnika ili direktora.",
    label: "Pogledajte Bitcoin za poduzetnike",
    href: "/poduzetnici/",
    secondaryLabel: "Pogledajte Bitcoin briefing za upravu",
    secondaryHref: "/za-tvrtke/",
  },
] as const

export const custodyGuidePath = [
  {
    slug: "bitcoin-core-standard",
    step: "01",
    action: "Uredite dugoročni sustav",
    copy: "Offline Bitcoin Core potpisnici, watch-only koordinacija, vlastiti node, PSBT i provjeren oporavak.",
  },
  {
    slug: "samostalna-pohrana-ili-skrbnik",
    step: "02",
    action: "Razumijte modele",
    copy: "Skrbnik, samostalno skrbništvo i slojeviti pristup bez ideološkog pritiska.",
  },
  {
    slug: "sigurnost-ne-smije-ovisiti-samo-o-vama",
    step: "03",
    action: "Uredite oporavak",
    copy: "Sigurnosne kopije, pojedinačne točke kvara i provjera postupka.",
  },
  {
    slug: "obiteljski-pristup-bitcoinu",
    step: "04",
    action: "Uključite druge ljude",
    copy: "Obiteljski prvi korak, osoba od povjerenja i kontinuitet bez dijeljenja tajni.",
  },
] as const

export const custodyNextSteps = [
  {
    id: "assessment",
    eyebrow: "Još ne znate gdje je problem",
    title: "Besplatna provjera Bitcoin standarda",
    copy: "Deset pitanja pokazuje u kojem području nedostaje jasno pravilo. Odgovori ostaju samo u radnoj memoriji otvorene stranice.",
    facts: ["10 pitanja", "oko 3 minute", "bez e-adrese"],
    label: "Napravite besplatnu provjeru",
    href: "/provjera-bitcoin-standarda/",
  },
  {
    id: "consultation",
    eyebrow: "Imate jedno konkretno pitanje",
    title: "Bitcoin konzultacija",
    copy: "Za odabir modela, pojedinačnu točku kvara, prijelaz, partnerov prvi korak ili odvajanje privatnog i poslovnog Bitcoina.",
    facts: ["60 minuta", "200 €", "priprema", "pisani sažetak"],
    label: "Pogledajte Bitcoin konzultaciju",
    href: "/bitcoin-konzultacija/",
  },
  {
    id: "standard",
    eyebrow: "Skrbništvo je dio šireg sustava",
    title: "Osobni Bitcoin standard",
    copy: "Kada su skrbništvo i kontinuitet povezani s prihodom, dugom, partnerom, imovinom, nekretninama ili poslovanjem.",
    facts: [
      "4–6 tjedana",
      "1.500 €",
      "pisani standard",
      "provedba",
      "revizija",
    ],
    label: "Pogledajte Osobni Bitcoin standard",
    href: "/osobni-bitcoin-standard/",
  },
] as const
