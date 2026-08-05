/// <reference types="node" />

import { deepStrictEqual, equal, match, throws } from "node:assert/strict"
import { test } from "node:test"

import {
  MAX_MONEY_EUROS,
  budgetAreaIds,
  budgetAreas,
  calculateAreaPercent,
  calculateAssignments,
  calculateAvailableFunds,
  calculateStressScenario,
  createInitialBudgetCategories,
  formatEuroFromEuros,
  isBudgetPlanComplete,
  isBudgetZeroComplete,
  isStressReviewCurrent,
  parseEuroToEuros,
  predefinedBudgetCategories,
  validateBudgetZeroDraft,
  type BudgetCategory,
  type BudgetZeroDraftV1,
} from "./budgetZero.ts"

function createValidDraft(
  overrides: Partial<BudgetZeroDraftV1> = {}
): BudgetZeroDraftV1 {
  const categories = createInitialBudgetCategories().map((category, index) =>
    index === 0 ? { ...category, assignedEuros: 100 } : category
  )

  return {
    schemaVersion: 1,
    currency: "EUR",
    accounts: [{ id: "account-1", label: "Gotovina", balanceEuros: 100 }],
    categories,
    expectedMonthlyIncomeEuros: 2_500,
    financialRevision: 3,
    stress: {
      incomeFactorPercent: 80,
      responseIds: [`category:${categories[0]?.id}`],
      otherNote: "",
      reviewedFinancialRevision: 3,
    },
    personalRule: "su sve poznate obveze pokrivene.",
    currentStep: "result",
    createdAt: "2026-07-17T08:00:00.000Z",
    updatedAt: "2026-07-17T08:05:00.000Z",
    ...overrides,
  }
}

test("definira svih sedam područja i sve početne kategorije iz specifikacije", () => {
  deepStrictEqual(
    budgetAreas.map(({ id }) => id),
    budgetAreaIds
  )
  deepStrictEqual(
    predefinedBudgetCategories
      .filter(({ areaId }) => areaId === "monthly-expenses")
      .map(({ label }) => label),
    [
      "Stanovanje",
      "Režije i komunikacije",
      "Hrana i kućanstvo",
      "Prijevoz",
      "Zdravlje i osiguranje",
      "Obitelj i obrazovanje",
    ]
  )
  deepStrictEqual(
    predefinedBudgetCategories
      .filter(({ areaId }) => areaId === "debt")
      .map(({ label }) => label),
    ["Minimalne rate", "Dodatna otplata"]
  )
  equal(createInitialBudgetCategories().length, 17)
  equal(
    createInitialBudgetCategories().every(
      ({ source, assignedEuros }) =>
        source === "predefined" && assignedEuros === 0
    ),
    true
  )
})

test("parsira cijele eure s hrvatskim grupiranjem tisućica", () => {
  const cases: ReadonlyArray<readonly [string, number]> = [
    ["0", 0],
    ["12", 12],
    ["2500", 2_500],
    ["2.500", 2_500],
    ["2 500", 2_500],
    ["1.000.000", 1_000_000],
    ["\u00a02.500\u00a0", 2_500],
  ]

  for (const [input, expectedEuros] of cases) {
    equal(parseEuroToEuros(input), expectedEuros, input)
  }
})

test("odbija decimale, negativne i nepravilno grupirane EUR zapise", () => {
  const invalidInputs = [
    "",
    "   ",
    "-1",
    "+1",
    "1,",
    ",50",
    "0,00",
    "0,01",
    "12,3",
    "1,234",
    "2500,50",
    "2.500,00",
    "2500.50",
    "2 500.50",
    "1.00,50",
    "1,000.50",
    "25.00.00",
    "25 00,00",
    "2 500 00",
    "1e3",
    "EUR 10",
    "10 €",
  ]

  for (const input of invalidInputs) {
    equal(parseEuroToEuros(input), null, input)
  }

  equal(parseEuroToEuros("999.999.999"), MAX_MONEY_EUROS)
  equal(parseEuroToEuros("1.000.000.000"), null)
})

test("formatira cijele eure bez decimalnih mjesta", () => {
  const formatted = formatEuroFromEuros(7_100)

  match(formatted, /^7\.100/)
  equal(formatted.includes(","), false)
  match(formatted, /€$/)
  throws(() => formatEuroFromEuros(-1), RangeError)
  throws(() => formatEuroFromEuros(1.5), RangeError)
})

test("zbraja više računa bez povezivanja računa s kategorijama", () => {
  equal(
    calculateAvailableFunds([
      { balanceEuros: 100 },
      { balanceEuros: 2_000 },
      { balanceEuros: 5_000 },
      { balanceEuros: 0 },
    ]),
    7_100
  )
  equal(calculateAvailableFunds([]), 0)
  equal(
    calculateAvailableFunds([
      { balanceEuros: MAX_MONEY_EUROS },
      { balanceEuros: MAX_MONEY_EUROS },
    ]),
    MAX_MONEY_EUROS * 2
  )
  throws(
    () => calculateAvailableFunds([{ balanceEuros: MAX_MONEY_EUROS + 1 }]),
    RangeError
  )
})

test("izračun namjena razlikuje preostalo, nulu i preveliku namjenu", () => {
  const categories: BudgetCategory[] = [
    {
      id: "housing",
      areaId: "monthly-expenses",
      label: "Stanovanje",
      source: "custom",
      assignedEuros: 500,
    },
  ]

  deepStrictEqual(calculateAssignments(1_000, categories), {
    availableEuros: 1_000,
    assignedEuros: 500,
    differenceEuros: 500,
    remainingEuros: 500,
    overAssignedEuros: 0,
    status: "remaining",
    areaTotalsEuros: {
      "monthly-expenses": 500,
      debt: 0,
      "future-obligations": 0,
      reserve: 0,
      giving: 0,
      "bitcoin-savings": 0,
      other: 0,
    },
  })

  categories[0] = { ...categories[0], assignedEuros: 1_000 }
  const balanced = calculateAssignments(1_000, categories)
  equal(balanced.status, "balanced")
  equal(balanced.remainingEuros, 0)
  equal(balanced.overAssignedEuros, 0)

  categories[0] = { ...categories[0], assignedEuros: 1_200 }
  const overAssigned = calculateAssignments(1_000, categories)
  equal(overAssigned.status, "over-assigned")
  equal(overAssigned.differenceEuros, -200)
  equal(overAssigned.remainingEuros, 0)
  equal(overAssigned.overAssignedEuros, 200)
})

test("računa postotke područja samo za prikaz", () => {
  equal(calculateAreaPercent(333, 1_000), 33.3)
  equal(calculateAreaPercent(0, 0), 0)
})

test("stresni scenarij koristi 80 posto i zaokružuje na najbliži cijeli euro", () => {
  deepStrictEqual(calculateStressScenario(2_500), {
    expectedIncomeEuros: 2_500,
    stressIncomeEuros: 2_000,
    incomeReductionEuros: 500,
    incomeFactorPercent: 80,
  })
  deepStrictEqual(calculateStressScenario(1), {
    expectedIncomeEuros: 1,
    stressIncomeEuros: 1,
    incomeReductionEuros: 0,
    incomeFactorPercent: 80,
  })
  deepStrictEqual(calculateStressScenario(2), {
    expectedIncomeEuros: 2,
    stressIncomeEuros: 2,
    incomeReductionEuros: 0,
    incomeFactorPercent: 80,
  })
  deepStrictEqual(calculateStressScenario(3), {
    expectedIncomeEuros: 3,
    stressIncomeEuros: 2,
    incomeReductionEuros: 1,
    incomeFactorPercent: 80,
  })
  deepStrictEqual(calculateStressScenario(8), {
    expectedIncomeEuros: 8,
    stressIncomeEuros: 6,
    incomeReductionEuros: 2,
    incomeFactorPercent: 80,
  })
  throws(() => calculateStressScenario(-1), RangeError)
  throws(() => calculateStressScenario(100, 101), RangeError)
})

test("prepoznaje valjan verzionirani nacrt i dovršen cijeli modul", () => {
  const draft = createValidDraft()

  equal(validateBudgetZeroDraft(draft), true)
  equal(isBudgetPlanComplete(draft), true)
  equal(isStressReviewCurrent(draft), true)
  equal(isBudgetZeroComplete(draft), true)
})

test("dovršenost traži pozitivan zbroj, točnu nulu, aktualan stres i pravilo", () => {
  const draft = createValidDraft()

  equal(
    isBudgetPlanComplete(
      createValidDraft({
        categories: createInitialBudgetCategories(),
      })
    ),
    false
  )
  equal(
    isBudgetPlanComplete(
      createValidDraft({
        accounts: [{ id: "zero", label: "Gotovina", balanceEuros: 0 }],
        categories: createInitialBudgetCategories(),
      })
    ),
    false
  )
  equal(
    isStressReviewCurrent({
      ...draft,
      financialRevision: 4,
    }),
    false
  )
  equal(isBudgetZeroComplete({ ...draft, personalRule: "  " }), false)
})

test("validator odbija oštećene tipove, duplikate i nepoznatu verziju", () => {
  const validDraft = createValidDraft()
  const firstCategory = validDraft.categories[0]

  equal(validateBudgetZeroDraft(null), false)
  equal(validateBudgetZeroDraft({}), false)
  equal(validateBudgetZeroDraft({ ...validDraft, schemaVersion: 2 }), false)
  equal(
    validateBudgetZeroDraft({
      ...validDraft,
      accounts: [
        ...validDraft.accounts,
        { id: "account-2", label: "gotovina", balanceEuros: 20 },
      ],
    }),
    false
  )
  equal(
    validateBudgetZeroDraft({
      ...validDraft,
      categories: validDraft.categories.filter(
        ({ id }) => id !== firstCategory?.id
      ),
    }),
    false
  )
  equal(
    validateBudgetZeroDraft({
      ...validDraft,
      categories: [
        ...validDraft.categories,
        {
          id: "custom-1",
          areaId: "other",
          label: "Hobi",
          source: "custom",
          assignedEuros: 0,
        },
        {
          id: "custom-2",
          areaId: "other",
          label: "hobi",
          source: "custom",
          assignedEuros: 0,
        },
      ],
    }),
    false
  )
  equal(
    validateBudgetZeroDraft({
      ...validDraft,
      stress: {
        ...validDraft.stress,
        responseIds: ["not-sure", "additional-income"],
      },
    }),
    false
  )
  equal(
    validateBudgetZeroDraft({
      ...validDraft,
      stress: {
        ...validDraft.stress,
        responseIds: ["category:missing"],
      },
    }),
    false
  )
})
