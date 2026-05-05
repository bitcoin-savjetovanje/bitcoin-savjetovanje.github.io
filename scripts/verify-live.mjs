const baseUrl = "https://bitcoin-savjetovanje.com"
const failures = []
const words = (...parts) => parts.join(" ")

const forbiddenVisibleText = [
  "proračun nulte razine",
  "Dogovorite 15-minutni uvodni razgovor",
  "Strukturirani program",
  "Savjetodavni razgovor",
  "Uvodni razgovor",
  words("Bitcoin kao", "kapital"),
  "crypto",
  "ROI",
  "custody",
  "self-custody",
  "cash balance",
  "stack",
  "lead magnet",
  "charity",
  "giving",
]

const pageChecks = [
  {
    path: "/",
    includes: [
      "Imate Bitcoin. Ali imate li Bitcoin standard?",
      "Volatilnost otkriva imate li standard.",
      "Koliko je vaš Bitcoin standard stvaran?",
      "Izgradnja osobnog Bitcoin standarda",
      "Dogovorite provjeru osobnog Bitcoin standarda",
    ],
  },
  {
    path: "/vodici/",
    includes: [
      "Vodiči za osobni Bitcoin standard",
      "Razina 1: Imate Bitcoin, ali još živite po fiat pravilima",
      "Razina 2: Gradite osobni Bitcoin standard",
      "Razina 3: Živite i usavršavate standard",
    ],
  },
  {
    path: "/sigurnost/",
    includes: [
      "Bitcoin mora ostati pod vašom kontrolom",
      "početne riječi",
      "privatne ključeve",
      "ne čuvam Bitcoin",
      "što obitelj smije napraviti",
    ],
  },
  {
    path: "/vodici/kredit-je-buduci-novac/",
    includes: ["Dug je budući novac koji ste već potrošili"],
  },
  {
    path: "/vodici/kredit-ili-bitcoin/",
    includes: ["Dug ili Bitcoin?"],
  },
  {
    path: "/vodici/ne-uzimajte-kredit-za-bitcoin/",
    includes: ["Ne zadužujte se za Bitcoin"],
  },
  {
    path: "/vodici/sustavno-davanje-u-proracunu-nulte-razine/",
    includes: ["Darivanje mijenja vaš odnos prema novcu"],
  },
  {
    path: "/vodici/uskladivanje-kupovne-moci-bitcoina/",
    includes: ["Kada kupovna moć pada", "Kada kupovna moć raste"],
  },
  {
    path: "/vodici/dug-je-buduci-novac/",
    includes: [
      '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/kredit-je-buduci-novac/" />',
    ],
  },
  {
    path: "/vodici/darivanje-u-proracunu/",
    includes: [
      '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/sustavno-davanje-u-proracunu-nulte-razine/" />',
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

for (const check of pageChecks) {
  const url = `${baseUrl}${check.path}`

  try {
    const html = await fetchText(url)
    pass(`${url} returned HTTP 200`)

    for (const expected of check.includes) {
      if (html.includes(expected)) {
        pass(`${url} contains ${expected}`)
      } else {
        fail(`${url} is missing ${expected}`)
      }
    }

    for (const forbidden of forbiddenVisibleText) {
      if (html.includes(forbidden)) {
        fail(`${url} contains forbidden visible text: ${forbidden}`)
      } else {
        pass(`${url} does not contain forbidden visible text: ${forbidden}`)
      }
    }
  } catch (error) {
    fail(`${url} could not be verified: ${error.message}`)
  }
}

try {
  const sitemap = await fetchText(`${baseUrl}/sitemap.xml`)
  pass(`${baseUrl}/sitemap.xml returned HTTP 200`)

  for (const expectedUrl of [
    `${baseUrl}/`,
    `${baseUrl}/vodici/`,
    `${baseUrl}/sigurnost/`,
    `${baseUrl}/vodici/kredit-je-buduci-novac/`,
    `${baseUrl}/vodici/kredit-ili-bitcoin/`,
    `${baseUrl}/vodici/ne-uzimajte-kredit-za-bitcoin/`,
    `${baseUrl}/vodici/sustavno-davanje-u-proracunu-nulte-razine/`,
    `${baseUrl}/vodici/uskladivanje-kupovne-moci-bitcoina/`,
  ]) {
    if (sitemap.includes(`<loc>${expectedUrl}</loc>`)) {
      pass(`sitemap contains ${expectedUrl}`)
    } else {
      fail(`sitemap is missing ${expectedUrl}`)
    }
  }

  for (const removedUrl of [
    `${baseUrl}/vodici/dug-je-buduci-novac/`,
    `${baseUrl}/vodici/dug-ili-bitcoin/`,
    `${baseUrl}/vodici/ne-zaduzujte-se-za-bitcoin/`,
    `${baseUrl}/vodici/darivanje-u-proracunu/`,
    `${baseUrl}/vodici/darivanje-bez-duga/`,
  ]) {
    if (sitemap.includes(`<loc>${removedUrl}</loc>`)) {
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
