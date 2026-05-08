const baseUrl = "https://bitcoin-savjetovanje.com"
const bookingUrl = "https://cal.com/btcpavao/uvodni-poziv"
const representativeGuidePath = "/vodici/stvarni-visak/"
const positiveMoneyGuidePath = "/vodici/pozitivni-neto-priljev/"
const debtChoiceGuidePath = "/vodici/dug-ili-bitcoin/"
const bitcoinMoneyGuidePath = "/vodici/bitcoin-kao-novac/"
const thirdsGuidePath = "/vodici/pravilo-trecina/"
const familyGuidePath = "/vodici/obiteljski-pristup-bitcoinu/"
const securityGuidePath = "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/"
const failures = []

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
  "dogovorite 15-minutni uvodni razgovorpogledajte",
  "uvodni razgovorpogledajte",
  "dogovorite razgovorpogledajte",
  "razgovoršto je bitcoin jasnoća",
  "uvodni razgovoršto je bitcoin jasnoća",
  "praviladogovorite",
  "vodičeprimijenite",
  "1. 1 uvodni razgovor",
  "2. 2 bitcoin jasnoća",
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
  "vidimo ima li smisla za vas",
  "početne riječi",
  "početnih riječi",
  "jedna točka kvara",
  "točka kvara",
  "točku kvara",
  "točke kvara",
  "novcu→",
]

const forbiddenExactVisibleText = ["ROI"]

const pageChecks = [
  {
    path: "/",
    includes: [
      "Prije veće Bitcoin odluke, posložite pitanja, rizike i vlastitu situaciju.",
      "Dođite s jednim stvarnim Bitcoin pitanjem koje utječe na vašu odluku. U 15 minuta vidimo što prvo treba razjasniti i koji bi sljedeći korak bio razuman.",
      "Dođite s jednim stvarnim Bitcoin pitanjem koje utječe na vašu odluku.",
      "U 15 minuta vidimo što prvo treba razjasniti i koji bi sljedeći korak bio razuman.",
      "što još nije jasno u Bitcoin tezi",
      "Ne morate unaprijed znati je li vaše pitanje dovoljno veliko",
      "U 15 minuta ne rješavamo cijeli plan. Razjasnimo gdje ste sada i koji bi sljedeći korak bio razuman.",
      "Ako nakon uvodnog razgovora vrijedi ići dublje, postoje dva plaćena puta.",
      "Bitcoin jasnoća",
      "Krenite od uvodnog razgovora",
      "Vaš Bitcoin ostaje vaš.",
      "Bez zahtjeva za seed phrase.",
      "Seed phrase se nikada ne dijeli.",
      "razgovor treba odmah prekinuti",
      "Dobijete iskrenu procjenu.",
      "Ako plaćeni nastavak nije koristan za vašu situaciju, reći ću vam to otvoreno.",
      "Nekome još nije jasna Bitcoin teza.",
      "Nekome treba razjasniti jedan dio odluke koji još nije dovoljno čvrst.",
      "Jasniji odgovori na pitanja koja se stalno vraćaju",
      "Cilj je vidjeti gdje ste, što prvo treba razjasniti i koji bi sljedeći korak bio razuman.",
      "Razumijete dio priče, ali još nemate jasan odgovor na pitanja koja se stalno vraćaju.",
      "kako odabrati način čuvanja Bitcoina",
      "kako spriječiti da pristup Bitcoinu ovisi o jednoj osobi, uređaju ili lokaciji",
      "Pregled osobne slike: dug, proračun, sigurnost, obitelj i struktura imovine",
      "ne čuvam vaš Bitcoin",
      "ne tražim seed phrase ili privatne ključeve",
      "Praktični Bitcoin standard je radni okvir iza mog savjetovanja.",
      "Vodiči objašnjavaju okvir. Razgovor ga primjenjuje na vašu situaciju.",
      "Dogovorite 15-minutni uvodni razgovor",
      "Pogledajte pitanja koja možemo proći",
      'href="#pitanja"',
      'data-cta="hero-questions"',
      "U razgovor možete doći s jednim stvarnim Bitcoin pitanjem.",
      "Dovoljno je da imate stvarno pitanje koje utječe na vašu odluku.",
      "što vas najviše brine",
      "što još nedostaje za mirniju odluku",
      "U 15 minuta razjasnimo gdje ste sada, koju odluku pokušavate donijeti i koji bi sljedeći korak bio razuman.",
      "Dobivate jasniju sliku što zapravo stoji iza odluke",
      "Provjerite ima li uvodni razgovor smisla",
      "Odaberite pitanje koje vam je najbliže.",
      "Nakon odabira vidjet ćete zašto je to dobro pitanje za uvodni razgovor.",
      "Što se mijenja kada postoji osobni okvir?",
      "Imate Bitcoin pitanje?",
      'data-cta="readiness-test-intro-call"',
      'data-cta="before-after-intro-call"',
      'data-cta="desktop-rail-intro-call"',
      'data-cta="desktop-rail-questions"',
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
      "razgovorPogledajte",
      "uvodni razgovorPogledajte",
      "razgovorŠto je Bitcoin jasnoća",
      "uvodni razgovorŠto je Bitcoin jasnoća",
      "pravilaDogovorite",
      "vodičePrimijenite",
      "Odabrano pitanje:",
      "novcu→",
      "višak?Stvarni",
      "još nije sjelo",
      "glavni čvor",
      "gdje ste zapeli",
      "Tražimo gdje je čvor",
      "pitanje koje vas koči",
    ],
  },
  {
    path: "/razgovor/",
    includes: [
      "Dogovorite 15-minutni uvodni razgovor",
      "Razgovor je bez naknade i bez obveze.",
      "što prvo treba razjasniti",
      "Prije razgovora razmislite o jednom glavnom pitanju.",
      "Dobra pitanja za uvodni razgovor zvuče ovako",
      "Razjasnimo glavno pitanje.",
      "Vidimo što nedostaje za sljedeći korak.",
      "Što se može dogoditi nakon razgovora?",
      "Nakon razgovora moguća su tri ishoda",
      "Ne mora svaki uvodni razgovor završiti plaćenim nastavkom.",
      "Dogovorimo sljedeći korak ili zaključimo da je za sada dovoljno.",
      "Spremni za uvodni razgovor?",
      "Odaberite termin i dođite s jednim stvarnim pitanjem.",
      "Ne morate imati gotov plan",
      "Imam Bitcoin, ali partner ili obitelj još nisu sigurni.",
      "Brine me sigurnost i ne želim pogriješiti s čuvanjem Bitcoina.",
      "Ne šaljite seed phrase, privatne ključeve, lozinke",
      "Otvorite kalendar i odaberite termin",
      "Otvorit će se kalendar. Odaberite termin",
      "Odaberite termin za uvodni razgovor.",
      'data-cal-inline="uvodni-poziv"',
      'data-cta="conversation-inline-calendar-fallback"',
      'data-cta="header-intro-call"',
      'data-cta="conversation-page-final-calendar"',
      'data-cal-namespace="uvodni-poziv"',
      'data-cal-link="btcpavao/uvodni-poziv"',
      "data-cal-config=",
      "month_view",
      bookingUrl,
    ],
    htmlMustNotMatch: [
      {
        pattern:
          /<a\b(?=[^>]*href="https:\/\/cal\.com\/btcpavao\/uvodni-poziv")(?=[^>]*target="_blank")[^>]*>/,
        label: "Cal booking links opening in a new tab",
      },
    ],
    textMustNotInclude: [
      "još nije sjelo",
      "glavni čvor",
      "gdje ste zapeli",
      "Tražimo gdje je čvor",
      "pitanje koje vas koči",
    ],
  },
  {
    path: "/bitcoin-jasnoca/",
    includes: [
      "Bitcoin jasnoća",
      "200 €",
      "jedan dubinski razgovor",
      "Nakon Bitcoin jasnoće najčešće imate",
      "Što pripremiti",
      "Kada nije za vas",
      "Bitcoin jasnoća ili osobni Bitcoin standard?",
      "Kako razgovor završava",
      "Na kraju ne dobivate savjet",
      "što je stvarni rizik",
      "Bitcoin jasnoća je za jedno ozbiljno pitanje",
      "Osobni Bitcoin standard je za pisani sustav pravila",
      "Krenite od uvodnog razgovora",
      "ne tražim seed phrase",
      "ne prognoziram cijenu",
      "ne upravljam vašim sredstvima",
    ],
  },
  {
    path: "/sigurnost/",
    includes: [
      "Dobar sigurnosni okvir ima dva cilja.",
      "Seed phrase se nikada ne dijeli. Dobar savjetnik vam pomaže urediti okvir bez preuzimanja kontrole.",
      "nitko ne smije dobiti kontrolu nad vašim Bitcoinom bez vašeg znanja",
      "vaša obitelj ne smije ostati potpuno izgubljena",
      "seed phrase — 12 ili 24 riječi za oporavak novčanika",
      "privatne ključeve",
      "lozinke",
      "ne čuvam Bitcoin",
      "način čuvanja prikladan za vašu situaciju",
      "kako složiti oporavak tako da ne ovisi o jednoj osobi, uređaju ili lokaciji",
      "ne tražim seed phrase ni privatne ključeve",
      "Za rad nije potrebno dijeliti seed phrase",
      "Razgovarajmo o sigurnosti bez predaje kontrole",
      "U uvodnom razgovoru ne radimo tehničke promjene.",
      "Možemo urediti",
      "Procjenjujemo rizike",
      "Odluka ostaje vaša",
    ],
    includesAny: [
      [
        "Bitcoin mora ostati pod vašom kontrolom",
        "Kontrola ostaje kod vas",
      ],
    ],
  },
  {
    path: "/vodici/",
    includes: [
      "Vodiči",
      'data-link="guide-card"',
      "Ne morate čitati sve odjednom. Ako ne znate gdje krenuti, krenite od proračuna.",
      "Korak 1 — Red u novcu",
      "Korak 2 — Dug i sloboda odluke",
      "Korak 3 — Davanje",
      "Korak 4 — Bitcoin kao novac",
      "Korak 5 — Neto imovina",
      "Korak 6 — Sigurnost i obitelj",
      'href="#proracun"',
      'href="#dug"',
      'href="#davanje"',
      'href="#bitcoin"',
      'href="#neto-imovina"',
      'href="#sigurnost"',
      'id="proracun"',
      'id="dug"',
      'id="davanje"',
      'id="bitcoin"',
      'id="neto-imovina"',
      'id="sigurnost"',
      "Uvodni razgovor pomaže vidjeti koji dio okvira je za vas trenutno najvažniji.",
    ],
    includesAny: [
      [
        "Želite primijeniti okvir na vlastitu situaciju?",
        "Želite ovo primijeniti na svoju situaciju?",
      ],
      [
        "Dogovorite 15-minutni uvodni razgovor",
        "Dogovorite uvodni razgovor",
      ],
    ],
  },
  {
    path: representativeGuidePath,
    includes: [
      'href="/razgovor/"',
      "Vodič objašnjava okvir",
      "Dogovorite uvodni razgovor",
      "Drugim riječima, stvarni višak je novac bez druge namjene",
      "ne pripada budućem plaćanju",
      "Manje je nagađanja",
    ],
    textMustNotInclude: ["Ovo se odnosi na vašu situaciju?"],
  },
  {
    path: positiveMoneyGuidePath,
    includes: [
      "Novac koji ostaje",
      "Bitcoin standard počinje kada mjesec može stajati na vlastitim nogama.",
      "Novac ulazi kroz plaću, posao, klijente, prodaju ili druge izvore.",
      "Pet načina da više novca ostane u sustavu",
      "Prvo popravljam prihode, troškove i stanje duga.",
    ],
  },
  {
    path: debtChoiceGuidePath,
    includes: [
      "Težak, ali čistiji put",
      "Dug povećava nemir i skraćuje vrijeme za odluku.",
      "Dug sužava izbor prije nego što odluka postane mirna.",
      "Ako imate dug i niste sigurni treba li prvo čistiti bilancu ili nastaviti s Bitcoinom",
    ],
  },
  {
    path: bitcoinMoneyGuidePath,
    includes: [
      "Ako ne možete objasniti sebi ili partneru je li Bitcoin za vas novac",
    ],
  },
  {
    path: thirdsGuidePath,
    includes: [
      "Ovo nije preporuka da kupujete ili prodajete određenu imovinu.",
      "Ako želite provjeriti ravnotežu neto imovine bez pretvaranja toga u slijepu formulu",
    ],
  },
  {
    path: familyGuidePath,
    includes: [
      "Minimalna obiteljska uputa",
      "Ako obitelj zna da Bitcoin postoji, ali nema jasne upute što smije i ne smije napraviti",
    ],
  },
  {
    path: securityGuidePath,
    includes: [
      "Sigurnost ne smije ovisiti samo o vama",
      "Nitko ne smije tražiti seed phrase",
      "Za širi sigurnosni okvir pročitajte i sigurnosnu stranicu.",
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
      assertTextDoesNotInclude(url, textWithoutTags(html), forbidden)
    }

    for (const forbidden of check.htmlMustNotMatch ?? []) {
      assertHtmlDoesNotMatch(url, html, forbidden.pattern, forbidden.label)
    }

    assertHtmlDoesNotInclude(url, html, 'alt="Image"')
    assertHtmlDoesNotInclude(url, html, 'alt="image"')
    assertHtmlDoesNotInclude(url, html, 'alt="Slika"')
    assertHtmlDoesNotInclude(url, html, 'alt="Logo"')

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
  const sitemap = await fetchText(`${baseUrl}/sitemap.xml`)
  pass(`${baseUrl}/sitemap.xml returned HTTP 200`)

  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1]
  )

  for (const expectedUrl of [
    `${baseUrl}/`,
    `${baseUrl}/razgovor/`,
    `${baseUrl}/bitcoin-jasnoca/`,
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
    `${baseUrl}/vodici/kredit-je-buduci-novac/`,
    `${baseUrl}/vodici/kredit-ili-bitcoin/`,
    `${baseUrl}/vodici/ne-uzimajte-kredit-za-bitcoin/`,
    `${baseUrl}/vodici/sustavno-davanje-u-proracunu-nulte-razine/`,
    `${baseUrl}/vodici/sustavno-davanje-bez-kredita/`,
    `${baseUrl}/vodici/davanje-u-proracunu/`,
  ]) {
    if (sitemapUrls.includes(removedUrl)) {
      fail(`sitemap still contains alias URL ${removedUrl}`)
    } else {
      pass(`sitemap does not contain alias URL ${removedUrl}`)
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
