import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { stressTestCards } from "@/content/home"
import { BOOKING_URL } from "@/content/site"

export function StressTestSection() {
  return (
    <section id="provjera" className="section-shell">
      <SectionHeader
        title="Bitcoin standard se vidi kad dođe pritisak."
        copy="Ne vidi se samo po tome koliko Bitcoina imate. Vidi se po tome znate li što napraviti kada se promijeni cijena, trošak ili životna okolnost."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {stressTestCards.map((card) => (
          <article key={card.title} className="value-card bg-card">
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
          </article>
        ))}
      </div>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
        data-cta="stress-test-intro-call"
      >
        Provjerite gdje ste
        <ArrowUpRight className="size-4" />
      </a>
    </section>
  )
}
