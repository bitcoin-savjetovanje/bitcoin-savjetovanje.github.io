import { StoneSymbol } from "@/components/home/StoneSymbol"

const levels = [
  {
    label: "OSOBNO",
    copy: "Urediti vlastiti sustav odluka.",
    imageSrc: "/images/stone-symbols/audience-personal.webp",
    fallbackSrc: "/images/medallions/12-proracun-i-plan.png",
    visualBrief:
      "Mali kameni pečat s urezanim simbolom jedne osobe; osobni sustav odluka.",
  },
  {
    label: "OBITELJSKI",
    copy: "Uskladiti vrijednosti i pravila u kući.",
    imageSrc: "/images/stone-symbols/audience-family.webp",
    fallbackSrc: "/images/medallions/27-obiteljski-trezor.png",
    visualBrief:
      "Mali kameni pečat s dvije ili tri jednostavne figure; obiteljska usklađenost.",
  },
  {
    label: "POSLOVNO",
    copy: "Integrirati Bitcoin u poslovni kontekst.",
    imageSrc: "/images/stone-symbols/audience-business.webp",
    fallbackSrc: "/images/medallions/11-kapital.png",
    visualBrief:
      "Mali kameni pečat s urezanim kovčegom, knjigom računa ili poslovnom riznicom.",
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
        {levels.map(({ copy, fallbackSrc, imageSrc, label }, index) => (
          <article key={label} className="three-levels-item">
            <StoneSymbol
              imageSrc={imageSrc}
              fallbackSrc={fallbackSrc}
              variant="frieze"
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
