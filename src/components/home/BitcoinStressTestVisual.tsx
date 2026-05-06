import { ArrowUpDown, ShieldCheck, Wallet } from "lucide-react"

const stressScenarios = [
  {
    title: "Kako reagirate kad se Bitcoin tečaj promijeni?",
    question:
      "Strah u padu, euforija u rastu — ili unaprijed postavljena pravila?",
    Icon: ArrowUpDown,
  },
  {
    title: "Je li vaša ukupna imovina u ravnoteži?",
    question:
      "Gdje je Bitcoin u sklopu vaše ukupne imovine, i što planirate kod većih pomaka?",
    Icon: Wallet,
  },
  {
    title: "Kako ste uredili skrbništvo i pristup Bitcoinu za vašu obitelj?",
    question:
      "Imate li jasan plan i protokol za upravljanje Bitcoinom, kojeg zna i obitelj?",
    Icon: ShieldCheck,
  },
]

export function BitcoinStressTestVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-[500px] rounded-3xl border border-border/80 bg-card p-5 shadow-sm sm:p-6"
      role="img"
      aria-label="Stres-test osobnog Bitcoin standarda kroz cijenu, novac i obitelj"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Stres-test standarda
          </h2>
          <p className="mt-2 text-base leading-6 font-semibold text-foreground sm:text-lg sm:leading-7">
            Tri provjere: promjena cijene, stanje imovine, plan za obitelj.
          </p>
        </div>
        <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full border border-primary/30 bg-primary/10">
          <img
            src="/bitcoin-logo.png"
            alt=""
            className="size-full rounded-full object-cover"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-2.5">
        {stressScenarios.map(({ title, question, Icon }) => (
          <article
            key={title}
            className="rounded-xl border border-border/75 bg-background/70 p-3 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            </div>
            {question ? (
              <p className="mt-2 text-sm leading-5 text-muted-foreground">
                {question}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
