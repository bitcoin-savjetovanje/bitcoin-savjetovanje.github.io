import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from "react"

import {
  BOOKING_URL,
  CAL_BOOKING_LINK,
  CAL_BOOKING_NAMESPACE,
} from "@/content/site"

const calBookingConfig = JSON.stringify({
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true",
  theme: "light",
})

const calModalConfig = {
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true",
  theme: "light",
} as const

type CalModalApi = (
  instruction: "modal",
  options: {
    calLink: string
    config: typeof calModalConfig
  }
) => void

let calEmbedPromise: Promise<CalModalApi | null> | null = null

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
        hideEventTypeDetails: false,
        layout: "month_view",
      })
      return cal as CalModalApi
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
>

export const CalBookingLink = forwardRef<
  HTMLAnchorElement,
  CalBookingLinkProps
>(function CalBookingLink({ children, onClick, ...props }, ref) {
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

    ensureCalEmbed().then((cal) => {
      if (!cal) {
        window.location.assign(BOOKING_URL)
        return
      }

      cal("modal", {
        calLink: CAL_BOOKING_LINK,
        config: calModalConfig,
      })
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
      data-cal-config={calBookingConfig}
    >
      {children}
    </a>
  )
})
