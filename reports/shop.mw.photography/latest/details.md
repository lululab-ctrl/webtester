**Tested:** 22 pages in English and Hebrew · iPhone SE (375×667), iPhone 15 (393×852), Galaxy S23 (360×780), iPad Mini (768×1024), iPad Pro landscape (1366×1024), Laptop (1280×800), Desktop (1920×1080) · Chrome / Edge, Firefox, Safari (iPhone, Mac) · 25 links · 7 visitor journeys

**Visitor journeys that work:** Switching to Hebrew flips the page to right-to-left · The cart opens from the header and closes again · A buy button puts that product in the cart · My downloads shows the sign-in form, and Create account switches to the sign-up form · A missing page shows the 404 page with a way back · The sign-in form refuses an empty submit without calling the server

### Speed on a phone

| Page | Score | LCP | CLS | TBT |
|---|---|---|---|---|
| / | 90 | 3.5s | 0.02 | 0ms |
| /shop/ | 99 | 1.7s | 0.00 | 0ms |
| /presets/ | 86 | 4.1s | 0.00 | 0ms |
| /account/ | 96 | 2.4s | 0.00 | 0ms |

### High · not on the known list: Visitors can see unfinished text
*Bugs and errors* · **Where:** /, /presets/, /panel/, /field-guides/, /panel/he/, /presets/he/, /field-guides/he/ · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** Hebrew, English

- `Shows a price of 0.00 (no price set for this product in the admin): "₪0.00"`
- `Shows a price of 0.00 (no price set for this product in the admin): "$0.00"`
- `Shows a price of 0.00 (no price set for this product in the admin): "· $0.00"`
- `Shows a price of 0.00 (no price set for this product in the admin): "· ₪0.00"`

**Why it matters:** Notes meant for the team, filler text or template fields look unprofessional and make visitors doubt the shop is real or finished.

**What to change (Needs you):** Replace what's shown: Shows a price of 0.00 (no price set for this product in the admin): "₪0.00". Pages: /, /presets/, /panel/, /field-guides/, /panel/he/, /presets/he/ and 1 more.

*Content only you can supply (final text, image or price).*

### High · not on the known list: Visitors can see unfinished text
*Bugs and errors* · **Where:** /presets/, /panel/ · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** English

- `Shows a placeholder note: "PLACEHOLDER: the "after" here is Matan's finished edit. Replace with the same RAW edited on"`

**Why it matters:** Notes meant for the team, filler text or template fields look unprofessional and make visitors doubt the shop is real or finished.

**What to change (Needs you):** Replace what's shown: Shows a placeholder note: "PLACEHOLDER: the "after" here is Matan's finished edit. Replace with the same RAW edited on". Pages: /presets/, /panel/.

*Content only you can supply (final text, image or price).*

### High · not on the known list: Something a visitor does doesn't work
*Things visitors do* · **Where:** The shop page lists the products, and a product opens its own page · **Screens:** iPhone SE, Laptop · **Browsers:** all browsers

- `Step 2 (expectVisible #shop-grid .product-card) failed: locator.waitFor: Timeout 8000ms exceeded. · The page showed: "All products All products Search products Sort by Featured Newest Price: low to high Price: high to low 0 products The first products are being prepared. Check back soon."`
- `Step 2 (expectVisible #shop-grid .product-card) failed: locator.waitFor: Timeout 8000ms exceeded. · The page showed: "All products All products Search products Sort by 0 products The first products are being prepared. Check back soon."`

**Why it matters:** This is one of the site's key actions. If it fails here, it fails for real visitors too.

**What to change (Claude can fix this):** Follow the steps yourself: Step 2 (expectVisible #shop-grid .product-card) failed: locator.waitFor: Timeout 8000ms exceeded. · The page showed: "All products All products Search products Sort by Featured Newest Price: low to high Price: high to low 0 products The first products are being prepared. Check back soon."

### Medium: A file or server request failed
*Bugs and errors* · **Where:** /field-guides/he/ · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** Hebrew

- `/assets/pages/img/6a58bfaef578ead1b5e3a95d1a303169.jpg answered 503 (image)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Medium: The browser reports an error
*Bugs and errors* · **Where:** /product/ · **Screens:** iPhone 15, Laptop · **Browsers:** Firefox · **Language:** English, Hebrew

- `[JavaScript Error: "downloadable font: download failed (font-family: "Google Sans" style:normal weight:400..700 stretch:100 src index:0): status=2152398850 source: https://fonts.gstatic.com/s/googlesans/v71/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vgCI.woff2"]`

**Why it matters:** Errors in the browser console often mean something on the page didn't load or run as intended, even if the page looks fine at first glance.

**What to change (Claude can fix this):** Open the page, press F12 and read the Console tab. Fix the cause, or remove the code that triggers it if it's left over.

### Medium: The main content appears late (LCP)
*Speed* · **Where:** /, /presets/ · **Screens:** Mid-range phone, 4G · **Browsers:** Chrome / Edge

- `3.5s (target under 2.5s)`
- `4.1s (target under 2.5s)`

**Why it matters:** Largest Contentful Paint is when the biggest thing on screen (usually the hero image) appears. Google's target is under 2.5 seconds.

**What to change (Fixed automatically (the tool and Claude)):** Make the images smaller (resize to the size they're shown at, WebP or AVIF, about 80% quality), load images below the first screen with loading="lazy", and let the main image load first with fetchpriority="high". Biggest savings:

```
/assets/pages/img/1a2e3ed3f44db1f671babb09a599b29f.jpg  (could be ~196 KB smaller)
/assets/pages/img/8cb56471dbe5940badc7a93cad5c8bf1.jpg  (could be ~176 KB smaller)
/assets/pages/img/5275cc7bcd4fb7560d8f7163592e3122.jpg  (could be ~175 KB smaller)
/assets/pages/img/d5f6d2a7c84cc3346ef45e4922528351.jpg  (could be ~160 KB smaller)
/assets/pages/img/ce73f34a054f9959d99fd850c1df9ce5.jpg  (could be ~131 KB smaller)
/assets/pages/img/6d84bcea4206fe4c622103d7d3aea920.jpg  (could be ~107 KB smaller)
```

*The tool shrinks oversized images itself; Claude handles loading order (lazy-loading, deferring scripts).*

### Medium: Browsers aren't told to always use the secure address
*Security* · **Where:** /, /shop/, /product/?p=mwp-presets, /presets/, /panel/, /field-guides/ · **Browsers:** live site

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
*Security* · **Where:** /, /shop/, /product/?p=mwp-presets, /presets/, /panel/, /field-guides/ · **Browsers:** live site

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
*Security* · **Where:** /, /shop/, /product/?p=mwp-presets, /presets/, /panel/, /field-guides/ · **Browsers:** live site

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

### Low: Page should contain a level-one heading
*Accessibility* · **Where:** /product/?p=mwp-presets · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** English, Hebrew

- `Page should contain a level-one heading (1 place: html)`

**Why it matters:** Some visitors can't use this part of the page: people using screen readers, keyboard only, zoom, or with low vision or colour blindness. Accessibility is also a legal requirement in many countries, including Israel's accessibility regulations for websites.

**What to change (Claude can fix this):** Page must have a level-one heading. See the guide for the exact fix. [Guide](https://dequeuniversity.com/rules/axe/4.13/page-has-heading-one?application=playwright)

```
Example of what's affected:
<html lang="en" dir="ltr" class="">
```

### Low: Missing X-Content-Type-Options
*Security* · **Where:** /, /shop/, /product/?p=mwp-presets, /presets/, /panel/, /field-guides/ · **Browsers:** live site

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
*Security* · **Where:** /, /shop/, /product/?p=mwp-presets, /presets/, /panel/, /field-guides/ · **Browsers:** live site

- `No Referrer-Policy header or meta tag`

**Why it matters:** Full page addresses (which can include sign-in tokens or order details) may be passed to other sites the visitor goes to.

**What to change (Claude can fix this):** In the <head> of every page, add:

```
<meta name="referrer" content="strict-origin-when-cross-origin">
```

*These pages are built from other files, so Claude makes the change at the source.*

### Low: Search engines are told to stay away from the whole site
*Search engines and sharing* · **Where:** /robots.txt

- `robots.txt has "Disallow: /" for every search engine. Fine before launch (the settings say the site isn't launched yet); change it on launch day.`

**Why it matters:** robots.txt tells Google and others not to read any page, so the site won't appear in search results at all.

**What to change (Needs you):** Replace robots.txt with:

```
User-agent: *
Disallow:
Disallow: /admin/
Disallow: /account/
Disallow: /thank-you/
Disallow: /beta/
Disallow: /testers/
Disallow: /read/
Sitemap: https://shop.mw.photography/sitemap.xml
```

*Only at launch: it's your call when the site should appear in Google.*

### Low: Links to this page share without a preview
*Search engines and sharing* · **Where:** /shop/, /, /product/?p=mwp-presets, /support/, /legal/, /shop/?cat=bundle, /support/?topic=download, /support/?topic=refund · **Language:** Hebrew, English

- `Missing og:image`

**Why it matters:** When someone shares the page on WhatsApp, Facebook or LinkedIn, it appears as a bare link instead of a card with an image and title.

**What to change (Claude can fix this):** In the <head> of /shop/, /, /product/?p=mwp-presets, /support/, /legal/, /shop/?cat=bundle and 2 more, add share-preview tags (the image should be 1200×630):

```
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:image" content="https://shop.mw.photography/share.jpg">
<meta property="og:url" content="https://shop.mw.photography/shop/">
```

### Low: The page has no main heading
*Search engines and sharing* · **Where:** /product/?p=mwp-presets · **Language:** English, Hebrew

- `No <h1>`

**Why it matters:** The main heading (<h1>) tells search engines and screen-reader users what the page is about.

**What to change (Claude can fix this):** Make the main headline of /product/?p=mwp-presets an <h1>.

### Low: Links to this page share without a preview
*Search engines and sharing* · **Where:** /presets/, /panel/, /field-guides/, /panel/he/, /presets/he/, /field-guides/he/ · **Language:** English, Hebrew

- `Missing og:title, og:description, og:image`

**Why it matters:** When someone shares the page on WhatsApp, Facebook or LinkedIn, it appears as a bare link instead of a card with an image and title.

**What to change (Claude can fix this):** In the <head> of /presets/, /panel/, /field-guides/, /panel/he/, /presets/he/, /field-guides/he/, add share-preview tags (the image should be 1200×630):

```
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:image" content="https://shop.mw.photography/share.jpg">
<meta property="og:url" content="https://shop.mw.photography/presets/">
```

<!-- qa-results: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 -->
