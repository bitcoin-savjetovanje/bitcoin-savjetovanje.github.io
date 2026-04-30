import { CALENDLY_URL } from "@/content/site"

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/92 p-3 shadow-lg backdrop-blur md:hidden">
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-primary flex h-11 items-center justify-center rounded-full px-4 text-sm font-semibold"
      >
        Uvodni razgovor · 15 min · bez naknade
      </a>
    </div>
  )
}
