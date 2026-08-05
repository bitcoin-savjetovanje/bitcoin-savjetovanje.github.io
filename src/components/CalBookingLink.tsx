import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from "react"

import {
  BOOKING_URL,
  CAL_BOOKING_LINK,
  CAL_BOOKING_NAMESPACE,
  CONVERSATION_PATH,
} from "@/content/site"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"

type GetCalApi = (typeof import("@calcom/embed-react"))["getCalApi"]
type CalApi = Awaited<ReturnType<GetCalApi>>

type CalPrefill = {
  prefillQuestion?: string
  prefillContext?: string
}

function calBookingConfig({ prefillQuestion, prefillContext }: CalPrefill) {
  return {
    layout: "month_view",
    useSlotsViewOnSmallScreen: "true",
    theme: "light",
    ...(prefillQuestion ? { pitanje: prefillQuestion } : {}),
    ...(prefillContext ? { kontekst: prefillContext } : {}),
  } as const
}

let calEmbedPromise: Promise<CalApi | null> | null = null
let calEventsRegistered = false

function onConversationPage() {
  return (
    window.location.pathname.replace(/\/$/, "") ===
    CONVERSATION_PATH.replace(/\/$/, "")
  )
}

function registerCalEvents(cal: CalApi) {
  if (calEventsRegistered) {
    return
  }

  calEventsRegistered = true

  cal("on", {
    action: "linkReady",
    callback: () => {
      if (!onConversationPage()) {
        return
      }

      trackFirstPartyInteraction("conversation-modal-calendar-ready", {
        mode: "modal",
      })
    },
  })

  cal("on", {
    action: "bookingSuccessfulV2",
    callback: () => {
      if (!onConversationPage()) {
        return
      }

      trackFirstPartyInteraction("conversation-booking-complete", {
        mode: "modal",
      })
    },
  })

  cal("on", {
    action: "linkFailed",
    callback: () => {
      if (!onConversationPage()) {
        return
      }

      trackFirstPartyInteraction("conversation-calendar-load-failed", {
        mode: "modal",
      })
    },
  })
}

function restoreFocusAfterModalClose(trigger: HTMLAnchorElement) {
  function attach(modal: Element) {
    modal.addEventListener(
      "close",
      () => {
        if (trigger.isConnected) {
          trigger.focus()
        }
      },
      { once: true }
    )
  }

  const existingModal = document.querySelector("cal-modal-box")

  if (existingModal) {
    attach(existingModal)
    return
  }

  const observer = new MutationObserver(() => {
    const modal = document.querySelector("cal-modal-box")

    if (!modal) {
      return
    }

    observer.disconnect()
    attach(modal)
  })

  const body = document.body

  if (!body) {
    return
  }

  observer.observe(body, { childList: true })
  window.setTimeout(() => observer.disconnect(), 10_000)
}

function ensureCalEmbed() {
  if (typeof window === "undefined") {
    return Promise.resolve(null)
  }

  calEmbedPromise ??= import("@calcom/embed-react")
    .then(({ getCalApi }) => getCalApi({ namespace: CAL_BOOKING_NAMESPACE }))
    .then((cal) => {
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#F7931A" },
          dark: { "cal-brand": "#F7931A" },
        },
        hideEventTypeDetails: true,
        layout: "month_view",
      })
      registerCalEvents(cal)
      return cal
    })
    .catch((error: unknown) => {
      if (import.meta.env.DEV) {
        console.info(
          "Cal embed could not initialize; href fallback remains.",
          error
        )
      }
      return null
    })

  return calEmbedPromise
}

type CalBookingLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "target" | "rel"
> &
  CalPrefill

export const CalBookingLink = forwardRef<
  HTMLAnchorElement,
  CalBookingLinkProps
>(function CalBookingLink(
  { children, onClick, prefillQuestion, prefillContext, ...props },
  ref
) {
  const config = calBookingConfig({ prefillQuestion, prefillContext })

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    const trigger = event.currentTarget

    ensureCalEmbed().then((cal) => {
      if (!cal) {
        trackFirstPartyInteraction("conversation-calendar-fallback", {
          reason: "embed-initialization",
        })
        window.location.assign(BOOKING_URL)
        return
      }

      cal("modal", {
        calLink: CAL_BOOKING_LINK,
        config,
      })
      restoreFocusAfterModalClose(trigger)
    })
  }

  return (
    <a
      ref={ref}
      href={BOOKING_URL}
      {...props}
      onClick={handleClick}
      data-cal-mode="modal"
      data-cal-namespace={CAL_BOOKING_NAMESPACE}
      data-cal-link={CAL_BOOKING_LINK}
      data-cal-config={JSON.stringify(config)}
    >
      {children}
    </a>
  )
})
