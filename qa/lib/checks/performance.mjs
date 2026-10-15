// Speed test with Google Lighthouse, simulating a mid-range phone on a 4G connection,
// the same way Google's PageSpeed Insights measures it.
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "playwright";

export async function runPerformance(pages, { base, budget, local = false }) {
  const found = [];
  const scores = [];
  const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"] });
  try {
    for (const p of pages) {
      const url = new URL(p, base).href;
      let lhr;
      try {
        ({ lhr } = await lighthouse(url, { port: chrome.port, output: "json", logLevel: "error", onlyCategories: ["performance"], formFactor: "mobile" }));
      } catch (e) { scores.push({ page: p, error: e.message }); continue; }
      const a = lhr.audits;
      const score = Math.round((lhr.categories.performance.score ?? 0) * 100);
      const lcp = a["largest-contentful-paint"]?.numericValue ?? 0;
      const cls = a["cumulative-layout-shift"]?.numericValue ?? 0;
      const tbt = a["total-blocking-time"]?.numericValue ?? 0;
      const fcp = a["first-contentful-paint"]?.numericValue ?? 0;
      const weight = a["total-byte-weight"]?.numericValue ?? 0;
      // The biggest savings Lighthouse suggests, in plain words.
      const saving = (x) => x.details?.overallSavingsMs ?? Math.max(x.metricSavings?.LCP ?? 0, x.metricSavings?.FCP ?? 0);
      const tips = Object.values(a)
        .filter((x) => x.score !== null && x.score < 1 && saving(x) >= 300)
        .filter((x) => !(local && /cache/i.test(x.id)))   // the local test server doesn't send the host's cache settings
        .sort((x, y) => saving(y) - saving(x))
        .slice(0, 3)
        .map((x) => `${x.title} (about ${(saving(x) / 1000).toFixed(1)}s faster)`);
      // The heaviest images that could be smaller, for the fix guidance and the image fixer.
      const imgAudits = ["image-delivery-insight", "uses-optimized-images", "modern-image-formats", "uses-responsive-images", "offscreen-images"];
      const images = new Map();
      for (const id of imgAudits) for (const it of a[id]?.details?.items ?? []) {
        if (it.url && (it.wastedBytes ?? 0) > 50_000) images.set(it.url, Math.max(images.get(it.url) ?? 0, it.wastedBytes));
      }
      const lcpEl = a["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node?.snippet ?? a["lcp-breakdown-insight"]?.details?.items?.find?.((x) => x.node)?.node?.snippet;
      // Addresses on the tested site are kept as paths (/img/a.jpg), so they mean the same file live or locally.
      const own = (u) => { try { const x = new URL(u); return x.origin === new URL(base).origin ? x.pathname + x.search : u; } catch { return u; } };
      const heavy = [...images].sort((x, y) => y[1] - x[1]).slice(0, 8).map(([url, wasted]) => ({ url: own(url), savingKb: Math.round(wasted / 1024) }));
      scores.push({ page: p, score, lcp, cls, tbt, fcp, weight, tips, heavy, lcpEl });
      const where = { page: p, device: "Mid-range phone, 4G", browser: "chromium", extra: { heavy, lcpEl } };
      const tipText = tips.length ? ` Biggest wins: ${tips.join("; ")}.` : "";
      if (score < budget.score) found.push({ rule: "perf-score", detail: `Score ${score}/100 (target ${budget.score}+).${tipText}`, severity: score < 50 ? "Medium" : "Low", ...where });
      if (lcp > budget.lcpMs) found.push({ rule: "perf-lcp", detail: `${(lcp / 1000).toFixed(1)}s (target under ${(budget.lcpMs / 1000).toFixed(1)}s)`, severity: lcp > 4000 ? "Medium" : "Low", ...where });
      if (cls > budget.cls) found.push({ rule: "perf-cls", detail: `${cls.toFixed(2)} (target under ${budget.cls})`, severity: cls > 0.25 ? "Medium" : "Low", ...where });
      if (tbt > budget.tbtMs) found.push({ rule: "perf-tbt", detail: `${Math.round(tbt)}ms (target under ${budget.tbtMs}ms)`, ...where });
    }
  } finally { await chrome.kill(); }
  return { found, scores };
}
