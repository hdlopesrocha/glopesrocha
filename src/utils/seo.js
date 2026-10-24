import { PROFILE } from '../data/profile.js'
import { assetUrl } from './assets.js'

export const SITE_DESCRIPTION =
  'An architectural portfolio of selected work by Gonçalo Lopes Rocha, documented in his 2015 CV and project dossier: residential, commercial, hospitality, refurbishment, conceptual and object work.'

const ensureMeta = (attribute, key, content) => {
  if (typeof document === 'undefined') return
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

const ensureCanonical = (href) => {
  if (typeof document === 'undefined') return
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export function applyPageMeta({ title, description = SITE_DESCRIPTION, image = assetUrl('/images/site/og-image.jpg'), type = 'website' }) {
  if (typeof document === 'undefined') return

  const fullTitle = title ? `${title} — ${PROFILE.name}` : `${PROFILE.name} — Architect · Selected Works 2012–2015`
  const absoluteImage = new URL(image, window.location.origin).href
  const canonical = `${window.location.origin}${window.location.pathname}`

  document.title = fullTitle
  ensureMeta('name', 'description', description)
  ensureMeta('property', 'og:title', fullTitle)
  ensureMeta('property', 'og:description', description)
  ensureMeta('property', 'og:image', absoluteImage)
  ensureMeta('property', 'og:type', type)
  ensureMeta('property', 'og:url', canonical)
  ensureMeta('name', 'twitter:title', fullTitle)
  ensureMeta('name', 'twitter:description', description)
  ensureMeta('name', 'twitter:image', absoluteImage)
  ensureCanonical(canonical)
}
