import type { ReactNode } from "react"

import { SAIFEDEAN_AMMOUS_URL } from "@/content/site"

const SAIFEDEAN_INSTRUMENTAL = "Saifedeanom Ammousom"
const SAIFEDEAN_NOMINATIVE = "Saifedean Ammous"

type SaifedeanAmmousReferenceProps = {
  grammaticalCase?: "instrumental" | "nominative"
}

export function SaifedeanAmmousReference({
  grammaticalCase = "instrumental",
}: SaifedeanAmmousReferenceProps) {
  const isInstrumental = grammaticalCase === "instrumental"

  return (
    <>
      <a
        href={SAIFEDEAN_AMMOUS_URL}
        className="saifedean-reference-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {isInstrumental ? SAIFEDEAN_INSTRUMENTAL : SAIFEDEAN_NOMINATIVE}
        <span className="sr-only"> (otvara se u novoj kartici)</span>
      </a>
      {isInstrumental
        ? ", autorom knjige The Bitcoin Standard, svjetski najpoznatije knjige o monetarnoj ekonomiji Bitcoina"
        : ", autor knjige The Bitcoin Standard, svjetski najpoznatije knjige o monetarnoj ekonomiji Bitcoina"}
    </>
  )
}

// This renderer intentionally shares the exact linked reference copy with the
// component above; it is a render helper, not component state.
// eslint-disable-next-line react-refresh/only-export-components
export function renderSaifedeanAmmousReference(text: string): ReactNode {
  const instrumentalIndex = text.indexOf(SAIFEDEAN_INSTRUMENTAL)
  const nominativeIndex = text.indexOf(SAIFEDEAN_NOMINATIVE)
  const isInstrumental = instrumentalIndex >= 0
  const matchIndex = isInstrumental ? instrumentalIndex : nominativeIndex

  if (matchIndex < 0) {
    return text
  }

  const match = isInstrumental ? SAIFEDEAN_INSTRUMENTAL : SAIFEDEAN_NOMINATIVE
  const before = text.slice(0, matchIndex)
  const after = text.slice(matchIndex + match.length)
  const needsCommaBeforeContinuation = after.startsWith(" ")

  return (
    <>
      {before}
      <SaifedeanAmmousReference
        grammaticalCase={isInstrumental ? "instrumental" : "nominative"}
      />
      {needsCommaBeforeContinuation ? "," : null}
      {after}
    </>
  )
}
