import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect, type CSSProperties } from "react"

import {
  BOOKING_URL,
  CAL_BOOKING_LINK,
  CAL_BOOKING_NAMESPACE,
} from "@/content/site"

const calInlineConfig = {
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true",
  theme: "light",
} as const

const calInlineStyle = {
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  overflow: "hidden",
} satisfies CSSProperties

export function CalInlineEmbed() {
  useEffect(() => {
    getCalApi({ namespace: CAL_BOOKING_NAMESPACE })
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
      })
      .catch((error: unknown) => {
        if (import.meta.env.DEV) {
          console.info(
            "Inline Cal embed could not initialize; href fallback remains.",
            error
          )
        }
      })
  }, [])

  return (
    <section
      id="kalendar"
      className="cal-inline-section"
      aria-labelledby="cal-inline-title"
      data-cal-inline={CAL_BOOKING_NAMESPACE}
    >
      <div className="cal-inline-section__header">
        <div>
          <p className="text-sm font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            Kalendar
          </p>
          <h2 id="cal-inline-title" className="mt-2 text-2xl font-semibold">
            Odaberite termin za uvodni razgovor.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Odaberite termin koji vam odgovara. U bilješku napišite jedno Bitcoin
          pitanje koje želite razjasniti. Ne šaljite seed phrase, privatne
          ključeve, iznose ni osjetljive dokumente.
        </p>
      </div>

      <div className="cal-inline-frame">
        <Cal
          namespace={CAL_BOOKING_NAMESPACE}
          calLink={CAL_BOOKING_LINK}
          style={calInlineStyle}
          config={calInlineConfig}
          className="cal-inline-frame__cal"
        />
        <noscript>
          <div className="cal-inline-placeholder">
            <div>
              <p className="font-semibold text-foreground">
                Kalendar se učitava.
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Ako se ne prikaže, termin možete otvoriti preko Cal.com linka.
              </p>
            </div>
          </div>
        </noscript>
      </div>

      <p className="cal-inline-fallback">
        Ako se kalendar ne prikaže,{" "}
        <a href={BOOKING_URL} data-cta="conversation-inline-calendar-fallback">
          otvorite Cal.com termin
        </a>
        .
      </p>
    </section>
  )
}
