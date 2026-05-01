import { Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { problemQuestions } from "@/content/method"

export function ProblemSection() {
  return (
    <section className="section-shell">
      <div className="case-panel">
        <SectionHeader
          title="Problem kod većine nije manjak informacija o Bitcoinu, nego nedostatak sustava upravljanja imovinom."
          copy="Vjerojatno već znate da je Bitcoin važan, ali i dalje ostaju pitanja koja ne može riješiti još jedan podcast, graf cijene, pa čak ni knjiga."
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {problemQuestions.map((question) => (
            <div key={question} className="check-row">
              <Check className="positive-icon mt-1 size-4" />
              <p>{question}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
