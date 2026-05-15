import { ChevronDown } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { homepageFaqs } from "@/content/faq"

export function FaqSection() {
  return (
    <section id="faq" className="section-shell">
      <SectionHeader title="Česta pitanja" align="center" />
      <div className="mx-auto mt-12 max-w-4xl divide-y divide-border/70 border-y border-border/70">
        {homepageFaqs.map((faq) => (
          <details key={faq.question} className="faq-item">
            <summary>
              <span>{faq.question}</span>
              <ChevronDown className="faq-item__icon size-5" />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
