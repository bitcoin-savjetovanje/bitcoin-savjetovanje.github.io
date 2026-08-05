import {
  type BudgetZeroDraftV1,
  validateBudgetZeroDraft,
} from "./budgetZero.ts"

export const BUDGET_ZERO_STORAGE_KEY =
  "bitcoin-savjetovanje:proracun-nulte-razine:v1"

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export interface BudgetZeroStorageAdapter {
  load(): BudgetZeroDraftV1 | null
  save(draft: BudgetZeroDraftV1): boolean
  clear(): boolean
  isPersistent(): boolean
}

/**
 * Returns false from save/clear when the operation only succeeded in memory.
 */
export function createBudgetZeroStorage(
  storage: StorageLike | null | undefined
): BudgetZeroStorageAdapter {
  let activeStorage = storage
  let memoryDraft: BudgetZeroDraftV1 | null = null

  function disablePersistentStorage(): void {
    activeStorage = null
  }

  return {
    load() {
      if (!activeStorage) {
        return memoryDraft
      }

      let storedValue: string | null

      try {
        storedValue = activeStorage.getItem(BUDGET_ZERO_STORAGE_KEY)
      } catch {
        disablePersistentStorage()
        return memoryDraft
      }

      if (storedValue === null) {
        return memoryDraft
      }

      let parsedValue: unknown

      try {
        parsedValue = JSON.parse(storedValue)
      } catch {
        return memoryDraft
      }

      if (!validateBudgetZeroDraft(parsedValue)) {
        return memoryDraft
      }

      memoryDraft = parsedValue
      return parsedValue
    },

    save(draft) {
      if (!validateBudgetZeroDraft(draft)) {
        return false
      }

      memoryDraft = draft

      if (!activeStorage) {
        return false
      }

      try {
        activeStorage.setItem(BUDGET_ZERO_STORAGE_KEY, JSON.stringify(draft))
        return true
      } catch {
        disablePersistentStorage()
        return false
      }
    },

    clear() {
      memoryDraft = null

      if (!activeStorage) {
        return false
      }

      try {
        activeStorage.removeItem(BUDGET_ZERO_STORAGE_KEY)
        return true
      } catch {
        disablePersistentStorage()
        return false
      }
    },

    isPersistent() {
      return activeStorage !== null && activeStorage !== undefined
    },
  }
}
