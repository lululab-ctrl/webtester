// POST {domain, oldDomain?, name?, repo?, pages?, remove?} → starts "Add or edit a website".
import { guard, send, gh, fail, readBody, normalizeDomain } from "./_lib.js";

export default async function handler(req, res) {
  if (!guard(req, res, { methods: ["POST"] })) return;
  const b = await readBody(req);
  const domain = normalizeDomain(b.domain);
  if (!domain) return send(res, 400, { error: "That doesn't look like a website address. Try something like example.com." });
  const oldDomain = b.oldDomain ? normalizeDomain(b.oldDomain) : "";
  if (b.oldDomain && !oldDomain) return send(res, 400, { error: "The current domain doesn't look like a website address." });
  const repo = String(b.repo ?? "").trim().replace(/^https:\/\/github\.com\//, "").replace(/\.git$/, "").replace(/\/$/, "");
  if (repo && repo !== "none" && !/^[\w.-]+\/[\w.-]+$/.test(repo)) return send(res, 400, { error: "The code repository should look like owner/name." });
  const inputs = {
    website: domain, old_domain: oldDomain && oldDomain !== domain ? oldDomain : "",
    name: String(b.name ?? "").slice(0, 80), code_repository: repo, key_pages: String(b.pages ?? "").slice(0, 500),
    remove: b.remove ? "true" : "false", test_now: b.testNow ? "true" : "false",
  };
  try {
    await gh("/actions/workflows/add-website.yml/dispatches", { method: "POST", body: { ref: "main", inputs } });
    send(res, 200, { ok: true, domain });
  } catch (e) { fail(res, e); }
}
