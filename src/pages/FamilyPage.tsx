import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Minus,
  ShieldCheck,
} from "lucide-react"
import type { SyntheticEvent } from "react"

import { renderSaifedeanAmmousReference } from "@/components/SaifedeanAmmousReference"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import {
  familyContinuityScope,
  familyExample,
  familyFinalCta,
  familyFounder,
  familyHero,
  familyKnowledge,
  familyLegalScope,
  familyResponsibilityMap,
  familySeo,
  familyServicePaths,
  familySituations,
  familyStandardLayers,
  familyStressTests,
  familyUnderstandingLevels,
  familyWorkBoundaries,
} from "@/content/family"
import { FAMILY_AUDIENCE_PATH, SITE_URL } from "@/content/site"
import { socialImages } from "@/content/socialImages"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"

function SectionHeading({
  eyebrow,
  title,
  copy,
  id,
}: {
  eyebrow?: string
  title: string
  copy?: string
  id?: string
}) {
  return (
    <div className="family-section-heading">
      {eyebrow ? <p className="family-eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  )
}

function trackOpen(
  id: string,
  event: SyntheticEvent<HTMLDetailsElement>,
  metadata: Readonly<Record<string, string>> = {}
) {
  if (!event.currentTarget.open) {
    return
  }

  trackFirstPartyInteraction(id, metadata)
}

function FamilyHero() {
  return (
    <header className="family-hero">
      <div className="family-shell family-hero__layout">
        <div className="family-hero__copy">
          <p className="family-eyebrow">{familyHero.eyebrow}</p>
          <h1>{familyHero.title}</h1>
          <p className="family-hero__lead">{familyHero.lead}</p>
          <p className="family-hero__positioning">{familyHero.positioning}</p>

          <ul
            className="family-hero__signals"
            aria-label="Područja obiteljskog Bitcoin standarda"
          >
            {familyHero.signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>

          <div className="family-hero__actions">
            <Button
              asChild
              size="lg"
              className="cta-primary family-primary-button"
            >
              <a
                href={familyHero.primaryCta.href}
                data-cta="family-hero-conversation"
              >
                <CalendarDays aria-hidden="true" />
                {familyHero.primaryCta.label}
              </a>
            </Button>
            <a
              href={familyHero.secondaryCta.href}
              className="family-text-link"
              data-link="family-hero-security"
            >
              {familyHero.secondaryCta.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <p className="family-safety-note">
            <ShieldCheck aria-hidden="true" />
            <span>{familyHero.safetyNote}</span>
          </p>
        </div>

        <figure className="family-hero__visual">
          <picture>
            <source
              srcSet="/images/audiences/obitelj-hero.webp"
              type="image/webp"
            />
            <img
              src="/images/audiences/obitelj-hero.jpg"
              width="1672"
              height="941"
              alt="Par za stolom pregledava obiteljska pravila uz trezor, ključeve i Bitcoin kovanicu."
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
          <figcaption>
            Zajednički dokument povezuje pravila i uloge, bez zapisivanja tajni.
          </figcaption>
        </figure>
      </div>
    </header>
  )
}

function FamilySituations() {
  return (
    <section
      className="family-section family-situations"
      aria-labelledby="family-situations-title"
    >
      <SectionHeading
        id="family-situations-title"
        title="Obiteljski problem ne počinje uvijek na istom mjestu"
        copy="Koja od ovih situacija najbolje opisuje vašu obitelj?"
      />
      <ol className="family-editorial-list">
        {familySituations.map((situation, index) => (
          <li key={situation.title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h3>{situation.title}</h3>
            <p>{situation.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function FamilySharedUnderstanding() {
  return (
    <section
      className="family-section family-understanding"
      aria-labelledby="family-understanding-title"
    >
      <SectionHeading
        eyebrow="ZAJEDNIČKO RAZUMIJEVANJE"
        id="family-understanding-title"
        title="Partner ne mora postati Bitcoin stručnjak"
        copy="Partner ne mora imati isto znanje, istu razinu uvjerenja ni isti interes za tehniku. Ali zajednička odluka traži dovoljno razumijevanja da obje osobe znaju što sustav pokušava postići, koje rizike prihvaća i koja pravila vrijede."
      />

      <div className="family-understanding__levels">
        {familyUnderstandingLevels.map((level, index) => (
          <article key={level.title}>
            <span aria-hidden="true">{index + 1}</span>
            <h3>{level.title}</h3>
            <p>{level.copy}</p>
          </article>
        ))}
      </div>

      <blockquote className="family-pullquote">
        Cilj nije pobijediti u raspravi o Bitcoinu. Cilj je izgraditi sustav
        koji obje osobe razumiju dovoljno da ga mogu mirno provoditi.
      </blockquote>
    </section>
  )
}

function FamilyStandardLayers() {
  return (
    <section
      className="family-section family-layers"
      aria-labelledby="family-layers-title"
    >
      <SectionHeading
        eyebrow="OBITELJSKI SUSTAV"
        id="family-layers-title"
        title="Četiri sloja koja moraju raditi zajedno"
        copy="Obiteljski Bitcoin standard nije samo sigurnosni postupak. Novac, uloge, zaštita i kontinuitet moraju se međusobno podržavati."
      />

      <nav className="family-layer-nav" aria-label="Četiri sloja standarda">
        {familyStandardLayers.map((layer) => (
          <a
            key={layer.number}
            href={`#family-layer-${layer.number}`}
            onClick={() =>
              trackFirstPartyInteraction("family-layers-interaction", {
                layer: layer.number,
              })
            }
          >
            <span>{layer.number}</span>
            {layer.title}
          </a>
        ))}
      </nav>

      <ol className="family-layer-list">
        {familyStandardLayers.map((layer) => (
          <li key={layer.number} id={`family-layer-${layer.number}`}>
            <div className="family-layer-list__number" aria-hidden="true">
              {layer.number}
            </div>
            <div>
              <h3>{layer.title}</h3>
              <p>{layer.intro}</p>
              <ul>
                {layer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {"link" in layer ? (
                <a
                  href={layer.link.href}
                  className="family-text-link"
                  data-link={`family-layer-guide-${layer.number}`}
                >
                  {layer.link.label}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function FamilyExample() {
  return (
    <section
      className="family-section family-example"
      aria-labelledby="family-example-title"
    >
      <SectionHeading
        eyebrow="KONKRETAN PRIMJER"
        id="family-example-title"
        title="Jedna obitelj, zajednički novac i sustav koji ovisi o jednoj osobi"
      />

      <div className="family-example__case">
        <div className="family-example__intro">
          <p className="family-example__label">{familyExample.label}</p>
          <h3>{familyExample.title}</h3>
          <ul>
            {familyExample.profile.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            Imena su izmišljena. Primjer ne koristi stvarne klijente, iznose ni
            sigurnosne podatke.
          </p>
        </div>

        <div className="family-example__before">
          <p className="family-example__kicker">Početna situacija</p>
          <ul>
            {familyExample.before.map((item) => (
              <li key={item}>
                <Minus aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <details
          className="family-example__after"
          onToggle={(event) =>
            trackOpen("family-example-open", event, {
              example: "marko-ivana",
            })
          }
        >
          <summary>
            <span>
              <strong>Nakon procesa</strong>
              Pogledajte što se promijenilo
            </span>
            <ChevronDown aria-hidden="true" />
          </summary>
          <ul>
            {familyExample.after.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>

      <blockquote className="family-example__conclusion">
        {familyExample.conclusion}
      </blockquote>
    </section>
  )
}

function FamilyKnowledgeBoundaries() {
  return (
    <section
      className="family-section family-knowledge"
      aria-labelledby="family-knowledge-title"
    >
      <SectionHeading
        id="family-knowledge-title"
        title="Dovoljno znanja za sigurnu ulogu — bez nepotrebnog pristupa"
      />
      <div className="family-knowledge__columns">
        <article>
          <p className="family-knowledge__label">Obitelj treba znati</p>
          <ul>
            {familyKnowledge.needed.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article>
          <p className="family-knowledge__label">Obitelj ne mora imati</p>
          <ul>
            {familyKnowledge.notNeeded.map((item) => (
              <li key={item}>
                <Minus aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
      <p className="family-knowledge__principle">
        Informiranost i neposredan pristup nisu ista stvar.
      </p>
    </section>
  )
}

function FamilyResponsibilityMap() {
  return (
    <section
      className="family-section family-responsibility"
      aria-labelledby="family-responsibility-title"
    >
      <SectionHeading
        eyebrow="PISANI REZULTAT"
        id="family-responsibility-title"
        title="Kako izgleda obiteljska karta odgovornosti?"
        copy="U sklopu pisanog osobnog Bitcoin standarda može se urediti jedna sažeta obiteljska stranica. Ona određuje razumijevanje, uloge, prvi korak i provjeru, ali ne sadrži podatke za pristup sredstvima."
      />

      <div className="family-responsibility__layout">
        <div
          className="family-responsibility__map"
          aria-label="Sadržaj obiteljske karte odgovornosti"
        >
          {familyResponsibilityMap.map((area, index) => (
            <details
              key={area.title}
              onToggle={(event) =>
                trackOpen("family-responsibility-map-interaction", event, {
                  area: String(index + 1),
                })
              }
            >
              <summary>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{area.title}</strong>
                <ChevronDown aria-hidden="true" />
              </summary>
              <ul>
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <figure className="family-responsibility__document">
          <a
            href="/primjer-osobnog-bitcoin-standarda/"
            data-link="family-sample-standard-document"
            aria-label="Otvorite cijeli izmišljeni ogledni osobni Bitcoin standard"
          >
            <img
              src="/images/sample-standard/ogledni-standard-v1.webp"
              width="1191"
              height="1684"
              alt="Stranica izmišljenog oglednog osobnog Bitcoin standarda sa sažetim pravilima; sigurnosno pravilo navodi da obitelj zna prvi korak, a dokument ne sadrži tajne."
              loading="lazy"
              decoding="async"
            />
          </a>
          <figcaption>
            <span>IZMIŠLJENI OGLEDNI PRIMJER</span>
            Stvarna stranica iz oglednog pisanog standarda.
          </figcaption>
        </figure>
      </div>

      <a
        href="/primjer-osobnog-bitcoin-standarda/"
        className="family-text-link family-responsibility__sample-link"
        data-link="family-sample-standard-full"
      >
        Pogledajte cijeli izmišljeni ogledni standard
        <ArrowUpRight aria-hidden="true" />
      </a>
    </section>
  )
}

function FamilyStressTest() {
  return (
    <section
      className="family-section family-stress"
      aria-labelledby="family-stress-title"
    >
      <SectionHeading
        eyebrow="PROVJERA SUSTAVA"
        id="family-stress-title"
        title="Može li obiteljski Bitcoin standard izdržati stvarni život?"
      />
      <ol className="family-stress__list">
        {familyStressTests.map((test, index) => (
          <li key={test.title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{test.title}</h3>
              <ul>
                {test.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <p className="family-stress__note">
        <ShieldCheck aria-hidden="true" />
        <span>
          Stres-test ne znači stvarno otkrivanje ili premještanje sredstava.
          Testira se razumijevanje, dokumentacija, odgovornosti i postupak.
        </span>
      </p>
    </section>
  )
}

function FamilyServicePaths() {
  return (
    <section
      className="family-section family-services"
      aria-labelledby="family-services-title"
    >
      <SectionHeading
        eyebrow="SLJEDEĆI KORAK"
        id="family-services-title"
        title="Ne treba svakoj obitelji isti oblik rada"
      />
      <div className="family-services__list">
        {familyServicePaths.map((path, index) => (
          <article key={path.title}>
            <div className="family-services__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <p className="family-services__eyebrow">{path.eyebrow}</p>
              <h3>{path.title}</h3>
              <p>{path.copy}</p>
              <p className="family-services__items-label">{path.itemsLabel}</p>
              <ul className="family-services__items">
                {path.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {"facts" in path ? (
                <strong className="family-services__facts">{path.facts}</strong>
              ) : null}
            </div>
            <a
              href={path.href}
              className="family-text-link"
              data-link={path.dataLink}
            >
              {path.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
      <p className="family-services__note">
        Ne morate unaprijed znati koji vam oblik rada treba. Uvodni razgovor
        služi upravo tome.
      </p>
    </section>
  )
}

function FamilyLegalBoundaries() {
  return (
    <section
      className="family-section family-legal"
      aria-labelledby="family-legal-title"
    >
      <SectionHeading
        id="family-legal-title"
        title="Oporavak, kontinuitet i pravno nasljeđivanje nisu ista stvar"
      />

      <div className="family-legal__scope">
        <article>
          <h3>Obiteljski i sigurnosni kontinuitet</h3>
          <p>Bitcoin Savjetovanje može pomoći urediti:</p>
          <ul>
            {familyContinuityScope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Pravno nasljeđivanje</h3>
          <p>Pripada odgovarajućim stručnjacima za:</p>
          <ul>
            {familyLegalScope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <blockquote>
        Pisani osobni Bitcoin standard nije oporuka niti pravni dokument. On
        može jasno pokazati koja pitanja treba urediti s odvjetnikom, javnim
        bilježnikom ili drugim odgovarajućim stručnjakom.
      </blockquote>
      <p className="family-legal__expert-note">
        Za porezna i pravna pitanja trebate odgovarajuće stručnjake.
      </p>

      <div className="family-legal__boundaries">
        <h3>Granice rada</h3>
        <ul>
          {familyWorkBoundaries.map((item) => (
            <li key={item}>
              <Minus aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <a
          href="/skrbnistvo-i-sigurnost/"
          className="family-text-link"
          data-link="family-custody-security"
        >
          Proučite modele skrbništva i sigurnosti
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

function FamilyFounder() {
  return (
    <section
      className="family-section family-founder"
      aria-labelledby="family-founder-title"
    >
      <figure>
        <picture>
          <source
            srcSet="/pavao-pahljina-480.webp 480w, /pavao-pahljina.webp 800w"
            type="image/webp"
          />
          <img
            src="/pavao-pahljina.jpg"
            width="800"
            height="800"
            alt="Pavao Pahljina u mediteranskom okruženju."
            loading="lazy"
            decoding="async"
          />
        </picture>
        <figcaption>Pavao Pahljina · Bitcoin Savjetovanje</figcaption>
      </figure>

      <div>
        <p className="family-eyebrow">Tko vodi razgovor</p>
        <h2 id="family-founder-title">{familyFounder.name}</h2>
        <p className="family-founder__lead">{familyFounder.copy}</p>
        <ul>
          {familyFounder.facts.map((fact) => (
            <li key={fact}>{renderSaifedeanAmmousReference(fact)}</li>
          ))}
        </ul>
        <blockquote>{familyFounder.quote}</blockquote>
        <a
          href={familyFounder.link.href}
          className="family-text-link"
          data-link="family-founder-profile"
        >
          {familyFounder.link.label}
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

function FamilyFinalCta() {
  return (
    <section
      className="family-section family-final"
      aria-labelledby="family-final-title"
    >
      <div className="family-final__panel">
        <p className="family-eyebrow">{familyFinalCta.eyebrow}</p>
        <h2 id="family-final-title">{familyFinalCta.title}</h2>
        <p>{familyFinalCta.copy}</p>
        <div className="family-final__actions">
          <Button
            asChild
            size="lg"
            className="cta-primary family-primary-button"
          >
            <a
              href={familyFinalCta.primaryCta.href}
              data-cta="family-final-conversation"
            >
              <CalendarDays aria-hidden="true" />
              {familyFinalCta.primaryCta.label}
            </a>
          </Button>
          <a
            href={familyFinalCta.secondaryCta.href}
            className="family-text-link"
            data-link="family-final-sample-standard"
          >
            {familyFinalCta.secondaryCta.label}
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <p className="family-final__participation">
          {familyFinalCta.participationNote}
        </p>
        <p className="family-final__safety">
          <ShieldCheck aria-hidden="true" />
          <span>{familyFinalCta.safetyNote}</span>
        </p>
      </div>
    </section>
  )
}

export function FamilyPage() {
  const socialImage = socialImages.audiences.obitelj

  return (
    <>
      <Seo
        title={familySeo.title}
        description={familySeo.description}
        canonical={`${SITE_URL}${FAMILY_AUDIENCE_PATH}`}
        ogTitle={familySeo.title}
        ogDescription={familySeo.description}
        ogImage={socialImage.ogImage}
        ogImageWidth={socialImage.ogImageWidth}
        ogImageHeight={socialImage.ogImageHeight}
      />
      <article className="family-page">
        <FamilyHero />
        <div className="family-shell family-page__flow">
          <FamilySituations />
          <FamilySharedUnderstanding />
          <FamilyStandardLayers />
          <FamilyExample />
          <FamilyKnowledgeBoundaries />
          <FamilyResponsibilityMap />
          <FamilyStressTest />
          <FamilyServicePaths />
          <FamilyLegalBoundaries />
          <FamilyFounder />
          <FamilyFinalCta />
        </div>
      </article>
    </>
  )
}
