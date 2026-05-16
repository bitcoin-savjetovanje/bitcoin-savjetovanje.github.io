import { BriefcaseBusiness, UserRound, UsersRound } from "lucide-react"

const levels = [
  {
    title: "Osobno",
    copy: "Urediti vlastiti sustav odluka.",
    icon: UserRound,
  },
  {
    title: "Obiteljski",
    copy: "Uskladiti vrijednosti i pravila u kući.",
    icon: UsersRound,
  },
  {
    title: "Poslovno",
    copy: "Integrirati Bitcoin u poslovni kontekst.",
    icon: BriefcaseBusiness,
  },
]

export function ThreeLevelsSection() {
  return (
    <section className="section-shell three-levels-section">
      <h2>Tri razine. Jedan princip.</h2>
      <div className="three-levels-grid" aria-label="Tri razine primjene">
        {levels.map((level) => {
          const Icon = level.icon

          return (
            <article key={level.title} className="three-level-item">
              <Icon className="size-7" aria-hidden="true" />
              <div>
                <h3>{level.title}</h3>
                <p>{level.copy}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
