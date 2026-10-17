**Tested:** 22 pages in English and Hebrew · iPhone SE (375×667), iPhone 15 (393×852), Galaxy S23 (360×780), iPad Mini (768×1024), iPad Pro landscape (1366×1024), Laptop (1280×800), Desktop (1920×1080) · Chrome / Edge, Firefox, Safari (iPhone, Mac) · 25 links · 7 visitor journeys

**Visitor journeys that work:** Switching to Hebrew flips the page to right-to-left · The cart opens from the header and closes again · A buy button puts that product in the cart · My downloads shows the sign-in form, and Create account switches to the sign-up form · A missing page shows the 404 page with a way back · The sign-in form refuses an empty submit without calling the server

### Speed on a phone

| Page | Score | LCP | CLS | TBT |
|---|---|---|---|---|
| / | 88 | 3.8s | 0.02 | 0ms |
| /shop/ | 77 | 1.7s | 0.57 | 1ms |
| /presets/ | 77 | 4.8s | 0.00 | 0ms |
| /account/ | 91 | 2.9s | 0.03 | 7ms |

### High · not on the known list: Visitors can see unfinished text
*Bugs and errors* · **Where:** /, /presets/, /panel/, /field-guides/, /presets/he/, /panel/he/, /field-guides/he/ · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** Hebrew, English

- `Shows a price of 0.00 (no price set for this product in the admin): "₪0.00"`
- `Shows a price of 0.00 (no price set for this product in the admin): "$0.00"`
- `Shows a price of 0.00 (no price set for this product in the admin): "· ₪0.00"`
- `Shows a price of 0.00 (no price set for this product in the admin): "· $0.00"`

**Why it matters:** Notes meant for the team, filler text or template fields look unprofessional and make visitors doubt the shop is real or finished.

**What to change (Needs you):** Replace what's shown: Shows a price of 0.00 (no price set for this product in the admin): "₪0.00". Pages: /, /presets/, /panel/, /field-guides/, /presets/he/, /panel/he/ and 1 more.

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

### Medium: The browser reports an error
*Bugs and errors* · **Where:** /product/ · **Screens:** iPhone 15, Laptop · **Browsers:** Firefox · **Language:** English, Hebrew

- `[JavaScript Error: "downloadable font: download failed (font-family: "Google Sans" style:normal weight:400..700 stretch:100 src index:0): status=2152398850 source: https://fonts.gstatic.com/s/googlesans/v71/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vgCI.woff2"]`

**Why it matters:** Errors in the browser console often mean something on the page didn't load or run as intended, even if the page looks fine at first glance.

**What to change (Claude can fix this):** Open the page, press F12 and read the Console tab. Fix the cause, or remove the code that triggers it if it's left over.

### Medium: The main content appears late (LCP)
*Speed* · **Where:** /, /presets/, /account/ · **Screens:** Mid-range phone, 4G · **Browsers:** Chrome / Edge

- `3.8s (target under 2.5s)`
- `4.8s (target under 2.5s)`
- `2.9s (target under 2.5s)`

**Why it matters:** Largest Contentful Paint is when the biggest thing on screen (usually the hero image) appears. Google's target is under 2.5 seconds.

**What to change (Fixed automatically (the tool and Claude)):** Make the images smaller (resize to the size they're shown at, WebP or AVIF, about 80% quality), load images below the first screen with loading="lazy", and let the main image load first with fetchpriority="high". Biggest savings:

```
/assets/pages/img/1a2e3ed3f44db1f671babb09a599b29f.jpg  (could be ~192 KB smaller)
/assets/pages/img/8cb56471dbe5940badc7a93cad5c8bf1.jpg  (could be ~176 KB smaller)
/assets/pages/img/5275cc7bcd4fb7560d8f7163592e3122.jpg  (could be ~175 KB smaller)
/assets/pages/img/d5f6d2a7c84cc3346ef45e4922528351.jpg  (could be ~160 KB smaller)
/assets/pages/img/ce73f34a054f9959d99fd850c1df9ce5.jpg  (could be ~131 KB smaller)
/assets/pages/img/6d84bcea4206fe4c622103d7d3aea920.jpg  (could be ~107 KB smaller)
```

*The tool shrinks oversized images itself; Claude handles loading order (lazy-loading, deferring scripts).*

### Medium: The page jumps around while loading (CLS)
*Speed* · **Where:** /shop/ · **Screens:** Mid-range phone, 4G · **Browsers:** Chrome / Edge

- `0.57 (target under 0.1)`

**Why it matters:** Content shifting as it loads makes visitors tap the wrong thing. Google's target is under 0.1.

**What to change (Fixed automatically (the tool and Claude)):** Give every image and embed a width and height (or CSS aspect-ratio) so the page doesn't jump while loading.

```
<img src="photo.jpg" width="1600" height="1000" alt="…">
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
*Search engines and sharing* · **Where:** /shop/, /, /product/?p=mwp-presets, /support/, /legal/, /shop/?cat=bundle, /support/?topic=download, /support/?topic=refund · **Language:** English, Hebrew

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
*Search engines and sharing* · **Where:** /presets/, /panel/, /field-guides/, /presets/he/, /panel/he/, /field-guides/he/ · **Language:** English, Hebrew

- `Missing og:title, og:description, og:image`

**Why it matters:** When someone shares the page on WhatsApp, Facebook or LinkedIn, it appears as a bare link instead of a card with an image and title.

**What to change (Claude can fix this):** In the <head> of /presets/, /panel/, /field-guides/, /presets/he/, /panel/he/, /field-guides/he/, add share-preview tags (the image should be 1200×630):

```
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:image" content="https://shop.mw.photography/share.jpg">
<meta property="og:url" content="https://shop.mw.photography/presets/">
```

<!-- qa-results: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 -->
