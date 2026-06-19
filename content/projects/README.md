# Projects content

One **Project** per directory, each holding an `index.mdx`:

```
content/projects/
  my-cool-thing/
    index.mdx        ← frontmatter (Card) + optional body (Walkthrough)
    screenshot.png   ← co-located images (wired up in #6)
```

The frontmatter is validated at build time by `lib/projects.ts`; invalid or
incomplete frontmatter fails the build, so broken content never ships.

## Frontmatter schema

| Field       | Required | Type      | Notes                                            |
| ----------- | -------- | --------- | ------------------------------------------------ |
| `title`     | yes      | string    | Project name shown on the Card                   |
| `slug`      | yes      | string    | kebab-case; the `/projects/<slug>` URL           |
| `blurb`     | yes      | string    | one-line Card summary                            |
| `date`      | yes      | date      | `YYYY-MM-DD`; used for ordering                  |
| `tags`      | no       | string[]  | tech/tags shown on the Card (default `[]`)       |
| `thumbnail` | no       | string    | Card thumbnail image                             |
| `demoUrl`   | no       | url       | link to the running Demo                         |
| `repoUrl`   | no       | url       | link to the source repo                          |
| `embed`     | no       | boolean   | iframe the Demo into the Walkthrough (default `false`) |
| `featured`  | no       | boolean   | pin to the top of the index (default `false`)    |

## Card-only vs Walkthrough

Whether a Project has a Walkthrough is **implicit in the body**: an empty MDX
body means Card-only (the Card links out to the Demo/repo), and a non-empty body
means the Card links through to a Walkthrough. There is no `hasWalkthrough` flag.

## Ordering

`featured` Projects first, then by `date` descending.
