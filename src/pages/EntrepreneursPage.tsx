import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  ShieldCheck,
} from "lucide-react"

import { renderSaifedeanAmmousReference } from "@/components/SaifedeanAmmousReference"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { audiencePagesBySlug } from "@/content/audiences"
import {
  businessMoneyLayers,
  businessSecurityQuestions,
  entrepreneurConversationPath,
  entrepreneurFitContexts,
  entrepreneurFounderFacts,
  entrepreneurGuides,
  entrepreneurResponsibilities,
  entrepreneurServicePaths,
  entrepreneurTriggers,
  fictionalEntrepreneur,
  securityRoles,
} from "@/content/entrepreneurs"
import { CUSTODY_SECURITY_PATH, SITE_URL } from "@/content/site"
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
    <div className="entrepreneurs-section-heading">
      {eyebrow ? <p className="entrepreneurs-eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  )
}

function EntrepreneursHero() {
  return (
    <header className="entrepreneurs-hero">
      <div className="entrepreneurs-shell entrepreneurs-hero__grid">
        <div className="entrepreneurs-hero__copy">
          <p className="entrepreneurs-eyebrow">BITCOIN ZA PODUZETNIKE</p>
          <h1>Najprije razdvojite novac posla od novca vlasnika.</h1>
          <p className="entrepreneurs-hero__lead">
            Za poduzetnike kod kojih se privatne i poslovne odluke susreću u
            istoj osobi, ali ne smiju završiti u istoj bilanci, novčaniku ili
            sigurnosnom postupku.
          </p>

          <ul className="entrepreneurs-hero__facts" aria-label="Teme stranice">
            <li>poslovne obveze</li>
            <li>dugoročni poslovni saldo</li>
            <li>privatni Bitcoin</li>
            <li>ovlasti i sigurnost</li>
          </ul>

          <div className="entrepreneurs-hero__actions">
            <Button asChild className="cta-primary home-primary-button">
              <a
                href={entrepreneurConversationPath}
                data-cta="entrepreneurs-hero-conversation"
              >
                <CalendarDays aria-hidden="true" />
                Razjasnite jednu poslovnu Bitcoin odluku
              </a>
            </Button>
            <a
              href="/za-tvrtke/"
              className="entrepreneurs-text-link"
              data-link="entrepreneurs-hero-business"
            >
              Imate upravu ili financijski tim? Pogledajte briefing za tvrtke
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <p className="entrepreneurs-hero__note">
            Organizacijski i Bitcoin okvir, bez upravljanja poslovnim
            sredstvima, skrbništva i izvršenja transakcija.
          </p>
        </div>

        <figure className="entrepreneurs-hero__visual">
          <picture>
            <source
              srcSet="/images/audiences/poduzetnici-slojevi-hero-20260724.webp"
              type="image/webp"
            />
            <img
              src="/images/audiences/poduzetnici-slojevi-hero-20260724.jpg"
              alt="Tri odvojene cjeline na mediteranskom radnom stolu: poslovne obveze, dugoročni poslovni saldo i osobna bilanca vlasnika."
              width="1672"
              height="941"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
          <figcaption>
            <span>Poslovne obveze</span>
            <span>Dugoročni poslovni saldo</span>
            <span>Osobna bilanca vlasnika</span>
          </figcaption>
        </figure>
      </div>
    </header>
  )
}

function EntrepreneurFitSection() {
  return (
    <section
      className="entrepreneurs-section entrepreneurs-fit"
      aria-labelledby="entrepreneurs-fit-title"
    >
      <SectionHeading
        id="entrepreneurs-fit-title"
        title="Koja situacija najbolje opisuje vas?"
        copy="Granica prema stranici za tvrtke ovisi o tome donosi li odluku jedna osoba ili organizacija s više formalnih odgovornosti."
      />
      <ol className="entrepreneurs-fit__list">
        {entrepreneurFitContexts.map((context) => (
          <li key={context.number}>
            <span aria-hidden="true">{context.number}</span>
            <div>
              <h3>{context.title}</h3>
              <p>{context.copy}</p>
              {"points" in context ? (
                <ul>
                  {context.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
              {"note" in context ? (
                <p className="entrepreneurs-fit__note">{context.note}</p>
              ) : null}
              {"href" in context ? (
                <a
                  href={context.href}
                  className="entrepreneurs-text-link"
                  data-link="entrepreneurs-fit-business"
                >
                  {context.linkLabel}
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

function BusinessMoneyLayers() {
  return (
    <section
      className="entrepreneurs-section entrepreneurs-money-layers"
      aria-labelledby="entrepreneurs-money-layers-title"
    >
      <SectionHeading
        eyebrow="TEMELJNA GRANICA"
        id="entrepreneurs-money-layers-title"
        title="Tri sloja koja ista osoba može kontrolirati, ali ne smije miješati"
        copy="Ista osoba može kontrolirati poslovni račun, privatnu imovinu i poslovne odluke. To ih ne pretvara u isti novac, istu bilancu ili isti sigurnosni sustav."
      />

      <nav
        className="entrepreneurs-money-map"
        aria-label="Brzi pregled triju novčanih slojeva"
      >
        {businessMoneyLayers.map((layer, index) => (
          <a
            key={layer.id}
            href={`#${layer.id}`}
            data-link="entrepreneurs-money-layer"
            onClick={() =>
              trackFirstPartyInteraction(
                "entrepreneurs-money-layers-interaction",
                { layer: index + 1 }
              )
            }
          >
            <span>{layer.number}</span>
            <strong>{layer.label}</strong>
            <ArrowDown aria-hidden="true" />
          </a>
        ))}
      </nav>

      <div className="entrepreneurs-money-layers__list">
        {businessMoneyLayers.map((layer) => (
          <article id={layer.id} key={layer.id}>
            <div className="entrepreneurs-money-layers__number">
              <span>{layer.number}</span>
              <small>{layer.label}</small>
            </div>
            <div>
              <h3>{layer.title}</h3>
              <p>{layer.copy}</p>
              {"prompt" in layer ? (
                <p className="entrepreneurs-money-layers__prompt">
                  {layer.prompt}
                </p>
              ) : null}
              <ul>
                {layer.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
              {"conclusion" in layer ? (
                <blockquote>{layer.conclusion}</blockquote>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <p className="entrepreneurs-money-layers__principle">
        Ista osoba može kontrolirati sva tri sloja. To ih ne pretvara u isti
        novac.
      </p>
    </section>
  )
}

function EntrepreneurTriggers() {
  return (
    <section
      className="entrepreneurs-section entrepreneurs-triggers"
      aria-labelledby="entrepreneurs-triggers-title"
    >
      <SectionHeading
        id="entrepreneurs-triggers-title"
        title="Poduzetnici se najčešće javljaju kada"
      />
      <ol>
        {entrepreneurTriggers.map((trigger, index) => (
          <li key={trigger.title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{trigger.title}</h3>
              <p>{trigger.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function EntrepreneurExample() {
  return (
    <section
      className="entrepreneurs-section entrepreneurs-example"
      aria-labelledby="entrepreneurs-example-title"
    >
      <SectionHeading
        eyebrow="KONKRETAN PRIMJER"
        id="entrepreneurs-example-title"
        title="Jedna osoba, dvije bilance i tri različite vrste odluka"
      />

      <div className="entrepreneurs-example__sheet">
        <div className="entrepreneurs-example__masthead">
          <span>{fictionalEntrepreneur.label}</span>
          <span aria-hidden="true">01 / 01</span>
        </div>
        <div className="entrepreneurs-example__intro">
          <div>
            <p>Ogledni kontekst</p>
            <h3>{fictionalEntrepreneur.name}</h3>
          </div>
          <ul>
            {fictionalEntrepreneur.companyFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>

        <div className="entrepreneurs-example__questions">
          <article>
            <p className="entrepreneurs-example__label">Poslovna bilanca</p>
            <h3>Poslovna pitanja</h3>
            <ul>
              {fictionalEntrepreneur.businessQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </article>
          <article>
            <p className="entrepreneurs-example__label">Osobna bilanca</p>
            <h3>Osobna pitanja vlasnika</h3>
            <ul>
              {fictionalEntrepreneur.personalQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="entrepreneurs-example__boundary">
          <p>Zajednička granica</p>
          <ol>
            {fictionalEntrepreneur.boundaryRules.map((rule, index) => (
              <li key={rule}>
                <span aria-hidden="true">{index + 1}</span>
                {rule}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function BusinessSecurityRoles() {
  return (
    <section
      className="entrepreneurs-section entrepreneurs-security"
      aria-labelledby="entrepreneurs-security-title"
    >
      <SectionHeading
        id="entrepreneurs-security-title"
        title="Poslovna sigurnost nije samo čuvanje sigurnosnih kopija"
        copy="Poslovni sustav mora prepoznati odgovornosti, odobrenja, evidenciju i kontinuitet prije nego što se raspravlja o konkretnom sigurnosnom rješenju."
      />

      <ul className="entrepreneurs-security__questions">
        {businessSecurityQuestions.map((question) => (
          <li key={question}>
            <Check aria-hidden="true" />
            <span>{question}</span>
          </li>
        ))}
      </ul>

      <ol
        className="entrepreneurs-security__roles"
        aria-label="Mapa uloga u poslovnom Bitcoin postupku"
      >
        {securityRoles.map((role) => (
          <li key={role.number}>
            <span>{role.number}</span>
            <div>
              <h3>{role.title}</h3>
              <p>{role.copy}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="entrepreneurs-security__role-note">
        U maloj tvrtki iste osobe mogu obavljati više uloga. Uloge ipak trebaju
        biti jasno prepoznate kako bi se znalo kada osoba predlaže, odobrava,
        izvršava ili nadzire.
      </p>

      <aside className="entrepreneurs-security__notice">
        <ShieldCheck aria-hidden="true" />
        <p>
          <strong>
            Poslovni dokument treba opisati odgovornosti i postupak.
          </strong>{" "}
          Ne smije sadržavati privatne ključeve, wallet backup datoteke, wallet
          passphraseove, početne riječi drugih walleta, PIN-ove ni podatke koji
          sami omogućuju pristup sredstvima.
        </p>
      </aside>
      <a
        href={CUSTODY_SECURITY_PATH}
        className="entrepreneurs-text-link"
        data-link="entrepreneurs-custody-context"
      >
        Pogledajte poslovni kontekst skrbništva i ovlasti
        <ArrowUpRight aria-hidden="true" />
      </a>
    </section>
  )
}

function EntrepreneurServicePaths() {
  return (
    <section
      className="entrepreneurs-section entrepreneurs-services"
      aria-labelledby="entrepreneurs-services-title"
    >
      <SectionHeading
        eyebrow="SLJEDEĆI KORAK"
        id="entrepreneurs-services-title"
        title="Ne treba svakom poduzetniku isti oblik rada"
        copy="Pitanje se prvo kvalificira prema tome pripada li jednoj odluci, vlasnikovu osobnom sustavu ili organizacijskom sustavu tvrtke."
      />

      <div className="entrepreneurs-services__list">
        {entrepreneurServicePaths.map((service, index) => (
          <article key={service.title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p>{service.context}</p>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              {"examples" in service ? (
                <ul>
                  {service.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              ) : null}
              {"facts" in service ? (
                <strong className="entrepreneurs-services__facts">
                  {service.facts}
                </strong>
              ) : null}
              <a
                href={service.href}
                className="entrepreneurs-text-link"
                data-link={service.dataLink}
              >
                {service.linkLabel}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="entrepreneurs-services__assurance">
        Ne morate unaprijed znati koji vam oblik rada treba. Uvodni razgovor
        služi upravo tome.
      </p>
    </section>
  )
}

function EntrepreneurGuides() {
  return (
    <section
      className="entrepreneurs-section entrepreneurs-guides"
      aria-labelledby="entrepreneurs-guides-title"
    >
      <SectionHeading
        id="entrepreneurs-guides-title"
        title="Za početak pročitajte ova dva vodiča"
      />
      <div className="entrepreneurs-guides__list">
        {entrepreneurGuides.map((guide, index) => (
          <a
            key={guide.href}
            href={guide.href}
            data-link={guide.dataLink}
            className="entrepreneurs-guide"
          >
            <img
              src={guide.image}
              alt={guide.imageAlt}
              width="1774"
              height="887"
              loading="lazy"
              decoding="async"
            />
            <span className="entrepreneurs-guide__number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="entrepreneurs-guide__copy">
              <strong>{guide.title}</strong>
              <small>{guide.copy}</small>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        ))}
      </div>
      <a
        href="/vodici/"
        className="entrepreneurs-text-link entrepreneurs-guides__all"
        data-link="entrepreneurs-guides-all"
      >
        Pogledajte sve vodiče
        <ArrowUpRight aria-hidden="true" />
      </a>
    </section>
  )
}

function EntrepreneurFounder() {
  return (
    <section
      className="entrepreneurs-section entrepreneurs-founder"
      aria-labelledby="entrepreneurs-founder-title"
    >
      <figure>
        <picture>
          <source
            srcSet="/pavao-pahljina-480.webp 480w, /pavao-pahljina.webp 800w"
            type="image/webp"
          />
          <img
            src="/pavao-pahljina.jpg"
            alt="Pavao Pahljina u mediteranskom okruženju."
            width="800"
            height="800"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <figcaption>Pavao Pahljina · Bitcoin Savjetovanje</figcaption>
      </figure>
      <div>
        <p className="entrepreneurs-eyebrow">Tko vodi rad</p>
        <h2 id="entrepreneurs-founder-title">Pavao Pahljina</h2>
        <p className="entrepreneurs-founder__lead">
          Razgovor vodi poduzetnik koji poznaje obje strane bilance: poslovne
          obveze i osobni Bitcoin standard.
        </p>
        <ul>
          {entrepreneurFounderFacts.map((fact) => (
            <li key={fact}>{renderSaifedeanAmmousReference(fact)}</li>
          ))}
        </ul>
        <blockquote>
          Osobno uvjerenje vlasnika postaje drukčija vrsta odluke kada se
          prenese u poslovanje.
        </blockquote>
        <a
          href="/pavao-pahljina/"
          className="entrepreneurs-text-link"
          data-link="entrepreneurs-founder"
        >
          Više o Pavlu
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

function EntrepreneurBoundaries() {
  return (
    <section
      className="entrepreneurs-section entrepreneurs-boundaries"
      aria-labelledby="entrepreneurs-boundaries-title"
    >
      <SectionHeading
        id="entrepreneurs-boundaries-title"
        title="Tko radi što?"
      />
      <div className="entrepreneurs-boundaries__columns">
        <article>
          <h3>Bitcoin Savjetovanje</h3>
          <ul>
            {entrepreneurResponsibilities.advisory.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Drugi stručnjaci i pružatelji</h3>
          <ul>
            {entrepreneurResponsibilities.external.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
      <p className="entrepreneurs-boundaries__note">
        Bitcoin Savjetovanje ne upravlja poslovnim sredstvima, ne preuzima
        skrbništvo i ne donosi odluke umjesto vas.
      </p>
    </section>
  )
}

function EntrepreneurFinalCta() {
  return (
    <section
      className="entrepreneurs-section entrepreneurs-final-cta"
      aria-labelledby="entrepreneurs-final-title"
    >
      <div>
        <p className="entrepreneurs-eyebrow">PRVI KORAK</p>
        <h2 id="entrepreneurs-final-title">
          Najprije razjasnite pripada li pitanje vama ili poslovanju.
        </h2>
        <p>
          U uvodnom razgovoru utvrđujemo postoji li jedno konkretno pitanje,
          osobna odluka vlasnika ili potreba da se u razgovor uključe uprava,
          financije i vanjski stručnjaci.
        </p>
      </div>
      <div>
        <Button asChild className="cta-primary home-primary-button">
          <a
            href={entrepreneurConversationPath}
            data-cta="entrepreneurs-final-conversation"
          >
            <CalendarDays aria-hidden="true" />
            Dogovorite razgovor za poduzetnika
          </a>
        </Button>
        <a
          href="/za-tvrtke/"
          className="entrepreneurs-text-link"
          data-link="entrepreneurs-final-business"
        >
          Imate više odgovornih osoba? Pogledajte briefing za tvrtke
          <ArrowUpRight aria-hidden="true" />
        </a>
        <p className="entrepreneurs-final-cta__note">
          Razgovor je bez naknade i bez obveze. Ne šaljete iznose, poslovne
          dokumente, privatne ključeve, wallet backup datoteke, wallet
          passphraseove, početne riječi drugih walleta ni pristup računima ili
          sustavima.
        </p>
      </div>
    </section>
  )
}

export function EntrepreneursPage() {
  const page = audiencePagesBySlug.poduzetnici
  const socialImage = socialImages.audiences.poduzetnici

  return (
    <>
      <Seo
        title={page.seo.title}
        description={page.seo.description}
        canonical={`${SITE_URL}${page.path}`}
        ogTitle={page.seo.title}
        ogDescription={page.seo.description}
        ogImage={socialImage.ogImage}
        ogImageWidth={socialImage.ogImageWidth}
        ogImageHeight={socialImage.ogImageHeight}
      />
      <article className="entrepreneurs-page">
        <EntrepreneursHero />
        <div className="entrepreneurs-shell">
          <EntrepreneurFitSection />
          <BusinessMoneyLayers />
          <EntrepreneurTriggers />
          <EntrepreneurExample />
          <BusinessSecurityRoles />
          <EntrepreneurServicePaths />
          <EntrepreneurGuides />
          <EntrepreneurFounder />
          <EntrepreneurBoundaries />
          <EntrepreneurFinalCta />
        </div>
      </article>
    </>
  )
}
