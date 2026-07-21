/// <reference types="node" />

import { deepStrictEqual, equal, throws } from "node:assert/strict"
import { test } from "node:test"

import {
  STANDARD_AREA_IDS,
  standardAssessmentAreas,
  standardAssessmentRecommendations,
  type AssessmentAnswer,
  type AssessmentAnswers,
} from "../content/standardAssessment.ts"
import {
  getAreaAssessmentBand,
  getOverallAssessmentBand,
  scoreAssessment,
} from "./standardAssessment.ts"

function answersFilledWith(answer: AssessmentAnswer): AssessmentAnswers {
  const answers: AssessmentAnswers = {}

  for (const area of standardAssessmentAreas) {
    for (const statement of area.statements) {
      answers[statement.id] = answer
    }
  }

  return answers
}

function answersForTotal(total: number): AssessmentAnswers {
  const answers = answersFilledWith(0)
  let remaining = total

  for (const area of standardAssessmentAreas) {
    for (const statement of area.statements) {
      const answer = Math.min(2, remaining) as AssessmentAnswer
      answers[statement.id] = answer
      remaining -= answer
    }
  }

  equal(remaining, 0)
  return answers
}

function setAreaAnswers(
  answers: AssessmentAnswers,
  areaIndex: number,
  values: readonly [AssessmentAnswer, AssessmentAnswer, AssessmentAnswer]
) {
  const area = standardAssessmentAreas[areaIndex]

  if (!area) {
    throw new Error(`Nepoznato područje na indeksu ${areaIndex}.`)
  }

  area.statements.forEach((statement, statementIndex) => {
    answers[statement.id] = values[statementIndex]
  })
}

test("svih 21 odgovora s 0 daje rezultat 0 i sva područja kao prioritet", () => {
  const result = scoreAssessment(answersFilledWith(0))

  equal(result.totalScore, 0)
  equal(result.band.kind, "forming")
  equal(
    result.areaResults.every(({ score }) => score === 0),
    true
  )
  equal(
    result.areaResults.every(({ bandKind }) => bandKind === "priority"),
    true
  )
  deepStrictEqual(
    result.lowestAreaIds,
    standardAssessmentAreas.map(({ id }) => id)
  )
  equal(result.securityAttention, true)
  equal(result.recommendationKind, "system")
})

test("svih sedam područja ima jednu potpunu kontekstualnu preporuku", () => {
  deepStrictEqual(Object.keys(standardAssessmentRecommendations), [
    ...STANDARD_AREA_IDS,
  ])

  for (const areaId of STANDARD_AREA_IDS) {
    const recommendation = standardAssessmentRecommendations[areaId]

    equal(recommendation.interpretation.trim().length > 0, true)
    equal(recommendation.firstStep.trim().length > 0, true)
    equal(recommendation.relevantGuide.title.trim().length > 0, true)
    equal(recommendation.relevantGuide.href.startsWith("/vodici/"), true)
    equal(recommendation.relevantGuide.href.endsWith("/"), true)
    equal(recommendation.contextualCtaLabel.trim().length > 0, true)
  }
})

test("svih 21 odgovora s 1 daje rezultat 21 i djelomično uređena područja", () => {
  const result = scoreAssessment(answersFilledWith(1))

  equal(result.totalScore, 21)
  equal(result.band.kind, "connecting")
  equal(
    result.areaResults.every(({ score }) => score === 3),
    true
  )
  equal(
    result.areaResults.every(({ bandKind }) => bandKind === "partial"),
    true
  )
  equal(result.securityAttention, false)
  equal(result.recommendationKind, "system")
})

test("svih 21 odgovora s 2 daje maksimalnih 42 i preporuku održavanja", () => {
  const result = scoreAssessment(answersFilledWith(2))

  equal(result.totalScore, 42)
  equal(result.band.kind, "foundations")
  equal(
    result.areaResults.every(({ score }) => score === 6),
    true
  )
  equal(
    result.areaResults.every(({ bandKind }) => bandKind === "foundation"),
    true
  )
  equal(result.securityAttention, false)
  equal(result.recommendationKind, "maintenance")
})

test("ukupni rasponi imaju točne granice 14/15 i 28/29", () => {
  equal(scoreAssessment(answersForTotal(14)).band.kind, "forming")
  equal(scoreAssessment(answersForTotal(15)).band.kind, "connecting")
  equal(scoreAssessment(answersForTotal(28)).band.kind, "connecting")
  equal(scoreAssessment(answersForTotal(29)).band.kind, "foundations")

  equal(
    getOverallAssessmentBand(14).label,
    "Imovina postoji, sustav tek nastaje."
  )
  equal(
    getOverallAssessmentBand(15).label,
    "Dijelovi postoje, ali nisu spojeni."
  )
  equal(getOverallAssessmentBand(29).label, "Temelji su tu.")
})

test("rasponi područja imaju točne granice 0-2, 3-4 i 5-6", () => {
  equal(getAreaAssessmentBand(0).bandKind, "priority")
  equal(getAreaAssessmentBand(2).bandKind, "priority")
  equal(getAreaAssessmentBand(3).bandKind, "partial")
  equal(getAreaAssessmentBand(4).bandKind, "partial")
  equal(getAreaAssessmentBand(5).bandKind, "foundation")
  equal(getAreaAssessmentBand(6).bandKind, "foundation")
})

test("mješoviti odgovori daju očekivane podrezultate i ukupni rezultat", () => {
  const answers = answersFilledWith(2)
  setAreaAnswers(answers, 0, [0, 1, 2])
  setAreaAnswers(answers, 2, [1, 1, 2])
  setAreaAnswers(answers, 4, [0, 0, 1])

  const result = scoreAssessment(answers)

  equal(result.totalScore, 32)
  deepStrictEqual(
    result.areaResults.map(({ score }) => score),
    [3, 6, 4, 6, 1, 6, 6]
  )
  deepStrictEqual(result.lowestAreaIds, ["neto-imovina"])
  equal(result.recommendationKind, "system")
})

test("izjednačena najslabija područja ostaju sačuvana u izvornom redoslijedu", () => {
  const answers = answersFilledWith(2)
  setAreaAnswers(answers, 0, [0, 2, 2])
  setAreaAnswers(answers, 1, [2, 0, 2])

  const result = scoreAssessment(answers)

  deepStrictEqual(result.lowestAreaIds, ["proracun", "dug"])
  equal(result.areaResults[0]?.label, "djelomično uređeno")
  equal(result.areaResults[1]?.label, "djelomično uređeno")
  equal(result.recommendationKind, "focused")
})

test("sigurnosna zastavica reagira na bilo koji odgovor 0 u sigurnosnom području", () => {
  const answers = answersFilledWith(2)
  answers["sigurnost-obitelj-2"] = 0

  equal(scoreAssessment(answers).securityAttention, true)

  answers["sigurnost-obitelj-2"] = 1
  equal(scoreAssessment(answers).securityAttention, false)
})

test("preporuka razlikuje fokusirano područje, širi sustav i održavanje", () => {
  const onePriority = answersFilledWith(2)
  setAreaAnswers(onePriority, 0, [0, 0, 2])
  equal(scoreAssessment(onePriority).recommendationKind, "focused")

  const twoPriorities = answersFilledWith(2)
  setAreaAnswers(twoPriorities, 0, [0, 0, 2])
  setAreaAnswers(twoPriorities, 1, [0, 1, 1])
  equal(scoreAssessment(twoPriorities).recommendationKind, "system")

  const fourPartial = answersFilledWith(2)
  setAreaAnswers(fourPartial, 0, [1, 1, 2])
  setAreaAnswers(fourPartial, 1, [1, 1, 2])
  setAreaAnswers(fourPartial, 2, [1, 1, 2])
  setAreaAnswers(fourPartial, 3, [1, 1, 2])
  equal(scoreAssessment(fourPartial).recommendationKind, "system")

  const priorityAndTwoPartial = answersFilledWith(2)
  setAreaAnswers(priorityAndTwoPartial, 0, [0, 0, 2])
  setAreaAnswers(priorityAndTwoPartial, 1, [1, 1, 2])
  setAreaAnswers(priorityAndTwoPartial, 2, [1, 1, 2])
  equal(scoreAssessment(priorityAndTwoPartial).recommendationKind, "system")
})

test("nepotpuni odgovori ne proizvode rezultat", () => {
  throws(
    () => scoreAssessment({}),
    /Nedostaje valjan odgovor za tvrdnju proracun-1/
  )
})

test("rezultati izvan dopuštenih raspona nisu prihvaćeni", () => {
  throws(() => getOverallAssessmentBand(-1), RangeError)
  throws(() => getOverallAssessmentBand(43), RangeError)
  throws(() => getAreaAssessmentBand(-1), RangeError)
  throws(() => getAreaAssessmentBand(7), RangeError)
})
