import {
  ArrowUpRight,
  CalendarDays,
  Check,
  HeartHandshake,
  Landmark,
  LineChart,
  Scale,
  ShieldCheck,
  WalletCards,
} from "lucide-react"

import { CalBookingLink } from "@/components/CalBookingLink"
import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import {
  standardAreaSegments,
  type StandardArea,
  type StandardAreaVisualType,
} from "@/content/standardAreas"
import { PRIMARY_CTA } from "@/content/site"
import { cn } from "@/lib/utils"

function AreaIcon({ type }: { type: StandardAreaVisualType }) {
  const iconClassName = "size-9 text-primary"

  switch (type) {
    case "budget":
      return <WalletCards className={iconClassName} />
    case "debt":
      return <Scale className={iconClassName} />
    case "giving":
      return <HeartHandshake className={iconClassName} />
    case "assets":
      return <Landmark className={iconClassName} />
    case "power-law":
      return <LineChart className={iconClassName} />
    case "security":
      return <ShieldCheck className={iconClassName} />
  }
}

function StandardAreaVisual({ area }: { area: StandardArea }) {
  return (
    <div className="standard-area-visual" aria-hidden="true">
      <div className="relative z-10 flex h-full min-h-[15rem] flex-col justify-between gap-8">
        <div className="flex items-start justify-between gap-5">
          <div className="grid size-16 place-items-center rounded-2xl bg-primary/10">
            <AreaIcon type={area.visualType} />
          </div>
          <span className="font-display text-7xl leading-none font-semibold text-primary/20">
            {area.number}
          </span>
        </div>
        <div>
          <p className="text-xs leading-5 font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {area.shortTitle}
          </p>
          <div className="mt-4 grid gap-3">
            {area.bullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-start gap-2.5 rounded-xl bg-background/70 px-3 py-2 text-sm leading-6 font-medium text-foreground shadow-sm"
              >
                <Check className="positive-icon mt-1 size-3.5 shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StandardAreaBlock({
  area,
  reversed,
}: {
  area: StandardArea
  reversed: boolean
}) {
  return (
    <article
      className={cn(
        "standard-area-block",
        reversed && "standard-area-block--reverse"
      )}
    >
      <div className="standard-area-block__copy">
        <div className="flex items-center gap-3">
          <span className="icon-mark">{area.number}</span>
          <p className="text-sm leading-5 font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {area.shortTitle}
          </p>
        </div>
        <h3 className="mt-6 text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
          {area.title}
        </h3>
        <div className="mt-6 grid gap-4">
          <div className="rounded-xl border border-border/80 bg-card/70 p-4">
            <p className="text-xs leading-5 font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Problem
            </p>
            <p className="mt-2 text-base leading-8 text-foreground">
              {area.problem}
            </p>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
            <p className="text-xs leading-5 font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Rješenje
            </p>
            <p className="mt-2 text-base leading-8 font-medium text-foreground">
              {area.solution}
            </p>
          </div>
        </div>
        <a
          href={area.href}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
          data-link={area.id}
        >
          {area.ctaLabel}
          <ArrowUpRight className="size-4" />
        </a>
      </div>
      <div className="standard-area-block__visual">
        <StandardAreaVisual area={area} />
      </div>
    </article>
  )
}

export function StandardAreasSection() {
  return (
    <section id="podrucja" className="section-shell section-muted">
      <div className="standard-areas">
        <SectionHeader
          title="Osobni Bitcoin standard u 6 područja"
          copy="Bitcoin standard nije samo pitanje koliko Bitcoina imate. Pitanje je što vaš sustav radi s novcem, dugom, davanjem, imovinom, cijenom i sigurnošću."
          align="center"
        />

        <div className="mt-12 grid gap-10">
          {standardAreaSegments.map((segment, segmentIndex) => (
            <section key={segment.title} className="standard-segment">
              <div className="standard-segment__header">
                <div>
                  <p className="text-sm leading-5 font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    {segment.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl leading-tight font-semibold text-foreground sm:text-3xl lg:text-4xl">
                    {segment.title}
                  </h3>
                </div>
                <div className="text-base leading-8 text-muted-foreground">
                  <p>{segment.copy}</p>
                  {segmentIndex === 0 ? (
                    <p className="mt-4 font-semibold text-foreground">
                      Prvo kontrola. Zatim sloboda. Zatim davanje. Davanje nije
                      ukras osobnog Bitcoin standarda. I dalje vrijedi: novac
                      dolazi kroz ljude.
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                {segment.areas.map((area, areaIndex) => (
                  <StandardAreaBlock
                    key={area.id}
                    area={area}
                    reversed={(segmentIndex * 3 + areaIndex) % 2 === 1}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-primary/25 bg-card/82 p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
          <p className="max-w-3xl text-base leading-8 font-semibold text-foreground">
            Ako jedan od ovih šest dijelova još postoji samo u glavi, provjera
            pomaže pretvoriti dojam u pravilo.
          </p>
          <Button asChild className="cta-primary w-full rounded-full sm:w-auto">
            <CalBookingLink
              className="justify-center text-center"
              data-cta="standard-area-booking"
            >
              <CalendarDays className="size-4" />
              {PRIMARY_CTA}
            </CalBookingLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
