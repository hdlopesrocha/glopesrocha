import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(process.cwd(), 'dist')
const indexPath = resolve(dist, 'index.html')
const fallbackPath = resolve(dist, '404.html')
const nojekyllPath = resolve(dist, '.nojekyll')

if (!existsSync(indexPath)) {
  throw new Error('Build output is missing dist/index.html')
}

// GitHub Pages serves 404.html for unknown deep links. Using the SPA shell
// there lets the Vue router resolve routes on a hard refresh.
copyFileSync(indexPath, fallbackPath)
writeFileSync(nojekyllPath, '')

// GitHub Pages does not rewrite arbitrary paths to index.html. Creating a
// directory shell for each real route gives direct project links a 200/301
// response while the client-side router takes over immediately.
const projectsSource = readFileSync(resolve(process.cwd(), 'src/data/projects.js'), 'utf8')
const projectsStart = projectsSource.indexOf('export const PROJECTS = [')
const projectsEnd = projectsSource.indexOf('export const PROJECT_MAP')
const projectBlock =
  projectsStart >= 0 && projectsEnd > projectsStart
    ? projectsSource.slice(projectsStart, projectsEnd)
    : ''
const projectIds = [...projectBlock.matchAll(/^ {4}id: '([^']+)',/gm)].map((match) => match[1])

for (const id of projectIds) {
  const directory = resolve(dist, 'work', id)
  mkdirSync(directory, { recursive: true })
  copyFileSync(indexPath, resolve(directory, 'index.html'))
}

mkdirSync(resolve(dist, 'colophon'), { recursive: true })
copyFileSync(indexPath, resolve(dist, 'colophon/index.html'))

console.log(
  `Postbuild: wrote 404 fallback, .nojekyll and ${projectIds.length + 1} route shells`,
)
