import { SectionHeader } from "@/components/layout/SectionHeader"
import { situationExamples } from "@/content/method"

export function SituationsSection() {
  return (
    <section className="section-shell">
      <SectionHeader
        title="Primjeri situacija"
        copy="Ovo nisu univerzalna pravila ni primjeri stvarnih klijenata. Ovo su tipične situacije u kojima osobni Bitcoin okvir može pomoći."
        align="center"
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {situationExamples.map((item) => (
          <article key={item.title} className="value-card">
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
