**Tested:** 5 pages in Main language · iPhone SE (375×667), iPhone 15 (393×852), Galaxy S23 (360×780), iPad Mini (768×1024), iPad Pro landscape (1366×1024), Laptop (1280×800), Desktop (1920×1080) · Chrome / Edge, Firefox, Safari (iPhone, Mac) · 5 links · 1 visitor journey

**Visitor journeys that work:** A missing page shows an error page with a way back

### Speed on a phone

| Page | Score | LCP | CLS | TBT |
|---|---|---|---|---|
| / | 80 | 4.0s | 0.17 | 0ms |

### High · not on the known list: Certain ARIA roles must contain particular children
*Accessibility* · **Where:** / · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** Main language

- `Certain ARIA roles must contain particular children (1 place: #list)`

**Why it matters:** Some visitors can't use this part of the page: people using screen readers, keyboard only, zoom, or with low vision or colour blindness. Accessibility is also a legal requirement in many countries, including Israel's accessibility regulations for websites.

**What to change (Needs you):** Element has children which are not allowed: li. See the guide for the exact fix. [Guide](https://dequeuniversity.com/rules/axe/4.13/aria-required-children?application=playwright)

```
Example of what's affected:
<ul class="list scroll more-below" id="list" role="listbox" style="max-height: 256px;">
```

*Needs the site's code. Add the code repository to this site's settings to let Claude fix it.*

### High · not on the known list: Certain ARIA roles must be contained by particular parents
*Accessibility* · **Where:** / · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** Main language

- `Certain ARIA roles must be contained by particular parents (4 places: #o0 · #o1 · #o2)`

**Why it matters:** Some visitors can't use this part of the page: people using screen readers, keyboard only, zoom, or with low vision or colour blindness. Accessibility is also a legal requirement in many countries, including Israel's accessibility regulations for websites.

**What to change (Needs you):** Required ARIA parents role not present: group, listbox. See the guide for the exact fix. [Guide](https://dequeuniversity.com/rules/axe/4.13/aria-required-parent?application=playwright)

```
Example of what's affected:
<a class="opt" id="o0" role="option" aria-selected="false" href="manas-kaziranga/">
```

*Needs the site's code. Add the code repository to this site's settings to let Claude fix it.*

### Medium: <li> elements must be contained in a <ul> or <ol>
*Accessibility* · **Where:** / · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** Main language

- `<li> elements must be contained in a <ul> or <ol> (4 places: li:nth-child(1) · li:nth-child(2) · li:nth-child(3))`

**Why it matters:** Some visitors can't use this part of the page: people using screen readers, keyboard only, zoom, or with low vision or colour blindness. Accessibility is also a legal requirement in many countries, including Israel's accessibility regulations for websites.

**What to change (Needs you):** List item parent element has a role that is not role="list". See the guide for the exact fix. [Guide](https://dequeuniversity.com/rules/axe/4.13/listitem?application=playwright)

```
Example of what's affected:
<li>
```

*Needs the site's code. Add the code repository to this site's settings to let Claude fix it.*

### Medium: A file or server request failed
*Bugs and errors* · **Where:** /iberian-lynx/, /pyrenees/, /iceland/, /manas-kaziranga/ · **Screens:** iPhone 15, Laptop · **Browsers:** Firefox, Safari (iPhone, Mac) · **Language:** Main language

- `https://uiydebfzuxnxjqcnrylv.supabase.co/auth/v1/signup answered 429 (fetch)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Needs you):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

*Needs the site's code. Add the code repository to this site's settings to let Claude fix it.*

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

### Medium: The page has no search description
*Search engines and sharing* · **Where:** /, /iberian-lynx/, /iceland/, /manas-kaziranga/, /pyrenees/ · **Language:** Main language

- `No meta description`

**Why it matters:** The description is the grey text under the title in Google. Without one, Google picks random text from the page, which usually sells it badly.

**What to change (Needs you):** In the <head> of /, /iberian-lynx/, /iceland/, /manas-kaziranga/, /pyrenees/, add one or two sentences (70–160 characters) saying what the page offers:

```
<meta name="description" content="…">
```

### Low: The main content appears late (LCP)
*Speed* · **Where:** / · **Screens:** Mid-range phone, 4G · **Browsers:** Chrome / Edge

- `4.0s (target under 2.5s)`

**Why it matters:** Largest Contentful Paint is when the biggest thing on screen (usually the hero image) appears. Google's target is under 2.5 seconds.

**What to change (Needs you):** Make the images smaller (resize to the size they're shown at, WebP or AVIF, about 80% quality), load images below the first screen with loading="lazy", and let the main image load first with fetchpriority="high".

```
<img src="hero.webp" fetchpriority="high" alt="…">
<img src="later.webp" loading="lazy" alt="…">
```

### Low: The page jumps around while loading (CLS)
*Speed* · **Where:** / · **Screens:** Mid-range phone, 4G · **Browsers:** Chrome / Edge

- `0.17 (target under 0.1)`

**Why it matters:** Content shifting as it loads makes visitors tap the wrong thing. Google's target is under 0.1.

**What to change (Needs you):** Give every image and embed a width and height (or CSS aspect-ratio) so the page doesn't jump while loading.

```
<img src="photo.jpg" width="1600" height="1000" alt="…">
```

### Low: A script from another company's server isn't locked to a version
*Security* · **Where:** /iberian-lynx/

- `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js (version not pinned: updates automatically)`

**Why it matters:** If that server is ever hacked or the library publishes a bad update, the changed code runs on your site with your visitors' sessions.

**What to change (Needs you):** Copy the library into the site (or pin its exact version and add an integrity hash) instead of loading a version that updates itself.

```
<script src="https://cdn.example.com/lib@1.2.3/lib.min.js" integrity="sha384-…" crossorigin="anonymous"></script>
```

*Needs the site's code. Add the code repository to this site's settings to let Claude fix it.*

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

**What to change (Needs you):** In the <head> of every page, add:

```
<meta name="referrer" content="strict-origin-when-cross-origin">
```

*Needs the site's code. Add the code repository to this site's settings and this is fixed automatically.*

### Low: The page doesn't name its main address
*Search engines and sharing* · **Where:** /, /iberian-lynx/, /iceland/, /manas-kaziranga/, /pyrenees/ · **Language:** Main language

- `No canonical link`

**Why it matters:** Pages reachable at several addresses (with and without .html, with tracking codes) can be counted as duplicates by search engines.

**What to change (Needs you):** In the <head> of each page, add a link to its own address. For /:

```
<link rel="canonical" href="https://tours.mw.photography/">
```

*Needs the site's code. Add the code repository to this site's settings and this is fixed automatically.*

### Low: Links to this page share without a preview
*Search engines and sharing* · **Where:** /, /iberian-lynx/, /iceland/, /manas-kaziranga/, /pyrenees/ · **Language:** Main language

- `Missing og:title, og:description, og:image`

**Why it matters:** When someone shares the page on WhatsApp, Facebook or LinkedIn, it appears as a bare link instead of a card with an image and title.

**What to change (Needs you):** In the <head> of /, /iberian-lynx/, /iceland/, /manas-kaziranga/, /pyrenees/, add share-preview tags (the image should be 1200×630):

```
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:image" content="https://tours.mw.photography/share.jpg">
<meta property="og:url" content="https://tours.mw.photography/">
```

*Needs the site's code. Add the code repository to this site's settings to let Claude fix it.*

### Low: The page title is too short or too long
*Search engines and sharing* · **Where:** /iberian-lynx/ · **Language:** Main language

- `12 characters: "השונר האיברי"`

**Why it matters:** Google cuts titles over about 60 characters, and very short titles don't say enough to earn the click.

**What to change (Needs you):** Give /iberian-lynx/ a specific title of 30–60 characters: what the page is, then the brand.

```
<title>Lightroom presets for wildlife photographers · Brand</title>
```

### Low: The page title is too short or too long
*Search engines and sharing* · **Where:** /manas-kaziranga/ · **Language:** Main language

- `14 characters: "מאנאס וקזירנגה"`

**Why it matters:** Google cuts titles over about 60 characters, and very short titles don't say enough to earn the click.

**What to change (Needs you):** Give /manas-kaziranga/ a specific title of 30–60 characters: what the page is, then the brand.

```
<title>Lightroom presets for wildlife photographers · Brand</title>
```

<!-- qa-results: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 -->
