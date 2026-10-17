**Tested:** 5 pages in Main language · iPhone SE (375×667), iPhone 15 (393×852), Galaxy S23 (360×780), iPad Mini (768×1024), iPad Pro landscape (1366×1024), Laptop (1280×800), Desktop (1920×1080) · Chrome / Edge, Firefox, Safari (iPhone, Mac) · 5 links · 1 visitor journey

**Visitor journeys that work:** A missing page shows an error page with a way back

### Speed on a phone

| Page | Score | LCP | CLS | TBT |
|---|---|---|---|---|
| / | 81 | 3.9s | 0.17 | 0ms |

### High · not on the known list: Certain ARIA roles must contain particular children
*Accessibility* · **Where:** / · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** Main language

- `Certain ARIA roles must contain particular children (1 place: #list)`

**Why it matters:** Some visitors can't use this part of the page: people using screen readers, keyboard only, zoom, or with low vision or colour blindness. Accessibility is also a legal requirement in many countries, including Israel's accessibility regulations for websites.

**What to change (Claude can fix this):** Element has children which are not allowed: li. See the guide for the exact fix. [Guide](https://dequeuniversity.com/rules/axe/4.13/aria-required-children?application=playwright)

```
Example of what's affected:
<ul class="list scroll more-below" id="list" role="listbox" style="max-height: 256px;">
```

### High · not on the known list: Certain ARIA roles must be contained by particular parents
*Accessibility* · **Where:** / · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** Main language

- `Certain ARIA roles must be contained by particular parents (4 places: #o0 · #o1 · #o2)`

**Why it matters:** Some visitors can't use this part of the page: people using screen readers, keyboard only, zoom, or with low vision or colour blindness. Accessibility is also a legal requirement in many countries, including Israel's accessibility regulations for websites.

**What to change (Claude can fix this):** Required ARIA parents role not present: group, listbox. See the guide for the exact fix. [Guide](https://dequeuniversity.com/rules/axe/4.13/aria-required-parent?application=playwright)

```
Example of what's affected:
<a class="opt" id="o0" role="option" aria-selected="false" href="manas-kaziranga/">
```

### Medium: <li> elements must be contained in a <ul> or <ol>
*Accessibility* · **Where:** / · **Screens:** Laptop · **Browsers:** Chrome / Edge · **Language:** Main language

- `<li> elements must be contained in a <ul> or <ol> (4 places: li:nth-child(1) · li:nth-child(2) · li:nth-child(3))`

**Why it matters:** Some visitors can't use this part of the page: people using screen readers, keyboard only, zoom, or with low vision or colour blindness. Accessibility is also a legal requirement in many countries, including Israel's accessibility regulations for websites.

**What to change (Claude can fix this):** List item parent element has a role that is not role="list". See the guide for the exact fix. [Guide](https://dequeuniversity.com/rules/axe/4.13/listitem?application=playwright)

```
Example of what's affected:
<li>
```

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

### Medium: The page has no search description
*Search engines and sharing* · **Where:** /, /manas-kaziranga/, /pyrenees/, /iceland/, /iberian-lynx/ · **Language:** Main language

- `No meta description`

**Why it matters:** The description is the grey text under the title in Google. Without one, Google picks random text from the page, which usually sells it badly.

**What to change (Claude can fix this):** In the <head> of /, /manas-kaziranga/, /pyrenees/, /iceland/, /iberian-lynx/, add one or two sentences (70–160 characters) saying what the page offers:

```
<meta name="description" content="…">
```

*Claude writes the description from the page's own text; check the wording in the pull request.*

### Low: The main content appears late (LCP)
*Speed* · **Where:** / · **Screens:** Mid-range phone, 4G · **Browsers:** Chrome / Edge

- `3.9s (target under 2.5s)`

**Why it matters:** Largest Contentful Paint is when the biggest thing on screen (usually the hero image) appears. Google's target is under 2.5 seconds.

**What to change (Fixed automatically (the tool and Claude)):** Make the images smaller (resize to the size they're shown at, WebP or AVIF, about 80% quality), load images below the first screen with loading="lazy", and let the main image load first with fetchpriority="high".

```
<img src="hero.webp" fetchpriority="high" alt="…">
<img src="later.webp" loading="lazy" alt="…">
```

*The tool shrinks oversized images itself; Claude handles loading order (lazy-loading, deferring scripts).*

### Low: The page jumps around while loading (CLS)
*Speed* · **Where:** / · **Screens:** Mid-range phone, 4G · **Browsers:** Chrome / Edge

- `0.17 (target under 0.1)`

**Why it matters:** Content shifting as it loads makes visitors tap the wrong thing. Google's target is under 0.1.

**What to change (Fixed automatically (the tool and Claude)):** Give every image and embed a width and height (or CSS aspect-ratio) so the page doesn't jump while loading.

```
<img src="photo.jpg" width="1600" height="1000" alt="…">
```

*The tool shrinks oversized images itself; Claude handles loading order (lazy-loading, deferring scripts).*

### Low: A script from another company's server isn't locked to a version
*Security* · **Where:** /manas-kaziranga/

- `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js (version not pinned: updates automatically)`

**Why it matters:** If that server is ever hacked or the library publishes a bad update, the changed code runs on your site with your visitors' sessions.

**What to change (Claude can fix this):** Copy the library into the site (or pin its exact version and add an integrity hash) instead of loading a version that updates itself.

```
<script src="https://cdn.example.com/lib@1.2.3/lib.min.js" integrity="sha384-…" crossorigin="anonymous"></script>
```

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

### Low: The page doesn't name its main address
*Search engines and sharing* · **Where:** /, /manas-kaziranga/, /pyrenees/, /iceland/, /iberian-lynx/ · **Language:** Main language

- `No canonical link`

**Why it matters:** Pages reachable at several addresses (with and without .html, with tracking codes) can be counted as duplicates by search engines.

**What to change (Fixed automatically by the tool):** In the <head> of each page, add a link to its own address. For /:

```
<link rel="canonical" href="https://tours.mw.photography/">
```

### Low: Links to this page share without a preview
*Search engines and sharing* · **Where:** /, /manas-kaziranga/, /pyrenees/, /iceland/, /iberian-lynx/ · **Language:** Main language

- `Missing og:title, og:description, og:image`

**Why it matters:** When someone shares the page on WhatsApp, Facebook or LinkedIn, it appears as a bare link instead of a card with an image and title.

**What to change (Claude can fix this):** In the <head> of /, /manas-kaziranga/, /pyrenees/, /iceland/, /iberian-lynx/, add share-preview tags (the image should be 1200×630):

```
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:image" content="https://tours.mw.photography/share.jpg">
<meta property="og:url" content="https://tours.mw.photography/">
```

### Low: The page title is too short or too long
*Search engines and sharing* · **Where:** /manas-kaziranga/ · **Language:** Main language

- `14 characters: "מאנאס וקזירנגה"`

**Why it matters:** Google cuts titles over about 60 characters, and very short titles don't say enough to earn the click.

**What to change (Claude can fix this):** Give /manas-kaziranga/ a specific title of 30–60 characters: what the page is, then the brand.

```
<title>Lightroom presets for wildlife photographers · Brand</title>
```

*Claude writes the new title; check the wording in the pull request.*

### Low: The page title is too short or too long
*Search engines and sharing* · **Where:** /iberian-lynx/ · **Language:** Main language

- `12 characters: "השונר האיברי"`

**Why it matters:** Google cuts titles over about 60 characters, and very short titles don't say enough to earn the click.

**What to change (Claude can fix this):** Give /iberian-lynx/ a specific title of 30–60 characters: what the page is, then the brand.

```
<title>Lightroom presets for wildlife photographers · Brand</title>
```

*Claude writes the new title; check the wording in the pull request.*

<!-- qa-results:H4sIAAAAAAAAA+1cW3Mbx5X+K6cmtSWwdnAnQRC6bBTZslUl2SpTibMb+KExcwbTYqN73N1DEIpdlZ+Q3U3W5Zct70s2+wvyHv8IvueXbJ3TM7gRpEjdbCXmC4FGX8/l63Ob+W3kpMdoFD35HJ7mxht4ZkrrojhKzUxIHY0iTw2t2bxV0O9TK4p8EcWRR+cxjUaRkqcYxfzvl1ZFoyj3vnCjdvuSgfMcadpepzdodjvN7uGzznDU3x919lsH+4N/i+IoMbOZ9NFIl0rFUVpa4aXRx9Fo0I+jmUlpv1mpFHc9RSumGI1+GxViii4aHcSREnpahm+/iZ4IqaFuib6IoxRPZRJ+k09zoxGOP4RG//Dg+28Gg8O9KK6buwfQ6B/1v/9meNCj5o+EEmcLOO71odEfdL7/5nDYCd1FCk+kltA4HAy//6bb6e0v259aQ6unLhEFQqPbHwxWPR6LwpsCGt3esPP9N8MOT/cBupPQetTrUF9a5Ys4mlgzd2h54w9ya2YIbfgwnRL1H0qLmTmL4uhYZMJKaIQzxPBEJDxaSX0SqJMpM3fRqPt1HJ2iTWXio1E0USY5wTSKw6dPNa9ipZeJIEJ/LKc5TZOYUntH5F7+OOpUP496cfQEU1nOotEgjh6beTQ6+jqOpHMl0/u30QkuolEkut3FV+IMR8JK0bT4ZSktps0klyq1qKM4sqXCqmMURw5P0UpPQ3mhOEqEx6mxPFmSoHNyIhX1iCMvPY99gNYT6+9/9ug+WKPQwax0HhKjub0Q1sukVMLC1sLPqhnur88ME2GtRMsSTOseEwNOpZPeWAeJ0Lc8lA7B59Lx5GAy8DkCyeUICjSFQiid1FNwiUXUYFGkaF0MJ7iYGGFTMFotYnhhzCwGY2EufQ7KzHkdo6kpMcqUFiZK6lSjcy3Y3KZ0IJQzIEDhVCioqDtD7UFqmAm9AGailehikDpRZUp7euSsQHXLwQZBweK0VKyADjLaEk4IMlwriqNMnhEhEPmcrsBEZjIBoiFMUJn5bUCR5EDKxPIHnjY2LWWK4Ww0Ds9E4iGTZzSlQmH1E2NxDUhS/LLEUstTtE76RSsxszat4driDNv7rW6/vVuQ/kUUhZIJ7/5uocRibuU094Ru6IVUQZVuLifQ6EKhRIIj+JmSzrOCFTXgtLdAJij51Rr8RQCt3YDlckMq9xv6qGVRIH+L7pQKEiWcuzuOaBckVUYpmBmLTSb/OAKZVr+OIz5c9W1izsYROL/glpk4a+ZIpBlB72BQnN0eR/doZXGGjwjjL9XTTJ59LDUByEN5BiRbldBnRikzl3o6AoAPVZC/XLgVDee5THIQFkEbD4K6YzoCJaM4ylGcLsKJJa3fT1Mc9CcHExHRDWDxg5p/nTg60Wauo1EmlMMKvqSeRiNvS+Qd/oLUNVGiTAkqk1xoujCim+2qBbWcB/ElXbggvRV7aPIzMSN9NxnMc+FJrbIME4/paKzfNue+jl+CtIWwqP3bxdkJ1iqEKUwW63oUlnc/we3fB9wGdr4W2L5cWKCxHzDXjeBnpgN//Qv8zHTDv94PBMBiqcWm8LXKms5KYU1B1BhHwARzqBgB7o4jBqtxBLnFjNVYC9c8ES+kFXoq2lfC71J5rwe+n1XjAs1ratIGGeIKiw61H8HUmrKIocKYHSDcxaNuD7N9cfQGQfjVdvdGwfitcnEHFNMZpMfZVfBbmdHXAuA7St4DDJfZLnWSGgTcKdU9wrM7Rt37CXffV9ytRedaWHtjuViHWCVH2ufB1Gt09whnN5p6F5v6ez8QDCu5gZZr+nU9hHxMJhiNqPCnJhpbhiKAkc+FJ6EjUFqzxsbRLqA8TPr7nX2RZjcAyqrhcqR8rV2+UcAkeq9wjTQPnW9mQipMv6qluZSLFCfZi/JMnz3/MtF2oU5brizERDhsJaYtSp+3T7ttJ6e6LEBoN0e6CPZ7R9DI0Cf53gohNxd5OVaitYbDWDVI3odM0oEsOLSnaKGaEZYzbkDiS3sHcHxW4R4Id4IpU9WZGfqckKYhCABl4eNgrscgZ2KKMWRGe8a9VHgBmTWzACy81B4InUIqUwLaKRLLW/BEuhpQZeEdd+E5HUwsipMlAN+GWdWV53a5mTvAWeEXjLPW6CkjAGq/QrYHOSZhCpGmFp3jaxbTFjyqtIWIMTOnmPIswoFFLWaYxlAWqfBBsgj6boPMQLLA1KRLhFIxJMs1quas1AnBF4lrioUyC0z5XHNjSSNam2D2RsVqA6XkBK0UuqkW+qwdxVG7WFjUiI6/yAQpeseft+/33cHE7sEysLeNddeI0t0Q/L64iD5D0RdHg+FB1nmT6PMjlZEVDOVsZDRz591Xnxg49lYmvvnMCu0KY33zGJOSAANCR2h8JP3H5QSekiBUdo1DnUJSOm9mVTd3G1wFnJk8W8ImrS+sKTUfVkBunA/gmwi9Bltrm3o5Zrlqh2uo9YtKeCggQRv0RqVsXKi5WLjKDiNyJaVdcmYLy151joBwn0ufm9LDx8fPjmMQtSV4y8Ep2gVk0jq/RMdEaDIxyGKHUqNO7KLwFcssptLyFUL+ndAgvBfJCVowGopyomQCn8vmQ7lucemU9/ZyZlIchHDYZCA8KBQUVJFnMDPa526vBU+IQ8QmB7k4RRK9ufRJXrFUui28+aFFaNOQ2gU+8bWhawOmtiCJ0jbAOaA19LkJ3GSDyRDTbL/Xe3W4WZgyMP0Tw8moZ+Rb0KZI8YkwBCoa1skdV5G6Naq7Tfa4FjzyoBFTV5M3oBk0jIUHypRppijQJzXdwdrv1XOSbwEpJsEZIYYtTNlaR8Mn4iRwlKd1QU5pr0EwjAZk9SAWblpWl4nM2vAWfMoOpxuNdbcFT0k3HPkQ1pTTHH6FNkFFQvMJeiWzBTQmxufsZdVHD0aFCKAsNW81MSnukdkx1j2a1a/ToJFZRDL+9d6SHrWtHDKBrMQiDQpZndPnaHE01gCXK8sIKt282+8e9AedTud25Y3hcTn5gOd2F3E8cQXB+IPjp0uiWpihF+DF9J2Cd+KKV8Ju2n2wtGAJHE+NksliC6Cv7BhQ+D4TguVynkuPHDRm4xwtLq3CmSCfd4bMfb6YyeOZlFOWRlDoHZunZKVI/RwTDysTlShDizhvCgfSBxGypdZ00cIjuq+pD8uCExn6BWj0IKbEQE/uNLnbTedRKDJAA76vOdD30xREfdSlfDTDUSuWxYEld5jTZPM1ya8/vTuOLhk3ju6xRFBWeaWRtUT4FRYce4pVSIpGsHxSCAIomcyC7cl9Rk3G9oV74AeQwfcG/Q/E8Ag7/XTwGsbme4f+G4K8rbO1pC3jPuvyxqEdo0PUqDZ4tQn+IntyIfokYI54wkqpa0OF5iKDmmy3S5ThH+OqueTwzc8CoT/VajGCFDNRKt90NoFbDlV263YFdWtNELzK28GXXv/hVqkJ45pSK6lx1VHOpuvdyMkeLX8kv/7i7KHTbXK7NSY7l8+smGFT6AQdR1lvaaPx1liPdW1+V1RwZUFnJEOcUInsbY6CTg2RkoOQhBu3HNyhEfcoWnMDKK1DA3fH0XtEv80we3VrM0nJgvh18yFTtxJ0EuZtcr9La4LXfiV74lNSAcZF3iPgbIJpHYafku6RbzZR2+bFTcZV1saac0YjlBHpMsIEUjvJt+ZyJAaKEkj7HKUFM9cBwPlqtTI5WWUQpPYGEiX5LoBJ6T1xpTGOuO254PZxtLflBm6xcQQffPjJvwaKkyYw2u5WoxY0+EYhqyfwll3UCqErW4ONiNbehbv/B5ae98YOyMgFnKS9/dcIeb93dsBPXuD21bxTS9fAOcVwh0ijm1WgmjCar6i131aouWPAdcDTrOHmMkZPeRJtwKGwSb5juWc3GbCK/6+1k8xwjsXiAjyeURSsohDwdoiqHxkzVdiC+mrn+G9ohEImJw6s0CnlBGiCZXag4NRBEM3SlUKpBThUin21iUjVYtPTCvc+GYx8my/3uHHL/+13fyIHipGQ8JFQaW44gIcEcNAQE9rjYedvv/vP7qBDumNF4tG6vYuO0gU2Xgu+Lg23b+LaFfD1ZuLmB/uDTi/LDg7eRNZuhWIPuAnmli9gvyUwG+y95fjmJL7fXguGz43lzHWlwUWpVB1x3YCjR+H3YPmR2rZjuEDxGFYEj2FJb/q4Tu6YlXy3SOwSBnBiQXukbOHKVDBZhtaNNqDvBnK5BhwF2qypkuIr+rCCh7p5ExOo8HgDEKibsTO6s7eAgTGtWhdEUaCwDhRlKxqPHzzd24EMLx8RoOGxsFOKiVfGdlYqeCqk5vTsMlgxkVPuFBxAo+uKiUat4QFmrQmpw716wVYFGBSToXV41oA1vdYB3YFGp2uhlwdmVnDSJkTinXyBW1ND43OcPG3f/9WjhzGB3lwG4CIzj0I/lEnUezFPUFhkk/BCsKTfOnLQqHa03I67uizgiUyblm/kIuTC9j+6do3ATfT7KO0Me+l+tzN8df2elFL5ptTwz7BD1Uk8vDEKXG65DMSwv/+Cai1mfNVLT47LbahAIRc6pRwuUZMFwHJaQYkXi2bVFpMni9auZX/3dhsh1RJuJpSiWWo2m5DeqVi+uEUBQ2ImCB8DMZ1UPPA9gP2w80/wZSmoLGYvDsZ/NTeHLSob1oayVZLWqnyH90sVB+LFYhwFUVHoV1HDIGg8YRgfrHbKyRZWGtLeu+Mol9N8HG3aS3fkbArOJvQzWtOa46QYR5cMBaFWGDLWa2NJTW09eHvDG8O2oSdRbhf0JMq9MvQwQj4vZwVl5tgDmOdkqNXC0Hjw+HgXAF13XIChOkrlcpl5DsuywUCdKWB8gm7lmnlRhAuHywQYk64Amk6ruwKYj8iBqKSE+M5OJoerZUpeliajlGKsbHYLqqHyTX6up8IUqvOz5IQUIqnLU6SeuuAMBSHUjLOWqgBPEApLCLKFQJ1W93ALgTqt7o8EgIYdkQwPk17/7wqAmPXB0QkKvuT/Zex/cHy8KQLgzMpoSA06cohIxDdF+1JM4AfMWs+L6TgKK94dR91Bh0o4w7L0vcPfL1HyKrSlTVNqj1PS5mUlU5Lq1nOXopKntqXRt3Uxa/+8rjlp1x+az93Pe+1UOt8uZ+myufXcQaOO+3JJq9SaHikIVREOROnNTPCjVGqxFjDasaWXYM2OoNH9imeVK0ihZgrqmFkh9IKu9VBoIZni4RGwULxY7fhCXdRrTxdgiYtGhF8NCCmqXPCQKjii5MQK8p+D70u0Ik+nolxIWQUxTNmvpWwVxXnIUQ8Rr3DD8Nca5W6Bo7JPo9fMo6eVaR2q4WpmVY11vUvt+XLgq2IIuYh5HOpVi8WqDoaDXLxsHQq7pJzp3crWBgpeXc10qYd1E8Tbnwx7w7TT7Q/eaClSTepaPpjawcjxIa5TkLXh3RZDL+UgRTsob5mS11Rj4VJog6TWJA0IugVFlVZUFsoabzEUUnItr5KTn3dbvRaV8U5aM0mcp3Lzeit3x5HLRX+432R4gsQa54yVU6nvjiOhjV7MTOnG0b077bDgjri3Nk7LLPuqrhh8l7Htau2bo1S92V8369TEs0WxjCJtYdBLO28WLkkqv6TLuxZnmJakzqynflFsBBHBl5bkBMqCxIBKOpfqXKXCGWkuBKd3bWUEFUG2dP9dsOa9CRz3et0eTpL9/Z/Kh/6xA8dXatBFnLNslKKl8PFn1efNUpL1Yo0LUFUPvzlWfWKgHgzFJeU8FzsETHpIobtQLx6MCgqnrcCnKosCKl0mG9+bEww5p2CXVxiyx4U+EzKXnQsGllnL8RGBK2MHpoYazBZcbdFrBC4Ub4W7pknRqSZfPlVLKMrZjinXh9wI3L1kpnF072LY+Brse2/gDI8G+4fdbDK8yYPKl/h4V8Z2VwDBodorYqyvyKc1lUvI9iAbcj1ns2zkmu6Vgl3o/FIV25msqb1ArniRXNxGILKzwvnag4IWBvC0VC0hKHnNbgi9RkRtqKWsHNd5ZUi0cj9TcVXXY0OemlHR7dWFz1wBR36vg7QMD2hR1GxRp5BQT6XGrZK4O0Q/sKjujlfEWz1UWFuTf/vdn9p0yPYyYbOWNigqJqf1CS5q2Ra/3qvUDB4ND7LBfn/yGkbC9bSqrqAJ+Q/BtCKAJWHimGlFXnhoLLS3tO56jNz1WpytR0WdSaRQzcLiqcT5Uutqw9FMR6wvMX1aS6Hwd47BrEURdk51I518XD/SuKoZcTnd+rVmCKim39LLGw2srHYueKtqVLmzW0snafg8F97dL4oYHooEJ8ac0D1BC2H6SMcU2qxzMiKEC2x46GTdwxOQ0EOolYavRa34xJva+WmBGj4iJtFF5EbXID69zqfT+f6bQb8THuYy01Fp1SVewDWY+V7pau9IdNMkHaavcQNe9PnffG6ThavWC+YtNJZpFMqQlColTF/xctcdW1hToGXfvWbkjkRmXYW32fvq5OfuMby7jd5XwgofMgRGL5mwtOr6022iFJ+2qVBPff5Vd38tHTyCcXT+3+e/P//u/Pfn/wPnfzz/3/P/Ov/2/M/n353/x/kf+KHZCp/WJ3k1S6EqrCCgMcQ3eiLd8hdl9PQyU+GlowIeVXUZSeldGBJi6lWmbCMHHvIYbJaF+ar+qWEvTSwANXtg3gA9/R28Kip6W0McOWOHsU8p9o3Zq3CpWGyl2GUITM5zE/K0XPq/iTQ3ZM2bCBK+Bn6kR4OsM+gfCXzLZRia1J5Y9Cq1Fpz0uEAdepyifjtAEDCT7eDl6AIPq0pvLgmg6p+t8CLPde8xZTKsMbPwVgxfvahAqlTJjJNXlaKSuPz1L/ALmulOOwy+VG9728Lxh/P/O//j+Xfnf4bzP5z//vzb838///P5tz/p7LvV2euz5YqHmd+BYX54JA6Hkyz98SvrBml+1Jr6RfWOxqcc3+H3JtJ3zr/Vj/dX1jQ93k813fS6g9BWVTXPKUQkkpOoFoFotHrbZbQUBaI/5baphpIQ4o2sUz38/nYX2X2YrHrC/m2e5Y2vsfsoc5ycSP9WT1IvQRBCxS0kaQW/TZX9DJfwC2qG3TiiGrtR/6jTb+0f9I/qv8M4SljZW93BcHh4eHR4eNQ77Pb3Owdx5CeeYSCjod3OAQ3dj6M5J+Sj0aB3OBgO6W4oGIR+6RAwy2QiqVwlEQkn+DL0craqQ+21Dh1kwnm0nONY4hEdQRtfAx1npK10Rtdvkc3kGf1IX77+f4WuHNX1VgAA -->
