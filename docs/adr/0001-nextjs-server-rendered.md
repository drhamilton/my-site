# Next.js, server-rendered (not a static SPA or static export)

We are migrating the portfolio from a Vite + React SPA to **Next.js (App Router),
deployed as a running server** rather than a static export.

## Why

The site is itself a portfolio piece — it should demonstrate the ability to build
and operate a real React/Next application, not just a static page. We deliberately
accept some over-engineering for a content site in exchange for room to grow
app-like features (API routes, server actions, a working contact form, view
counters, possibly auth-gated content) and for the showcase value of running a
real server.

## Considered and rejected

- **Stay a Vite SPA + router** — smallest change, but client-rendered: weak SEO and
  no OG link previews without bolt-ons. Link-sharing into interviews/LinkedIn would
  look plain.
- **Astro (static)** — the conventional content-portfolio choice and genuinely the
  lightest fit for the *content*; rejected because it doesn't showcase server-side
  engineering and boxes us out of in-site app features.
- **Next.js static export** — gets SEO/OG with no server, but gives up the very
  server features that justify choosing Next over Astro.

## Consequences

- Deployed to **Vercel** (free tier): first-party Next host, per-PR preview
  deploys, easy custom domain. Self-hosting was rejected for the main site — that
  "I can run infra" showcase is reserved for the Demos (ADR-0003).
- More moving parts than a static site; that cost is accepted intentionally.
- **v1 ships no server-side features.** The running server is foundation/headroom,
  not an active need — in practice v1 behaves like a static site. Server-shaped
  features (contact form, view counts, etc.) are deferred. If none materialise, a
  future ADR could reasonably revisit this and drop to static export.
