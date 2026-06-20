import { describe, expect, it } from 'vitest'
import { projectImageKey } from './project-images'

describe('projectImageKey', () => {
  it('keys an image by slug and filename', () => {
    expect(projectImageKey('this-site', 'thumb.png')).toBe('this-site/thumb.png')
  })

  it('strips a leading ./ from an MDX-style reference', () => {
    expect(projectImageKey('this-site', './card-grid.png')).toBe('this-site/card-grid.png')
  })

  it('strips a leading / from an absolute-looking reference', () => {
    expect(projectImageKey('this-site', '/shot.png')).toBe('this-site/shot.png')
  })
})
