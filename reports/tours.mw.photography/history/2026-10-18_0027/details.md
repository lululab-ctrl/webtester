**Tested:** 5 pages in Main language · iPhone SE (375×667), iPad Mini (768×1024), Laptop (1280×800) · Chrome / Edge · 5 links · 1 visitor journey

**Visitor journeys that work:** A missing page shows an error page with a way back

### Medium: Browsers aren't told to always use the secure address
*Security* · **Where:** /, /manas-kaziranga/, /iberian-lynx/, /pyrenees/, /iceland/ · **Browsers:** all browsers

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
*Security* · **Where:** /, /manas-kaziranga/, /iberian-lynx/, /pyrenees/, /iceland/ · **Browsers:** all browsers

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
*Security* · **Where:** /, /manas-kaziranga/, /iberian-lynx/, /pyrenees/, /iceland/ · **Browsers:** all browsers

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

### Low: Missing X-Content-Type-Options
*Security* · **Where:** /, /manas-kaziranga/, /iberian-lynx/, /pyrenees/, /iceland/ · **Browsers:** all browsers

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

### Low: A private page can appear in Google
*Search engines and sharing* · **Where:** /, /iceland/, /iberian-lynx/, /pyrenees/, /manas-kaziranga/ · **Language:** Main language

- `No noindex tag`

**Why it matters:** Pages like accounts, admin or link-only programs aren't meant to be found by searching.

**What to change (Fixed automatically by the tool):** In the <head> of /, /iceland/, /iberian-lynx/, /pyrenees/, /manas-kaziranga/, add:

```
<meta name="robots" content="noindex">
```

<!-- qa-results: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 -->
