import { useState } from "react"
import { ArrowDown, ExternalLink, LineChart, MousePointer2 } from "lucide-react"

import { Seo } from "@/components/Seo"
import { HTimeCalculator } from "@/components/long-term-trend/HTimeCalculator"
import { Button } from "@/components/ui/button"
import { longTermTrendRoute } from "@/content/clientRoutes"

const FULLSCREEN_CHART_PATH = "/dugorocni-trend/graf/"
const EMBEDDED_CHART_PATH = `${FULLSCREEN_CHART_PATH}?v=20260724-autoscale-default-1`

const chartKeys = [
  {
    color: "bg-[#087f23]",
    title: "PL0 · središnja putanja",
    description:
      "Zelena linija pokazuje središnju power-law putanju modela kroz vrijeme.",
  },
  {
    color: "bg-[#0677f9]",
    title: "Povijesna cijena Bitcoina",
    description:
      "Plava linija prikazuje kretanje tržišne cijene i njezino odstupanje od modela.",
  },
  {
    color: "bg-[#8190a1]",
    title: "Halving ciklusi H1–H12",
    description:
      "Okomite oznake dijele povijest i projekciju na Bitcoinove protokolarne epohe.",
  },
]

export function LongTermTrend() {
  const [chartInteractive, setChartInteractive] = useState(false)

  return (
    <>
      <Seo {...longTermTrendRoute} />

      <div className="overflow-hidden">
        <section className="relative border-b border-border/70 bg-background">
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at 82% 18%, color-mix(in srgb, var(--primary) 15%, transparent), transparent 33%), radial-gradient(circle at 12% 88%, color-mix(in srgb, var(--muted-foreground) 8%, transparent), transparent 30%)",
            }}
          />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] xl:gap-16">
            <div className="max-w-3xl min-w-0">
              <div className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase sm:text-sm">
                <span className="h-px w-9 bg-primary" aria-hidden="true" />
                Interaktivni Bitcoin model
              </div>
              <h1 className="max-w-4xl text-4xl leading-[1.04] font-semibold tracking-[-0.045em] text-balance text-foreground sm:text-5xl lg:text-6xl">
                Dugoročni trend Bitcoina
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-pretty text-muted-foreground sm:text-xl sm:leading-9">
                Promatrajte povijesnu cijenu, središnju power-law putanju i
                halving cikluse u istom interaktivnom prikazu — bez gubljenja
                ranih godina u današnjim redovima veličine.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="cta-primary min-h-11 px-4">
                  <a href="#interaktivni-graf">
                    Istražite graf
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="home-outline-button h-11 min-h-11 px-4"
                  style={{ height: "44px", minHeight: "44px" }}
                >
                  <a
                    href={FULLSCREEN_CHART_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-link="long-term-trend-fullscreen-hero"
                  >
                    Otvori preko cijelog zaslona
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>

            <figure className="mx-auto w-full max-w-3xl min-w-0 overflow-hidden rounded-[28px] bg-card shadow-[var(--shadow-border),0_28px_80px_-42px_rgba(46,38,26,0.42)] xl:mx-0 xl:max-w-none">
              <img
                className="aspect-[3/2] w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                src="/images/dugorocni-trend-hero-v1.webp"
                width="1536"
                height="1024"
                alt="Bilježnica s dugoročnom krivuljom, pješčani i sunčani sat na kamenoj terasi uz more"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </figure>
          </div>
        </section>

        <section
          id="interaktivni-graf"
          className="scroll-mt-24 border-b border-border/70 bg-muted/25"
        >
          <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                  <LineChart className="size-4" aria-hidden="true" />
                  Bitcoin na korijenskoj skali
                </div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-4xl">
                  Istražite cikluse izravno na grafu
                </h2>
                <p className="mt-3 text-base leading-7 text-pretty text-muted-foreground sm:text-lg">
                  Zumirajte, pomičite prikaz i kliknite stavke legende za
                  uključivanje dodatnih linija modela.
                </p>
                <div className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-background px-3.5 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-border),0_8px_22px_-18px_rgba(46,38,26,0.5)]">
                  <span
                    className="size-2 rounded-full bg-emerald-600"
                    aria-hidden="true"
                  />
                  Aktualna cijena osvježava se svake minute
                </div>
              </div>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-11 px-4"
              >
                <a
                  href={FULLSCREEN_CHART_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-link="long-term-trend-fullscreen-chart"
                >
                  Otvori graf u novom tabu
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>

            <figure className="rounded-[28px] bg-white p-1 shadow-[var(--shadow-border),0_26px_74px_-38px_rgba(15,35,57,0.42)]">
              <div className="overflow-hidden rounded-[24px] bg-white">
                <div className="relative">
                  <iframe
                    className={`block h-[760px] w-full border-0 md:h-[820px] lg:h-[min(78vh,900px)] lg:min-h-[720px] ${
                      chartInteractive ? "" : "pointer-events-none select-none"
                    }`}
                    src={EMBEDDED_CHART_PATH}
                    title="Interaktivni graf dugoročnog trenda Bitcoina"
                    loading="eager"
                    tabIndex={chartInteractive ? 0 : -1}
                    allowFullScreen
                  />

                  {!chartInteractive ? (
                    <button
                      type="button"
                      className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-t-[24px] bg-white/5 p-4 text-center transition-[background-color] duration-150 ease-out outline-none hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-3 focus-visible:ring-primary/45 focus-visible:ring-inset"
                      onClick={() => setChartInteractive(true)}
                      aria-label="Aktivirajte interaktivni graf"
                    >
                      <span className="flex max-w-[310px] items-start gap-3 rounded-2xl bg-background/95 px-4 py-3 text-left shadow-[var(--shadow-border),0_16px_40px_-24px_rgba(15,35,57,0.5)] backdrop-blur-md">
                        <MousePointer2
                          className="mt-0.5 size-5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>
                          <strong className="block text-sm font-semibold text-foreground">
                            Kliknite za interakciju s grafom
                          </strong>
                          <span className="mt-1 block text-xs leading-5 text-pretty text-muted-foreground">
                            Dok graf nije aktivan, kotačić nastavlja pomicati
                            stranicu.
                          </span>
                        </span>
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="fixed top-24 left-4 z-50 min-h-11 rounded-xl bg-background/95 px-4 py-2 text-sm font-semibold text-foreground shadow-[var(--shadow-border),0_12px_30px_-22px_rgba(15,35,57,0.55)] backdrop-blur-md transition-[background-color,box-shadow,scale] duration-150 ease-out hover:bg-background focus-visible:ring-3 focus-visible:ring-primary/45 focus-visible:outline-none active:scale-[0.96] lg:left-8"
                      onClick={() => setChartInteractive(false)}
                    >
                      Završi interakciju
                    </button>
                  )}
                </div>

                <figcaption className="border-t border-border/70 bg-background px-5 py-4 text-sm leading-6 text-pretty text-muted-foreground sm:px-6">
                  Kliknite graf kako biste ga aktivirali. Dok nije aktivan,
                  kotačić nastavlja pomicati stranicu. Gumbom “Završi
                  interakciju” ponovno ga zaključavate. Graf automatski dopisuje
                  aktualnu cijenu svake minute.
                </figcaption>
              </div>
            </figure>
          </div>
        </section>

        <HTimeCalculator />

        <section className="border-b border-border/70 bg-muted/25">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-tight">
              Primijenite trend na svoju imovinu
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
              Imate nekretninu koju iznajmljujete ili držite kao dugoročnu
              imovinu? Usporedite njezin rast i neto najam s Bitcoinovim
              dugoročnim trendom.
            </p>
            <Button asChild size="lg" className="cta-primary mt-6">
              <a href="/nekretnina-ili-bitcoin/">
                Usporedite nekretninu i Bitcoin
              </a>
            </Button>
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 lg:px-8 lg:py-24">
            <div>
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
                <MousePointer2 className="size-4" aria-hidden="true" />
                Kako čitati prikaz
              </div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-4xl">
                Ciklusi su kontekst, ne prognoza
              </h2>
              <p className="mt-5 text-base leading-8 text-pretty text-muted-foreground sm:text-lg">
                Cijena Bitcoina prošla je kroz više redova veličine, pa obična
                linearna skala snažno sabija početne godine. Korijenska skala —
                cijena podignuta na potenciju 1/5,4 — ublažava tu razliku i čini
                različite tržišne cikluse usporedivijima.
              </p>
              <p className="mt-4 text-base leading-8 text-pretty text-muted-foreground sm:text-lg">
                Power-law linije predstavljaju matematičke putanje dugoročnog
                modela. One pomažu vidjeti odnos cijene, vremena i protokolarnih
                epoha, ali ne predviđaju buduću tržišnu cijenu.
              </p>
            </div>

            <div className="divide-y divide-border/70 border-y border-border/70">
              {chartKeys.map((item) => (
                <article
                  key={item.title}
                  className="grid grid-cols-[auto_1fr] gap-4 py-6 sm:gap-5 sm:py-7"
                >
                  <span
                    className={`mt-2.5 h-1.5 w-10 rounded-full ${item.color}`}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 leading-7 text-pretty text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/70 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="max-w-5xl text-sm leading-7 text-pretty text-muted-foreground">
              <strong className="font-semibold text-foreground">
                Napomena:
              </strong>{" "}
              graf služi isključivo u edukativne i informativne svrhe.
              Matematički model pojednostavljuje stvarno tržište, nije
              financijski savjet i nije jamstvo budućih rezultata. Interaktivni
              prikaz izrađen je prema javno dostupnom modelu{" "}
              <a
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                href="https://bitcoinwave.net/rootchart.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bitcoin Wave
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
