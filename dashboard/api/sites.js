// GET → every website in the list, with its latest result.
import { guard, send, gh, fail } from "./_lib.js";

export default async function handler(req, res) {
  if (!guard(req, res)) return;
  try {
    const files = (await gh("/contents/sites")) ?? [];
    const names = files.filter((f) => f.type === "file" && /\.json$/.test(f.name) && !/\.(known|review)\.json$/.test(f.name));
    const sites = await Promise.all(names.map(async (f) => {
      const s = JSON.parse(await gh(`/contents/sites/${encodeURIComponent(f.name)}`, { raw: true }));
      const latest = await gh(`/contents/reports/${encodeURIComponent(s.domain)}/latest/results.json`, { raw: true }).catch(() => null);
      let last = null;
      if (latest) {
        const r = JSON.parse(latest);
        last = { when: r.when, verdict: r.verdict, counts: r.counts, mode: r.mode };
      }
      return { domain: s.domain, name: s.name ?? s.domain, repo: s.repo ?? null, pages: s.pages ?? null, last };
    }));
    sites.sort((a, b) => a.name.localeCompare(b.name));
    send(res, 200, { sites });
  } catch (e) { fail(res, e); }
}
