# Bitcoin Savjetovanje

Stranica za Bitcoin Savjetovanje, izgrađena s Viteom, Reactom, TypeScriptom,
SSR/prerenderom i GitHub Pagesom. Glavna javna konverzija je lokalna stranica
`/razgovor/`, koja posjetitelja priprema za 15-minutni uvodni razgovor prije
odlaska na vanjski kalendar. Početna stranica je usmjerena na pitanja,
nejasnoće, sigurnost i mirniju osobnu odluku, dok je Praktični Bitcoin standard
predstavljen kao dublji okvir rada.

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

## Content map

Sadržaj početne stranice:

- `src/content/site.ts`
- `src/content/method.ts`
- `src/content/offers.ts`
- `src/content/faq.ts`

Guides:

- `src/content/guides.ts`

Routes and SEO:

- `src/content/routes.ts`
- `src/content/schema.ts`
- `src/components/Seo.tsx`

Prerender:

- `scripts/prerender.mjs`
- `scripts/verify-dist.mjs`
- `scripts/verify-live.mjs`

## Routes

- `/`
- `/razgovor/`
- `/vodici/`
- `/vodici/:slug/`
- `/sigurnost/`

## URL conventions

- Canonical početne stranice koristi završnu kosu crtu:
  `https://bitcoin-savjetovanje.com/`.
- Conversation, guide index, guide pages and static pages use trailing slash canonicals.
- Sitemap URLs must match canonical URLs.
- Internal guide links should use trailing slash, for example
  `/vodici/stvarni-visak/`.

## Deployment

GitHub Pages deploys from `main`.

The deploy workflow runs:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run verify:dist`

The Pages artifact is uploaded only after `verify:dist` passes.
The verification script checks prerendered HTML, sitemap, robots, schema, guide
pages, the security page, and core CTA/link metadata used for future
privacy-friendly analytics hooks.
