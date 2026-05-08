import { getCalApi } from "@calcom/embed-react"
import { forwardRef, type ComponentPropsWithoutRef, useEffect } from "react"

import {
  BOOKING_URL,
  CAL_BOOKING_LINK,
  CAL_BOOKING_NAMESPACE,
} from "@/content/site"

const calBookingConfig = JSON.stringify({
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true",
})

let calEmbedPromise: Promise<void> | null = null

function ensureCalEmbed() {
  if (typeof window === "undefined") {
    return
  }

  calEmbedPromise ??= getCalApi({ namespace: CAL_BOOKING_NAMESPACE })
    .then((cal) => {
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#F7931A" },
          dark: { "cal-brand": "#F7931A" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      })
    })
    .catch((error: unknown) => {
      if (import.meta.env.DEV) {
        console.info(
          "Cal embed could not initialize; href fallback remains.",
          error
        )
      }
    })
}

type CalBookingLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "target" | "rel"
>

export const CalBookingLink = forwardRef<
  HTMLAnchorElement,
  CalBookingLinkProps
>(function CalBookingLink({ children, ...props }, ref) {
  useEffect(() => {
    ensureCalEmbed()
  }, [])

  return (
    <a
      ref={ref}
      href={BOOKING_URL}
      {...props}
      data-cal-namespace={CAL_BOOKING_NAMESPACE}
      data-cal-link={CAL_BOOKING_LINK}
      data-cal-config={calBookingConfig}
    >
      {children}
    </a>
  )
})
