#!/usr/bin/env node
// ============================================================================
// Built-in fixes: mechanical repairs the tool can make safely by itself.
// For each one: test the affected pages, apply the fix, test again, and keep it
// only if the problem is gone and nothing new appeared. Otherwise undo it.
//
//   node qa/fix.mjs --site example.com --root ../site-code --results before/results.json --log fixes.json
//
// Everything else is left for Claude (see .github/workflows/test-website.yml) or for a person.
// ============================================================================
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync, execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { loadSite } from "./lib/config.mjs";

const QA = path.dirname(fileURLToPath(import.meta.url));
const HUB = path.resolve(QA, "..");
const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const site = loadSite(HUB, opt("--site"));
const ROOT = path.resolve(opt("--root"));
const before = JSON.parse(fs.readFileSync(opt("--results"), "utf8"));
const LOG = path.resolve(opt("--log") ?? "fixes.json");
// Where the published files come from. Without a build step that's the served folder; with a build that
// copies files unchanged, "sourceDir" says where the originals are. Otherwise page fixes are left to Claude.
const SRC = site.sourceDir ?? (!site.build ? (site.serveDir ?? ".") : null);
const SERVE = SRC ? path.join(ROOT, SRC) : null;
const log = (...m) => console.log("[fix]", ...m);
const fixes = fs.existsSync(LOG) ? JSON.parse(fs.readFileSync(LOG, "utf8")) : [];
const save = () => fs.writeFileSync(LOG, JSON.stringify(fixes, null, 2));

// Files the site generates from other files must be fixed at their source, which needs judgement: leave them to Claude.
const generated = (site.generated ?? []).map((g) => new RegExp("^" + g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "§").replace(/\*/g, "[^/]*").replace(/§/g, ".*") + "$"));
const isGenerated = (rel) => generated.some((re) => re.test(rel));

function pageFile(page) {
  if (!SERVE) return null;
  const p = decodeURIComponent(page.split("?")[0]);
  for (const c of [p.endsWith("/") ? p + "index.html" : p, p + ".html", p + "/index.html"]) {
    const f = path.join(SERVE, c);
    if (f.startsWith(SERVE) && fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
  return null;
}
const rel = (f) => path.relative(ROOT, f).split(path.sep).join("/");

/** Test only these pages in Chrome, in the site's code. */
function retest(pages, { perf = false } = {}) {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "qa-retest-"));
  const a = [path.join(QA, "run.mjs"), "--site", site.domain, "--root", ROOT, "--pages", pages.join(","), "--out", out, "--quick"];
  if (perf) a.push("--with-perf");
  try { execFileSync("node", a, { stdio: ["ignore", "ignore", "inherit"], cwd: HUB }); } catch { /* exit 1 just means serious issues exist */ }
  return JSON.parse(fs.readFileSync(path.join(out, "results.json"), "utf8"));
}

const WORSE = ["Critical", "High", "Medium"];
async function attempt({ issue, pages, title, apply, perf = false, judge }) {
  pages = [...new Set(pages)].slice(0, 12);
  log(`${title}: testing ${pages.join(", ")} before the fix…`);
  const pre = retest(pages, { perf });
  const backups = new Map();
  const touch = (file) => { if (!backups.has(file)) backups.set(file, fs.readFileSync(file)); };
  const summary = await apply(touch);
  const files = [...backups.keys()];
  const entry = { by: "built-in", issueId: issue.id, rule: issue.rule, severity: issue.severity, title, files: files.map(rel), summary };
  if (!files.length) { fixes.push({ ...entry, status: "skipped", reason: summary || "Nothing to change in the source files." }); save(); return; }
  log(`${title}: testing again after changing ${files.length} file(s)…`);
  const post = retest(pages, { perf });
  const preIds = new Set(pre.issues.map((i) => i.id));
  const added = post.issues.filter((i) => !preIds.has(i.id) && WORSE.includes(i.severity));
  const verdict = judge ? judge(pre, post) : { ok: !post.issues.some((i) => i.id === issue.id), detail: "The issue no longer appears on these pages." };
  if (verdict.ok && !added.length) {
    fixes.push({ ...entry, status: verdict.status ?? "fixed", verified: verdict.detail });
    log(`${title}: kept (${verdict.detail})`);
  } else {
    for (const [file, data] of backups) fs.writeFileSync(file, data);
    const reason = !verdict.ok ? `The re-test still showed the problem (${verdict.detail}).` : `It caused new issues: ${added.map((i) => `${i.severity} "${i.title}" on ${i.pages.slice(0, 2).join(", ")}`).join("; ")}.`;
    fixes.push({ ...entry, status: "undone", reason });
    log(`${title}: undone. ${reason}`);
  }
  save();
}

// Adds a tag right after <head …> (or edits <html …>) in each page's own file.
function headFix(issue, title, tag, { skipIf, pages = issue.pages, attr } = {}) {
  const targets = [];
  const skipped = [];
  for (const p of pages) {
    const f = pageFile(p);
    if (!f) { skipped.push(`${p} (${SERVE ? "file not found" : "built by the site's build step: Claude fixes the source"})`); continue; }
    if (isGenerated(rel(f))) { skipped.push(`${p} (built from other files: Claude fixes the source)`); continue; }
    targets.push({ p, f });
  }
  return attempt({
    issue, title, pages: targets.map((t) => t.p),
    apply: (touch) => {
      for (const { p, f } of targets) {
        const html = fs.readFileSync(f, "utf8");
        if (skipIf?.test(html)) continue;
        let out;
        if (attr) out = html.replace(/<html(?![^>]*\blang=)([^>]*)>/i, `<html lang="${attr}"$1>`);
        else {
          // Right after <meta charset> if there is one (it should stay first), otherwise right after <head>.
          const t = typeof tag === "function" ? tag(p) : tag;
          out = /<meta[^>]+charset[^>]*>/i.test(html) ? html.replace(/(<meta[^>]+charset[^>]*>)/i, `$1\n${t}`) : html.replace(/(<head[^>]*>)/i, `$1\n${t}`);
        }
        if (out !== html) { touch(f); fs.writeFileSync(f, out); }
      }
      return `${title} on ${targets.length} page(s)${skipped.length ? `; not changed: ${skipped.join(", ")}` : ""}.`;
    },
  });
}

async function shrinkImages(issue) {
  let sharp;
  try { sharp = (await import("sharp")).default; } catch { fixes.push({ by: "built-in", issueId: issue.id, rule: issue.rule, title: "Shrink oversized images", status: "skipped", reason: "The image tool (sharp) isn't installed." }); return save(); }
  const targets = [];
  for (const h of issue.heavy ?? []) {
    let u; try { u = new URL(h.url, site.liveUrl); } catch { continue; }
    if (u.origin !== new URL(site.liveUrl).origin || !SERVE) continue;   // images on other servers can't be changed here
    const f = path.join(SERVE, decodeURIComponent(u.pathname));
    if (f.startsWith(SERVE) && fs.existsSync(f) && /\.(jpe?g|png|webp)$/i.test(f) && !isGenerated(rel(f))) targets.push(f);
  }
  const pages = issue.pages.filter((p) => site.performancePages.includes(p));
  if (!targets.length || !pages.length) return;
  return attempt({
    issue, title: "Shrink oversized images", pages, perf: true,
    apply: async (touch) => {
      const done = [];
      for (const f of [...new Set(targets)]) {
        const input = fs.readFileSync(f);
        const img = sharp(input, { failOn: "none" });
        const meta = await img.metadata();
        let pipe = img.rotate();
        if ((meta.width ?? 0) > 2000) pipe = pipe.resize({ width: 2000, withoutEnlargement: true });
        const ext = path.extname(f).toLowerCase();
        const outBuf = ext === ".png" ? await pipe.png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer()
          : ext === ".webp" ? await pipe.webp({ quality: 80 }).toBuffer()
          : await pipe.jpeg({ quality: 80, mozjpeg: true, progressive: true }).toBuffer();
        if (outBuf.length < input.length * 0.85) {     // only keep clearly smaller files; same name and format, so no code changes
          touch(f); fs.writeFileSync(f, outBuf);
          done.push(`${rel(f)} ${Math.round(input.length / 1024)}→${Math.round(outBuf.length / 1024)} KB`);
        }
      }
      return done.length ? `Recompressed ${done.length} image(s), same names and formats: ${done.join("; ")}.` : "The images were already as small as they can safely get.";
    },
    judge: (pre, post) => {
      const w = (r) => r.perf.reduce((s, p) => s + (p.weight ?? 0), 0);
      const l = (r) => r.perf.reduce((s, p) => s + (p.lcp ?? 0), 0) / Math.max(1, r.perf.length);
      const ok = w(post) < w(pre) * 0.97;
      return { ok, status: "improved", detail: `page weight ${(w(pre) / 1048576).toFixed(1)}→${(w(post) / 1048576).toFixed(1)} MB, main content appears at ${(l(pre) / 1000).toFixed(1)}→${(l(post) / 1000).toFixed(1)}s` };
    },
  });
}

async function httpsLinks(issue) {
  const urls = issue.details.map((d) => d.match(/http:\/\/[^\s"')]+/)?.[0]).filter(Boolean);
  if (!SERVE) return;
  const files = execSync(`grep -rlI --exclude-dir=node_modules --exclude-dir=.git -e "http://" .`, { cwd: SERVE, encoding: "utf8" }).split("\n").filter(Boolean);
  const ok = [];
  for (const u of new Set(urls)) {
    try { const r = await fetch(u.replace(/^http:/, "https:"), { method: "HEAD", signal: AbortSignal.timeout(10000) }); if (r.ok) ok.push(u); } catch {}
  }
  return attempt({
    issue, title: "Load content over https", pages: issue.pages,
    apply: (touch) => {
      let n = 0;
      for (const f of files.map((x) => path.join(SERVE, x))) {
        if (isGenerated(rel(f))) continue;
        let s = fs.readFileSync(f, "utf8"); const before = s;
        for (const u of ok) s = s.split(u).join(u.replace(/^http:/, "https:"));
        if (s !== before) { touch(f); fs.writeFileSync(f, s); n++; }
      }
      return ok.length ? `Changed ${ok.length} address(es) to https in ${n} file(s).` : "The https versions of these addresses don't answer, so they were left for a person.";
    },
  });
}

async function updateLibraries(issue) {
  if (!fs.existsSync(path.join(ROOT, "package-lock.json"))) return;
  return attempt({
    issue, title: "Update libraries with known security holes", pages: site.pages.slice(0, 3),
    apply: (touch) => {
      for (const f of ["package.json", "package-lock.json"]) touch(path.join(ROOT, f));
      try { execSync("npm audit fix --no-fund", { cwd: ROOT, stdio: "ignore" }); } catch {}
      return "Ran npm audit fix (only updates that don't break compatibility).";
    },
    judge: () => {
      let left = 0;
      try { execSync("npm audit --omit=dev --audit-level=high", { cwd: ROOT, stdio: "ignore" }); } catch { left = 1; }
      return { ok: !left, detail: left ? "high-severity advisories remain" : "no high-severity advisories left" };
    },
  });
}

// ── Run every built-in fix that applies ─────────────────────────────────────
const byRule = (r) => before.issues.filter((i) => i.rule === r && /built-in/.test(i.fixBy ?? ""));
for (const i of byRule("viewport-missing")) await headFix(i, "Set up pages for phones", `<meta name="viewport" content="width=device-width, initial-scale=1">`, { skipIf: /name=["']?viewport/i });
for (const i of byRule("lang-missing")) await headFix(i, "Say which language the page is in", null, { attr: site.languages?.[0]?.code ?? "en" });
for (const i of byRule("private-page-indexable")) await headFix(i, "Keep private pages out of Google", `<meta name="robots" content="noindex">`, { skipIf: /name=["']?robots/i });
for (const i of byRule("canonical-missing")) await headFix(i, "Name each page's main address", (p) => `<link rel="canonical" href="${site.liveUrl}${p.split("?")[0]}">`, { skipIf: /rel=["']?canonical/i, pages: i.pages.filter((p) => !p.includes("?")) });
for (const i of byRule("header-referrer")) await headFix(i, "Add a referrer policy", `<meta name="referrer" content="strict-origin-when-cross-origin">`, { skipIf: /name=["']?referrer/i });
for (const i of [...byRule("mixed-content"), ...byRule("insecure-form")]) await httpsLinks(i);
for (const i of byRule("dependency-vuln").slice(0, 1)) await updateLibraries(i);
const perfIssue = before.issues.find((i) => i.rule.startsWith("perf-") && (i.heavy ?? []).length);
if (perfIssue) await shrinkImages(perfIssue);

log(`Done: ${fixes.filter((f) => f.by === "built-in" && ["fixed", "improved"].includes(f.status)).length} kept, ${fixes.filter((f) => f.status === "undone").length} undone.`);
save();
