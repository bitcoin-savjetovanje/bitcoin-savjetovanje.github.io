import { ArrowUpRight } from "lucide-react"

import { featuredGuides, guideHref, guides, type Guide } from "@/content/guides"
import { estimateGuideReadingMinutes } from "@/utils/readingTime"

function GuideVisualPreview({ guide }: { guide: Guide }) {
  const type = guide.visual?.type ?? "sequence"

  return (
    <div
      className="mb-5 flex h-14 items-center gap-2 rounded-xl border border-border/70 bg-background/70 px-3 text-muted-foreground"
      aria-hidden="true"
    >
      {type === "trend" ? (
        <svg viewBox="0 0 120 32" className="h-8 w-full text-primary">
          <path
            d="M6 25 C32 24 45 12 67 15 C88 18 95 7 114 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ) : type === "thirds" ? (
        <div className="grid w-full grid-cols-3 gap-2">
          {[1, 2, 3].map((item) => (
            <span
              key={item}
              className="h-8 rounded-md border border-primary/25 bg-primary/10"
            />
          ))}
        </div>
      ) : type === "split" ? (
        <div className="grid w-full grid-cols-2 gap-2">
          <span className="h-8 rounded-md border border-border/80 bg-card" />
          <span className="h-8 rounded-md border border-primary/25 bg-primary/10" />
        </div>
      ) : type === "safety" ? (
        <div className="mx-auto grid size-10 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
          <span className="text-sm font-semibold">✓</span>
        </div>
      ) : (
        <div className="flex w-full items-center justify-between gap-2">
          {[1, 2, 3].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-primary" />
              {item < 3 ? <span className="h-px w-8 bg-border" /> : null}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export function GuideCardsGrid({
  items,
  showReadingTime = false,
}: {
  items?: Guide[]
  showReadingTime?: boolean
}) {
  const guideItems =
    items ?? (featuredGuides.length > 0 ? featuredGuides : guides)

  return (
    <ul className="mt-12 grid list-none gap-4 md:grid-cols-2 xl:grid-cols-3">
      {guideItems.map((guide) => (
        <li key={guide.slug}>
          <article className="program-card group h-full transition-colors hover:border-primary/50">
            <GuideVisualPreview guide={guide} />
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {guide.category}
            </p>
            <h3 className="flex items-start justify-between gap-4">
              <a
                href={guideHref(guide.slug)}
                className="text-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
              >
                {guide.title}
              </a>
              <ArrowUpRight
                className="mt-1 size-4 shrink-0 text-muted-foreground group-hover:text-primary"
                aria-hidden="true"
              />
            </h3>{" "}
            <p className="mt-3 text-sm leading-6 font-semibold text-muted-foreground">
              {showReadingTime
                ? `Vrijeme čitanja: ${estimateGuideReadingMinutes(guide)} min`
                : `${estimateGuideReadingMinutes(guide)} min čitanja`}
            </p>{" "}
            <p>{guide.excerpt}</p>
          </article>
        </li>
      ))}
    </ul>
  )
}
