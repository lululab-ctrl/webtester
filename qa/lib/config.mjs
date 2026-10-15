// Finds and fills in the settings for one website.
// Each site has a file in sites/ named after its domain (sites/tours.mw.photography.json).
// Anything a site file leaves out comes from qa/defaults.json, so a new site needs only its domain.
import fs from "node:fs";
import path from "node:path";

export function normalizeDomain(input) {
  let d = String(input ?? "").trim().toLowerCase();
  if (!d) throw new Error("No website given. Enter a domain like example.com.");
  if (!/^https?:\/\//.test(d)) d = "https://" + d;
  const u = new URL(d);
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(u.hostname) && u.hostname !== "localhost") throw new Error(`"${input}" doesn't look like a website address.`);
  return u.hostname;
}

export function siteFile(hubRoot, domain) {
  return path.join(hubRoot, "sites", `${normalizeDomain(domain)}.json`);
}

export function loadSite(hubRoot, domainOrFile) {
  const defaults = JSON.parse(fs.readFileSync(path.join(hubRoot, "qa", "defaults.json"), "utf8"));
  let file = domainOrFile.endsWith(".json") ? path.resolve(domainOrFile) : siteFile(hubRoot, domainOrFile);
  let own = {};
  let isNew = false;
  if (fs.existsSync(file)) own = JSON.parse(fs.readFileSync(file, "utf8"));
  else isNew = true;
  const domain = own.domain ?? normalizeDomain(path.basename(file, ".json"));
  const site = { ...defaults, ...own, domain };
  site.liveUrl = (own.liveUrl ?? `https://${domain}`).replace(/\/$/, "");
  site.name = own.name ?? domain;
  site.performancePages = own.performancePages ?? (own.pages ?? defaults.pages).slice(0, 4);
  site.isNew = isNew;
  site.file = file;
  site.knownFile = file.replace(/\.json$/, ".known.json");
  return site;
}

/** The settings to save when a site is added or edited (only what differs from the defaults). */
export function siteRecord({ domain, name, repo, branch, build, serveDir, pages, previous = {} }) {
  const d = normalizeDomain(domain);
  const rec = { ...previous, domain: d, name: name || previous.name || d };
  if (repo !== undefined) rec.repo = repo ? repo.replace(/^https:\/\/github\.com\//, "").replace(/\.git$/, "").replace(/\/$/, "") : undefined;
  if (branch) rec.branch = branch;
  if (build !== undefined) rec.build = build || undefined;
  if (serveDir !== undefined) rec.serveDir = serveDir || undefined;
  if (pages) rec.pages = pages.split(",").map((p) => p.trim()).filter(Boolean).map((p) => (p.startsWith("/") ? p : "/" + p));
  if (rec.repo && !/^[\w.-]+\/[\w.-]+$/.test(rec.repo)) throw new Error(`The code repository should look like owner/name, not "${rec.repo}".`);
  delete rec.liveUrl; // always follows the domain, so editing the domain is enough
  return JSON.parse(JSON.stringify(rec));
}

// Turns a file pattern ("presets/**", "*.html", "src/**/*.njk") into a matcher for paths like presets/he/index.html.
export function globToRegex(g) {
  return new RegExp("^" + g.replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*\//g, "\u0001").replace(/\*\*/g, "\u0002").replace(/\*/g, "[^/]*").replace(/\?/g, "[^/]")
    .replace(/\u0001/g, "(?:.*/)?").replace(/\u0002/g, ".*") + "$");
}
