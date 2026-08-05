import { guideHref } from "../content/guideLinks.ts"

import { CONVERSATION_PATH } from "../content/site.ts"

export const QUICK_ASSESSMENT_DIMENSION_IDS = [
  "understanding",
  "financial",
  "living",
  "security",
] as const

export type QuickAssessmentDimension =
  (typeof QUICK_ASSESSMENT_DIMENSION_IDS)[number]
export type QuickAssessmentCriticalFlag =
  | "unplanned_debt"
  | "no_continuity_plan"
  | "exchange_custody_without_plan"
export type QuickAssessmentResultKey = QuickAssessmentDimension | "ready"
export type QuickAssessmentQuestionId =
  | "understand-value"
  | "budget"
  | "debt"
  | "net-worth-role"
  | "operating-rules"
  | "family-included"
  | "continuity-plan"
  | "exchange-custody"
  | "missed-price"
  | "drawdown-plan"

export type QuickAssessmentAnswerOption = {
  readonly id: string
  readonly label: string
  readonly score: 0 | 1 | 2
  readonly criticalFlag?: QuickAssessmentCriticalFlag
}

export type QuickAssessmentQuestion = {
  readonly id: QuickAssessmentQuestionId
  readonly dimension: QuickAssessmentDimension
  readonly prompt: string
  readonly helper?: string
  readonly answers: readonly QuickAssessmentAnswerOption[]
}

export type QuickAssessmentAnswers = Partial<
  Record<QuickAssessmentQuestionId, string>
>

export type QuickAssessmentDimensionScore = {
  readonly score: number
  readonly maximumScore: number
  readonly normalizedScore: number
}

export type QuickAssessmentResult = {
  readonly key: QuickAssessmentResultKey
  readonly primaryDimension: QuickAssessmentDimension | null
  readonly totalScore: number
  readonly maximumScore: 20
  readonly dimensionScores: Readonly<
    Record<QuickAssessmentDimension, QuickAssessmentDimensionScore>
  >
  readonly criticalFlags: readonly QuickAssessmentCriticalFlag[]
}

export type QuickAssessmentRecommendation = {
  readonly kind: "guide" | "conversation"
  readonly eyebrow: string
  readonly title: string
  readonly label: string
  readonly href: string
  readonly analyticsId: "assessment-relevant-guide" | "assessment-book-call"
}

export type QuickAssessmentResultContent = {
  readonly title: string
  readonly explanation: string
  readonly whatNow: string
  readonly firstTask: string
  readonly recommendation: QuickAssessmentRecommendation
}

export const quickAssessmentDimensions = {
  understanding: {
    label: "Razumijevanje i odnos prema cijeni",
    shortLabel: "Razumijevanje",
    description:
      "Možete li odluke temeljiti na monetarnoj ulozi Bitcoina, a ne samo na posljednjem rastu, padu ili cijeni koju ste propustili?",
    strength:
      "Razumijevanje monetarne uloge Bitcoina nije podređeno svakom tržišnom kretanju.",
  },
  financial: {
    label: "Osobne financije",
    shortLabel: "Financije",
    description:
      "Znate li kamo odlazi vaš novac, kako dugovi ograničavaju odluke i koju ulogu Bitcoin ima u ukupnoj imovini?",
    strength:
      "Proračun, dugovi i uloga Bitcoina u imovini imaju razmjerno jasan okvir.",
  },
  living: {
    label: "Život s Bitcoinom",
    shortLabel: "Pravila",
    description:
      "Imate li pravila prema kojima prihod pretvarate u Bitcoin, držite operativne eure i financirate stvarne troškove?",
    strength:
      "Kupnja, držanje, trošenje i obiteljski kontekst već imaju upotrebljiva pravila.",
  },
  security: {
    label: "Sigurnost i kontinuitet",
    shortLabel: "Sigurnost",
    description:
      "Je li Bitcoin sigurno pohranjen i postoji li razumljiv plan za osobu od povjerenja?",
    strength:
      "Pohrana i kontinuitet ne ovise samo o jednoj neprovjerenoj pretpostavci.",
  },
} as const satisfies Record<
  QuickAssessmentDimension,
  {
    label: string
    shortLabel: string
    description: string
    strength: string
  }
>

export const quickAssessmentQuestions = [
  {
    id: "understand-value",
    dimension: "understanding",
    prompt:
      "Razumijete li zašto Bitcoin ima vrijednost neovisno o kratkoročnoj cijeni?",
    answers: [
      {
        id: "explain",
        label: "Da, mogu to objasniti vlastitim riječima.",
        score: 2,
      },
      {
        id: "partly",
        label:
          "Djelomično, ali još se uglavnom oslanjam na cijenu i očekivanje rasta.",
        score: 1,
      },
      { id: "not-yet", label: "Ne još.", score: 0 },
    ],
  },
  {
    id: "budget",
    dimension: "financial",
    prompt: "Imate li proračun prema kojem znate koju namjenu ima vaš novac?",
    answers: [
      {
        id: "maintained",
        label: "Da, vodim ga i redovito ažuriram.",
        score: 2,
      },
      {
        id: "outline",
        label: "Imam okvir, ali još nije potpun ili dosljedan.",
        score: 1,
      },
      { id: "none", label: "Ne.", score: 0 },
    ],
  },
  {
    id: "debt",
    dimension: "financial",
    prompt: "Imate li dugove koji značajno utječu na vaše odluke?",
    answers: [
      { id: "none", label: "Nemam dugove.", score: 2 },
      {
        id: "planned",
        label:
          "Imam ih, ali jasno znam njihov iznos, uvjete i plan razduživanja.",
        score: 1,
      },
      {
        id: "unplanned",
        label: "Imam ih i još nemam cjelovit plan.",
        score: 0,
        criticalFlag: "unplanned_debt",
      },
    ],
  },
  {
    id: "net-worth-role",
    dimension: "financial",
    prompt: "Znate li koju ulogu Bitcoin treba imati u vašoj neto imovini?",
    answers: [
      {
        id: "clear",
        label:
          "Da, njegova je uloga jasna u odnosu na novac, nekretnine i ostalu imovinu.",
        score: 2,
      },
      {
        id: "partly",
        label: "Djelomično, ali još nemam jasna pravila.",
        score: 1,
      },
      { id: "none", label: "Ne.", score: 0 },
    ],
  },
  {
    id: "operating-rules",
    dimension: "living",
    prompt: "Imate li pravila prema kojima kupujete, držite i trošite Bitcoin?",
    answers: [
      {
        id: "applied",
        label: "Da, pravila su jasna i stvarno ih primjenjujem.",
        score: 2,
      },
      {
        id: "informal",
        label: "Imam neformalna pravila, ali nisu potpuna ili zapisana.",
        score: 1,
      },
      {
        id: "situational",
        label: "Ne, uglavnom odlučujem od slučaja do slučaja.",
        score: 0,
      },
    ],
  },
  {
    id: "family-included",
    dimension: "living",
    prompt: "Je li vaša obitelj uključena u odluke o Bitcoinu?",
    answers: [
      {
        id: "included",
        label: "Da, relevantne osobe razumiju što radimo i zašto.",
        score: 2,
      },
      {
        id: "partly",
        label: "Djelomično, znaju za Bitcoin, ali nisu potpuno uključene.",
        score: 1,
      },
      { id: "not-included", label: "Ne.", score: 0 },
      {
        id: "not-applicable",
        label: "Ovo se trenutačno ne odnosi na moju situaciju.",
        score: 2,
      },
    ],
  },
  {
    id: "continuity-plan",
    dimension: "security",
    prompt:
      "Znate li kako bi osoba od povjerenja pristupila vašem Bitcoinu bez vas?",
    answers: [
      {
        id: "verified",
        label: "Da, postupak je dokumentiran, razumljiv i provjeren.",
        score: 2,
      },
      {
        id: "basic",
        label:
          "Postoji osnovni plan, ali još nije potpuno dokumentiran ili provjeren.",
        score: 1,
      },
      {
        id: "none",
        label: "Ne.",
        score: 0,
        criticalFlag: "no_continuity_plan",
      },
    ],
  },
  {
    id: "exchange-custody",
    dimension: "security",
    prompt: "Čuvate li značajnu količinu Bitcoina na mjenjačnici?",
    helper: "Ne trebate navesti iznos ni naziv mjenjačnice.",
    answers: [
      { id: "no", label: "Ne.", score: 2 },
      {
        id: "temporary",
        label: "Da, privremeno i s jasnim razlogom i planom povlačenja.",
        score: 1,
      },
      {
        id: "without-plan",
        label: "Da, bez jasnog plana povlačenja.",
        score: 0,
        criticalFlag: "exchange_custody_without_plan",
      },
    ],
  },
  {
    id: "missed-price",
    dimension: "understanding",
    prompt: "Donosite li odluke prema cijeni Bitcoina koju ste propustili?",
    answers: [
      {
        id: "rules",
        label:
          "Ne, odluke temeljim na današnjoj situaciji i unaprijed određenim pravilima.",
        score: 2,
      },
      {
        id: "sometimes",
        label: "Ponekad me prošla cijena usmjerava.",
        score: 1,
      },
      {
        id: "anchored",
        label:
          "Da, čekam povratak stare cijene ili pokušavam naglo nadoknaditi propušteno.",
        score: 0,
      },
    ],
  },
  {
    id: "drawdown-plan",
    dimension: "understanding",
    prompt: "Biste li znali što napraviti ako cijena Bitcoina padne 70 posto?",
    answers: [
      {
        id: "clear",
        label:
          "Da, imam unaprijed određena pravila i takav pad ne bi promijenio osnovni sustav.",
        score: 2,
      },
      {
        id: "likely",
        label: "Vjerojatno, ali pravila nisu dovoljno jasna ili zapisana.",
        score: 1,
      },
      {
        id: "reactive",
        label: "Ne, odluku bih donosio tek tada.",
        score: 0,
      },
    ],
  },
] as const satisfies readonly QuickAssessmentQuestion[]

export const quickAssessmentResultContent = {
  understanding: {
    title: "Najprije učvrstite razumijevanje Bitcoina",
    explanation:
      "Vaše odluke još su previše povezane s trenutačnom ili propuštenom cijenom. Prvi korak nije nužno kupiti više Bitcoina, nego dovoljno jasno razumjeti njegovu monetarnu ulogu da odluke ne ovise o svakom tržišnom kretanju.",
    whatNow:
      "Odvojite pitanje vrijednosti Bitcoina od pitanja njegove današnje cijene. Tek tada pravila mogu ostati stabilna i kada se tržište naglo promijeni.",
    firstTask:
      "Vlastitim riječima zapišite zašto Bitcoin za vas ima vrijednost čak i kada mu cijena kratkoročno pada.",
    recommendation: {
      kind: "guide",
      eyebrow: "Preporučeni vodič",
      title: "Niste zakasnili u Bitcoin",
      label: "Pročitajte vodič",
      href: guideHref("niste-zakasnili-u-bitcoin"),
      analyticsId: "assessment-relevant-guide",
    },
  },
  financial: {
    title: "Najprije uredite financijsku osnovu",
    explanation:
      "Bez jasnog proračuna, odnosa prema dugovima i pregleda neto imovine teško je odrediti razumnu ulogu Bitcoina. Prvi korak zato nije izolirana odluka o kupnji, nego uređenje novca iz kojeg odluka polazi.",
    whatNow:
      "Proračun, dug i neto imovina trebaju biti vidljivi u jednoj slici. Ne trebate odrediti preporučeni postotak Bitcoina, nego svrhu svake važne stavke.",
    firstTask:
      "Zapišite sve mjesečne obveze, dugove i glavne dijelove neto imovine na jednom mjestu.",
    recommendation: {
      kind: "guide",
      eyebrow: "Preporučeni vodič",
      title: "Svaki euro ima namjenu",
      label: "Uredite financijsku osnovu",
      href: guideHref("svaki-euro-ima-namjenu"),
      analyticsId: "assessment-relevant-guide",
    },
  },
  living: {
    title: "Pretvorite Bitcoin iz pozicije u sustav",
    explanation:
      "Bitcoin već ima mjesto u vašem životu, ali kupnja, držanje i trošenje još nemaju dovoljno jasna pravila. Cilj nije nikada ne prodati Bitcoin, nego znati kako iz njega financirate stvarni život i prema kojim pravilima mijenjate odluke.",
    whatNow:
      "Povežite prihod, operativne eure, Bitcoin i stvarne troškove u mali skup pravila koja možete primjenjivati bez improvizacije.",
    firstTask:
      "Zapišite tri pravila prema kojima ćete tijekom sljedećih 30 dana pretvarati prihod u Bitcoin i financirati troškove.",
    recommendation: {
      kind: "guide",
      eyebrow: "Preporučeni vodič",
      title: "Bitcoin je novac",
      label: "Povežite Bitcoin sa stvarnim životom",
      href: guideHref("bitcoin-kao-novac"),
      analyticsId: "assessment-relevant-guide",
    },
  },
  security: {
    title: "Uredite sigurnost i kontinuitet",
    explanation:
      "Vrijednost Bitcoina nije dovoljna ako pristup ovisi samo o vašem pamćenju, jednom uređaju ili računu na mjenjačnici. Prvi korak je provjeriti kako je Bitcoin zaštićen i kako bi osoba od povjerenja nastavila postupak bez vas.",
    whatNow:
      "Sigurnost treba uključiti i normalan pristup i oporavak. Upute moraju biti razumljive osobi od povjerenja bez otkrivanja tajni na internetu.",
    firstTask:
      "Bez učitavanja Bitcoin Core wallet backup datoteka ili zapisivanja privatnih ključeva, wallet passphraseova i početnih riječi drugih walleta na internet, opišite kako osoba od povjerenja pronalazi vaše sigurnosne upute.",
    recommendation: {
      kind: "guide",
      eyebrow: "Preporučeni vodič",
      title: "Bitcoin Core Standard za dugoročnu štednju",
      label: "Uredite sigurnost i kontinuitet",
      href: guideHref("bitcoin-core-standard"),
      analyticsId: "assessment-relevant-guide",
    },
  },
  ready: {
    title: "Spremni ste povezati sve u osobni Bitcoin standard",
    explanation:
      "Već imate dobru osnovu u razumijevanju, osobnim financijama, pravilima korištenja i sigurnosti. Sljedeći korak nije još jedan nepovezani savjet, nego provjera djeluju li svi dijelovi zajedno kao jedan održiv osobni i obiteljski sustav.",
    whatNow:
      "Povežite pravila koja već imate i provjerite jesu li razumljiva izvan vaše glave, provediva u stresu i usklađena s ljudima kojih se tiču.",
    firstTask:
      "Odaberite jedno pravilo koje još postoji samo u vašoj glavi i zapišite ga tako da ga može razumjeti i druga osoba.",
    recommendation: {
      kind: "conversation",
      eyebrow: "Mogući sljedeći korak",
      title: "Provjerite djeluju li svi dijelovi kao jedan sustav",
      label: "Dogovorite uvodni razgovor",
      href: CONVERSATION_PATH,
      analyticsId: "assessment-book-call",
    },
  },
} as const satisfies Record<
  QuickAssessmentResultKey,
  QuickAssessmentResultContent
>

const selectionPriority: readonly QuickAssessmentDimension[] = [
  "security",
  "financial",
  "living",
  "understanding",
]

function selectedOption(
  question: QuickAssessmentQuestion,
  answers: QuickAssessmentAnswers
) {
  const selectedId = answers[question.id]
  const option = question.answers.find(({ id }) => id === selectedId)

  if (!option) {
    throw new Error(`Nedostaje valjan odgovor za pitanje ${question.id}.`)
  }

  return option
}

export function isQuickAssessmentComplete(answers: QuickAssessmentAnswers) {
  return quickAssessmentQuestions.every((question) =>
    question.answers.some(({ id }) => id === answers[question.id])
  )
}

export function scoreQuickAssessment(
  answers: QuickAssessmentAnswers
): QuickAssessmentResult {
  const totals: Record<QuickAssessmentDimension, number> = {
    understanding: 0,
    financial: 0,
    living: 0,
    security: 0,
  }
  const maximums: Record<QuickAssessmentDimension, number> = {
    understanding: 0,
    financial: 0,
    living: 0,
    security: 0,
  }
  const criticalFlags = new Set<QuickAssessmentCriticalFlag>()

  for (const question of quickAssessmentQuestions) {
    const option = selectedOption(question, answers)

    totals[question.dimension] += option.score
    maximums[question.dimension] += 2

    if (option.criticalFlag) {
      criticalFlags.add(option.criticalFlag)
    }
  }

  const dimensionScores = Object.fromEntries(
    QUICK_ASSESSMENT_DIMENSION_IDS.map((dimension) => [
      dimension,
      {
        score: totals[dimension],
        maximumScore: maximums[dimension],
        normalizedScore: totals[dimension] / maximums[dimension],
      },
    ])
  ) as Record<QuickAssessmentDimension, QuickAssessmentDimensionScore>
  const totalScore = Object.values(totals).reduce(
    (total, score) => total + score,
    0
  )
  const criticalFlagList = Array.from(criticalFlags)
  const ready =
    totalScore >= 16 &&
    criticalFlagList.length === 0 &&
    QUICK_ASSESSMENT_DIMENSION_IDS.every(
      (dimension) => dimensionScores[dimension].normalizedScore >= 0.75
    )

  if (ready) {
    return {
      key: "ready",
      primaryDimension: null,
      totalScore,
      maximumScore: 20,
      dimensionScores,
      criticalFlags: criticalFlagList,
    }
  }

  let primaryDimension: QuickAssessmentDimension

  if (
    criticalFlags.has("no_continuity_plan") ||
    criticalFlags.has("exchange_custody_without_plan")
  ) {
    primaryDimension = "security"
  } else if (criticalFlags.has("unplanned_debt")) {
    primaryDimension = "financial"
  } else {
    primaryDimension = selectionPriority.reduce((lowest, dimension) =>
      dimensionScores[dimension].normalizedScore <
      dimensionScores[lowest].normalizedScore
        ? dimension
        : lowest
    )
  }

  return {
    key: primaryDimension,
    primaryDimension,
    totalScore,
    maximumScore: 20,
    dimensionScores,
    criticalFlags: criticalFlagList,
  }
}
