// Allow side-effect imports of global stylesheets (e.g. `import './globals.css'`).
// TypeScript 6's `noUncheckedSideEffectImports` flags these without a declaration,
// and Next.js doesn't ship one.
declare module '*.css'
