import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Minus,
  ShieldCheck,
} from "lucide-react"
import {
  useEffect,
  useState,
  type KeyboardEvent,
  type SyntheticEvent,
} from "react"

import { CalInlineEmbed } from "@/components/CalInlineEmbed"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { conversationRoute } from "@/content/clientRoutes"
import {
  businessConversationAlternativePaths,
  businessConversationOutcomes,
  businessConversationPreparation,
  conversationAlternativePaths,
  conversationOutcomes,
  conversationPurpose,
  conversationQuestionExamples,
  conversationQuestionGroups,
  conversationTopics,
  entrepreneurConversationAlternativePaths,
  entrepreneurConversationOutcomes,
  entrepreneurConversationPreparation,
  familyConversationPreparation,
  personalConversationPreparation,
  securityConversationPreparation,
  type ConversationTopic,
  type ConversationTopicId,
} from "@/content/conversation"
import { sanitizeConversationLocation } from "@/lib/conversationUrl"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"
import { PAVAO_PAHLJINA_PATH } from "@/content/site"

type TopicState = {
  ready: boolean
  id: ConversationTopicId | null
}

function SelectedTopic({
  topic,
  businessMode = false,
  entrepreneurMode = false,
  familyMode = false,
  personalMode = false,
  securityMode = false,
}: {
  topic: ConversationTopic
  businessMode?: boolean
  entrepreneurMode?: boolean
  familyMode?: boolean
  personalMode?: boolean
  securityMode?: boolean
}) {
  const [copyStatus, setCopyStatus] = useState("")

  async function copyQuestion() {
    if (!navigator.clipboard) {
      setCopyStatus("Kopiranje nije dostupno.")
      return
    }

    try {
      await navigator.clipboard.writeText(topic.question)
      setCopyStatus("Pitanje je kopirano.")
    } catch {
      setCopyStatus("Kopiranje nije dostupno.")
    }
  }

  return (
    <aside
      className="conversation-selected-topic"
      aria-labelledby="conversation-selected-topic-title"
    >
      <div>
        <p className="conversation-selected-topic__label">{topic.label}</p>
        <h2 id="conversation-selected-topic-title">
          {businessMode
            ? "Poslovni povod"
            : entrepreneurMode
              ? "Pitanje za poduzetnika"
              : familyMode
                ? "Obiteljsko pitanje"
                : personalMode
                  ? "Osobni kontekst"
                  : securityMode
                    ? "Sigurnosno pitanje"
                    : "Odabrana tema"}
        </h2>
        <p>{topic.question}</p>
        {businessMode ||
        entrepreneurMode ||
        familyMode ||
        personalMode ||
        securityMode ? (
          <p className="conversation-selected-topic__business-note">
            {securityMode
              ? "Dovoljna je jedna ili dvije rečenice. Ne šaljite iznose, lokacije, privatne ključeve, Bitcoin Core wallet backup datoteke, wallet passphraseove, početne riječi drugih walleta, fotografije sigurnosnih kopija, adrese ni pristup uređajima."
              : familyMode || personalMode
                ? "Dovoljna je jedna ili dvije rečenice. Ne navodite iznose i ne šaljite privatne ključeve, Bitcoin Core wallet backup datoteke, wallet passphraseove, početne riječi drugih walleta, lozinke, snimke zaslona, dokumente ni pristup uređajima."
                : "Dovoljna je jedna ili dvije rečenice. Ne šaljite iznose, poslovne dokumente, podatke o računima, privatne ključeve, Bitcoin Core wallet backup datoteke, wallet passphraseove, početne riječi drugih walleta ni pristup sustavima."}
          </p>
        ) : null}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={copyQuestion}
        aria-describedby="conversation-copy-status"
      >
        <Copy aria-hidden="true" />
        Kopirajte pitanje
      </Button>
      <p
        id="conversation-copy-status"
        className="sr-only"
        role="status"
        aria-live="polite"
      >
        {copyStatus}
      </p>
    </aside>
  )
}

export function Conversation() {
  const [topicState, setTopicState] = useState<TopicState>({
    ready: false,
    id: null,
  })
  const selectedTopic = topicState.id ? conversationTopics[topicState.id] : null
  const businessMode = topicState.id === "tvrtka"
  const entrepreneurMode = topicState.id === "poduzetnik"
  const familyMode = topicState.id === "obitelj"
  const personalMode =
    topicState.id === "osobno" || topicState.id === "bitcoin-kao-novac"
  const securityMode = topicState.id === "sigurnost"
  const activeOutcomes = businessMode
    ? businessConversationOutcomes
    : entrepreneurMode
      ? entrepreneurConversationOutcomes
      : conversationOutcomes
  const activeAlternatives = businessMode
    ? businessConversationAlternativePaths
    : entrepreneurMode
      ? entrepreneurConversationAlternativePaths
      : conversationAlternativePaths

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTopicState({ ready: true, id: sanitizeConversationLocation() })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  function trackQuestionExamples(event: SyntheticEvent<HTMLDetailsElement>) {
    if (!event.currentTarget.open) {
      return
    }

    trackFirstPartyInteraction("conversation-more-questions-open")
  }

  function toggleQuestionExamplesWithKeyboard(
    event: KeyboardEvent<HTMLElement>
  ) {
    if (event.key !== "Enter" && event.key !== " ") {
      return
    }

    event.preventDefault()

    const details = event.currentTarget.parentElement

    if (details instanceof HTMLDetailsElement) {
      details.open = !details.open
    }
  }

  return (
    <>
      <Seo {...conversationRoute} />
      <article className="conversation-page conversation-booking-page">
        <header className="conversation-booking-hero">
          <div className="conversation-booking-shell conversation-booking-hero__grid">
            <div className="conversation-booking-hero__copy">
              <p className="conversation-booking-eyebrow">
                {businessMode
                  ? "Poslovni uvodni razgovor · 15 minuta"
                  : entrepreneurMode
                    ? "Razgovor za poduzetnika · 15 minuta"
                    : familyMode
                      ? "Obiteljski uvodni razgovor · 15 minuta"
                      : personalMode
                        ? "Osobni uvodni razgovor · 15 minuta"
                        : securityMode
                          ? "Sigurnosni uvodni razgovor · 15 minuta"
                          : "Besplatni uvodni razgovor · 15 minuta"}
              </p>
              <h1>
                {businessMode
                  ? "Počnimo poslovnim povodom, bez osjetljivih podataka."
                  : entrepreneurMode
                    ? "Razdvojimo pitanje vlasnika od pitanja poslovanja."
                    : familyMode
                      ? "Počnimo jednom obiteljskom odlukom ili odgovornošću."
                      : personalMode
                        ? "Koju osobnu Bitcoin odluku želite razjasniti?"
                        : securityMode
                          ? "Koji dio svojeg modela skrbništva želite razjasniti?"
                          : "Donesite jedno pitanje. Utvrdit ćemo koji je pravi sljedeći korak."}
              </h1>
              <p className="conversation-booking-hero__lead">
                {businessMode
                  ? "U kratkom razgovoru utvrđujemo što je otvorilo temu, tko treba sudjelovati i je li Bitcoin briefing za upravu pravi sljedeći korak."
                  : entrepreneurMode
                    ? "U kratkom razgovoru utvrđujemo pripada li pitanje jednoj Bitcoin konzultaciji, vlasnikovu osobnom Bitcoin standardu ili organizacijskom razgovoru s upravom i stručnjacima."
                    : familyMode
                      ? "U kratkom razgovoru utvrđujemo treba li razjasniti jedno obiteljsko pitanje, uključiti partnera u nastavak ili povezati prihod, dug, korištenje Bitcoina, sigurnost i kontinuitet u cijeli osobni Bitcoin standard."
                      : personalMode
                        ? "Dovoljna je jedna ili dvije rečenice o odluci koju želite razjasniti. Ne trebate unaprijed znati pripada li pitanje jednom razgovoru ili cijelom osobnom Bitcoin standardu."
                        : securityMode
                          ? "Dovoljna je jedna ili dvije rečenice o modelu, jednoj točki kvara, prvom koraku oporavka ili dokumentaciji bez tajni. Ne trebate opisati cijelu konfiguraciju."
                          : "Uvodni razgovor služi tome da razumijemo vašu situaciju i odredimo je li dovoljan vodič, treba li pripremljena Bitcoin konzultacija ili je pitanje dio šireg osobnog Bitcoin standarda."}
              </p>

              <ul
                className="conversation-booking-facts"
                aria-label="Ključne činjenice o uvodnom razgovoru"
              >
                <li>15 minuta</li>
                <li>0 €</li>
                <li>bez obveze</li>
                <li>bez osjetljivih podataka</li>
              </ul>

              <p className="conversation-booking-hero__notice">
                <strong>
                  {businessMode
                    ? "Ovo nije skraćeni besplatni briefing."
                    : entrepreneurMode
                      ? "Ovo nije skraćena besplatna poslovna konzultacija."
                      : familyMode
                        ? "Ovo nije skraćena besplatna obiteljska konzultacija."
                        : "Ovo nije skraćena besplatna konzultacija."}
                </strong>{" "}
                U 15 minuta ne rješavamo cijeli slučaj, nego određujemo što prvo
                treba razjasniti i koji oblik rada, ako ikoji, ima smisla.
              </p>

              {selectedTopic ? (
                <SelectedTopic
                  topic={selectedTopic}
                  businessMode={businessMode}
                  entrepreneurMode={entrepreneurMode}
                  familyMode={familyMode}
                  personalMode={personalMode}
                  securityMode={securityMode}
                />
              ) : null}

              <figure className="conversation-adviser">
                <img
                  src="/pavao-pahljina.jpg"
                  alt="Pavao Pahljina, Bitcoin savjetnik."
                  width="300"
                  height="300"
                  loading="eager"
                  decoding="async"
                />
                <figcaption>
                  <p>
                    <strong>Pavao Pahljina</strong>
                    <span>Bitcoin savjetnik</span>
                  </p>
                  <blockquote>
                    {businessMode
                      ? "Razgovor nije prodajni pritisak. Ako briefing nije potreban ili pitanje prvo pripada pravniku, računovođi ili drugom stručnjaku, to ću otvoreno reći."
                      : entrepreneurMode
                        ? "Ako pitanje pripada vlasniku, poslovanju, upravi ili drugom stručnjaku, razdvojit ćemo to prije nego što odaberete oblik rada."
                        : "Razgovor nije prodajni pritisak. Ako je za vaše pitanje dovoljan vodič, jedna konzultacija, drugi stručnjak ili nikakav nastavak, to ću otvoreno reći."}
                  </blockquote>
                  <a
                    href={PAVAO_PAHLJINA_PATH}
                    className="conversation-adviser__profile-link"
                    data-link="conversation-founder-profile"
                  >
                    Više o mojem pristupu i iskustvu
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </figcaption>
              </figure>

              <p className="conversation-safety-note">
                <ShieldCheck aria-hidden="true" />
                <span>
                  {businessMode
                    ? "Ne šaljite iznose, interne dokumente, podatke o računima, privatne ključeve, Bitcoin Core wallet backup datoteke, wallet passphraseove, početne riječi drugih walleta, lozinke ni pristup poslovnim sustavima."
                    : entrepreneurMode
                      ? "Dovoljna je jedna ili dvije rečenice. Ne šaljite iznose, poslovne dokumente, podatke o računima, privatne ključeve, Bitcoin Core wallet backup datoteke, wallet passphraseove, početne riječi drugih walleta ni pristup sustavima."
                      : familyMode || personalMode
                        ? "Dovoljna je jedna ili dvije rečenice. Ne navodite iznose i ne šaljite privatne ključeve, Bitcoin Core wallet backup datoteke, wallet passphraseove, početne riječi drugih walleta, lozinke, snimke zaslona, dokumente ni pristup uređajima."
                        : securityMode
                          ? "Dovoljna je jedna ili dvije rečenice. Ne šaljite iznose, lokacije, privatne ključeve, Bitcoin Core wallet backup datoteke, wallet passphraseove, početne riječi drugih walleta, fotografije sigurnosnih kopija, adrese ni pristup uređajima."
                          : "Ne navodite iznose i ne šaljite privatne ključeve, Bitcoin Core wallet backup datoteke, wallet passphraseove, početne riječi drugih walleta, lozinke, snimke zaslona novčanika, dokumente ni pristup računima."}
                </span>
              </p>
            </div>

            <CalInlineEmbed
              prefillQuestion={selectedTopic?.question}
              prefillContext={selectedTopic?.context}
              topicReady={topicState.ready}
            />
          </div>
        </header>

        <div className="conversation-booking-shell conversation-booking-main">
          <section
            className="conversation-question-prompt"
            aria-labelledby="conversation-question-prompt-title"
          >
            <div>
              <p className="conversation-booking-eyebrow">Kratka priprema</p>
              <h2 id="conversation-question-prompt-title">
                {businessMode
                  ? "U bilješku napišite jednu ili dvije rečenice"
                  : entrepreneurMode
                    ? "U bilješku napišite jednu ili dvije rečenice"
                    : familyMode
                      ? "Koju obiteljsku odluku ili odgovornost želite razjasniti?"
                      : personalMode
                        ? "U bilješku napišite jednu ili dvije rečenice"
                        : securityMode
                          ? "Koji dio svojeg modela skrbništva želite razjasniti?"
                          : "U bilješku napišite jednu rečenicu"}
              </h2>
              <blockquote>
                {businessMode ? (
                  <>
                    <strong>
                      Što je otvorilo Bitcoin kao poslovno pitanje u vašoj
                      tvrtki?
                    </strong>
                    <span>
                      Dovoljan je poslovni povod, bez iznosa i internih
                      podataka.
                    </span>
                  </>
                ) : entrepreneurMode ? (
                  <>
                    <strong>
                      Što pokušavate razdvojiti između poslovanja i osobne
                      bilance?
                    </strong>
                    <span>
                      Dovoljan je kontekst bez iznosa, dokumenata i pristupnih
                      podataka.
                    </span>
                  </>
                ) : familyMode ? (
                  <>
                    <strong>Dovoljna je jedna ili dvije rečenice.</strong>
                    <span>
                      Ne navodite iznose i ne uključujte sigurnosne podatke.
                    </span>
                  </>
                ) : personalMode ? (
                  <>
                    <strong>
                      Koju osobnu Bitcoin odluku želite razjasniti?
                    </strong>
                    <span>
                      Dovoljan je kratak kontekst bez iznosa, dokumenata i
                      pristupnih podataka.
                    </span>
                  </>
                ) : securityMode ? (
                  <>
                    <strong>Dovoljna je jedna ili dvije rečenice.</strong>
                    <span>
                      Opišite cilj ili jednu točku kvara, bez iznosa, lokacija i
                      pristupnih podataka.
                    </span>
                  </>
                ) : (
                  <>
                    <strong>Pokušavam odlučiti ______,</strong>
                    <span>a nije mi jasno ______.</span>
                  </>
                )}
              </blockquote>
            </div>
            <ul>
              {(businessMode
                ? businessConversationPreparation
                : entrepreneurMode
                  ? entrepreneurConversationPreparation
                  : familyMode
                    ? familyConversationPreparation
                    : personalMode
                      ? personalConversationPreparation
                      : securityMode
                        ? securityConversationPreparation
                        : conversationQuestionExamples
              ).map((question) => (
                <li key={question}>
                  <Check aria-hidden="true" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="conversation-purpose"
            aria-labelledby="conversation-purpose-title"
          >
            <div className="conversation-section-heading">
              <p className="conversation-booking-eyebrow">Jasna očekivanja</p>
              <h2 id="conversation-purpose-title">
                Što uvodni razgovor jest i što nije
              </h2>
            </div>
            <div className="conversation-purpose__columns">
              <div>
                <h3>Uvodni razgovor jest</h3>
                <ul>
                  {conversationPurpose.is.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Uvodni razgovor nije</h3>
                <ul>
                  {conversationPurpose.isNot.map((item) => (
                    <li key={item}>
                      <Minus aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section
            className="conversation-outcomes"
            aria-labelledby="conversation-outcomes-title"
          >
            <div className="conversation-section-heading">
              <p className="conversation-booking-eyebrow">Mogući ishod</p>
              <h2 id="conversation-outcomes-title">
                {businessMode
                  ? "Nakon 15 minuta znat ćete treba li briefing uopće organizirati"
                  : entrepreneurMode
                    ? "Nakon 15 minuta znat ćete pripada li pitanje vlasniku, poslovanju ili upravi"
                    : "Nakon 15 minuta znat ćete koji je sljedeći korak smislen"}
              </h2>
            </div>
            <div className="conversation-outcomes__list">
              {activeOutcomes.map((outcome, index) => (
                <article key={outcome.title}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{outcome.title}</h3>
                    <p>{outcome.copy}</p>
                    {"price" in outcome ? (
                      <strong className="conversation-outcomes__price">
                        {outcome.price}
                      </strong>
                    ) : null}
                  </div>
                  {"href" in outcome ? (
                    <a
                      href={outcome.href}
                      data-link={outcome.dataLink}
                      aria-label={`Saznajte više: ${outcome.title}`}
                    >
                      Saznajte više
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          {!businessMode && !entrepreneurMode && !securityMode ? (
            <section
              className="conversation-extra-questions"
              aria-labelledby="conversation-extra-questions-title"
            >
              <h2 id="conversation-extra-questions-title">
                Niste sigurni kako formulirati pitanje?
              </h2>
              <details onToggle={trackQuestionExamples}>
                <summary onKeyDown={toggleQuestionExamplesWithKeyboard}>
                  <span>Pogledajte dodatne primjere</span>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <div className="conversation-extra-questions__groups">
                  {conversationQuestionGroups.map((group) => (
                    <div key={group.title}>
                      <h3>{group.title}</h3>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            </section>
          ) : null}

          <section
            className="conversation-alternatives"
            aria-labelledby="conversation-alternatives-title"
          >
            <div className="conversation-section-heading">
              <p className="conversation-booking-eyebrow">Bez žurbe</p>
              <h2 id="conversation-alternatives-title">
                {businessMode
                  ? "Trebate materijal za interno dijeljenje?"
                  : entrepreneurMode
                    ? "Želite najprije usporediti poslovne puteve?"
                    : "Još niste spremni odabrati termin?"}
              </h2>
            </div>
            <div>
              {activeAlternatives.map((path) => (
                <a key={path.href} href={path.href} data-link={path.dataLink}>
                  <span>
                    <strong>{path.title}</strong>
                    <small>{path.copy}</small>
                  </span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  )
}
