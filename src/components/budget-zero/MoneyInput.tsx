import { useId, useState } from "react"

import { parseEuroToEuros } from "@/lib/budgetZero"

const inputFormatter = new Intl.NumberFormat("hr-HR", {
  maximumFractionDigits: 0,
})

function formatInputValue(euros: number) {
  return inputFormatter.format(euros)
}

type MoneyInputProps = {
  id?: string
  label: string
  valueEuros: number
  onValueChange: (valueEuros: number) => void
  onValidityChange?: (isValid: boolean) => void
  emptyIsZero?: boolean
  hint?: string
  disabled?: boolean
  className?: string
}

export function MoneyInput({
  id,
  label,
  valueEuros,
  onValueChange,
  onValidityChange,
  emptyIsZero = false,
  hint,
  disabled = false,
  className = "",
}: MoneyInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`
  const [inputValue, setInputValue] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(true)
  const displayedValue =
    inputValue ??
    (emptyIsZero && valueEuros === 0 ? "" : formatInputValue(valueEuros))

  function reportValidity(nextValidity: boolean) {
    setIsValid(nextValidity)
    onValidityChange?.(nextValidity)
  }

  function handleChange(rawValue: string) {
    setInputValue(rawValue)

    if (rawValue.trim() === "") {
      if (emptyIsZero) {
        onValueChange(0)
        reportValidity(true)
      } else {
        reportValidity(false)
      }
      return
    }

    const parsedValue = parseEuroToEuros(rawValue)

    if (parsedValue === null) {
      reportValidity(false)
      return
    }

    onValueChange(parsedValue)
    reportValidity(true)
  }

  function handleBlur() {
    if (isValid) {
      setInputValue(null)
    }
  }

  const describedBy = [!isValid ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={`budget-zero-money-field ${className}`.trim()}>
      <label htmlFor={inputId}>{label}</label>
      <div className="budget-zero-money-field__control" data-invalid={!isValid}>
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          spellCheck={false}
          value={displayedValue}
          disabled={disabled}
          aria-invalid={!isValid}
          aria-describedby={describedBy || undefined}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={(event) => {
            event.currentTarget.select()
          }}
          onBlur={handleBlur}
        />
        <span aria-hidden="true">EUR</span>
      </div>
      {!isValid ? (
        <p id={errorId} className="budget-zero-field-error">
          Unesite cijeli nenegativan iznos, bez centi.
        </p>
      ) : hint ? (
        <p id={hintId} className="budget-zero-field-hint">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
