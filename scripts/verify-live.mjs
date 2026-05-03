const baseUrl = "https://bitcoin-savjetovanje.com"
const failures = []

const forbiddenVisibleText = [
  "Bitcoin kao novac, kapital i potrošnja",
  "dugoročnog kapitala",
  "Bitcoin kao kapital",
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
      "Imate Bitcoin? Izgradite osobni Bitcoin standard.",
      "Bez prognoza cijene",
      "Praktični Bitcoin standard ima redoslijed.",
    ],
  },
  {
    path: "/vodici/",
    includes: [
      "Preporučeni redoslijed čitanja",
      "Ako nemate osobni proračun nulte razine",
      "Ako imate kredit",
    ],
  },
  {
    path: "/sigurnost/",
    includes: [
      "Nikada ne tražim",
      "početne riječi",
      "privatne ključeve",
      "ne čuvam Bitcoin",
      "model skrbništva",
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
  ]) {
    if (sitemap.includes(`<loc>${expectedUrl}</loc>`)) {
      pass(`sitemap contains ${expectedUrl}`)
    } else {
      fail(`sitemap is missing ${expectedUrl}`)
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
