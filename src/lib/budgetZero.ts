export const MAX_MONEY_EUROS = 999_999_999
export const MAX_ACCOUNTS = 20
export const MAX_CUSTOM_CATEGORIES = 30
export const MAX_LABEL_LENGTH = 60
export const MAX_FREE_TEXT_LENGTH = 300

export const budgetAreaIds = [
  "monthly-expenses",
  "debt",
  "future-obligations",
  "reserve",
  "giving",
  "bitcoin-savings",
  "other",
] as const

export type BudgetAreaId = (typeof budgetAreaIds)[number]

export interface BudgetArea {
  readonly id: BudgetAreaId
  readonly label: string
  readonly description: string
}

export interface MoneyAccount {
  readonly id: string
  readonly label: string
  readonly balanceEuros: number
}

export type BudgetCategorySource = "predefined" | "custom"

export interface BudgetCategory {
  readonly id: string
  readonly areaId: BudgetAreaId
  readonly label: string
  readonly source: BudgetCategorySource
  readonly assignedEuros: number
}

export type StressResponseId =
  | `category:${string}`
  | "use-existing-reserve"
  | "additional-income"
  | "other-response"
  | "not-sure"

export type BudgetZeroStep =
  | "accounts"
  | "allocation"
  | "stress"
  | "rule"
  | "result"

export interface BudgetZeroDraftV1 {
  readonly schemaVersion: 1
  readonly currency: "EUR"
  readonly accounts: readonly MoneyAccount[]
  readonly categories: readonly BudgetCategory[]
  readonly expectedMonthlyIncomeEuros: number | null
  readonly financialRevision: number
  readonly stress: {
    readonly incomeFactorPercent: 80
    readonly responseIds: readonly StressResponseId[]
    readonly otherNote: string
    readonly reviewedFinancialRevision: number | null
  }
  readonly personalRule: string
  readonly currentStep: BudgetZeroStep
  readonly createdAt: string
  readonly updatedAt: string
}

export const budgetAreas = [
  {
    id: "monthly-expenses",
    label: "Redovni mjesečni troškovi",
    description: "Troškovi koji se redovito ponavljaju iz mjeseca u mjesec.",
  },
  {
    id: "debt",
    label: "Otplata duga",
    description: "Novac namijenjen minimalnim ratama ili dodatnoj otplati.",
  },
  {
    id: "future-obligations",
    label: "Buduće i neredovite obveze",
    description: "Poznati troškovi koji ne dolaze svakog mjeseca.",
  },
  {
    id: "reserve",
    label: "Pričuva",
    description: "Novac odvojen za neočekivane događaje i sigurnost.",
  },
  {
    id: "giving",
    label: "Davanje",
    description: "Novac koji ste unaprijed odlučili dati drugima.",
  },
  {
    id: "bitcoin-savings",
    label: "Štednja u Bitcoinu",
    description: "Dio novca koji ste odlučili dugoročno štedjeti u Bitcoinu.",
  },
  {
    id: "other",
    label: "Ostalo",
    description: "Namjene koje ne pripadaju drugim područjima.",
  },
] as const satisfies readonly BudgetArea[]

type PredefinedCategoryDefinition = Omit<BudgetCategory, "assignedEuros">

export const predefinedBudgetCategories = [
  {
    id: "monthly-expenses:housing",
    areaId: "monthly-expenses",
    label: "Stanovanje",
    source: "predefined",
  },
  {
    id: "monthly-expenses:utilities-communications",
    areaId: "monthly-expenses",
    label: "Režije i komunikacije",
    source: "predefined",
  },
  {
    id: "monthly-expenses:food-household",
    areaId: "monthly-expenses",
    label: "Hrana i kućanstvo",
    source: "predefined",
  },
  {
    id: "monthly-expenses:transport",
    areaId: "monthly-expenses",
    label: "Prijevoz",
    source: "predefined",
  },
  {
    id: "monthly-expenses:health-insurance",
    areaId: "monthly-expenses",
    label: "Zdravlje i osiguranje",
    source: "predefined",
  },
  {
    id: "monthly-expenses:family-education",
    areaId: "monthly-expenses",
    label: "Obitelj i obrazovanje",
    source: "predefined",
  },
  {
    id: "debt:minimum-payments",
    areaId: "debt",
    label: "Minimalne rate",
    source: "predefined",
  },
  {
    id: "debt:additional-payment",
    areaId: "debt",
    label: "Dodatna otplata",
    source: "predefined",
  },
  {
    id: "future-obligations:taxes-fees",
    areaId: "future-obligations",
    label: "Porezi i pristojbe",
    source: "predefined",
  },
  {
    id: "future-obligations:registration-service",
    areaId: "future-obligations",
    label: "Registracija i servis",
    source: "predefined",
  },
  {
    id: "future-obligations:annual-premiums",
    areaId: "future-obligations",
    label: "Godišnje premije",
    source: "predefined",
  },
  {
    id: "future-obligations:repairs-maintenance",
    areaId: "future-obligations",
    label: "Popravci i održavanje",
    source: "predefined",
  },
  {
    id: "future-obligations:travel-celebrations",
    areaId: "future-obligations",
    label: "Putovanja i proslave",
    source: "predefined",
  },
  {
    id: "reserve:safety-reserve",
    areaId: "reserve",
    label: "Sigurnosna pričuva",
    source: "predefined",
  },
  {
    id: "giving:giving",
    areaId: "giving",
    label: "Davanje",
    source: "predefined",
  },
  {
    id: "bitcoin-savings:bitcoin-savings",
    areaId: "bitcoin-savings",
    label: "Štednja u Bitcoinu",
    source: "predefined",
  },
  {
    id: "other:other",
    areaId: "other",
    label: "Ostalo",
    source: "predefined",
  },
] as const satisfies readonly PredefinedCategoryDefinition[]

export function createInitialBudgetCategories(): BudgetCategory[] {
  return predefinedBudgetCategories.map((category) => ({
    ...category,
    assignedEuros: 0,
  }))
}

const euroFormatter = new Intl.NumberFormat("hr-HR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

function isGroupedInteger(value: string, separator: "." | " "): boolean {
  const escapedSeparator = separator === "." ? "\\." : " "
  return new RegExp(`^(?:0|[1-9]\\d{0,2})(?:${escapedSeparator}\\d{3})+$`).test(
    value
  )
}

function normalizeIntegerPart(value: string): string | null {
  if (/^\d+$/.test(value)) {
    return value
  }

  if (isGroupedInteger(value, ".")) {
    return value.replaceAll(".", "")
  }

  if (isGroupedInteger(value, " ")) {
    return value.replaceAll(" ", "")
  }

  return null
}

function parseNormalizedEuros(value: string): number | null {
  const normalizedInteger = normalizeIntegerPart(value)

  if (normalizedInteger === null) {
    return null
  }

  const euros = Number(normalizedInteger)

  if (!Number.isSafeInteger(euros) || euros > MAX_MONEY_EUROS) {
    return null
  }

  return euros
}

/**
 * Parsira cijele eure s neobaveznim hrvatskim grupiranjem tisućica. Decimalni
 * zapis namjerno se odbija jer modul raspoređuje samo cijele eure.
 */
export function parseEuroToEuros(value: string): number | null {
  const input = value.trim().replaceAll("\u00a0", " ")

  if (input.length === 0 || !/^[\d. ]+$/.test(input)) {
    return null
  }

  return parseNormalizedEuros(input)
}

export function formatEuroFromEuros(euros: number): string {
  assertNonNegativeSafeInteger(euros, "Iznos")
  return euroFormatter.format(euros)
}

function assertNonNegativeSafeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`${label} mora biti valjan iznos u cijelim eurima.`)
  }
}

function assertMoneyInputEuros(value: number, label: string): void {
  assertNonNegativeSafeInteger(value, label)

  if (value > MAX_MONEY_EUROS) {
    throw new RangeError(`${label} prelazi najveći dopušteni iznos.`)
  }
}

function safeMoneySum(values: readonly number[], label: string): number {
  const total = values.reduce((sum, value) => {
    assertNonNegativeSafeInteger(value, label)
    const nextTotal = sum + value

    if (!Number.isSafeInteger(nextTotal)) {
      throw new RangeError(`${label} prelazi siguran raspon izračuna.`)
    }

    return nextTotal
  }, 0)

  return total
}

export function calculateAvailableFunds(
  accounts: readonly Pick<MoneyAccount, "balanceEuros">[]
): number {
  for (const account of accounts) {
    assertMoneyInputEuros(account.balanceEuros, "Stanje računa")
  }

  return safeMoneySum(
    accounts.map(({ balanceEuros }) => balanceEuros),
    "Stanje računa"
  )
}

export type AssignmentStatus = "remaining" | "balanced" | "over-assigned"

export interface AssignmentSummary {
  readonly availableEuros: number
  readonly assignedEuros: number
  readonly differenceEuros: number
  readonly remainingEuros: number
  readonly overAssignedEuros: number
  readonly status: AssignmentStatus
  readonly areaTotalsEuros: Readonly<Record<BudgetAreaId, number>>
}

export function calculateAssignments(
  availableEuros: number,
  categories: readonly Pick<BudgetCategory, "areaId" | "assignedEuros">[]
): AssignmentSummary {
  assertNonNegativeSafeInteger(availableEuros, "Ukupno za namijeniti")

  const areaTotalsEuros: Record<BudgetAreaId, number> = {
    "monthly-expenses": 0,
    debt: 0,
    "future-obligations": 0,
    reserve: 0,
    giving: 0,
    "bitcoin-savings": 0,
    other: 0,
  }

  for (const category of categories) {
    if (!isBudgetAreaId(category.areaId)) {
      throw new Error(`Nepoznato područje namjene: ${String(category.areaId)}.`)
    }

    assertMoneyInputEuros(category.assignedEuros, "Namijenjeni iznos")
    const nextAreaTotal =
      areaTotalsEuros[category.areaId] + category.assignedEuros

    if (!Number.isSafeInteger(nextAreaTotal)) {
      throw new RangeError(
        "Ukupno namijenjeno prelazi siguran raspon izračuna."
      )
    }

    areaTotalsEuros[category.areaId] = nextAreaTotal
  }

  const assignedEuros = safeMoneySum(
    Object.values(areaTotalsEuros),
    "Ukupno namijenjeno"
  )
  const differenceEuros = availableEuros - assignedEuros

  return {
    availableEuros,
    assignedEuros,
    differenceEuros,
    remainingEuros: Math.max(0, differenceEuros),
    overAssignedEuros: Math.max(0, -differenceEuros),
    status:
      differenceEuros > 0
        ? "remaining"
        : differenceEuros < 0
          ? "over-assigned"
          : "balanced",
    areaTotalsEuros,
  }
}

export interface StressScenario {
  readonly expectedIncomeEuros: number
  readonly stressIncomeEuros: number
  readonly incomeReductionEuros: number
  readonly incomeFactorPercent: number
}

export function calculateStressScenario(
  expectedIncomeEuros: number,
  incomeFactorPercent = 80
): StressScenario {
  assertMoneyInputEuros(expectedIncomeEuros, "Očekivani mjesečni prihod")

  if (
    !Number.isInteger(incomeFactorPercent) ||
    incomeFactorPercent < 0 ||
    incomeFactorPercent > 100
  ) {
    throw new RangeError("Faktor stresnog prihoda mora biti između 0 i 100.")
  }

  const stressIncomeEuros = Math.round(
    (expectedIncomeEuros * incomeFactorPercent) / 100
  )

  return {
    expectedIncomeEuros,
    stressIncomeEuros,
    incomeReductionEuros: expectedIncomeEuros - stressIncomeEuros,
    incomeFactorPercent,
  }
}

export function calculateAreaPercent(
  areaTotalEuros: number,
  availableEuros: number
): number {
  assertNonNegativeSafeInteger(areaTotalEuros, "Zbroj područja")
  assertNonNegativeSafeInteger(availableEuros, "Ukupno za namijeniti")

  if (availableEuros === 0) {
    return 0
  }

  return Math.round((areaTotalEuros / availableEuros) * 1_000) / 10
}

export function isBudgetPlanComplete(draft: BudgetZeroDraftV1): boolean {
  if (!validateBudgetZeroDraft(draft) || draft.accounts.length === 0) {
    return false
  }

  const availableEuros = calculateAvailableFunds(draft.accounts)

  return (
    availableEuros > 0 &&
    calculateAssignments(availableEuros, draft.categories).status === "balanced"
  )
}

export function isStressReviewCurrent(draft: BudgetZeroDraftV1): boolean {
  return (
    draft.expectedMonthlyIncomeEuros !== null &&
    draft.expectedMonthlyIncomeEuros > 0 &&
    draft.stress.responseIds.length > 0 &&
    draft.stress.reviewedFinancialRevision === draft.financialRevision
  )
}

export function isBudgetZeroComplete(draft: BudgetZeroDraftV1): boolean {
  return (
    isBudgetPlanComplete(draft) &&
    isStressReviewCurrent(draft) &&
    draft.personalRule.trim().length > 0
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isBudgetAreaId(value: unknown): value is BudgetAreaId {
  return (
    typeof value === "string" &&
    (budgetAreaIds as readonly string[]).includes(value)
  )
}

function isValidId(value: unknown): value is string {
  return (
    typeof value === "string" && value.trim().length > 0 && value.length <= 120
  )
}

function isValidLabel(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value === value.trim() &&
    value.length >= 1 &&
    value.length <= MAX_LABEL_LENGTH
  )
}

function isValidMoneyEuros(value: unknown, allowZero = true): value is number {
  return (
    typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value >= (allowZero ? 0 : 1) &&
    value <= MAX_MONEY_EUROS
  )
}

function hasUniqueValues(values: readonly string[]): boolean {
  return new Set(values).size === values.length
}

function normalizeComparableLabel(value: string): string {
  return value.toLocaleLowerCase("hr-HR")
}

function isValidAccount(value: unknown): value is MoneyAccount {
  return (
    isRecord(value) &&
    isValidId(value.id) &&
    isValidLabel(value.label) &&
    isValidMoneyEuros(value.balanceEuros)
  )
}

function isValidCategory(value: unknown): value is BudgetCategory {
  return (
    isRecord(value) &&
    isValidId(value.id) &&
    isBudgetAreaId(value.areaId) &&
    isValidLabel(value.label) &&
    (value.source === "predefined" || value.source === "custom") &&
    isValidMoneyEuros(value.assignedEuros)
  )
}

function hasValidPredefinedCategories(
  categories: readonly BudgetCategory[]
): boolean {
  return predefinedBudgetCategories.every((definition) => {
    const matches = categories.filter(({ id }) => id === definition.id)
    const match = matches[0]

    return (
      matches.length === 1 &&
      match?.areaId === definition.areaId &&
      match.label === definition.label &&
      match.source === "predefined"
    )
  })
}

function hasValidCustomCategoryLabels(
  categories: readonly BudgetCategory[]
): boolean {
  for (const areaId of budgetAreaIds) {
    const labels = categories
      .filter(
        (category) => category.areaId === areaId && category.source === "custom"
      )
      .map(({ label }) => normalizeComparableLabel(label))

    if (!hasUniqueValues(labels)) {
      return false
    }
  }

  return true
}

function isValidStressResponseId(
  value: unknown,
  categoryIds: ReadonlySet<string>
): value is StressResponseId {
  if (
    value === "use-existing-reserve" ||
    value === "additional-income" ||
    value === "other-response" ||
    value === "not-sure"
  ) {
    return true
  }

  return (
    typeof value === "string" &&
    value.startsWith("category:") &&
    categoryIds.has(value.slice("category:".length))
  )
}

function isValidIsoDate(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    Number.isFinite(Date.parse(value))
  )
}

export function validateBudgetZeroDraft(
  value: unknown
): value is BudgetZeroDraftV1 {
  if (
    !isRecord(value) ||
    value.schemaVersion !== 1 ||
    value.currency !== "EUR" ||
    !Array.isArray(value.accounts) ||
    value.accounts.length > MAX_ACCOUNTS ||
    !value.accounts.every(isValidAccount) ||
    !Array.isArray(value.categories) ||
    !value.categories.every(isValidCategory)
  ) {
    return false
  }

  const accounts = value.accounts
  const categories = value.categories
  const accountIds = accounts.map(({ id }) => id)
  const accountLabels = accounts.map(({ label }) =>
    normalizeComparableLabel(label)
  )
  const categoryIds = categories.map(({ id }) => id)
  const customCategories = categories.filter(
    ({ source }) => source === "custom"
  )
  const unexpectedPredefinedCategory = categories.some(
    ({ id, source }) =>
      source === "predefined" &&
      !predefinedBudgetCategories.some((definition) => definition.id === id)
  )

  if (
    !hasUniqueValues(accountIds) ||
    !hasUniqueValues(accountLabels) ||
    !hasUniqueValues(categoryIds) ||
    customCategories.length > MAX_CUSTOM_CATEGORIES ||
    unexpectedPredefinedCategory ||
    !hasValidPredefinedCategories(categories) ||
    !hasValidCustomCategoryLabels(categories)
  ) {
    return false
  }

  if (
    value.expectedMonthlyIncomeEuros !== null &&
    !isValidMoneyEuros(value.expectedMonthlyIncomeEuros, false)
  ) {
    return false
  }

  const financialRevision = value.financialRevision
  const stress = value.stress

  if (
    typeof financialRevision !== "number" ||
    !Number.isSafeInteger(financialRevision) ||
    financialRevision < 0 ||
    !isRecord(stress)
  ) {
    return false
  }

  const reviewedFinancialRevision = stress.reviewedFinancialRevision

  if (
    stress.incomeFactorPercent !== 80 ||
    !Array.isArray(stress.responseIds) ||
    !hasUniqueValues(stress.responseIds as string[]) ||
    !stress.responseIds.every((responseId) =>
      isValidStressResponseId(responseId, new Set(categoryIds))
    ) ||
    (stress.responseIds.includes("not-sure") &&
      stress.responseIds.length !== 1) ||
    typeof stress.otherNote !== "string" ||
    stress.otherNote.length > MAX_FREE_TEXT_LENGTH ||
    (reviewedFinancialRevision !== null &&
      (typeof reviewedFinancialRevision !== "number" ||
        !Number.isSafeInteger(reviewedFinancialRevision) ||
        reviewedFinancialRevision < 0 ||
        reviewedFinancialRevision > financialRevision))
  ) {
    return false
  }

  if (
    typeof value.personalRule !== "string" ||
    value.personalRule.length > MAX_FREE_TEXT_LENGTH ||
    !["accounts", "allocation", "stress", "rule", "result"].includes(
      value.currentStep as string
    ) ||
    !isValidIsoDate(value.createdAt) ||
    !isValidIsoDate(value.updatedAt)
  ) {
    return false
  }

  return true
}
