import { CalendarDays } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { CONVERSATION_PATH } from "@/content/site"

const scenarios = [
  {
    title: "Pad cijene",
    without: "Pad cijene pokreće paniku, odgađanje ili pokušaj pogađanja dna.",
    with: "Pad cijene pokreće provjeru troškova, duga, sigurnosne zalihe i budućih plaćanja.",
  },
  {
    title: "Rast cijene",
    without: "Rast cijene pokreće euforiju i neplaniranu potrošnju.",
    with: "Rast cijene pokreće provjeru ciljeva, davanja, neto imovine i sigurnosti.",
  },
  {
    title: "Dug",
    without: "Dug odlučuje umjesto vas kada pritisak naraste.",
    with: "Dug je vidljiv u pravilima i ne skriva se iza optimizma.",
  },
  {
    title: "Obitelj",
    without:
      "Obitelj zna da Bitcoin postoji, ali ne zna što smije ili ne smije napraviti.",
    with: "Obitelj ima jasne upute bez predaje seed phrase ili privatnih ključeva.",
  },
  {
    title: "Sigurnost",
    without: "Sigurnost ovisi o jednoj osobi, uređaju ili papiru.",
    with: "Postoji plan oporavka bez predaje kontrole.",
  },
] as const

type Mode = "without" | "with"

export function BeforeAfterSection() {
  const [mode, setMode] = useState<Mode>("without")
  const heading =
    mode === "without" ? "Bez osobnog okvira" : "S osobnim okvirom"

  return (
    <section className="section-shell">
      <div className="case-panel">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Osobni okvir
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            Što se mijenja kada postoji osobni okvir?
          </h2>
        </div>

        <div
          className="mt-8 inline-flex rounded-full border border-border bg-background p-1"
          role="tablist"
          aria-label="Usporedba osobnog okvira"
        >
          {[
            { value: "without" as const, label: "Bez osobnog okvira" },
            { value: "with" as const, label: "S osobnim okvirom" },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              className="framework-tab"
              role="tab"
              aria-selected={mode === tab.value}
              onClick={() => setMode(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold">{heading}</h3>
          <ul className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {scenarios.map((scenario) => (
              <li key={scenario.title}>
                <article className="program-card h-full bg-background/70">
                  <h4>{scenario.title}</h4>
                  <p>{mode === "without" ? scenario.without : scenario.with}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <Button asChild className="cta-primary mt-8 rounded-full">
          <a
            href={CONVERSATION_PATH}
            className="justify-center text-center"
            data-cta="before-after-intro-call"
          >
            <CalendarDays className="size-4" />
            Razjasnite vlastitu situaciju
          </a>
        </Button>
      </div>
    </section>
  )
}
