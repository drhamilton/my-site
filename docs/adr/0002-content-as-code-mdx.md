# Projects and Walkthroughs are content-as-code (MDX), not a CMS or database

Each Project is a single MDX file in the repo: frontmatter holds the Card metadata
(title, blurb, tags, thumbnail, demo/repo links), the body is the optional
Walkthrough (Markdown + embedded React components). A typed schema validates
frontmatter at build time.

## Why

For a small, curated set of Projects, content-as-code is fast to author, diffs
reviewably in git, and needs no running datastore. The server runtime (ADR-0001)
is reserved for genuinely interactive features rather than serving content that
ships just as well as files.

## Considered and rejected

- **Headless CMS (Sanity/Contentful)** — a nice integration, but an external
  account and dependency for a small amount of content.
- **Database + authed admin (Postgres/Prisma + `/admin`)** — a fuller full-stack
  build, but maintaining a bespoke CMS for a handful of curated Projects isn't
  worth the complexity; interactive Demos are a better use of that effort.

## Consequences

- Adding or editing a Project means a commit + deploy, not a CMS edit — fine for a
  curated personal portfolio.
