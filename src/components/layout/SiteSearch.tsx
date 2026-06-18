import {
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"
import { Loader2, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { SearchEntry } from "@/content/search"

type LoadState = "idle" | "loading" | "ready" | "error"

type IndexedSearchEntry = SearchEntry & {
  normalizedTitle: string
  normalizedCategory: string
  normalizedDescription: string
  normalizedKeywords: string
  normalizedHref: string
  normalizedText: string
}

type SiteSearchProps = {
  onOpen?: () => void
}

const EMPTY_QUERY_LIMIT = 6
const QUERY_RESULT_LIMIT = 8

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("hr-HR")
    .replace(/[đĐ]/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{Letter}\p{Number}\s/-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function indexEntry(entry: SearchEntry): IndexedSearchEntry {
  const normalizedTitle = normalizeSearchText(entry.title)
  const normalizedCategory = normalizeSearchText(entry.category)
  const normalizedDescription = normalizeSearchText(entry.description)
  const normalizedKeywords = normalizeSearchText(entry.keywords)
  const normalizedHref = normalizeSearchText(entry.href)

  return {
    ...entry,
    normalizedTitle,
    normalizedCategory,
    normalizedDescription,
    normalizedKeywords,
    normalizedHref,
    normalizedText: [
      normalizedTitle,
      normalizedCategory,
      normalizedDescription,
      normalizedKeywords,
      normalizedHref,
    ].join(" "),
  }
}

function scoreEntry(
  entry: IndexedSearchEntry,
  normalizedQuery: string,
  tokens: string[]
) {
  let score = 0

  for (const token of tokens) {
    if (!entry.normalizedText.includes(token)) {
      return 0
    }

    if (entry.normalizedTitle.startsWith(token)) {
      score += 14
    } else if (entry.normalizedTitle.includes(token)) {
      score += 9
    }

    if (entry.normalizedCategory.includes(token)) {
      score += 4
    }

    if (entry.normalizedDescription.includes(token)) {
      score += 3
    }

    if (entry.normalizedKeywords.includes(token)) {
      score += 1
    }

    if (entry.normalizedHref.includes(token)) {
      score += 2
    }
  }

  if (entry.normalizedTitle === normalizedQuery) {
    score += 20
  } else if (entry.normalizedTitle.includes(normalizedQuery)) {
    score += 8
  }

  return score
}

function searchEntries(entries: IndexedSearchEntry[], query: string) {
  const normalizedQuery = normalizeSearchText(query)

  if (!normalizedQuery) {
    return entries.slice(0, EMPTY_QUERY_LIMIT)
  }

  const tokens = normalizedQuery.split(" ").filter(Boolean)

  return entries
    .map((entry, index) => ({
      entry,
      index,
      score: scoreEntry(entry, normalizedQuery, tokens),
    }))
    .filter((result) => result.score > 0)
    .sort((first, second) => {
      if (first.score !== second.score) {
        return second.score - first.score
      }

      return first.index - second.index
    })
    .slice(0, QUERY_RESULT_LIMIT)
    .map((result) => result.entry)
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  const tagName = target.tagName.toLowerCase()

  return (
    target.isContentEditable ||
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select"
  )
}

function resultCountLabel(count: number) {
  if (count === 1) {
    return "1 rezultat"
  }

  if (count >= 2 && count <= 4) {
    return `${count} rezultata`
  }

  return `${count} rezultata`
}

export function SiteSearch({ onOpen }: SiteSearchProps) {
  const searchId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const loadPromiseRef = useRef<Promise<void> | null>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)
  const [entries, setEntries] = useState<SearchEntry[]>([])
  const [loadState, setLoadState] = useState<LoadState>("idle")

  const loadEntries = useCallback(() => {
    if (loadPromiseRef.current) {
      return
    }

    setLoadState((current) => (current === "ready" ? current : "loading"))

    loadPromiseRef.current = import("@/content/search")
      .then((module) => {
        setEntries(module.searchEntries)
        setLoadState("ready")
      })
      .catch(() => {
        loadPromiseRef.current = null
        setLoadState("error")
      })
  }, [])

  const openSearch = useCallback(() => {
    setOpen(true)
    onOpen?.()
    loadEntries()
  }, [loadEntries, onOpen])

  const closeSearch = useCallback(() => {
    setOpen(false)
  }, [])

  const indexedEntries = useMemo(
    () => entries.map((entry) => indexEntry(entry)),
    [entries]
  )
  const results = useMemo(
    () => searchEntries(indexedEntries, deferredQuery),
    [deferredQuery, indexedEntries]
  )
  const hasQuery = normalizeSearchText(deferredQuery).length > 0
  const panelId = `${searchId}-panel`
  const inputId = `${searchId}-input`
  const statusId = `${searchId}-status`

  useEffect(() => {
    if (!open) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus()
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [open])

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        event.preventDefault()
        closeSearch()
        buttonRef.current?.focus()
        return
      }

      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLocaleLowerCase("hr-HR") === "k"
      ) {
        event.preventDefault()
        openSearch()
        return
      }

      if (event.key === "/" && !isTypingTarget(event.target)) {
        event.preventDefault()
        openSearch()
      }
    }

    window.addEventListener("keydown", handleKeydown)

    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [closeSearch, open, openSearch])

  useEffect(() => {
    if (!open) {
      return
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return
      }

      closeSearch()
    }

    document.addEventListener("pointerdown", handlePointerDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [closeSearch, open])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const firstResult = results[0]

    if (!firstResult) {
      return
    }

    window.location.assign(firstResult.href)
  }

  return (
    <div className="site-search">
      <Button
        ref={buttonRef}
        type="button"
        variant="outline"
        size="icon"
        className="site-search__trigger"
        aria-label="Pretraži stranicu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (open) {
            closeSearch()
            return
          }

          openSearch()
        }}
      >
        <Search className="size-4" />
      </Button>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          className="site-search__panel"
          role="search"
          aria-label="Pretraga stranice"
        >
          <form className="site-search__form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor={inputId}>
              Pretražite vodiče i stranice
            </label>
            <div className="site-search__field">
              <Search className="site-search__field-icon size-4" />
              <input
                ref={inputRef}
                id={inputId}
                className="site-search__input"
                type="search"
                value={query}
                placeholder="Pretražite vodiče i stranice"
                autoComplete="off"
                aria-describedby={statusId}
                onFocus={loadEntries}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query ? (
                <button
                  type="button"
                  className="site-search__clear"
                  aria-label="Obriši pretragu"
                  onClick={() => {
                    setQuery("")
                    inputRef.current?.focus()
                  }}
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </div>
          </form>

          <p id={statusId} className="site-search__status" aria-live="polite">
            {hasQuery ? resultCountLabel(results.length) : "Preporučeno"}
          </p>

          {loadState === "loading" && entries.length === 0 ? (
            <div className="site-search__state">
              <Loader2 className="size-4 animate-spin" />
              Učitavanje pretrage...
            </div>
          ) : null}

          {loadState === "error" ? (
            <div className="site-search__state site-search__state--error">
              <p>Pretraga se nije učitala.</p>
              <button type="button" onClick={loadEntries}>
                Pokušajte ponovno
              </button>
            </div>
          ) : null}

          {loadState !== "error" && entries.length > 0 ? (
            results.length > 0 ? (
              <ul className="site-search__results">
                {results.map((result) => (
                  <li key={`${result.kind}-${result.href}`}>
                    <a
                      className="site-search__result"
                      href={result.href}
                      onClick={closeSearch}
                    >
                      <span className="site-search__result-top">
                        <span className="site-search__result-title">
                          {result.title}
                        </span>
                        <span className="site-search__result-kind">
                          {result.kind}
                        </span>
                      </span>
                      <span className="site-search__result-description">
                        {result.description}
                      </span>
                      <span className="site-search__result-category">
                        {result.category}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="site-search__state">
                Nema rezultata za upisanu pretragu.
              </div>
            )
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
