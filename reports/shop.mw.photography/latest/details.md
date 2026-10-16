**Tested:** 22 pages in English and Hebrew · iPhone SE (375×667), iPhone 15 (393×852), Galaxy S23 (360×780), iPad Mini (768×1024), iPad Pro landscape (1366×1024), Laptop (1280×800), Desktop (1920×1080) · Chrome / Edge, Firefox, Safari (iPhone, Mac) · 25 links · 7 visitor journeys

**Visitor journeys that work:** Switching to Hebrew flips the page to right-to-left · The cart opens from the header and closes again · A buy button puts that product in the cart · My downloads shows the sign-in form, and Create account switches to the sign-up form · A missing page shows the 404 page with a way back · The sign-in form refuses an empty submit without calling the server

### Speed on a phone

| Page | Score | LCP | CLS | TBT |
|---|---|---|---|---|
| / | 73 | 12.6s | 0.02 | 0ms |
| /shop/ | 99 | 1.7s | 0.00 | 0ms |
| /presets/ | 70 | 15.5s | 0.01 | 37ms |
| /account/ | 84 | 3.8s | 0.01 | 0ms |

### High · not on the known list: The page isn't set up for phones
*Phones, tablets and browsers* · **Where:** /presets/, /panel/, /field-guides/, /presets/he/, /panel/he/, /field-guides/he/ · **Screens:** iPhone SE, iPhone 15, Galaxy S23, iPad Mini, iPad Pro landscape · **Browsers:** all browsers · **Language:** English, Hebrew

- `No viewport tag`

**Why it matters:** Without the viewport setting, phones show a shrunken desktop version that visitors have to pinch and zoom.

**What to change (Claude can fix this):** In the <head> of /presets/, /panel/, /field-guides/, /presets/he/, /panel/he/, /field-guides/he/, add:

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

*These pages are built from other files, so Claude makes the change at the source.*

### High · not on the known list: Visitors can see unfinished text
*Bugs and errors* · **Where:** /, /presets/, /panel/, /field-guides/, /presets/he/, /panel/he/, /field-guides/he/ · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** Hebrew, English

- `Shows a price of 0.00 (no price set for this product in the admin): "₪0.00"`
- `Shows a price of 0.00 (no price set for this product in the admin): "$0.00"`
- `Shows a price of 0.00 (no price set for this product in the admin): "· $0.00"`
- `Shows a price of 0.00 (no price set for this product in the admin): "· ₪0.00"`

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

### Medium: Elements must meet minimum color contrast ratio thresholds
*Accessibility* · **Where:** /presets/, /presets/he/ · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** English, Hebrew

- `Elements must meet minimum color contrast ratio thresholds (2 places: .lrp:nth-child(1) > .hd · .lrp:nth-child(3) > .hd)`

**Why it matters:** Some visitors can't use this part of the page: people using screen readers, keyboard only, zoom, or with low vision or colour blindness. Accessibility is also a legal requirement in many countries, including Israel's accessibility regulations for websites.

**What to change (Claude can fix this):** Element has insufficient color contrast of 3.16 (foreground color: #777777, background color: #2b2b2b, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1. See the guide for the exact fix. [Guide](https://dequeuniversity.com/rules/axe/4.13/color-contrast?application=playwright)

```
Example of what's affected:
<div class="hd">PRESETS</div>
```

### Medium: A file or server request failed
*Bugs and errors* · **Where:** /presets/, /presets/he/ · **Screens:** all screen sizes · **Browsers:** all browsers · **Language:** English, Hebrew

- `/presets/%7B%7Bcur.before%7D%7D answered 404 (image)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Medium: A file or server request failed
*Bugs and errors* · **Where:** /presets/, /presets/he/ · **Screens:** all screen sizes · **Browsers:** all browsers · **Language:** English, Hebrew

- `/presets/%7B%7Bcur.after%7D%7D answered 404 (image)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Medium: A file or server request failed
*Bugs and errors* · **Where:** /panel/, /panel/he/ · **Screens:** all screen sizes · **Browsers:** all browsers · **Language:** English, Hebrew

- `/panel/%7B%7Bcur.before%7D%7D answered 404 (image)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Medium: A file or server request failed
*Bugs and errors* · **Where:** /panel/, /panel/he/ · **Screens:** all screen sizes · **Browsers:** all browsers · **Language:** English, Hebrew

- `/panel/%7B%7Bcur.after%7D%7D answered 404 (image)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Medium: A file or server request failed
*Bugs and errors* · **Where:** /field-guides/, /field-guides/he/ · **Screens:** all screen sizes · **Browsers:** all browsers · **Language:** English, Hebrew

- `/field-guides/%7B%7Bcur.src%7D%7D answered 404 (image)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Medium: The main content appears late (LCP)
*Speed* · **Where:** /, /presets/, /account/ · **Screens:** Mid-range phone, 4G · **Browsers:** Chrome / Edge

- `12.6s (target under 2.5s)`
- `15.5s (target under 2.5s)`
- `3.8s (target under 2.5s)`

**Why it matters:** Largest Contentful Paint is when the biggest thing on screen (usually the hero image) appears. Google's target is under 2.5 seconds.

**What to change (Fixed automatically (the tool and Claude)):** Make the images smaller (resize to the size they're shown at, WebP or AVIF, about 80% quality), load images below the first screen with loading="lazy", and let the main image load first with fetchpriority="high". Biggest savings:

```
/assets/pages/img/8726daeb4a1c2551c37d43692b07fa4a.jpg  (could be ~376 KB smaller)
/assets/pages/img/8be22742a3e020062bfe042419b7e7f7.jpg  (could be ~277 KB smaller)
/assets/pages/img/07a726e1ad5390d3edaefb6d26df5150.jpg  (could be ~274 KB smaller)
/assets/pages/img/f424f86bc52a764b29bb6c0ea50eb225.jpg  (could be ~241 KB smaller)
/assets/pages/img/3c14b23dbb00f051684ad60fb205ed10.jpg  (could be ~228 KB smaller)
/assets/pages/img/8cb56471dbe5940badc7a93cad5c8bf1.jpg  (could be ~222 KB smaller)
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

### Medium: The page has no search description
*Search engines and sharing* · **Where:** /presets/, /panel/, /field-guides/, /presets/he/, /panel/he/, /field-guides/he/ · **Language:** English, Hebrew

- `No meta description`

**Why it matters:** The description is the grey text under the title in Google. Without one, Google picks random text from the page, which usually sells it badly.

**What to change (Claude can fix this):** In the <head> of /presets/, /panel/, /field-guides/, /presets/he/, /panel/he/, /field-guides/he/, add one or two sentences (70–160 characters) saying what the page offers:

```
<meta name="description" content="…">
```

*Claude writes the description from the page's own text; check the wording in the pull request.*

### Low: Heading levels should only increase by one
*Accessibility* · **Where:** /shop/, /account/, /support/, /thank-you/, /testers/, /read/, /shop/?cat=bundle, /product/ +3 more · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** English, Hebrew

- `Heading levels should only increase by one (1 place: div:nth-child(2) > h3)`

**Why it matters:** Some visitors can't use this part of the page: people using screen readers, keyboard only, zoom, or with low vision or colour blindness. Accessibility is also a legal requirement in many countries, including Israel's accessibility regulations for websites.

**What to change (Claude can fix this):** Heading order invalid. See the guide for the exact fix. [Guide](https://dequeuniversity.com/rules/axe/4.13/heading-order?application=playwright)

```
Example of what's affected:
<h3>Shop</h3>
```

### Low: All page content should be contained by landmarks
*Accessibility* · **Where:** /shop/, /product/?p=mwp-presets, /presets/, /panel/, /account/, /field-guides/, /support/, /legal/ +10 more · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** English, Hebrew

- `All page content should be contained by landmarks (1 place: .announce)`
- `All page content should be contained by landmarks (51 places: .hero-bg · .hero-copy · .band)`
- `All page content should be contained by landmarks (37 places: .hero-bg · .hero-copy · .stat:nth-child(1) > .n > .sr)`
- `All page content should be contained by landmarks (48 places: .hero-bg · .hero-copy · .stat:nth-child(1) > .n > .sr)`
- `All page content should be contained by landmarks (43 places: #top · .band · #inside > .wrap > .head.rv[data-fx="1"])`
- …and 1 more like this

**Why it matters:** Some visitors can't use this part of the page: people using screen readers, keyboard only, zoom, or with low vision or colour blindness. Accessibility is also a legal requirement in many countries, including Israel's accessibility regulations for websites.

**What to change (Claude can fix this):** Some page content is not contained by landmarks. See the guide for the exact fix. [Guide](https://dequeuniversity.com/rules/axe/4.13/region?application=playwright)

```
Example of what's affected:
<div class="announce">
```

### Low: Page should contain a level-one heading
*Accessibility* · **Where:** /product/?p=mwp-presets · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** English, Hebrew

- `Page should contain a level-one heading (1 place: html)`

**Why it matters:** Some visitors can't use this part of the page: people using screen readers, keyboard only, zoom, or with low vision or colour blindness. Accessibility is also a legal requirement in many countries, including Israel's accessibility regulations for websites.

**What to change (Claude can fix this):** Page must have a level-one heading. See the guide for the exact fix. [Guide](https://dequeuniversity.com/rules/axe/4.13/page-has-heading-one?application=playwright)

```
Example of what's affected:
<html lang="en" dir="ltr" class="">
```

### Low: Document should have one main landmark
*Accessibility* · **Where:** /admin/ · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** English

- `Document should have one main landmark (1 place: html)`

**Why it matters:** Some visitors can't use this part of the page: people using screen readers, keyboard only, zoom, or with low vision or colour blindness. Accessibility is also a legal requirement in many countries, including Israel's accessibility regulations for websites.

**What to change (Claude can fix this):** Document does not have a main landmark. See the guide for the exact fix. [Guide](https://dequeuniversity.com/rules/axe/4.13/landmark-one-main?application=playwright)

```
Example of what's affected:
<html lang="en" dir="ltr" class="">
```

### Low: A file or server request failed
*Bugs and errors* · **Where:** /, /shop/, /product/?p=mwp-presets, /account/, /support/, /legal/, /thank-you/, /beta/ +8 more · **Screens:** Laptop, iPhone 15 · **Browsers:** Safari (iPhone, Mac) · **Language:** English, Hebrew

> Reviewed: Safari's engine makes an extra request for the database library's parts at the wrong address. The library itself loads (no script fails, and every journey passes in Safari), so visitors aren't affected. Goes away when the library is copied into the site (see the security item about it).

- `/npm/@supabase/auth-js@2.118.0/+esm answered 404 (script)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Low: A file or server request failed
*Bugs and errors* · **Where:** /, /shop/, /product/?p=mwp-presets, /account/, /support/, /legal/, /thank-you/, /beta/ +8 more · **Screens:** Laptop, iPhone 15 · **Browsers:** Safari (iPhone, Mac) · **Language:** English, Hebrew

> Reviewed: Safari's engine makes an extra request for the database library's parts at the wrong address. The library itself loads (no script fails, and every journey passes in Safari), so visitors aren't affected. Goes away when the library is copied into the site (see the security item about it).

- `/npm/@supabase/realtime-js@2.118.0/+esm answered 404 (script)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Low: A file or server request failed
*Bugs and errors* · **Where:** /, /shop/, /product/?p=mwp-presets, /account/, /support/, /legal/, /thank-you/, /beta/ +8 more · **Screens:** Laptop, iPhone 15 · **Browsers:** Safari (iPhone, Mac) · **Language:** English, Hebrew

> Reviewed: Safari's engine makes an extra request for the database library's parts at the wrong address. The library itself loads (no script fails, and every journey passes in Safari), so visitors aren't affected. Goes away when the library is copied into the site (see the security item about it).

- `/npm/@supabase/storage-js@2.118.0/+esm answered 404 (script)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Low: A file or server request failed
*Bugs and errors* · **Where:** /, /shop/, /product/?p=mwp-presets, /account/, /support/, /legal/, /thank-you/, /beta/ +8 more · **Screens:** Laptop, iPhone 15 · **Browsers:** Safari (iPhone, Mac) · **Language:** English, Hebrew

> Reviewed: Safari's engine makes an extra request for the database library's parts at the wrong address. The library itself loads (no script fails, and every journey passes in Safari), so visitors aren't affected. Goes away when the library is copied into the site (see the security item about it).

- `/npm/@supabase/functions-js@2.118.0/+esm answered 404 (script)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Low: A file or server request failed
*Bugs and errors* · **Where:** /, /shop/, /product/?p=mwp-presets, /account/, /support/, /legal/, /thank-you/, /beta/ +8 more · **Screens:** Laptop, iPhone 15 · **Browsers:** Safari (iPhone, Mac) · **Language:** English, Hebrew

> Reviewed: Safari's engine makes an extra request for the database library's parts at the wrong address. The library itself loads (no script fails, and every journey passes in Safari), so visitors aren't affected. Goes away when the library is copied into the site (see the security item about it).

- `/npm/iceberg-js@0.8.1/+esm answered 404 (script)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Low: A file or server request failed
*Bugs and errors* · **Where:** /, /shop/, /product/?p=mwp-presets, /account/, /support/, /legal/, /thank-you/, /beta/ +8 more · **Screens:** Laptop, iPhone 15 · **Browsers:** Safari (iPhone, Mac) · **Language:** English, Hebrew

> Reviewed: Safari's engine makes an extra request for the database library's parts at the wrong address. The library itself loads (no script fails, and every journey passes in Safari), so visitors aren't affected. Goes away when the library is copied into the site (see the security item about it).

- `/npm/tslib@2.8.1/+esm answered 404 (script)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Low: A file or server request failed
*Bugs and errors* · **Where:** /, /shop/, /product/?p=mwp-presets, /account/, /support/, /legal/, /thank-you/, /beta/ +8 more · **Screens:** Laptop, iPhone 15 · **Browsers:** Safari (iPhone, Mac) · **Language:** English, Hebrew

> Reviewed: Safari's engine makes an extra request for the database library's parts at the wrong address. The library itself loads (no script fails, and every journey passes in Safari), so visitors aren't affected. Goes away when the library is copied into the site (see the security item about it).

- `/npm/@supabase/postgrest-js@2.118.0/+esm answered 404 (script)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

### Low: A file or server request failed
*Bugs and errors* · **Where:** /, /shop/, /product/?p=mwp-presets, /account/, /support/, /legal/, /thank-you/, /beta/ +8 more · **Screens:** Laptop, iPhone 15 · **Browsers:** Safari (iPhone, Mac) · **Language:** English, Hebrew

> Reviewed: Safari's engine makes an extra request for the database library's parts at the wrong address. The library itself loads (no script fails, and every journey passes in Safari), so visitors aren't affected. Goes away when the library is copied into the site (see the security item about it).

- `/npm/@supabase/phoenix@0.4.5/+esm answered 404 (script)`

**Why it matters:** The page asked for something (a script, style, image, font, or data from the server) and didn't get it. Missing scripts and styles break the page; missing data shows empty or wrong content.

**What to change (Claude can fix this):** Check the address listed. If the file moved or was renamed, update the link; if it's a server call, check the server function is deployed and working.

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

### Low: The page title is too short or too long
*Search engines and sharing* · **Where:** /product/?p=mwp-presets · **Language:** English, Hebrew

- `3 characters: "MWP"`

**Why it matters:** Google cuts titles over about 60 characters, and very short titles don't say enough to earn the click.

**What to change (Claude can fix this):** Give /product/?p=mwp-presets a specific title of 30–60 characters: what the page is, then the brand.

```
<title>Lightroom presets for wildlife photographers · Brand</title>
```

*Claude writes the new title; check the wording in the pull request.*

### Low: The page has no main heading
*Search engines and sharing* · **Where:** /product/?p=mwp-presets · **Language:** English, Hebrew

- `No <h1>`

**Why it matters:** The main heading (<h1>) tells search engines and screen-reader users what the page is about.

**What to change (Claude can fix this):** Make the main headline of /product/?p=mwp-presets an <h1>.

### Low: The page title is too short or too long
*Search engines and sharing* · **Where:** /presets/ · **Language:** English

- `11 characters: "MWP Presets"`

**Why it matters:** Google cuts titles over about 60 characters, and very short titles don't say enough to earn the click.

**What to change (Claude can fix this):** Give /presets/ a specific title of 30–60 characters: what the page is, then the brand.

```
<title>Lightroom presets for wildlife photographers · Brand</title>
```

*Claude writes the new title; check the wording in the pull request.*

### Low: The page doesn't name its main address
*Search engines and sharing* · **Where:** /presets/, /panel/, /field-guides/, /presets/he/, /panel/he/, /field-guides/he/ · **Language:** English, Hebrew

- `No canonical link`

**Why it matters:** Pages reachable at several addresses (with and without .html, with tracking codes) can be counted as duplicates by search engines.

**What to change (Claude can fix this):** In the <head> of each page, add a link to its own address. For /presets/:

```
<link rel="canonical" href="https://shop.mw.photography/presets/">
```

*These pages are built from other files, so Claude makes the change at the source.*

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

### Low: The page title is too short or too long
*Search engines and sharing* · **Where:** /support/, /support/?topic=download, /support/?topic=refund · **Language:** English

- `10 characters: "Help · MWP"`

**Why it matters:** Google cuts titles over about 60 characters, and very short titles don't say enough to earn the click.

**What to change (Claude can fix this):** Give /support/, /support/?topic=download, /support/?topic=refund a specific title of 30–60 characters: what the page is, then the brand.

```
<title>Lightroom presets for wildlife photographers · Brand</title>
```

*Claude writes the new title; check the wording in the pull request.*

### Low: The page title is too short or too long
*Search engines and sharing* · **Where:** /support/, /support/?topic=download, /support/?topic=refund · **Language:** Hebrew

- `10 characters: "עזרה · MWP"`

**Why it matters:** Google cuts titles over about 60 characters, and very short titles don't say enough to earn the click.

**What to change (Claude can fix this):** Give /support/, /support/?topic=download, /support/?topic=refund a specific title of 30–60 characters: what the page is, then the brand.

```
<title>Lightroom presets for wildlife photographers · Brand</title>
```

*Claude writes the new title; check the wording in the pull request.*

<!-- qa-results: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 -->
