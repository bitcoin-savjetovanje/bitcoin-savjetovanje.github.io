import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { methodSteps } from "@/content/method"
import { PRACTICAL_BITCOIN_STANDARD_URL } from "@/content/site"

export function MethodSection() {
  return (
    <section id="metoda" className="section-shell">
      <SectionHeader
        title="Metoda iza savjetovanja: Practical Bitcoin Standard"
        copy="Ne prolazimo teoriju Bitcoina. Uzimamo praktičan okvir i primjenjujemo ga na vašu stvarnu situaciju: budžet, dug, neto imovinu, sigurnost i pravila odlučivanja."
        align="center"
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {methodSteps.map((step, index) => (
          <article key={step.title} className="program-card">
            <span className="text-sm font-semibold text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3">{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
      <div className="program-summary space-y-4">
        <p>
          Practical Bitcoin Standard je maksimalistički okvir za one koji žele
          ići prema punijem Bitcoin standardu. Savjetovanje ne znači da svaka
          osoba mora završiti na istoj razini izloženosti. Cilj je razumjeti
          gdje ste sada, koliko daleko želite ići, te koja pravila imaju smisla
          za vaš budžet, dug, obitelj, sigurnost i neto imovinu.
        </p>
        <p className="text-sm leading-7 font-medium">
          Priručnik je otvoren projekt u razvoju. Savjetovanje se ne oslanja na
          kratkoročna predviđanja cijene, nego na budžet, neto imovinu,
          sigurnost i pravila odlučivanja.
        </p>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-border/80 bg-background/70"
        >
          <a
            href={PRACTICAL_BITCOIN_STANDARD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pročitajte Practical Bitcoin Standard
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </div>
    </section>
  )
}
