import { X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { notDoingItems, securityRules } from "@/content/method"

export function SecurityTrustSection() {
  return (
    <section className="section-shell section-muted">
      <div className="case-panel border-primary/25">
        <SectionHeader
          title="Vaš Bitcoin ostaje vaš."
          copy="Ne tražim ključeve. Ne tražim početne riječi. Ne tražim pristup računima. Ne čuvam vaš Bitcoin. Ne donosim odluke umjesto vas."
        />
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {securityRules.map((rule) => (
            <div key={rule} className="not-for-row">
              <X className="negative-icon size-3.5" />
              <p>{rule}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-start">
          <div>
            <h3 className="text-xl font-semibold">Što nećemo raditi</h3>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              Ja pomažem postaviti standard. Kontrola ostaje kod vas.
            </p>
            <a
              href="/sigurnost/"
              className="mt-4 inline-block text-sm font-semibold text-foreground hover:text-primary"
              data-link="security-rules"
            >
              Pročitajte sigurnosna pravila
            </a>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {notDoingItems.map((item) => (
              <div key={item} className="not-for-row bg-background/70">
                <X className="negative-icon size-3.5" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
