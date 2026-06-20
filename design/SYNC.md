# Design sync status

Local mirror of the **"my-site signage"** Claude Design project
(`projectId 7f4c1680-0b53-45b7-84a0-ede00999e751`), the source of truth for the
Beacon design system the site is built on.

## Synced (this pass)

- `styles.css` — Beacon tokens (color, type, spacing).
- `components/` — `CodeChip`, `PixelAccent`, `ProjectCard`, `IdentityPanel`,
  `NavTile` (`.jsx` sources; `ProjectCard.html` preview card).
- `templates/` — `work/Work.dc.html` (Selected Work grid),
  `portfolio-home/PortfolioHome.dc.html`.

These back the React components in `app/_components/` and the Projects pages.

## Not yet pulled (follow-up sync)

To keep this pass within budget, these remote paths were **not** mirrored and can
be pulled in a dedicated sync:

- Preview `.html` cards for `CodeChip` / `PixelAccent` / `IdentityPanel` / `NavTile`,
  and the `.d.ts` type stubs.
- Exploration cards under `design/` (`explore-*.html`, `inspiration-index.html`,
  `pixel-accent-lab.html`, `work-showcase.html`).
- DS scaffolding: `_ds_bundle.js`, `_ds_manifest.json`, `support.js`,
  `ds-base.js`, `Canvas.dc.html`, `_adherence.oxlintrc.json`, `readme.md`.

The legacy flat cards (`chip.html`, `exit-sign.html`, `line-roundel.html`,
`tokens.html`) predate Beacon and are superseded — `exit-sign.html` still shows
the old home with the dropped **Writing** entry.
