# Site QA

Tests any website the way a QA team would, explains every problem in plain English, and fixes what it safely can. Every fix is re-tested before it's kept.

## How to use it

### 1. Add a website, or pick one you already have
The list of websites is in **[SITES.md](SITES.md)**, with each site's latest result.

To add one or change one: **Actions → Add or edit a website → Run workflow**.
- **Domain**: e.g. `tours.mw.photography`. That's all a new site needs.
- **Code repository** (optional): `owner/name` on GitHub. Without it, the tool tests and explains. With it, the tool can also fix.
- **Changing a domain**: put the new one in *Domain* and the current one in *Old domain*. Its settings, known issues and past reports move with it.
- **Key pages** (optional): pages to always test. Others are found by following links.

### 2–3. Test it
**Actions → Test a website → Run workflow**, then type the domain.
- *Full* tests every page in Chrome, Firefox and Safari on 7 screen sizes, from a small iPhone to a big desktop (about 10 minutes).
- *Quick* tests in Chrome on 3 screen sizes (about 3 minutes).
- A domain that isn't in the list yet is added automatically.

### 4. Read the results
Open the run. Its page shows every issue, sorted by severity, each with:
- **where**: pages, screens, browsers, language
- **what was seen**
- **why it matters**
- **what to change**: the exact edit, often as a code snippet, and who can make it (the tool, Claude, or you)

The same report is saved under `reports/<domain>/`. The version with screenshots is attached to the run as **report-…** (download, unzip, open `report.html`).

| Level | Meaning |
|---|---|
| Critical | Fix today. Real harm is possible right now. |
| High | Fix before the next release. Visitors or data are affected. |
| Medium | Fix soon. It hurts some visitors, sales or search ranking. |
| Low | Polish. |

### 5. Fix automatically
Tick **Fix** when you run *Test a website*. The site needs a code repository and the two keys from *Setup* below. The tool then works through four stages:

1. **Tests the site's code** to get a starting point.
2. **Built-in fixes**: mechanical repairs that don't need judgement.
   - phone setup (viewport), page language, canonical addresses, noindex on private pages
   - referrer policy, http→https links, library security updates
   - shrinking oversized images (same names and formats, so nothing else changes)
3. **Claude fixes the rest** that's safe to change, such as:
   - script errors, broken links and images, layout overflow on phones
   - accessibility, missing titles and descriptions
   - loading speed, and security headers where the host supports them
4. **Final test**, compared with the starting point.

After **each** fix, the affected pages are tested again. A fix is kept only if the problem is gone and nothing new appeared at Critical, High or Medium level. Otherwise it's undone automatically.

If the final test finds no new serious problems, the fixes arrive as a **draft pull request** on the website's repository. Nothing goes live until someone reviews it and merges it.

**Never changed automatically:**
- prices, payments, refunds or legal terms
- customer emails
- how sign-in and accounts work
- database changes, secrets and deploy settings
- marketing text, other than page titles, descriptions and image descriptions (which are flagged for review)

These come back as **Needs you**, with the exact change to make.

## Setup (once)

Add two keys under **Settings → Secrets and variables → Actions → New repository secret**:

| Name | What it is | Where to get it |
|---|---|---|
| `ANTHROPIC_API_KEY` | Lets Claude make fixes. Billed per use, usually a few dollars per fix run. Without it, only built-in fixes run. | console.anthropic.com → API keys |
| `SITES_TOKEN` | Lets the tool read your sites' code and open pull requests there. | github.com → Settings → Developer settings → Fine-grained tokens → Generate. Repository access: the sites' repositories. Permissions: **Contents: Read and write**, **Pull requests: Read and write**. |

## Settings per site (optional)

Each site has a file `sites/<domain>.json`. Anything left out uses `qa/defaults.json`. Useful extras:

- `languages`: other languages and how the site chooses them. For example, `localStorage` values, plus `expectDir: "rtl"` for Hebrew.
- `flows`: key visitor journeys, written as steps: `goto`, `click`, `fill`, `expectVisible`, `expectHidden`, `expectText`, `expectAttr`, `expectUrlContains`. These run on the real website, so they must never place an order, send a message or create an account.
- `contentRules`: text that must never show, e.g. a price of 0.00.
- `searchEngines.private`: pages that must stay out of Google. `launched: false` makes "robots.txt blocks Google" a low-level note.
- `generated`: files built by a script. The built-in fixes leave those alone, and Claude fixes the script instead.
- `fixNotes`: instructions for Claude about this site.
- `downgrade`: a reviewed exception, with the reason shown in the report.

**Known issues:** `sites/<domain>.known.json` lists serious issues you've accepted for now. They're still reported, but don't mark the run as failed.

**Code security reviews:** findings from reading the code (e.g. by Claude) can go in `sites/<domain>.review.json` and appear in the report. Keep this repository **private** for that reason.

## On a computer

```bash
npm ci --prefix qa && (cd qa && npx playwright install --with-deps)
node qa/run.mjs --site tours.mw.photography                 # test the live site
node qa/run.mjs --site shop.mw.photography --root ../shop   # test the code before publishing
node qa/fix.mjs --site shop.mw.photography --root ../shop --results reports/shop.mw.photography/latest/results.json --log fixes.json
```
