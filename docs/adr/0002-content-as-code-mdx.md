# Projects and Walkthroughs are content-as-code (MDX), not a CMS or database

Each Project is a single MDX file in the repo: frontmatter holds the Card metadata
(title, blurb, tags, thumbnail, demo/repo links), the body is the optional
Walkthrough (Markdown + embedded React components). A typed schema validates
frontmatter at build time.

## Why

For a handful of Projects, content-as-code is faster to write, diffs reviewably in
git, and needs no running datastore. It keeps the "running server" decision
(ADR-0001) justified by genuinely server-shaped features (contact form, view
counts, future demos) rather than a self-built CMS we'd maintain for ~five posts.

## Considered and rejected

- **Headless CMS (Sanity/Contentful)** — nice integration to show off, but an
  external account/dependency for very little content.
- **Database + authed admin (Postgres/Prisma + `/admin`)** — maximal full-stack
  showcase, but building a mini-CMS to store our own blog posts is the wrong place
  to spend the "overengineer a bit" budget. A real Demo is a better showcase.

## Consequences

- Adding/editing a Project means a commit + deploy, not a CMS edit. Acceptable for
  a personal site.
