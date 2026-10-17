// Shared helpers for the dashboard's server functions (Vercel).
// Settings (Vercel → Project → Settings → Environment Variables):
//   GITHUB_TOKEN        fine-grained token on the webtester repository: Actions read/write, Contents read
//   GITHUB_REPO         owner/name of the webtester repository, e.g. lululab-ctrl/webtester
//   DASHBOARD_PASSWORD  the password to open the dashboard
//   SESSION_SECRET      any long random text (signs the sign-in cookie)
import crypto from "node:crypto";

export const REPO = process.env.GITHUB_REPO || "lululab-ctrl/webtester";
const COOKIE = "wt_session";
const DAY = 24 * 3600 * 1000;

const secret = () => process.env.SESSION_SECRET || "";

export function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function sign(value) {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

export function sessionCookie() {
  const exp = Date.now() + 14 * DAY;
  const v = `${exp}.${sign(String(exp))}`;
  return `${COOKIE}=${v}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${14 * 24 * 3600}`;
}
export const clearCookie = () => `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export function signedIn(req) {
  if (!secret() || !process.env.DASHBOARD_PASSWORD) return false;
  const m = (req.headers.cookie || "").match(new RegExp(`(?:^|; )${COOKIE}=([^;]+)`));
  if (!m) return false;
  const [exp, sig] = m[1].split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const want = Buffer.from(sign(exp));
  const got = Buffer.from(sig);
  return want.length === got.length && crypto.timingSafeEqual(want, got);
}

export function samePassword(given) {
  const want = process.env.DASHBOARD_PASSWORD || "";
  if (!want || typeof given !== "string") return false;
  const a = crypto.createHash("sha256").update(given).digest();
  const b = crypto.createHash("sha256").update(want).digest();
  return crypto.timingSafeEqual(a, b);
}

/** Every function: signed in, and a request from this page (not another site). */
export function guard(req, res, { methods = ["GET"] } = {}) {
  if (!methods.includes(req.method)) { send(res, 405, { error: "Not allowed" }); return false; }
  if (!signedIn(req)) { send(res, 401, { error: "Please sign in." }); return false; }
  if (req.method !== "GET" && req.headers["x-requested-with"] !== "dashboard") { send(res, 403, { error: "Not allowed" }); return false; }
  return true;
}

export async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); } catch { return {}; }
}

/** GitHub API call for this repository. */
export async function gh(pathname, { method = "GET", body, raw = false } = {}) {
  const headers = {
    Accept: raw ? "application/vnd.github.raw+json" : "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "webtester-dashboard",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  if (body) headers["Content-Type"] = "application/json";
  const url = pathname.startsWith("http") ? pathname : `https://api.github.com/repos/${REPO}${pathname}`;
  const r = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  if (r.status === 404) return null;
  if (!r.ok) {
    const text = await r.text().catch(() => "");
    const err = new Error(`GitHub answered ${r.status}${text ? `: ${text.slice(0, 200)}` : ""}`);
    err.status = r.status;
    throw err;
  }
  if (r.status === 204) return {};
  return raw ? r.text() : r.json();
}

export function normalizeDomain(input) {
  let d = String(input ?? "").trim().toLowerCase();
  if (!d) return null;
  if (!/^https?:\/\//.test(d)) d = "https://" + d;
  try {
    const h = new URL(d).hostname;
    return /^[a-z0-9.-]+\.[a-z]{2,}$/.test(h) ? h : null;
  } catch { return null; }
}

export const fail = (res, e) => send(res, e.status === 401 || e.status === 403 ? 502 : 500, {
  error: e.status === 401 || e.status === 403
    ? "The dashboard's GitHub key is missing, expired or lacks permission (see README → Dashboard)."
    : `Something went wrong: ${e.message}`,
});
