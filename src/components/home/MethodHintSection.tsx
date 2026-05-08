import { SectionHeader } from "@/components/layout/SectionHeader"
import { methodPathSteps } from "@/content/home"

export function MethodHintSection() {
  return (
    <section id="metoda" className="section-shell section-muted">
      <div className="case-panel border-primary/20 bg-card">
        <SectionHeader
          title="Ako nastavimo dublje, koristim okvir Praktičnog Bitcoin standarda."
          copy={
            <>
              Praktični Bitcoin standard je radni okvir iza mog savjetovanja. Ne
              morate ga poznavati prije razgovora.
              <br />
              <br />
              Okvir je jednostavan: prvo red u novcu, zatim izlazak iz duga,
              zatim darivanje, zatim Bitcoin kao novac, neto imovina, sigurnost
              i obitelj.
            </>
          }
        />
        <div
          className="mt-8 flex flex-wrap items-center gap-2"
          aria-label="Redoslijed metode: red u novcu, život bez duga, davanje, Bitcoin kao novac, neto imovina, sigurnost i obitelj"
        >
          {methodPathSteps.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-border/80 bg-background/80 px-3 py-2 text-sm font-semibold text-foreground shadow-sm">
                {step}
              </span>
              {index < methodPathSteps.length - 1 ? (
                <span className="text-sm text-muted-foreground" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-base leading-8 font-semibold text-foreground">
          Ne pokušavamo pogoditi cijenu. Učimo kako cijena utječe na vaš
          proračun, odluke i mir.
        </p>
      </div>
    </section>
  )
}
