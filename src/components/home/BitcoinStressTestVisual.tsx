import { CircleAlert, Landmark, TrendingDown, TrendingUp } from "lucide-react"

const stressScenarios = [
  {
    title: "Bitcoin padne",
    question: "Prodajete pod pritiskom ili znate koji novac ima namjenu?",
    Icon: TrendingDown,
  },
  {
    title: "Bitcoin naraste",
    question:
      "Trošite iz euforije ili unaprijed plaćate ciljeve i povećavate darivanje?",
    Icon: TrendingUp,
  },
  {
    title: "Dođe veliki trošak",
    question:
      "Dirate Bitcoin iz panike ili već imate stvarni višak i buduće odljeve?",
    Icon: CircleAlert,
  },
  {
    title: "Obitelj treba reagirati",
    question: "Ovisi li sve o vama ili postoje jasna sigurnosna pravila?",
    Icon: Landmark,
  },
]

export function BitcoinStressTestVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-[500px] rounded-3xl border border-border/80 bg-card p-5 shadow-sm sm:p-7"
      role="img"
      aria-label="Stres-test osobnog Bitcoin standarda kroz pad, rast, veliki trošak i obiteljsku reakciju"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Stres-test standarda
          </p>
          <h2 className="mt-2 text-2xl leading-tight font-semibold tracking-[-0.02em] text-foreground">
            Što vaš sustav radi kada Bitcoin napravi bilo što?
          </h2>
        </div>
        <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border border-primary/30 bg-primary/10">
          <img
            src="/bitcoin-logo.png"
            alt=""
            className="size-full rounded-full object-cover"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {stressScenarios.map(({ title, question, Icon }) => (
          <article
            key={title}
            className="grid gap-3 rounded-xl border border-border/75 bg-background/70 p-3 shadow-sm sm:grid-cols-[2.25rem_1fr] sm:p-4"
          >
            <div className="grid size-9 shrink-0 place-items-center rounded-full border border-primary/25 bg-primary/10 text-primary">
              <Icon className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {question}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
