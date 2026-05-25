const levels = [
  {
    label: "OSOBNO",
    copy: "Urediti vlastiti sustav odluka.",
    image: "/images/stone-symbols/audience-personal.webp",
  },
  {
    label: "OBITELJSKI",
    copy: "Uskladiti vrijednosti i pravila u kući.",
    image: "/images/stone-symbols/audience-family.webp",
  },
  {
    label: "POSLOVNO",
    copy: "Integrirati Bitcoin u poslovni kontekst.",
    image: "/images/stone-symbols/audience-business.webp",
  },
]

export function ThreeLevelsSection() {
  return (
    <section className="editorial-section editorial-levels-section three-levels-section">
      <div className="three-levels-header">
        <h2>Tri razine. Jedan princip.</h2>
        <p className="three-levels-subtitle">
          Isti okvir odluka prilagođava se osobi, obitelji ili poslovnom
          kontekstu.
        </p>
      </div>

      <div className="three-levels-frieze">
        {levels.map(({ copy, image, label }, index) => (
          <article key={label} className="three-levels-item">
            <img
              className="three-levels-stone-image"
              src={image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <div>
              <h3 className="three-levels-label">{label}</h3>
              <p className="three-levels-copy">{copy}</p>
            </div>
            {index < levels.length - 1 ? (
              <span className="three-levels-separator" aria-hidden="true" />
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
