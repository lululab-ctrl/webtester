// Website Tests dashboard. Every bit of text that comes from a tested website is escaped before it's shown.
const $ = (s, el = document) => el.querySelector(s);
const app = $("#app");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const SEV = ["Critical", "High", "Medium", "Low"];
const SC = { Critical: "c", High: "h", Medium: "m", Low: "l" };
const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
const CATEGORIES = { errors: "Bugs and errors", devices: "Phones, tablets and browsers", flows: "Things visitors do", accessibility: "Accessibility", seo: "Search engines and sharing", security: "Security", performance: "Speed" };
const WHO = { "built-in": ["auto", "Fixed automatically"], "built-in + claude": ["auto", "Fixed automatically"], claude: ["claude", "Claude can fix"], you: ["you", "Needs you"] };
const STATUS = { fixed: ["ok", "Fixed and re-tested"], improved: ["ok", "Improved and re-tested"], undone: ["warn", "Tried, then undone"], skipped: ["", "Not changed"], "needs-you": ["warn", "Needs you"] };
let pollTimer = null;

async function api(path, { method = "GET", body } = {}) {
  const r = await fetch(`/api/${path}`, {
    method, credentials: "same-origin",
    headers: { "X-Requested-With": "dashboard", ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await r.json().catch(() => ({}));
  if (r.status === 401 && path !== "login") { showLogin(); throw new Error("signed-out"); }
  if (!r.ok) throw new Error(data.error || `Error ${r.status}`);
  return data;
}

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => (t.hidden = true), 4500);
}

function ago(iso) {
  if (!iso) return "";
  const s = (Date.now() - new Date(iso)) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

function countPills(c) {
  if (!c) return `<span class="pill">Not tested yet</span>`;
  return SEV.map((s) => `<span class="pill ${SC[s]}">${c[s]} ${s.toLowerCase()}</span>`).join("");
}

function runState(r) {
  if (r.status !== "completed") return ["run", r.stage ? `${r.stage}…` : r.status === "queued" ? "Waiting to start…" : "Running…"];
  if (r.conclusion === "success") return ["ok", "Done"];
  if (r.conclusion === "cancelled") return ["", "Cancelled"];
  return /^Test /.test(r.title) ? ["bad", "Done: serious issues found"] : ["bad", "Stopped: see details"];
}

// ── Sign in ─────────────────────────────────────────────────────────────
function showLogin(msg = "") {
  stopPolling();
  $("#signout").hidden = true;
  app.innerHTML = `<form class="card login" id="login">
    <h1>Sign in</h1>
    <p class="muted">Website Tests is private to your team.</p>
    <label for="pw">Password</label>
    <input id="pw" type="password" autocomplete="current-password" required autofocus>
    ${msg ? `<p class="error">${esc(msg)}</p>` : ""}
    <div class="actions"><button class="primary" type="submit">Sign in</button></div>
  </form>`;
  $("#login").addEventListener("submit", async (e) => {
    e.preventDefault();
    const b = e.submitter; b.disabled = true;
    try { await api("login", { method: "POST", body: { password: $("#pw").value } }); route(); }
    catch (err) { showLogin(err.message); }
  });
}

// ── Website list ────────────────────────────────────────────────────────
async function showHome() {
  app.innerHTML = `<div class="spread"><div><h1>Websites</h1><p class="muted">Pick a website to test it, read its report, or fix it.</p></div>
    <button class="primary" id="add">＋ Add a website</button></div>
    <div id="list"><p class="muted pad">Loading websites…</p></div>
    <h2>Recent runs</h2><div class="card runs" id="runs"><p class="muted">Loading…</p></div>`;
  $("#add").addEventListener("click", () => siteDialog());
  const [{ sites }] = await Promise.all([api("sites"), loadRuns(null)]);
  $("#list").innerHTML = sites.length ? `<div class="grid">${sites.map((s) => `
    <a class="card site" href="#/site/${encodeURIComponent(s.domain)}">
      <div class="spread"><div><h3>${esc(s.name)}</h3><div class="dom">${esc(s.domain)}</div></div>
        ${s.last ? `<span class="dot ${s.last.verdict === "pass" ? "ok" : "bad"}" title="${s.last.verdict === "pass" ? "No serious issues" : "Serious issues"}"></span>` : ""}</div>
      <div class="pills">${countPills(s.last?.counts)}</div>
      <div class="small muted">${s.last ? `Tested ${esc(ago(s.last.when))}` : "Not tested yet"} · ${s.repo ? "Code linked: can fix" : "Tests only (no code linked)"}</div>
    </a>`).join("")}</div>`
    : `<div class="card empty"><p>No websites yet.</p><button class="primary" id="add2">Add your first website</button></div>`;
  $("#add2")?.addEventListener("click", () => siteDialog());
}

async function loadRuns(domain) {
  const el = $("#runs");
  try {
    const { runs } = await api(`runs${domain ? `?domain=${encodeURIComponent(domain)}` : ""}`);
    if (!el.isConnected) return runs;
    el.innerHTML = runs.length ? runs.slice(0, domain ? 8 : 10).map((r) => {
      const [cls, label] = runState(r);
      return `<div class="runline"><span class="dot ${cls}"></span>
        <div class="what"><b>${esc(r.title)}</b><div class="small muted">${esc(label)}${r.fixSkipped && r.status === "completed" && /and fix$/.test(r.title) ? " · fixing was skipped (see details)" : ""}</div></div>
        <span class="when">${esc(ago(r.started))}</span>
        <a class="small" href="${esc(r.url)}" target="_blank" rel="noopener">Details</a></div>`;
    }).join("") : `<p class="muted">No runs yet.</p>`;
    if (runs.some((r) => r.status !== "completed")) startPolling(domain);
    else stopPolling();
    return runs;
  } catch (e) { if (e.message !== "signed-out") el.innerHTML = `<p class="error">${esc(e.message)}</p>`; return []; }
}

function startPolling(domain) {
  stopPolling();
  pollTimer = setTimeout(async () => {
    const before = $("#runs")?.textContent;
    const runs = await loadRuns(domain);
    // When a run has just finished, refresh the page's results too.
    if (before && runs.length && runs.every((r) => r.status === "completed")) route();
  }, 15000);
}
function stopPolling() { clearTimeout(pollTimer); pollTimer = null; }

// ── Add / edit dialog ───────────────────────────────────────────────────
function siteDialog(site = null) {
  const d = document.createElement("dialog");
  d.innerHTML = `<form method="dialog" id="sf">
    <h2>${site ? "Edit website" : "Add a website"}</h2>
    <label for="f-dom">Domain</label>
    <input id="f-dom" type="text" required placeholder="example.com" value="${esc(site?.domain ?? "")}" autocomplete="off" inputmode="url">
    <label for="f-name">Name <span class="hint">(optional)</span></label>
    <input id="f-name" type="text" placeholder="My website" value="${esc(site && site.name !== site.domain ? site.name : "")}">
    <label for="f-repo">Code repository on GitHub <span class="hint">(optional, needed for fixing: owner/name)</span></label>
    <input id="f-repo" type="text" placeholder="owner/repository" value="${esc(site?.repo ?? "")}" autocomplete="off">
    <label for="f-pages">Key pages <span class="hint">(optional, comma-separated: others are found by following links)</span></label>
    <input id="f-pages" type="text" placeholder="/, /about/, /contact/" value="${esc(site?.pages?.join(", ") ?? "")}">
    ${site ? "" : `<label class="check"><input type="checkbox" id="f-test" checked> Test it straight away</label>`}
    <p class="error" id="f-err" hidden></p>
    <div class="actions">
      ${site ? `<button type="button" class="danger push-left" id="f-remove">Remove</button>` : ""}
      <button type="button" id="f-cancel">Cancel</button>
      <button class="primary" type="submit">${site ? "Save" : "Add"}</button>
    </div></form>`;
  document.body.append(d);
  d.showModal();
  const close = () => { d.close(); d.remove(); };
  $("#f-cancel", d).addEventListener("click", close);
  const go = async (body, done) => {
    const err = $("#f-err", d); err.hidden = true;
    d.querySelectorAll("button").forEach((b) => (b.disabled = true));
    try { await api("site", { method: "POST", body }); close(); toast(done); setTimeout(route, 1200); }
    catch (e) { err.textContent = e.message; err.hidden = false; d.querySelectorAll("button").forEach((b) => (b.disabled = false)); }
  };
  $("#sf", d).addEventListener("submit", (e) => {
    e.preventDefault();
    const domain = $("#f-dom", d).value.trim();
    const repo = $("#f-repo", d).value.trim();
    go({
      domain, oldDomain: site && site.domain !== domain ? site.domain : "",
      name: $("#f-name", d).value.trim(), repo: site?.repo && !repo ? "none" : repo,
      pages: $("#f-pages", d).value.trim(), testNow: !site && $("#f-test", d)?.checked,
    }, site ? "Saved. Changes show here in about a minute." : `Added. ${$("#f-test", d)?.checked ? "The first test starts in about a minute." : "It shows in the list in about a minute."}`)
      .then(() => { if (site && site.domain !== domain) location.hash = `#/site/${encodeURIComponent(domain)}`; });
  });
  $("#f-remove", d)?.addEventListener("click", () => {
    if (confirm(`Remove ${site.domain} from the list? Its past reports are kept.`)) go({ domain: site.domain, remove: true }, "Removed.").then(() => { location.hash = "#/"; });
  });
}

// ── One website ─────────────────────────────────────────────────────────
async function showSite(domain) {
  app.innerHTML = `<p class="muted pad">Loading ${esc(domain)}…</p>`;
  const { sites } = await api("sites");
  const site = sites.find((s) => s.domain === domain) ?? { domain, name: domain, repo: null, last: null };
  app.innerHTML = `<p class="small"><a href="#/">← All websites</a></p>
    <div class="spread"><div><h1>${esc(site.name)}</h1>
      <p class="muted"><a href="https://${esc(site.domain)}" target="_blank" rel="noopener">${esc(site.domain)}</a> · ${site.repo ? `code: ${esc(site.repo)}` : "no code linked (tests only)"}</p></div>
      <button id="edit">Edit website</button></div>
    <div class="steps">
      <div class="card"><b>Full test</b><p>Every page in Chrome, Firefox and Safari on 7 screen sizes, with speed. About 10 minutes.</p><button class="primary" data-run="full">Run full test</button></div>
      <div class="card"><b>Quick test</b><p>Chrome on a phone, tablet and laptop. About 3 minutes.</p><button data-run="quick">Run quick test</button></div>
      <div class="card"><b>Test and fix</b><p>Tests, fixes what's safe, re-tests every fix, and opens a pull request for your approval.</p>
        <button data-run="fix" ${site.repo ? "" : "disabled"}>Test and fix</button>${site.repo ? "" : `<p class="small">Link the code repository (Edit website) to enable fixing.</p>`}</div>
    </div>
    <h2>Runs</h2><div class="card runs" id="runs"><p class="muted">Loading…</p></div>
    <div id="report"></div>`;
  $("#edit").addEventListener("click", () => siteDialog(site));
  app.querySelectorAll("[data-run]").forEach((b) => b.addEventListener("click", async () => {
    const kind = b.dataset.run;
    app.querySelectorAll("[data-run]").forEach((x) => (x.disabled = true));
    try {
      await api("run", { method: "POST", body: { domain, quick: kind === "quick", fix: kind === "fix" } });
      toast(kind === "fix" ? "Test and fix started. The pull request appears when it's done (about 30–60 minutes)." : "Test started. Results appear here when it's done.");
      setTimeout(() => loadRuns(domain), 4000);
    } catch (e) { toast(e.message); }
    setTimeout(() => app.querySelectorAll("[data-run]").forEach((x) => (x.disabled = x.dataset.run === "fix" && !site.repo)), 8000);
  }));
  loadRuns(domain);
  showReport(domain, "latest");
}

async function showReport(domain, which) {
  const el = $("#report");
  el.innerHTML = `<p class="muted pad">Loading the report…</p>`;
  let fixAvailable = false;
  const [{ results: r }, fix] = await Promise.all([api(`report?domain=${encodeURIComponent(domain)}&which=${which}`), which === "latest" ? api(`report?domain=${encodeURIComponent(domain)}&which=fix`).catch(() => ({})) : Promise.resolve({ results: true })]);
  fixAvailable = !!fix.results;
  const tabs = `<div class="tabs" role="group" aria-label="Which report">
      <button data-which="latest" aria-pressed="${which === "latest"}">Latest test</button>
      <button data-which="fix" aria-pressed="${which === "fix"}" ${fixAvailable ? "" : "disabled title=\"No fix run yet\""}>Latest fix run</button></div>`;
  if (!r) {
    el.innerHTML = `<div class="spread"><h2>Report</h2>${tabs}</div><div class="card empty"><p class="muted">${which === "fix" ? "No fix run yet." : "This website hasn't been tested yet. Run a test above."}</p></div>`;
    bindTabs(domain); return;
  }
  const serious = r.issues.filter((i) => i.blocking).length;
  const flows = [...new Set(r.flowsPassed.map((f) => f.flow))];
  const failedFlows = new Set(r.issues.filter((i) => i.rule === "flow-failed").flatMap((i) => i.pages));
  el.innerHTML = `<div class="spread"><h2>Report <span class="small muted">· ${esc(r.tested === "code" ? "the site's code" : "the live website")}, ${esc(new Date(r.when).toLocaleString())}, ${esc(r.mode)} test</span></h2>${tabs}</div>
    <div class="card">
      <div class="verdict"><span class="dot ${serious ? "bad" : "ok"}"></span><div>
        <b>${serious ? `${plural(serious, "serious issue")} to deal with` : "No serious issues outside the known list"}</b>
        <span class="muted small">${plural(r.coverage.pages, "page")} · ${esc(r.coverage.languages.join(" + "))} · ${plural(r.coverage.devices.length, "screen size")} · ${esc(r.coverage.browsers.join(", "))} · ${plural(r.coverage.links, "link")} · ${plural(r.coverage.flows, "visitor journey")}</span></div></div>
      <div class="counts">${SEV.map((s) => `<button class="card count ${SC[s]}" data-sev="${s}" aria-pressed="false"><b>${r.counts[s]}</b><span>${s}</span></button>`).join("")}</div>
      ${flows.filter((f) => !failedFlows.has(f)).length ? `<p class="small muted gap-top">✓ Works: ${flows.filter((f) => !failedFlows.has(f)).map(esc).join(" · ")}</p>` : ""}
    </div>
    ${r.fixes ? fixSummary(r) : ""}
    ${r.comparison ? `<p class="muted">Before and after: <b>${plural(r.comparison.resolved.length, "issue")} gone</b>, ${plural(r.comparison.added.length, "new issue")}.</p>` : ""}
    ${r.perf?.length ? `<h2>Speed on a phone</h2><div class="card small">${r.perf.map((p) => p.error ? `<div>${esc(p.page)}: couldn't measure</div>` : `<div class="runline"><span class="what"><b>${esc(p.page)}</b></span><span>Score <b>${p.score}</b></span><span>Main content at <b>${(p.lcp / 1000).toFixed(1)}s</b></span><span class="when">${(p.weight / 1048576).toFixed(1)} MB</span></div>`).join("")}</div>` : ""}
    <div class="spread"><h2 id="issues-h">Issues</h2><button class="link" id="expand">Open all</button></div>
    <div id="issues">${r.issues.map((i) => issueCard(i, r)).join("") || `<div class="card empty"><p>No issues found.</p></div>`}</div>`;
  bindTabs(domain);
  el.querySelectorAll("[data-sev]").forEach((b) => b.addEventListener("click", () => {
    const on = b.getAttribute("aria-pressed") !== "true";
    el.querySelectorAll("[data-sev]").forEach((x) => x.setAttribute("aria-pressed", "false"));
    b.setAttribute("aria-pressed", String(on));
    el.querySelectorAll(".issue").forEach((x) => (x.hidden = on && x.dataset.sev !== b.dataset.sev));
    $("#issues-h").textContent = on ? `${b.dataset.sev} issues` : "Issues";
  }));
  $("#expand").addEventListener("click", (e) => {
    const all = el.querySelectorAll(".issue:not([hidden])");
    const open = [...all].some((x) => !x.open);
    all.forEach((x) => (x.open = open));
    e.target.textContent = open ? "Close all" : "Open all";
  });
}

function bindTabs(domain) {
  $("#report").querySelectorAll("[data-which]").forEach((b) => b.addEventListener("click", () => showReport(domain, b.dataset.which)));
}

function fixSummary(r) {
  const keptIds = new Set(r.fixes.filter((f) => ["fixed", "improved"].includes(f.status)).map((f) => f.issueId));
  const needYou = r.fixes.filter((f) => f.status === "needs-you" && !keptIds.has(f.issueId));
  const undone = r.fixes.filter((f) => f.status === "undone" && !keptIds.has(f.issueId));
  return `<h2>Automatic fixes</h2><div class="card">
    <div class="pills"><span class="pill ok">${keptIds.size} fixed and re-tested</span><span class="pill">${undone.length} tried, then undone</span><span class="pill h">${needYou.length} need you</span></div>
    <ul class="found gap-top">${r.fixes.filter((f) => ["fixed", "improved"].includes(f.status)).map((f) => `<li><b>${esc(f.title)}</b>: ${esc(f.summary ?? "")}</li>`).join("")}</ul>
    ${needYou.length ? `<h4 class="label gap-top">Needs you</h4><ul class="found">${needYou.map((f) => `<li><b>${esc(f.title)}</b>: ${esc(f.reason ?? "")} ${f.change ? `<br>Change: ${esc(f.change)}` : ""}</li>`).join("")}</ul>` : ""}
  </div>`;
}

function issueCard(i, r) {
  const [whoCls, whoText] = WHO[i.fixBy] ?? ["", ""];
  const fixes = (r.fixes ?? []).filter((f) => f.issueId === i.id);
  const where = [
    i.pages?.length && ["Where", i.pages.slice(0, 8).join(", ") + (i.pages.length > 8 ? ` and ${i.pages.length - 8} more` : "")],
    i.devices?.length && ["Screens", i.devices.length >= r.coverage.devices.length ? "all screen sizes" : i.devices.join(", ")],
    i.browsers?.length && ["Browsers", i.browsers.length >= r.coverage.browsers.length ? "all browsers" : i.browsers.join(", ")],
    i.langs?.length && ["Language", i.langs.join(", ")],
  ].filter(Boolean);
  return `<details class="card issue ${SC[i.severity]}" data-sev="${esc(i.severity)}">
    <summary><span class="sev ${SC[i.severity]}">${esc(i.severity)}</span><span class="t">${esc(i.title)}</span>
      ${i.status === "new" ? `<span class="pill bad">New</span>` : ""}${i.known ? `<span class="pill">Known</span>` : ""}
      ${whoText ? `<span class="who ${whoCls}">${esc(whoText)}</span>` : ""}
      <span class="small muted">${esc(CATEGORIES[i.category] ?? "")}</span></summary>
    <div class="body">
      <div>
        <dl class="where">${where.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
        <h4>What the test saw</h4><ul class="found">${i.details.map((d) => `<li><code>${esc(d)}</code></li>`).join("")}${i.moreDetails ? `<li>…and ${i.moreDetails} more</li>` : ""}</ul>
      </div>
      <div>
        <h4>Why it matters</h4><p>${esc(i.why)}</p>
        <h4>What to change</h4><p>${esc(i.change ?? i.fix)}</p>
        ${i.snippet ? `<pre>${esc(i.snippet)}</pre>` : ""}
        ${i.fixNote ? `<p class="small muted">${esc(i.fixNote)}</p>` : ""}
        ${i.learnMore && /^https:\/\//.test(i.learnMore) ? `<p class="small"><a href="${esc(i.learnMore)}" target="_blank" rel="noopener">Step-by-step guide →</a></p>` : ""}
      </div>
    </div>
    ${fixes.map((f) => { const [c, t] = STATUS[f.status] ?? ["", f.status]; return `<div class="fixed"><b class="${c}">${esc(t)}</b> (${f.by === "claude" ? "Claude" : "built-in"}): ${esc(f.summary ?? "")} ${f.verified ? `<span class="muted">Re-test: ${esc(f.verified)}.</span>` : ""} ${f.reason ? esc(f.reason) : ""}</div>`; }).join("")}
  </details>`;
}

// ── Routing ─────────────────────────────────────────────────────────────
async function route() {
  stopPolling();
  try {
    const { signedIn, configured } = await api("login");
    if (!configured) { app.innerHTML = `<div class="card login"><h1>Almost there</h1><p>Add <code>DASHBOARD_PASSWORD</code> (and <code>GITHUB_TOKEN</code>) in Vercel → Settings → Environment Variables, then redeploy.</p></div>`; return; }
    if (!signedIn) return showLogin();
    $("#signout").hidden = false;
    const m = location.hash.match(/^#\/site\/(.+)$/);
    if (m) await showSite(decodeURIComponent(m[1]));
    else await showHome();
  } catch (e) {
    if (e.message !== "signed-out") {
      app.innerHTML = `<div class="card"><p class="error">${esc(e.message)}</p><button id="retry">Try again</button></div>`;
      $("#retry").addEventListener("click", route);
    }
  }
}
$("#signout").addEventListener("click", async () => { await api("login", { method: "DELETE" }).catch(() => {}); showLogin(); });
window.addEventListener("hashchange", route);
route();
