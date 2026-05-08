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
              zatim davanje, zatim Bitcoin kao novac, neto imovina, sigurnost i
              obitelj.
            </>
          }
        />
        <ol className="mt-8 grid list-decimal gap-2 pl-5 sm:grid-cols-2 xl:grid-cols-3">
          {methodPathSteps.map((step) => (
            <li key={step} className="pl-1">
              <span className="inline-flex rounded-full border border-border/80 bg-background/80 px-3 py-2 text-sm font-semibold text-foreground shadow-sm">
                {step}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl text-base leading-8 font-semibold text-foreground">
          Ne pokušavamo pogoditi cijenu. Učimo kako cijena utječe na vaš
          proračun, odluke i mir.
        </p>
      </div>
    </section>
  )
}
