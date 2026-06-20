import type { StaticImageData } from 'next/image'

/**
 * Registry of images co-located with a Project. Each Project's thumbnail and
 * Walkthrough screenshots live next to its `index.mdx` (committed to git);
 * eagerly importing them here hands `next/image` the intrinsic dimensions and
 * blur placeholder it needs to resize, lazy-load, and serve modern formats —
 * without copying anything into `public/`.
 *
 * Keyed by `<slug>/<filename>` (e.g. `this-site/thumb.png`), matching how a
 * Project references its own files: the frontmatter `thumbnail` and the MDX
 * `![](./thumb.png)` body images are both just filenames relative to the
 * Project directory.
 */

/** Normalize a Project-relative reference (`./thumb.png`) into a registry key. */
export function projectImageKey(slug: string, file: string): string {
  return `${slug}/${file.replace(/^\.?\//, '')}`
}

let registry: Map<string, StaticImageData> | null = null

/**
 * Build (once) the slug/filename → image map from the co-located content. The
 * `import.meta.webpackContext` call is a build-time glob that only exists under
 * webpack, so it's deferred to first lookup — modules that merely import this
 * file (e.g. the unit tests) never trigger it.
 */
function getRegistry(): Map<string, StaticImageData> {
  if (registry) return registry
  const ctx = import.meta.webpackContext('../content/projects', {
    recursive: true,
    regExp: /\.(png|jpe?g|webp|avif|gif)$/,
  })
  registry = new Map(
    ctx.keys().map((key) => [key.replace(/^\.\//, ''), ctx(key).default] as const),
  )
  return registry
}

/** The co-located image for `<slug>/<file>`, or `undefined` if there's no match. */
export function getProjectImage(slug: string, file: string): StaticImageData | undefined {
  return getRegistry().get(projectImageKey(slug, file))
}
