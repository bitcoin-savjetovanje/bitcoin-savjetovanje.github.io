import { CalendarDays } from "lucide-react"

import { Seo } from "@/components/Seo"
import { GuideCardsGrid } from "@/components/guides/GuideCardsGrid"
import { Button } from "@/components/ui/button"
import { guidesIndexRoute } from "@/content/routes"
import { BOOKING_URL, PRIMARY_CTA } from "@/content/site"

export function GuidesIndex() {
  return (
    <>
      <Seo
        title={guidesIndexRoute.title}
        description={guidesIndexRoute.description}
        canonical={guidesIndexRoute.canonical}
        ogType={guidesIndexRoute.ogType}
        schema={guidesIndexRoute.schema as object}
      />
      <section className="section-shell">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Praktični Bitcoin standard
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight font-semibold tracking-[-0.025em] text-foreground sm:text-5xl">
            Vodiči za praktične Bitcoin odluke
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Kraći tekstovi koji prevode glavne ideje Praktičnog Bitcoin
            standarda u konkretne odluke: osobni proračun, dug, kupovnu moć,
            neto imovinu, skrbništvo, obiteljski pristup i pravila kroz vrijeme.
          </p>
        </header>

        <GuideCardsGrid showReadingTime />

        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border/80 bg-card p-6 text-center shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Želite primijeniti okvir na svoju situaciju?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Vodiči pomažu razjasniti pojmove, ali osobni okvir nastaje tek kada
            se primijeni na vaš osobni proračun, dug, kupovnu moć, neto imovinu
            i sigurnosni model.
          </p>
          <Button asChild className="cta-primary mt-6 rounded-full">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="guides-index-booking"
            >
              <CalendarDays className="size-4" />
              {PRIMARY_CTA}
            </a>
          </Button>
        </div>
      </section>
    </>
  )
}
