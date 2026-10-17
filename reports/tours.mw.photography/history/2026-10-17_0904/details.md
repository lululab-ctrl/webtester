**Tested:** 5 pages in Main language · iPhone SE (375×667), iPhone 15 (393×852), Galaxy S23 (360×780), iPad Mini (768×1024), iPad Pro landscape (1366×1024), Laptop (1280×800), Desktop (1920×1080) · Chrome / Edge, Firefox, Safari (iPhone, Mac) · 5 links · 1 visitor journey

**Visitor journeys that work:** A missing page shows an error page with a way back

### Speed on a phone

| Page | Score | LCP | CLS | TBT |
|---|---|---|---|---|
| / | 86 | 4.0s | 0.09 | 0ms |

### Medium: A file or server request failed
*Bugs and errors* · **Where:** /iberian-lynx/, /pyrenees/, /iceland/, /manas-kaziranga/ · **Screens:** iPhone 15, Laptop · **Browsers:** Firefox, Safari (iPhone, Mac) · **Language:** Main language

- `https://uiydebfzuxnxjqcnrylv.supabase.co/auth/v1/signup answered 429 (fetch)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Medium: Browsers aren't told to always use the secure address
*Security* · **Where:** /, /manas-kaziranga/, /iberian-lynx/, /pyrenees/, /iceland/ · **Browsers:** live site

- `No Strict-Transport-Security header (GitHub Pages can't send custom headers; see the fix for the workaround or a host that can)`

**Why it matters:** Without HSTS, a visitor's very first request can be sent unencrypted and redirected by an attacker on public Wi-Fi.

**What to change (Needs you):** Make the host send this header on every page.

```
GitHub Pages can't send this header. Options:
1. Publish through Vercel or Netlify (both read headers from a file in the code), or
2. Put Cloudflare (free plan) in front of the domain and add the header there:
   Strict-Transport-Security: max-age=31536000; includeSubDomains
```

*This site is hosted on GitHub Pages, which can't send security headers. It needs a host change (or Cloudflare in front), which is a decision for you.*

### Medium: No Content Security Policy
*Security* · **Where:** /, /manas-kaziranga/, /iberian-lynx/, /pyrenees/, /iceland/ · **Browsers:** live site

- `No CSP header or meta tag (GitHub Pages can't send custom headers; see the fix for the workaround or a host that can)`

**Why it matters:** A CSP is a whitelist of where scripts may come from. If any bug ever lets someone inject a script, the CSP stops it from running. It's the main safety net against account-stealing attacks.

**What to change (Needs you):** Add a Content Security Policy. Start with the report-only version below, check nothing breaks for a week, then switch the name to Content-Security-Policy.

```
GitHub Pages can't send this header. Options:
1. Publish through Vercel or Netlify (both read headers from a file in the code), or
2. Put Cloudflare (free plan) in front of the domain and add the header there:
   Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-ancestors 'none'

Without header support, a CSP can also go in each page's <head>:
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:">
```

*This site is hosted on GitHub Pages, which can't send security headers. It needs a host change (or Cloudflare in front), which is a decision for you.*

### Medium: Other sites can embed this page invisibly
*Security* · **Where:** /, /manas-kaziranga/, /iberian-lynx/, /pyrenees/, /iceland/ · **Browsers:** live site

- `No X-Frame-Options or frame-ancestors (GitHub Pages can't send custom headers; see the fix for the workaround or a host that can)`

**Why it matters:** An attacker can load the page inside an invisible frame on their own site and trick visitors into clicking buttons ("clickjacking").

**What to change (Needs you):** Make the host send this header on every page.

```
GitHub Pages can't send this header. Options:
1. Publish through Vercel or Netlify (both read headers from a file in the code), or
2. Put Cloudflare (free plan) in front of the domain and add the header there:
   X-Frame-Options: DENY
```

*This site is hosted on GitHub Pages, which can't send security headers. It needs a host change (or Cloudflare in front), which is a decision for you.*

### Low: The main content appears late (LCP)
*Speed* · **Where:** / · **Screens:** Mid-range phone, 4G · **Browsers:** Chrome / Edge

- `4.0s (target under 2.5s)`

**Why it matters:** Largest Contentful Paint is when the biggest thing on screen (usually the hero image) appears. Google's target is under 2.5 seconds.

**What to change (Fixed automatically (the tool and Claude)):** Make the images smaller (resize to the size they're shown at, WebP or AVIF, about 80% quality), load images below the first screen with loading="lazy", and let the main image load first with fetchpriority="high".

```
<img src="hero.webp" fetchpriority="high" alt="…">
<img src="later.webp" loading="lazy" alt="…">
```

*The tool shrinks oversized images itself; Claude handles loading order (lazy-loading, deferring scripts).*

### Low: Missing X-Content-Type-Options
*Security* · **Where:** /, /manas-kaziranga/, /iberian-lynx/, /pyrenees/, /iceland/ · **Browsers:** live site

- `Missing (GitHub Pages can't send custom headers; see the fix for the workaround or a host that can)`

**Why it matters:** Without it, some browsers guess file types, which can turn an uploaded file into running code.

**What to change (Needs you):** Make the host send this header on every page.

```
GitHub Pages can't send this header. Options:
1. Publish through Vercel or Netlify (both read headers from a file in the code), or
2. Put Cloudflare (free plan) in front of the domain and add the header there:
   X-Content-Type-Options: nosniff
```

*This site is hosted on GitHub Pages, which can't send security headers. It needs a host change (or Cloudflare in front), which is a decision for you.*

### Low: No referrer policy
*Security* · **Where:** /, /manas-kaziranga/, /iberian-lynx/, /pyrenees/, /iceland/ · **Browsers:** live site

- `No Referrer-Policy header or meta tag`

**Why it matters:** Full page addresses (which can include sign-in tokens or order details) may be passed to other sites the visitor goes to.

**What to change (Fixed automatically by the tool):** In the <head> of every page, add:

```
<meta name="referrer" content="strict-origin-when-cross-origin">
```

### Low: A private page can appear in Google
*Search engines and sharing* · **Where:** /, /iceland/, /manas-kaziranga/, /iberian-lynx/, /pyrenees/ · **Language:** Main language

- `No noindex tag`

**Why it matters:** Pages like accounts, admin or link-only programs aren't meant to be found by searching.

**What to change (Fixed automatically by the tool):** In the <head> of /, /iceland/, /manas-kaziranga/, /iberian-lynx/, /pyrenees/, add:

```
<meta name="robots" content="noindex">
```

<!-- qa-results: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 -->
