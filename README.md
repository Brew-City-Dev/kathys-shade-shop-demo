# Kathy's Shade Shop — concept redesign

A single-page concept redesign of [kathysshadeshop.com](https://kathysshadeshop.com), built by
**Brew City Devs** as a prospective-client mockup.

> **This is not the live site.** It is an unsolicited design concept. All business facts
> (address, phone, hours, product lines, brands) were taken from the current public website.
> Testimonials are clearly-labelled placeholder copy, not real reviews.

## Stack

Plain HTML, CSS and ~40 lines of JavaScript. No framework, no build step, no dependencies.
Three files ship: `index.html`, `styles.css`, `script.js`. It deploys as static files to
Cloudflare Pages and loads in well under a second.

## What the current site does well

- Every product category is listed, with real manufacturer names.
- Phone, fax, address and hours are easy to find.
- Trust badges (BBB, Houzz, Angi, Women's Business Enterprise) are displayed.
- The three services that actually win the job — free in-home estimate, installation,
  in-shop repair — are all mentioned.

The information is there. The problem is how it is packaged.

## What this concept changes

| Current site | This concept |
| --- | --- |
| Early-2000s fixed-width layout | Responsive; designed mobile-first |
| Phone number is plain text | Tap-to-call in the header, and a sticky call / estimate bar on phones |
| No way to request a quote online | Estimate request form with window count and job type |
| Products as a text link list | Visual category cards |
| Repairs buried in a sentence | Its own section — it is a genuine differentiator |
| No structured data | `LocalBusiness` JSON-LD with address, hours and phone for Google |
| "Since 1978" not stated up front | Leads with 45+ years, family owned, local |
| No page titles or meta descriptions tuned for search | Title, description, canonical and Open Graph tags set |

## Known shortcuts in the mockup

These are deliberate, and they are what a real build would replace:

- **Product art is drawn in CSS**, not photographed. A real build uses photos of Kathy's own
  installs, or manufacturer-supplied imagery.
- **The form does not submit.** It validates and shows a confirmation. Wiring it to email and
  SMS is roughly an hour of work on Cloudflare Pages Functions.
- **Testimonials are placeholders.** The live version would pull the real Google / Houzz / BBB
  reviews.
- **One page only.** A full build splits products into their own pages — that is where the
  search traffic for "plantation shutters West Allis" actually lands.
- **No logo.** The mark in the header is a stand-in.

## Run it locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Static files at the repository root. On Cloudflare Pages: build command empty,
output directory `/`.

---

Brew City Devs · Milwaukee, WI
