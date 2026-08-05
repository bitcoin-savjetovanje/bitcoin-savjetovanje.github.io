import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"
import { CalendarDays } from "lucide-react"

import { CalBookingLink } from "@/components/CalBookingLink"
import { Button } from "@/components/ui/button"
import {
  BOOKING_URL,
  CAL_BOOKING_LINK,
  CAL_BOOKING_NAMESPACE,
} from "@/content/site"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"

const LazyCal = lazy(() =>
  import("@calcom/embed-react").then((module) => ({
    default: module.default,
  }))
)

type CalInlineEmbedProps = {
  prefillQuestion?: string
  prefillContext?: string
  topicReady?: boolean
}

const calInlineStyle = {
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  overflow: "hidden",
} as const

function CalendarPlaceholder() {
  return (
    <div className="conversation-calendar__placeholder" aria-hidden="true">
      <div className="conversation-calendar__placeholder-bar" />
      <div className="conversation-calendar__placeholder-grid">
        {Array.from({ length: 35 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  )
}

export function CalInlineEmbed({
  prefillQuestion,
  prefillContext,
  topicReady = true,
}: CalInlineEmbedProps) {
  const calendarViewTrackedRef = useRef(false)
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 64rem)").matches
  )
  const [shouldLoad, setShouldLoad] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)

  const config = useMemo(
    () => ({
      layout: "month_view" as const,
      useSlotsViewOnSmallScreen: "true",
      theme: "light" as const,
      ...(prefillQuestion ? { pitanje: prefillQuestion } : {}),
      ...(prefillContext ? { kontekst: prefillContext } : {}),
    }),
    [prefillContext, prefillQuestion]
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 64rem)")

    function updateViewport() {
      setIsDesktop(mediaQuery.matches)
    }

    mediaQuery.addEventListener("change", updateViewport)
    updateViewport()

    return () => mediaQuery.removeEventListener("change", updateViewport)
  }, [])

  useEffect(() => {
    if (!isDesktop || !topicReady || shouldLoad) {
      return
    }

    setShouldLoad(true)

    if (!calendarViewTrackedRef.current) {
      calendarViewTrackedRef.current = true
      trackFirstPartyInteraction("conversation-inline-calendar-view", {
        mode: "desktop",
      })
    }
  }, [isDesktop, shouldLoad, topicReady])

  useEffect(() => {
    if (!shouldLoad || !isDesktop) {
      return
    }

    let active = true
    let calApi:
      | Awaited<ReturnType<(typeof import("@calcom/embed-react"))["getCalApi"]>>
      | undefined

    const handleReady = () => {
      if (!active) {
        return
      }

      setLoadFailed(false)
      trackFirstPartyInteraction("conversation-inline-calendar-ready", {
        mode: "desktop",
      })
    }

    const handleBooking = () => {
      if (!active) {
        return
      }

      trackFirstPartyInteraction("conversation-booking-complete", {
        mode: "desktop",
      })
    }

    const handleFailure = () => {
      if (!active) {
        return
      }

      setLoadFailed(true)
      trackFirstPartyInteraction("conversation-calendar-load-failed", {
        mode: "desktop",
      })
    }

    import("@calcom/embed-react")
      .then(({ getCalApi }) => getCalApi({ namespace: CAL_BOOKING_NAMESPACE }))
      .then((cal) => {
        if (!active) {
          return
        }

        calApi = cal
        cal("ui", {
          theme: "light",
          cssVarsPerTheme: {
            light: { "cal-brand": "#D97824" },
            dark: { "cal-brand": "#D97824" },
          },
          hideEventTypeDetails: true,
          layout: "month_view",
        })
        cal("on", { action: "linkReady", callback: handleReady })
        cal("on", {
          action: "bookingSuccessfulV2",
          callback: handleBooking,
        })
        cal("on", { action: "linkFailed", callback: handleFailure })
      })
      .catch(() => {
        handleFailure()
      })

    return () => {
      active = false

      if (!calApi) {
        return
      }

      calApi("off", { action: "linkReady", callback: handleReady })
      calApi("off", {
        action: "bookingSuccessfulV2",
        callback: handleBooking,
      })
      calApi("off", { action: "linkFailed", callback: handleFailure })
    }
  }, [isDesktop, shouldLoad])

  return (
    <section
      id="kalendar"
      className="conversation-calendar"
      aria-labelledby="conversation-calendar-title"
      data-cal-inline={CAL_BOOKING_NAMESPACE}
    >
      <div className="conversation-calendar__header">
        <p className="conversation-booking-eyebrow">Rezervacija</p>
        <h2 id="conversation-calendar-title">Odaberite termin</h2>
        <p>
          Pri rezervaciji napišite jednu odluku ili pitanje koje želite
          razjasniti.
        </p>
      </div>

      <div className="conversation-calendar__mobile">
        <Button asChild size="lg" className="cta-primary">
          <CalBookingLink
            prefillQuestion={prefillQuestion}
            prefillContext={prefillContext}
            data-cta="conversation-mobile-calendar-open"
          >
            <CalendarDays aria-hidden="true" />
            Odaberite termin
          </CalBookingLink>
        </Button>
        <p>
          Ako se prozor ne može pokrenuti, poveznica će nastaviti na Cal.com.
        </p>
      </div>

      <div className="conversation-calendar__desktop">
        <div className="conversation-calendar__frame">
          {shouldLoad && isDesktop ? (
            <Suspense fallback={<CalendarPlaceholder />}>
              <LazyCal
                namespace={CAL_BOOKING_NAMESPACE}
                calLink={CAL_BOOKING_LINK}
                style={calInlineStyle}
                config={config}
                className="conversation-calendar__cal"
              />
            </Suspense>
          ) : (
            <CalendarPlaceholder />
          )}
        </div>

        <p
          className="conversation-calendar__fallback"
          role={loadFailed ? "alert" : undefined}
        >
          {loadFailed
            ? "Kalendar se nije mogao učitati. "
            : "Ako se kalendar ne prikaže, "}
          <a href={BOOKING_URL} data-cta="conversation-calendar-fallback">
            otvorite termin na Cal.comu
          </a>
          .
        </p>
      </div>
    </section>
  )
}
