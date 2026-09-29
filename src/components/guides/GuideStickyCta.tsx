import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Guide } from "@/content/guides"
import { CONVERSATION_PATH } from "@/content/site"

export function GuideStickyCta({
  readingProgress,
  cta,
}: {
  readingProgress?: number
  cta?: Guide["stickyCta"]
}) {
  return (
    <aside
      className="guide-sticky-cta"
      aria-label={cta?.title ?? "Uvodni Bitcoin razgovor"}
    >
      <div className="guide-sticky-cta__card">
        <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          Pročitano: {readingProgress ?? 0}%
        </p>
        <h2>{cta?.title ?? "Uvodni Bitcoin razgovor"}</h2>
        <p>
          {cta?.prompt ??
            "Imate konkretno pitanje o sigurnosti, obitelji ili ulozi Bitcoina u vlastitoj imovini?"}
        </p>
        <p>
          {cta?.detail ??
            "U 15 minuta možemo vidjeti što prvo treba razjasniti."}
        </p>
        <Button asChild className="cta-primary mt-5 w-full rounded-full">
          <a
            href={cta?.href ?? CONVERSATION_PATH}
            className="justify-center text-center"
            data-cta={cta?.dataCta ?? "guide-sticky-sidebar"}
          >
            <CalendarDays className="size-4" />
            {cta?.label ?? "Dogovorite uvodni razgovor"}
          </a>
        </Button>
        <p className="guide-sticky-cta__note">
          {cta?.note ??
            "Razgovor je bez naknade i obveze; sredstva ostaju isključivo pod vašom kontrolom."}
        </p>
      </div>
    </aside>
  )
}
