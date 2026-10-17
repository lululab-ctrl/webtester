// GET ?domain=&which=latest|fix → the results of the latest test (or latest fix run) of one website.
import { guard, send, gh, fail, normalizeDomain } from "./_lib.js";

export default async function handler(req, res) {
  if (!guard(req, res)) return;
  const url = new URL(req.url, "http://x");
  const domain = normalizeDomain(url.searchParams.get("domain"));
  if (!domain) return send(res, 400, { error: "Which website?" });
  try {
    let path = `/contents/reports/${encodeURIComponent(domain)}/latest/results.json`;
    if (url.searchParams.get("which") === "fix") {
      const list = (await gh(`/contents/reports/${encodeURIComponent(domain)}/fixes`)) ?? [];
      const newest = list.filter((x) => x.type === "dir").map((x) => x.name).sort().pop();
      if (!newest) return send(res, 200, { results: null });
      path = `/contents/reports/${encodeURIComponent(domain)}/fixes/${newest}/results.json`;
    }
    const raw = await gh(path, { raw: true });
    if (!raw) return send(res, 200, { results: null });
    const r = JSON.parse(raw);
    delete r.visited; delete r.headers;
    send(res, 200, { results: r });
  } catch (e) { fail(res, e); }
}
