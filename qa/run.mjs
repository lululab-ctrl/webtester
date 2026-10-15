#!/usr/bin/env node
// ============================================================================
// Site QA: tests a website the way a QA team would, and explains every
// problem in plain English.
//
//   node qa/run.mjs --site example.com                 test the live website
//   node qa/run.mjs --site example.com --root ../code  test the site's code (built and served
//                                                      locally, at the live address)
//   --quick            Chrome only, three screen sizes, no speed test
//   --pages /a/,/b/    only these pages (no crawling): for re-testing a fix
//   --compare <file>   mark what's new and what's resolved compared with an earlier results.json
//   --fixes <file>     include the fix log (qa/fix.mjs and Claude) in the report
//   --with-perf        run the speed test even with --quick
//   --update-known     accept today's serious issues as known for this site
//   --out <dir>        where the report goes (default: reports/<domain>/latest)
//
// Settings: sites/<domain>.json (anything missing comes from qa/defaults.json).
// Output: report.html, results.json, summary.md, details.md, screenshots/.
// Exit code 1 = a serious issue that isn't on the site's known list.
// ============================================================================
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { chromium, firefox, webkit } from "playwright";
import { startServer } from "./lib/server.mjs";
import { newContext, visit } from "./lib/checks/pages.mjs";
import { checkLinks } from "./lib/checks/links.mjs";
import { runFlows } from "./lib/checks/flows.mjs";
import { seoChecks } from "./lib/checks/seo.mjs";
import { scanSecrets, scanTexts, domSecurityChecks, headerChecks, dependencyAudit } from "./lib/checks/security.mjs";
import { RULES, SEVERITIES } from "./lib/rules.mjs";
import { writeReport } from "./lib/report.mjs";
import { loadSite } from "./lib/config.mjs";
import { attachGuidance } from "./lib/guidance.mjs";

const QA = path.dirname(fileURLToPath(import.meta.url));
const HUB = path.resolve(QA, "..");
const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };

const siteArg = opt("--site") ?? opt("--config");
if (!siteArg) { console.error("Say which website: node qa/run.mjs --site example.com"); process.exit(2); }
const config = loadSite(HUB, siteArg);
const ROOT = opt("--root") ? path.resolve(opt("--root")) : null;   // the site's code, when testing it before publishing
const onlyPages = opt("--pages")?.split(",").map((p) => p.trim()).filter(Boolean);
if (onlyPages) { config.pages = onlyPages; config.crawl = { ...config.crawl, enabled: false }; config.performancePages = config.performancePages.filter((p) => onlyPages.includes(p)); }
const OUT = path.resolve(opt("--out") ?? path.join(HUB, "reports", config.domain, "latest"));
const SHOTS = path.join(OUT, "screenshots");
const offline = process.env.QA_OFFLINE === "1";
const quick = flag("--quick");
const started = Date.now();
const log = (...m) => console.log(`[${((Date.now() - started) / 1000).toFixed(0).padStart(4)}s]`, ...m);
const notes = [];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(SHOTS, { recursive: true });

// ── 1. Get the site to test ───────────────────────────────────────────────
// Live mode: the real website. Code mode (--root): build the code and serve it locally,
// while browsers still use the live address (requests to it are answered from the local copy).
let base = config.liveUrl;
let server;
let siteDir = null;
if (ROOT) {
  if (config.build) { log("Building the site…"); execSync(config.build, { cwd: ROOT, stdio: "inherit", shell: "/bin/bash" }); }
  siteDir = path.join(ROOT, config.serveDir ?? ".");
  server = await startServer(siteDir);
  base = server.url;
  log(`Testing the code in ${ROOT} (served from ${config.serveDir ?? "."}) as ${config.liveUrl}`);
} else {
  log(`Testing the live website ${config.liveUrl}`);
}
base = base.replace(/\/$/, "");
const localDir = server ? siteDir : null;   // browsers get the copy's files straight from disk
const pageBase = new URL(config.liveUrl).origin;
if (config.isNew) notes.push(`This site has no settings file yet, so the standard checks were used. Add it with the "Add or edit a website" form to list its key pages and visitor journeys.`);
if (offline) notes.push("Run without internet access: outside services weren't reached, so problems involving them can't show up in this run.");

// ── 2. Browsers ───────────────────────────────────────────────────────────
const wanted = quick ? ["chromium"] : (config.browsers ?? ["chromium"]);
const engines = { chromium, firefox, webkit };
const label = { chromium: "Chrome / Edge", firefox: "Firefox", webkit: "Safari (iPhone, Mac)" };
const browsers = {};
for (const name of wanted) {
  try { browsers[name] = await engines[name].launch(); }
  catch { notes.push(`${label[name]} isn't installed on this machine, so it was skipped. The GitHub run includes it.`); }
}
if (!browsers.chromium) throw new Error("Chromium is required: run `npx playwright install chromium`.");

const langs = config.languages?.length ? config.languages : [{ code: "en", label: "English" }];
const devices = quick ? [config.devices.find((d) => d.mobile && d.width < 500), config.devices.find((d) => d.width >= 700 && d.width < 1100), config.devices.find((d) => !d.mobile && d.width >= 1200)].filter(Boolean) : config.devices;
const desktop = devices.find((d) => !d.mobile) ?? devices.at(-1);
const phones = devices.filter((d) => d.mobile && d.width < 500);
const phone = phones.find((d) => d.width >= 380) ?? phones[0] ?? devices[0];
const tablet = devices.find((d) => d.width >= 700 && d.width < 1100);

const findings = [];
const linkMap = new Map(); // link → pages it appears on
const pagesDom = [];
const visited = [];
const missing = new Set();   // pages that answered 404 etc.
const siteTexts = new Map(); // the site's own HTML and scripts as the browser received them (for the secret scan)
const isPageLink = (u) => !/\.(pdf|zip|jpe?g|png|webp|gif|svg|mp4|cube|xmp|dng)$/i.test(u.pathname) && !(config.crawl?.exclude ?? []).some((x) => u.pathname.startsWith(x));

async function pool(items, size, fn) {
  const q = [...items];
  await Promise.all(Array.from({ length: size }, async () => { while (q.length) await fn(q.shift()); }));
}

async function pass(browserName, devs, { deep = false, shotsOn = [] } = {}, pages) {
  const b = browsers[browserName];
  const jobs = pages.flatMap((p) => langs.filter((l) => !(l.skipPages ?? []).some((x) => p.startsWith(x)))
    .flatMap((lang) => devs.map((device) => ({ p, lang, device }))));
  await pool(jobs, 4, async ({ p, lang, device }) => {
    const ctx = await newContext(b, { device, lang, base: pageBase, offline, localDir });
    const r = await visit(ctx, {
      url: pageBase + p, base: pageBase, device, lang, browserName, deep, contentRules: (config.contentRules ?? []).filter((c) => !(offline && c.needsNetwork)),
      shotDir: shotsOn.includes(device.name) ? SHOTS : null,
    });
    await ctx.close();
    // A page that doesn't exist isn't checked further: the link check reports links to it,
    // and a listed key page that's missing is reported here.
    if (r.status >= 400) {
      missing.add(p);
      if ((config.pages ?? []).includes(p) && deep && lang === langs[0]) findings.push({ rule: "broken-link", detail: `${p} answered ${r.status}: a key page in this site's settings doesn't exist`, page: p, severity: "High" });
      return;
    }
    findings.push(...r.found);
    for (const [u, t] of r.texts ?? []) siteTexts.set(u, t);
    if (deep) {
      // A page that sends this language elsewhere (e.g. to its Hebrew version) is judged at its destination.
      const redirectedTo = r.finalPath && r.finalPath.split("?")[0] !== p.split("?")[0] ? r.finalPath : null;
      if (!redirectedTo) pagesDom.push({ page: p, lang: lang.label, dom: r.dom });
      visited.push({ page: p, lang: lang.label, status: r.status, shot: r.shot, redirectedTo });
      for (const l of r.links) {
        const set = linkMap.get(l) ?? new Set(); set.add(p); linkMap.set(l, set);
      }
    }
  });
}

// ── 3. Every page: deep check on desktop Chrome (and find more pages) ────
let pages = [...new Set(config.pages ?? ["/"])];
log(`Checking ${pages.length} pages × ${langs.length} languages in depth…`);
await pass("chromium", [desktop], { deep: true, shotsOn: [desktop.name] }, pages);
if (config.crawl?.enabled) {
  const more = [];
  for (const l of linkMap.keys()) {
    const u = new URL(l);
    if (u.origin !== pageBase) continue;
    const p = u.pathname.replace(/\/index\.html$/, "/") + u.search;
    if (isPageLink(u) && !pages.includes(p) && !more.includes(p)) more.push(p);
  }
  const extra = more.slice(0, Math.max(0, (config.crawl.maxPages ?? 40) - pages.length));
  if (extra.length) {
    log(`Found ${extra.length} more pages through links: ${extra.join(", ")}`);
    await pass("chromium", [desktop], { deep: true, shotsOn: [desktop.name] }, extra);
    pages = [...pages, ...extra];
  }
}
pages = pages.filter((p) => !missing.has(p));

// ── 4. Every page on every screen size, then other browsers ──────────────
log(`Checking ${pages.length} pages on ${devices.length - 1} more screen sizes…`);
await pass("chromium", devices.filter((d) => d !== desktop), { shotsOn: [phone.name, tablet?.name].filter(Boolean) }, pages);
for (const name of ["firefox", "webkit"]) {
  if (!browsers[name]) continue;
  log(`Checking ${pages.length} pages in ${label[name]}…`);
  await pass(name, [phone, desktop], { shotsOn: name === "webkit" ? [phone.name] : [] }, pages);
}

// ── 5. Visitor journeys ───────────────────────────────────────────────────
const flowsPassed = [];
for (const [name, b] of Object.entries(browsers)) {
  log(`Running ${config.flows?.length ?? 0} visitor journeys in ${label[name]}…`);
  const r = await runFlows(b, name, { config, base: pageBase, offline, localDir, shotDir: SHOTS });
  findings.push(...r.found);
  flowsPassed.push(...r.passed);
}
for (const b of Object.values(browsers)) await b.close();

// ── 6. Links, search engines, security ───────────────────────────────────
log(`Checking ${linkMap.size} links…`);
const linkRes = await checkLinks(linkMap, { base, offline, liveUrl: config.liveUrl });
findings.push(...linkRes.found);

let robotsTxt = null;
try { const r = await fetch(base + "/robots.txt"); if (r.ok) robotsTxt = await r.text(); } catch {}
findings.push(...seoChecks(pagesDom, { robotsTxt, config }));

log("Security checks…");
findings.push(...domSecurityChecks(pagesDom, pageBase));
if (siteDir && fs.existsSync(siteDir)) findings.push(...scanSecrets(siteDir));
findings.push(...scanTexts(siteTexts, pageBase));
if (ROOT) findings.push(...dependencyAudit(ROOT));
let headers = { checked: [] };
if (config.liveUrl && !offline) {
  headers = await headerChecks(config.liveUrl, pages);
  findings.push(...headers.found);
} else notes.push("Security headers are a property of the live host, so they're checked against the live site in the GitHub run.");

// Issues found by a person or by Claude reading the code. Pass the file with --review <file>.
// Keep it OUT of a public repository: it describes weaknesses before they're fixed.
const reviewFile = opt("--review") ?? process.env.QA_REVIEW_FILE ?? config.file.replace(/\.json$/, ".review.json");
const review = fs.existsSync(reviewFile) ? JSON.parse(fs.readFileSync(reviewFile, "utf8")) : [];
for (const r of review.filter((x) => x.status !== "fixed")) {
  findings.push({ rule: "code-review", severity: r.severity, page: r.where, detail: r.detail, custom: { title: r.title, why: r.why, fix: r.fix }, id: r.id });
}

// ── 7. Speed ──────────────────────────────────────────────────────────────
let perf = { scores: [] };
if ((!quick || flag("--with-perf")) && !flag("--skip-perf")) {
  log(`Speed test on ${config.performancePages?.length ?? 0} pages…`);
  const { runPerformance } = await import("./lib/checks/performance.mjs");
  perf = await runPerformance(config.performancePages ?? ["/"], { base, budget: config.performanceBudget ?? { score: 70, lcpMs: 2500, cls: 0.1, tbtMs: 300 }, local: !!server });
  findings.push(...perf.found);
  if (server) notes.push("Speed was measured on a local copy of the site. Real visitors also wait for the host, so live numbers are usually somewhat slower.");
}
if (server) await server.close();

// ── 8. Group, compare with known issues, decide ──────────────────────────
const groups = new Map();
for (const f of findings) {
  const rule = RULES[f.rule];
  // Reviewed exceptions from qa.config.json ("downgrade"): a known, explained cause at a lower level.
  const dg = (config.downgrade ?? []).find((d) => (!d.rule || d.rule === f.rule) && f.detail.includes(d.match)
    && (!d.browser || d.browser === f.browser));
  const severity = dg ? dg.to : (f.severity ?? rule.severity);
  if (dg) f.note = dg.reason;
  // What makes two findings "the same issue" (and gives it a stable id for the known-issues list).
  const sameness = f.axeId ? `axe:${f.axeId}` : f.id ? `review:${f.id}`
    : f.rule === "flow-failed" ? `flow:${f.page}|${f.detail.split(" failed:")[0]}`
    : f.kind ? `kind:${f.kind}`
    : f.rule.startsWith("perf-") ? "perf"
    : f.detail.replace(/\d+px too wide/, "").replace(/\(\d+ places?:.*$/, "");
  // The level isn't part of an issue's identity: a page that gets faster stays "the same issue", just less serious.
  const key = `${f.rule}|${sameness}`;
  const g = groups.get(key) ?? { key, rule: f.rule, severity, category: rule.category, title: f.custom?.title ?? f.ruleTitle ?? rule.title,
    ruleTitle: rule.title, why: f.custom?.why ?? rule.why, fix: f.custom?.fix ?? rule.fix, learnMore: f.learnMore, note: f.note,
    details: new Set(), pages: new Set(), devices: new Set(), browsers: new Set(), langs: new Set(), shots: new Set(), snippets: new Set(), axeId: f.axeId, fixHint: f.fixHint, heavy: new Map() };
  if (SEVERITIES.indexOf(severity) < SEVERITIES.indexOf(g.severity)) g.severity = severity;   // the worst one counts
  g.details.add(f.detail);
  if (f.page) g.pages.add(f.page);
  for (const p of f.alsoOn ?? []) g.pages.add(p);
  if (f.device) g.devices.add(f.device);
  if (f.browser) g.browsers.add(label[f.browser] ?? f.browser);
  if (f.lang) g.langs.add(f.lang);
  if (f.shot) g.shots.add(f.shot);
  if (f.snippet) g.snippets.add(f.snippet);
  for (const h of f.extra?.heavy ?? []) g.heavy.set(h.url, Math.max(g.heavy.get(h.url) ?? 0, h.savingKb));
  groups.set(key, g);
}
const issues = [...groups.values()].map((g) => ({
  ...g, id: crypto.createHash("sha1").update(g.key).digest("hex").slice(0, 10),
  details: [...g.details].slice(0, 8), moreDetails: Math.max(0, g.details.size - 8),
  pages: [...g.pages], devices: [...g.devices], browsers: [...g.browsers], langs: [...g.langs], shots: [...g.shots].slice(0, 4), snippets: [...g.snippets].slice(0, 3),
  heavy: [...g.heavy].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([url, savingKb]) => ({ url, savingKb })),
})).sort((a, b) => SEVERITIES.indexOf(a.severity) - SEVERITIES.indexOf(b.severity) || a.category.localeCompare(b.category));

const blockOn = config.gate?.blockOn ?? ["Critical", "High"];
if (flag("--update-known")) {
  const known = issues.filter((i) => blockOn.includes(i.severity)).map((i) => ({ id: i.id, severity: i.severity, title: i.title, what: i.details[0]?.slice(0, 160), where: i.pages.slice(0, 4).join(", ") }));
  fs.mkdirSync(path.dirname(config.knownFile), { recursive: true });
  fs.writeFileSync(config.knownFile, JSON.stringify({ $comment: "Serious issues accepted as known for this site: still reported, but they don't fail a run. Remove an entry once it's fixed.", updated: new Date().toISOString(), known }, null, 2) + "\n");
  log(`Saved ${known.length} serious issues as known in ${path.relative(HUB, config.knownFile)}`);
}
const known = new Set(fs.existsSync(config.knownFile) ? JSON.parse(fs.readFileSync(config.knownFile, "utf8")).known.map((k) => k.id) : []);
for (const i of issues) {
  i.known = known.has(i.id);
  i.blocking = blockOn.includes(i.severity) && !i.known;
}
// Compared with an earlier run (e.g. before fixes): what's new, what's gone.
let comparison = null;
if (opt("--compare") && fs.existsSync(opt("--compare"))) {
  const before = JSON.parse(fs.readFileSync(opt("--compare"), "utf8"));
  const beforeIds = new Set(before.issues.map((i) => i.id));
  const nowIds = new Set(issues.map((i) => i.id));
  const beforeById = new Map(before.issues.map((i) => [i.id, i]));
  for (const i of issues) {
    i.status = beforeIds.has(i.id) ? "still" : "new";
    const was = beforeById.get(i.id)?.severity;
    if (was && was !== i.severity) i.severityBefore = was;
  }
  comparison = {
    resolved: before.issues.filter((i) => !nowIds.has(i.id)).map((i) => ({ id: i.id, severity: i.severity, title: i.title, pages: i.pages, details: i.details.slice(0, 2) })),
    added: issues.filter((i) => i.status === "new").map((i) => ({ id: i.id, severity: i.severity, title: i.title, pages: i.pages, details: i.details.slice(0, 2) })),
    changedLevel: issues.filter((i) => i.severityBefore).map((i) => ({ id: i.id, title: i.title, from: i.severityBefore, to: i.severity, pages: i.pages })),
  };
}
attachGuidance(issues, config, { headers: headers.checked, root: ROOT });
const blocking = issues.filter((i) => i.blocking);

const result = {
  site: config.name, domain: config.domain, tested: ROOT ? "code" : "live", liveUrl: config.liveUrl, when: new Date().toISOString(),
  commit: ROOT ? (() => { try { return execSync("git rev-parse --short HEAD", { cwd: ROOT }).toString().trim(); } catch { return null; } })() : null,
  durationS: Math.round((Date.now() - started) / 1000), mode: quick ? "quick" : "full",
  coverage: {
    pages: pages.length, languages: langs.map((l) => l.label), devices: devices.map((d) => `${d.name} (${d.width}×${d.height})`),
    browsers: Object.keys(browsers).map((b) => label[b]), links: linkRes.checked, flows: config.flows?.length ?? 0,
  },
  verdict: blocking.length ? "blocked" : "pass", blockOn,
  counts: Object.fromEntries(SEVERITIES.map((s) => [s, issues.filter((i) => i.severity === s).length])),
  issues, flowsPassed, visited, perf: perf.scores, headers: headers.checked, notes, comparison,
  fixes: opt("--fixes") && fs.existsSync(opt("--fixes")) ? JSON.parse(fs.readFileSync(opt("--fixes"), "utf8")) : null,
};
fs.writeFileSync(path.join(OUT, "results.json"), JSON.stringify(result, null, 2));
writeReport(result, OUT);
log(`Done: ${issues.length} issues (${SEVERITIES.map((s) => `${result.counts[s]} ${s}`).join(", ")}). ${blocking.length ? `${blocking.length} serious issue(s) not on the known list.` : "No serious issues outside the known list."}`);
log(`Report: ${path.join(OUT, "report.html")}`);
process.exit(blocking.length ? 1 : 0);
