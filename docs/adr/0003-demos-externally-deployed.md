# Demos are separately deployed and referenced by URL; embedded selectively

A Demo is its own repo and its own deployment, free to use whatever stack suits
that Project (not necessarily React/Node). This site references a Demo by URL — it
is **not** a monorepo that hosts the Demos. Most Cards/Walkthroughs link out to the
Demo in a new tab; for a few flagship Projects we additionally embed that same
external Demo in an iframe so an interviewer can try it without leaving the page.

## Why

Keeps each Demo free to be the right stack and keeps this repo focused on the
portfolio itself. Coupling unrelated demos into this Next app would bloat it and
force everything into one runtime — the wrong kind of over-engineering.

## Consequences

- A Project's Card carries a Demo URL and an optional "embed" flag controlling
  whether the Demo is iframed into the Walkthrough.
- Embeddable Demos must permit framing (no blanket `X-Frame-Options: DENY`).
- No single deploy guarantees a Demo is up; the site links to independently
  operated apps.
