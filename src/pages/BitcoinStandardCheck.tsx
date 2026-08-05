import { ArrowUpRight, BriefcaseBusiness } from "lucide-react"

import {
  AssessmentAreasExplanation,
  AssessmentPrivacyNote,
  QuickBitcoinStandardAssessment,
} from "@/components/assessment/QuickBitcoinStandardAssessment"
import { Seo } from "@/components/Seo"
import { bitcoinStandardCheckRoute } from "@/content/clientRoutes"
import { BUSINESS_BITCOIN_PATH } from "@/content/site"

export function BitcoinStandardCheck() {
  return (
    <>
      <Seo {...bitcoinStandardCheckRoute} />
      <article className="bitcoin-standard-check-page">
        <QuickBitcoinStandardAssessment />

        <div className="bitcoin-check-page__content">
          <AssessmentAreasExplanation />
          <AssessmentPrivacyNote />

          <section
            className="bitcoin-check-info bitcoin-check-info--business"
            aria-labelledby="bitcoin-check-business-title"
          >
            <BriefcaseBusiness aria-hidden="true" />
            <div>
              <h2 id="bitcoin-check-business-title">
                Trebate procjenu za tvrtku?
              </h2>
              <p>
                Poslovni Bitcoin standard zahtijeva drukčija pitanja, sudionike
                i sigurnosni okvir.
              </p>
            </div>
            <a
              href={BUSINESS_BITCOIN_PATH}
              data-link="assessment-business-bitcoin"
            >
              Pogledajte Bitcoin za tvrtke
              <ArrowUpRight aria-hidden="true" />
            </a>
          </section>
        </div>
      </article>
    </>
  )
}
