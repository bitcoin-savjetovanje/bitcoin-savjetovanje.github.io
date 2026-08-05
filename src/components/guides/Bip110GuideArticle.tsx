import {
  Anchor,
  Blocks,
  BookOpenCheck,
  Bot,
  ChartNoAxesCombined,
  ChevronDown,
  Compass,
  Database,
  FileCode2,
  GitFork,
  Globe2,
  Handshake,
  Landmark,
  Layers3,
  LockKeyhole,
  Network,
  Pickaxe,
  Scale,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useState } from "react"

import source from "@/content/bip110-guide.txt?raw"
import { renderWithGlossary } from "@/utils/glossary"
import { slugifyHeading } from "@/utils/readingTime"

type ArticleToken =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; lines: string[] }
  | { type: "list"; items: string[] }
  | { type: "formula"; lines: string[] }
  | { type: "closing"; lines: string[] }
  | { type: "visual"; index: number }

const topLevelHeadings = new Set([
  "Što je BIP-110?",
  "Zašto je BIP-110 uopće nastao?",
  "Najjača moguća verzija argumenta za BIP-110",
  "Gdje se slažem sa zagovornicima BIP-110",
  "Bitcoin se ne može skalirati tako da svako plaćanje ide na osnovni sloj",
  "Lekcija 2017. nije da se osnovni sloj ne smije koristiti, nego da se ne smije beskonačno povećavati",
  "Hal Finney i Bitcoin kao novac visoke snage",
  "Spektar mogućih slojeva Bitcoinova monetarnog sustava",
  "Zašto prostor za podatke može Bitcoin učiniti boljim novcem",
  "Bitcoin trezorske kompanije kao drugi oblik monetarnog širenja",
  "Bitcoinova kupovna moć, rudari i energetski razvoj",
  "Kako bi mogao izgledati puni Bitcoin standard nakon 2140.",
  "Osnovni konsenzus ostaje jednostavan i tvrd",
  "Iznad njega postojat će različiti sustavi",
  "Umjetna inteligencija i roboti vjerojatno će koristiti Bitcoin u naše ime",
  "Zašto takav sustav može biti kulturno i civilizacijski dobar",
  "Zašto ne podržavam BIP-110",
  "Tko na kraju određuje pravila?",
  "Kako razmišljati o ovakvim raspravama",
  "Zaključak",
  "Napomena za čitatelja",
])

const sectionPictograms: Record<string, LucideIcon> = {
  "Što je BIP-110?": FileCode2,
  "Zašto je BIP-110 uopće nastao?": GitFork,
  "Najjača moguća verzija argumenta za BIP-110": ShieldCheck,
  "Gdje se slažem sa zagovornicima BIP-110": Handshake,
  "Bitcoin se ne može skalirati tako da svako plaćanje ide na osnovni sloj":
    Blocks,
  "Lekcija 2017. nije da se osnovni sloj ne smije koristiti, nego da se ne smije beskonačno povećavati":
    LockKeyhole,
  "Hal Finney i Bitcoin kao novac visoke snage": Landmark,
  "Spektar mogućih slojeva Bitcoinova monetarnog sustava": Layers3,
  "Zašto prostor za podatke može Bitcoin učiniti boljim novcem": Database,
  "Bitcoin trezorske kompanije kao drugi oblik monetarnog širenja":
    ChartNoAxesCombined,
  "Bitcoinova kupovna moć, rudari i energetski razvoj": Pickaxe,
  "Kako bi mogao izgledati puni Bitcoin standard nakon 2140.": Globe2,
  "Osnovni konsenzus ostaje jednostavan i tvrd": Anchor,
  "Iznad njega postojat će različiti sustavi": Network,
  "Umjetna inteligencija i roboti vjerojatno će koristiti Bitcoin u naše ime":
    Bot,
  "Zašto takav sustav može biti kulturno i civilizacijski dobar": Sparkles,
  "Zašto ne podržavam BIP-110": Scale,
  "Tko na kraju određuje pravila?": UsersRound,
  "Kako razmišljati o ovakvim raspravama": Compass,
  Zaključak: BookOpenCheck,
  "Napomena za čitatelja": BookOpenCheck,
}

const visuals = [
  {
    src: "/images/guide-bip110/01-naslovna-slika-mediteranski.webp",
    alt: "Kameni Bitcoinov temelj u precizno ograničenom okviru iz kojeg se otvaraju putovi prema različitim monetarnim slojevima",
  },
  {
    src: "/images/guide-bip110/02-politika-nasuprot-konsenzusu.webp",
    alt: "Razlika između politike mempoola i prosljeđivanja te konsenzusnih pravila",
  },
  {
    src: "/images/guide-bip110/03-steelman-bip-110.webp",
    alt: "Pošten prikaz argumenta BIP-110 o trošku podatkovnih sustava za kućne pune čvorove",
  },
  {
    src: "/images/guide-bip110/04-matematika-skaliranja.webp",
    alt: "Matematika ograničenog kapaciteta Bitcoinova osnovnog sloja",
  },
  {
    src: "/images/guide-bip110/05-lekcija-2017.webp",
    alt: "Raskrižje između većih blokova i ograničenog osnovnog sloja s agregacijom",
  },
  {
    src: "/images/guide-bip110/06-spektar-skrbnistva.webp",
    alt: "Spektar od pune samoskrbi do skrbničke banke ili mjenjačnice",
  },
  {
    src: "/images/guide-bip110/07-strategy-i-trzista-kapitala.webp",
    alt: "Tok kapitala iz tradicionalnih tržišta kroz Bitcoin trezorsku kompaniju prema Bitcoinovoj monetarnoj bazi",
  },
  {
    src: "/images/guide-bip110/08-bitcoin-i-energetski-krug.webp",
    alt: "Gospodarski krug između monetarne uporabe Bitcoina, rudarenja, energije i infrastrukture",
  },
  {
    src: "/images/guide-bip110/09-bitcoin-standard-2140.webp",
    alt: "Slojeviti Bitcoinov monetarni sustav nakon 2140. s obiteljima, industrijom, energijom, robotima i umjetnom inteligencijom",
  },
  {
    src: "/images/guide-bip110/10-zasto-ne-podrzavam-bip-110.webp",
    alt: "Vaga između ciljeva BIP-110 i troškova za buduće slojeve, konsenzus i rizik rascjepa",
  },
  {
    src: "/images/guide-bip110/11-zavrsna-slika.webp",
    alt: "Ograničena, neutralna, otvorena i provjerljiva Bitcoinova jezgra kao temelj različitih monetarnih puteva",
  },
] as const

function isNumberedHeading(line: string) {
  return /^[1-7]\. [A-ZČĆĐŠŽ]/.test(line)
}

function isFormulaGroup(lines: string[]) {
  return (
    lines.length > 1 &&
    lines.every((line) => /^[\d≈]/.test(line)) &&
    lines.some((line) => /[×÷≈]/.test(line))
  )
}

function isListGroup(lines: string[]) {
  if (lines.length < 2) {
    return false
  }

  return (
    /^[a-zčćđšž]/.test(lines[0]) ||
    lines.slice(0, -1).every((line) => line.endsWith(";"))
  )
}

function contentToken(lines: string[]): ArticleToken {
  if (isFormulaGroup(lines)) {
    return { type: "formula", lines }
  }

  if (
    lines.length === 2 &&
    lines[0] === "Bitcoin ne treba izvršavati svaku transakciju svijeta."
  ) {
    return { type: "closing", lines }
  }

  if (isListGroup(lines)) {
    return { type: "list", items: lines }
  }

  return { type: "paragraph", lines }
}

function parseArticle() {
  const tokens: ArticleToken[] = []
  const blocks = source.trimEnd().split(/\n\s*\n/)

  for (const [blockIndex, block] of blocks.entries()) {
    const lines = block.split("\n").map((line) => line.trim())

    if (blockIndex === 0) {
      continue
    }

    const visualMatch = lines[0]?.match(/^\[VIZUAL (\d+)/)

    if (visualMatch) {
      tokens.push({ type: "visual", index: Number(visualMatch[1]) })
      continue
    }

    let pending: string[] = []

    const flushPending = () => {
      if (pending.length > 0) {
        tokens.push(contentToken(pending))
        pending = []
      }
    }

    for (const line of lines) {
      if (topLevelHeadings.has(line)) {
        flushPending()
        tokens.push({ type: "heading", level: 2, text: line })
      } else if (isNumberedHeading(line)) {
        flushPending()
        tokens.push({ type: "heading", level: 3, text: line })
      } else {
        pending.push(line)
      }
    }

    flushPending()
  }

  return tokens
}

const articleTokens = parseArticle()
const tableOfContents = articleTokens.filter(
  (token): token is Extract<ArticleToken, { type: "heading" }> =>
    token.type === "heading" && token.level === 2
)
const exhaustiveGlossaryOptions = {
  maxTerms: Number.POSITIVE_INFINITY,
} as const
const signalRateLabel = "1,1 posto"
const signalMonitorUrl = "https://bip110monitor.com/"

function renderArticleText(line: string) {
  const signalRateIndex = line.indexOf(signalRateLabel)

  if (signalRateIndex < 0) {
    return renderWithGlossary(line, exhaustiveGlossaryOptions)
  }

  const beforeSignalRate = line.slice(0, signalRateIndex)
  const afterSignalRate = line.slice(signalRateIndex + signalRateLabel.length)

  return (
    <>
      {renderWithGlossary(beforeSignalRate, exhaustiveGlossaryOptions)}
      <a
        className="bip110-article__signal-source"
        href={signalMonitorUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {signalRateLabel}
      </a>
      {renderWithGlossary(afterSignalRate, exhaustiveGlossaryOptions)}
    </>
  )
}

const expectedTextLines = source
  .trimEnd()
  .split("\n")
  .slice(2)
  .map((line) => line.trim())
  .filter(
    (line) =>
      line.length > 0 &&
      !line.startsWith("[VIZUAL ") &&
      !line.startsWith("Prompt za ImageGen:")
  )

const renderedTextLines = articleTokens.flatMap((token) => {
  if (token.type === "visual") {
    return []
  }

  if (token.type === "heading") {
    return [token.text]
  }

  if (token.type === "list") {
    return token.items
  }

  return token.lines
})

if (renderedTextLines.join("\n") !== expectedTextLines.join("\n")) {
  throw new Error("BIP-110 article text does not match the supplied source.")
}

export function Bip110GuideArticle() {
  const [activeSection, setActiveSection] = useState(
    slugifyHeading(tableOfContents[0]?.text ?? "")
  )
  const [tocExpanded, setTocExpanded] = useState(false)

  useEffect(() => {
    const headings = tableOfContents
      .map((item) => document.getElementById(slugifyHeading(item.text)))
      .filter((heading): heading is HTMLElement => Boolean(heading))

    if (headings.length === 0 || !("IntersectionObserver" in window)) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeading = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top
          )[0]

        if (visibleHeading?.target.id) {
          setActiveSection(visibleHeading.target.id)
        }
      },
      {
        rootMargin: "-18% 0px -72% 0px",
        threshold: 0,
      }
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bip110-article">
      <nav
        aria-labelledby="bip110-toc-heading"
        className="guide-toc-card bip110-article__toc"
      >
        <div className="bip110-article__toc-header">
          <h2 id="bip110-toc-heading">U ovom vodiču</h2>
          <button
            type="button"
            className="bip110-article__toc-toggle"
            aria-controls="bip110-toc-list"
            aria-expanded={tocExpanded}
            onClick={() => setTocExpanded((current) => !current)}
          >
            <span>{tocExpanded ? "Sakrij sadržaj" : "Prikaži sadržaj"}</span>
            <ChevronDown aria-hidden="true" />
          </button>
        </div>
        <ol id="bip110-toc-list" data-expanded={tocExpanded ? "true" : undefined}>
          {tableOfContents.map((item) => (
            <li key={item.text}>
              <a
                href={`#${slugifyHeading(item.text)}`}
                aria-current={
                  activeSection === slugifyHeading(item.text)
                    ? "location"
                    : undefined
                }
                onClick={() => setTocExpanded(false)}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="bip110-article__body">
        {articleTokens.map((token, tokenIndex) => {
          if (token.type === "heading") {
            if (token.level === 2) {
              const Pictogram = sectionPictograms[token.text]

              return (
                <h2
                  className="bip110-article__section-heading"
                  id={slugifyHeading(token.text)}
                  key={`${token.type}-${token.text}`}
                >
                  {Pictogram ? (
                    <span
                      className="bip110-article__section-pictogram"
                      aria-hidden="true"
                    >
                      <Pictogram strokeWidth={1.9} />
                    </span>
                  ) : null}
                  <span>{token.text}</span>
                </h2>
              )
            }

            return (
              <h3
                id={slugifyHeading(token.text)}
                key={`${token.type}-${token.text}`}
              >
                {token.text}
              </h3>
            )
          }

          if (token.type === "visual") {
            const visual = visuals[token.index - 1]

            if (!visual) {
              return null
            }

            return (
              <figure
                className="bip110-article__visual"
                key={`${token.type}-${token.index}`}
              >
                <img
                  src={visual.src}
                  alt={visual.alt}
                  width="1672"
                  height="941"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            )
          }

          if (token.type === "list") {
            return (
              <ul
                className="bip110-article__list"
                key={`${token.type}-${tokenIndex}`}
              >
                {token.items.map((item, itemIndex) => (
                  <li key={`${item}-${itemIndex}`}>
                    {renderArticleText(item)}
                  </li>
                ))}
              </ul>
            )
          }

          if (token.type === "formula") {
            return (
              <div
                className="bip110-article__formula"
                key={`${token.type}-${tokenIndex}`}
              >
                {token.lines.map((line) => (
                  <p key={line}>{renderArticleText(line)}</p>
                ))}
              </div>
            )
          }

          if (token.type === "closing") {
            return (
              <blockquote
                className="bip110-article__closing"
                key={`${token.type}-${tokenIndex}`}
              >
                {token.lines.map((line) => (
                  <p key={line}>{renderArticleText(line)}</p>
                ))}
              </blockquote>
            )
          }

          return token.lines.map((line, lineIndex) => (
            <p key={`${line}-${lineIndex}`}>{renderArticleText(line)}</p>
          ))
        })}
      </div>
    </div>
  )
}
