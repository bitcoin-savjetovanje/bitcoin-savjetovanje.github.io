const CTA_CLICK_EVENT_NAME = "bitcoin-savjetovanje:cta-click"

export const ctaEventRegistry = {
  "hero-intro-call": { kind: "cta", surface: "homepage" },
  "hero-questions": { kind: "cta", surface: "homepage" },
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
  "conversation-page-final-calendar": { kind: "cta", surface: "razgovor" },
  "conversation-bitcoin-consultation": { kind: "link", surface: "razgovor" },
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
  "bitcoin-consultation-security": {
    kind: "cta",
    surface: "bitcoin-konzultacija",
  },
  "security-intro-call": { kind: "cta", surface: "sigurnost" },
  "security-final-intro-call": { kind: "cta", surface: "sigurnost" },
  "guides-intro-call": { kind: "cta", surface: "vodici" },
  "guides-index-top-intro-call": { kind: "cta", surface: "vodici" },
  "guides-index-intro-call": { kind: "cta", surface: "vodici" },
  "guide-final-intro-call": { kind: "cta", surface: "vodici" },
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
