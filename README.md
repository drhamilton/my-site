# my-site

Personal portfolio site for Dillon Hamilton — built to showcase work. The centre of gravity is the **Projects** area: each Project appears
as a Card and may have an in-depth Walkthrough and/or a link to a running Demo.

The site is itself a portfolio piece — a live, server-rendered Next.js
application rather than a static page.

## Stack

- **Next.js** (App Router, server-rendered) + **React 19**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **TypeScript**
- Icons: [`@icons-pack/react-simple-icons`](https://www.npmjs.com/package/@icons-pack/react-simple-icons) (brand) + [`lucide-react`](https://lucide.dev) (UI)
- Deployed on **Vercel**

## Develop

```bash
npm install
npm run dev      # start the dev server (http://localhost:3000)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Project structure

```
app/             # Next.js App Router (layout, pages, global styles)
public/          # static assets (favicon, …)
CONTEXT.md       # domain glossary — the project's vocabulary
docs/adr/        # architecture decision records (why the site is built this way)
docs/agents/     # how AI agents operate in this repo
design/          # design-system preview cards
```

## Background

- **[`CONTEXT.md`](./CONTEXT.md)** — the ubiquitous language (Project, Card,
  Walkthrough, Demo).
- **[`docs/adr/`](./docs/adr/)** — architecture decisions: Next.js server-rendered
  (0001), MDX content-as-code (0002), externally-deployed Demos (0003).
