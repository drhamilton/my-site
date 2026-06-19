import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getProjectBySlug, loadProjects, parseProject } from './projects'

const FIXTURES = join(process.cwd(), 'test', 'fixtures', 'projects')

const bySlug = (slug: string) => loadProjects(FIXTURES).find((p) => p.slug === slug)!

describe('loadProjects', () => {
  it('parses valid frontmatter into a Project', () => {
    const alpha = bySlug('alpha')
    expect(alpha.title).toBe('Alpha Project')
    expect(alpha.blurb).toBe('The first test project.')
    expect(alpha.tags).toEqual(['typescript', 'next'])
    expect(alpha.featured).toBe(true)
    expect(alpha.date).toBeInstanceOf(Date)
  })

  it('defaults the optional fields', () => {
    const beta = bySlug('beta')
    expect(beta.tags).toEqual([])
    expect(beta.embed).toBe(false)
    expect(beta.featured).toBe(false)
    expect(beta.demoUrl).toBeUndefined()
    expect(beta.thumbnail).toBeUndefined()
  })

  it('orders featured first, then by date descending', () => {
    // alpha is featured; beta (2026) is newer than gamma (2024).
    expect(loadProjects(FIXTURES).map((p) => p.slug)).toEqual([
      'alpha',
      'beta',
      'gamma',
    ])
  })

  it('treats an empty body as Card-only and a non-empty body as a Walkthrough', () => {
    expect(bySlug('gamma').hasWalkthrough).toBe(false)
    expect(bySlug('gamma').body).toBe('')
    expect(bySlug('alpha').hasWalkthrough).toBe(true)
  })

  it('surfaces demoUrl, repoUrl, and embed', () => {
    const gamma = bySlug('gamma')
    expect(gamma.demoUrl).toBe('https://gamma.example.com')
    expect(gamma.repoUrl).toBe('https://github.com/example/gamma')
    expect(gamma.embed).toBe(true)
  })

  it('returns an empty list for a directory with no Projects', () => {
    expect(loadProjects(join(FIXTURES, 'does-not-exist'))).toEqual([])
  })
})

describe('getProjectBySlug', () => {
  it('returns the matching Project', () => {
    expect(getProjectBySlug('beta', FIXTURES)?.title).toBe('Beta Project')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('nope', FIXTURES)).toBeUndefined()
  })
})

describe('parseProject validation', () => {
  const valid = [
    '---',
    'title: Valid',
    'slug: valid',
    'blurb: A blurb.',
    'date: 2024-01-01',
    '---',
    'body',
  ].join('\n')

  it('accepts valid frontmatter', () => {
    expect(parseProject(valid).slug).toBe('valid')
  })

  it('rejects missing required fields, naming the field', () => {
    expect(() => parseProject(valid.replace('title: Valid\n', ''))).toThrow(/title/)
    expect(() => parseProject(valid.replace('slug: valid\n', ''))).toThrow(/slug/)
    expect(() => parseProject(valid.replace('blurb: A blurb.\n', ''))).toThrow(/blurb/)
  })

  it('rejects an invalid date', () => {
    expect(() =>
      parseProject(valid.replace('date: 2024-01-01', 'date: not-a-date')),
    ).toThrow(/date/)
  })

  it('rejects a non-kebab-case slug', () => {
    expect(() => parseProject(valid.replace('slug: valid', 'slug: Not Valid'))).toThrow(
      /slug/,
    )
  })

  it('rejects a malformed demoUrl', () => {
    const withBadUrl = valid.replace(
      'date: 2024-01-01',
      'date: 2024-01-01\ndemoUrl: not-a-url',
    )
    expect(() => parseProject(withBadUrl)).toThrow(/demoUrl/)
  })
})
