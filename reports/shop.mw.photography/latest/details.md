**Tested:** 22 pages in English and Hebrew · iPhone SE (375×667), iPhone 15 (393×852), Galaxy S23 (360×780), iPad Mini (768×1024), iPad Pro landscape (1366×1024), Laptop (1280×800), Desktop (1920×1080) · Chrome / Edge, Firefox, Safari (iPhone, Mac) · 25 links · 7 visitor journeys

**Visitor journeys that work:** Switching to Hebrew flips the page to right-to-left · The cart opens from the header and closes again · A buy button puts that product in the cart · My downloads shows the sign-in form, and Create account switches to the sign-up form · A missing page shows the 404 page with a way back · The sign-in form refuses an empty submit without calling the server

### Speed on a phone

| Page | Score | LCP | CLS | TBT |
|---|---|---|---|---|
| / | 85 | 3.7s | 0.02 | 0ms |
| /shop/ | 67 | 3.1s | 0.57 | 0ms |
| /presets/ | 77 | 4.8s | 0.00 | 0ms |
| /account/ | 91 | 2.9s | 0.03 | 4ms |

### High · not on the known list: Visitors can see unfinished text
*Bugs and errors* · **Where:** /, /presets/, /panel/, /field-guides/, /panel/he/, /presets/he/, /field-guides/he/ · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** Hebrew, English

- `Shows a price of 0.00 (no price set for this product in the admin): "₪0.00"`
- `Shows a price of 0.00 (no price set for this product in the admin): "$0.00"`
- `Shows a price of 0.00 (no price set for this product in the admin): "· ₪0.00"`
- `Shows a price of 0.00 (no price set for this product in the admin): "· $0.00"`

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

### Medium: The browser reports an error
*Bugs and errors* · **Where:** /product/ · **Screens:** Laptop · **Browsers:** Firefox · **Language:** English

- `[JavaScript Error: "downloadable font: download failed (font-family: "Google Sans" style:normal weight:400..700 stretch:100 src index:0): status=2152398850 source: https://fonts.gstatic.com/s/googlesans/v71/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vgCI.woff2"]`

**Why it matters:** Errors in the browser console often mean something on the page didn't load or run as intended, even if the page looks fine at first glance.

**What to change (Claude can fix this):** Open the page, press F12 and read the Console tab. Fix the cause, or remove the code that triggers it if it's left over.

### Medium: The main content appears late (LCP)
*Speed* · **Where:** /, /shop/, /presets/, /account/ · **Screens:** Mid-range phone, 4G · **Browsers:** Chrome / Edge

- `3.7s (target under 2.5s)`
- `3.1s (target under 2.5s)`
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

### Low: The page is slow on phones
*Speed* · **Where:** /shop/ · **Screens:** Mid-range phone, 4G · **Browsers:** Chrome / Edge

- `Score 67/100 (target 70+). Biggest wins: Render-blocking requests (about 1.6s faster); Use efficient cache lifetimes (about 0.3s faster).`

**Why it matters:** Google measures this score on a mid-range phone. Slow pages lose visitors (most leave after about 3 seconds) and rank lower.

**What to change (Fixed automatically (the tool and Claude)):** Make the images smaller (resize to the size they're shown at, WebP or AVIF, about 80% quality), load images below the first screen with loading="lazy", and let the main image load first with fetchpriority="high".

```
<img src="hero.webp" fetchpriority="high" alt="…">
<img src="later.webp" loading="lazy" alt="…">
```

*The tool shrinks oversized images itself; Claude handles loading order (lazy-loading, deferring scripts).*

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

<!-- qa-results:H4sIAAAAAAAAA+1d65LbNpZ+lVPc3bJ6h1KTukuOk3Ic2/GM7bjSTjKzkcsFkoci0hTAAGCrNXG2tvYl8gb7Y19g/k/eZJ5k6wCkRKnV3XK7nawn8Y+EInE5AM75cG5A/+BpbtCbes++eQEnmSw830vkgnHhTT2dyaKzWHaKTBo5V6zIVp7vGdQGE2/q5fwMPd/+7yuVe1MvM6bQ0+Pj/fWWGVKj3aA7bIdBOxy9DHvTQTgd9DqTweA/PN+L5WLBjTcVZZ77XlIqZrgUJ960P+j73kImRGha5rkte4aKzdGb/uAVbI7am3a7vpczMS/dz2+9h2Kec515vvc5RgqX3ivfS/CMx+4zf5FJgXDyEFq90eDnn4bD0ZHn16/DAbR6k97PP40HXXr9mOXsfAUn3R60esPg559G48AVZwk844JDazQc//xTGHT76/cvlISciUTHrEBohb3hcFPiKSuMLKAVdsfBzz+NA9vcZ6hP3dtJN6Cy1Msr34uUXGpUlvAHmZILhGN4mMxpBR5xhak893zvhKVMcWi5MfjwjMW2ds7FKc3QwPfSXC61Nx396HtnqBIeG2/qRbmMTzHxfPf0hbDdKG54zGi2P+fzjNqJZSmMpjlff5wG1edpz/eeYcLLhTcd+t5TufSm4x99j2td2gn/wTvFlTf1zrjmUY7tImcxZjJPUL055SKZMigUjxFkCkEnCKAlZPVGo4FUKjAZ11AomZSxAS7AZAgsWXBBU6fKHPc37/mexjNU3FD/llrfi5nBuVT0BpWSShNvc2Pb+JprbqTSEDMBGhFKkXLBdYYJGDw3VW8vDy++zKij59KghgUyUY8HwSBb+JDyPEdlSwN9wEWRM4OQcswTDbmUp1CKQskUteZSsByYSGDBThHO6u4TWUbGNkoiCFyDQpZTezU5Hc/3Un7uTb0v0U5QRcK5gVZFD1+wOVIdN/XcgMIUlQYjj2DJTWZLpZxIOENFxPj0SkCcYXxqv5JEApszLqjDBA3juWXdk0wuNbzLQk9h5v3jv/+X6s08YvlbafFfb7m9v/8Nbp/Iv/8Najpf+TXqfesde753XCjUaLR7ZgJz+2S5pz0veYLNTxlu1al+bhWmd9tw6eDqaix65RDYfqkw11/D8CufdhSCj2/pUfCiwPpXhuxs5R457S046Q573WgwGnqE/Ao/q3ko8L1TIZfCm6Ys11ghFhdzb2pUiZa9PyVZW8nSMTsJnTf1HkhhUBiQIl/BSpZOWMuiyFfQcuxMcuDvCMARcXCcMUF7zVpqlhkzdzSJ2VJM4Za5ugMvaG2ncOzDepHo0S6eD9srtf6QYbN8hscWIUKg6et4P/qH4O/mFQiatt9R9YNC1Z3lI6568fT+g4eff/H0s4dfTm0rM4+lBtXMgwwV0nCeMcPEHb0eDmDCTQfWvF5Tp9kC4cv739jvmIAUu0i0B4XeDURugh1xrz9O0miMow8KO375tdvgzAWQaeIFaYztlPEckzf0PH1Zi4JlyJxrox1/OmTTvhUitkY6WaDQwI0GuRS20psTgwV0oYXnBcbmawcu8C/UanuueAKdqnI7ZippaHcNYq7DH6fpbuDnRC7QZFzMgdXCDYlEbf8j7hhYSnW6g0GH1nFA9JLwnWsg+0Gmbt65wTsaTnEFLCZzRnfgSUryT4PQdh39zU+CL4sua/QxUm7g5ZHMc7ncLKg2WGhiSKUxT0G6LcXJm10YTDpgl4vm22TM9YMJUWkZ8K5rLFaIgiTMvtWWRzeYQziJCeT8FMG+ZwYWcoHC7ALR2y1rRcwUchkzI1Vnybh5JNUUXvIFytLAOAiChQY8jxETGszf/2bHY8kiUqn2zLuf52vug60fJ8hUnDV+S2UgWsEjZKZUmMBzXKI28ILklQhZgpGQ8XlWv7LPRtpPwaahlxaulTabV0whREjMUigsmCJ6H1j0jlh8ClpK0XHq4AczTbcy4OYW8e7YcZkVv7aob8Fcrrafxq5j0eT1ywxfE/WviZDXlvrXJsPXNfWvmUhes/rna1ng69eu8fbJw9evY6KEl4vOd8Xc82/epBvn7bXXIDF1k3NbFDabu3bjjoK0Px6HkyS88cYd56xMsLnrNiFzCy2n8OGI4a+IVhs9IJZCyxzbVq9/8+0f2Rk7iRUvDDykNzSyRC5FLlnCaCJTKcwU6lf1xtOi1+2ULXi+oiqPpZznCCdM6JkH2qxynAqpFiyHJfJ5Zqb9IOh0RkEA2ig0cTYN6VnFwEWC59PgaAraMFPqe91w0O1NxuNBAFqWys5H5ZOkXnVnTgV53Inl4lgfz23Xmgl9fDYKj/tfsS/Vw+ef6/M/5o8/Kx/L8Isn+R/TB8P8dbev8gd/Cv8iXz/5vns2f/Cks5Rp2p15rzaaydb0bOsmlVvsauuIlqiCLVBYSEVrJKBurqmVXFPUKSN2UXRtZtbFKypBpgaFtZlAr3WcSn+w7JrwhPQbu3SklJQCGLVmUCSY+IBnKICn20qC1UOtjuCYbZ4zEeNGf/miwE0XPjGe1vAo7FrQV8gS+/FBRaNhUQce8XP7MmalRt+Sggt55kysWCbo1BGj+HxO9hQ3RBUnDTvH1AD5iXe0lN9Z17HujulmceEwg63eQt/VVGPD0SgMQ+ylb4H41YvLIf9X47INVhao0nYeF2/oYYMR9evr4YFKEiuJGHcwgoIzJMbWIGVFgUxpsF6N1tMHL472QMX1NRxiPGVqTrtLZe2mZQ4vGBeGjAWK3jggoRnQZARUiOFsB2iVumR5vrKFMlTS2cJHdYcdcOJyR4OhfmyrpSBzt9sZgMZYikRvoOKBXLiFc4um+V9xp2lofYPRi+P7Xz955IOQsOTUmMmYcAtj7Zsjp1AWCq0k812LpdcZaWhVFK3J0TQpvU542ad+Z3zZp25nsv/TBZct6RkXfLcstjGWXTF8xpO2IvaGwqmq/ccHO1EOEcgfvNKG8I6ZtqRYSo/5Yn4csi72MOml/X4ShelwFEYsioIJG0wmUXeSVpqiZmdczP8UedNw0iU5uKy9cRwNhv1RmEQ4mPSDiCXxiE16MUsG8ThKw4vtjYZXtTfojgZxPIripJ9Go8EwSMbpKBz2BpMu9sJud097g6vaSwbpMOmyUTzux3Gv1x9i2h9gf9LtDrrj3mAPfcPgqvZiHPXSXp8Fg346mQwmyWSSJuNBEIdJOolxcLG9XnhVe8Nk3I9iZP1uMEyxHw+73TDoJaOkx5BNusHF9oLRVe0ZtWortmzHOTJxofLkyrF108lo0k/7QZ+F3SicxN1ByIbj7njMxumg37vQ3HjyYw39kyQYd5N+GIxvDv1RyXPT5gL+AOtdYOO0I+gzUuagM0XxTwvShCOJww9rVmKe3oUHtjJkTCQ5aqvzWHBTJL2tnP111a7e+ZCQ21bRZ201CL3t5HtGruO1w1eDXjDrgm7VECYrt5CDs9Ud5SwDAcz4QIBGm4/DNBY5o+Lf4PuS5dysjnynj1VtR1hbNk7bqpDY+vwqeu/NPCJ/5jkYzNF5deyO4EDUKTi2vq2Ykp5SKC5pc7o388igIFfhpxXuu8XUU28NJTeGDYBWLMs8gQjhP8NJF/70aT1fRzNxM+jYbnM0vK7NQ+Bjp83BdW0eAiHbbQ6D69o8BEa22+yF17V5CJRstxmMmm3u6jtxrvfpO3Gu30XfscbFd+WiIJNVliKBZcZzXEtp68HTk31az6H1nO5Te/h1xlNj/b1WyaPC2saDdMMlyworRUslxdwpQldoN0En3Gg1j/nZGhpIIHERYULu/yVPTGZfZdZ0sIEjpskx0bZ5MJUiQ6qCOkPQBbn3q6CimGunnzp0EFa5U75z2NpIhN5Re4LOYLSjpQSdcEdJcQrKL6uIrLeHccDi8Sju9v6ptge7/iQJqwp+10xwGQ88ODnZ5gPQsmGlV2EI4vNt/u5sAfRHfDEnw/PezLNZWSTaM8/1eG/mhUOKO1fd0u/A/mY5/fjHf/3PzPu4IewZsgRVO9NGv3ku4cQoHpv2S8WEJl9E+wTjkkQdXEFoPebm8zJy0SYKnd0xoFEkEJfayEVVTN+1QV63nZ2vA7kUYKnklyQCMqmrCETMmmk/DaKuRxtdUdiAmk8rDia/GBFoZJ7Qbs3yJVtpKLUjzdakqH1CxskO7Ny0DQdB33CT0Yb/+cnLE38Tb7qjwfKL26MVfl/SNkwByIiaEiS/KGK1Kiiu5zAi4Qpj+hmtyDHEjGHxKSoy14oyynkM3/D2I77BpRNaDqLt+sVcsPO2DXKm5OfJkZFSwM9hIYXJ9FEHntEK0TJpyNgZAgO95CbO1ikQO1j0a7PQVYaZ84l8UtxbLIt2Zacdmm6zBZw7GElJkzY2eFN8TIfRGJO03+3eHB93o9w2fElE0eZFk2TjxNCcep9AJs6aK6C3l4rimwYEum3NTrVDP4dmuSyTNCffMxeQKinMUd0mpwoJxpySH+zirWS5X7m2zWrHs0SrYxIpKmil5dzGv8vYp1G9A18UNkA7nYmwAy9ITjQFz5Us5xl8jSpGm/XxHE3O0xW0Imky50+qhk4DWgCjtBOsHa/kPDoij9JMdKlV05yDVqoQKfQvjtbzUUeOXRquC4clSeX7YM7FgQqnMwFwueBMoZLTe71w0BsGQXAXuIjzMsGTMvrMtq0vYnqsC4L0Bycv1pOqYIGGgWHzXxTIY32Al2wPjhP1lS63BpEXMufxagesryzoEPm+nQjLl8uMG6TYFy3P0mZfVBs8LNgKYtJ4aPVtdJ+JFUTl3HIj2Vza+tgpTMnFdxgbgkRb2XeeyJMXoI0srMZpWUiVQlit8gk5stYWm2YpmhUINC4NSBuo/EVtbZDlVm+1WN9wpN1PSLeohrrmj7YbarVkvluSj+xKk9+5jd+X/OzezLuk3sz72HLE2i3oBL3iCLPBghPDlM11c3GKts2goVRuy9iG9A2KI+y65X4dHvwgd4IBG08w6CXD4De0E2wx9a781ly3Tn5q8l6VXOecJ36VXSekc2dHCtmpy8JhsEQ8rXLwKgWG2hKUd2PkZQL129h2Lhl8+0s30V8ICpAlmLIyN22Kd90hS+rO3Qr2Gq+qKNddFz5rfrhTCsK7Nhc5F7gpyBfzZrGEGTZdf7QRugutu0J3KQYiyJDa032q2ALb5H7Q1sa/I6TAOzMxE7VaXs0CZf1JZUhBJ4QiPZzlWsJc0lQio/A9m5Mj4COq8fF0Jt4GVus4zb2Z9wHN31770E4paRN/bj+ys1sxus2c3ZnuX1KzsH3fSLf4gkTA4qJLSnaGu8vqJpOIC5cmvatqvE29SvNoGG1Uwzp21lY/F5rbHXRdE92MVhF8rmy2lAVwu80qHp9u/FdcGAlxzu1eAFFpDK1Ka+bZd98x+37mHe2YhzvLOIXPHj7/i5txkgTnPd4rRh1o2R2FNCC3tpFLird1Kr3DKhSdowt6wK/MPR+kTpCSaRgl3f47xNU/OJ3gd+twd5veK7ENoGZhuHrDznFKU9LOmG5TG1zM21I0zn5QsW28pMN9W2DJ4phOUEQ830bMF1XmG0UQaGezNEOOZ5hTH1D1t4OX95utQcSU4rhJbKKc7A2YueVyrjWLp2o9RzSqKRQoixyh1JVTlkJkyq2IT3nZkWQqsZn9PvxVyoW1haoY2tL2IwW9imUuSwVRzkUiUOsObJNJDEqKAA1vznLrqeMKKUuaVm9BRqG11RQnSXHGONH0RCuG+R0NW5MICudlzhzmEbsvMbI7SBOVK39igTFPeQw0h06xves0EZpie/bTeiHBYs9GLcZzFlOm1jk1mSNT4plU2DjIm5CzsRTc6sxmZXOPqA99zM7xuN8Je8f7OOcTVhQ5jy3t94qcrZaK7LxtZD+QM6AVuqMRpKMs8qP9SUs7EHw7Z06ax4b3I6/3EdFEJ3wp0Ipi5kHCFcVcDZ3RiHOm9b2ZR9qRv102w3VZZfKdsq98j53jEwLySwQz5eefc0HQRYlLLM9rlk9ttisX8ymAxTNYlOSNdX7YfXK3u3WMRlEYRr2IvUPg5WJK1vWkdKBmZ8el9fa8xaQbyH54zhaFzWOsz9OwNLU+b1K4D16WnQimjqXCfTFM++EaDLwmhEm7JyEK+eApdLYbPLiyoEO+KuFwgUyXCrVDPEsaFWaw2A7OdeCE2rHiArnUDdRsLWiPzNEuBh0pqpINenUi1pGLJDBxSjDoUigr1Nm2raPtvIDq1EnjuGO12zZPiViKh6Njyoasg5Cj4A9HmyyDJaft6kvKNVXtms/q4IeGlqM27Aw1pEwbVEd34SuNgGnKY06QG7M4I/BL0fAFrqsEnd66Suf/T7izG3Xj7mDcj/CfKtz5z5oNc1lslZITO0uMipl3SdWtmOpMNOramH1deZfga0KxQmrB0/TNM66tmvNLmtNV39eA4x5ruib2z+3aG/JyVayV1R10vLbwdgyVG9/63Ou8dw3zkpJJre5tVsWWrQKmVKRKQ1nQvBN6ORXdyNoTbxX1C/bwPlKmUE3IDuj9EkvzQdqq3W7YxSju93+PZP62bdUrpeki5tnz8woVeRi/rJ63o1rNuNEF2Kqrvz1uPZdQV4biksjixQIOnx6VdNzLJv647A/STDZAVEVoQfO5oJ3cyFN0Li+3+1Z4cmRjjhHpi1qjTTGRDRcjTXB9WHlOh5WN3IGunfmiUyg2jiwVn3PRpqheO1ZS6+qNiw8mSRUhpBgIWS5VK1te62tamnkfXwz1HbB8HyS04YTSVdNozG7BltpS5TRWar09xUeKn5NYxwYktZo2wFqXcwmMVogdglWnu91Roy1keuKE3QUvSII3QOQTC2wn/t4GPzREW8lIGu0Uft1mef7GvemYc7IcNcy8z7hmZONO4ZiULKkqArU7OolizsnyeUTn0CJMydLIWSniDFou98oYa6dotlof0Aduk+hcOUxghebobj1VnK59qNtImI3wVVBygdxrwUQ27yNoUuxWsk4Y04atgC3Zyq2q3fozOqxkuXHnioKbN+MwqTHFBvNcV6msFq8tP2mKj1J7docgP5bjBi03M7iUNIPurA9tANVyKNRlTqcTDXkpNij0JG1O/nrmfQrV2osrGkStTc1qDeoIbsvOu7uTo1D8jA40FW5rt0d+JB1dMhsaF6w42sGe/4/ctYV0GwKvQqobwtMwDoPJZJJ23+EIxq7mRaFfmxdoRzR1J7HoyDXE5KZa54vYiancfxuucZy399aUHYbYhqGvNCpKdqJTm/8+E+tVbDzCsb1p6Xj7VXXaauslnSA7ba9kuf06QsN2CtJNiEpvvyQZOZ6JE8dwm1Ocey5FPK64snO+yBsgqGXMWU4b2RnHZXvhDIe1bSfnU2urbmBof4W3wqKntZN4E5TUGUHJsjKo6EYG2/wO+rxVxcpGsxkVVUKULaw3oU0p4JuMGX2/KHx4xGKM6I4mqYA6wuSJsJel1IcYGSnaEXVHXm6KixqCKEpNBTqzXwUYRSPZ2o54OzvKnhd9TEtCqoae0hTbYj49JehcG/ZGpnry6dbGIPj5p2EvcJ4yOZ+WKr/E5lsv2R5/k+9do8VUCQe2lI0sbNSfT2Jm7kUl+WmaJT8xsuDxvfr48p5PCtNSJAdCyrvd5BYMJkmcRth7B/Puoj/5gpbiJsSvrkzbN5c+rGfBh2omfbgwkXY1u/bSNKvvOA6thcsyiMN6xwcVhEUIG4bYpyIVShaorCOo5q4tNWntENpTusGBB9ex1G2VvhKIaIzuTMAl7ZUqf4vWZHG846cK1zj2XMJHWfhxwyALbwRZa3857dxCOi/e/njiNUXry5tw6wO0iMyjSifSO1oWuQusg7HtYokUgVS79yaRH4C8lhu4Wdv9VY7QusPc3psg7NRcNJDshL115OtyiT48xLUv4XA0YJO4F0fRbUr0ema2p4REe/9YN7P1NlvnNbj++6b6IW2q1y3mdXcT3u4Nqe9J3LoTFiZxMk5uw4lwxQb6DheN7pa0r37fO2+yd9azarfPV9V13S+sm89e00C/yei3CckkBkaCYypIc140hJ7sdUq7aBvZpjtKvJpXvenWpWkVzxKXVNeJWUC9nY6q3Ivrenlpr15R9XVva29F5QgkLIgpgK3duYebDeUdOjlwGPchKldVQiUUpalO5e7c+Es03GwEN2v/QOKfrdYXHunqFkhnqDtXNKU2OMfKA4Xkaqls5yo3HvXG1TIX7bKwFW42zPdNycGrWW36m/vbHCH9oO9eVemr5GCjO9Nuuqjv0M1byFdz+ig+UVpOp2TkwqxAl9GCm7WCQc4aK/TWqaXObJzkhjJ3ix0fONz3go7VVYbvFxz3dHLr2Hi7fRw2iNtExltr/jDSfx1c/BUIOXQlbx0Vb7uXw+XqvWPi++/3sMG+F0RcYnTKzfsFxIt93Doe3moXBw3hNtHwtlo/iPBfBwt/eToOXMVbR8Jb7uRgeXrvOPjeu71iqOQFooxuMp/tBeJTG3JxKd3T8cD36EbOaW84CDqDwdD3Yutc6QThaDwe9sPxZNIfBWG/73smMtbtklKF7ngy6fQm9Ee13HWv3jQcjHuT/oRcgIX1/FyfwTxZpyN7vndgCvO4WefJolCyvlUKEqSsFbXaW/g9Xfg4uvKCwd/aBY1vf8FleOUFlx/8hY/UYC13dcyzEr7hqBa+YDDsDEajXlD966/FcDAcTwajySQchePhKBhfkMJe2OlPhqP+xP3rNcRxPBxasT1YGoc3kMbeXgHbGnbD91yNfFSPvD8O+p3hJOhV5E8G9cgvDHQ07vSCwaiBN+P+ZDgJNwM8iOIdzLkaP3YKvxWefTj3y24t1voK3vVi0RTnbg3G484wHK7ZtLFb9PrDMBgGvUG3Owj7YXdYrV+/Xr9Rb9zp9voN/uxORsPBTXeLLV575Xv0R4OqEEIsFwVTXEtR/zHNlJ/TR/rx4/8BIrvR6fRzAAA= -->
