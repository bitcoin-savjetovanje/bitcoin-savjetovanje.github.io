import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  Clipboard,
  Compass,
  KeyRound,
  LockKeyhole,
  Printer,
  RefreshCw,
  RotateCcw,
} from "lucide-react"
import {
  useEffect,
  useRef,
  useState,
  type RefObject,
  type ReactNode,
} from "react"

import { Button } from "@/components/ui/button"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"
import {
  isQuickAssessmentComplete,
  QUICK_ASSESSMENT_DIMENSION_IDS,
  quickAssessmentDimensions,
  quickAssessmentQuestions,
  quickAssessmentResultContent,
  scoreQuickAssessment,
  type QuickAssessmentAnswers,
  type QuickAssessmentDimension,
  type QuickAssessmentQuestion,
  type QuickAssessmentResult,
} from "@/lib/quickBitcoinStandardAssessment"

type AssessmentPhase = "intro" | "questions" | "result"
type CopyStatus = "idle" | "copied" | "failed"

const dimensionIcons: Record<QuickAssessmentDimension, ReactNode> = {
  understanding: <Compass aria-hidden="true" />,
  financial: <BookOpen aria-hidden="true" />,
  living: <RefreshCw aria-hidden="true" />,
  security: <KeyRound aria-hidden="true" />,
}

function AssessmentProgress({ currentIndex }: { currentIndex: number }) {
  return (
    <div className="bitcoin-check__progress">
      <div className="bitcoin-check__progress-copy">
        <strong>
          Pitanje {currentIndex + 1} od {quickAssessmentQuestions.length}
        </strong>
        <span>
          {
            quickAssessmentDimensions[
              quickAssessmentQuestions[currentIndex].dimension
            ].shortLabel
          }
        </span>
      </div>
      <div
        className="bitcoin-check__timeline"
        role="progressbar"
        aria-label="Napredak kroz samoprovjeru"
        aria-valuemin={1}
        aria-valuemax={quickAssessmentQuestions.length}
        aria-valuenow={currentIndex + 1}
        aria-valuetext={`Pitanje ${currentIndex + 1} od ${quickAssessmentQuestions.length}`}
      >
        {quickAssessmentQuestions.map((question, index) => (
          <span
            key={question.id}
            className="bitcoin-check__timeline-point"
            data-state={
              index < currentIndex
                ? "complete"
                : index === currentIndex
                  ? "current"
                  : "future"
            }
            aria-hidden="true"
          >
            {index < currentIndex ? <Check /> : null}
          </span>
        ))}
      </div>
    </div>
  )
}

function AssessmentQuestion({
  question,
  questionIndex,
  selectedAnswer,
  legendRef,
  onSelect,
}: {
  question: QuickAssessmentQuestion
  questionIndex: number
  selectedAnswer: string | undefined
  legendRef: RefObject<HTMLLegendElement | null>
  onSelect: (answerId: string) => void
}) {
  const dimension = quickAssessmentDimensions[question.dimension]

  return (
    <fieldset className="bitcoin-check__question" key={question.id}>
      <legend ref={legendRef} tabIndex={-1}>
        <span className="bitcoin-check__question-area">
          <span>{dimensionIcons[question.dimension]}</span>
          {dimension.label}
        </span>
        <strong id="bitcoin-check-question-title">{question.prompt}</strong>
      </legend>
      {question.helper ? (
        <p className="bitcoin-check__question-helper">
          <LockKeyhole aria-hidden="true" />
          {question.helper}
        </p>
      ) : null}
      <div className="bitcoin-check__answers">
        {question.answers.map((answer, answerIndex) => {
          const inputId = `${question.id}-${answer.id}`
          const selected = selectedAnswer === answer.id

          return (
            <label
              key={answer.id}
              className="bitcoin-check__answer"
              data-selected={selected ? "true" : undefined}
              htmlFor={inputId}
            >
              <input
                id={inputId}
                type="radio"
                name={question.id}
                value={answer.id}
                checked={selected}
                onChange={() => onSelect(answer.id)}
              />
              <span className="bitcoin-check__answer-number" aria-hidden="true">
                {String.fromCharCode(65 + answerIndex)}
              </span>
              <span className="bitcoin-check__answer-copy">{answer.label}</span>
              <span className="bitcoin-check__answer-check" aria-hidden="true">
                <Check />
              </span>
            </label>
          )
        })}
      </div>
      <span className="sr-only" aria-live="polite">
        Pitanje {questionIndex + 1} od {quickAssessmentQuestions.length}:{" "}
        {question.prompt}
      </span>
    </fieldset>
  )
}

function AssessmentNavigation({
  questionIndex,
  canContinue,
  onBack,
  onContinue,
}: {
  questionIndex: number
  canContinue: boolean
  onBack: () => void
  onContinue: () => void
}) {
  const isLast = questionIndex === quickAssessmentQuestions.length - 1

  return (
    <div className="bitcoin-check__navigation">
      <button
        type="button"
        className="bitcoin-check__back"
        disabled={questionIndex === 0}
        onClick={onBack}
      >
        <ArrowLeft aria-hidden="true" />
        Natrag
      </button>
      <Button
        type="button"
        className="bitcoin-check__continue"
        disabled={!canContinue}
        data-cta={isLast ? "assessment-complete" : undefined}
        onClick={onContinue}
      >
        {isLast ? "Prikažite moj rezultat" : "Nastavite"}
        <ArrowRight aria-hidden="true" />
      </Button>
    </div>
  )
}

function dimensionStatus(
  result: QuickAssessmentResult,
  dimension: QuickAssessmentDimension
) {
  if (result.primaryDimension === dimension) {
    return { label: "Prvi prioritet", tone: "priority" }
  }

  if (result.dimensionScores[dimension].normalizedScore >= 0.75) {
    return { label: "Uređeno", tone: "organized" }
  }

  return { label: "Djelomično uređeno", tone: "partial" }
}

function AssessmentDimensionSummary({
  result,
}: {
  result: QuickAssessmentResult
}) {
  return (
    <div className="bitcoin-check__dimension-summary">
      {QUICK_ASSESSMENT_DIMENSION_IDS.map((dimension) => {
        const status = dimensionStatus(result, dimension)

        return (
          <div
            key={dimension}
            className="bitcoin-check__dimension-row"
            data-tone={status.tone}
          >
            <span className="bitcoin-check__dimension-icon">
              {dimensionIcons[dimension]}
            </span>
            <strong>{quickAssessmentDimensions[dimension].label}</strong>
            <span className="bitcoin-check__dimension-status">
              {status.tone === "organized" ? (
                <Check aria-hidden="true" />
              ) : null}
              {status.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function resultSummaryText(result: QuickAssessmentResult, date: string) {
  const content = quickAssessmentResultContent[result.key]
  const dimensions = QUICK_ASSESSMENT_DIMENSION_IDS.map((dimension) => {
    const status = dimensionStatus(result, dimension)
    return `- ${quickAssessmentDimensions[dimension].label}: ${status.label}`
  }).join("\n")

  return [
    "Provjera osobnog Bitcoin standarda",
    date,
    "",
    content.title,
    content.explanation,
    "",
    "Četiri područja:",
    dimensions,
    "",
    "Prvi konkretan korak:",
    content.firstTask,
  ].join("\n")
}

function AssessmentResult({
  result,
  onRestart,
}: {
  result: QuickAssessmentResult
  onRestart: () => void
}) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle")
  const headingRef = useRef<HTMLHeadingElement>(null)
  const content = quickAssessmentResultContent[result.key]
  const date = new Intl.DateTimeFormat("hr-HR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date())
  const organizedDimensions = QUICK_ASSESSMENT_DIMENSION_IDS.filter(
    (dimension) =>
      result.dimensionScores[dimension].normalizedScore >= 0.75 &&
      result.primaryDimension !== dimension
  )

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [])

  async function copySummary() {
    const summary = resultSummaryText(result, date)

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(summary)
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = summary
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body.appendChild(textarea)
        textarea.select()
        const copied = document.execCommand("copy")
        textarea.remove()

        if (!copied) {
          throw new Error("Kopiranje nije uspjelo.")
        }
      }

      setCopyStatus("copied")
      trackFirstPartyInteraction("assessment-copy-summary")
    } catch {
      setCopyStatus("failed")
    }
  }

  function printResult() {
    trackFirstPartyInteraction("assessment-print")
    window.print()
  }

  return (
    <section
      className="bitcoin-check__result"
      aria-live="polite"
      aria-labelledby="bitcoin-check-result-title"
    >
      <div className="bitcoin-check__result-heading">
        <p className="bitcoin-check__eyebrow">Vaš prvi prioritet</p>
        <h2 id="bitcoin-check-result-title" ref={headingRef} tabIndex={-1}>
          {content.title}
        </h2>
        <p>{content.explanation}</p>
        <small className="bitcoin-check__result-date">
          Datum provjere: {date}
        </small>
      </div>

      <AssessmentDimensionSummary result={result} />

      <div className="bitcoin-check__result-sections">
        <section>
          <p className="bitcoin-check__result-kicker">
            Što je već dobro postavljeno
          </p>
          {organizedDimensions.length > 0 ? (
            <ul>
              {organizedDimensions.map((dimension) => (
                <li key={dimension}>
                  <Check aria-hidden="true" />
                  <span>{quickAssessmentDimensions[dimension].strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Dovršili ste pregled cijelog sustava i jasno odredili odakle treba
              krenuti. To je korisnija osnova od još jedne nepovezane odluke o
              Bitcoinu.
            </p>
          )}
        </section>

        <section>
          <p className="bitcoin-check__result-kicker">Što sada treba urediti</p>
          <p>{content.whatNow}</p>
        </section>

        <section className="bitcoin-check__task">
          <p className="bitcoin-check__result-kicker">Prvi konkretan korak</p>
          <p>{content.firstTask}</p>
        </section>
      </div>

      <aside className="bitcoin-check__recommendation">
        <div>
          <p className="bitcoin-check__result-kicker">
            {content.recommendation.eyebrow}
          </p>
          <h3>{content.recommendation.title}</h3>
        </div>
        <Button asChild className="bitcoin-check__recommendation-button">
          <a
            href={content.recommendation.href}
            {...(content.recommendation.kind === "conversation"
              ? { "data-cta": content.recommendation.analyticsId }
              : { "data-link": content.recommendation.analyticsId })}
          >
            {content.recommendation.kind === "conversation" ? (
              <CalendarDays aria-hidden="true" />
            ) : (
              <BookOpen aria-hidden="true" />
            )}
            {content.recommendation.label}
          </a>
        </Button>
      </aside>

      <div
        className="bitcoin-check__result-actions"
        aria-label="Radnje s rezultatom"
      >
        <button type="button" onClick={printResult}>
          <Printer aria-hidden="true" />
          Ispišite ili spremite kao PDF
        </button>
        <button type="button" onClick={copySummary}>
          <Clipboard aria-hidden="true" />
          Kopirajte sažetak
        </button>
        <button type="button" onClick={onRestart}>
          <RotateCcw aria-hidden="true" />
          Ponovite provjeru
        </button>
      </div>
      <p className="bitcoin-check__copy-status" role="status">
        {copyStatus === "copied"
          ? "Sažetak je kopiran."
          : copyStatus === "failed"
            ? "Kopiranje nije uspjelo. Označite tekst rezultata i kopirajte ga ručno."
            : ""}
      </p>
    </section>
  )
}

function AssessmentIntro({ onStart }: { onStart: () => void }) {
  return (
    <header className="bitcoin-check__intro">
      <div className="bitcoin-check__intro-copy">
        <p className="bitcoin-check__eyebrow">
          BESPLATNA SAMOPROVJERA · OKO 3 MINUTE
        </p>
        <h1>Imate li Bitcoin ili imate sustav za život s Bitcoinom?</h1>
        <p className="bitcoin-check__lead">
          Deset pitanja pomoći će vam prepoznati nedostaje li vam razumijevanje,
          uređena financijska osnova, jasna pravila korištenja ili sigurnosni i
          obiteljski plan.
        </p>
        <p className="bitcoin-check__facts">
          <span>10 pitanja</span>
          <span>oko 3 minute</span>
          <span>bez e-adrese</span>
        </p>
        <Button
          type="button"
          className="bitcoin-check__start"
          data-cta="assessment-start"
          onClick={onStart}
        >
          Započnite samoprovjeru
          <ArrowRight aria-hidden="true" />
        </Button>
        <p className="bitcoin-check__intro-privacy">
          <LockKeyhole aria-hidden="true" />
          <span>
            Ne unosite iznose, adrese novčanika, privatne ključeve, Bitcoin Core
            wallet backup datoteke, wallet passphraseove, početne riječi drugih
            walleta ni druge osjetljive podatke. Odgovori ostaju samo u ovom
            otvorenom prozoru.
          </span>
        </p>
      </div>

      <figure className="bitcoin-check__hero-visual">
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet="/images/provjera-bitcoin-standarda-hero-mobile-20260722.webp"
            type="image/webp"
          />
          <source
            srcSet="/images/provjera-bitcoin-standarda-hero-20260722.webp"
            type="image/webp"
          />
          <img
            src="/images/provjera-bitcoin-standarda-hero-20260722.jpg"
            alt="Mediteranski kameni put prolazi uz četiri kamena orijentira prema otvorenoj osunčanoj terasi."
            width="1600"
            height="800"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <figcaption>
          <span>Razumijevanje</span>
          <span>Financije</span>
          <span>Pravila</span>
          <span>Sigurnost</span>
        </figcaption>
      </figure>
    </header>
  )
}

function AssessmentCompactHeading({ embedded }: { embedded: boolean }) {
  const Heading = embedded ? "h2" : "h1"

  return (
    <header className="bitcoin-check__compact-heading">
      <p className="bitcoin-check__eyebrow">
        Provjera osobnog Bitcoin standarda
      </p>
      <Heading>Imate li Bitcoin ili imate sustav za život s Bitcoinom?</Heading>
    </header>
  )
}

export function QuickBitcoinStandardAssessment({
  embedded = false,
}: {
  embedded?: boolean
}) {
  const [phase, setPhase] = useState<AssessmentPhase>(
    embedded ? "questions" : "intro"
  )
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QuickAssessmentAnswers>({})
  const [result, setResult] = useState<QuickAssessmentResult | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const legendRef = useRef<HTMLLegendElement>(null)
  const shouldAlignAssessmentRef = useRef(false)
  const didTrackEmbeddedStartRef = useRef(false)
  const currentQuestion = quickAssessmentQuestions[questionIndex]
  const selectedAnswer = answers[currentQuestion.id]

  useEffect(() => {
    if (!embedded || didTrackEmbeddedStartRef.current) {
      return
    }

    didTrackEmbeddedStartRef.current = true
    trackFirstPartyInteraction("assessment-start", {
      questionCount: quickAssessmentQuestions.length,
      surface: "homepage",
    })
  }, [embedded])

  useEffect(() => {
    if (phase !== "questions") {
      return
    }

    const alignEntireAssessment = shouldAlignAssessmentRef.current

    if (shouldAlignAssessmentRef.current) {
      sectionRef.current?.scrollIntoView({ block: "start" })
      shouldAlignAssessmentRef.current = false
    }

    const frame = window.requestAnimationFrame(() => {
      legendRef.current?.focus({ preventScroll: true })

      if (!alignEntireAssessment) {
        legendRef.current?.scrollIntoView({ block: "start" })
      }
    })

    return () => window.cancelAnimationFrame(frame)
  }, [phase, questionIndex])

  function startAssessment() {
    setAnswers({})
    setResult(null)
    setQuestionIndex(0)
    shouldAlignAssessmentRef.current = true
    setPhase("questions")
    trackFirstPartyInteraction("assessment-start", {
      questionCount: quickAssessmentQuestions.length,
    })
  }

  function selectAnswer(answerId: string) {
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: answerId,
    }))
  }

  function continueAssessment() {
    if (!selectedAnswer) {
      return
    }

    if (questionIndex < quickAssessmentQuestions.length - 1) {
      const nextQuestionNumber = questionIndex + 2
      setQuestionIndex((current) => current + 1)
      trackFirstPartyInteraction("assessment-next", {
        questionNumber: nextQuestionNumber,
        questionCount: quickAssessmentQuestions.length,
      })
      return
    }

    if (!isQuickAssessmentComplete(answers)) {
      return
    }

    const nextResult = scoreQuickAssessment(answers)
    setResult(nextResult)
    setPhase("result")
    trackFirstPartyInteraction("assessment-complete", {
      questionCount: quickAssessmentQuestions.length,
    })
  }

  function goBack() {
    if (questionIndex > 0) {
      setQuestionIndex((current) => current - 1)
    }
  }

  function restartAssessment() {
    setAnswers({})
    setResult(null)
    setQuestionIndex(0)
    shouldAlignAssessmentRef.current = true
    setPhase("questions")
    trackFirstPartyInteraction("assessment-restart")
  }

  return (
    <section
      id={embedded ? "provjera-na-naslovnici" : "provjera"}
      ref={sectionRef}
      className={`bitcoin-check${embedded ? "bitcoin-check--embedded editorial-section" : ""}`}
      data-phase={phase}
      data-embedded={embedded ? "true" : undefined}
    >
      <div className="bitcoin-check__shell">
        {phase === "intro" ? (
          <AssessmentIntro onStart={startAssessment} />
        ) : (
          <AssessmentCompactHeading embedded={embedded} />
        )}

        {phase === "questions" ? (
          <div className="bitcoin-check__card">
            <AssessmentProgress currentIndex={questionIndex} />
            <AssessmentQuestion
              key={currentQuestion.id}
              question={currentQuestion}
              questionIndex={questionIndex}
              selectedAnswer={selectedAnswer}
              legendRef={legendRef}
              onSelect={selectAnswer}
            />
            <AssessmentNavigation
              questionIndex={questionIndex}
              canContinue={Boolean(selectedAnswer)}
              onBack={goBack}
              onContinue={continueAssessment}
            />
          </div>
        ) : null}

        {phase === "result" && result ? (
          <AssessmentResult result={result} onRestart={restartAssessment} />
        ) : null}
      </div>
    </section>
  )
}

export function AssessmentAreasExplanation() {
  return (
    <section
      className="bitcoin-check-info bitcoin-check-info--areas"
      aria-labelledby="bitcoin-check-areas-title"
    >
      <div className="bitcoin-check-info__heading">
        <p className="bitcoin-check__eyebrow">Četiri dijela jednog sustava</p>
        <h2 id="bitcoin-check-areas-title">Što ova provjera zapravo mjeri?</h2>
      </div>
      <dl className="bitcoin-check-info__area-list">
        {QUICK_ASSESSMENT_DIMENSION_IDS.map((dimension) => (
          <div key={dimension}>
            <dt>
              <span>{dimensionIcons[dimension]}</span>
              {quickAssessmentDimensions[dimension].label}
            </dt>
            <dd>{quickAssessmentDimensions[dimension].description}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function AssessmentPrivacyNote() {
  return (
    <aside className="bitcoin-check-info bitcoin-check-info--privacy">
      <LockKeyhole aria-hidden="true" />
      <div>
        <h2>Privatnost je dio dizajna provjere</h2>
        <p>
          Vaši odgovori ostaju samo u radnoj memoriji ove otvorene stranice. Ne
          spremaju se u preglednik, URL, analitiku, bazu ni na poslužitelj.
          Analitika može zabilježiti da je provjera pokrenuta ili dovršena, ali
          ne bilježi pojedinačne odgovore, podrezultate ni vrstu rezultata.
        </p>
      </div>
    </aside>
  )
}
