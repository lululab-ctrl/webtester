**Tested:** 5 pages in Main language · iPhone SE (375×667), iPhone 15 (393×852), Galaxy S23 (360×780), iPad Mini (768×1024), iPad Pro landscape (1366×1024), Laptop (1280×800), Desktop (1920×1080) · Chrome / Edge, Firefox, Safari (iPhone, Mac) · 5 links · 1 visitor journey

**Visitor journeys that work:** A missing page shows an error page with a way back

### Speed on a phone

| Page | Score | LCP | CLS | TBT |
|---|---|---|---|---|
| / | 86 | 3.9s | 0.09 | 0ms |

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

- `3.9s (target under 2.5s)`

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
*Search engines and sharing* · **Where:** /, /pyrenees/, /iceland/, /iberian-lynx/, /manas-kaziranga/ · **Language:** Main language

- `No noindex tag`

**Why it matters:** Pages like accounts, admin or link-only programs aren't meant to be found by searching.

**What to change (Fixed automatically by the tool):** In the <head> of /, /pyrenees/, /iceland/, /iberian-lynx/, /manas-kaziranga/, add:

```
<meta name="robots" content="noindex">
```

<!-- qa-results:H4sIAAAAAAAAA+1a63LbNhZ+lTOY2bE8S8m62ZaZJjPZpEkzEyee2m26W+UHRB6KqECAAUDJSpOZfYu8wb5I3mSfZOcApKyLnVvTdDOt/ogEgQPgXL5zAX5lVjhkMTt9Bme5dhoudGUsi1iqCy4Ui5mjhk6x6JT0fWp4mS9ZxBxahymLmRRzZJH/+8FIFrPcudLGBwc3DFzkSGT73f5Ru9dt944vesO4P4r7h53uoP8vFrFEF4VwLFaVlBFLK8Od0OqcxYf9iBU6pfVmlZS+6xwNnyKLf2Uln6Jl8WHEJFfTKrz9zE65UNC0sOcRS3EukvBNnOVaIZx/C63B8eHbN0dHx/ssapp7h9AanAzevhkd9qn5IZf8cgnn/QG0Bkfdt2+OR93QnadwKpSA1vHR6O2bXrc/XLWfGU2zpzbhJUKrNzg6uurxmJdOl9Dq9Ufdt29GXU/uPtpZaD3pd6kvzfI8YhOjFxaNX/i93OgC4QC+TafE/QfCYKYvWcTOecaNgFbYQwSnPPGjpVCzwJ1M6oVlce91xOZoUpE4FrOSW5L6ROpk9lT5KYxwIuHE5e/ENCcaia6Us8Tr1ce4W3+mh1NMRVWweBixx3rB4uHriAlrK8/sX9kMlyxmBl9UaF0740Ji+qrRlkosU5xkL6tLdfnLi0SZpZx3bFXyCbfYSfQBr1x+MO8dWDFVVQlc2QUaTGHYP4FWhi7JiXmmkrgzCYuYxTka4WgB9SojlnCHU22oDY3RXu2dcJ7AXciERNAGLJo5GqgpwooizXTxwb0XOU1zkSOQmgK3M0whowG6QJcLNYUWB5sYUboIrFtKjEAUfIoRZFq5iIin3HHIjC7A5VhPtQ9cpZCKVO05mKID4TpwKqwlkoGe9V08TQsTg3zmx9NCbkFRd/W0ba4XFrAo3ZLmWxitppBo5VC5DotYJi5ZzO7lmAQSPE0NWgtSEBh04FHmmz0zCj3H1FPhFgwqXmAaQVWm3KHvRRp5C0QGwu1Z4A3rEi5lBMlqjro5q1RCMADCQoql1EtM/b4W2syEmtLyUnRcSG8gn1WtnkcNuPzMDsQEjeCqLZfq8oBF7KBcGlSI1r+IBMna/XPBFbftGX8pDFdTfnA9+PQOV0CwbeUfYNVcTa9HOZtrMtWf6VGJssTmLUc+X4ZHQfg94gN+cjQ6zLqM0NXg/YaL3YjNlF4oFmdcWqzRQajpqiETl/8gvU4kr1LCoSTnitD4/1VHXkcNDOXIUzTt3Dr76omGc2dE4toXhitbauPa55hUBBgQOkLroXDfVRM4I0WAhJO5WVQpJJV1uqi72VtgEesNXnoDp2eanxtdKb9ZDrm2DlzOHRFag621Rb0fs2y9wjXU+ketPMAN0gKdlik4DVwu+NJCZbFmV1KZlWS2sOxTaQSEeyZcrisH351fnEfAYS6scNrsWZijWUImjHUrdEy4ggmRUg4qhSoxy9LVIjOYCoMJvU6WwBVw53gyQwNaQVlNpEjgmWg/EFe4dE7ioLW9X5gFv2wTDusMuAOJ3Dqw4hIKrVxu9ztwShIiMVnI+RxJ9RbCJXktUmG38OaPVqENiLoWfKIPhq4NmNqCJArzwMeMa+jzMXCTHU1GmGbDfv/T4WapqyD0J9oHrxe5sH5RZPjEGAIVBevsjmCRiyRf57rdFI/twCMHCjG1DXsDmkFLG7gndZVmkhsEocgHK7ff0BQ0IMVEWMIeEthSV511NDzlsyBRT9YGPaW1BsXQCtCbB4mQBtYsZDG7SWXWhnfgaUmoZ+Ox6nXgjGzD5uByo6tpDj+iSVCS0jxBJ0W2hNZEuxwM8rTZeggqeABlofxSE53iPoUdY9Unqm6dB63MIEIpudpf8YOMiQaGzMEbMU+DQdb7dDkajMcK4GZjiaG2zduD3uHgqNvt3gKhElmleF5N7nvadhfHE1sSjN87P1sx1UCBjoPj0y8K3oktPwm7afUh0oIVcJxpKZLlFkC/s2NA4bueEV4vF7lwSL6XxLMgAayiwoIvIaE0gqTvHTNXS5hUU6+NINFZH55SlCLUL5g4uApRiTM0iXW6tCBcUCFTKUWOFh6Rv6Y+Xhcsz9AtQaEDPiUBOuCJzyba1iGXFIAGfLdXcH43TYE3W13pRztstRZZFETyjZc0xXxtfFGJ+e0xu2HcmN3xGkFZ6JVFNhrhrrDg3HHjSLcNev3USi6Bkk+v2E5Mc4eKgu0dP/AH6OBXg/6HfHSC3UF69BuCza8O/TcUedtmG01bCJd7Ua/r2xyNpzpBqRdNwKt0yBd9Jmf9jBwWiDNvlKoJVIgWBdQUu91gDH8OV3PD5tvfB0Y/VXIZQ4oZr6RrW5PAnkWZ7d2qoW6tCUJWeSvk0usf9ipFGNcWSgqFVx1FMV3vRkl2vPpIef0u9dDpFqXdCpNrp88ML7DNVYLWaWNhT2mFe2M1Vk34XXPBViXtkQJxQiWKt7m0GqaaWIk8yX3IsWfhGxpxJx6rj4HSpjRwe8y+Iv6N2Z3d+MGzlCKIn9oPPHdrRSdl3mb3l4wm/NyfFE88JRPwuOjXCFhMsDZmX4ISinKzidwOLz5mXB1trCVnNEJqnq4qTCCUFd5rrkZi4CiBtMtRGNALFQDcu1YjklmTN1oQymlIpPC+ACaVcySV1pj5tl+4bx+z/a00cEuMMdz/9sk/A8fJEjzaXm9GHWh5j0JRT5CtT1FrhK5jDR9EdPZ3fP8frD1fTRyQUQo4SfvD7E8UB/yVBW675mutdA2cSzRZWyblK3q4wsameRMX6chhAxSpmzYFmd4aLl40SUntvICXJXJjQVLRsfX43tn+FiJ+2IiAhY+5mVJpq/aZWSXhjAvlSD1WOcdETH2nEMdpRZ4SUUGrshWXcllzy+hwArDfTNiBh1pPJflrR/N4qpUipvY7h6TKWqVrGdQ9XZS+9hoKala8xC3S0HqGk7ODuz8+ehCB0rAQQUKE1pTB0YGA2o88gdKgR/adnGfQObHQqle0Wo7dhqPN6vepSNvGG1YZStrDh+8+5PpEpDlJu6N+Oux1R5+ONJNKSNcWCv4Oq0r3Ou5QjK0l2NzQIRtoH7a/xDTwmLJjij9uwT0/GHKuUjqKIW56BTC+Oij5y2W7bosoIEVj1g5x9q/HknoKW3ApiUojZh2qtLXIl3uU95MwgbsISOiEBUHufEIh46j7N3hRcSnccj8KPrym7bOP2hVR+bbWVu8P6/XeHjNa/pgFVZHorpL/oGieYBgfnC8drZRGaLLe22OWi2k+Zpuw940opmBNQp/R6M4CJ+WY3TAUuKRA9L///s+Y3RmrtbFkpqYZvL3gjWG7caHSVokse9WcqH3J2K+e+z0od03o1yz2p3YTul8syxXKbqHbeztvFvYFHU+SWTaWCtOKIMY7DbcsN5wsuMqQD4CqJL7TkWfwLU43pSLvYXaCt+uWEkPNkC34+RKi+WoCq36/18dJMhz+VV7/cwdW77SgXZwz3t2goRT4+/p5s9S6Xszcgapm+Mdj1RMNzWAobyh373YImPSgkrK+TxGOIdFC6wp86mMDoKN98t5OzzDkZMHj1hiy7wvhE0pXrUV/1qnXcmBicJ2NwlRTg96Cqy1+xWDD4YY2YipUm8K+dmK0tXVLKFqnaV22piLd7TFrNrlRVnkPpTG7s1t//gDxfTVwhidHw+NeNhnx3x69rSPGo2CEoepFlnUFEBGJJt6MQz6DnNazGiPm3GGbZmsLleIln0hffFLav26a2PXd32tpeuM2U00kWIuvA/qUgtAl5BQ7N5o+ZEQww4CeUsywOdWxxMRCKFI6usIRqtmloVuAxepmQYFc0f0Csr3Mu97JEixyk+T1hZ6rg6BNEeiJdnZDADXn/PGOvio++WCUDr+EA27hvrBcUjBL5zqeSMddXnOEsy6HHVu58b7PjsG8+wLQpq18pss8adbPkl5/8Bvc/wfZy0EEV4yIYMUHelxnQwQ7XHivgb1Luuz18/oG45lHa3+xkN69zjaX2bzsw2U2qmDS5b7QVtfwFgT4PJmxRh4svroLylZyoZtNlINSuZXM97PMU1/1+n0nuX4zWX2f7Pfcy2ef4/qtLHAyE+533UkzBQEAlZ9I00p/19jjgE20QRaPjiJGpah4cNIddI4HhxFLvL11uqPjbnfY6/VGw/6oPxz0I+YmzltiRgN63UM/oNv8ehFbIB0ss/iofzwaDgnAS48IP1gEzDKRCKo/JTzxd+MydKKgmCdk8P3OsYWMW4fGZywrcKAtKO0a1El0UXIjrFbNHetMXNJHenn9P+atrAITLgAA -->
