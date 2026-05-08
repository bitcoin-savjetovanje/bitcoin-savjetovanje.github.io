import { CalendarDays } from "lucide-react"

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

export function BeforeAfterSection() {
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

        <ul className="before-after-grid">
          {scenarios.map((scenario) => (
            <li key={scenario.title}>
              <article className="before-after-card">
                <h3>{scenario.title}</h3>
                <div className="before-after-card__columns">
                  <div>
                    <p className="before-after-card__label">
                      Bez osobnog okvira
                    </p>
                    <p>{scenario.without}</p>
                  </div>
                  <div>
                    <p className="before-after-card__label">
                      S osobnim okvirom
                    </p>
                    <p>{scenario.with}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

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
