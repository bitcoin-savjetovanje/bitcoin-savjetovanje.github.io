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
          <h1 className="mt-4 font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Vodiči za osobni Bitcoin standard
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
            Ako želite razumjeti okvir, čitajte vodiče. Ako ga želite
            primijeniti na svoju situaciju, rezervirajte razgovor.
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Vodiči prate redoslijed Praktičnog Bitcoin standarda: osobni
            proračun, život bez duga, darivanje, Bitcoin kao novac, kupovna moć
            i neto imovina.
          </p>
        </header>

        <GuideCardsGrid showReadingTime />

        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border/80 bg-card p-6 text-center shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Želite primijeniti okvir na svoju situaciju?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Vodiči pomažu razjasniti pojmove. Osobni Bitcoin standard nastaje
            tek kada se primijeni na vaš proračun, dug, kupovnu moć, neto
            imovinu i sigurnosni model.
          </p>
          <Button
            asChild
            className="cta-primary mt-6 w-full rounded-full sm:w-auto"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="justify-center text-center"
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
