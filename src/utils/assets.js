const base = import.meta.env.BASE_URL || '/'

/**
 * Prefixes a public-folder path with Vite's deployment base. This keeps the
 * portfolio portable between local development and GitHub Pages project sites.
 */
export function assetUrl(path) {
  if (!path) return path
  if (/^(https?:|mailto:|data:)/.test(path)) return path
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}
