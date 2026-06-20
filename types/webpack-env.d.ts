import type { StaticImageData } from 'next/image'

/**
 * webpack 5's build-time directory glob. Used to eagerly import every image
 * co-located with a Project (see `lib/project-images.ts`) so `next/image` can
 * optimize it. Only webpack provides this at build; it is `undefined` under
 * Node/vitest, where the registry is never built. Declared here because the
 * project doesn't pull in `@types/webpack-env`.
 */
declare global {
  interface ImportMeta {
    webpackContext(
      request: string,
      options?: {
        recursive?: boolean
        regExp?: RegExp
        mode?: 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once'
      },
    ): {
      keys(): string[]
      (id: string): { default: StaticImageData }
      id: string
    }
  }
}
