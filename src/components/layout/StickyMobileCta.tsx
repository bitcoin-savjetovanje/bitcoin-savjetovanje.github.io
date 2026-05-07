import { BOOKING_URL, PRIMARY_CTA } from "@/content/site"

export function StickyMobileCta() {
  return (
    <div className="sticky-mobile-cta lg:hidden">
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-primary flex h-11 min-w-0 items-center justify-center rounded-full px-3 text-center text-xs font-semibold whitespace-nowrap sm:text-sm"
        data-cta="sticky-mobile-standard-check"
      >
        {PRIMARY_CTA}
      </a>
    </div>
  )
}
