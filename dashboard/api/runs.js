// GET ?domain= → recent runs (all, or one website's), with their stage and any pull request opened.
import { guard, send, gh, fail, normalizeDomain } from "./_lib.js";

const STAGE = {
  "Test the live website": "Testing",
  "Fix and re-test each fix (no write access)": "Fixing",
  "Final test on a fresh machine (no write access)": "Final check",
  "Open the pull request and save the reports": "Saving",
};

export default async function handler(req, res) {
  if (!guard(req, res)) return;
  const url = new URL(req.url, "http://x");
  const domain = url.searchParams.get("domain") ? normalizeDomain(url.searchParams.get("domain")) : null;
  try {
    const data = await gh("/actions/runs?per_page=30&event=workflow_dispatch");
    let runs = (data?.workflow_runs ?? []).map((r) => ({
      id: r.id, title: r.display_title, workflow: r.name, status: r.status, conclusion: r.conclusion,
      started: r.run_started_at ?? r.created_at, updated: r.updated_at, url: r.html_url,
    }));
    if (domain) runs = runs.filter((r) => r.title.split(/\s+/).includes(domain));
    // For the few newest unfinished or fix runs, add which stage they're at and the pull request link.
    await Promise.all(runs.slice(0, 6).map(async (r) => {
      if (r.status !== "completed" || /and fix$/.test(r.title)) {
        const jobs = await gh(`/actions/runs/${r.id}/jobs`).catch(() => null);
        const js = jobs?.jobs ?? [];
        const active = js.find((j) => j.status === "in_progress") ?? js.find((j) => j.status === "queued");
        r.stage = active ? STAGE[active.name] ?? active.name : null;
        r.fixSkipped = js.some((j) => j.name.startsWith("Fix") && j.conclusion === "skipped");
      }
    }));
    send(res, 200, { runs: runs.slice(0, 20) });
  } catch (e) { fail(res, e); }
}
