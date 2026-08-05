import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  FileText,
  LockKeyhole,
  Map,
  Minus,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react"
import type { SyntheticEvent } from "react"

import { renderSaifedeanAmmousReference } from "@/components/SaifedeanAmmousReference"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { securityRoute } from "@/content/clientRoutes"
import {
  enoughToDescribe,
  exampleAfterReview,
  exampleRisks,
  exampleStartingPoint,
  founderExperience,
  notNeededToDescribe,
  redLineItems,
  securityContexts,
  securityPlanParts,
  securityRiskDimensions,
  securityServicePaths,
  securitySituations,
  securityTests,
  trustedPersonDoesNotNeed,
  trustedPersonShouldKnow,
} from "@/content/securityPage"
import {
  CONVERSATION_PATH,
  PAVAO_PAHLJINA_PATH,
  PRIVACY_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"

const securityConversationPath = `${CONVERSATION_PATH}?tema=sigurnost`

function trackOpenedDisclosure(
  event: SyntheticEvent<HTMLDetailsElement>,
  id: string,
  metadata: Record<string, string> = {}
) {
  if (!event.currentTarget.open) {
    return
  }

  trackFirstPartyInteraction(id, metadata)
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
    <div className="security-v2-heading">
      {eyebrow ? <p className="security-v2-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  )
}

function PlainList({
  items,
  icon = "check",
}: {
  items: readonly string[]
  icon?: "check" | "minus"
}) {
  const Icon = icon === "check" ? Check : Minus

  return (
    <ul className="security-v2-list">
      {items.map((item) => (
        <li key={item}>
          <Icon aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function SecurityHero() {
  return (
    <header className="security-v2-hero">
      <div className="security-v2-shell security-v2-hero__grid">
        <div className="security-v2-hero__copy">
          <p className="security-v2-eyebrow">
            Bitcoin sigurnost i povjerljivost
          </p>
          <h1>
            Dobar sigurnosni sustav štiti i od krađe i od vlastite
            nedostupnosti.
          </h1>
          <p className="security-v2-hero__lead">
            Sigurnosni model treba odgovarati vašem znanju, iznosu, obitelji i
            stvarnim prijetnjama. Cilj nije najkompliciranije rješenje, nego
            sustav koji možete sigurno koristiti, oporaviti i objasniti ljudima
            koji ovise o vama.
          </p>

          <ul
            className="security-v2-fact-strip"
            aria-label="Granice sigurnosnog rada"
          >
            <li>bez dijeljenja sigurnosnih tajni</li>
            <li>bez pristupa uređajima</li>
            <li>bez predaje kontrole</li>
            <li>s planom oporavka</li>
          </ul>

          <div className="security-v2-hero__actions">
            <Button asChild size="lg" className="cta-primary">
              <a href="#procjena-rizika" data-cta="security-hero-risk-anchor">
                Pogledajte što sigurnosno procjenjujemo
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
            <a
              href={securityConversationPath}
              className="security-v2-text-link"
              data-cta="security-hero-conversation"
            >
              Dogovorite sigurnosni razgovor
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <p className="security-v2-hero__note">
            Za razgovor nije potrebno navesti iznos Bitcoina, lokacije
            sigurnosnih kopija, proizvođače uređaja ni bilo koji podatak koji
            omogućuje pristup sredstvima.
          </p>
        </div>

        <figure className="security-v2-hero__visual">
          <img
            src="/images/security/bitcoin-sigurnost-ravnoteza-og-20260724.webp"
            alt="Mediteranski stol sa zaključanom drvenom kutijom, kartom dvaju putova oporavka, dvije odvojene oznake osoba i zatvorenom omotnicom s uputom bez tajni."
            width="1200"
            height="630"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <figcaption>
            <span>
              <LockKeyhole aria-hidden="true" />
              zaštita
            </span>
            <span>
              <Map aria-hidden="true" />
              oporavak
            </span>
            <span>
              <UsersRound aria-hidden="true" />
              jasne uloge
            </span>
            <span>
              <FileText aria-hidden="true" />
              dokument bez tajni
            </span>
          </figcaption>
        </figure>
      </div>
    </header>
  )
}

function SecuritySituations() {
  return (
    <section className="security-v2-section security-v2-situations">
      <div className="security-v2-shell">
        <SectionHeading
          title="Sigurnosni problem ne izgleda uvijek kao sigurnosni problem"
          copy="Prepoznajete li svoj sustav u jednoj od ovih situacija?"
        />

        <ol className="security-v2-situation-list">
          {securitySituations.map((situation, index) => (
            <li key={situation.title}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{situation.title}</h3>
                <p>{situation.copy}</p>
              </div>
            </li>
          ))}
        </ol>

        <blockquote className="security-v2-pullquote">
          Najveći rizik nije uvijek najslabiji uređaj. Često je to jedna osoba,
          jedna lokacija, jedna neprovjerena pretpostavka ili postupak koji
          nikada nije testiran.
        </blockquote>
      </div>
    </section>
  )
}

function SecurityRiskDimensions() {
  return (
    <section
      id="procjena-rizika"
      className="security-v2-section security-v2-risk-section"
    >
      <div className="security-v2-shell">
        <SectionHeading
          eyebrow="Procjena rizika"
          title="Dobra sigurnost mora istodobno riješiti četiri različita problema"
          copy="Četiri dimenzije čine jednu mapu. Maksimalno pojačavanje samo jedne može pogoršati drugu."
        />

        <div
          className="security-v2-risk-map"
          aria-label="Četiri dimenzije procjene sigurnosnog rizika"
        >
          {securityRiskDimensions.map((dimension) => (
            <details
              key={dimension.id}
              onToggle={(event) =>
                trackOpenedDisclosure(event, "security-risk-dimension-open", {
                  dimension: dimension.id,
                })
              }
            >
              <summary>
                <span>{dimension.number}</span>
                <div>
                  <h3>{dimension.title}</h3>
                  <p>{dimension.summary}</p>
                </div>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className="security-v2-disclosure__body">
                <p>Provjeriti:</p>
                <PlainList items={dimension.checks} />
              </div>
            </details>
          ))}
        </div>

        <p className="security-v2-balance-note">
          <ShieldCheck aria-hidden="true" />
          <span>
            Pretežak oporavak povećava rizik trajnog gubitka, a prejednostavan
            oporavak može povećati rizik neovlaštenog pristupa.
          </span>
        </p>
      </div>
    </section>
  )
}

function CustodyEducationBridge() {
  return (
    <section className="security-v2-section security-v2-models">
      <div className="security-v2-shell">
        <aside className="security-v2-route-bridge">
          <div>
            <p className="security-v2-eyebrow">
              Preporučeni dugoročni sigurnosni smjer
            </p>
            <h3>Odvojite potpisivanje, koordinaciju, node i oporavak.</h3>
            <p>
              Za dugoročnu štednju, glavni osobni saldo i obiteljski trezor
              preporučujem Bitcoin Core Standard. To nije model za svaku osobu
              ni mali dnevni iznos: prije značajnog salda cijeli postupak mora
              biti razumljiv i testiran bez značajnih sredstava.
            </p>
          </div>
          <a
            href="/vodici/bitcoin-core-standard/"
            className="security-v2-text-link"
            data-link="security-bitcoin-core-standard"
          >
            Pročitajte Bitcoin Core Standard
            <ArrowUpRight aria-hidden="true" />
          </a>
        </aside>
      </div>
    </section>
  )
}

export function SecurityExample() {
  return (
    <section className="security-v2-section security-v2-example">
      <div className="security-v2-shell">
        <SectionHeading
          eyebrow="Konkretan primjer"
          title="Dobar uređaj, ali nedovršen sigurnosni sustav"
          copy="Primjer je potpuno izmišljen. Ne prikazuje stvarne osobe, lokacije, iznose ni sigurnosne podatke."
        />

        <details
          className="security-v2-example__disclosure"
          onToggle={(event) =>
            trackOpenedDisclosure(event, "security-example-open")
          }
        >
          <summary>
            <span>Izmišljeni ogledni primjer</span>
            <strong>Otvorite procjenu prije i nakon uređivanja</strong>
            <ChevronDown aria-hidden="true" />
          </summary>
          <div className="security-v2-example__grid">
            <article>
              <span>01 · Početna situacija</span>
              <h3>Kvalitetan uređaj nije cijeli sustav</h3>
              <PlainList items={exampleStartingPoint} icon="minus" />
            </article>
            <article>
              <span>02 · Procijenjeni rizici</span>
              <h3>Šest točaka koje treba urediti</h3>
              <PlainList items={exampleRisks} icon="minus" />
            </article>
            <article>
              <span>03 · Nakon uređivanja</span>
              <h3>Sustav dobiva jasan oporavni put</h3>
              <PlainList items={exampleAfterReview} />
            </article>
          </div>
        </details>

        <blockquote className="security-v2-pullquote security-v2-pullquote--light">
          Uređaj može biti kvalitetan, a sigurnosni sustav ipak nedovršen.
        </blockquote>
      </div>
    </section>
  )
}

function SecurityPlanPreview() {
  return (
    <section className="security-v2-section security-v2-plan">
      <div className="security-v2-shell">
        <SectionHeading
          eyebrow="Pisani rezultat"
          title="Sigurnost se može zapisati bez zapisivanja tajni"
          copy="Rezultat može biti dio Sažetka Bitcoin konzultacije, pisanog Osobnog Bitcoin standarda ili zasebna sigurnosna karta unutar šireg dokumenta."
        />

        <div className="security-v2-plan__layout">
          <div className="security-v2-plan__parts">
            {securityPlanParts.map((part, index) => (
              <article key={part.title}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
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
          </div>

          <figure className="security-v2-document">
            <a
              href="/images/sample-standard/ogledni-standard-sigurnost.webp"
              target="_blank"
              rel="noreferrer"
              data-link="security-plan-document"
              aria-label="Otvorite veću oglednu sigurnosnu stranicu"
            >
              <img
                src="/images/sample-standard/ogledni-standard-sigurnost.webp"
                alt="Ogledna stranica osobnog Bitcoin standarda o sigurnosti i kontinuitetu. Prikazuje model potpisa, što obitelj zna, što dokument ne sadrži, testiranje i netajnu uputu za prvi korak."
                width="1191"
                height="1684"
                loading="lazy"
                decoding="async"
              />
            </a>
            <figcaption>
              <span>Izmišljeni ogledni primjer · stranica 12</span>
              <p>
                Stvarni izvoz iz oglednog osobnog Bitcoin standarda. Dokument ne
                sadrži pristupne tajne.
              </p>
              <a
                href={SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH}
                className="security-v2-text-link"
                data-link="security-sample-standard-full"
              >
                Pogledajte cijeli izmišljeni ogledni osobni Bitcoin standard
                <ArrowUpRight aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export function SecurityKnowledgeBoundaries() {
  return (
    <section className="security-v2-section security-v2-knowledge">
      <div className="security-v2-shell">
        <SectionHeading
          title="Informiranost i neposredan pristup nisu ista stvar"
          copy="Uloga druge osobe može biti dovoljno jasna za očuvanje sustava, a da ta osoba ne dobije pristup koji joj nije potreban."
        />

        <div className="security-v2-knowledge__grid">
          <details
            open
            onToggle={(event) =>
              trackOpenedDisclosure(
                event,
                "security-knowledge-boundary-interaction",
                { side: "should-know" }
              )
            }
          >
            <summary>
              <Check aria-hidden="true" />
              <h3>Partner ili osoba od povjerenja trebaju znati</h3>
              <ChevronDown aria-hidden="true" />
            </summary>
            <PlainList items={trustedPersonShouldKnow} />
          </details>
          <details
            open
            onToggle={(event) =>
              trackOpenedDisclosure(
                event,
                "security-knowledge-boundary-interaction",
                { side: "does-not-need" }
              )
            }
          >
            <summary>
              <Minus aria-hidden="true" />
              <h3>Ne trebaju automatski imati</h3>
              <ChevronDown aria-hidden="true" />
            </summary>
            <PlainList items={trustedPersonDoesNotNeed} icon="minus" />
          </details>
        </div>

        <blockquote className="security-v2-pullquote">
          Dobar plan daje drugoj osobi dovoljno razumijevanja za očuvanje
          sustava, ali ne više pristupa nego što njezina uloga zahtijeva.
        </blockquote>
      </div>
    </section>
  )
}

function SecurityTesting() {
  return (
    <section className="security-v2-section security-v2-testing">
      <div className="security-v2-shell">
        <SectionHeading
          eyebrow="Provjera sustava"
          title="Sigurnosni sustav koji nikada nije testiran počiva na pretpostavkama"
          copy="Razumijevanje, dokumentacija, odgovornosti i prvi korak mogu se provjeriti bez premještanja sredstava ili otkrivanja tajni."
        />

        <div className="security-v2-testing__grid">
          {securityTests.map((test) => (
            <details
              key={test.id}
              onToggle={(event) =>
                trackOpenedDisclosure(event, "security-test-open", {
                  test: test.id,
                })
              }
            >
              <summary>
                <h3>{test.title}</h3>
                <ChevronDown aria-hidden="true" />
              </summary>
              <PlainList items={test.items} />
            </details>
          ))}
        </div>

        <p className="security-v2-testing__note">
          <ShieldCheck aria-hidden="true" />
          <span>
            Testiranje ne znači slati Bitcoin savjetniku, otkrivati početne
            riječi ili izvoditi stvarnu hitnu situaciju. Ne pokušava se
            nasumično oporavljati glavni novčanik.
          </span>
        </p>
      </div>
    </section>
  )
}

function SecurityRedLine() {
  return (
    <section className="security-v2-section security-v2-redline">
      <div className="security-v2-shell">
        <div className="security-v2-redline__panel">
          <SectionHeading
            eyebrow="Crvena linija"
            title="Ovo se nikada ne šalje savjetniku"
          />

          <ul className="security-v2-redline__list">
            {redLineItems.map((item) => (
              <li key={item}>
                <Minus aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="security-v2-redline__footer">
            <p>
              Savjetovanje uređuje odluke, dokumentaciju, odgovornosti i
              postupke. Kontrola nad Bitcoinom ostaje kod vas ili kod pružatelja
              kojeg ste sami odabrali.
            </p>
            <p>
              Svaka osoba koja bez nužnog razloga traži privatni ključ, wallet
              backup datoteku, passphrase, početne riječi ili slanje Bitcoina
              prelazi osnovnu sigurnosnu granicu.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function SecurityPrivacy() {
  return (
    <section className="security-v2-section security-v2-privacy">
      <div className="security-v2-shell">
        <SectionHeading
          title="Za sigurnosni razgovor nije potrebno otkriti cijeli sustav"
          copy="Dovoljno je opisati problem i odgovornosti bez povezivanja svih osjetljivih dijelova u jednu cjelinu."
        />

        <div className="security-v2-privacy__grid">
          <article>
            <h3>Što je dovoljno opisati</h3>
            <PlainList items={enoughToDescribe} />
          </article>
          <article>
            <h3>Što nije potrebno navesti</h3>
            <PlainList items={notNeededToDescribe} icon="minus" />
          </article>
          <article className="security-v2-privacy__policy">
            <h3>Kako se podaci obrađuju</h3>
            <p>
              Za rezervaciju se koristi Cal.com, a za komunikaciju e-pošta. Ti
              alati mogu obrađivati osnovne podatke potrebne za zakazivanje i
              komunikaciju.
            </p>
            <p>
              Objavljena pravila ne navode snimanje razgovora, automatsko
              brisanje ni fiksni rok čuvanja bilješki. Zato ova stranica to ne
              obećava. Brisanje bilješki iz komunikacije možete zatražiti
              e-poštom.
            </p>
            <p>
              Opći anonimizirani uvidi mogu utjecati na buduće javne materijale,
              ali bez prepoznatljivih osobnih, financijskih ili sigurnosnih
              detalja bez izričite dozvole.
            </p>
            <a
              href={PRIVACY_PATH}
              className="security-v2-text-link"
              data-link="security-privacy-policy"
            >
              Pravila privatnosti
              <ArrowUpRight aria-hidden="true" />
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}

export function SecurityContexts() {
  return (
    <section className="security-v2-section security-v2-contexts">
      <div className="security-v2-shell">
        <SectionHeading
          title="Ista tehnička postavka može imati potpuno različit kontekst"
          copy="Odluke se razlikuju ovisno o tome pripada li Bitcoin jednoj osobi, obitelji ili poslovanju."
        />

        <div className="security-v2-contexts__grid">
          {securityContexts.map((context) => (
            <article key={context.id}>
              <span className="security-v2-contexts__icon" aria-hidden="true">
                {context.id === "personal" ? (
                  <UserRound />
                ) : context.id === "family" ? (
                  <UsersRound />
                ) : (
                  <FileText />
                )}
              </span>
              <h3>{context.title}</h3>
              <p>{context.copy}</p>
              {"href" in context ? (
                <a
                  href={context.href}
                  className="security-v2-text-link"
                  data-link={context.dataLink}
                >
                  {context.linkLabel}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ) : (
                <div className="security-v2-contexts__links">
                  {context.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="security-v2-text-link"
                      data-link={link.dataLink}
                    >
                      {link.label}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SecurityServicePaths() {
  return (
    <section className="security-v2-section security-v2-services">
      <div className="security-v2-shell">
        <SectionHeading
          eyebrow="Sljedeći korak"
          title="Ne zahtijeva svako sigurnosno pitanje isti oblik rada"
          copy="Od samoprocjene do jednog konkretnog pitanja ili cijelog osobnog Bitcoin standarda."
        />

        <div className="security-v2-services__grid">
          {securityServicePaths.map((path, index) => (
            <article key={path.id}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="security-v2-eyebrow">{path.kicker}</p>
              <h3>{path.title}</h3>
              <p>{path.copy}</p>
              <strong>{path.meta}</strong>
              <a
                href={path.href}
                className="security-v2-text-link"
                data-link={path.dataLink}
              >
                {path.linkLabel}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <p className="security-v2-services__note">
          Ne morate unaprijed znati koji vam oblik rada treba. Uvodni razgovor
          služi upravo tome.
        </p>
      </div>
    </section>
  )
}

function SecurityFounder() {
  return (
    <section className="security-v2-section security-v2-founder">
      <div className="security-v2-shell security-v2-founder__layout">
        <figure>
          <img
            src="/pavao-pahljina-480.webp"
            srcSet="/pavao-pahljina-480.webp 480w, /pavao-pahljina.webp 800w"
            sizes="(min-width: 64rem) 24rem, 100vw"
            alt="Pavao Pahljina u mediteranskom okruženju, osnivač Bitcoin Savjetovanja."
            width="480"
            height="480"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Pavao Pahljina · Bitcoin Savjetovanje</figcaption>
        </figure>

        <div>
          <p className="security-v2-eyebrow">Tko vodi razgovor</p>
          <h2>Pavao Pahljina</h2>
          <p className="security-v2-founder__lead">
            Pavao pomaže povezati Bitcoin skrbništvo, osobne okolnosti,
            obiteljske odgovornosti i stvarne sigurnosne rizike u sustav koji ne
            ovisi samo o jednoj osobi.
          </p>
          <ul>
            {founderExperience.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                <span>{renderSaifedeanAmmousReference(item)}</span>
              </li>
            ))}
          </ul>
          <p className="security-v2-founder__scope">
            Rad nije formalna sigurnosna certifikacija, forenzička usluga,
            pravno ili regulatorno savjetovanje niti jamstvo sigurnosti.
          </p>
          <a
            href={PAVAO_PAHLJINA_PATH}
            className="security-v2-text-link"
            data-link="security-founder-profile"
          >
            Više o Pavlu
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

function SecurityFinalCta() {
  return (
    <section className="security-v2-final">
      <div className="security-v2-shell">
        <p className="security-v2-eyebrow">Prvi korak</p>
        <h2>
          Ne trebate predati kontrolu da biste prestali ovisiti samo o sebi.
        </h2>
        <p>
          U uvodnom razgovoru utvrđujemo postoji li jedno konkretno sigurnosno
          pitanje, treba li vam dublja konzultacija ili sigurnost treba povezati
          s cijelim osobnim Bitcoin standardom.
        </p>
        <div className="security-v2-final__actions">
          <Button asChild size="lg" className="cta-primary">
            <a
              href={securityConversationPath}
              data-cta="security-final-conversation"
            >
              <CalendarDays aria-hidden="true" />
              Dogovorite 15-minutni sigurnosni razgovor
            </a>
          </Button>
          <a
            href={SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH}
            className="security-v2-text-link"
            data-link="security-final-sample-standard"
          >
            Pogledajte izmišljeni ogledni pisani standard
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <p className="security-v2-final__safety">
          <CircleAlert aria-hidden="true" />
          <span>
            Ne navodite iznose, lokacije sigurnosnih kopija, privatne ključeve,
            wallet backup datoteke, passphraseove, početne riječi ni podatke za
            pristup uređajima.
          </span>
        </p>
      </div>
    </section>
  )
}

export function Security() {
  return (
    <>
      <Seo {...securityRoute} />
      <article className="security-v2">
        <SecurityHero />
        <SecuritySituations />
        <SecurityRiskDimensions />
        <CustodyEducationBridge />
        <SecurityPlanPreview />
        <SecurityTesting />
        <SecurityRedLine />
        <SecurityPrivacy />
        <SecurityServicePaths />
        <SecurityFounder />
        <SecurityFinalCta />
      </article>
    </>
  )
}
