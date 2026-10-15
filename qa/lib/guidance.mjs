// For every issue: who can fix it, and exactly what to change.
//   fixBy "built-in": a mechanical fix the tool applies itself, then re-tests (qa/fix.mjs)
//   fixBy "claude":   Claude attempts it in the fix run, then the tool re-tests
//   fixBy "you":      needs a person (a decision, an account, content or a design) — the change is spelled out
// "change" is the exact edit, as text and, where it helps, a code snippet.

const hostOf = (headers = []) => {
  const s = headers.map((h) => (h.server ?? "").toLowerCase()).join(" ");
  if (s.includes("vercel")) return "vercel";
  if (s.includes("netlify")) return "netlify";
  if (s.includes("github")) return "github-pages";
  if (s.includes("cloudflare")) return "cloudflare";
  return "unknown";
};

const HEADERS = {
  "header-hsts": ["Strict-Transport-Security", "max-age=31536000; includeSubDomains"],
  "header-csp": ["Content-Security-Policy-Report-Only", "default-src 'self'; script-src 'self' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-ancestors 'none'"],
  "header-frame": ["X-Frame-Options", "DENY"],
  "header-nosniff": ["X-Content-Type-Options", "nosniff"],
};

function headerChange(rule, host) {
  const [name, value] = HEADERS[rule];
  const snippets = {
    vercel: `// vercel.json (in the site's code)\n{\n  "headers": [\n    { "source": "/(.*)", "headers": [ { "key": "${name}", "value": "${value}" } ] }\n  ]\n}`,
    netlify: `# _headers (in the published folder)\n/*\n  ${name}: ${value}`,
    cloudflare: `Cloudflare dashboard → Rules → Transform Rules → Modify Response Header → Add:\n${name}: ${value}`,
    "github-pages": `GitHub Pages can't send this header. Options:\n1. Publish through Vercel or Netlify (both read headers from a file in the code), or\n2. Put Cloudflare (free plan) in front of the domain and add the header there:\n   ${name}: ${value}`,
    unknown: `Add this response header in your host's settings:\n${name}: ${value}`,
  };
  const meta = rule === "header-csp" ? `\n\nWithout header support, a CSP can also go in each page's <head>:\n<meta http-equiv="Content-Security-Policy" content="${value.replace(/; frame-ancestors 'none'/, "")}">` : "";
  return snippets[host] + meta;
}

export function attachGuidance(issues, site, { headers = [], root = null } = {}) {
  const host = hostOf(headers);
  const hasCode = !!(site.repo || root);
  const claudeOrYou = (why) => (hasCode ? { fixBy: "claude" } : { fixBy: "you", fixNote: why ?? "Needs the site's code. Add the code repository to this site's settings to let Claude fix it." });
  // Page files the site builds from other files can't be edited directly: Claude fixes their source instead.
  const globs = (site.generated ?? []).map((g) => new RegExp("^" + g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "§").replace(/\*/g, "[^/]*").replace(/§/g, ".*") + "$"));
  const editable = !(site.build && !site.sourceDir);
  const pageGenerated = (p) => { const f = p.split("?")[0].replace(/^\//, "").replace(/\/$/, "/index.html").replace(/^$/, "index.html"); return globs.some((re) => re.test(f)); };
  const builtinOrYou = (i) => {
    if (!hasCode) return { fixBy: "you", fixNote: "Needs the site's code. Add the code repository to this site's settings and this is fixed automatically." };
    if (!editable || (i && i.pages.length && i.pages.every(pageGenerated))) return { fixBy: "claude", fixNote: "These pages are built from other files, so Claude makes the change at the source." };
    return { fixBy: "built-in" };
  };
  const pages = (i) => i.pages.slice(0, 6).join(", ") + (i.pages.length > 6 ? ` and ${i.pages.length - 6} more` : "");
  const lang = site.languages?.[0]?.code ?? "en";

  for (const i of issues) {
    let g;
    switch (i.rule) {
      case "viewport-missing":
        g = { ...builtinOrYou(i), change: `In the <head> of ${pages(i)}, add:`, snippet: `<meta name="viewport" content="width=device-width, initial-scale=1">` }; break;
      case "lang-missing":
        g = { ...builtinOrYou(i), change: `On ${pages(i)}, set the language on the <html> tag:`, snippet: `<html lang="${lang}">` }; break;
      case "canonical-missing":
        g = { ...builtinOrYou(i), change: `In the <head> of each page, add a link to its own address. For ${i.pages[0]}:`, snippet: `<link rel="canonical" href="${site.liveUrl}${(i.pages[0] ?? "/").split("?")[0]}">` }; break;
      case "private-page-indexable":
        g = { ...builtinOrYou(i), change: `In the <head> of ${pages(i)}, add:`, snippet: `<meta name="robots" content="noindex">` }; break;
      case "header-referrer":
        g = { ...builtinOrYou(i), change: "In the <head> of every page, add:", snippet: `<meta name="referrer" content="strict-origin-when-cross-origin">` }; break;
      case "mixed-content": case "insecure-form":
        g = { ...builtinOrYou(i), change: `Change these addresses from http:// to https://: ${i.details.slice(0, 3).join(", ")}` }; break;
      case "dependency-vuln":
        g = { ...builtinOrYou(i), change: `Update the library: ${i.details.slice(0, 3).join("; ")}`, snippet: "npm audit fix" }; break;
      case "perf-score": case "perf-lcp": case "perf-tbt": case "perf-cls": {
        const imgs = (i.heavy ?? []).slice(0, 6).map((h) => `${h.url}  (could be ~${h.savingKb} KB smaller)`).join("\n");
        g = {
          fixBy: hasCode ? "built-in + claude" : "you",
          fixNote: hasCode ? "The tool shrinks oversized images itself; Claude handles loading order (lazy-loading, deferring scripts)." : undefined,
          change: i.rule === "perf-cls" ? "Give every image and embed a width and height (or CSS aspect-ratio) so the page doesn't jump while loading."
            : i.rule === "perf-tbt" ? "Load scripts that aren't needed straight away with defer (or type=\"module\"), and remove unused ones."
            : `Make the images smaller (resize to the size they're shown at, WebP or AVIF, about 80% quality), load images below the first screen with loading="lazy", and let the main image load first with fetchpriority="high".${imgs ? " Biggest savings:" : ""}`,
          snippet: i.rule === "perf-cls" ? `<img src="photo.jpg" width="1600" height="1000" alt="…">` : imgs || `<img src="hero.webp" fetchpriority="high" alt="…">\n<img src="later.webp" loading="lazy" alt="…">`,
        }; break;
      }
      case "header-hsts": case "header-csp": case "header-frame": case "header-nosniff":
        g = {
          fixBy: hasCode && ["vercel", "netlify"].includes(host) ? "claude" : "you",
          fixNote: host === "github-pages" ? "This site is hosted on GitHub Pages, which can't send security headers. It needs a host change (or Cloudflare in front), which is a decision for you." : host === "unknown" ? "Set in the hosting company's settings." : undefined,
          change: i.rule === "header-csp" ? "Add a Content Security Policy. Start with the report-only version below, check nothing breaks for a week, then switch the name to Content-Security-Policy." : `Make the host send this header on every page.`,
          snippet: headerChange(i.rule, host),
        }; break;
      case "robots-blocks-all":
        g = { fixBy: "you", fixNote: "Only at launch: it's your call when the site should appear in Google.", change: "Replace robots.txt with:", snippet: `User-agent: *\nDisallow:\n${(site.searchEngines?.private ?? []).map((p) => `Disallow: ${p}`).join("\n")}\nSitemap: ${site.liveUrl}/sitemap.xml`.replace(/\n\n/g, "\n") }; break;
      case "visible-placeholder":
        g = { fixBy: "you", fixNote: "Content only you can supply (final text, image or price).", change: `Replace what's shown: ${i.details[0]}. Pages: ${pages(i)}.` }; break;
      case "secret-exposed":
        g = { fixBy: "you", fixNote: "Revoking a key can only be done in the service's own dashboard. Claude can then remove it from the code.", change: "1) In the service that issued it, revoke (delete) this key and create a new one. 2) Put the new key only in GitHub Secrets / the host's settings. 3) Remove it from the site's files.", snippet: i.details[0] }; break;
      case "title-missing": case "title-length": case "title-duplicate":
        g = { ...claudeOrYou(), fixNote: hasCode ? "Claude writes the new title; check the wording in the pull request." : undefined, change: `Give ${pages(i)} a specific title of 30–60 characters: what the page is, then the brand.`, snippet: `<title>Lightroom presets for wildlife photographers · Brand</title>` }; break;
      case "description-missing":
        g = { ...claudeOrYou(), fixNote: hasCode ? "Claude writes the description from the page's own text; check the wording in the pull request." : undefined, change: `In the <head> of ${pages(i)}, add one or two sentences (70–160 characters) saying what the page offers:`, snippet: `<meta name="description" content="…">` }; break;
      case "social-preview-missing":
        g = { ...claudeOrYou(), change: `In the <head> of ${pages(i)}, add share-preview tags (the image should be 1200×630):`, snippet: `<meta property="og:title" content="…">\n<meta property="og:description" content="…">\n<meta property="og:image" content="${site.liveUrl}/share.jpg">\n<meta property="og:url" content="${site.liveUrl}${i.pages[0]?.split("?")[0] ?? "/"}">` }; break;
      case "h1-missing": case "h1-multiple":
        g = { ...claudeOrYou(), change: i.rule === "h1-missing" ? `Make the main headline of ${pages(i)} an <h1>.` : `Keep one <h1> on ${pages(i)} and turn the others into <h2>.` }; break;
      case "a11y":
        g = { ...claudeOrYou(), change: `${i.fixHint ? i.fixHint.replace(/^Fix (any|all) of the following:\s*/i, "") + ". " : ""}See the guide for the exact fix.`, snippet: i.snippets?.[0] ? `Example of what's affected:\n${i.snippets[0]}` : undefined }; break;
      case "horizontal-scroll":
        g = { ...claudeOrYou(), change: "Stop the widest part from overflowing the screen. Usually one of these CSS rules on that element:", snippet: `max-width: 100%;\noverflow-wrap: anywhere;   /* long words or links */\nimg, video { max-width: 100%; height: auto; }` }; break;
      case "flow-failed":
        g = { ...claudeOrYou(), change: `Follow the steps yourself: ${i.details[0]}` }; break;
      case "script-no-integrity":
        g = { ...claudeOrYou(), change: "Copy the library into the site (or pin its exact version and add an integrity hash) instead of loading a version that updates itself.", snippet: `<script src="https://cdn.example.com/lib@1.2.3/lib.min.js" integrity="sha384-…" crossorigin="anonymous"></script>` }; break;
      case "code-review":
        g = { fixBy: i.severity === "Critical" || i.severity === "High" ? "you" : "claude", fixNote: "Security changes to how accounts or payments work need an owner's decision; Claude prepares the change for review.", change: i.fix }; break;
      default:
        g = { ...claudeOrYou(), change: i.fix };
    }
    Object.assign(i, g);
  }
}
