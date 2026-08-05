import assert from "node:assert/strict"
import test from "node:test"

import {
  quickAssessmentQuestions,
  scoreQuickAssessment,
  type QuickAssessmentAnswers,
  type QuickAssessmentQuestionId,
} from "./quickBitcoinStandardAssessment.ts"

function answersByScore(score: 0 | 1 | 2): QuickAssessmentAnswers {
  return Object.fromEntries(
    quickAssessmentQuestions.map((question) => {
      const option = question.answers.find((answer) => answer.score === score)

      if (!option) {
        throw new Error(`Nedostaje odgovor s ${score} boda za ${question.id}.`)
      }

      return [question.id, option.id]
    })
  )
}

function answer(
  baseline: QuickAssessmentAnswers,
  questionId: QuickAssessmentQuestionId,
  answerId: string
) {
  return { ...baseline, [questionId]: answerId }
}

test("svi maksimalni odgovori vode u povezivanje osobnog standarda", () => {
  const result = scoreQuickAssessment(answersByScore(2))

  assert.equal(result.key, "ready")
  assert.equal(result.totalScore, 20)
  assert.deepEqual(result.criticalFlags, [])
})

test("svi minimalni odgovori daju sigurnosti prednost u izjednačenju", () => {
  const result = scoreQuickAssessment(answersByScore(0))

  assert.equal(result.key, "security")
  assert.equal(result.totalScore, 0)
})

test("nepostojanje plana kontinuiteta nadjačava ostale podrezultate", () => {
  const result = scoreQuickAssessment(
    answer(answersByScore(2), "continuity-plan", "none")
  )

  assert.equal(result.key, "security")
  assert.ok(result.criticalFlags.includes("no_continuity_plan"))
})

test("skrbništvo na mjenjačnici bez plana daje sigurnosti prioritet", () => {
  const result = scoreQuickAssessment(
    answer(answersByScore(2), "exchange-custody", "without-plan")
  )

  assert.equal(result.key, "security")
  assert.ok(result.criticalFlags.includes("exchange_custody_without_plan"))
})

test("dug bez plana nadjačava najslabiju nekritičnu dimenziju", () => {
  const answers = answer(answersByScore(2), "debt", "unplanned")
  answers["understand-value"] = "not-yet"
  answers["missed-price"] = "anchored"

  const result = scoreQuickAssessment(answers)

  assert.equal(result.key, "financial")
  assert.ok(result.criticalFlags.includes("unplanned_debt"))
})

test("izjednačene nekritične dimenzije koriste zadani redoslijed", () => {
  const answers = answersByScore(2)
  answers["operating-rules"] = "informal"
  answers["family-included"] = "partly"
  answers["continuity-plan"] = "basic"
  answers["exchange-custody"] = "temporary"

  const result = scoreQuickAssessment(answers)

  assert.equal(
    result.dimensionScores.living.normalizedScore,
    result.dimensionScores.security.normalizedScore
  )
  assert.equal(result.key, "security")
})

test("obiteljska situacija koja nije primjenjiva ne umanjuje bodove", () => {
  const answers = answer(answersByScore(2), "family-included", "not-applicable")
  const result = scoreQuickAssessment(answers)

  assert.equal(result.dimensionScores.living.score, 4)
  assert.equal(result.key, "ready")
})

test("spremnost traži barem 16 bodova i nijednu dimenziju ispod 75 posto", () => {
  const answers = answersByScore(2)
  answers["understand-value"] = "not-yet"
  answers["missed-price"] = "anchored"

  const result = scoreQuickAssessment(answers)

  assert.notEqual(result.key, "ready")
  assert.equal(result.key, "understanding")
})

test("svih pet vrsta rezultata dostupno je kroz valjane odgovore", () => {
  const cases = [
    {
      expected: "understanding",
      answers: {
        ...answersByScore(2),
        "understand-value": "not-yet",
        "missed-price": "anchored",
      },
    },
    {
      expected: "financial",
      answers: {
        ...answersByScore(2),
        budget: "none",
        debt: "planned",
        "net-worth-role": "none",
      },
    },
    {
      expected: "living",
      answers: {
        ...answersByScore(2),
        "operating-rules": "situational",
        "family-included": "not-included",
      },
    },
    {
      expected: "security",
      answers: {
        ...answersByScore(2),
        "continuity-plan": "basic",
        "exchange-custody": "temporary",
      },
    },
    { expected: "ready", answers: answersByScore(2) },
  ] as const

  for (const scenario of cases) {
    assert.equal(scoreQuickAssessment(scenario.answers).key, scenario.expected)
  }
})

test("nepotpuni ili nepoznati odgovori se odbijaju", () => {
  assert.throws(() => scoreQuickAssessment({}), /Nedostaje valjan odgovor/)
  assert.throws(
    () => scoreQuickAssessment({ ...answersByScore(2), budget: "nepoznato" }),
    /Nedostaje valjan odgovor/
  )
})
