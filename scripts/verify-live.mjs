const baseUrl = "https://bitcoin-savjetovanje.com"
const bookingUrl = "https://cal.com/btcpavao/uvodni-bitcoin-razgovor"
const representativeGuidePath = "/vodici/stvarni-visak/"
const positiveMoneyGuidePath = "/vodici/pozitivni-neto-priljev/"
const debtChoiceGuidePath = "/vodici/dug-ili-bitcoin/"
const bitcoinMoneyGuidePath = "/vodici/bitcoin-kao-novac/"
const thirdsGuidePath = "/vodici/pravilo-trecina/"
const familyVaultGuidePath = "/vodici/obiteljski-bitcoin-trezor/"
const timedRecoveryGuidePath = "/vodici/vremenski-oporavak-bitcoin-trezor/"
const custodyChoiceGuidePath = "/vodici/samostalna-pohrana-ili-skrbnik/"
const bitkeyGuidePath = "/vodici/bitkey-bitcoin-sigurnost/"
const familyGuidePath = "/vodici/obiteljski-pristup-bitcoinu/"
const securityGuidePath = "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/"
const failures = []

const retiredPdfPaths = [
  "/downloads/7-provjera-osobnog-bitcoin-standarda.pdf",
  "/downloads/sample-osobni-bitcoin-standard.pdf",
]

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
  "signal za kupnju",
  "signal za prodaju",
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
      "<title>Osobni Bitcoin standard | Bitcoin Savjetovanje</title>",
      "Imate Bitcoin? Izgradite osobni Bitcoin standard.",
      "Javni vodiči pokazuju moj okvir razmišljanja.",
      "Privatni rad pretvara taj okvir u odluke",
      "Vodič vam može dati okvir. Ne može donijeti odluku umjesto vas.",
      "Prvo pronađite usko grlo",
      "Program nije PDF koji popunjavate",
      "Dokument je zapis procesa, ne njegova zamjena.",
      "Ne tražim privatne ključeve ni početne riječi.",
      'href="/osobni-bitcoin-standard/"',
      'href="/provjera-bitcoin-standarda/"',
      'data-cta="hero-intro-call"',
      'data-link="hero-personal-standard"',
      'data-cta="home-standard-assessment"',
      'data-cta="home-guides-conversation"',
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
    path: "/bitcoin-savjetovanje/",
    includes: [
      "<title>Bitcoin savjetovanje u Hrvatskoj | Bitcoin Savjetovanje</title>",
      "Bitcoin savjetovanje jedan-na-jedan za put od držanja Bitcoina do sustava odluka.",
      "Kada Bitcoin savjetovanje ima smisla",
      "Sigurnost bez predaje kontrole",
      "Početne riječi se nikada ne dijele.",
      "Tri moguća oblika rada",
      "Vodiči objašnjavaju okvir, razgovor ga primjenjuje",
      'data-cta="bitcoin-advice-hero-intro-call"',
      'data-link="bitcoin-advice-guides-index"',
      'data-link="bitcoin-advice-security"',
      'data-cta="bitcoin-advice-final-intro-call"',
    ],
  },
  {
    path: "/razgovor/",
    includes: [
      "Dogovorite 15-minutni uvodni razgovor",
      "Najbolji razgovori počinju jednom konkretnom odlukom.",
      "Ne šaljite početne riječi, privatne ključeve, lozinke",
      "Što se može dogoditi nakon razgovora?",
      "Ne mora svaki uvodni razgovor završiti plaćenim nastavkom.",
      "skraćeni HTML primjer rezultata",
      'href="/osobni-bitcoin-standard/primjer/"',
      'data-link="conversation-bitcoin-consultation"',
      'data-link="conversation-personal-standard"',
      'data-link="conversation-sample-standard"',
      'data-cta="conversation-page-calendar"',
      'data-cta="conversation-page-final-calendar"',
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
      "Jedna odluka, jedan razgovor, jasan sljedeći korak",
      "Ne plaćate tajnu informaciju. Plaćate kompresiju, kontekst i prosudbu",
      "200 €",
      "60 minuta",
      "Što trebate dobiti nakon Bitcoin konzultacije",
      "jasniju definiciju problema",
      "pregled glavnih rizika i kompromisa",
      "Bitcoin konzultacija ili osobni Bitcoin standard?",
      "Program povezuje sva glavna područja kroz 4–6 tjedana",
      "ne tražim početne riječi, privatne ključeve, lozinke ili pristup novčaniku",
      'data-cta="bitcoin-consultation-intro-call"',
      'data-link="bitcoin-consultation-personal-standard"',
      'data-cta="bitcoin-consultation-final-intro-call"',
      'data-link="bitcoin-consultation-security"',
    ],
  },
  {
    path: "/osobni-bitcoin-standard/",
    includes: [
      "Osobni Bitcoin standard: 4–6 tjedana privatnog rada na odlukama",
      "Dokument je zapis procesa, ne njegova zamjena.",
      "Što ne možete dobiti iz članka ili PDF-a",
      "Kako radimo kroz",
      "Ishodi programa",
      "Prioritizacija, stres-test, provedba i revizija.",
      "30-dnevna revizija",
      "1.500 €",
      "4–6 tjedana",
      "Kako izgleda rezultat rada",
      'href="/osobni-bitcoin-standard/primjer/"',
      'data-cta="personal-standard-hero-call"',
      'data-link="personal-standard-result-example"',
      'data-cta="personal-standard-pricing-call"',
      'data-cta="personal-standard-final-call"',
    ],
  },
  {
    path: "/osobni-bitcoin-standard/primjer/",
    includes: [
      "<title>Kako izgleda rezultat rada | Bitcoin Savjetovanje</title>",
      "Kako izgleda rezultat rada",
      "Ovo nije predložak za samostalno kopiranje",
      "Zamišljena situacija prije rada",
      "Djelomično redigiran primjer",
      "Generičko načelo",
      "Osobno pravilo",
      "Javni primjer namjerno pokazuje strukturu, ali ne i cijeli provedbeni sustav.",
      'data-link="result-example-program"',
      'data-cta="result-example-conversation"',
      'data-cta="result-example-final-conversation"',
      'data-link="result-example-final-program"',
    ],
  },
  {
    path: "/provjera-bitcoin-standarda/",
    includes: [
      "Provjera osobnog Bitcoin standarda",
      "Koliko je uređen vaš osobni Bitcoin standard?",
      "Odgovorite na 21 kratku tvrdnju bez registracije i bez slanja odgovora.",
      "ukupnu sliku, najslabije područje i jedan konkretan prvi korak",
      "Odgovori i rezultat ostaju samo u ovom otvorenom prozoru preglednika.",
      "Provjera osobnog i obiteljskog Bitcoin standarda",
      "Vaši odgovori ostaju privatni.",
      "Ne spremaju se u preglednik, URL, analitiku, bazu ni na server.",
      'data-cta="standard-check-start"',
      'data-cta="assessment-start"',
      'id="provjera"',
    ],
  },
  {
    path: "/sigurnost/",
    includes: [
      "Sigurnost nije dogma. Sigurnost je sustav.",
      "Početne riječi i privatni ključevi nikada se ne dijele.",
      "Cilj nije najkompliciraniji sustav.",
      "Samostalno skrbništvo",
      "Prijelazni ili hibridni model",
      "Profesionalno potpomognut model",
      "Nikada ne tražim",
      "ne upravljam transakcijama umjesto vas",
      "U uvodnom razgovoru ne radimo tehničke promjene.",
      'data-cta="security-intro-call"',
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
      "Istraživačke bilješke obrađuju napredne ili promjenjive teme.",
      "Vodiči pokazuju okvir. Privatni rad pretvara okvir u odluke.",
      'data-link="guide-starter-card"',
      'data-link="guide-card"',
      'data-link="guide-research-card"',
      'data-cta="guides-index-top-intro-call"',
      'data-cta="guides-index-intro-call"',
    ],
  },
  {
    path: representativeGuidePath,
    includes: [
      "Što je stvarni višak?",
      "Stvarni višak je novac koji je slobodan tek nakon što svaki euro ima namjenu",
      "Vodič daje okvir. Vaša situacija određuje odluku.",
      'href="/razgovor/"',
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: positiveMoneyGuidePath,
    includes: [
      "Novac koji ostaje",
      "Bitcoin standard počinje kada mjesec može stajati na vlastitim nogama.",
      "Vodič daje okvir. Vaša situacija određuje odluku.",
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: debtChoiceGuidePath,
    includes: [
      "Dug ili Bitcoin?",
      "Dug povećava nemir i skraćuje vrijeme za odluku.",
      "Vodič daje okvir. Vaša situacija određuje odluku.",
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: bitcoinMoneyGuidePath,
    includes: [
      "Bitcoin je novac",
      "Bitcoin nije samo imovina koju držite.",
      "Vodič daje okvir. Vaša situacija određuje odluku.",
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: thirdsGuidePath,
    includes: [
      "Pravilo trećina u neto imovini",
      "Ne preporučujem kupnju ili prodaju određene imovine.",
      "Vodič daje okvir. Vaša situacija određuje odluku.",
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: familyVaultGuidePath,
    implementationSensitive: true,
    includes: [
      "Obiteljski Bitcoin trezor: sigurnost, oporavak i nasljeđivanje",
      "Nije univerzalni recept, nego primjer za razmišljanje o obiteljskoj sigurnosti.",
      "Napredniji sustav nije automatski sigurniji.",
      "Alati su primjeri, ne popis za kupnju",
      "Domene kvara umjesto javne karte lokacija",
      "Vodič daje okvir. Vaša situacija određuje odluku.",
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: timedRecoveryGuidePath,
    implementationSensitive: true,
    includes: [
      "Vremenski oporavak u obiteljskom Bitcoin trezoru",
      "Napredniji sustav nije automatski sigurniji.",
      "Kriteriji prije odabira modela",
      "Testiranje bez javnog recepta",
      "Nunchuk, Liana i vlastiti Miniscript kao modeli",
      "Vodič daje okvir. Vaša situacija određuje odluku.",
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: custodyChoiceGuidePath,
    implementationSensitive: true,
    includes: [
      "Samostalna pohrana ili skrbnik: kako razmišljati o Bitcoin sigurnosti",
      "Napredniji sustav nije automatski sigurniji.",
      "Dobar Bitcoin plan ne počinje sloganom",
      "Vodič daje okvir. Vaša situacija određuje odluku.",
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: bitkeyGuidePath,
    implementationSensitive: true,
    includes: [
      "Bitkey: jednostavniji put do obiteljske Bitcoin sigurnosti?",
      "Bitkey ne traži klasičan zapis početnih riječi i uvodi 2 od 3 sigurnosni model",
      "Napredniji sustav nije automatski sigurniji.",
      "Što provjeriti prije značajnijeg iznosa",
      "Vodič daje okvir. Vaša situacija određuje odluku.",
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: familyGuidePath,
    includes: [
      "Kako obitelj može pristupiti Bitcoinu ako vam se nešto dogodi?",
      "Minimalna obiteljska uputa",
      "Početne se riječi nikada ne dijele",
      "Vodič daje okvir. Vaša situacija određuje odluku.",
      'data-cta="guide-final-intro-call"',
    ],
  },
  {
    path: securityGuidePath,
    includes: [
      "Sigurnost ne smije ovisiti samo o vama",
      "Nitko ne smije tražiti početne riječi",
      "Za širi sigurnosni okvir pročitajte i sigurnosnu stranicu.",
      "Vodič daje okvir. Vaša situacija određuje odluku.",
      'data-cta="guide-security-page"',
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

    for (const forbidden of forbiddenExactVisibleText) {
      assertTextDoesNotInclude(url, rawVisibleText, forbidden)
    }

    pageCanonicals.push(assertCanonical(url, html, `${baseUrl}${check.path}`))
  } catch (error) {
    fail(`${url} could not be verified: ${error.message}`)
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
    '"/downloads/sample-osobni-bitcoin-standard.pdf":"/osobni-bitcoin-standard/primjer/"'
  )
  assertIncludes(
    `${baseUrl}/404.html`,
    notFoundHtml,
    '"/primjer-osobnog-bitcoin-standarda/":"/osobni-bitcoin-standard/primjer/"'
  )
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
    `${baseUrl}/razgovor/`,
    `${baseUrl}/bitcoin-konzultacija/`,
    `${baseUrl}/osobni-bitcoin-standard/`,
    `${baseUrl}/osobni-bitcoin-standard/primjer/`,
    `${baseUrl}/provjera-bitcoin-standarda/`,
    `${baseUrl}/vodici/`,
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
    `${baseUrl}/primjer-osobnog-bitcoin-standarda/`,
    ...retiredPdfPaths.map((retiredPath) => `${baseUrl}${retiredPath}`),
    `${baseUrl}/vodici/kredit-je-buduci-novac/`,
    `${baseUrl}/vodici/kredit-ili-bitcoin/`,
    `${baseUrl}/vodici/ne-uzimajte-kredit-za-bitcoin/`,
    `${baseUrl}/vodici/sustavno-davanje-u-proracunu-nulte-razine/`,
    `${baseUrl}/vodici/sustavno-davanje-bez-kredita/`,
    `${baseUrl}/vodici/davanje-u-proracunu/`,
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
