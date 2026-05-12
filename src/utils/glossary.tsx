import type { ReactNode } from "react"

import { InlineGlossaryTerm } from "@/components/guides/GlossaryTerm"
import { glossaryTerms, type GlossaryTerm } from "@/content/glossary"

type GlossaryMatch = {
  end: number
  index: number
  text: string
  term: GlossaryTerm
}

const MAX_GLOSSARY_TERMS_PER_TEXT = 3
const WORD_BOUNDARY = String.raw`\p{L}\p{N}_-`

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function findFirstTermMatch(text: string, term: GlossaryTerm) {
  const variants = [...term.terms].sort((a, b) => b.length - a.length)

  return variants.reduce<GlossaryMatch | null>((bestMatch, variant) => {
    const pattern = new RegExp(
      `(^|[^${WORD_BOUNDARY}])(${escapeRegExp(variant)})(?![${WORD_BOUNDARY}])`,
      "iu"
    )
    const match = pattern.exec(text)

    if (!match || match.index === undefined || !match[2]) {
      return bestMatch
    }

    const prefixLength = match[1]?.length ?? 0
    const index = match.index + prefixLength
    const nextMatch = {
      index,
      end: index + match[2].length,
      text: match[2],
      term,
    }

    if (!bestMatch) {
      return nextMatch
    }

    if (nextMatch.index < bestMatch.index) {
      return nextMatch
    }

    if (
      nextMatch.index === bestMatch.index &&
      nextMatch.text.length > bestMatch.text.length
    ) {
      return nextMatch
    }

    return bestMatch
  }, null)
}

function matchesOverlap(first: GlossaryMatch, second: GlossaryMatch) {
  return first.index < second.end && second.index < first.end
}

function glossaryMatchesForText(text: string) {
  const matches = glossaryTerms
    .map((term) => findFirstTermMatch(text, term))
    .filter((match): match is GlossaryMatch => Boolean(match))
    .sort((a, b) => {
      if (a.index !== b.index) {
        return a.index - b.index
      }

      return b.text.length - a.text.length
    })

  const nonOverlappingMatches: GlossaryMatch[] = []

  for (const match of matches) {
    if (
      nonOverlappingMatches.some((selected) => matchesOverlap(selected, match))
    ) {
      continue
    }

    nonOverlappingMatches.push(match)
  }

  return nonOverlappingMatches
    .sort((a, b) => {
      const priorityDifference = (b.term.priority ?? 0) - (a.term.priority ?? 0)

      if (priorityDifference !== 0) {
        return priorityDifference
      }

      return a.index - b.index
    })
    .slice(0, MAX_GLOSSARY_TERMS_PER_TEXT)
    .sort((a, b) => a.index - b.index)
}

export function renderWithGlossary(text: string): ReactNode[] {
  const matches = glossaryMatchesForText(text)

  if (matches.length === 0) {
    return [text]
  }

  const nodes: ReactNode[] = []
  let cursor = 0

  matches.forEach((match) => {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index))
    }

    nodes.push(
      <InlineGlossaryTerm
        key={`${match.term.id}-${match.index}`}
        term={match.term}
      >
        {match.text}
      </InlineGlossaryTerm>
    )

    cursor = match.end
  })

  if (cursor < text.length) {
    nodes.push(text.slice(cursor))
  }

  return nodes
}
