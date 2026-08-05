import {
  ArrowRight,
  CircleCheckBig,
  Layers3,
  LockKeyhole,
  WalletCards,
} from "lucide-react"

import { BudgetZeroModule } from "@/components/budget-zero/BudgetZeroModule"
import { Seo } from "@/components/Seo"
import { budgetZeroRoute } from "@/content/clientRoutes"

const modelSteps = [
  {
    Icon: WalletCards,
    label: "Računi",
    detail: "Gdje je novac",
  },
  {
    Icon: Layers3,
    label: "Namjene",
    detail: "Što novac treba napraviti",
  },
  {
    Icon: CircleCheckBig,
    label: "Nula",
    detail: "Sav novac ima posao",
  },
] as const

export function BudgetZero() {
  return (
    <>
      <Seo {...budgetZeroRoute} />

      <article className="budget-zero-page">
        <header className="budget-zero-page__header">
          <div className="budget-zero-shell budget-zero-page__header-inner">
            <div className="budget-zero-page__heading">
              <p className="budget-zero-eyebrow">
                INTERAKTIVNI MODUL · BEZ REGISTRACIJE
              </p>
              <h1>Proračun nulte razine</h1>
              <p>
                Popišite gdje je vaš novac, zbrojite ga na jednom mjestu i
                svakom euru dajte jasnu namjenu.
              </p>
            </div>

            <ol className="budget-zero-model" aria-label="Kako modul radi">
              {modelSteps.map(({ Icon, label, detail }, index) => (
                <li key={label}>
                  <span className="budget-zero-model__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{label}</strong>
                    <small>{detail}</small>
                  </span>
                  {index < modelSteps.length - 1 ? (
                    <ArrowRight
                      className="budget-zero-model__arrow"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ol>

            <p className="budget-zero-page__privacy-line">
              <LockKeyhole aria-hidden="true" />
              Nazivi računa, stanja i namjene ostaju samo u lokalnoj pohrani
              ovog preglednika. Ne šalju se na server, u analitiku ni u logove.
              Lokalna pohrana nije šifrirana.
            </p>
          </div>
        </header>

        <BudgetZeroModule />
      </article>
    </>
  )
}
