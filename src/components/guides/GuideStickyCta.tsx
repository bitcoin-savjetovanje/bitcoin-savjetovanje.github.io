import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CONVERSATION_PATH } from "@/content/site"

export function GuideStickyCta({
  readingProgress,
}: {
  readingProgress?: number
}) {
  return (
    <aside className="guide-sticky-cta" aria-label="Uvodni Bitcoin razgovor">
      <div className="guide-sticky-cta__card">
        <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          Pročitano: {readingProgress ?? 0}%
        </p>
        <h2>Uvodni Bitcoin razgovor</h2>
        <p>
          Imate konkretno pitanje o sigurnosti, obitelji ili ulozi Bitcoina u
          vlastitoj imovini?
        </p>
        <p>U 15 minuta možemo vidjeti što prvo treba razjasniti.</p>
        <Button asChild className="cta-primary mt-5 w-full rounded-full">
          <a
            href={CONVERSATION_PATH}
            className="justify-center text-center"
            data-cta="guide-sticky-sidebar"
          >
            <CalendarDays className="size-4" />
            Dogovorite uvodni razgovor
          </a>
        </Button>
        <p className="guide-sticky-cta__note">
          Bez naknade. Bez obveze. Bez upravljanja vašim sredstvima.
        </p>
      </div>
    </aside>
  )
}
