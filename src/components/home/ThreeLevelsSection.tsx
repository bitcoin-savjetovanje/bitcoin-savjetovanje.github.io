import { Briefcase, User, Users } from "lucide-react"

const levels = [
  {
    label: "OSOBNO",
    copy: "Urediti vlastiti sustav odluka.",
    Icon: User,
  },
  {
    label: "OBITELJSKI",
    copy: "Uskladiti vrijednosti i pravila u kući.",
    Icon: Users,
  },
  {
    label: "POSLOVNO",
    copy: "Integrirati Bitcoin u poslovni kontekst.",
    Icon: Briefcase,
  },
]

export function ThreeLevelsSection() {
  return (
    <section className="editorial-section editorial-levels-section">
      <h2>Tri razine. Jedan princip.</h2>
      <div className="editorial-levels-grid">
        {levels.map(({ Icon, copy, label }, index) => (
          <article key={label} className="editorial-level-item">
            <Icon className="editorial-level-icon" aria-hidden="true" />
            <div>
              <h3>{label}</h3>
              <p>{copy}</p>
            </div>
            {index < levels.length - 1 ? (
              <span className="editorial-level-separator" aria-hidden="true" />
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
