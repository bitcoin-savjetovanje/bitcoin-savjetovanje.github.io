import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  CircleAlert,
  ClipboardCheck,
  FileText,
  HardDrive,
  KeyRound,
  LockKeyhole,
  Network,
  ScrollText,
  Server,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react"
import { useState, type SyntheticEvent } from "react"

import { Seo } from "@/components/Seo"
import { GuideCardCover } from "@/components/guides/GuideCardCover"
import { Button } from "@/components/ui/button"
import {
  custodyComparisonCriteria,
  custodyContexts,
  custodyContinuity,
  custodyDecisionCriteria,
  custodyDefinitions,
  custodyExample,
  custodyGuidePath,
  custodyKnowledgeRoles,
  custodyLegalInheritance,
  custodyModels,
  custodyNextSteps,
  custodyPlanExclusions,
  custodyPlanParts,
  custodySituations,
  custodyTransitionSteps,
} from "@/content/custodySecurity"
import { custodySecurityRoute } from "@/content/clientRoutes"
import { findGuide, guideHref } from "@/content/guides"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"

type ComparisonModelId = (typeof custodyModels)[number]["id"]

function trackDisclosure(
  event: SyntheticEvent<HTMLDetailsElement>,
  eventId: string
) {
  trackFirstPartyInteraction(eventId, {
    state: event.currentTarget.open ? "open" : "closed",
  })
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow?: string
  title: string
  copy?: string
}) {
  return (
    <div className="custody-v3-heading">
      {eyebrow ? <p className="custody-v3-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  )
}

function CustodyHero() {
  return (
    <header className="custody-v3-hero">
      <div className="custody-v3-shell custody-v3-hero__grid">
        <div className="custody-v3-hero__copy">
          <p className="custody-v3-eyebrow">
            DIO VII · SKRBNIŠTVO, OPORAVAK I KONTINUITET
          </p>
          <h1>Skrbništvo nije samo mjesto na kojem držite Bitcoin.</h1>
          <p className="custody-v3-hero__lead">
            Skrbništvo određuje tko može pristupiti Bitcoinu, pod kojim
            uvjetima, o kojim osobama i pružateljima sustav ovisi te što se
            događa kada uređaj, podatak ili ključna osoba više nisu dostupni.
          </p>

          <ul
            className="custody-v3-fact-strip"
            aria-label="Pet dimenzija modela skrbništva"
          >
            <li>kontrola</li>
            <li>operativni teret</li>
            <li>oporavak</li>
            <li>privatnost</li>
            <li>kontinuitet</li>
          </ul>

          <div className="custody-v3-hero__actions">
            <Button asChild size="lg" className="cta-primary">
              <a
                href="#modeli-skrbnistva"
                data-cta="custody-hero-models-anchor"
              >
                Usporedite modele skrbništva
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
            <a
              href="/provjera-bitcoin-standarda/"
              className="custody-v3-text-link"
              data-link="custody-hero-assessment"
            >
              Provjerite svoj Bitcoin standard
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <p className="custody-v3-hero__note">
            Ne postoji model bez rizika. Cilj je razumjeti gdje se rizik nalazi,
            tko ga nosi i može li se sustav pouzdano održavati kroz stvarne
            životne okolnosti.
          </p>
        </div>

        <figure className="custody-v3-map">
          <div
            className="custody-v3-map__canvas"
            role="img"
            aria-label="Karta skrbništva povezuje vlasnika s tehničkim slojem, skrbnikom, sigurnosnom kopijom, osobom od povjerenja i pisanim planom kroz više mogućih putova oporavka."
          >
            <span
              className="custody-v3-map__path custody-v3-map__path--one"
              aria-hidden="true"
            />
            <span
              className="custody-v3-map__path custody-v3-map__path--two"
              aria-hidden="true"
            />
            <span
              className="custody-v3-map__path custody-v3-map__path--three"
              aria-hidden="true"
            />
            <span
              className="custody-v3-map__path custody-v3-map__path--four"
              aria-hidden="true"
            />

            <div className="custody-v3-map__node custody-v3-map__node--owner">
              <UserRound aria-hidden="true" />
              <span>Vlasnik</span>
            </div>
            <div className="custody-v3-map__node custody-v3-map__node--device">
              <HardDrive aria-hidden="true" />
              <span>Tehnički sloj</span>
            </div>
            <div className="custody-v3-map__node custody-v3-map__node--backup">
              <KeyRound aria-hidden="true" />
              <span>Sigurnosna kopija</span>
            </div>
            <div className="custody-v3-map__node custody-v3-map__node--provider">
              <Server aria-hidden="true" />
              <span>Skrbnik ili pružatelj</span>
            </div>
            <div className="custody-v3-map__node custody-v3-map__node--person">
              <UsersRound aria-hidden="true" />
              <span>Osoba od povjerenja</span>
            </div>
            <div className="custody-v3-map__node custody-v3-map__node--plan">
              <ScrollText aria-hidden="true" />
              <span>Pisani plan bez tajni</span>
            </div>
            <div className="custody-v3-map__recovery">
              <ShieldCheck aria-hidden="true" />
              <span>Mogući putovi oporavka</span>
            </div>
          </div>
          <figcaption>
            Karta ne prikazuje tehničke tajne. Prikazuje uloge, ovisnosti i
            sigurne početne korake.
          </figcaption>
        </figure>
      </div>
    </header>
  )
}

function CustodyDefinitions() {
  return (
    <section className="custody-v3-section custody-v3-definitions">
      <div className="custody-v3-shell">
        <SectionHeading
          eyebrow="Osnovni pojmovi"
          title="Skrbništvo, sigurnosna kopija, oporavak, kontinuitet i nasljeđivanje nisu isto"
          copy="Pet različitih pitanja zajedno čine sigurnosni sustav, ali nijedno od njih ne može zamijeniti ostala."
        />

        <div className="custody-v3-definition-list">
          {custodyDefinitions.map((definition, index) => (
            <details
              key={definition.term}
              onToggle={(event) =>
                trackDisclosure(event, "custody-definitions-interaction")
              }
            >
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{definition.term}</h3>
                <ChevronDown aria-hidden="true" />
              </summary>
              <p>{definition.question}</p>
            </details>
          ))}
        </div>

        <blockquote className="custody-v3-pullquote">
          <strong>
            Sigurnosna kopija nije plan oporavka. Plan oporavka nije isto što i
            pravno nasljeđivanje.
          </strong>
          <span>
            Pravno nasljeđivanje uređuje se s odvjetnikom, javnim bilježnikom
            ili drugim odgovarajućim stručnjakom. Ovdje obrađujemo sigurnosnu i
            organizacijsku stranu kontinuiteta.
          </span>
        </blockquote>
      </div>
    </section>
  )
}

function CustodySituations() {
  return (
    <section className="custody-v3-section custody-v3-situations">
      <div className="custody-v3-shell">
        <SectionHeading
          title="Isti Bitcoin može biti izložen potpuno različitim rizicima"
          copy="Koja od ovih situacija najbliže opisuje vaš trenutačni model?"
        />

        <ol className="custody-v3-situation-list">
          {custodySituations.map((situation, index) => (
            <li key={situation.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{situation.title}</h3>
                <p>{situation.copy}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="custody-v3-notice">
          <CircleAlert aria-hidden="true" />
          <span>
            Najveći rizik često nije tehnologija, nego jedna osoba, jedna
            lokacija, jedna pretpostavka ili postupak koji nikada nije
            provjeren.
          </span>
        </p>
      </div>
    </section>
  )
}

function CustodyModels() {
  return (
    <section
      id="modeli-skrbnistva"
      className="custody-v3-section custody-v3-models"
    >
      <div className="custody-v3-shell">
        <SectionHeading
          eyebrow="Modeli skrbništva"
          title="Ne postoji jedan model koji je najbolji za sve"
          copy="Svaka skupina premješta kontrolu, operativni teret i mogućnost oporavka na drugo mjesto."
        />

        <div className="custody-v3-model-list">
          {custodyModels.map((model) => (
            <details
              key={model.id}
              onToggle={(event) =>
                trackDisclosure(event, "custody-models-interaction")
              }
            >
              <summary>
                <span>{model.number}</span>
                <div>
                  <h3>{model.title}</h3>
                  <p>{model.summary}</p>
                </div>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className="custody-v3-model__body">
                <div>
                  <h4>Što dobivate</h4>
                  <ul>
                    {model.gains.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>O čemu ovisite</h4>
                  <ul>
                    {model.dependencies.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Glavne vrste rizika</h4>
                  <ul>
                    {model.risks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="custody-v3-model__fit">
                  <p>
                    <strong>Kada može imati smisla</strong>
                    {model.fit}
                  </p>
                  <p>
                    <strong>Kada možda nije prikladan</strong>
                    {model.caution}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>

        <blockquote className="custody-v3-pullquote custody-v3-pullquote--dark">
          <strong>Modeli nisu moralna ljestvica.</strong>
          <span>
            Samostalnije ne znači automatski sigurnije ako osoba ne može
            pouzdano održavati i oporaviti sustav.
          </span>
        </blockquote>
      </div>
    </section>
  )
}

function CustodyComparison() {
  const [activeModel, setActiveModel] = useState<ComparisonModelId | null>(null)

  function selectModel(modelId: ComparisonModelId) {
    setActiveModel((current) => (current === modelId ? null : modelId))
    trackFirstPartyInteraction("custody-comparison-interaction")
  }

  return (
    <section className="custody-v3-section custody-v3-comparison">
      <div className="custody-v3-shell">
        <SectionHeading
          eyebrow="Usporedba"
          title="Svaki model premješta rizik na drugo mjesto"
          copy="Oznake opisuju tipične kompromise. Ne predstavljaju ocjenu, pobjednika ni univerzalnu preporuku."
        />

        <div className="custody-v3-comparison__desktop">
          <table>
            <caption className="sr-only">
              Usporedba četiriju skupina modela skrbništva prema četrnaest
              kriterija.
            </caption>
            <thead>
              <tr>
                <th scope="col">Kriterij</th>
                {custodyModels.map((model) => (
                  <th
                    key={model.id}
                    scope="col"
                    data-active={activeModel === model.id}
                  >
                    <button
                      type="button"
                      aria-pressed={activeModel === model.id}
                      onClick={() => selectModel(model.id)}
                    >
                      <span>{model.number}</span>
                      {model.title}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {custodyComparisonCriteria.map((criterion) => (
                <tr key={criterion.label}>
                  <th scope="row">{criterion.label}</th>
                  {criterion.values.map((value, index) => (
                    <td
                      key={`${criterion.label}-${custodyModels[index].id}`}
                      data-active={activeModel === custodyModels[index].id}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="custody-v3-comparison__mobile">
          {custodyModels.map((model, modelIndex) => (
            <details
              key={model.id}
              onToggle={(event) =>
                trackDisclosure(event, "custody-comparison-interaction")
              }
            >
              <summary>
                <span>{model.number}</span>
                <h3>{model.title}</h3>
                <ChevronDown aria-hidden="true" />
              </summary>
              <dl>
                {custodyComparisonCriteria.map((criterion) => (
                  <div key={criterion.label}>
                    <dt>{criterion.label}</dt>
                    <dd>{criterion.values[modelIndex]}</dd>
                  </div>
                ))}
              </dl>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function CustodyDecisionCriteria() {
  return (
    <section className="custody-v3-section custody-v3-criteria">
      <div className="custody-v3-shell custody-v3-criteria__layout">
        <div>
          <SectionHeading
            title="Prije izbora modela odgovorite na ova pitanja"
            copy="Ovo nije kalkulator preporuke. Polja služe kao privremena radna površina i ne spremaju odgovore."
          />
          <p className="custody-v3-criteria__note">
            Odgovori ne proizvode automatsku preporuku. Oni pokazuju gdje se
            nalaze odgovornost, ovisnost i pojedinačne točke kvara.
          </p>
        </div>

        <form className="custody-v3-checklist">
          {custodyDecisionCriteria.map((criterion, index) => (
            <label key={criterion}>
              <input
                type="checkbox"
                onChange={() =>
                  trackFirstPartyInteraction("custody-criteria-interaction")
                }
              />
              <span className="custody-v3-checklist__box" aria-hidden="true">
                <Check />
              </span>
              <span>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {criterion}
              </span>
            </label>
          ))}
        </form>
      </div>
    </section>
  )
}

function CustodyTransition() {
  return (
    <section className="custody-v3-section custody-v3-transition">
      <div className="custody-v3-shell">
        <SectionHeading
          eyebrow="Prijelaz"
          title="Odgovoran prijelaz ne mora biti nagli skok"
          copy="Najprije uredite razumijevanje i oporavak postojećeg sustava. Tek zatim odlučujte o dodatnoj samostalnosti ili složenosti."
        />

        <ol className="custody-v3-transition__steps">
          {custodyTransitionSteps.map((step, index) => (
            <li key={step.title}>
              <details
                onToggle={(event) =>
                  trackDisclosure(event, "custody-transition-interaction")
                }
              >
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <ul>
                  {step.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ol>

        <blockquote className="custody-v3-pullquote">
          Najsigurniji sljedeći korak nije uvijek najnapredniji konačni model.
        </blockquote>
      </div>
    </section>
  )
}

function CustodyExample() {
  const groups = [
    {
      title: "Početna situacija",
      items: custodyExample.startingPoint,
    },
    {
      title: "Procijenjene slabosti",
      items: custodyExample.weaknesses,
    },
    {
      title: "Nakon uređivanja",
      items: custodyExample.after,
    },
  ] as const

  return (
    <section className="custody-v3-section custody-v3-example">
      <div className="custody-v3-shell">
        <SectionHeading
          eyebrow="Konkretan primjer"
          title="Dio Bitcoina kod skrbnika, dio u samostalnom skrbništvu, ali bez zajedničkog plana"
          copy="Primjer ne predstavlja stvarnu osobu, iznose, pružatelje, lokacije ni tehničku preporuku."
        />

        <details
          className="custody-v3-example__disclosure"
          onToggle={(event) =>
            trackDisclosure(event, "custody-example-interaction")
          }
        >
          <summary>
            <span>Izmišljeni ogledni primjer</span>
            <strong>Otvorite početnu situaciju i uređeni sustav</strong>
            <ChevronDown aria-hidden="true" />
          </summary>
          <div className="custody-v3-example__grid">
            {groups.map((group, index) => (
              <article key={group.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </details>

        <blockquote className="custody-v3-pullquote custody-v3-pullquote--light">
          Odgovoran sustav ne mora svu kontrolu smjestiti na isto mjesto niti
          koristiti isti model za svaku namjenu.
        </blockquote>
      </div>
    </section>
  )
}

function CustodyPlanPreview() {
  return (
    <section className="custody-v3-section custody-v3-plan">
      <div className="custody-v3-shell">
        <SectionHeading
          eyebrow="Pisani rezultat"
          title="Skrbništvo se može dokumentirati bez zapisivanja tajni"
          copy="Karta skrbništva može biti dio Sažetka Bitcoin konzultacije, osobnog Bitcoin standarda, obiteljskog sigurnosnog plana ili internog poslovnog okvira."
        />

        <div className="custody-v3-plan__layout">
          <div className="custody-v3-plan__parts">
            {custodyPlanParts.map((part, index) => (
              <article key={part.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{part.title}</h3>
                  <ul>
                    {part.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}

            <aside className="custody-v3-plan__exclusions">
              <LockKeyhole aria-hidden="true" />
              <div>
                <h3>Dokument nikada ne sadrži</h3>
                <p>{custodyPlanExclusions.join(", ")}.</p>
              </div>
            </aside>
          </div>

          <figure className="custody-v3-document">
            <a
              href="/images/sample-standard/ogledni-standard-sigurnost.webp"
              target="_blank"
              rel="noreferrer"
              data-link="custody-plan-document-image"
              aria-label="Otvorite veću oglednu stranicu karte skrbništva"
            >
              <img
                src="/images/sample-standard/ogledni-standard-sigurnost.webp"
                alt="Izmišljena ogledna stranica osobnog Bitcoin standarda o sigurnosti i kontinuitetu. Prikazuje model potpisa, obiteljske uloge, dokumentaciju bez tajni, provjeru i prvi korak oporavka."
                width="1191"
                height="1684"
                loading="lazy"
                decoding="async"
              />
              <span>
                <FileText aria-hidden="true" />
                Izmišljeni ogledni primjer
              </span>
            </a>
            <figcaption>
              <p>
                Stvarna izvezena stranica iz oglednog osobnog Bitcoin standarda
                prikazuje kako sigurnosna karta može izgledati bez pristupnih
                podataka.
              </p>
              <a
                href="/primjer-osobnog-bitcoin-standarda/"
                className="custody-v3-text-link"
                data-link="custody-sample-standard"
              >
                Pogledajte izmišljeni ogledni osobni Bitcoin standard
                <ArrowUpRight aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

function CustodyKnowledgeRoles() {
  const groups = [
    {
      title: "Partner, obitelj ili suradnik mogu trebati znati",
      items: custodyKnowledgeRoles.shouldKnow,
      icon: UsersRound,
    },
    {
      title: "Ne trebaju automatski imati",
      items: custodyKnowledgeRoles.doesNotNeed,
      icon: KeyRound,
    },
  ] as const

  return (
    <section className="custody-v3-section custody-v3-knowledge">
      <div className="custody-v3-shell">
        <SectionHeading title="Informiranost, ovlast i neposredan pristup nisu ista stvar" />

        <div className="custody-v3-knowledge__grid">
          {groups.map(({ title, items, icon: Icon }, index) => (
            <details
              key={title}
              onToggle={(event) =>
                trackDisclosure(event, "custody-knowledge-interaction")
              }
            >
              <summary>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <ChevronDown aria-hidden="true" />
              </summary>
              <ul data-variant={index === 0 ? "know" : "access"}>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <blockquote className="custody-v3-pullquote">
          Dobar sustav daje pravim ljudima dovoljno razumijevanja za očuvanje
          sustava, ali ne više pristupa nego što njihova uloga zahtijeva.
        </blockquote>
      </div>
    </section>
  )
}

function CustodyInheritanceBoundary() {
  return (
    <section className="custody-v3-section custody-v3-boundary">
      <div className="custody-v3-shell">
        <SectionHeading
          eyebrow="Granica"
          title="Oporavak pristupa i pravni prijenos vlasništva nisu isti proces"
        />

        <div className="custody-v3-boundary__grid">
          <article>
            <ShieldCheck aria-hidden="true" />
            <p className="custody-v3-eyebrow">Sigurnosni kontinuitet</p>
            <h3>Održavanje sustava kada je vlasnik nedostupan</h3>
            <ul>
              {custodyContinuity.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <ScrollText aria-hidden="true" />
            <p className="custody-v3-eyebrow">Pravno nasljeđivanje</p>
            <h3>Prijenos vlasništva s odgovarajućim stručnjacima</h3>
            <ul>
              {custodyLegalInheritance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <p className="custody-v3-boundary__note">
          Karta skrbništva i plan oporavka nisu oporuka niti pravni dokument.
          Mogu pokazati koja pitanja treba urediti s odvjetnikom, javnim
          bilježnikom ili drugim stručnjakom.
        </p>
      </div>
    </section>
  )
}

function CustodyContexts() {
  const icons = {
    personal: UserRound,
    family: UsersRound,
    entrepreneurs: BriefcaseBusiness,
  } as const

  return (
    <section className="custody-v3-section custody-v3-contexts">
      <div className="custody-v3-shell">
        <SectionHeading title="Isti model može imati potpuno drukčije zahtjeve ovisno o tome kome Bitcoin pripada" />

        <div className="custody-v3-contexts__grid">
          {custodyContexts.map((context) => {
            const Icon = icons[context.id]

            return (
              <article key={context.id}>
                <span className="custody-v3-contexts__icon" aria-hidden="true">
                  <Icon />
                </span>
                <p className="custody-v3-eyebrow">{context.eyebrow}</p>
                <h3>{context.title}</h3>
                <p>{context.copy}</p>
                <div>
                  <a
                    href={context.href}
                    className="custody-v3-text-link"
                    data-link={`custody-context-${context.id}`}
                  >
                    {context.label}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                  {"secondaryHref" in context ? (
                    <a
                      href={context.secondaryHref}
                      className="custody-v3-text-link"
                      data-link="custody-context-business"
                    >
                      {context.secondaryLabel}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CustodyGuidePath() {
  return (
    <section className="custody-v3-section custody-v3-guides">
      <div className="custody-v3-shell">
        <SectionHeading
          eyebrow="Daljnje čitanje"
          title="Učite redoslijedom kojim se donosi odluka"
          copy="Naslovi i naslovnice preuzimaju se iz aktualnih vodiča, a ne iz starijih prikaznih naziva."
        />

        <ol className="custody-v3-guides__grid">
          {custodyGuidePath.map((step) => {
            const guide = findGuide(step.slug)

            if (!guide) {
              return null
            }

            return (
              <li key={step.slug}>
                <div className="custody-v3-guides__step">
                  <span>{step.step}</span>
                  <p>{step.action}</p>
                </div>
                <GuideCardCover guide={guide} />
                <div className="custody-v3-guides__copy">
                  <h3>{guide.title}</h3>
                  <p>{step.copy}</p>
                  <a
                    href={guideHref(guide.slug)}
                    className="custody-v3-text-link"
                    data-link={`custody-guide-${step.step}`}
                  >
                    Pročitajte vodič
                    <ArrowRight aria-hidden="true" />
                  </a>
                </div>
              </li>
            )
          })}
        </ol>

        <aside className="custody-v3-security-bridge">
          <div>
            <p className="custody-v3-eyebrow">Primjena na vašu situaciju</p>
            <h3>Kako izgleda konkretan sigurnosni rad?</h3>
            <p>
              Stranica sigurnosnog pristupa objašnjava što procjenjujemo, koje
              podatke nikada ne tražimo i kako izgleda rad bez predaje kontrole.
            </p>
          </div>
          <a
            href="/sigurnost/"
            className="custody-v3-text-link"
            data-link="custody-security-approach"
          >
            Pogledajte sigurnosni pristup Bitcoin Savjetovanja
            <ArrowUpRight aria-hidden="true" />
          </a>
        </aside>
      </div>
    </section>
  )
}

function CustodyNextSteps() {
  const icons = {
    assessment: ClipboardCheck,
    consultation: Network,
    standard: Building2,
  } as const

  return (
    <section className="custody-v3-section custody-v3-next">
      <div className="custody-v3-shell">
        <SectionHeading
          eyebrow="Sljedeći korak"
          title="Razumjeti modele nije isto što i odabrati model za vlastiti život"
          copy="Odaberite put prema tome koliko je pitanje široko, a ne prema tome koji format izgleda naprednije."
        />

        <div className="custody-v3-next__grid">
          {custodyNextSteps.map((step) => {
            const Icon = icons[step.id]

            return (
              <article key={step.id}>
                <span className="custody-v3-next__icon" aria-hidden="true">
                  <Icon />
                </span>
                <p className="custody-v3-eyebrow">{step.eyebrow}</p>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <ul>
                  {step.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
                <a
                  href={step.href}
                  className="custody-v3-text-link"
                  data-link={`custody-next-${step.id}`}
                >
                  {step.label}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </article>
            )
          })}
        </div>

        <div className="custody-v3-next__footer">
          <p>
            Ne morate unaprijed znati koji vam oblik rada treba. Besplatna
            provjera ili uvodni razgovor služe upravo tome.
          </p>
          <a
            href="/razgovor/?tema=sigurnost"
            className="custody-v3-text-link"
            data-link="custody-final-security-conversation"
          >
            Dogovorite 15-minutni sigurnosni razgovor
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

export function CustodySecurity() {
  return (
    <>
      <Seo {...custodySecurityRoute} />
      <article className="custody-v3">
        <CustodyHero />
        <CustodyDefinitions />
        <CustodySituations />
        <CustodyModels />
        <CustodyComparison />
        <CustodyDecisionCriteria />
        <CustodyTransition />
        <CustodyExample />
        <CustodyPlanPreview />
        <CustodyKnowledgeRoles />
        <CustodyInheritanceBoundary />
        <CustodyContexts />
        <CustodyGuidePath />
        <CustodyNextSteps />
      </article>
    </>
  )
}
