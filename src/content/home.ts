export const conversationAudienceGroups = [
  {
    title: "Osobno",
    area: "bitcoin",
    copy: "Bitcoin, proračun, dug, stvarni višak i veće odluke koje ne želite donositi iz panike.",
    bullets: [
      "Ne znam koji je novac stvarno slobodan za Bitcoin.",
      "Imam Bitcoin, ali nemam pravila kada kupovati, držati, trošiti ili rebalansirati.",
    ],
  },
  {
    title: "Obiteljski",
    area: "security",
    copy: "Partner, obitelj, sigurnost, nasljeđivanje i ljudi koji trebaju razumjeti što se događa.",
    bullets: [
      "Partner ili obitelj nisu na istoj razini razumijevanja.",
      "Ako se meni nešto dogodi, nije jasno tko zna prvi sigurnosni korak.",
    ],
  },
  {
    title: "Poslovno",
    area: "worth",
    copy: "Cash flow, porezi, plaće, dobavljači, poslovna riznica i odvajanje privatnog od poslovnog Bitcoina.",
    bullets: [
      "Vodim posao i ne znam što je stvarni višak riznice.",
      "Ne znam kako odvojiti privatni Bitcoin od poslovnog Bitcoina.",
    ],
  },
] as const

export const conversationProblemCards = conversationAudienceGroups.flatMap(
  (group) =>
    group.bullets.map((bullet) => ({
      title: bullet,
      copy: group.copy,
    }))
)

export const frameworkAreas = [
  {
    area: "budget",
    title: "Proračun",
    idea: "vidjeti novac",
    copy: "Svaki euro ima namjenu prije Bitcoin odluke.",
  },
  {
    area: "debt",
    title: "Dug",
    idea: "osloboditi budućnost",
    copy: "Dug je budući novac koji ste već potrošili.",
  },
  {
    area: "giving",
    title: "Davanje",
    idea: "otvoriti ruku",
    copy: "Davanje mijenja odnos prema novcu i stvaranju vrijednosti.",
  },
  {
    area: "bitcoin",
    title: "Bitcoin kao novac",
    idea: "primarni saldo",
    copy: "Pitanje nije samo kada kupiti, nego u kojem obliku držite novčani saldo.",
  },
  {
    area: "worth",
    title: "Neto imovina",
    idea: "bilanca kao cjelina",
    copy: "Bitcoin može biti primarni novac, ali neto imovina mora ostati cjelina.",
  },
  {
    area: "time",
    title: "Vrijeme i volatilnost",
    idea: "pravila kroz cikluse",
    copy: "Vrijeme samo po sebi nije strategija. Strategija nastaje kada znate što ćete raditi dok vrijeme prolazi.",
  },
  {
    area: "security",
    title: "Sigurnost i obitelj",
    idea: "zaštititi pristup",
    copy: "Sigurnost štiti od krađe, ali i od zaborava, panike, bolesti, smrti i dobronamjerne pogreške.",
  },
]

export const introCallSteps = [
  {
    title: "Kažete koju odluku pokušavate donijeti.",
    copy: "Dovoljna je jedna odluka ili nedoumica koju želite smjestiti u stvarni život.",
  },
  {
    title: "Smjestimo pitanje u okvir: osobno, obiteljski ili poslovno.",
    copy: "Ne morate unaprijed znati u kojem ste poglavlju knjige.",
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
  "dug-je-buduci-novac",
  "bitcoin-kao-novac",
] as const
