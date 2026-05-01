import { Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { qualificationQuestions } from "@/content/method"

export function QualificationSection() {
  return (
    <section className="section-shell section-muted">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1fr] lg:items-start">
        <SectionHeader
          title="Prije poziva"
          copy="Ne trebate pripremiti savršene brojke. Dovoljno je znati ovo:"
        />
        <div className="grid gap-3">
          {qualificationQuestions.map((question) => (
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
