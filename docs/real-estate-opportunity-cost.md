# Nekretnina ili Bitcoin?

Route: `/nekretnina-ili-bitcoin/`.

This is a conditional opportunity-cost comparison for debt-free real estate or an aggregated portfolio. It does not recommend selling property or promise a Bitcoin return. All property, rent and personal-expense inputs remain in React state in the browser; they are neither transmitted nor persisted. Only public Bitcoin snapshot and model data are requested.

## Shared model and data

- `bitcoinOpportunityCost.ts` uses the existing Bitcoin Wave date mapper, `addUtcCalendarYears`, `powerLawMedianPrice` and `compoundAnnualGrowthRate` from `bitcoinWaveCalculator.ts`.
- `bitcoinWaveData.ts` extracts the existing dataset fetch without changing HTimeCalculator's behavior.
- `useOpportunityMarket.ts` uses the existing snapshot API and aging policy, refreshing once per minute while visible. Missing/expired price or chain data suppress the Bitcoin comparison; an old hard-coded price is never presented as today's market price.
- Today's PL0 is calculated from the snapshot's actual block height, as in HTimeCalculator. Future calendar-year endpoints use the same date mapper as the long-term-trend page.

For horizon `n` (1, 5, 10 or 30 years):

```
multiplier = futurePL0USD / currentMarketBTCUSD
marketToPL0CAGR = multiplier^(1/n) - 1
trendCAGR = (futurePL0USD / currentPL0USD)^(1/n) - 1
netSale = propertyValue * (1 - saleCostRate)
bitcoinEndEUR = netSale * multiplier
futureBTCEURModel = currentMarketBTCEUR * multiplier
```

The first CAGR determines the comparison; the trend CAGR is context. EUR-equivalent amounts apply the USD growth multiplier, without forecasting EUR/USD.

## Real-estate arithmetic

Rates are fractions in pure functions and percentages in inputs. Annual costs remain nominally constant. Rent for year 1 uses today's entered monthly rent; rent growth begins in year 2.

```
rentFactor = sum((1 + rentGrowth)^k, k = 0 .. n-1)
cumulativeNetRent = 12 * monthlyRent * rentFactor - n * annualCosts
endingProperty = propertyValue * (1 + propertyGrowth)^n
economicValue = endingProperty + cumulativeNetRent
futurePropertyBTC = economicValue / futureBTCEURModel
btcDenominatedChange = futurePropertyBTC / (propertyValue / currentMarketBTCEUR) - 1
propertyVsBitcoin = economicValue / bitcoinEndEUR - 1
```

Negative rent and negative economic results remain visible. The BTC-denominated change uses gross property value today; the direct comparison uses the net-sale-funded alternative. A 100% sale cost leaves zero Bitcoin capital and an undefined relative comparison, displayed as unavailable.

Break-even appreciation solves `endingProperty + cumulativeNetRent = bitcoinEndEUR`. If rent alone exceeds the target, there is no exact equality with a nonnegative ending property value; the UI explains this. Mathematically valid negative appreciation is retained.

Break-even starting monthly rent is `(bitcoinEndEUR - endingProperty + n * annualCosts) / (12 * rentFactor)`. A nonpositive answer means no additional rent is needed. The explicit sum handles zero, near-zero and -100% rent growth.

The first chart indexes both alternatives to the same gross starting property capital of 100, showing any sale cost as an immediate reduction in the Bitcoin line. The second chart displays the economic value in BTC. Annual lines connect scenario endpoints; they are not a forecast of a smooth market path. All four principal horizons also appear in an accessible, horizontally scrollable table.

## Intentional exclusions

No mortgage, debt amortization, future EUR/USD forecast, separate euro inflation, reinvestment or discounting of rent, IRR, or safe withdrawal recommendation. Taxes, maintenance, vacancy and transaction costs only enter through user assumptions. The property endpoint is market value before a possible future liquidation, while the sale-cost input concerns a sale today. Personal spending is contextual and is not deducted from either main scenario. Nonfinancial property utility and individual legal/accounting consequences are not quantified.

## Static hosting

Prerendering emits `dist/nekretnina-ili-bitcoin/index.html`, so direct route loading does not need an SPA fallback. SEO and sitemap follow the existing canonical domain, `https://bitcoin-savjetovanje.com`.

The production repository uses Cloudflare Pages Functions for `/api/bitcoin-snapshot`. GitHub Pages cannot run that backend. On the exact `bitcoin-savjetovanje.github.io` hostname, this calculator uses the canonical site's same public snapshot endpoint. The API change permits that exact GitHub Pages origin through CORS. Deploy the accompanying Function update on the canonical host before using live comparison from the GitHub Pages origin; this does not create a second market-data service. Other existing callers retain their same-origin default behavior.

## Verification

- `npm run format` — passed; unrelated pre-existing formatting differences were excluded from this change.
- `npm run lint` and `npm run typecheck` — passed.
- `npm run build` — passed, including prerender and the navigation stylesheet gate.
- `npm run verify:dist` — 5,254 checks passed, including the new route's H1, indexability and links.
- `node --experimental-strip-types --test src/lib/opportunityCost.test.ts src/lib/bitcoinSnapshot.test.ts` — 29 tests passed: 18 opportunity-cost tests plus 11 existing snapshot tests. Includes specified cases A–G, inverse break-even checks, rent-growth edge cases, sale costs, calendar dates, separate CAGRs and endpoint selection.
- No browser automation, screenshots, Chrome, Puppeteer, Playwright or Lighthouse was used. Visual and live cross-origin behavior have not been browser-tested.

Useful later extensions, outside this change: a separately specified mortgage model, rent reinvestment/consumption scenarios, and additional assets using the shared Bitcoin projection module.
