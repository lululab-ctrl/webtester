// POST {domain, quick?, fix?} → starts "Test a website".
import { guard, send, gh, fail, readBody, normalizeDomain } from "./_lib.js";

const DEPTH = {
  full: "Full: every browser and screen size (about 10 minutes)",
  quick: "Quick: Chrome, 3 screen sizes (about 3 minutes)",
};

export default async function handler(req, res) {
  if (!guard(req, res, { methods: ["POST"] })) return;
  const b = await readBody(req);
  const domain = normalizeDomain(b.domain);
  if (!domain) return send(res, 400, { error: "That doesn't look like a website address." });
  try {
    await gh("/actions/workflows/test-website.yml/dispatches", {
      method: "POST", body: { ref: "main", inputs: { website: domain, depth: b.quick ? DEPTH.quick : DEPTH.full, fix: !!b.fix } },
    });
    send(res, 200, { ok: true, domain });
  } catch (e) { fail(res, e); }
}
