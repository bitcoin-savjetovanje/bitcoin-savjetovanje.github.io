import { useEffect, useId, useRef, useState } from "react"

import type { GlossaryTerm } from "@/content/glossary"

export function InlineGlossaryTerm({
  children,
  term,
}: {
  children: string
  term: GlossaryTerm
}) {
  const [open, setOpen] = useState(false)
  const termRef = useRef<HTMLSpanElement>(null)
  const tooltipId = useId()

  useEffect(() => {
    if (!open) {
      return
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!termRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeydown)
    document.addEventListener("pointerdown", handlePointerDown)

    return () => {
      document.removeEventListener("keydown", handleKeydown)
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [open])

  return (
    <span
      ref={termRef}
      className="glossary-term-wrap"
      data-open={open ? "true" : undefined}
    >
      <button
        type="button"
        className="glossary-term"
        aria-label={`Objasni pojam: ${term.title}`}
        aria-describedby={tooltipId}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {children}
      </button>
      <span id={tooltipId} role="tooltip" className="glossary-term__tooltip">
        <span className="glossary-term__title">{term.title}</span>
        <span className="glossary-term__description">{term.description}</span>
      </span>
    </span>
  )
}
