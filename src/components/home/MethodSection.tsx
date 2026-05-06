import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { methodSteps } from "@/content/method"
import { PRACTICAL_BITCOIN_STANDARD_URL } from "@/content/site"

export function MethodSection() {
  return (
    <section id="metoda" className="section-shell">
      <SectionHeader
        title="Praktični Bitcoin standard ima redoslijed."
        copy="Ne počinje pitanjem koliko Bitcoina kupiti. Počinje pitanjem ima li vaš novac pravila."
        align="center"
      />
      <ol className="mx-auto mt-12 grid max-w-5xl gap-3">
        {methodSteps.map((step, index) => (
          <li
            key={step.title}
            className="grid gap-3 rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:grid-cols-[3.5rem_1fr] sm:items-start sm:p-5"
          >
            <span className="grid size-11 place-items-center rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-primary">
              {index + 1}
            </span>
            <div>
              <h3 className="text-xl leading-tight font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-muted-foreground">
                {step.copy}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="program-summary space-y-4">
        <p>
          Praktični Bitcoin standard nije teorija o cijeni. To je redoslijed za
          stvarni život: osobni proračun nulte osnove, život bez duga, davanje,
          Bitcoin kao novac, usklađivanje kupovne moći i ravnoteža neto imovine.
        </p>
        <p className="text-sm leading-7 font-medium">
          Cilj nije savršena teorija, nego osobni standard koji možete koristiti
          kada kupujete, čekate, trošite ili preispitujete Bitcoin.
        </p>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-border/80 bg-background/70"
        >
          <a
            href={PRACTICAL_BITCOIN_STANDARD_URL}
            className="w-full justify-center text-center sm:w-auto"
            data-link="practical-bitcoin-standard"
          >
            Pročitajte Praktični Bitcoin standard
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </div>
    </section>
  )
}
