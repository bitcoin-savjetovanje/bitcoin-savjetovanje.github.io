const baseUrl = "https://bitcoin-savjetovanje.com"
const bookingUrl = "https://cal.com/btcpavao/uvodni-bitcoin-razgovor"
const representativeGuidePath = "/vodici/stvarni-visak/"
const positiveMoneyGuidePath = "/vodici/pozitivni-neto-priljev/"
const debtChoiceGuidePath = "/vodici/dug-ili-bitcoin/"
const bitcoinMoneyGuidePath = "/vodici/bitcoin-kao-novac/"
const thirdsGuidePath = "/vodici/pravilo-trecina/"
const coreGuidePath = "/vodici/bitcoin-core-standard/"
const custodyChoiceGuidePath = "/vodici/samostalna-pohrana-ili-skrbnik/"
const familyGuidePath = "/vodici/obiteljski-pristup-bitcoinu/"
const securityGuidePath = "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/"
const failures = []

const securityRedirectPaths = [
  "/vodici/obiteljski-bitcoin-trezor",
  "/vodici/obiteljski-bitcoin-trezor/",
  "/vodici/bitkey-bitcoin-sigurnost",
  "/vodici/bitkey-bitcoin-sigurnost/",
  "/vodici/vremenski-oporavak-bitcoin-trezor",
  "/vodici/vremenski-oporavak-bitcoin-trezor/",
]

const retiredPdfPaths = ["/downloads/7-provjera-osobnog-bitcoin-standarda.pdf"]

const retiredSecurityBlueprintText = [
  "Lenovo mini PC služi za provjeru Bitcoin mreže",
  "Lokacija E, odvjetnički ili drugi neovisni sef",
  "Lokacija F, druga neovisna lokacija ili sef u drugom gradu",
  "Upalite ThinkPad.",
  "Kliknete Receive.",
  "Praktični tijek može izgledati ovako: otvoriti novi novčanik",
  "Složite isti tip novčanika s malim iznosom.",
  "Sparrow, vlastiti Bitcoin Core, privatni Fulcrum, 2 od 3 višepotpisni novčanik, tri neovisna hardverska novčanika",
]

const forbiddenVisibleText = [
  "crypto",
  "lead magnet",
  "custody",
  "self-custody",
  "cash balance",
  "stack",
  "ulaganje u bitcoin kreditom",
  "ako je prinos veći od kamate",
  "pametno zaduživanje",
  "dobar dug",
  "jeftin dug",
  "ne trebaju mi svi klijenti",
  "razbiti jedan krivi prigovor",
  "krivi prigovor",
  "najvažnije prigovore",
  "glupu grešku",
  "partner ili obitelj nije uvjerena",
  "dođite s bilo kojim bitcoin pitanjem",
  "u razgovor možete doći s bilo kojim bitcoin pitanjem",
  "bitcoin jasnoća",
  "bitcoin jasnoca",
  "što je bitcoin jasnoća?",
  "dogovorite 15-minutni uvodni razgovorpogledajte",
  "uvodni razgovorpogledajte",
  "dogovorite razgovorpogledajte",
  "razgovoršto je bitcoin jasnoća",
  "uvodni razgovoršto je bitcoin jasnoća",
  "razgovoršto je bitcoin konzultacija",
  "uvodni razgovoršto je bitcoin konzultacija",
  "praviladogovorite",
  "vodičeprimijenite",
  "1. 1 uvodni razgovor",
  "2. 2 bitcoin konzultacija",
  "3. 3 osobni bitcoin standard",
  "3. 3",
  "1. 1 proračun",
  "2. 2 dug",
  "budući odljevi",
  "neto priljev",
  "pozitivan neto priljev: temelj bitcoin standarda",
  "priljevi su novac koji ulazi. odljevi su novac koji izlazi. neto priljev je razlika.",
  "priljevi i odljevi",
  "neuređenog eura",
  "manje je glume",
  "dug hrani nemir",
  "psihološko-duhovna stanja",
  "duh ropstva",
  "duhovno se gušite",
  "metafizička imovina",
  "gorak lijek",
  "svake kune",
  "ne povećavam bitcoin odluke",
  "ovo se odnosi na vašu situaciju?",
  "crvena zastava",
  "nejasna imovina",
  "razbiti",
  "prigovor",
  "gdje ste zapeli",
  "monetarna teza",
  "vidimo ima li smisla za vas",
  "novcu→",
]

const forbiddenExactVisibleText = ["ROI"]

const pageChecks = [
  {
    path: "/",
    includes: [
      "<title>Bitcoin Savjetovanje | Sustav za život s Bitcoinom</title>",
      "Bitcoin već imate. Sada uredite sustav za život s njim.",
      "Imam Bitcoin, ali nemam jasna pravila.",
      "Gdje se danas nalazite?",
      "Imate li Bitcoin ili imate sustav za život s Bitcoinom?",
      "Što zapravo uređujemo?",
      "Kako izgleda uređen osobni Bitcoin standard?",
      "Od nejasne situacije do zapisanih pravila",
      "Koliko dubine treba vašoj odluci?",
      "Bitcoin sam kupio 2014. Razumijevanje je došlo kasnije.",
      "u listopadu 2020. prešao sam na puni Bitcoin standard",
      "Ne morate prvo znati koju uslugu trebate.",
      'href="/provjera-bitcoin-standarda/"',
      'href="/primjer-osobnog-bitcoin-standarda/"',
      'data-cta="home-hero-assessment"',
      'data-cta="home-hero-conversation"',
      'data-cta="home-sample-standard"',
      'data-cta="home-final-conversation"',
    ],
    htmlMustNotMatch: [
      {
        pattern:
          /<div\b(?=[^>]*bitcoin-stress-test-visual)(?=[^>]*role="img")[^>]*>/,
        label: "role=img on readable hero visual",
      },
    ],
    textMustNotInclude: [
      "Dođite s bilo kojim Bitcoin pitanjem",
      "U razgovor možete doći s bilo kojim Bitcoin pitanjem",
      "razgovorPromijeni",
      "uvodni razgovorPogledajte",
      "pravilaDogovorite",
      "vodičePrimijenite",
      "Odabrano pitanje:",
      "novcu→",
      "višak?Stvarni",
    ],
  },
  {
    path: "/pavao-pahljina/",
    includes: [
      "<title>Pavao Pahljina | Bitcoin savjetnik i autor</title>",
      "Pomažem ljudima koji već imaju Bitcoin povezati prihod, proračun, dug, imovinu, trošenje i sigurnost u sustav za život s Bitcoinom kao primarnim novcem.",
      "Bitcoin sam kupio 2014. Sustav je došao kasnije.",
      "Na puni Bitcoin standard prešao sam u listopadu 2020.",
      "Bitcoin prema potrebi redovito trošim ili razmjenjujem u eure.",
      "Put do Bitcoin Savjetovanja",
      "Kako pristupam Bitcoin savjetovanju",
      "Tehnologija, poduzetništvo, monetarna teorija i stvarna primjena",
      "Ljudi mi se najčešće javljaju kada",
      "Prije razgovora možete vidjeti kako razmišljam",
      "Granice mojeg rada",
      "Ne morate unaprijed znati koju uslugu trebate.",
      'data-cta="pavao-hero-approach"',
      'data-cta="pavao-hero-conversation"',
      'data-link="pavao-public-guide"',
      'data-link="pavao-public-dvadesetjedan"',
      'data-link="pavao-public-book"',
      'data-cta="pavao-final-conversation"',
      'data-link="pavao-final-assessment"',
    ],
    textMustNotInclude: ["listopad 2022.", "seed phrase", "stvarni višak"],
  },
  {
    path: "/bitcoin-savjetovanje/",
    includes: [
      "<title>Bitcoin savjetovanje u Hrvatskoj | Bitcoin Savjetovanje</title>",
      "Bitcoin savjetovanje jedan-na-jedan za put od držanja Bitcoina do sustava odluka.",
      "Kada Bitcoin savjetovanje ima smisla",
      "Sigurnost bez predaje kontrole",
      "Privatni ključevi, Bitcoin Core wallet backup datoteke, wallet passphraseovi i početne riječi drugih walleta nikada se ne dijele.",
      "Tri moguća oblika rada",
      "Vodiči objašnjavaju okvir, razgovor ga primjenjuje",
      'data-cta="bitcoin-advice-hero-intro-call"',
      'data-link="bitcoin-advice-guides-index"',
      'data-link="bitcoin-advice-security"',
      'data-cta="bitcoin-advice-final-intro-call"',
    ],
  },
  {
    path: "/mogao-sam-kupiti-bitcoin-ranije/",
    includes: [
      "<title>Jesam li zakasnio u Bitcoin? Što napraviti danas | Bitcoin Savjetovanje</title>",
      "Mogao sam kupiti Bitcoin ranije. Što sada?",
      "Provjerite što vas danas zaustavlja",
      "Kupio sam Bitcoin 2014. I svejedno sam ga gotovo propustio.",
      "Današnja odluka počinje izvan grafikona cijene",
      "Ne morate nadoknaditi deset propuštenih godina jednom kupnjom.",
      "Gdje se danas nalazite?",
      'data-cta="missed-bitcoin-hero-next-steps"',
      'data-cta="missed-bitcoin-hero-conversation"',
      'data-link="missed-bitcoin-beginner-guide"',
      'data-cta="missed-bitcoin-standard-check"',
      'data-cta="missed-bitcoin-conversation"',
    ],
  },
  {
    path: "/razgovor/",
    includes: [
      "<title>Besplatni uvodni Bitcoin razgovor | Bitcoin Savjetovanje</title>",
      "Donesite jedno pitanje. Utvrdit ćemo koji je pravi sljedeći korak.",
      "Ovo nije skraćena besplatna konzultacija.",
      "Ne navodite iznose i ne šaljite privatne ključeve, Bitcoin Core wallet backup datoteke",
      "U bilješku napišite jednu rečenicu",
      "Što uvodni razgovor jest i što nije",
      "Nakon 15 minuta znat ćete koji je sljedeći korak smislen",
      "200 €",
      "1.500 €",
      "Niste sigurni kako formulirati pitanje?",
      "Još niste spremni odabrati termin?",
      'href="/primjer-osobnog-bitcoin-standarda/"',
      'data-link="conversation-bitcoin-consultation"',
      'data-link="conversation-personal-standard"',
      'data-link="conversation-standard-check"',
      'data-link="conversation-sample-standard"',
      'data-link="conversation-guides"',
      'data-cta="conversation-mobile-calendar-open"',
      'data-cta="conversation-calendar-fallback"',
      'data-cal-namespace="uvodni-bitcoin-razgovor"',
      'data-cal-link="btcpavao/uvodni-bitcoin-razgovor"',
      bookingUrl,
    ],
    htmlMustNotMatch: [
      {
        pattern:
          /<a\b(?=[^>]*href="https:\/\/cal\.com\/btcpavao\/uvodni-bitcoin-razgovor")(?=[^>]*target="_blank")[^>]*>/,
        label: "Cal booking links opening in a new tab",
      },
    ],
  },
  {
    path: "/bitcoin-konzultacija/",
    includes: [
      "Razjasnite jedno ozbiljno Bitcoin pitanje u jednom dubinskom razgovoru",
      "Bitcoin konzultacija nije pristup tajnoj informaciji.",
      "200 €",
      "60 minuta",
      "besplatni 15-minutni razgovor",
      "Jedno pitanje ili cijeli sustav?",
      "Što je uključeno u Bitcoin konzultaciju?",
      "Primjeri pitanja koja su dovoljno konkretna za konzultaciju",
      "Od uvodnog razgovora do pisanog sažetka",
      "Kako izgleda Sažetak Bitcoin konzultacije?",
      "Granice konzultacije",
      "Dobivam li nešto pisano nakon konzultacije?",
      "ne tražim privatne ključeve, Bitcoin Core wallet backup datoteke, wallet passphraseove, početne riječi drugih walleta, lozinke ni pristup uređajima",
      'data-cta="bitcoin-consultation-hero-conversation"',
      'data-link="bitcoin-consultation-early-standard"',
      'data-link="bitcoin-consultation-summary-example"',
      'data-cta="bitcoin-consultation-pricing-conversation"',
      'data-link="bitcoin-consultation-pricing-standard"',
      'data-cta="bitcoin-consultation-final-conversation"',
    ],
  },
  {
    path: "/osobni-bitcoin-standard/",
    includes: [
      "Uredite vlastiti Bitcoin standard u jasnom pisanom sustavu odluka",
      "Program nije samo dokument niti samo niz razgovora.",
      "Ne dobivate još jedan popis savjeta.",
      "Što se mijenja kroz program?",
      "Kako radimo kroz 4–6 tjedana?",
      "Što program uključuje?",
      "listopadu 2020.",
      "1.500 €",
      "4–6 tjedana",
      "Prvi korak nije kupnja programa.",
      'href="/primjer-osobnog-bitcoin-standarda/"',
      'data-cta="personal-standard-hero-conversation"',
      'data-link="personal-standard-deliverable-sample"',
      'data-link="personal-standard-consultation"',
      'data-link="personal-standard-business"',
      'data-cta="personal-standard-pricing-conversation"',
      'data-cta="personal-standard-final-conversation"',
    ],
  },
  {
    path: "/primjer-osobnog-bitcoin-standarda/",
    includes: [
      "<title>Primjer osobnog Bitcoin standarda | Ogledni pisani dokument</title>",
      "Pogledajte kako izgleda pisani osobni Bitcoin standard",
      "19 PDF stranica",
      "Od nepovezanih pitanja do prvog uskog grla",
      "Odluke se pretvaraju u jasna pravila",
      "Cijeli standard mora stati i na jednu operativnu stranicu",
      "Što bi se u vašoj verziji personaliziralo?",
      "Što pisani standard nikada ne sadrži?",
      "Dokument je rezultat procesa, a ne zamjena za proces",
      'href="/downloads/sample-osobni-bitcoin-standard.pdf"',
      'data-cta="sample-standard-hero-pdf"',
      'data-link="sample-standard-hero-program"',
      'data-link="sample-standard-preview-context"',
      'data-link="sample-standard-preview-decisions"',
      'data-link="sample-standard-preview-one-page"',
      'data-cta="sample-standard-download-pdf"',
      'data-link="sample-standard-process-program"',
      'data-cta="sample-standard-final-program"',
      'data-link="sample-standard-final-conversation"',
    ],
  },
  {
    path: "/provjera-bitcoin-standarda/",
    includes: [
      "Provjera osobnog Bitcoin standarda",
      "Imate li Bitcoin ili imate sustav za život s Bitcoinom?",
      "Deset pitanja pomoći će vam prepoznati nedostaje li vam razumijevanje",
      "bez e-adrese",
      "Odgovori ostaju samo u ovom otvorenom prozoru.",
      "Što ova provjera zapravo mjeri?",
      "Ne spremaju se u preglednik, URL, analitiku, bazu ni na poslužitelj.",
      'data-cta="assessment-start"',
      'id="provjera"',
    ],
  },
  {
    path: "/sigurnost/",
    includes: [
      "Dobar sigurnosni sustav štiti i od krađe i od vlastite nedostupnosti.",
      "Preporučeni dugoročni sigurnosni smjer",
      "Bitcoin Core Standard za dugoročnu štednju",
      "Ovo se nikada ne šalje savjetniku",
      'href="/vodici/bitcoin-core-standard/"',
      'data-link="security-bitcoin-core-standard"',
      'data-cta="security-hero-conversation"',
    ],
  },
  {
    path: "/vodici/",
    includes: [
      "Bitcoin vodiči i istraživačke bilješke",
      "Vodiči su put prema razumijevanju, ne popis koji morate završiti.",
      "Počnite ovdje",
      "Temeljni vodiči",
      "Istraživačke bilješke",
      "Bitcoin Core Standard za dugoročnu štednju",
      "Preporučeni standard",
      "Istraživačke bilješke obrađuju napredne ili promjenjive teme.",
      "Vodiči pokazuju okvir. Privatni rad pretvara okvir u odluke.",
      'data-link="guide-starter-card"',
      'data-link="guide-card"',
      'data-link="guide-research-card"',
      'data-cta="guides-index-top-intro-call"',
      'data-cta="guides-index-intro-call"',
    ],
    htmlMustNotInclude: [
      'href="/vodici/obiteljski-bitcoin-trezor/"',
      'href="/vodici/vremenski-oporavak-bitcoin-trezor/"',
      'href="/vodici/bitkey-bitcoin-sigurnost/"',
    ],
  },
  {
    path: representativeGuidePath,
    includes: [
      "Što je stvarni višak?",
      "Stvarni višak je novac koji je slobodan tek nakon što svaki euro ima namjenu",
      "guide-final-cta-card",
      'href="/razgovor/"',
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: positiveMoneyGuidePath,
    includes: [
      "Novac koji ostaje",
      "Bitcoin standard počinje kada mjesec može stajati na vlastitim nogama.",
      "guide-final-cta-card",
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: debtChoiceGuidePath,
    includes: [
      "Dug ili Bitcoin?",
      "Dug povećava nemir i skraćuje vrijeme za odluku.",
      "guide-final-cta-card",
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: bitcoinMoneyGuidePath,
    includes: [
      "Bitcoin je novac",
      "Bitcoin nije samo imovina koju držite.",
      "guide-final-cta-card",
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: thirdsGuidePath,
    includes: [
      "Pravilo trećina u neto imovini",
      "Ne preporučujem kupnju ili prodaju određene imovine.",
      "guide-final-cta-card",
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: coreGuidePath,
    implementationSensitive: true,
    includes: [
      "Bitcoin Core Standard za dugoročnu štednju",
      "Što je Bitcoin Core Standard",
      "Offline Linux laptop",
      "Online koordinator i vlastiti node",
      "Jedan potpis i 2-od-3 multisig",
      "Kako Bitcoin Core generira ključeve",
      "Nema korisničkog BIP39 backupa",
      "Strategija sigurnosnih kopija",
      "PSBT tijek rada",
      "Oporavak i nasljeđivanje",
      "Za koga ovaj model nije",
      "Službeni izvori za tehničku provjeru",
      'data-guide-slug="bitcoin-core-standard"',
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: custodyChoiceGuidePath,
    implementationSensitive: true,
    includes: [
      "Samostalna pohrana ili skrbnik: kako razmišljati o Bitcoin sigurnosti",
      "Gdje se uklapa Bitcoin Core Standard",
      "Početne riječi nisu univerzalna pretpostavka",
      "Dugoročni saldo i dnevna uporaba nisu isto",
      'href="/vodici/bitcoin-core-standard/"',
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: familyGuidePath,
    includes: [
      "Kako obitelj može pristupiti Bitcoinu ako vam se nešto dogodi?",
      "Minimalna obiteljska uputa",
      "Tajne i sigurnosne kopije nikada se ne dijele",
      'href="/vodici/bitcoin-core-standard/"',
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: securityGuidePath,
    includes: [
      "Sigurnost ne smije ovisiti samo o vama",
      "Što nitko ne smije tražiti",
      "Bitcoin Core Standard za dugoročnu štednju",
      'href="/vodici/bitcoin-core-standard/"',
      'data-cta="guide-final-intro-call"',
    ],
  },
]

function pass(message) {
  console.log(`PASS ${message}`)
}

function fail(message) {
  failures.push(message)
  console.error(`FAIL ${message}`)
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "bitcoin-savjetovanje-live-verifier/1.0",
    },
  })

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }

  return response.text()
}

async function fetchManualRedirect(url) {
  return fetch(url, {
    redirect: "manual",
    headers: {
      "user-agent": "bitcoin-savjetovanje-live-verifier/1.0",
    },
  })
}

function textWithoutTags(contents) {
  return contents
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
}

function canonicalFromHtml(contents) {
  const match = contents.match(/<link rel="canonical" href="([^"]+)" \/>/)
  return match?.[1] ?? ""
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function assertIncludes(url, contents, expected) {
  if (contents.includes(expected)) {
    pass(`${url} contains ${expected}`)
    return
  }

  fail(`${url} is missing ${expected}`)
}

function assertIncludesAny(url, contents, options) {
  if (options.some((expected) => contents.includes(expected))) {
    pass(`${url} contains one expected equivalent phrase`)
    return
  }

  fail(`${url} is missing all equivalent phrases: ${options.join(" | ")}`)
}

function assertTextDoesNotInclude(url, text, forbidden) {
  if (!text.includes(forbidden)) {
    pass(`${url} visible text does not contain ${forbidden}`)
    return
  }

  fail(`${url} visible text contains forbidden text: ${forbidden}`)
}

function assertHtmlDoesNotInclude(url, html, forbidden) {
  if (!html.includes(forbidden)) {
    pass(`${url} HTML does not contain ${forbidden}`)
    return
  }

  fail(`${url} HTML contains forbidden markup: ${forbidden}`)
}

function assertHtmlDoesNotMatch(url, html, pattern, label = pattern.source) {
  if (!pattern.test(html)) {
    pass(`${url} HTML does not match ${label}`)
    return
  }

  fail(`${url} HTML matches forbidden markup: ${label}`)
}

function assertNoRetiredPdfLinks(url, html) {
  for (const retiredPath of retiredPdfPaths) {
    const pattern = new RegExp(
      `<a\\b[^>]*\\bhref=["'](?:${escapeRegExp(baseUrl)})?${escapeRegExp(
        retiredPath
      )}["'][^>]*>`,
      "i"
    )

    assertHtmlDoesNotMatch(
      url,
      html,
      pattern,
      `active retired PDF link: ${retiredPath}`
    )
  }
}

function scriptUrlsFromHtml(html) {
  return [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+\.js)"[^>]*>/g)].map(
    (match) => new URL(match[1], baseUrl).href
  )
}

function assertCanonical(url, html, expectedCanonical) {
  const canonical = canonicalFromHtml(html)

  if (canonical === expectedCanonical) {
    pass(`${url} canonical is ${expectedCanonical}`)
  } else {
    fail(
      `${url} canonical is ${
        canonical || "missing"
      }, expected ${expectedCanonical}`
    )
  }

  if (canonical.endsWith("/")) {
    pass(`${url} canonical uses trailing slash`)
  } else {
    fail(`${url} canonical does not use trailing slash`)
  }

  return canonical
}

const pageCanonicals = []

for (const check of pageChecks) {
  const url = `${baseUrl}${check.path}`

  try {
    const html = await fetchText(url)
    const rawVisibleText = textWithoutTags(html)
    const visibleText = rawVisibleText.toLowerCase()
    pass(`${url} returned HTTP 200`)

    for (const expected of check.includes ?? []) {
      assertIncludes(url, html, expected)
    }

    for (const options of check.includesAny ?? []) {
      assertIncludesAny(url, html, options)
    }

    for (const forbidden of check.textMustNotInclude ?? []) {
      assertTextDoesNotInclude(url, rawVisibleText, forbidden)
    }

    for (const forbidden of check.htmlMustNotMatch ?? []) {
      assertHtmlDoesNotMatch(url, html, forbidden.pattern, forbidden.label)
    }

    for (const forbidden of check.htmlMustNotInclude ?? []) {
      assertHtmlDoesNotInclude(url, html, forbidden)
    }

    if (check.implementationSensitive) {
      for (const retiredText of retiredSecurityBlueprintText) {
        assertTextDoesNotInclude(url, rawVisibleText, retiredText)
      }
    }

    assertNoRetiredPdfLinks(url, html)
    assertHtmlDoesNotInclude(url, html, 'alt="Image"')
    assertHtmlDoesNotInclude(url, html, 'alt="image"')
    assertHtmlDoesNotInclude(url, html, 'alt="Slika"')
    assertHtmlDoesNotInclude(url, html, 'alt="Logo"')
    assertHtmlDoesNotInclude(url, html, "/bitcoin-jasnoca/")
    assertHtmlDoesNotInclude(url, html, "bitcoin-jasnoca")

    for (const forbidden of forbiddenVisibleText) {
      assertTextDoesNotInclude(url, visibleText, forbidden)
    }

    for (const match of visibleText.matchAll(
      /signal za (?:kupnju|prodaju)/gi
    )) {
      const start = Math.max(0, match.index - 120)
      const end = Math.min(visibleText.length, match.index + 120)
      const context = visibleText.slice(start, end)
      const allowed =
        context.includes("nije za vas ako tražite") ||
        /ne (?:nudimo|nudi|dajem|daje)[^.]{0,80}signal/u.test(context)

      if (!allowed) {
        fail(
          `${url}: signal za kupnju ili prodaju mora biti naveden samo kao jasna granica usluge`
        )
      }
    }

    for (const forbidden of forbiddenExactVisibleText) {
      assertTextDoesNotInclude(url, rawVisibleText, forbidden)
    }

    pageCanonicals.push(assertCanonical(url, html, `${baseUrl}${check.path}`))
  } catch (error) {
    fail(`${url} could not be verified: ${error.message}`)
  }
}

for (const redirectPath of securityRedirectPaths) {
  const sourceUrl = `${baseUrl}${redirectPath}`

  try {
    const response = await fetchManualRedirect(sourceUrl)
    const location = response.headers.get("location")
    const resolvedLocation = location ? new URL(location, sourceUrl).href : ""
    const expectedLocation = `${baseUrl}${coreGuidePath}`

    if (response.status === 301) {
      pass(`${sourceUrl} returned HTTP 301`)
    } else {
      fail(`${sourceUrl} returned HTTP ${response.status}, expected 301`)
    }

    if (resolvedLocation === expectedLocation) {
      pass(`${sourceUrl} redirects to ${expectedLocation}`)
    } else {
      fail(
        `${sourceUrl} redirects to ${resolvedLocation || "missing Location"}, expected ${expectedLocation}`
      )
    }
  } catch (error) {
    fail(`${sourceUrl} redirect could not be verified: ${error.message}`)
  }
}

try {
  const homeHtml = await fetchText(`${baseUrl}/`)
  const scriptUrls = scriptUrlsFromHtml(homeHtml)

  if (scriptUrls.length === 0) {
    fail(`${baseUrl}/ has no JavaScript bundle scripts to inspect`)
  } else {
    const bundleText = (
      await Promise.all(scriptUrls.map((scriptUrl) => fetchText(scriptUrl)))
    ).join("\n")

    assertIncludes(
      `${baseUrl}/assets/*.js`,
      bundleText,
      "bitcoin-savjetovanje:cta-click"
    )
  }
} catch (error) {
  fail(`${baseUrl}/assets/*.js could not be verified: ${error.message}`)
}

try {
  const notFoundHtml = await fetchText(`${baseUrl}/404.html`)

  assertIncludes(
    `${baseUrl}/404.html`,
    notFoundHtml,
    'data-legacy-redirects="true"'
  )
  assertIncludes(
    `${baseUrl}/404.html`,
    notFoundHtml,
    '"/downloads/7-provjera-osobnog-bitcoin-standarda.pdf":"/provjera-bitcoin-standarda/"'
  )
  assertIncludes(
    `${baseUrl}/404.html`,
    notFoundHtml,
    '"/osobni-bitcoin-standard/primjer/":"/primjer-osobnog-bitcoin-standarda/"'
  )
  for (const legacyGuidePath of [
    "/vodici/obiteljski-bitcoin-trezor/",
    "/vodici/bitkey-bitcoin-sigurnost/",
    "/vodici/vremenski-oporavak-bitcoin-trezor/",
  ]) {
    assertIncludes(
      `${baseUrl}/404.html`,
      notFoundHtml,
      `${JSON.stringify(legacyGuidePath)}:${JSON.stringify(coreGuidePath)}`
    )
  }
  assertIncludes(
    `${baseUrl}/404.html`,
    notFoundHtml,
    "window.location.replace(redirectTarget)"
  )
} catch (error) {
  fail(`${baseUrl}/404.html could not be verified: ${error.message}`)
}

try {
  const sitemap = await fetchText(`${baseUrl}/sitemap.xml`)
  pass(`${baseUrl}/sitemap.xml returned HTTP 200`)

  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1]
  )

  for (const expectedUrl of [
    `${baseUrl}/`,
    `${baseUrl}/pavao-pahljina/`,
    `${baseUrl}/razgovor/`,
    `${baseUrl}/bitcoin-konzultacija/`,
    `${baseUrl}/osobni-bitcoin-standard/`,
    `${baseUrl}/primjer-osobnog-bitcoin-standarda/`,
    `${baseUrl}/provjera-bitcoin-standarda/`,
    `${baseUrl}/vodici/`,
    `${baseUrl}${coreGuidePath}`,
    `${baseUrl}/sigurnost/`,
  ]) {
    if (sitemapUrls.includes(expectedUrl)) {
      pass(`sitemap contains ${expectedUrl}`)
    } else {
      fail(`sitemap is missing ${expectedUrl}`)
    }
  }

  for (const canonical of pageCanonicals.filter(Boolean)) {
    if (sitemapUrls.includes(canonical)) {
      pass(`sitemap contains checked canonical ${canonical}`)
    } else {
      fail(`sitemap is missing checked canonical ${canonical}`)
    }
  }

  for (const sitemapUrl of sitemapUrls) {
    if (sitemapUrl.endsWith("/")) {
      pass(`sitemap URL uses trailing slash: ${sitemapUrl}`)
    } else {
      fail(`sitemap URL does not use trailing slash: ${sitemapUrl}`)
    }
  }

  for (const removedUrl of [
    `${baseUrl}/bitcoin-jasnoca/`,
    `${baseUrl}/osobni-bitcoin-standard/primjer/`,
    ...retiredPdfPaths.map((retiredPath) => `${baseUrl}${retiredPath}`),
    `${baseUrl}/vodici/kredit-je-buduci-novac/`,
    `${baseUrl}/vodici/kredit-ili-bitcoin/`,
    `${baseUrl}/vodici/ne-uzimajte-kredit-za-bitcoin/`,
    `${baseUrl}/vodici/sustavno-davanje-u-proracunu-nulte-razine/`,
    `${baseUrl}/vodici/sustavno-davanje-bez-kredita/`,
    `${baseUrl}/vodici/davanje-u-proracunu/`,
    ...securityRedirectPaths.map(
      (redirectPath) =>
        `${baseUrl}${redirectPath.endsWith("/") ? redirectPath : `${redirectPath}/`}`
    ),
  ]) {
    if (sitemapUrls.includes(removedUrl)) {
      fail(`sitemap still contains retired URL ${removedUrl}`)
    } else {
      pass(`sitemap does not contain retired URL ${removedUrl}`)
    }
  }
} catch (error) {
  fail(`${baseUrl}/sitemap.xml could not be verified: ${error.message}`)
}

if (failures.length > 0) {
  console.error(`\nverify-live failed with ${failures.length} problem(s):`)
  failures.forEach((message) => console.error(`- ${message}`))
  process.exit(1)
}

console.log("\nverify-live passed")
