const CTA_CLICK_EVENT_NAME = "bitcoin-savjetovanje:cta-click"

export const ctaEventRegistry = {
  "hero-intro-call": { kind: "cta", surface: "homepage" },
  "hero-questions": { kind: "cta", surface: "homepage" },
  "hero-standard-assessment": { kind: "cta", surface: "homepage" },
  "home-standard-assessment": { kind: "cta", surface: "homepage" },
  "hero-personal-standard": { kind: "link", surface: "homepage" },
  "home-personal-standard": { kind: "cta", surface: "homepage" },
  "home-program-conversation": { kind: "cta", surface: "homepage" },
  "home-guide-teaser": { kind: "link", surface: "homepage" },
  "home-guides-index": { kind: "link", surface: "homepage" },
  "home-guides-conversation": { kind: "cta", surface: "homepage" },
  "service-intro-call": { kind: "cta", surface: "homepage" },
  "service-consultation-intro-call": { kind: "cta", surface: "homepage" },
  "service-consultation-details": { kind: "link", surface: "homepage" },
  "service-personal-standard-intro-call": {
    kind: "cta",
    surface: "homepage",
  },
  "service-personal-standard-details": {
    kind: "link",
    surface: "homepage",
  },
  "budget-standard-check": { kind: "cta", surface: "proracun" },
  "debt-standard-check": { kind: "cta", surface: "dug" },
  "giving-standard-check": { kind: "cta", surface: "davanje" },
  "bitcoin-money-standard-check": {
    kind: "cta",
    surface: "bitcoin-kao-novac",
  },
  "net-worth-standard-check": {
    kind: "cta",
    surface: "bitcoin-i-neto-imovina",
  },
  "time-volatility-standard-check": {
    kind: "cta",
    surface: "bitcoin-vrijeme-i-volatilnost",
  },
  "custody-security-standard-check": {
    kind: "cta",
    surface: "skrbnistvo-i-sigurnost",
  },
  "assessment-start": {
    kind: "cta",
    surface: "provjera-bitcoin-standarda",
  },
  "assessment-complete": {
    kind: "cta",
    surface: "provjera-bitcoin-standarda",
  },
  "assessment-book-call": {
    kind: "cta",
    surface: "provjera-bitcoin-standarda",
  },
  "standard-check-start": {
    kind: "cta",
    surface: "provjera-bitcoin-standarda",
  },
  "assessment-relevant-guide": {
    kind: "link",
    surface: "provjera-bitcoin-standarda",
  },
  "topic-standard-check-conversation": {
    kind: "cta",
    surface: "tematske-stranice",
  },
  "information-cost-intro-call": { kind: "cta", surface: "homepage" },
  "information-cost-consultation": { kind: "link", surface: "homepage" },
  "readiness-intro-call": { kind: "cta", surface: "homepage" },
  "readiness-test-intro-call": { kind: "cta", surface: "homepage" },
  "desktop-rail-intro-call": { kind: "cta", surface: "homepage" },
  "desktop-rail-questions": { kind: "cta", surface: "homepage" },
  "final-intro-call": { kind: "cta", surface: "homepage" },
  "call-calendar": { kind: "cta", surface: "razgovor" },
  "call-cal-booking": { kind: "cta", surface: "razgovor" },
  "call-bitcoin-consultation": { kind: "link", surface: "razgovor" },
  "call-security": { kind: "cta", surface: "razgovor" },
  "conversation-page-calendar": { kind: "cta", surface: "razgovor" },
  "conversation-referral-calendar": { kind: "cta", surface: "razgovor" },
  "conversation-inline-calendar-mobile": { kind: "cta", surface: "razgovor" },
  "conversation-page-final-calendar": { kind: "cta", surface: "razgovor" },
  "conversation-bitcoin-consultation": { kind: "link", surface: "razgovor" },
  "conversation-personal-standard": { kind: "link", surface: "razgovor" },
  "conversation-sample-standard": { kind: "link", surface: "razgovor" },
  "conversation-page-security": { kind: "cta", surface: "razgovor" },
  "conversation-page-final-security": { kind: "cta", surface: "razgovor" },
  "bitcoin-consultation-intro-call": {
    kind: "cta",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-final-intro-call": {
    kind: "cta",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-personal-audience": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-family-audience": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-business-audience": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-standard-context": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-personal-standard": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-security": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "personal-standard-hero-call": {
    kind: "cta",
    surface: "osobni-bitcoin-standard",
  },
  "personal-standard-pricing-call": {
    kind: "cta",
    surface: "osobni-bitcoin-standard",
  },
  "personal-standard-final-call": {
    kind: "cta",
    surface: "osobni-bitcoin-standard",
  },
  "personal-standard-result-example": {
    kind: "link",
    surface: "osobni-bitcoin-standard",
  },
  "result-example-program": {
    kind: "link",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "result-example-conversation": {
    kind: "cta",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "result-example-final-conversation": {
    kind: "cta",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "result-example-final-program": {
    kind: "link",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "security-intro-call": { kind: "cta", surface: "sigurnost" },
  "security-final-intro-call": { kind: "cta", surface: "sigurnost" },
  "guides-intro-call": { kind: "cta", surface: "vodici" },
  "guides-index-top-intro-call": { kind: "cta", surface: "vodici" },
  "guides-index-intro-call": { kind: "cta", surface: "vodici" },
  "guide-starter-card": { kind: "link", surface: "vodici" },
  "guide-research-card": { kind: "link", surface: "vodici" },
  "guide-sticky-sidebar": { kind: "cta", surface: "vodici" },
  "guide-final-intro-call": { kind: "cta", surface: "vodici" },
  "footer-bitcoin-consultation": { kind: "link", surface: "footer" },
  "footer-standard-check": { kind: "link", surface: "footer" },
} as const satisfies Record<
  string,
  {
    kind: "cta" | "link"
    surface: string
  }
>

export type CtaEventName = typeof CTA_CLICK_EVENT_NAME
export type KnownCtaId = keyof typeof ctaEventRegistry
export type CtaElementKind = "cta" | "link"

export type CtaClickEventDetail = {
  kind: CtaElementKind
  id: string
  href: string
  path: string
  label: string
}

let initialized = false

function normalizeLabel(text: string | null) {
  return text?.replace(/\s+/g, " ").trim().slice(0, 120) ?? ""
}

export function readCtaEventDetail(
  element: Element
): CtaClickEventDetail | null {
  const ctaId = element.getAttribute("data-cta")
  const linkId = element.getAttribute("data-link")
  const id = ctaId ?? linkId

  if (!id || typeof window === "undefined") {
    return null
  }

  return {
    kind: ctaId ? "cta" : "link",
    id,
    href: element instanceof HTMLAnchorElement ? element.href : "",
    path: window.location.pathname,
    label: normalizeLabel(element.textContent),
  }
}

export function initCtaClickEvents() {
  if (initialized || typeof window === "undefined") {
    return
  }

  initialized = true

  // First-party event infrastructure only. This dispatches a browser event and
  // does not transmit data, set cookies, or store anything.
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return
    }

    const clickedElement = event.target.closest("[data-cta], [data-link]")

    if (!clickedElement) {
      return
    }

    const detail = readCtaEventDetail(clickedElement)

    if (!detail) {
      return
    }

    window.dispatchEvent(
      new CustomEvent<CtaClickEventDetail>(CTA_CLICK_EVENT_NAME, { detail })
    )

    if (import.meta.env.DEV) {
      console.info(CTA_CLICK_EVENT_NAME, detail)
    }
  })
}

export { CTA_CLICK_EVENT_NAME }
