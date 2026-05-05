import { CalendarDays, CircleHelp } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { standardCheckQuestions } from "@/content/method"
import { BOOKING_URL, PRIMARY_CTA } from "@/content/site"

export function StandardCheckSection() {
  return (
    <section id="provjera" className="section-shell">
      <div className="case-panel">
        <SectionHeader
          title="Koliko je vaš Bitcoin standard stvaran?"
          copy="Ako ste na dva ili više pitanja zastali, provjera ima smisla."
          align="center"
        />
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {standardCheckQuestions.map((question, index) => (
            <div
              key={question}
              className="flex gap-3 rounded-xl border border-border/80 bg-background/70 p-4 shadow-sm"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-base leading-7 font-medium text-foreground">
                {question}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-primary/25 bg-primary/10 p-5 sm:flex-row sm:items-center">
          <div className="flex gap-3">
            <CircleHelp className="mt-1 size-5 shrink-0 text-primary" />
            <p className="max-w-2xl text-base leading-7 font-semibold text-foreground">
              Provjera nije ispit znanja. Cilj je vidjeti koja pravila treba
              zapisati prije sljedećeg tržišnog ili životnog stresa.
            </p>
          </div>
          <Button asChild className="cta-primary w-full rounded-full sm:w-auto">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="justify-center text-center"
              data-cta="test-standard-check"
            >
              <CalendarDays className="size-4" />
              {PRIMARY_CTA}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
