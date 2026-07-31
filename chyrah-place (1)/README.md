# Chyrah Place

> **Run this through a local server — never open `index.html` directly.**
> This site uses ES modules (`<script type="module">`) and root-relative asset paths.
> Browsers block both under the `file://` protocol, so double-clicking `index.html`
> will show only the "Skip to content" link and nothing else. From the project root:
>
> ```
> npx serve .
> ```
> or
> ```
> python3 -m http.server 8000
> ```
> then open the printed `http://localhost:...` URL. This is normal for any modern
> JavaScript site, including the final Vercel deployment (which always serves over
> HTTP, so this only matters for local testing).

Premium home cleaning, pedicure, and manicure booking platform serving clients across Nigeria, headquartered in Abuja.
Vanilla HTML/CSS/JS single-page app with a client-side router (no page reloads),
backed by Supabase, Resend, Paystack, and Leaflet/OpenStreetMap/Nominatim.

## Structure

- `index.html` — app shell, fonts, CDN scripts (Leaflet, Paystack), meta scaffolding
- `css/` — tokens, base, layout, components, pages
- `js/main.js` — entry point, mounts header/footer/router
- `js/router/router.js` — pushState router, no reloads
- `js/lib/` — data, icons, seo, supabase client (publishable key only), utils
- `js/components/` — header, footer, booking widget, calendar, map picker, testimonials, FAQ accordion, etc.
- `js/pages/` — one module per route
- `api/` — Vercel serverless functions; the ONLY place secret keys are used
- `supabase/schema.sql` — run this in the Supabase SQL editor before going live
- `favicon.*`, `og-image.jpg`, `site.webmanifest`, `robots.txt`, `sitemap.xml` — root-level static assets (kept at the project root, not in a `public/` folder, so they resolve correctly on any static server, not just frameworks with special public-folder handling)

## Environment variables (set in Vercel, not in the repo)

Copy `.env.example` to Vercel's Environment Variables screen and fill in real values:

```
PAYSTACK_PUBLIC_KEY
PAYSTACK_SECRET_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL
RESEND_NOTIFY_EMAIL
SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY
```

The Supabase **publishable** key is the only one that appears in browser-side code
(`js/lib/supabase-client.js`). The **secret** key is only ever read inside `/api/*`
functions, which run on the server. This keeps your database safe even though the
booking flow writes to it.

## What's stubbed and needs swapping before launch

1. **Paystack public key** — `js/components/paystack-checkout.js` has a placeholder
   `pk_test_...placeholder` key. Replace it with the real public key once the client
   sends it, or better, load it from `process.env.PAYSTACK_PUBLIC_KEY` via a small
   `/api/config` endpoint if you don't want it hardcoded in a client file.
2. **Paystack secret key** — set `PAYSTACK_SECRET_KEY` in Vercel; `/api/verify-payment.js`
   is already wired to verify transactions server-side once it's set.
3. **Images** — all photography is pulled live from Unsplash CDN URLs centralized in
   `js/lib/data.js` (`images` object). These were selected from memory in a sandboxed
   environment without live internet access, so please spot-check each URL after
   deploying and swap any that 404 — it's a one-line change per image, all in one file.
4. **Domain** — `js/lib/seo.js` and `sitemap.xml` assume `https://chyrahplace.com`.
   Update `SITE_URL` in `seo.js` and the sitemap once the real domain is confirmed.
5. **Logo** — `assets/icons/logo.svg` is an original recreation of the concentric-arch
   mark from the flyer (not a pixel copy of the client's file), used for the header,
   favicon, and OG image. Swap in the client's actual logo file if they provide one.

## Local development

```
npm run dev
```

This serves the static files on `http://localhost:3000`. The `/api` functions only run
when deployed to Vercel (or via `vercel dev` locally if you have the Vercel CLI installed).

## Deployment (Vercel)

1. Push this project to a GitHub repo.
2. Import it in Vercel.
3. Add the environment variables listed above.
4. Run `supabase/schema.sql` in your Supabase project's SQL editor.
5. Deploy.

## SEO notes

Meta tags, canonical URLs, Open Graph tags, and JSON-LD are updated per route on
navigation via `js/lib/seo.js`. A static `sitemap.xml` and `robots.txt` are included.
Because this is a client-rendered SPA rather than server-rendered, search engines will
still index it (modern Googlebot renders JavaScript), but it is not as instantly
crawlable as a server-rendered site. If SEO becomes business-critical later, migrating
the page shells to a framework with SSR (e.g. Next.js) would strengthen this further.
