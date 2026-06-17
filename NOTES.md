# my-site — working notes

Personal portfolio site. Last updated 2026-06-16.

## Stack
- Vite + React + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- Icons: `@icons-pack/react-simple-icons` (brand) + `lucide-react` (UI)

Scripts: `npm run dev` · `npm run build` · `npm run preview`

## Current design
A Tokyo Metro **exit-sign** layout, on a tiled station-wall background, with two
black-bordered panels:

- **Yellow identity panel** — "Portfolio" eyebrow, name (`Dillon Hamilton`,
  Helvetica bold), role, and a **directory list** (About / Projects / Writing /
  Résumé) each with an outlined `[01]` code chip + subtitle. "Sections" bottom-right.
- **White connect panel** — socials as colored Tokyo Metro **line roundels**
  (GitHub black, LinkedIn blue, Email red) with the brand glyph inside, label, and
  handle underneath.

Panels sit side-by-side on desktop, stack on mobile.

## Design tokens (`src/index.css`)
- `--color-exit: #f4c500` (exit-sign yellow)
- `--font-sans`: Helvetica Neue / Helvetica / Noto Sans JP / Arial
- `.tiles` — CSS grid background mimicking the station wall

## Key files
- `src/App.tsx` — entire page: `Chip`, `LineRoundel`, `LinkedInIcon`, `directory[]`,
  `socials[]`, and the two-panel layout
- `src/index.css` — Tailwind import + theme tokens + `.tiles`
- `index.html` — `<title>` set to "Dillon Hamilton"

## Design journey (how we got here)
1. Plain React+Tailwind hero
2. NASA Graphics Standards Manual style (Helvetica, red blocks, arrow bars)
3. Tokyo Metro station board (roundel, line color, prev/next) — dropped katakana
4. Hybrid "Transit Standards" (NASA grid + Metro roundel) — lightened name, top-left
5. Socials as a subway **route line** with station dots → then icon roundels
6. **Current:** two-panel exit sign (from the Ueno exit-sign reference image)

### Notable decisions
- Removed Japanese labels and the "Line" suffix — felt too literal
- Removed decorative block arrows (did nothing, looked off)
- LinkedIn icon is inlined: it was removed from both Simple Icons and Lucide over
  brand-policy takedowns, so no package ships it

## Placeholders to replace
- Social handles + `href`s in `socials[]` (currently `github.com/dillon`, etc.)
- Directory links all point to `#` — wire to real sections or trim
- Bio/role text in the yellow panel

## Next steps (not started)
- Build the directory sections (Projects grid is highest impact) + smooth-scroll
- Favicon (make a `DH` roundel; still Vite default)
- Meta / OG tags for social sharing
- Deploy (Vercel/Netlify autodetect Vite) — repo is not yet `git init`-ed
- Decide on exact Helvetica (self-host) vs system fallback
