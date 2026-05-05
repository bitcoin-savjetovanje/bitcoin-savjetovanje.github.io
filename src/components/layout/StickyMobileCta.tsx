import { BOOKING_URL } from "@/content/site"

export function StickyMobileCta() {
  return (
    <div className="sticky-mobile-cta lg:hidden">
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-primary flex h-11 min-w-0 items-center justify-center rounded-full px-4 text-center text-sm font-semibold whitespace-nowrap"
        data-cta="sticky-mobile-standard-check"
      >
        Provjera standarda · 15 min
      </a>
    </div>
  )
}
