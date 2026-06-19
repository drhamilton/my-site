# Next.js, server-rendered (not a static SPA or static export)

We are migrating the portfolio from a Vite + React SPA to **Next.js (App Router),
deployed as a running server** rather than a static export.

## Why

The site doubles as a live, production Next.js application, so it runs on a real
server rather than shipping as static files. A server runtime leaves room to grow
in-site interactive features — API routes, server actions, a contact form, view
counters, possibly auth-gated content — without re-platforming later. SEO and
OG link previews also come for free, which matters when sharing links to
individual Walkthroughs.

## Considered and rejected

- **Vite SPA + router** — smallest change, but client-rendered: weak SEO and no
  OG link previews without extra work, so shared links look plain.
- **Astro (static)** — the conventional content-portfolio choice and lightest for
  pure content; rejected because a static build forecloses the in-site interactive
  features above.
- **Next.js static export** — gets SEO/OG without a server, but gives up the
  server-side capabilities that motivate choosing Next here.

## Consequences

- Deployed to **Vercel** (free tier): first-party Next host, per-PR preview
  deploys, easy custom domain. Demos are deployed independently (ADR-0003).
- More moving parts than a static site, accepted in exchange for the platform
  headroom.
- Server-side features roll out in phases: v1 focuses on the Projects content and
  establishes the platform; the contact form, view counts, and similar land
  afterward.
