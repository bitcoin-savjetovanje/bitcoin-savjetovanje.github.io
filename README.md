# Bitcoin Savjetovanje

Stranica za Bitcoin Savjetovanje, usklađena s knjigom u nastajanju “Bitcoin kao
novac: Praktični vodič za život s Bitcoinom”.

Stack ostaje Vite, React, TypeScript, SSR/prerender i GitHub Pages. Primarni
poslovni cilj je što više kvalitetnih 15-minutnih uvodnih razgovora na lokalnoj
ruti `/razgovor/`, prije odlaska na vanjski Cal.com booking link.

Funnel:

- `/` predstavlja okvir “Od držanja Bitcoina do uređenog sustava odluka”
- `/razgovor/` priprema korisnika za 15-minutni uvodni razgovor
- nakon razgovora nastavak može biti `/bitcoin-konzultacija/` ili
  `/osobni-bitcoin-standard/`

Ne postoji checkout, CMS ni analytics. Stranica ne upravlja sredstvima i ne
traži seed phrase, privatne ključeve, lozinke ili pristup novčaniku.

Najnoviji vizualni pass uvodi knjiški color system, semantičke boje za sedam
područja knjige, tamnu procesnu sekciju i mockup pisanog osobnog Bitcoin
standarda.

Najnoviji business pass jasnije pozicionira Bitcoin Savjetovanje za pojedince,
obitelji i poduzetnike. Dodan je poslovni sloj za novčani tok, poslovnu riznicu,
poreze, plaće, dobavljače, razdvajanje privatnog i poslovnog Bitcoina,
ovlaštene osobe i sigurnosni postupak.

Najnoviji simplification pass smanjuje busy dojam nakon business updatea:
homepage je skraćen, audience dio sveden na osobno/obiteljski/poslovno,
framework mapa je kompaktnija, `/razgovor/` ranije prikazuje booking, a detalji
su prebačeni na program, vodiče i savjetovanje stranice.

Najnoviji polish pass proširuje O meni sekciju, dodaje poruku o učvršćivanju
Bitcoin teze, popravlja copy spacing, uvodi više zraka između sekcija, smiruje
prijelaze sa svijetlih na tamne panele i dosljednije zaobljuje kartice.

## Development

```bash
npm ci
npm run dev
```

## Checks

Run the full local verification set before merging:

```bash
npm run format
npm run lint
npm run typecheck
npm run build
npm run verify:dist
```

Nakon live deploya, opcionalna mrežna provjera:

```bash
npm run verify:live
```

Ove provjere ne koriste browser automation, Lighthouse, Playwright, Puppeteer
ni Chrome headless.

## Content Map

Sadržaj i zajedničke konstante:

- `src/content/site.ts`
- `src/content/method.ts`
- `src/content/offers.ts`
- `src/content/faq.ts`
- `src/content/home.ts`
- `src/content/security.ts`

Vodiči:

- `src/content/guides.ts`

Rute, SEO i schema:

- `src/content/routes.ts`
- `src/content/schema.ts`
- `src/components/Seo.tsx`

Prerender i provjere:

- `scripts/prerender.mjs`
- `scripts/verify-dist.mjs`
- `scripts/verify-live.mjs`

Vizualni asseti:

- `public/images/bitcoin-kao-novac-cover.webp`
- `public/images/bitcoin-kao-novac-cover.jpg`
- `public/og-bitcoin-kao-novac.png`
- `public/og-bitcoin-kao-novac.svg`
- `asset-sources/legacy-public-assets/bitcoin-kao-novac-cover.png`

## Routes

- `/`
- `/razgovor/`
- `/bitcoin-konzultacija/`
- `/osobni-bitcoin-standard/`
- `/bitcoin-savjetovanje/`
- `/vodici/`
- `/vodici/:slug/`
- `/vodici/prihod-nije-slobodan-novac/`
- `/vodici/poslovni-bitcoin-nije-privatni-bitcoin/`
- `/sigurnost/`
- `/privatnost/`

## URL Conventions

- Canonical početne stranice koristi završnu kosu crtu:
  `https://bitcoin-savjetovanje.com/`.
- Conversation, program, guide index, guide pages and static pages use trailing
  slash canonicals.
- Sitemap URLs must match canonical URLs.
- Internal guide links should use trailing slash, for example
  `/vodici/stvarni-visak/`.

## Deployment

Production is moving to Cloudflare Pages from the GitHub repository.

Cloudflare Pages settings:

- Repository: `bitcoin-savjetovanje/bitcoin-savjetovanje.github.io`
- Production branch: `main`
- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22.22.1` from `.node-version`
- Environment variables: none required; do not set `GITHUB_PAGES`

The CI workflow runs:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run verify:dist`

The verification script checks prerendered HTML, sitemap, robots, schema, guide
pages, the program page, security/privacy pages, OG asset, visual pass copy
markers and core CTA/link metadata.

The legacy GitHub Pages deploy workflow should be disabled or removed after the
Cloudflare Pages production domain is live.
