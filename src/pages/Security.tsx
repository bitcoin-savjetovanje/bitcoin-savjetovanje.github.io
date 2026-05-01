import { CalendarDays, Check, X } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { securityRoute } from "@/content/routes"
import {
  neverAskItems,
  notDoingSecurityItems,
  securityReviewItems,
} from "@/content/security"
import { BOOKING_URL, PRIMARY_CTA } from "@/content/site"

function SecurityList({
  items,
  icon,
}: {
  items: string[]
  icon: "check" | "x"
}) {
  const Icon = icon === "check" ? Check : X
  const iconClass = icon === "check" ? "positive-icon" : "negative-icon"

  return (
    <div className="mt-6 grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="not-for-row bg-background/70">
          <Icon className={`${iconClass} size-3.5`} />
          <p>{item}</p>
        </div>
      ))}
    </div>
  )
}

export function Security() {
  return (
    <>
      <Seo
        title={securityRoute.title}
        description={securityRoute.description}
        canonical={securityRoute.canonical}
        ogType={securityRoute.ogType}
        schema={securityRoute.schema as object}
      />
      <article className="section-shell">
        <nav
          aria-label="Breadcrumb"
          className="text-sm font-medium text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <a href="/" className="hover:text-primary">
                Početna
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              Sigurnost i povjerljivost
            </li>
          </ol>
        </nav>

        <header className="mt-8 max-w-4xl">
          <h1 className="font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Sigurnost i povjerljivost
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
            Sigurnost je dio osobnog Bitcoin standarda. Cilj je da Bitcoin
            ostane pod vašom kontrolom, ali da sustav ne ovisi samo o vama.
          </p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Nikada ne tražim</h2>
            <SecurityList items={neverAskItems} icon="x" />
          </section>
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Što možemo proći</h2>
            <SecurityList items={securityReviewItems} icon="check" />
          </section>
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Što ne radim</h2>
            <SecurityList items={notDoingSecurityItems} icon="x" />
          </section>
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Povjerljivost</h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Razgovori su povjerljivi. Ne objavljujem osobne podatke,
              financijsku situaciju ni pojedinosti razgovora. Za rad nije
              potrebno dijeliti početne riječi za oporavak, privatne ključeve,
              lozinke ili pristup računima.
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-border/80 bg-foreground p-6 text-background shadow-sm sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <h2 className="max-w-3xl text-3xl leading-tight font-semibold">
              Želite urediti sigurnosni okvir bez predaje kontrole?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-background/72">
              Uvodni razgovor traje 15 minuta, bez naknade i bez obveze.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="cta-primary mt-6 w-full rounded-full px-5 text-center sm:w-auto sm:px-6 lg:mt-0"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="justify-center"
              data-cta="security-booking"
            >
              <CalendarDays className="size-4" />
              {PRIMARY_CTA}
            </a>
          </Button>
        </div>
      </article>
    </>
  )
}
