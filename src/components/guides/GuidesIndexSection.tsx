import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { guides } from "@/content/guides"

export function GuidesIndexSection() {
  return (
    <section id="vodici" className="section-shell section-muted">
      <SectionHeader
        title="Vodiči za praktične Bitcoin odluke"
        copy="Kraći tekstovi koji prevode glavne ideje Practical Bitcoin Standarda u konkretne odluke: budžet, dug, neto imovina, skrbništvo i obiteljski pristup."
        align="center"
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {guides.map((guide) => (
          <a
            key={guide.slug}
            href={`/vodici/${guide.slug}`}
            className="program-card group block hover:border-primary/50 hover:text-foreground"
          >
            <h3 className="flex items-start justify-between gap-4">
              <span>{guide.title}</span>
              <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
            </h3>
            <p>{guide.excerpt}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
