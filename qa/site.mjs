#!/usr/bin/env node
// Manage the list of websites (used by the GitHub forms; works on a computer too).
//
//   node qa/site.mjs save --domain example.com [--name "Shop"] [--repo owner/name] [--pages /,/about/]
//                         [--build "npm run build"] [--publish-folder dist] [--previous old-domain.com]
//   node qa/site.mjs remove --domain example.com
//   node qa/site.mjs index            rebuild SITES.md (the list of websites and their latest results)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeDomain, siteFile, siteRecord } from "./lib/config.mjs";

const HUB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [cmd, ...rest] = process.argv.slice(2);
const opt = (n) => { const i = rest.indexOf(n); return i >= 0 ? rest[i + 1] : undefined; };
const SITES = path.join(HUB, "sites");
fs.mkdirSync(SITES, { recursive: true });

if (cmd === "save") {
  const domain = normalizeDomain(opt("--domain"));
  const prevDomain = opt("--previous") ? normalizeDomain(opt("--previous")) : null;
  const prevFile = siteFile(HUB, prevDomain ?? domain);
  const previous = fs.existsSync(prevFile) ? JSON.parse(fs.readFileSync(prevFile, "utf8")) : {};
  const blank = (v) => (v === undefined || v === "" ? undefined : v);
  const rec = siteRecord({
    domain, previous, name: blank(opt("--name")), repo: blank(opt("--repo")), pages: blank(opt("--pages")),
    build: blank(opt("--build")), serveDir: blank(opt("--publish-folder")),
  });
  if (opt("--repo") === "none") delete rec.repo;
  fs.writeFileSync(siteFile(HUB, domain), JSON.stringify(rec, null, 2) + "\n");
  // Changing the domain moves the site's settings, known issues and reports along with it.
  if (prevDomain && prevDomain !== domain) {
    fs.rmSync(prevFile, { force: true });
    for (const ext of [".known.json", ".review.json"]) {
      const a = prevFile.replace(/\.json$/, ext);
      if (fs.existsSync(a)) fs.renameSync(a, siteFile(HUB, domain).replace(/\.json$/, ext));
    }
    const ra = path.join(HUB, "reports", prevDomain), rb = path.join(HUB, "reports", domain);
    if (fs.existsSync(ra) && !fs.existsSync(rb)) fs.renameSync(ra, rb);
    console.log(`Moved ${prevDomain} → ${domain}`);
  }
  console.log(`${previous.domain ? "Updated" : "Added"} ${domain}: ${JSON.stringify(rec)}`);
} else if (cmd === "remove") {
  const f = siteFile(HUB, opt("--domain"));
  if (!fs.existsSync(f)) { console.error("No such website in the list."); process.exit(1); }
  fs.rmSync(f);
  console.log(`Removed ${opt("--domain")} (its past reports are kept in reports/).`);
} else if (cmd !== "index") {
  console.error("Use: save | remove | index"); process.exit(2);
}

// SITES.md: the websites and how each did in its latest test.
const rows = fs.readdirSync(SITES).filter((f) => /^[^.].*\.json$/.test(f) && !/\.(known|review)\.json$/.test(f)).sort().map((f) => {
  const s = JSON.parse(fs.readFileSync(path.join(SITES, f), "utf8"));
  const latest = path.join(HUB, "reports", s.domain, "latest", "results.json");
  let last = "not tested yet";
  if (fs.existsSync(latest)) {
    const r = JSON.parse(fs.readFileSync(latest, "utf8"));
    last = `${r.when.slice(0, 10)} · ${r.verdict === "pass" ? "✅" : "🛑"} ${r.counts.Critical} critical, ${r.counts.High} high, ${r.counts.Medium} medium, ${r.counts.Low} low · [report](reports/${s.domain}/latest/details.md)`;
  }
  return `| ${s.name ?? s.domain} | [${s.domain}](https://${s.domain}) | ${s.repo ? `\`${s.repo}\`` : "not linked (tests only, no fixes)"} | ${last} |`;
});
fs.writeFileSync(path.join(HUB, "SITES.md"), [
  "# Websites", "",
  "Updated automatically after every test. To add one or change its domain: **Actions → Add or edit a website**. To test one: **Actions → Test a website**.", "",
  "| Website | Domain | Code (for automatic fixes) | Latest test |", "|---|---|---|---|",
  ...(rows.length ? rows : ["| *(none yet)* | | | |"]), "",
].join("\n"));
console.log(`SITES.md lists ${rows.length} website(s).`);
