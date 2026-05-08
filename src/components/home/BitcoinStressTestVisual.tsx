import { CircleHelp, ShieldCheck, Users, WalletCards } from "lucide-react"

const ruleRows = [
  {
    title: "Bitcoin teza",
    question: "što još nije jasno u razumijevanju novca",
    Icon: CircleHelp,
  },
  {
    title: "Osobna situacija",
    question: "dug, državni novac, obveze i stvarni višak",
    Icon: WalletCards,
  },
  {
    title: "Sigurnost",
    question: "što nikada ne dijeliti i kako izbjeći jednu točku kvara",
    Icon: ShieldCheck,
  },
  {
    title: "Obitelj",
    question: "kako objasniti odluku bez pritiska i panike",
    Icon: Users,
  },
]

export function BitcoinStressTestVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-[500px] rounded-3xl border border-border/80 bg-card p-5 shadow-sm sm:p-6"
      role="img"
      aria-label="Uvodni Bitcoin razgovor pomaže razjasniti gdje ste sada, koju odluku pokušavate donijeti i koji bi sljedeći korak imao smisla"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Uvodni razgovor
          </h2>
          <p className="mt-2 text-base leading-6 font-semibold text-foreground sm:text-lg sm:leading-7">
            U 15 minuta razjasnimo gdje ste sada, koju odluku pokušavate
            donijeti i koji bi sljedeći korak imao smisla.
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
        {ruleRows.map(({ title, question, Icon }) => (
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
