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
        copy="Praktični Bitcoin standard ima redoslijed: osobni proračun, život bez duga, darivanje, Bitcoin kao novac, usklađivanje kupovne moći i ravnoteža neto imovine."
        align="center"
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {methodSteps.map((step, index) => (
          <article key={step.title} className="program-card">
            <span className="text-sm font-semibold text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3">{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
      <div className="program-summary space-y-4">
        <p>
          Praktični Bitcoin standard nije teorija o cijeni. To je redoslijed za
          stvarni život: osobni proračun, život bez duga, darivanje, Bitcoin kao
          novac, usklađivanje kupovne moći i ravnoteža neto imovine.
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
            target="_blank"
            rel="noopener noreferrer"
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
