export const conversationProblemCards = [
  {
    title:
      "Imam Bitcoin, ali nemam jasna pravila kada kupovati, držati, trošiti ili rebalansirati.",
    copy: "Bitcoin postoji, ali odluke još ovise o cijeni, dojmu ili tuđem mišljenju.",
  },
  {
    title: "Razmišljam treba li Bitcoin imati veću ulogu u mojoj imovini.",
    copy: "Ne tražite tuđu odluku, nego jasniji okvir za vlastitu situaciju.",
  },
  {
    title: "Imam dug i ne znam kako to mijenja Bitcoin odluku.",
    copy: "Dug mijenja pritisak, vrijeme i sposobnost čekanja, pa ne smije ostati skriven.",
  },
  {
    title: "Ne znam koliko državnog novca trebam držati za kratkoročne obveze.",
    copy: "Novac koji izgleda slobodno možda već pripada budućem trošku.",
  },
  {
    title: "Partner ili obitelj nisu na istoj razini razumijevanja.",
    copy: "Bitcoin odluka mora se moći objasniti bez pritiska, žargona i panike.",
  },
  {
    title:
      "Brine me sigurnost, nasljeđivanje ili pristup ako se meni nešto dogodi.",
    copy: "Sigurnost mora štititi od krađe, ali i od gubitka pristupa.",
  },
  {
    title:
      "Ne želim još jedan video o Bitcoinu; želim povezati Bitcoin sa svojom stvarnom situacijom.",
    copy: "Informacija je korisna tek kada postane primjenjiva na proračun, dug, obitelj i sigurnost.",
  },
]

export const conversationAudienceGroups = [
  {
    label: "osobno",
    area: "bitcoin",
    cards: [
      conversationProblemCards[0],
      conversationProblemCards[1],
      conversationProblemCards[2],
      conversationProblemCards[3],
    ],
  },
  {
    label: "obiteljski",
    area: "security",
    cards: [
      conversationProblemCards[4],
      conversationProblemCards[5],
      conversationProblemCards[6],
    ],
  },
  {
    label: "poslovno",
    area: "worth",
    cards: [
      {
        title:
          "Vodim posao i ne znam kako odvojiti privatni Bitcoin, poslovnu riznicu i kratkoročne obveze.",
        copy: "Privatni Bitcoin, poslovni Bitcoin i novac za obveze ne smiju biti ista maglovita masa.",
      },
      {
        title:
          "Imam prihode, poreze, plaće, dobavljače ili zalihe, ali nemam jasna pravila koji je novac stvarno slobodan.",
        copy: "Klijentova uplata nije odmah vlasnikov novac. Prvo treba vidjeti operativne obveze.",
      },
      {
        title:
          "Dio moje neto imovine je u poslu, opremi, znanju ili poslovnim udjelima.",
        copy: "Bitcoin odluka mora se uklopiti u cijelu bilancu, a ne samo u osobni wallet.",
      },
      {
        title:
          "Ako se meni nešto dogodi, nije jasno tko u poslu zna što se smije, a što se nikada ne smije napraviti.",
        copy: "Poslovna sigurnost treba ovlaštene osobe, granice pristupa i operativna pravila.",
      },
    ],
  },
] as const

export const frameworkAreas = [
  {
    area: "budget",
    title: "Proračun",
    idea: "Vidjeti novac.",
    copy: "Svaki euro ima namjenu prije Bitcoin odluke.",
  },
  {
    area: "debt",
    title: "Dug",
    idea: "Osloboditi budućnost.",
    copy: "Dug je budući novac koji ste već potrošili.",
  },
  {
    area: "giving",
    title: "Davanje",
    idea: "Otvoriti ruku.",
    copy: "Davanje mijenja odnos prema novcu i stvaranju vrijednosti.",
  },
  {
    area: "bitcoin",
    title: "Bitcoin kao novac",
    idea: "Primarni novac.",
    copy: "Pitanje nije samo kada kupiti, nego u kojem obliku držite novčani saldo.",
  },
  {
    area: "worth",
    title: "Neto imovina",
    idea: "Bilanca kao cjelina.",
    copy: "Bitcoin može biti primarni novac, ali neto imovina mora ostati cjelina.",
  },
  {
    area: "time",
    title: "Vrijeme i volatilnost",
    idea: "Pravila kroz cikluse.",
    copy: "Vrijeme samo po sebi nije strategija. Strategija nastaje kada znate što ćete raditi dok vrijeme prolazi.",
  },
  {
    area: "security",
    title: "Sigurnost i obitelj",
    idea: "Zaštititi pristup.",
    copy: "Sigurnost štiti od krađe, ali i od zaborava, panike, bolesti, smrti i dobronamjerne pogreške.",
  },
]

export const frameworkApplicationLayers = [
  {
    title: "Osobno",
    area: "budget",
    copy: "proračun, dug, davanje, Bitcoin saldo, veće kupnje",
  },
  {
    title: "Obiteljski",
    area: "security",
    copy: "zajednička pravila, partner, djeca, sigurnost i oporavak",
  },
  {
    title: "Poslovno",
    area: "worth",
    copy: "cash flow, porezi, plaće, dobavljači, poslovna riznica i ovlaštene osobe",
  },
] as const

export const businessDecisionItems = [
  {
    title: "Privatno i poslovno",
    copy: "Privatni Bitcoin i poslovni Bitcoin ne smiju biti ista maglovita masa.",
  },
  {
    title: "Kratkoročne obveze",
    copy: "Novac za poreze, plaće, najam i dobavljače ne smije ovisiti o povoljnom tržištu.",
  },
  {
    title: "Višak riznice",
    copy: "Tek kada su obveze jasne, višak riznice može dobiti Bitcoin pravila.",
  },
  {
    title: "Dug i rast",
    copy: "Poslovni rast koji ovisi o dugu mora se gledati i kroz štetu ako očekivanje zakaže.",
  },
  {
    title: "Sigurnost i ovlaštenja",
    copy: "Ako sve stoji u glavi vlasnika, tvrtka ima operativni rizik koji možda nije vidljiv u bilanci.",
  },
] as const

export const introCallSteps = [
  {
    title: "Kažete mi koju odluku pokušavate donijeti.",
    copy: "Dovoljna je jedna odluka ili nedoumica koju želite smjestiti u stvarni život.",
  },
  {
    title:
      "Smjestimo pitanje u okvir: Bitcoin teza, proračun, dug, neto imovina, sigurnost ili obitelj.",
    copy: "Jedno pitanje obično pokaže koje je područje prvo usko grlo.",
  },
  {
    title:
      "Vidimo treba li vam kratak odgovor, Bitcoin konzultacija ili puni osobni Bitcoin standard.",
    copy: "Ne morate unaprijed znati koji oblik rada ima smisla.",
  },
  {
    title: "Ako plaćeni nastavak nema smisla, to otvoreno kažem.",
    copy: "Uvodni razgovor je filter, a ne pritisak prema kupnji programa.",
  },
]

export const homeNeverAskItems = [
  "seed phrase se nikada ne dijeli",
  "privatne ključeve",
  "lozinke",
  "pristup uređajima",
  "pristup burzi ili novčaniku",
  "slanje Bitcoina meni",
]

export const homeSecurityReviewItems = [
  "kako odabrati način čuvanja Bitcoina",
  "što obitelj treba znati",
  "kako spriječiti da pristup Bitcoinu ovisi o jednoj osobi, uređaju ili lokaciji",
  "što nikada ne dijeliti",
  "kako pripremiti upute bez predaje kontrole",
]

export const methodPathSteps = [
  "Proračun",
  "Dug",
  "Davanje",
  "Bitcoin kao novac",
  "Neto imovina",
  "Vrijeme i volatilnost",
  "Sigurnost i obitelj",
]

export const personalStandardRules = [
  "što svaki euro treba napraviti",
  "kako dug izlazi iz života",
  "kako davanje ostaje dio proračuna",
  "kada Bitcoin ima ulogu novca",
  "kako se gleda ukupna neto imovina",
  "što obitelj treba znati bez predaje kontrole",
]

export const priceTimeCards = [
  {
    title: "Iznad trenda",
    copy: "Riješite buduća plaćanja koja biste ionako morali pokriti.",
  },
  {
    title: "Blizu trenda",
    copy: "Držite pravila. Ne mijenjajte sustav zbog raspoloženja tržišta.",
  },
  {
    title: "Ispod trenda",
    copy: "Smanjite nepotrebne troškove, jačajte prihode i vratite se proračunu.",
  },
]

export const homeGuideSlugs = [
  "svaki-euro-ima-namjenu",
  "dug-ili-bitcoin",
  "bitcoin-kao-novac",
] as const
