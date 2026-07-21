import { standardAssessmentAreas } from "../content/standardAssessment.ts"
import type {
  AssessmentAnswer,
  AssessmentAnswers,
  StandardAreaId,
} from "../content/standardAssessment.ts"

export type OverallAssessmentBandKind = "forming" | "connecting" | "foundations"
export type AreaAssessmentBandKind = "priority" | "partial" | "foundation"
export type AssessmentRecommendationKind = "focused" | "system" | "maintenance"

export interface OverallAssessmentBand {
  readonly kind: OverallAssessmentBandKind
  readonly min: number
  readonly max: number
  readonly label: string
  readonly description: string
}

export interface AreaAssessment {
  readonly id: StandardAreaId
  readonly score: number
  readonly label: "prioritet" | "djelomično uređeno" | "temelj postoji"
  readonly bandKind: AreaAssessmentBandKind
}

export interface AssessmentResult {
  readonly totalScore: number
  readonly band: OverallAssessmentBand
  readonly areaResults: readonly AreaAssessment[]
  readonly lowestAreaIds: readonly StandardAreaId[]
  readonly securityAttention: boolean
  readonly recommendationKind: AssessmentRecommendationKind
}

export const overallAssessmentBands = [
  {
    kind: "forming",
    min: 0,
    max: 14,
    label: "Imovina postoji, sustav tek nastaje.",
    description:
      "Najvjerojatnije prvo trebate proračun, potpun popis duga i osnovnu sigurnosnu mapu.",
  },
  {
    kind: "connecting",
    min: 15,
    max: 28,
    label: "Dijelovi postoje, ali nisu spojeni.",
    description:
      "Možda imate dobru praksu u jednom području, ali drugo područje još stvara pritisak.",
  },
  {
    kind: "foundations",
    min: 29,
    max: 42,
    label: "Temelji su tu.",
    description:
      "Vrijeme je za pisana pravila: što radite u miru, padu, rastu, bolesti, poslu i obitelji.",
  },
] as const satisfies readonly OverallAssessmentBand[]

function isAssessmentAnswer(value: unknown): value is AssessmentAnswer {
  return value === 0 || value === 1 || value === 2
}

export function getOverallAssessmentBand(
  totalScore: number
): OverallAssessmentBand {
  const band = overallAssessmentBands.find(
    (candidate) => totalScore >= candidate.min && totalScore <= candidate.max
  )

  if (!band) {
    throw new RangeError("Ukupni rezultat procjene mora biti između 0 i 42.")
  }

  return band
}

export function getAreaAssessmentBand(
  score: number
): Pick<AreaAssessment, "label" | "bandKind"> {
  if (score >= 0 && score <= 2) {
    return { label: "prioritet", bandKind: "priority" }
  }

  if (score >= 3 && score <= 4) {
    return { label: "djelomično uređeno", bandKind: "partial" }
  }

  if (score >= 5 && score <= 6) {
    return { label: "temelj postoji", bandKind: "foundation" }
  }

  throw new RangeError("Rezultat područja procjene mora biti između 0 i 6.")
}

function getRecommendationKind(
  areaResults: readonly AreaAssessment[]
): AssessmentRecommendationKind {
  const priorityCount = areaResults.filter(
    ({ bandKind }) => bandKind === "priority"
  ).length
  const partialCount = areaResults.filter(
    ({ bandKind }) => bandKind === "partial"
  ).length
  const allFoundations = areaResults.every(
    ({ bandKind }) => bandKind === "foundation"
  )

  if (allFoundations) {
    return "maintenance"
  }

  if (
    priorityCount >= 2 ||
    partialCount >= 4 ||
    (priorityCount === 1 && partialCount >= 2)
  ) {
    return "system"
  }

  return "focused"
}

export function scoreAssessment(answers: AssessmentAnswers): AssessmentResult {
  const areaResults = standardAssessmentAreas.map((area): AreaAssessment => {
    const score = area.statements.reduce((sum, statement) => {
      const answer = answers[statement.id]

      if (!isAssessmentAnswer(answer)) {
        throw new Error(`Nedostaje valjan odgovor za tvrdnju ${statement.id}.`)
      }

      return sum + answer
    }, 0)
    const areaBand = getAreaAssessmentBand(score)

    return {
      id: area.id,
      score,
      ...areaBand,
    }
  })

  const totalScore = areaResults.reduce((sum, area) => sum + area.score, 0)
  const lowestScore = Math.min(...areaResults.map(({ score }) => score))
  const lowestAreaIds = areaResults
    .filter(({ score }) => score === lowestScore)
    .map(({ id }) => id)
  const securityArea = standardAssessmentAreas.find(
    ({ id }) => id === "sigurnost-obitelj"
  )

  if (!securityArea) {
    throw new Error("Nedostaje područje sigurnosti i obitelji.")
  }

  const securityAttention = securityArea.statements.some(
    ({ id }) => answers[id] === 0
  )

  return {
    totalScore,
    band: getOverallAssessmentBand(totalScore),
    areaResults,
    lowestAreaIds,
    securityAttention,
    recommendationKind: getRecommendationKind(areaResults),
  }
}
