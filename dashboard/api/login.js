// POST {password} → sets the sign-in cookie. DELETE → signs out. GET → are you signed in?
import { send, samePassword, sessionCookie, clearCookie, signedIn, readBody } from "./_lib.js";

export default async function handler(req, res) {
  if (req.method === "GET") return send(res, 200, { signedIn: signedIn(req), configured: !!(process.env.DASHBOARD_PASSWORD && process.env.SESSION_SECRET) });
  if (req.method === "DELETE") { res.setHeader("Set-Cookie", clearCookie()); return send(res, 200, { ok: true }); }
  if (req.method !== "POST") return send(res, 405, { error: "Not allowed" });
  if (!process.env.DASHBOARD_PASSWORD || !process.env.SESSION_SECRET) return send(res, 503, { error: "The dashboard isn't set up yet: add DASHBOARD_PASSWORD and SESSION_SECRET in Vercel." });
  const { password } = await readBody(req);
  await new Promise((r) => setTimeout(r, 400));   // slows down password guessing
  if (!samePassword(password)) return send(res, 401, { error: "That password isn't right." });
  res.setHeader("Set-Cookie", sessionCookie());
  send(res, 200, { ok: true });
}
