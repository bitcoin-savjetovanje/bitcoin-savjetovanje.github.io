import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  FileCheck2,
  LockKeyhole,
  RotateCcw,
  ShieldAlert,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  assessmentAnswerOptions,
  standardAssessmentAreas,
  standardAssessmentRecommendations,
  type AssessmentAnswer,
  type AssessmentAnswers,
  type StandardAreaId,
  type StandardAssessmentThemeKey,
} from "@/content/standardAssessment"
import { CONVERSATION_PATH } from "@/content/site"
import {
  scoreAssessment,
  type AssessmentResult,
} from "@/lib/standardAssessment"

type AssessmentPhase = "intro" | "questions" | "priority" | "result"
type PriorityChoice = StandardAreaId | "not-sure"

const visualAreaKeys = {
  proracun: "budget",
  dug: "debt",
  davanje: "giving",
  "bitcoin-kao-novac": "bitcoin",
  "neto-imovina": "worth",
  "vrijeme-volatilnost": "time",
  "sigurnost-obitelj": "security",
} as const satisfies Record<StandardAreaId, string>

const recommendationCopy = {
  focused: {
    title: "Jedno područje traži koncentriran rad.",
    copy: "Uvodni razgovor može pokazati je li za to dovoljno jedno usmjereno savjetovanje ili već imate sve što trebate za samostalan rad.",
  },
  system: {
    title: "Pravila treba povezati u jedan sustav.",
    copy: "Dva ili više prioritetnih područja, odnosno širi obrazac djelomičnih pravila, mogu upućivati na to da osobni Bitcoin standard ima smisla. Uvodni razgovor služi da to provjerimo, ne da unaprijed prodamo paket.",
  },
  maintenance: {
    title: "Temelji postoje; sada ih treba održavati.",
    copy: "Fokus je na redovitoj provjeri pravila i relevantnim vodičima. Razgovor ima smisla samo ako imate konkretno pitanje ili odluku koju želite provjeriti.",
  },
} as const

function areaById(areaId: StandardAreaId) {
  const area = standardAssessmentAreas.find(({ id }) => id === areaId)

  if (!area) {
    throw new Error(`Nedostaje područje procjene ${areaId}.`)
  }

  return area
}

function shouldAskForPriority(result: AssessmentResult) {
  if (result.lowestAreaIds.length < 2) {
    return false
  }

  const lowestArea = result.areaResults.find(
    ({ id }) => id === result.lowestAreaIds[0]
  )

  return Boolean(lowestArea && lowestArea.score <= 4)
}

function allStatementsAnswered(answers: AssessmentAnswers) {
  return standardAssessmentAreas.every((area) =>
    area.statements.every(({ id }) => answers[id] !== undefined)
  )
}

function conversationHref(theme: StandardAssessmentThemeKey) {
  return `${CONVERSATION_PATH}?tema=${encodeURIComponent(theme)}`
}

export function BitcoinStandardAssessment() {
  const [phase, setPhase] = useState<AssessmentPhase>("intro")
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<AssessmentAnswers>({})
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [priorityChoice, setPriorityChoice] = useState<PriorityChoice | null>(
    null
  )
  const headingRef = useRef<HTMLHeadingElement>(null)
  const shouldMoveFocusRef = useRef(false)

  useEffect(() => {
    if (!shouldMoveFocusRef.current) {
      return
    }

    const animationFrame = window.requestAnimationFrame(() => {
      headingRef.current?.focus()
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [currentStep, phase])

  const currentArea = standardAssessmentAreas[currentStep]
  const isLastStep = currentStep === standardAssessmentAreas.length - 1
  const currentStepComplete = currentArea
    ? currentArea.statements.every(({ id }) => answers[id] !== undefined)
    : false
  const projectedResult =
    isLastStep && currentStepComplete && allStatementsAnswered(answers)
      ? scoreAssessment(answers)
      : null
  const projectedPriorityChoice = projectedResult
    ? shouldAskForPriority(projectedResult)
    : false

  function moveTo(phaseValue: AssessmentPhase, step = currentStep) {
    shouldMoveFocusRef.current = true
    setCurrentStep(step)
    setPhase(phaseValue)
  }

  function startAssessment() {
    setAnswers({})
    setResult(null)
    setPriorityChoice(null)
    moveTo("questions", 0)
  }

  function answerStatement(
    statementId: keyof AssessmentAnswers,
    answer: AssessmentAnswer
  ) {
    setAnswers((current) => ({ ...current, [statementId]: answer }))
  }

  function advance() {
    if (!currentArea || !currentStepComplete) {
      return
    }

    if (!isLastStep) {
      moveTo("questions", currentStep + 1)
      return
    }

    if (!allStatementsAnswered(answers)) {
      return
    }

    const nextResult = scoreAssessment(answers)
    setResult(nextResult)

    if (shouldAskForPriority(nextResult)) {
      setPriorityChoice(null)
      moveTo("priority")
      return
    }

    moveTo("result")
  }

  function goBack() {
    if (phase === "priority") {
      setPriorityChoice(null)
      moveTo("questions", standardAssessmentAreas.length - 1)
      return
    }

    if (currentStep > 0) {
      moveTo("questions", currentStep - 1)
      return
    }

    moveTo("intro", 0)
  }

  function showResult() {
    if (!priorityChoice || !result) {
      return
    }

    moveTo("result")
  }

  function restartAssessment() {
    setAnswers({})
    setResult(null)
    setPriorityChoice(null)
    moveTo("intro", 0)
  }

  if (phase === "intro") {
    return (
      <section
        id="provjera"
        className="service-section standard-assessment"
        aria-labelledby="standard-assessment-title"
      >
        <div className="standard-assessment__intro">
          <div className="standard-assessment__intro-copy">
            <p className="service-eyebrow">Besplatna samoprocjena</p>
            <h2 id="standard-assessment-title" ref={headingRef} tabIndex={-1}>
              Provjera osobnog i obiteljskog Bitcoin standarda
            </h2>
            <p>
              Procijenite koliko su vaša pravila jasna, zapisana i provedena. Ne
              trebate unositi iznose, adrese novčanika, početne riječi ni druge
              osjetljive podatke.
            </p>
            <div className="standard-assessment__intro-actions">
              <Button
                type="button"
                className="cta-primary home-primary-button"
                data-cta="assessment-start"
                onClick={startAssessment}
              >
                Započnite — oko 3 minute
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="standard-assessment__privacy-promise">
            <LockKeyhole aria-hidden="true" />
            <div>
              <h3>Vaši odgovori ostaju privatni.</h3>
              <p>
                Čuvaju se samo u radnoj memoriji ove otvorene stranice. Ne
                spremaju se u preglednik, URL, analitiku, bazu ni na server.
              </p>
            </div>
          </div>
        </div>

        <ol
          className="standard-assessment__area-list"
          aria-label="Sedam područja"
        >
          {standardAssessmentAreas.map((area, index) => (
            <li key={area.id} data-area={visualAreaKeys[area.id]}>
              <span>{index + 1}</span>
              <div>
                <strong>{area.shortTitle}</strong>
                <small>{area.visualArea}</small>
              </div>
            </li>
          ))}
        </ol>
      </section>
    )
  }

  if (phase === "questions" && currentArea) {
    return (
      <section
        id="provjera"
        className="service-section standard-assessment standard-assessment--questions"
        aria-labelledby="standard-assessment-step-title"
      >
        <div className="standard-assessment__progress">
          <div>
            <span>
              Korak {currentStep + 1} od {standardAssessmentAreas.length}
            </span>
            <span>{currentArea.shortTitle}</span>
          </div>
          <div
            className="standard-assessment__progress-track"
            role="progressbar"
            aria-label="Napredak kroz provjeru"
            aria-valuemin={1}
            aria-valuemax={standardAssessmentAreas.length}
            aria-valuenow={currentStep + 1}
          >
            <span
              style={{
                width: `${((currentStep + 1) / standardAssessmentAreas.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="standard-assessment__question-heading">
          <p className="service-eyebrow">{currentArea.visualArea}</p>
          <h2
            id="standard-assessment-step-title"
            ref={headingRef}
            tabIndex={-1}
          >
            {currentArea.title}
          </h2>
          <p>
            Odaberite odgovor koji najbolje opisuje vaše stvarno pravilo danas,
            ne ono koje tek namjeravate uvesti.
          </p>
        </div>

        <div className="standard-assessment__statements">
          {currentArea.statements.map((statement, statementIndex) => (
            <fieldset
              key={statement.id}
              className="standard-assessment__statement"
            >
              <legend>
                <span>{statementIndex + 1}</span>
                {statement.text}
              </legend>
              <div className="standard-assessment__answer-grid">
                {assessmentAnswerOptions.map((option) => {
                  const inputId = `${statement.id}-${option.value}`
                  const selected = answers[statement.id] === option.value

                  return (
                    <label
                      key={option.value}
                      htmlFor={inputId}
                      className="standard-assessment__answer"
                      data-selected={selected ? "true" : undefined}
                    >
                      <input
                        id={inputId}
                        type="radio"
                        name={statement.id}
                        value={option.value}
                        checked={selected}
                        onChange={() =>
                          answerStatement(statement.id, option.value)
                        }
                      />
                      <span className="standard-assessment__radio-mark">
                        <Check aria-hidden="true" />
                      </span>
                      <span>
                        <strong>{option.value}</strong>
                        {" — "}
                        {option.label}
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="standard-assessment__navigation">
          <button
            type="button"
            className="service-link-button"
            onClick={goBack}
          >
            <ArrowLeft aria-hidden="true" />
            Natrag
          </button>
          <Button
            type="button"
            className="cta-primary home-primary-button"
            disabled={!currentStepComplete}
            data-cta={
              isLastStep && !projectedPriorityChoice
                ? "assessment-complete"
                : undefined
            }
            onClick={advance}
          >
            {isLastStep
              ? projectedPriorityChoice
                ? "Odaberite prvi prioritet"
                : "Prikažite rezultat"
              : "Dalje"}
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </section>
    )
  }

  if (phase === "priority" && result) {
    const tiedAreas = result.lowestAreaIds.map(areaById)

    return (
      <section
        id="provjera"
        className="service-section standard-assessment standard-assessment--priority"
        aria-labelledby="standard-assessment-priority-title"
      >
        <div className="standard-assessment__priority-copy">
          <p className="service-eyebrow">Jedan mali izbor prije rezultata</p>
          <h2
            id="standard-assessment-priority-title"
            ref={headingRef}
            tabIndex={-1}
          >
            Koje područje želite prvo urediti?
          </h2>
          <p>
            Više područja ima isti najniži rezultat. Odabir ne mijenja rezultat;
            samo određuje koji ćete prvi korak i temeljni vodič vidjeti.
          </p>
        </div>

        <fieldset className="standard-assessment__priority-fieldset">
          <legend className="sr-only">Odaberite prvo područje</legend>
          <div className="standard-assessment__priority-options">
            {tiedAreas.map((area) => {
              const inputId = `priority-${area.id}`
              const selected = priorityChoice === area.id

              return (
                <label
                  key={area.id}
                  htmlFor={inputId}
                  data-area={visualAreaKeys[area.id]}
                  data-selected={selected ? "true" : undefined}
                >
                  <input
                    id={inputId}
                    type="radio"
                    name="assessment-priority"
                    checked={selected}
                    onChange={() => setPriorityChoice(area.id)}
                  />
                  <span className="standard-assessment__radio-mark">
                    <Check aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{area.shortTitle}</strong>
                    <small>{area.visualArea}</small>
                  </span>
                </label>
              )
            })}
            <label
              htmlFor="priority-not-sure"
              data-selected={priorityChoice === "not-sure" ? "true" : undefined}
            >
              <input
                id="priority-not-sure"
                type="radio"
                name="assessment-priority"
                checked={priorityChoice === "not-sure"}
                onChange={() => setPriorityChoice("not-sure")}
              />
              <span className="standard-assessment__radio-mark">
                <Check aria-hidden="true" />
              </span>
              <span>
                <strong>Još nisam siguran</strong>
                <small>pokažite mi jedan mogući početak</small>
              </span>
            </label>
          </div>
        </fieldset>

        <div className="standard-assessment__navigation">
          <button
            type="button"
            className="service-link-button"
            onClick={goBack}
          >
            <ArrowLeft aria-hidden="true" />
            Natrag na odgovore
          </button>
          <Button
            type="button"
            className="cta-primary home-primary-button"
            disabled={!priorityChoice}
            data-cta="assessment-complete"
            onClick={showResult}
          >
            Prikažite rezultat
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </section>
    )
  }

  if (phase === "result" && result) {
    const focusAreaId =
      priorityChoice && priorityChoice !== "not-sure"
        ? priorityChoice
        : result.lowestAreaIds[0]

    if (!focusAreaId) {
      return null
    }

    const focusArea = areaById(focusAreaId)
    const focusRecommendation = standardAssessmentRecommendations[focusAreaId]
    const themeKey: StandardAssessmentThemeKey =
      result.recommendationKind === "maintenance" ||
      priorityChoice === "not-sure" ||
      (!priorityChoice && result.lowestAreaIds.length > 1)
        ? "vise-podrucja"
        : focusArea.themeKey
    const continuation = recommendationCopy[result.recommendationKind]

    return (
      <section
        id="provjera"
        className="service-section standard-assessment standard-assessment--result"
        aria-labelledby="standard-assessment-result-title"
        aria-live="polite"
      >
        <div className="standard-assessment__result-hero">
          <div
            className="standard-assessment__score"
            aria-label={`${result.totalScore} od 42`}
          >
            <strong>{result.totalScore}</strong>
            <span>/ 42</span>
          </div>
          <div>
            <p className="service-eyebrow">Vaš rezultat</p>
            <h2
              id="standard-assessment-result-title"
              ref={headingRef}
              tabIndex={-1}
            >
              {result.band.label}
            </h2>
            <p>{result.band.description}</p>
            <strong className="standard-assessment__compass-note">
              Rezultat je početna dijagnoza, ne osobni financijski plan.
            </strong>
          </div>
        </div>

        <div className="standard-assessment__area-results">
          <div className="standard-assessment__result-section-heading">
            <p className="service-eyebrow">Sedam područja</p>
            <h3>Gdje postoji temelj, a gdje nedostaje pravilo</h3>
          </div>
          <div className="standard-assessment__bars">
            {result.areaResults.map((areaResult) => {
              const area = areaById(areaResult.id)

              return (
                <div
                  key={area.id}
                  className="standard-assessment__bar-row"
                  data-area={visualAreaKeys[area.id]}
                >
                  <div>
                    <strong>{area.shortTitle}</strong>
                    <span>{areaResult.label}</span>
                    <b>{areaResult.score} / 6</b>
                  </div>
                  <div
                    className="standard-assessment__bar-track"
                    role="img"
                    aria-label={`${area.shortTitle}: ${areaResult.score} od 6, ${areaResult.label}`}
                  >
                    <span
                      style={{ width: `${(areaResult.score / 6) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {result.securityAttention ? (
          <aside className="standard-assessment__security-note">
            <ShieldAlert aria-hidden="true" />
            <div>
              <h3>Sigurnosna napomena</h3>
              <p>
                Barem jedno temeljno pravilo u području sigurnosti i obitelji
                još ne postoji. Rezultat ne određuje tehničko rješenje i nikada
                ne traži unošenje početnih riječi, privatnih ključeva ili
                osjetljivih lokacija.
              </p>
            </div>
          </aside>
        ) : null}

        <div className="standard-assessment__focus-grid">
          <article className="standard-assessment__focus-card">
            <p className="service-eyebrow">
              {result.recommendationKind === "maintenance"
                ? "Fokus za održavanje"
                : "Prvo usko grlo"}
            </p>
            <h3>
              {result.recommendationKind === "maintenance"
                ? "Temelji postoje u svih sedam područja."
                : focusArea.title}
            </h3>
            {priorityChoice === "not-sure" ? (
              <p className="standard-assessment__tie-note">
                Više područja je izjednačeno. Za konkretan prvi korak
                prikazujemo područje „{focusArea.shortTitle}”.
              </p>
            ) : null}
            <dl>
              <div>
                <dt>Zašto je ovo područje važno</dt>
                <dd>{focusRecommendation.interpretation}</dd>
              </div>
            </dl>
          </article>

          <article className="standard-assessment__task-card">
            <span>
              <FileCheck2 aria-hidden="true" />
            </span>
            <div>
              <p className="service-eyebrow">Jedan prvi korak</p>
              <h3>{focusRecommendation.firstStep}</h3>
              <a
                href={focusRecommendation.relevantGuide.href}
                className="service-link-button"
                data-link="assessment-relevant-guide"
              >
                Temeljni vodič: {focusRecommendation.relevantGuide.title}
              </a>
            </div>
          </article>
        </div>

        <div className="standard-assessment__continuation">
          <div>
            <p className="service-eyebrow">Mogući nastavak</p>
            <h3>{continuation.title}</h3>
            <p>{continuation.copy}</p>
          </div>
          <div className="standard-assessment__result-actions">
            <Button asChild className="cta-primary home-primary-button">
              <a
                href={conversationHref(themeKey)}
                data-cta="assessment-book-call"
              >
                <CalendarDays aria-hidden="true" />
                {focusRecommendation.contextualCtaLabel}
              </a>
            </Button>
          </div>
        </div>

        <button
          type="button"
          className="standard-assessment__restart"
          onClick={restartAssessment}
        >
          <RotateCcw aria-hidden="true" />
          Ponovite provjeru od početka
        </button>
      </section>
    )
  }

  return null
}
