import { ArrowUpRight } from "lucide-react"

import { guideHref, guides } from "@/content/guides"
import { estimateGuideReadingMinutes } from "@/utils/readingTime"

export function GuideCardsGrid({
  showReadingTime = false,
}: {
  showReadingTime?: boolean
}) {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {guides.map((guide) => (
        <a
          key={guide.slug}
          href={guideHref(guide.slug)}
          className="program-card group block hover:border-primary/50 hover:text-foreground"
        >
          <h3 className="flex items-start justify-between gap-4">
            <span>{guide.title}</span>
            <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
          </h3>
          {showReadingTime ? (
            <p className="mt-3 text-sm leading-6 font-semibold text-muted-foreground">
              Vrijeme čitanja: {estimateGuideReadingMinutes(guide)} min
            </p>
          ) : null}
          <p>{guide.excerpt}</p>
        </a>
      ))}
    </div>
  )
}
