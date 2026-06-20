---
name: project-from-repo
description: Turn an existing codebase into a portfolio Project (schema-correct MDX) by interviewing the user about it. Use when the user wants to add a Project from a repo, write up an existing codebase as a Card/Walkthrough, or mentions "project from repo".
---

Generate one portfolio **Project** — a `content/projects/<slug>/index.mdx` whose
frontmatter is the **Card** and whose body is the optional **Walkthrough** — from
an existing codebase. Use the repo's domain vocabulary (`CONTEXT.md`: Project,
Card, Walkthrough, Demo) and never drift to the synonyms it lists to avoid.

The schema is **single-sourced** in `content/projects/README.md` and enforced by
`lib/projects.ts`; read the README's frontmatter table before drafting and match
it exactly — do not restate the field list here.

## 1. Collect inputs

Required: the **local path** to the project's repo. Optional: a **Demo URL** and a
**repo URL**. Ask only for the path if it's missing; derive the rest:

- repo URL → `git -C <path> remote get-url origin`
- Demo URL → a homepage/badge in the project's README or `package.json`

## 2. Explore before interviewing

Read the target repo's README, package manifest, and source layout so you can
**recommend** answers in the interview instead of asking blind. Infer:

- **tags** — languages, frameworks, notable libraries
- **type** — `frontend` if it ships a UI (web app, `index.html`, a dev server),
  else `server`
- raw material for the Problem / Approach / Result narrative

## 3. Interview the user

`/grilling` is the model: relentless, **one question at a time**, each carrying
your recommended answer from step 2. Wait for each answer before the next. Cover,
in order — **Problem**, **Approach**, **Result**, then any **Decisions** (tradeoffs
worth narrating). Stop once you have enough to write the Walkthrough.

Card-only is valid: if the user wants just a Card (Card links straight out to the
Demo/repo), skip the interview and leave the MDX body empty.

## 4. Capture the thumbnail

First match wins:

1. **Demo URL** → screenshot it:
   `node docs/agents/skills/project-from-repo/capture-thumbnail.mjs <demoUrl> content/projects/<slug>/thumb.png`
   (a fresh machine first needs `npx playwright install chromium`).
2. **A usable image in the repo** (OG image, a README/asset screenshot) → copy it
   into the Project dir.
3. **Neither** → generate a branded placeholder following the pattern in
   `content/projects/this-site/gen-images.mjs`, and add "replace the placeholder
   thumbnail with a real screenshot" to the handoff checklist.

Set `thumbnail:` to the resulting filename.

## 5. Write the Project MDX

Write `content/projects/<slug>/index.mdx`:

- **Frontmatter** matching the README schema — `date` is today; `featured` and
  `embed` default false unless the user said otherwise.
- **Body** = the Walkthrough from the interview under `## Problem`, `## Approach`,
  `## Result` headings, in the project's voice. Reference Walkthrough screenshots
  as co-located relative images (`![alt](./shot.png)`); add any you don't yet have
  to the checklist.

**Done when** the file parses: run `npm run build` (it fails the build on invalid
frontmatter, per ADR-0002), or verify every required field in the README table is
present and well-typed.

## 6. Hand off a checklist

List what's left for the user: replace a placeholder thumbnail, add Walkthrough
screenshots, confirm Demo/repo URLs, and decide `featured` / `embed`.
