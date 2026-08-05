import { CAL_BOOKING_NAMESPACE, CONVERSATION_PATH } from "@/content/site"

const CAL_APP_ORIGIN = "https://app.cal.com"
const CAL_EMBED_SCRIPT_URL = `${CAL_APP_ORIGIN}/embed/embed.js`

type CalApi = Awaited<
  ReturnType<(typeof import("@calcom/embed-react"))["getCalApi"]>
>

let calApiPromise: Promise<CalApi> | null = null

function ensureResourceHint({
  rel,
  href,
  as,
  key,
}: {
  rel: string
  href: string
  as?: string
  key: string
}) {
  const resolvedHref = new URL(href, window.location.href).href
  const existingHint = [...document.head.querySelectorAll("link[rel]")].some(
    (link) =>
      link instanceof HTMLLinkElement &&
      link.rel === rel &&
      link.href === resolvedHref
  )

  if (
    existingHint ||
    document.head.querySelector(`link[data-calendar-warmup="${key}"]`)
  ) {
    return
  }

  const link = document.createElement("link")
  link.rel = rel
  link.href = href
  link.dataset.calendarWarmup = key

  if (as) {
    link.as = as
  }

  document.head.appendChild(link)
}

function addCalendarResourceHints() {
  ensureResourceHint({
    rel: "dns-prefetch",
    href: "//app.cal.com",
    key: "dns",
  })
  ensureResourceHint({
    rel: "preconnect",
    href: CAL_APP_ORIGIN,
    key: "connection",
  })
  ensureResourceHint({
    rel: "preload",
    href: CAL_EMBED_SCRIPT_URL,
    as: "script",
    key: "embed-script",
  })
}

function loadCalApi() {
  calApiPromise ??= import("@calcom/embed-react")
    .then(({ getCalApi }) => getCalApi({ namespace: CAL_BOOKING_NAMESPACE }))
    .catch((error: unknown) => {
      calApiPromise = null
      throw error
    })

  return calApiPromise
}

function preloadConversationRoute() {
  if (
    window.location.pathname.replace(/\/$/, "") !==
    CONVERSATION_PATH.replace(/\/$/, "")
  ) {
    ensureResourceHint({
      rel: "prefetch",
      href: CONVERSATION_PATH,
      key: "conversation-document",
    })
  }

  void import("@/pages/Conversation").catch(() => undefined)
}

function warmConversationCalendar() {
  addCalendarResourceHints()
  preloadConversationRoute()

  const apiPromise = loadCalApi()
  void apiPromise.catch(() => undefined)
}

function isConversationLink(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false
  }

  const link = target.closest<HTMLAnchorElement>("a[href]")

  if (!link) {
    return false
  }

  const url = new URL(link.href, window.location.href)
  const conversationPath = CONVERSATION_PATH.replace(/\/$/, "")

  return (
    url.origin === window.location.origin &&
    url.pathname.replace(/\/$/, "") === conversationPath
  )
}

export function initConversationCalendarWarmup() {
  const currentPath = window.location.pathname.replace(/\/$/, "")
  const conversationPath = CONVERSATION_PATH.replace(/\/$/, "")

  if (currentPath === conversationPath) {
    warmConversationCalendar()
  }

  function handleConversationIntent(event: Event) {
    if (!isConversationLink(event.target)) {
      return
    }

    warmConversationCalendar()
  }

  document.addEventListener("pointerover", handleConversationIntent, {
    capture: true,
    passive: true,
  })
  document.addEventListener("pointerdown", handleConversationIntent, {
    capture: true,
    passive: true,
  })
  document.addEventListener("touchstart", handleConversationIntent, {
    capture: true,
    passive: true,
  })
  document.addEventListener("focusin", handleConversationIntent, true)
}
