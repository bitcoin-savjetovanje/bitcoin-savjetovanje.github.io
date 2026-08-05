/// <reference types="node" />

import { equal } from "node:assert/strict"
import { test } from "node:test"

import {
  createInitialBudgetCategories,
  type BudgetZeroDraftV1,
} from "./budgetZero.ts"
import {
  BUDGET_ZERO_STORAGE_KEY,
  createBudgetZeroStorage,
  type StorageLike,
} from "./budgetZeroStorage.ts"

function createDraft(): BudgetZeroDraftV1 {
  return {
    schemaVersion: 1,
    currency: "EUR",
    accounts: [{ id: "cash", label: "Gotovina", balanceEuros: 100 }],
    categories: createInitialBudgetCategories(),
    expectedMonthlyIncomeEuros: null,
    financialRevision: 1,
    stress: {
      incomeFactorPercent: 80,
      responseIds: [],
      otherNote: "",
      reviewedFinancialRevision: null,
    },
    personalRule: "",
    currentStep: "accounts",
    createdAt: "2026-07-17T08:00:00.000Z",
    updatedAt: "2026-07-17T08:00:00.000Z",
  }
}

function createMemoryStorage(): StorageLike & { values: Map<string, string> } {
  const values = new Map<string, string>()

  return {
    values,
    getItem(key) {
      return values.get(key) ?? null
    },
    setItem(key, value) {
      values.set(key, value)
    },
    removeItem(key) {
      values.delete(key)
    },
  }
}

test("sprema, učitava i briše valjani nacrt pod zasebnim ključem", () => {
  const storage = createMemoryStorage()
  const adapter = createBudgetZeroStorage(storage)
  const draft = createDraft()

  equal(adapter.isPersistent(), true)
  equal(adapter.load(), null)
  equal(adapter.save(draft), true)
  equal(storage.values.has(BUDGET_ZERO_STORAGE_KEY), true)
  equal(adapter.load()?.accounts[0]?.balanceEuros, 100)
  equal(adapter.clear(), true)
  equal(storage.values.has(BUDGET_ZERO_STORAGE_KEY), false)
  equal(adapter.load(), null)
})

test("ne učitava oštećen JSON ni nepoznatu verziju sheme", () => {
  const storage = createMemoryStorage()
  storage.values.set(BUDGET_ZERO_STORAGE_KEY, "{not-json")
  const corruptAdapter = createBudgetZeroStorage(storage)

  equal(corruptAdapter.load(), null)
  equal(corruptAdapter.isPersistent(), true)
  equal(corruptAdapter.save(createDraft()), true)

  const futureStorage = createMemoryStorage()
  futureStorage.values.set(
    BUDGET_ZERO_STORAGE_KEY,
    JSON.stringify({ ...createDraft(), schemaVersion: 2 })
  )
  const futureAdapter = createBudgetZeroStorage(futureStorage)

  equal(futureAdapter.load(), null)
  equal(futureAdapter.isPersistent(), true)
})

test("kada localStorage nije dostupan nastavlja raditi u memoriji", () => {
  const adapter = createBudgetZeroStorage(null)
  const draft = createDraft()

  equal(adapter.isPersistent(), false)
  equal(adapter.save(draft), false)
  equal(adapter.load()?.accounts[0]?.label, "Gotovina")
  equal(adapter.clear(), false)
  equal(adapter.load(), null)
})

test("nakon sigurnosne ili kvota pogreške prelazi na memorijski fallback", () => {
  const throwingStorage: StorageLike = {
    getItem() {
      return null
    },
    setItem() {
      throw new Error("QuotaExceededError")
    },
    removeItem() {
      throw new Error("SecurityError")
    },
  }
  const adapter = createBudgetZeroStorage(throwingStorage)
  const draft = createDraft()

  equal(adapter.save(draft), false)
  equal(adapter.isPersistent(), false)
  equal(adapter.load()?.updatedAt, draft.updatedAt)
  equal(adapter.clear(), false)
  equal(adapter.load(), null)
})

test("odbija spremanje nevaljanog nacrta", () => {
  const storage = createMemoryStorage()
  const adapter = createBudgetZeroStorage(storage)

  equal(
    adapter.save({
      ...createDraft(),
      currency: "USD",
    } as unknown as BudgetZeroDraftV1),
    false
  )
  equal(storage.values.size, 0)
})
