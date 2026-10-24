import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(process.cwd(), 'dist')
const indexPath = resolve(dist, 'index.html')
const fallbackPath = resolve(dist, '404.html')
const nojekyllPath = resolve(dist, '.nojekyll')

if (!existsSync(indexPath)) {
  throw new Error('Build output is missing dist/index.html')
}

// GitHub Pages serves 404.html for unknown deep links. Using the SPA shell
// there lets the Vue router resolve /work/:id routes on a hard refresh.
copyFileSync(indexPath, fallbackPath)
writeFileSync(nojekyllPath, '')
console.log('Postbuild: wrote dist/404.html and dist/.nojekyll')
