import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'

/** Where Project content lives: one directory per Project, each with an index.mdx. */
const CONTENT_DIR = join(process.cwd(), 'content', 'projects')

/**
 * Card metadata carried in each Project's frontmatter. Validated when the file
 * is read, so invalid or incomplete frontmatter throws rather than shipping —
 * pages that consume this module fail the build on bad content (ADR-0002).
 */
const frontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be kebab-case'),
  blurb: z.string().min(1),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  thumbnail: z.string().optional(),
  demoUrl: z.url().optional(),
  repoUrl: z.url().optional(),
  embed: z.boolean().default(false),
  featured: z.boolean().default(false),
})

export type ProjectFrontmatter = z.infer<typeof frontmatterSchema>

/** A Project as the pages consume it: validated Card metadata + Walkthrough state. */
export type Project = ProjectFrontmatter & {
  /** True when the MDX body is non-empty — the Card links through to a Walkthrough. */
  hasWalkthrough: boolean
  /** The MDX body (the Walkthrough); empty string for Card-only Projects. */
  body: string
}

/**
 * Parse and validate one Project's MDX source into a domain object.
 * Throws a descriptive error naming the offending fields if frontmatter is invalid.
 */
export function parseProject(source: string, label = 'project'): Project {
  const { data, content } = matter(source)
  const result = frontmatterSchema.safeParse(data)
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n')
    throw new Error(`Invalid Project frontmatter in ${label}:\n${issues}`)
  }
  const body = content.trim()
  return { ...result.data, body, hasWalkthrough: body.length > 0 }
}

/** Ordering rule (PRD): featured Projects first, then date descending. */
function byFeaturedThenDate(a: Project, b: Project): number {
  if (a.featured !== b.featured) return a.featured ? -1 : 1
  return b.date.getTime() - a.date.getTime()
}

/**
 * Load, validate, and order every Project in a content directory. The directory
 * is overridable so the test suite can drive this with fixture MDX — this
 * function (and the two below) is the single content-access seam under test.
 */
export function loadProjects(dir: string = CONTENT_DIR): Project[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const file = join(dir, entry.name, 'index.mdx')
      return existsSync(file)
        ? parseProject(readFileSync(file, 'utf8'), `${entry.name}/index.mdx`)
        : null
    })
    .filter((project): project is Project => project !== null)
    .sort(byFeaturedThenDate)
}

/** Every Project, validated and ordered — consumed by the Projects index (Card grid). */
export function getProjects(): Project[] {
  return loadProjects()
}

/** One Project by slug, or undefined when no Project has that slug. */
export function getProjectBySlug(
  slug: string,
  dir: string = CONTENT_DIR,
): Project | undefined {
  return loadProjects(dir).find((project) => project.slug === slug)
}
