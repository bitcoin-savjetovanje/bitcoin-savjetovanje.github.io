import {
  PARAMETERS,
  POWER_LAW_LEVELS,
  WAVE_BANDS,
  createDateMapper,
  createModelSeries,
  extendedYearMarks,
  priceToRoot,
  selectVisibleYears,
  validateDataset,
} from "./model.mjs?v=20260724-live-price-1";

const Plotly = window.Plotly;
const plot = document.querySelector("#bitcoin-root-scale-chart");
const status = document.querySelector("#chart-status");

const COLORS = Object.freeze({
  PL5: "#c40233",
  PL4: "#ff0000",
  PL3: "#ff4500",
  PL2: "#ff8c00",
  PL1: "gold",
  PL0: "green",
  "PL-1": "royalblue",
  "PL-2": "indigo",
  "PL-3": "purple",
  W2: "orange",
  W0: "magenta",
  "W-2": "darkcyan",
  BTC: "#007bff",
});

const LINE_WIDTHS = Object.freeze({
  PL5: 1.5,
  PL4: 0.8,
  PL3: 0.8,
  PL2: 0.8,
  PL1: 0.8,
  PL0: 2,
  "PL-1": 0.8,
  "PL-2": 0.8,
  "PL-3": 1.5,
  W2: 1.5,
  W0: 1.5,
  "W-2": 1.5,
});

const FILL_COLORS = Object.freeze({
  PL5: "rgba(196,2,51,0.10)",
  PL4: "rgba(255,0,0,0.10)",
  PL3: "rgba(255,69,0,0.10)",
  PL2: "rgba(255,140,0,0.10)",
  PL1: "rgba(255,215,0,0.10)",
  PL0: "rgba(0,128,0,0.10)",
  "PL-1": "rgba(65,105,225,0.10)",
  "PL-2": "rgba(75,0,130,0.10)",
});

const FULL_RANGE = Object.freeze([0, PARAMETERS.finalHalving]);
const LABELS = Object.freeze({
  btcPrice: "Cijena BTC-a",
  fill: "Ispuna",
  legend: "Legenda",
});
const MODEBAR_LABELS = Object.freeze({
  "Download plot as a PNG": "Preuzmi graf kao PNG",
  "Download plot as a png": "Preuzmi graf kao PNG",
  Zoom: "Zumiranje",
  Pan: "Pomicanje",
  "Zoom in": "Povećaj",
  "Zoom out": "Smanji",
  Autoscale: "Automatska skala",
  "Reset axes": "Vrati osi",
});
const PLOTLY_DICTIONARY = Object.freeze({
  "Download plot": "Preuzmi graf",
  "Download plot as a PNG": "Preuzmi graf kao PNG",
  "Download plot as a png": "Preuzmi graf kao PNG",
  Zoom: "Zumiranje",
  Pan: "Pomicanje",
  "Zoom in": "Povećaj",
  "Zoom out": "Smanji",
  Autoscale: "Automatska skala",
  "Reset axes": "Vrati osi",
  "Taking snapshot - this may take a few seconds": "Izrada slike može potrajati nekoliko sekundi.",
  "Double-click to zoom back out": "Dvaput kliknite za povratak na cijeli prikaz.",
});
const INITIAL_VISIBLE = new Set(["PL0", LABELS.btcPrice]);
const DATASET_PATH = "./bitcoin-wave-rootchart-v1.json?v=20260715-h12";
const SNAPSHOT_PATH = "/api/bitcoin-snapshot";
const SNAPSHOT_REFRESH_INTERVAL_MS = 60_000;
const GUIDE_IDLE_MS = 360;
const WHEEL_IDLE_MS = 480;
let guideUpdateInProgress = false;
let guideUpdatePending = false;
let guideUpdateTimer = 0;
let lastGuideSignature = "";
let lastWheelAt = Number.NEGATIVE_INFINITY;
let historicalDataset = null;
let currentDataset = null;
let bitcoinPriceTraceIndex = -1;
let snapshotRefreshInProgress = false;
let snapshotRefreshTimer = 0;
let allYearMarks = [];

function initialVisibility(name) {
  return INITIAL_VISIBLE.has(name) ? true : "legendonly";
}

function compactPrice(value) {
  if (value === 0) return "$0";
  if (value < 1_000) return `$${Math.round(value).toLocaleString("hr-HR")}`;
  if (value < 1_000_000) return `$${decimalOne(value / 1_000)}k`;
  if (value < 1_000_000_000) return `$${decimalOne(value / 1_000_000)}M`;
  if (value < 1_000_000_000_000) return `$${decimalOne(value / 1_000_000_000)}B`;
  return `$${decimalOne(value / 1_000_000_000_000)}T`;
}

function liveObservationFromSnapshot(value) {
  const height = value?.chain?.value?.height;
  const priceUsd = value?.price?.value?.usd;
  if (
    !Number.isInteger(height)
    || height < 0
    || !Number.isFinite(priceUsd)
    || priceUsd <= 0
  ) {
    throw new Error("Bitcoin snimka nema valjanu cijenu i visinu bloka.");
  }

  const h = height / PARAMETERS.blocksPerH;
  return [h, priceUsd, priceToRoot(priceUsd)];
}

function datasetWithLiveObservation(dataset, observation) {
  const lastHistorical = dataset.observations.at(-1);
  if (!lastHistorical || observation[0] <= lastHistorical[0]) return dataset;

  return {
    ...dataset,
    observations: [...dataset.observations, observation],
  };
}

async function fetchLiveObservation() {
  const response = await fetch(SNAPSHOT_PATH, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Bitcoin snimka: HTTP ${response.status}`);
  return liveObservationFromSnapshot(await response.json());
}

function bitcoinPriceTraceData(dataset) {
  return {
    x: dataset.observations.map(([h]) => h),
    y: dataset.observations.map(([, , rootValue]) => rootValue),
    customdata: dataset.observations.map(([, priceUsd]) => priceUsd),
  };
}

function decimalOne(value) {
  return value.toFixed(1).replace(".", ",");
}

function rootTickText(root) {
  return `${decimalOne(root)} (${compactPrice(root ** PARAMETERS.rootExponent)})`;
}

function buildTraces(dataset, model) {
  const dateForH = createDateMapper(dataset);
  const modelDates = model.h.map(dateForH);
  const guideH = [...model.h, PARAMETERS.finalHalving];
  const guideDates = [...modelDates, dateForH(PARAMETERS.finalHalving)];
  const traces = [{
    type: "scatter",
    mode: "lines",
    name: "",
    x: guideH,
    y: guideH.map(() => 0),
    line: { color: "rgba(0,0,0,0)", width: 0 },
    customdata: guideDates,
    hovertemplate: "<b>Datum: %{customdata}</b><br><b>h: %{x:.3f}</b><extra></extra>",
    showlegend: false,
  }];

  model.powerLaw.forEach((series, index) => {
    traces.push({
      type: "scatter",
      mode: "lines",
      name: series.name,
      x: model.h,
      y: series.rootPrice,
      customdata: series.priceUsd,
      line: { color: COLORS[series.name], width: LINE_WIDTHS[series.name] },
      visible: initialVisibility(series.name),
      hovertemplate: `<b>${series.name}: $%{customdata:,.2f}</b><extra></extra>`,
    });

    const lower = model.powerLaw[index + 1];
    if (!lower) return;
    const fillName = `${LABELS.fill} ${series.name}`;
    traces.push({
      type: "scatter",
      mode: "lines",
      name: fillName,
      x: [...model.h, ...model.h.slice().reverse()],
      y: [...series.rootPrice, ...lower.rootPrice.slice().reverse()],
      line: { color: "rgba(0,0,0,0)", width: 0 },
      fill: "toself",
      fillcolor: FILL_COLORS[series.name],
      visible: initialVisibility(fillName),
      hoverinfo: "skip",
    });
  });

  for (const series of model.waves) {
    traces.push({
      type: "scatter",
      mode: "lines",
      name: series.name,
      x: model.h,
      y: series.rootPrice,
      customdata: series.priceUsd,
      line: { color: COLORS[series.name], width: LINE_WIDTHS[series.name] },
      visible: initialVisibility(series.name),
      hovertemplate: `<b>${series.name}: $%{customdata:,.2f}</b><extra></extra>`,
    });
  }

  traces.push({
    type: "scatter",
    mode: "lines",
    name: LABELS.btcPrice,
    ...bitcoinPriceTraceData(dataset),
    line: { color: COLORS.BTC, width: 2 },
    visible: initialVisibility(LABELS.btcPrice),
    hovertemplate: `<b>${LABELS.btcPrice}: $%{customdata:,.2f}</b><extra></extra>`,
  });

  return traces;
}

function chooseHalvingLabels(start, end, compact) {
  const span = Math.max(0.01, end - start);
  const maxLabels = compact ? 8 : 18;
  const step = Math.max(1, Math.ceil(span / maxLabels));
  const labels = [];
  for (let h = 1; h <= PARAMETERS.finalHalving; h += 1) {
    if (h < start || h > end) continue;
    if (h % step === 0 || h === 1 || h === PARAMETERS.finalHalving) labels.push(h);
  }
  return new Set(labels);
}

function makeGuides(visibleRange) {
  const compact = window.innerWidth < 820;
  const start = Math.min(...visibleRange);
  const end = Math.max(...visibleRange);
  const halvingLabels = chooseHalvingLabels(start, end, compact);
  const shapes = [];
  const annotations = [];

  for (let h = 1; h <= PARAMETERS.finalHalving; h += 1) {
    if (h < start || h > end) continue;
    shapes.push({
      type: "line",
      xref: "x",
      yref: "paper",
      x0: h,
      x1: h,
      y0: 0,
      y1: 1,
      layer: "below",
      line: { color: "rgba(16,32,51,0.38)", width: 1.5, dash: "dash" },
    });
    if (halvingLabels.has(h)) {
      annotations.push({
        x: h,
        xref: "x",
        y: 1,
        yref: "paper",
        text: `H${h}`,
        showarrow: false,
        xanchor: "right",
        yanchor: "bottom",
        yshift: 3,
        font: { color: "#5c7085", size: compact ? 9 : 11 },
      });
    }
  }

  const maxYearLabels = compact ? 6 : Math.max(12, Math.min(24, Math.floor(window.innerWidth / 52)));
  const years = selectVisibleYears(allYearMarks, visibleRange, maxYearLabels);
  for (const [year, h] of years) {
    shapes.push({
      type: "line",
      xref: "x",
      yref: "paper",
      x0: h,
      x1: h,
      y0: 0,
      y1: 1,
      layer: "below",
      line: { color: "rgba(44,65,86,0.17)", width: 1, dash: "dot" },
    });
    annotations.push({
      x: h,
      xref: "x",
      y: 0,
      yref: "paper",
      text: String(year),
      showarrow: false,
      xanchor: "center",
      yanchor: "top",
      yshift: compact ? -22 : -18,
      font: { color: "#5c7085", size: compact ? 9 : 10 },
    });
  }

  return { shapes, annotations };
}

function guideSignature(guides) {
  return JSON.stringify({
    compact: window.innerWidth < 820,
    shapes: guides.shapes.map((shape) => [shape.x0, shape.x1, shape.line?.dash]),
    annotations: guides.annotations.map((annotation) => [annotation.x, annotation.text]),
  });
}

function responsiveLayoutParts() {
  const compact = window.innerWidth < 820;
  return compact
    ? {
        margin: { l: 110, r: 16, t: 92, b: 184 },
        legend: {
          orientation: "h",
          xref: "container",
          yref: "container",
          x: 0.5,
          y: 0.02,
          xanchor: "center",
          yanchor: "bottom",
          maxwidth: 0.9,
          title: { text: LABELS.legend },
          font: { size: 10 },
          itemclick: "toggle",
          itemdoubleclick: "toggleothers",
          traceorder: "normal",
        },
      }
    : {
        margin: { l: 122, r: 164, t: 100, b: 56 },
        legend: {
          orientation: "v",
          x: 1.02,
          y: 1,
          xanchor: "left",
          yanchor: "top",
          title: { text: LABELS.legend },
          font: { size: 11 },
          itemclick: "toggle",
          itemdoubleclick: "toggleothers",
          traceorder: "normal",
        },
      };
}

function buildLayout() {
  const tickValues = Array.from({ length: 25 }, (_, value) => value);
  const guides = makeGuides(FULL_RANGE);
  lastGuideSignature = guideSignature(guides);
  const responsive = responsiveLayoutParts();

  return {
    autosize: true,
    paper_bgcolor: "#ffffff",
    plot_bgcolor: "#ffffff",
    font: {
      family: "Arial, Helvetica, sans-serif",
      color: "#1a1a1a",
      size: 12,
    },
    hovermode: "x unified",
    separators: ",.",
    hoverdistance: 3,
    spikedistance: -1,
    hoverlabel: {
      bgcolor: "#ffffff",
      bordercolor: "rgba(16,32,51,0.2)",
      font: { color: "#102033", size: 11 },
    },
    dragmode: "zoom",
    margin: responsive.margin,
    legend: responsive.legend,
    xaxis: {
      type: "linear",
      autorange: true,
      minallowed: 0,
      maxallowed: PARAMETERS.finalHalving,
      showgrid: true,
      gridwidth: 1,
      gridcolor: "rgba(0,0,0,0.12)",
      showspikes: true,
      spikecolor: "#5c7085",
      spikedash: "dot",
      spikemode: "across",
      spikesnap: "hovered data",
      spikethickness: 1,
      zeroline: true,
      zerolinewidth: 2,
      zerolinecolor: "rgba(0,0,0,0.30)",
      automargin: false,
      fixedrange: false,
    },
    yaxis: {
      title: { text: "Cijena ^ (1/5,4)", standoff: 22 },
      type: "linear",
      autorange: true,
      minallowed: 0,
      rangemode: "nonnegative",
      automargin: false,
      tickmode: "array",
      tickvals: tickValues,
      ticktext: tickValues.map(rootTickText),
      showgrid: true,
      gridwidth: 1,
      gridcolor: "rgba(0,0,0,0.12)",
      zeroline: true,
      zerolinewidth: 1,
      zerolinecolor: "rgba(0,0,0,0.18)",
      fixedrange: false,
    },
    shapes: guides.shapes,
    annotations: guides.annotations,
    uirevision: "bitcoin-root-scale-h12-full-autorange",
  };
}

function visibleRange() {
  const range = plot?._fullLayout?.xaxis?.range;
  if (!range || range.length < 2) return [...FULL_RANGE];
  const start = Number(range[0]);
  const end = Number(range[1]);
  return Number.isFinite(start) && Number.isFinite(end)
    ? [Math.min(start, end), Math.max(start, end)]
    : [...FULL_RANGE];
}

function eventChangesXRange(eventData) {
  const keys = Object.keys(eventData);
  return keys.length === 0 || keys.some((key) =>
    key === "xaxis.range"
    || key.startsWith("xaxis.range[")
    || key === "xaxis.autorange"
  );
}

function scheduleGuideUpdate(eventData = {}) {
  const keys = Object.keys(eventData);
  if (keys.some((key) => key.startsWith("shapes") || key.startsWith("annotations"))) return;
  if (!eventChangesXRange(eventData)) return;
  window.clearTimeout(guideUpdateTimer);
  const wheelQuietIn = Math.max(0, lastWheelAt + WHEEL_IDLE_MS - performance.now());
  guideUpdateTimer = window.setTimeout(flushGuideUpdate, Math.max(GUIDE_IDLE_MS, wheelQuietIn));
}

async function flushGuideUpdate() {
  const wheelQuietIn = lastWheelAt + WHEEL_IDLE_MS - performance.now();
  if (wheelQuietIn > 0) {
    window.clearTimeout(guideUpdateTimer);
    guideUpdateTimer = window.setTimeout(flushGuideUpdate, wheelQuietIn);
    return;
  }
  if (guideUpdateInProgress) {
    guideUpdatePending = true;
    return;
  }

  const guides = makeGuides(visibleRange());
  const signature = guideSignature(guides);
  if (signature === lastGuideSignature) return;

  guideUpdateInProgress = true;
  try {
    await Plotly.relayout(plot, {
      shapes: guides.shapes,
      annotations: guides.annotations,
    });
    lastGuideSignature = signature;
  } finally {
    guideUpdateInProgress = false;
    if (guideUpdatePending) {
      guideUpdatePending = false;
      scheduleGuideUpdate();
    }
  }
}

function handleWheelZoom() {
  lastWheelAt = performance.now();
  window.clearTimeout(guideUpdateTimer);
  scheduleGuideUpdate();
}

function showError(error) {
  console.error("Graf se nije mogao učitati.", error);
  status.classList.add("chart-status--error");
  status.innerHTML = `
    <strong>Graf se nije mogao učitati.</strong>
    <span>Provjerite vezu i pokušajte ponovno.</span>
    <button type="button" id="retry-chart">Pokušaj ponovno</button>
  `;
  document.querySelector("#retry-chart")?.addEventListener("click", () => window.location.reload());
}

function localizeModebar() {
  for (const button of plot.querySelectorAll(".modebar-btn")) {
    const source = button.getAttribute("data-title") || button.getAttribute("aria-label");
    const translated = MODEBAR_LABELS[source];
    if (!translated) continue;
    button.setAttribute("data-title", translated);
    button.setAttribute("aria-label", translated);
  }
}

async function refreshLiveObservation() {
  if (
    !historicalDataset
    || bitcoinPriceTraceIndex < 0
    || snapshotRefreshInProgress
  ) {
    return;
  }

  snapshotRefreshInProgress = true;
  try {
    const observation = await fetchLiveObservation();
    const nextDataset = datasetWithLiveObservation(
      historicalDataset,
      observation,
    );
    if (nextDataset === historicalDataset) return;

    currentDataset = nextDataset;
    const trace = bitcoinPriceTraceData(currentDataset);
    await Plotly.restyle(
      plot,
      {
        x: [trace.x],
        y: [trace.y],
        customdata: [trace.customdata],
      },
      [bitcoinPriceTraceIndex],
    );
  } catch (error) {
    console.warn("Aktualna Bitcoin točka nije osvježena.", error);
  } finally {
    snapshotRefreshInProgress = false;
  }
}

function startSnapshotRefresh() {
  snapshotRefreshTimer = window.setInterval(() => {
    if (document.visibilityState === "visible") {
      void refreshLiveObservation();
    }
  }, SNAPSHOT_REFRESH_INTERVAL_MS);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      void refreshLiveObservation();
    }
  });

  window.addEventListener("pagehide", () => {
    window.clearInterval(snapshotRefreshTimer);
  }, { once: true });
}

async function initializeChart() {
  if (!Plotly || !plot || !status) throw new Error("Plotly nije dostupan.");
  Plotly.register({
    moduleType: "locale",
    name: "hr",
    dictionary: PLOTLY_DICTIONARY,
    format: {
      decimal: ",",
      thousands: ".",
      grouping: [3],
      currency: ["$", ""],
    },
  });
  const response = await fetch(DATASET_PATH, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Podaci: HTTP ${response.status}`);
  historicalDataset = validateDataset(await response.json());
  currentDataset = historicalDataset;
  try {
    currentDataset = datasetWithLiveObservation(
      historicalDataset,
      await fetchLiveObservation(),
    );
  } catch (error) {
    console.warn("Aktualna Bitcoin točka nije učitana.", error);
  }

  allYearMarks = extendedYearMarks(historicalDataset);
  const model = createModelSeries();
  const traces = buildTraces(currentDataset, model);
  bitcoinPriceTraceIndex = traces.findIndex(
    (trace) => trace.name === LABELS.btcPrice,
  );

  await Plotly.newPlot(plot, traces, buildLayout(), {
    responsive: true,
    displaylogo: false,
    displayModeBar: true,
    scrollZoom: true,
    locale: "hr",
    showTips: false,
    doubleClick: "reset+autosize",
    modeBarButtonsToRemove: [
      "select2d",
      "lasso2d",
      "toggleSpikelines",
      "hoverClosestCartesian",
      "hoverCompareCartesian",
    ],
    toImageButtonOptions: {
      format: "png",
      filename: "bitcoin-ciklusi-korijenske-skale",
      height: 1_000,
      width: 1_800,
      scale: 2,
    },
  });

  status.hidden = true;
  localizeModebar();
  plot.addEventListener("wheel", handleWheelZoom, { capture: true, passive: true });
  plot.on("plotly_afterplot", localizeModebar);
  plot.on("plotly_relayout", scheduleGuideUpdate);
  startSnapshotRefresh();
  let lastCompact = window.innerWidth < 820;
  window.addEventListener("resize", () => {
    const compact = window.innerWidth < 820;
    if (compact === lastCompact) return;
    lastCompact = compact;
    const responsive = responsiveLayoutParts();
    void Plotly.relayout(plot, {
      margin: responsive.margin,
      legend: responsive.legend,
    }).then(() => scheduleGuideUpdate());
  }, { passive: true });
}

initializeChart().catch(showError);
