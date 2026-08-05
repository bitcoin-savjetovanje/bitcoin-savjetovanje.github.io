import {
  ArrowLeft,
  ArrowRight,
  Bitcoin,
  CalendarClock,
  Check,
  CircleAlert,
  CircleCheckBig,
  HandCoins,
  HeartHandshake,
  Landmark,
  LockKeyhole,
  MoreHorizontal,
  Plus,
  ReceiptText,
  RotateCcw,
  Save,
  ShieldCheck,
  Trash2,
  TrendingDown,
  WalletCards,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"

import { MoneyInput } from "@/components/budget-zero/MoneyInput"
import { Button } from "@/components/ui/button"
import {
  MAX_ACCOUNTS,
  MAX_CUSTOM_CATEGORIES,
  MAX_FREE_TEXT_LENGTH,
  MAX_LABEL_LENGTH,
  budgetAreas,
  calculateAreaPercent,
  calculateAssignments,
  calculateAvailableFunds,
  calculateStressScenario,
  createInitialBudgetCategories,
  formatEuroFromEuros,
  isBudgetZeroComplete,
  validateBudgetZeroDraft,
  type BudgetAreaId,
  type BudgetCategory,
  type BudgetZeroDraftV1,
  type BudgetZeroStep,
  type MoneyAccount,
  type StressResponseId,
} from "@/lib/budgetZero"
import {
  createBudgetZeroStorage,
  type BudgetZeroStorageAdapter,
} from "@/lib/budgetZeroStorage"

const stepOrder: readonly BudgetZeroStep[] = [
  "accounts",
  "allocation",
  "stress",
  "rule",
  "result",
]

const stepLabels: Readonly<Record<BudgetZeroStep, string>> = {
  accounts: "Računi",
  allocation: "Namjene",
  stress: "Stresni scenarij",
  rule: "Osobno pravilo",
  result: "Rezultat",
}

const areaIcons: Readonly<Record<BudgetAreaId, LucideIcon>> = {
  "monthly-expenses": ReceiptText,
  debt: Landmark,
  "future-obligations": CalendarClock,
  reserve: ShieldCheck,
  giving: HeartHandshake,
  "bitcoin-savings": Bitcoin,
  other: MoreHorizontal,
}

const accountExamples = [
  "Gotovina",
  "Tekući račun",
  "Žiro račun",
  "Bitcoin novčanik",
] as const

type SaveState = "idle" | "saving" | "saved" | "memory"

function makeId(prefix: string): string {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return prefix + "-" + globalThis.crypto.randomUUID()
  }

  return (
    prefix +
    "-" +
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2)
  )
}

function uniqueLabel(base: string, existingLabels: readonly string[]): string {
  const normalized = new Set(
    existingLabels.map((label) => label.trim().toLocaleLowerCase("hr-HR"))
  )

  if (!normalized.has(base.toLocaleLowerCase("hr-HR"))) {
    return base
  }

  let suffix = 2
  while (normalized.has((base + " " + suffix).toLocaleLowerCase("hr-HR"))) {
    suffix += 1
  }

  return base + " " + suffix
}

function createDraft(accountLabel = "Gotovina"): BudgetZeroDraftV1 {
  const now = new Date().toISOString()

  return {
    schemaVersion: 1,
    currency: "EUR",
    accounts: [
      {
        id: makeId("account"),
        label: accountLabel,
        balanceEuros: 0,
      },
    ],
    categories: createInitialBudgetCategories(),
    expectedMonthlyIncomeEuros: null,
    financialRevision: 0,
    stress: {
      incomeFactorPercent: 80,
      responseIds: [],
      otherNote: "",
      reviewedFinancialRevision: null,
    },
    personalRule: "",
    currentStep: "accounts",
    createdAt: now,
    updatedAt: now,
  }
}

function withStep(
  draft: BudgetZeroDraftV1,
  currentStep: BudgetZeroStep
): BudgetZeroDraftV1 {
  return { ...draft, currentStep }
}

function withFinancialChange(
  draft: BudgetZeroDraftV1,
  change: Partial<
    Pick<
      BudgetZeroDraftV1,
      "accounts" | "categories" | "expectedMonthlyIncomeEuros"
    >
  >
): BudgetZeroDraftV1 {
  return {
    ...draft,
    ...change,
    financialRevision: draft.financialRevision + 1,
    stress: {
      ...draft.stress,
      reviewedFinancialRevision: null,
    },
  }
}

function StepProgress({ currentStep }: { currentStep: BudgetZeroStep }) {
  const activeIndex = stepOrder.indexOf(currentStep)

  return (
    <nav className="budget-zero-progress" aria-label="Napredak proračuna">
      <ol>
        {stepOrder.map((step, index) => {
          const isActive = step === currentStep
          const isComplete = index < activeIndex

          return (
            <li
              key={step}
              data-active={isActive || undefined}
              data-complete={isComplete || undefined}
              aria-current={isActive ? "step" : undefined}
            >
              <span aria-hidden="true">
                {isComplete ? <Check /> : index + 1}
              </span>
              <span>{stepLabels[step]}</span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function SaveIndicator({ state }: { state: SaveState }) {
  const copy =
    state === "saving"
      ? "Spremanje..."
      : state === "saved"
        ? "Spremljeno lokalno"
        : state === "memory"
          ? "Samo u ovoj kartici"
          : "Lokalna pohrana"

  return (
    <span className="budget-zero-save-status" data-state={state}>
      {state === "memory" ? <CircleAlert /> : <Save />}
      {copy}
    </span>
  )
}

function StepHeading({
  icon: Icon,
  title,
  children,
  headingRef,
}: {
  icon: LucideIcon
  title: string
  children: ReactNode
  headingRef: React.RefObject<HTMLHeadingElement | null>
}) {
  return (
    <div className="budget-zero-step-heading">
      <span className="budget-zero-step-heading__icon" aria-hidden="true">
        <Icon />
      </span>
      <div>
        <h2 ref={headingRef} tabIndex={-1}>
          {title}
        </h2>
        <p>{children}</p>
      </div>
    </div>
  )
}

function StepNavigation({
  onBack,
  onContinue,
  continueLabel = "Nastavite",
  continueDisabled = false,
}: {
  onBack?: () => void
  onContinue: () => void
  continueLabel?: string
  continueDisabled?: boolean
}) {
  return (
    <div className="budget-zero-navigation">
      {onBack ? (
        <Button type="button" variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft aria-hidden="true" />
          Natrag
        </Button>
      ) : (
        <span />
      )}
      <Button
        type="button"
        size="lg"
        onClick={onContinue}
        disabled={continueDisabled}
      >
        {continueLabel}
        <ArrowRight aria-hidden="true" />
      </Button>
    </div>
  )
}

function Intro({
  hydrated,
  savedDraft,
  onStart,
  onResume,
}: {
  hydrated: boolean
  savedDraft: BudgetZeroDraftV1 | null
  onStart: () => void
  onResume: () => void
}) {
  return (
    <section className="budget-zero-module budget-zero-module--intro">
      <div className="budget-zero-intro">
        <div className="budget-zero-intro__copy">
          <span className="budget-zero-intro__zero" aria-hidden="true">
            0
          </span>
          <div>
            <h2>Svaki euro dobiva svoju namjenu.</h2>
            <p>
              Zbrojite novac koji već imate na računima, rasporedite ga do nule
              i provjerite bi li vaš plan izdržao slabiji prihod.
            </p>
          </div>
        </div>

        <div className="budget-zero-intro__actions">
          {savedDraft ? (
            <Button
              type="button"
              size="lg"
              onClick={onResume}
              disabled={!hydrated}
            >
              Nastavite spremljeni proračun
              <ArrowRight aria-hidden="true" />
            </Button>
          ) : null}
          <Button
            type="button"
            size="lg"
            variant={savedDraft ? "outline" : "default"}
            onClick={onStart}
            disabled={!hydrated}
          >
            {savedDraft ? "Započnite novi" : "Započnite proračun"}
          </Button>
        </div>

        <div className="budget-zero-privacy-notice">
          <LockKeyhole aria-hidden="true" />
          <p>
            Vaši iznosi ostaju samo u ovom pregledniku. Ne šalju se na server, u
            analitiku ni u zapisnike. Lokalna pohrana nije šifrirana, zato ne
            upisujte IBAN, adrese novčanika, privatne ključeve, Bitcoin Core
            wallet backup datoteke, wallet passphraseove, početne riječi drugih
            walleta ni pristupne podatke.
          </p>
        </div>
      </div>
      <noscript>
        <p className="budget-zero-noscript">
          Za korištenje proračuna potrebno je uključiti JavaScript.
        </p>
      </noscript>
    </section>
  )
}

function AccountStep({
  draft,
  totalEuros,
  accountLabelsValid,
  headingRef,
  onChange,
  onContinue,
}: {
  draft: BudgetZeroDraftV1
  totalEuros: number
  accountLabelsValid: boolean
  headingRef: React.RefObject<HTMLHeadingElement | null>
  onChange: (draft: BudgetZeroDraftV1) => void
  onContinue: () => void
}) {
  const [amountValidity, setAmountValidity] = useState<Record<string, boolean>>(
    {}
  )
  const accountAmountsValid = draft.accounts.every(
    (account) => amountValidity[account.id] !== false
  )

  function updateAccount(id: string, change: Partial<MoneyAccount>) {
    onChange(
      withFinancialChange(draft, {
        accounts: draft.accounts.map((account) =>
          account.id === id ? { ...account, ...change } : account
        ),
      })
    )
  }

  function addAccount(suggestedLabel = "Novi račun") {
    if (draft.accounts.length >= MAX_ACCOUNTS) {
      return
    }

    const label = uniqueLabel(
      suggestedLabel,
      draft.accounts.map((account) => account.label)
    )

    onChange(
      withFinancialChange(draft, {
        accounts: [
          ...draft.accounts,
          { id: makeId("account"), label, balanceEuros: 0 },
        ],
      })
    )
  }

  function removeAccount(id: string) {
    const account = draft.accounts.find((candidate) => candidate.id === id)

    if (
      typeof window !== "undefined" &&
      account &&
      account.balanceEuros > 0 &&
      !window.confirm("Želite li ukloniti ovaj račun i njegov iznos?")
    ) {
      return
    }

    onChange(
      withFinancialChange(draft, {
        accounts: draft.accounts.filter((account) => account.id !== id),
      })
    )
  }

  return (
    <section className="budget-zero-step">
      <StepHeading
        icon={WalletCards}
        title="Na kojim računima imate novac?"
        headingRef={headingRef}
      >
        Upišite stanje u cijelim eurima. Bitcoin novčanik unesite kao trenutačnu
        protuvrijednost koju želite obuhvatiti ovim planom.
      </StepHeading>

      <div
        className="budget-zero-account-examples"
        aria-label="Brzo dodavanje računa"
      >
        {accountExamples.map((label) => (
          <Button
            type="button"
            variant="outline"
            key={label}
            onClick={() => addAccount(label)}
            disabled={draft.accounts.length >= MAX_ACCOUNTS}
          >
            <Plus aria-hidden="true" />
            {label}
          </Button>
        ))}
      </div>

      <p className="budget-zero-accounts-note">
        Svaki stvarni euro upišite samo jednom. Prijenos između vlastitih računa
        nije novi novac.
      </p>

      <div className="budget-zero-account-list">
        <div className="budget-zero-account-list__labels" aria-hidden="true">
          <span>Račun</span>
          <span>Stanje</span>
        </div>
        {draft.accounts.map((account, index) => {
          const normalizedLabel = account.label
            .trim()
            .toLocaleLowerCase("hr-HR")
          const isDuplicate =
            normalizedLabel.length > 0 &&
            draft.accounts.filter(
              (candidate) =>
                candidate.label.trim().toLocaleLowerCase("hr-HR") ===
                normalizedLabel
            ).length > 1
          const labelError =
            account.label.trim().length === 0
              ? "Upišite naziv računa."
              : isDuplicate
                ? "Naziv računa mora biti jedinstven."
                : null

          return (
            <div className="budget-zero-account-row" key={account.id}>
              <span className="budget-zero-row-number" aria-hidden="true">
                {index + 1}
              </span>
              <div className="budget-zero-text-field">
                <label htmlFor={"account-label-" + account.id}>
                  Naziv računa {index + 1}
                </label>
                <input
                  id={"account-label-" + account.id}
                  type="text"
                  value={account.label}
                  maxLength={MAX_LABEL_LENGTH}
                  aria-invalid={Boolean(labelError)}
                  aria-describedby={
                    labelError ? "account-label-error-" + account.id : undefined
                  }
                  onChange={(event) =>
                    updateAccount(account.id, { label: event.target.value })
                  }
                  onBlur={(event) =>
                    updateAccount(account.id, {
                      label: event.currentTarget.value.trim(),
                    })
                  }
                />
                {labelError ? (
                  <p
                    id={"account-label-error-" + account.id}
                    className="budget-zero-field-error"
                  >
                    {labelError}
                  </p>
                ) : null}
              </div>
              <MoneyInput
                id={"account-balance-" + account.id}
                label={"Stanje na računu " + account.label}
                valueEuros={account.balanceEuros}
                onValueChange={(balanceEuros) =>
                  updateAccount(account.id, { balanceEuros })
                }
                onValidityChange={(isValid) =>
                  setAmountValidity((current) => ({
                    ...current,
                    [account.id]: isValid,
                  }))
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                title={"Ukloni račun " + account.label}
                aria-label={"Ukloni račun " + account.label}
                onClick={() => removeAccount(account.id)}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
          )
        })}
      </div>

      <div className="budget-zero-accounts-footer">
        <Button
          type="button"
          variant="outline"
          onClick={() => addAccount()}
          disabled={draft.accounts.length >= MAX_ACCOUNTS}
        >
          <Plus aria-hidden="true" />
          Dodajte račun
        </Button>
        <div>
          <span>Ukupno za namijeniti</span>
          <strong>{formatEuroFromEuros(totalEuros)}</strong>
        </div>
      </div>

      {totalEuros === 0 ? (
        <p className="budget-zero-step-warning" role="status">
          <CircleAlert aria-hidden="true" />
          Za nastavak unesite barem jedan iznos veći od nule.
        </p>
      ) : null}

      <StepNavigation
        onContinue={onContinue}
        continueDisabled={
          draft.accounts.length === 0 ||
          totalEuros === 0 ||
          !accountLabelsValid ||
          !accountAmountsValid
        }
      />
    </section>
  )
}

function AssignmentStatusPanel({
  availableEuros,
  assignedEuros,
  remainingEuros,
  overAssignedEuros,
  status,
}: ReturnType<typeof calculateAssignments>) {
  const displayEuros =
    status === "over-assigned" ? overAssignedEuros : remainingEuros
  const progress =
    availableEuros > 0
      ? Math.min(100, Math.round((assignedEuros / availableEuros) * 100))
      : 0

  return (
    <aside
      className="budget-zero-status-panel"
      data-status={status}
      aria-label="Stanje raspodjele"
    >
      <span>
        {status === "balanced"
          ? "Proračun je na nuli"
          : status === "over-assigned"
            ? "Previše namijenjeno"
            : "Još za namijeniti"}
      </span>
      <strong aria-live="polite" aria-atomic="true">
        {formatEuroFromEuros(displayEuros)}
      </strong>
      <div className="budget-zero-status-panel__bar" aria-hidden="true">
        <span style={{ width: progress + "%" }} />
      </div>
      <dl>
        <div>
          <dt>Na računima</dt>
          <dd>{formatEuroFromEuros(availableEuros)}</dd>
        </div>
        <div>
          <dt>Namijenjeno</dt>
          <dd>{formatEuroFromEuros(assignedEuros)}</dd>
        </div>
      </dl>
      {status === "balanced" ? (
        <p>
          <CircleCheckBig aria-hidden="true" />
          Svaki euro ima svoju namjenu.
        </p>
      ) : status === "over-assigned" ? (
        <p>
          <CircleAlert aria-hidden="true" />
          Smanjite namjene za prikazani iznos.
        </p>
      ) : (
        <p>Rasporedite preostali iznos prije nastavka.</p>
      )}
    </aside>
  )
}

function AllocationStep({
  draft,
  summary,
  categoryLabelsValid,
  headingRef,
  onChange,
  onBack,
  onContinue,
}: {
  draft: BudgetZeroDraftV1
  summary: ReturnType<typeof calculateAssignments>
  categoryLabelsValid: boolean
  headingRef: React.RefObject<HTMLHeadingElement | null>
  onChange: (draft: BudgetZeroDraftV1) => void
  onBack: () => void
  onContinue: () => void
}) {
  const [amountValidity, setAmountValidity] = useState<Record<string, boolean>>(
    {}
  )
  const customCategoryCount = draft.categories.filter(
    (category) => category.source === "custom"
  ).length

  function updateCategory(
    id: string,
    change: Partial<Pick<BudgetCategory, "label" | "assignedEuros">>,
    financial = false
  ) {
    const categories = draft.categories.map((category) =>
      category.id === id ? { ...category, ...change } : category
    )

    onChange(
      financial
        ? withFinancialChange(draft, { categories })
        : { ...draft, categories }
    )
  }

  function addCustomCategory(areaId: BudgetAreaId) {
    if (customCategoryCount >= MAX_CUSTOM_CATEGORIES) {
      return
    }

    const existingLabels = draft.categories
      .filter((category) => category.areaId === areaId)
      .map((category) => category.label)
    const category: BudgetCategory = {
      id: makeId("category"),
      areaId,
      label: uniqueLabel("Nova kategorija", existingLabels),
      source: "custom",
      assignedEuros: 0,
    }

    onChange(
      withFinancialChange(draft, {
        categories: [...draft.categories, category],
      })
    )
  }

  function removeCustomCategory(category: BudgetCategory) {
    if (
      typeof window !== "undefined" &&
      category.assignedEuros > 0 &&
      !window.confirm(
        "Ova kategorija sadrži namijenjeni iznos. Želite li je ukloniti?"
      )
    ) {
      return
    }

    const nextDraft = withFinancialChange(draft, {
      categories: draft.categories.filter(
        (candidate) => candidate.id !== category.id
      ),
    })
    const responseId = ("category:" + category.id) as StressResponseId

    onChange({
      ...nextDraft,
      stress: {
        ...nextDraft.stress,
        responseIds: nextDraft.stress.responseIds.filter(
          (candidate) => candidate !== responseId
        ),
      },
    })
  }

  return (
    <section className="budget-zero-step">
      <StepHeading
        icon={HandCoins}
        title="Dajte svakom euru posao"
        headingRef={headingRef}
      >
        Rasporedite cijeli iznos s računa. Proračun je dovršen tek kada “još za
        namijeniti” dođe na nulu.
      </StepHeading>

      <div className="budget-zero-allocation-layout">
        <div className="budget-zero-area-list">
          {budgetAreas.map((area) => {
            const Icon = areaIcons[area.id]
            const categories = draft.categories.filter(
              (category) => category.areaId === area.id
            )
            const areaTotal = summary.areaTotalsEuros[area.id]

            return (
              <section className="budget-zero-area" key={area.id}>
                <header>
                  <span aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <h3>{area.label}</h3>
                    <p>{area.description}</p>
                  </div>
                  <div className="budget-zero-area__total">
                    <strong>{formatEuroFromEuros(areaTotal)}</strong>
                    <span>
                      {calculateAreaPercent(
                        areaTotal,
                        summary.availableEuros
                      ).toLocaleString("hr-HR")}
                      %
                    </span>
                  </div>
                </header>

                <div className="budget-zero-category-list">
                  {categories.map((category) => {
                    const normalizedLabel = category.label
                      .trim()
                      .toLocaleLowerCase("hr-HR")
                    const duplicate =
                      category.source === "custom" &&
                      normalizedLabel.length > 0 &&
                      categories.filter(
                        (candidate) =>
                          candidate.source === "custom" &&
                          candidate.label.trim().toLocaleLowerCase("hr-HR") ===
                            normalizedLabel
                      ).length > 1
                    const labelError =
                      category.source === "custom" &&
                      category.label.trim().length === 0
                        ? "Upišite naziv kategorije."
                        : duplicate
                          ? "Naziv vlastite kategorije mora biti jedinstven."
                          : null

                    return (
                      <div
                        className="budget-zero-category-row"
                        key={category.id}
                      >
                        {category.source === "custom" ? (
                          <div className="budget-zero-text-field">
                            <label htmlFor={"category-label-" + category.id}>
                              Naziv vlastite kategorije
                            </label>
                            <input
                              id={"category-label-" + category.id}
                              type="text"
                              value={category.label}
                              maxLength={MAX_LABEL_LENGTH}
                              aria-invalid={Boolean(labelError)}
                              aria-describedby={
                                labelError
                                  ? "category-label-error-" + category.id
                                  : undefined
                              }
                              onChange={(event) =>
                                updateCategory(category.id, {
                                  label: event.target.value,
                                })
                              }
                              onBlur={(event) =>
                                updateCategory(category.id, {
                                  label: event.currentTarget.value.trim(),
                                })
                              }
                            />
                            {labelError ? (
                              <p
                                id={"category-label-error-" + category.id}
                                className="budget-zero-field-error"
                              >
                                {labelError}
                              </p>
                            ) : null}
                          </div>
                        ) : (
                          <div className="budget-zero-category-label">
                            <span>{category.label}</span>
                          </div>
                        )}
                        <MoneyInput
                          id={"category-amount-" + category.id}
                          label={"Iznos za " + category.label}
                          valueEuros={category.assignedEuros}
                          onValueChange={(assignedEuros) =>
                            updateCategory(category.id, { assignedEuros }, true)
                          }
                          onValidityChange={(isValid) =>
                            setAmountValidity((current) => ({
                              ...current,
                              [category.id]: isValid,
                            }))
                          }
                          emptyIsZero
                        />
                        {category.source === "custom" ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-lg"
                            title={"Ukloni kategoriju " + category.label}
                            aria-label={"Ukloni kategoriju " + category.label}
                            onClick={() => removeCustomCategory(category)}
                          >
                            <Trash2 aria-hidden="true" />
                          </Button>
                        ) : (
                          <span
                            className="budget-zero-category-row__spacer"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    )
                  })}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  className="budget-zero-add-category"
                  onClick={() => addCustomCategory(area.id)}
                  disabled={customCategoryCount >= MAX_CUSTOM_CATEGORIES}
                >
                  <Plus aria-hidden="true" />
                  Dodajte vlastitu kategoriju
                </Button>
              </section>
            )
          })}
        </div>

        <div className="budget-zero-allocation-sidebar">
          <AssignmentStatusPanel {...summary} />
        </div>
      </div>

      <StepNavigation
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="Provjerite plan"
        continueDisabled={
          summary.availableEuros === 0 ||
          summary.status !== "balanced" ||
          !categoryLabelsValid ||
          !draft.categories.every(
            (category) => amountValidity[category.id] !== false
          )
        }
      />
    </section>
  )
}

function StressStep({
  draft,
  headingRef,
  onChange,
  onBack,
  onContinue,
}: {
  draft: BudgetZeroDraftV1
  headingRef: React.RefObject<HTMLHeadingElement | null>
  onChange: (draft: BudgetZeroDraftV1) => void
  onBack: () => void
  onContinue: (reviewedDraft: BudgetZeroDraftV1) => void
}) {
  const [incomeIsValid, setIncomeIsValid] = useState(true)
  const expectedIncome = draft.expectedMonthlyIncomeEuros
  const scenario =
    expectedIncome !== null && expectedIncome > 0
      ? calculateStressScenario(expectedIncome)
      : null
  const allocatedCategories = draft.categories.filter(
    (category) => category.assignedEuros > 0
  )

  function toggleResponse(responseId: StressResponseId) {
    const selected = draft.stress.responseIds.includes(responseId)
    let responseIds: readonly StressResponseId[]

    if (selected) {
      responseIds = draft.stress.responseIds.filter(
        (candidate) => candidate !== responseId
      )
    } else if (responseId === "not-sure") {
      responseIds = ["not-sure"]
    } else {
      responseIds = [
        ...draft.stress.responseIds.filter(
          (candidate) => candidate !== "not-sure"
        ),
        responseId,
      ]
    }

    onChange({
      ...draft,
      stress: {
        ...draft.stress,
        responseIds,
        reviewedFinancialRevision: null,
      },
    })
  }

  function finishStressReview() {
    onContinue({
      ...draft,
      stress: {
        ...draft.stress,
        reviewedFinancialRevision: draft.financialRevision,
      },
    })
  }

  const fixedResponses: readonly {
    id: StressResponseId
    label: string
  }[] = [
    {
      id: "use-existing-reserve",
      label: "Upotrijebio/la bih dio postojeće pričuve",
    },
    { id: "additional-income", label: "Potražio/la bih dodatni prihod" },
    { id: "other-response", label: "Napravio/la bih nešto drugo" },
    { id: "not-sure", label: "Još nisam siguran/na što bih učinio/la" },
  ]

  return (
    <section className="budget-zero-step">
      <StepHeading
        icon={TrendingDown}
        title="Što ako prihod idući mjesec padne 20%?"
        headingRef={headingRef}
      >
        Očekivani prihod služi samo ovom scenariju i ne dodaje se novcu koji ste
        već rasporedili s računa.
      </StepHeading>

      <div className="budget-zero-stress-layout">
        <div className="budget-zero-stress-main">
          <MoneyInput
            id="budget-zero-expected-income"
            label="Vaš uobičajeni očekivani mjesečni prihod"
            valueEuros={expectedIncome ?? 0}
            onValueChange={(expectedMonthlyIncomeEuros) =>
              onChange(
                withFinancialChange(draft, {
                  expectedMonthlyIncomeEuros,
                })
              )
            }
            onValidityChange={setIncomeIsValid}
            hint="Upišite cijeli iznos u eurima."
          />

          {scenario ? (
            <div className="budget-zero-stress-result" aria-live="polite">
              <div>
                <span>Prihod nakon smanjenja</span>
                <strong>
                  {formatEuroFromEuros(scenario.stressIncomeEuros)}
                </strong>
              </div>
              <div>
                <span>Manje nego inače</span>
                <strong>
                  {formatEuroFromEuros(scenario.incomeReductionEuros)}
                </strong>
              </div>
            </div>
          ) : null}

          <fieldset className="budget-zero-stress-options">
            <legend>Kako biste prilagodili plan?</legend>
            <p>Odaberite barem jedan odgovor. Možete označiti više stavki.</p>

            {allocatedCategories.length > 0 ? (
              <div className="budget-zero-stress-options__group">
                <span>Smanjio/la bih jednu ili više namjena</span>
                {allocatedCategories.map((category) => {
                  const responseId = ("category:" +
                    category.id) as StressResponseId

                  return (
                    <label key={category.id}>
                      <input
                        type="checkbox"
                        checked={draft.stress.responseIds.includes(responseId)}
                        onChange={() => toggleResponse(responseId)}
                      />
                      <span>
                        {category.label}
                        <small>
                          {formatEuroFromEuros(category.assignedEuros)}
                        </small>
                      </span>
                    </label>
                  )
                })}
              </div>
            ) : null}

            <div className="budget-zero-stress-options__group">
              {fixedResponses.map((response) => (
                <label key={response.id}>
                  <input
                    type="checkbox"
                    checked={draft.stress.responseIds.includes(response.id)}
                    onChange={() => toggleResponse(response.id)}
                  />
                  <span>{response.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {draft.stress.responseIds.includes("other-response") ? (
            <div className="budget-zero-textarea-field">
              <label htmlFor="budget-zero-other-response">
                Što biste još učinili?
              </label>
              <textarea
                id="budget-zero-other-response"
                value={draft.stress.otherNote}
                maxLength={MAX_FREE_TEXT_LENGTH}
                rows={3}
                onChange={(event) =>
                  onChange({
                    ...draft,
                    stress: {
                      ...draft.stress,
                      otherNote: event.target.value,
                      reviewedFinancialRevision: null,
                    },
                  })
                }
              />
              <span>
                {draft.stress.otherNote.length}/{MAX_FREE_TEXT_LENGTH}
              </span>
            </div>
          ) : null}
        </div>

        <aside className="budget-zero-stress-sidebar">
          <ShieldCheck aria-hidden="true" />
          <h3>Ovo nije prognoza.</h3>
          <p>
            Scenarij služi da unaprijed primijetite gdje je vaš plan čvrst, a
            gdje mu treba više prostora.
          </p>
        </aside>
      </div>

      <StepNavigation
        onBack={onBack}
        onContinue={finishStressReview}
        continueLabel="Zapišite osobno pravilo"
        continueDisabled={
          expectedIncome === null ||
          expectedIncome <= 0 ||
          !incomeIsValid ||
          draft.stress.responseIds.length === 0
        }
      />
    </section>
  )
}

function RuleStep({
  draft,
  headingRef,
  onChange,
  onBack,
  onContinue,
}: {
  draft: BudgetZeroDraftV1
  headingRef: React.RefObject<HTMLHeadingElement | null>
  onChange: (draft: BudgetZeroDraftV1) => void
  onBack: () => void
  onContinue: () => void
}) {
  return (
    <section className="budget-zero-step">
      <StepHeading
        icon={ShieldCheck}
        title="Zapišite svoje pravilo slobodnog novca"
        headingRef={headingRef}
      >
        Jedna jasna rečenica može pomoći da ista odluka sljedeći put bude
        jednostavnija.
      </StepHeading>

      <div className="budget-zero-rule-layout">
        <div className="budget-zero-rule-editor">
          <label htmlFor="budget-zero-personal-rule">
            Novac smatram stvarno slobodnim tek kada...
          </label>
          <textarea
            id="budget-zero-personal-rule"
            rows={5}
            value={draft.personalRule}
            maxLength={MAX_FREE_TEXT_LENGTH}
            placeholder="npr. pokrijem redovne troškove, obveze, pričuvu i planiranu štednju."
            onChange={(event) =>
              onChange({ ...draft, personalRule: event.target.value })
            }
          />
          <span>
            {draft.personalRule.length}/{MAX_FREE_TEXT_LENGTH}
          </span>
        </div>

        <aside className="budget-zero-rule-context">
          <h3>Dobro pravilo je osobno i provjerljivo.</h3>
          <p>
            Neka kaže što za vas mora biti pokriveno prije nego što preostali
            novac doista postane slobodan.
          </p>
        </aside>
      </div>

      <StepNavigation
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="Prikažite rezultat"
        continueDisabled={draft.personalRule.trim().length === 0}
      />
    </section>
  )
}

function stressResponseLabel(
  responseId: StressResponseId,
  categories: readonly BudgetCategory[]
): string {
  if (responseId.startsWith("category:")) {
    const category = categories.find(
      (candidate) => candidate.id === responseId.slice("category:".length)
    )
    return category
      ? "Smanjiti namjenu: " + category.label
      : "Smanjiti jednu od namjena"
  }

  switch (responseId) {
    case "use-existing-reserve":
      return "Upotrijebiti dio postojeće pričuve"
    case "additional-income":
      return "Potražiti dodatni prihod"
    case "other-response":
      return "Napraviti drugu prilagodbu"
    case "not-sure":
      return "Još nije određena prilagodba"
  }

  return "Druga prilagodba"
}

function personalRuleSentence(value: string): string {
  const rule = value.trim()
  const prefix = "Novac smatram stvarno slobodnim tek kada"

  if (
    rule
      .toLocaleLowerCase("hr-HR")
      .startsWith(prefix.toLocaleLowerCase("hr-HR"))
  ) {
    return rule
  }

  return prefix + " " + rule
}

function ResultStep({
  draft,
  summary,
  headingRef,
  onEdit,
  onReset,
}: {
  draft: BudgetZeroDraftV1
  summary: ReturnType<typeof calculateAssignments>
  headingRef: React.RefObject<HTMLHeadingElement | null>
  onEdit: (step: BudgetZeroStep) => void
  onReset: () => void
}) {
  const scenario =
    draft.expectedMonthlyIncomeEuros !== null
      ? calculateStressScenario(draft.expectedMonthlyIncomeEuros)
      : null
  const complete = isBudgetZeroComplete(draft)

  return (
    <section className="budget-zero-step budget-zero-result">
      <div
        className="budget-zero-result-hero"
        data-complete={complete || undefined}
      >
        <span aria-hidden="true">
          {complete ? <CircleCheckBig /> : <CircleAlert />}
        </span>
        <div>
          <p>Proračun nulte razine</p>
          <h2 ref={headingRef} tabIndex={-1}>
            {complete ? "Svaki euro ima svoju namjenu." : "Plan treba doradu."}
          </h2>
          <strong>{formatEuroFromEuros(summary.remainingEuros)}</strong>
          <span>još za namijeniti</span>
        </div>
      </div>

      <div className="budget-zero-result-grid">
        <section className="budget-zero-result-section">
          <header>
            <div>
              <WalletCards aria-hidden="true" />
              <h3>Računi</h3>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onEdit("accounts")}
            >
              Uredite
            </Button>
          </header>
          <ul>
            {draft.accounts.map((account) => (
              <li key={account.id}>
                <span>{account.label}</span>
                <strong>{formatEuroFromEuros(account.balanceEuros)}</strong>
              </li>
            ))}
          </ul>
          <div className="budget-zero-result-total">
            <span>Ukupno</span>
            <strong>{formatEuroFromEuros(summary.availableEuros)}</strong>
          </div>
        </section>

        <section className="budget-zero-result-section">
          <header>
            <div>
              <HandCoins aria-hidden="true" />
              <h3>Namjene</h3>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onEdit("allocation")}
            >
              Uredite
            </Button>
          </header>
          <ul>
            {budgetAreas.map((area) => (
              <li key={area.id}>
                <span>{area.label}</span>
                <strong>
                  {formatEuroFromEuros(summary.areaTotalsEuros[area.id])}
                </strong>
              </li>
            ))}
          </ul>
          <div className="budget-zero-result-total">
            <span>Namijenjeno</span>
            <strong>{formatEuroFromEuros(summary.assignedEuros)}</strong>
          </div>
        </section>
      </div>

      <section className="budget-zero-result-section budget-zero-result-stress">
        <header>
          <div>
            <TrendingDown aria-hidden="true" />
            <h3>Scenarij pada prihoda</h3>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onEdit("stress")}
          >
            Uredite
          </Button>
        </header>
        {scenario ? (
          <div className="budget-zero-result-stress__numbers">
            <div>
              <span>Uobičajeni prihod</span>
              <strong>
                {formatEuroFromEuros(scenario.expectedIncomeEuros)}
              </strong>
            </div>
            <div>
              <span>Prihod nakon pada od 20%</span>
              <strong>{formatEuroFromEuros(scenario.stressIncomeEuros)}</strong>
            </div>
          </div>
        ) : null}
        <ul>
          {draft.stress.responseIds.map((responseId) => (
            <li key={responseId}>
              <Check aria-hidden="true" />
              <span>{stressResponseLabel(responseId, draft.categories)}</span>
            </li>
          ))}
        </ul>
        {draft.stress.otherNote.trim() ? (
          <blockquote>{draft.stress.otherNote.trim()}</blockquote>
        ) : null}
      </section>

      <section className="budget-zero-result-rule">
        <header>
          <div>
            <ShieldCheck aria-hidden="true" />
            <h3>Moje pravilo</h3>
          </div>
          <Button type="button" variant="ghost" onClick={() => onEdit("rule")}>
            Uredite
          </Button>
        </header>
        <p>{personalRuleSentence(draft.personalRule)}</p>
      </section>

      <div className="budget-zero-result-footer">
        <div>
          <LockKeyhole aria-hidden="true" />
          <span>Rezultat je spremljen samo u ovom pregledniku.</span>
        </div>
        <Button type="button" variant="outline" onClick={onReset}>
          <RotateCcw aria-hidden="true" />
          Novi proračun
        </Button>
      </div>
    </section>
  )
}

export function BudgetZeroModule() {
  const [hydrated, setHydrated] = useState(false)
  const [started, setStarted] = useState(false)
  const [savedDraft, setSavedDraft] = useState<BudgetZeroDraftV1 | null>(null)
  const [draft, setDraft] = useState<BudgetZeroDraftV1>(() => createDraft())
  const [saveState, setSaveState] = useState<SaveState>("idle")
  const storageRef = useRef<BudgetZeroStorageAdapter | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const availableEuros = useMemo(
    () => calculateAvailableFunds(draft.accounts),
    [draft.accounts]
  )
  const assignmentSummary = useMemo(
    () => calculateAssignments(availableEuros, draft.categories),
    [availableEuros, draft.categories]
  )

  const accountLabelsValid = useMemo(() => {
    const labels = draft.accounts.map((account) =>
      account.label.trim().toLocaleLowerCase("hr-HR")
    )

    return (
      labels.every((label) => label.length > 0) &&
      new Set(labels).size === labels.length
    )
  }, [draft.accounts])

  const categoryLabelsValid = useMemo(() => {
    return budgetAreas.every((area) => {
      const labels = draft.categories
        .filter(
          (category) =>
            category.areaId === area.id && category.source === "custom"
        )
        .map((category) => category.label.trim().toLocaleLowerCase("hr-HR"))

      return (
        labels.every((label) => label.length > 0) &&
        new Set(labels).size === labels.length
      )
    })
  }, [draft.categories])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      let browserStorage: Storage | null = null

      try {
        browserStorage = window.localStorage
      } catch {
        browserStorage = null
      }

      const storage = createBudgetZeroStorage(browserStorage)
      storageRef.current = storage
      setSavedDraft(storage.load())
      setHydrated(true)
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (
      !hydrated ||
      !started ||
      !storageRef.current ||
      !validateBudgetZeroDraft(draft)
    ) {
      return
    }

    let persistTimeoutId: number | null = null
    const savingTimeoutId = window.setTimeout(() => {
      setSaveState("saving")
      persistTimeoutId = window.setTimeout(() => {
        const persistedDraft: BudgetZeroDraftV1 = {
          ...draft,
          updatedAt: new Date().toISOString(),
        }
        const persisted = storageRef.current?.save(persistedDraft) ?? false
        setSavedDraft(persistedDraft)
        setSaveState(persisted ? "saved" : "memory")
      }, 80)
    }, 300)

    return () => {
      window.clearTimeout(savingTimeoutId)
      if (persistTimeoutId !== null) {
        window.clearTimeout(persistTimeoutId)
      }
    }
  }, [draft, hydrated, started])

  useEffect(() => {
    if (!started) {
      return
    }

    const frameId = window.requestAnimationFrame(() => {
      headingRef.current?.focus()
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [draft.currentStep, started])

  function startNew() {
    if (
      savedDraft &&
      typeof window !== "undefined" &&
      !window.confirm(
        "Započinjanje novog proračuna zamijenit će trenutačno spremljeni proračun. Nastaviti?"
      )
    ) {
      return
    }

    setDraft(createDraft())
    storageRef.current?.clear()
    setSavedDraft(null)
    setStarted(true)
    setSaveState("idle")
  }

  function resume() {
    if (!savedDraft) {
      return
    }

    setDraft(savedDraft)
    setStarted(true)
  }

  function goToStep(step: BudgetZeroStep) {
    setDraft((currentDraft) => withStep(currentDraft, step))
  }

  function reset() {
    if (
      typeof window !== "undefined" &&
      !window.confirm(
        "Želite li izbrisati lokalno spremljeni proračun i započeti ispočetka?"
      )
    ) {
      return
    }

    storageRef.current?.clear()
    setSavedDraft(null)
    setDraft(createDraft())
    setStarted(false)
    setSaveState("idle")
  }

  if (!started) {
    return (
      <Intro
        hydrated={hydrated}
        savedDraft={savedDraft}
        onStart={startNew}
        onResume={resume}
      />
    )
  }

  return (
    <section className="budget-zero-module budget-zero-workspace">
      <header className="budget-zero-workspace__topbar">
        <StepProgress currentStep={draft.currentStep} />
        <div className="budget-zero-workspace__tools">
          <SaveIndicator state={saveState} />
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            title="Izbriši lokalni proračun"
            aria-label="Izbriši lokalni proračun"
            onClick={reset}
          >
            <Trash2 aria-hidden="true" />
          </Button>
        </div>
      </header>

      {saveState === "memory" ? (
        <p className="budget-zero-storage-warning" role="status">
          <CircleAlert aria-hidden="true" />
          Preglednik je onemogućio trajnu lokalnu pohranu. Proračun će ostati
          dostupan samo dok je ova kartica otvorena.
        </p>
      ) : null}

      {draft.currentStep === "accounts" ? (
        <AccountStep
          draft={draft}
          totalEuros={availableEuros}
          accountLabelsValid={accountLabelsValid}
          headingRef={headingRef}
          onChange={setDraft}
          onContinue={() => goToStep("allocation")}
        />
      ) : null}

      {draft.currentStep === "allocation" ? (
        <AllocationStep
          draft={draft}
          summary={assignmentSummary}
          categoryLabelsValid={categoryLabelsValid}
          headingRef={headingRef}
          onChange={setDraft}
          onBack={() => goToStep("accounts")}
          onContinue={() => goToStep("stress")}
        />
      ) : null}

      {draft.currentStep === "stress" ? (
        <StressStep
          draft={draft}
          headingRef={headingRef}
          onChange={setDraft}
          onBack={() => goToStep("allocation")}
          onContinue={(reviewedDraft) =>
            setDraft(withStep(reviewedDraft, "rule"))
          }
        />
      ) : null}

      {draft.currentStep === "rule" ? (
        <RuleStep
          draft={draft}
          headingRef={headingRef}
          onChange={setDraft}
          onBack={() => goToStep("stress")}
          onContinue={() => goToStep("result")}
        />
      ) : null}

      {draft.currentStep === "result" ? (
        <ResultStep
          draft={draft}
          summary={assignmentSummary}
          headingRef={headingRef}
          onEdit={goToStep}
          onReset={reset}
        />
      ) : null}
    </section>
  )
}
