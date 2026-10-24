# Gonçalo Lopes Rocha — Architectural Portfolio

A bespoke, responsive portfolio for architect **Gonçalo Lopes Rocha**, built from the supplied two-page English CV and project portfolio PDF (2015).

The site is a Vue 3 single-page application with an editorial, asymmetric visual language: warm paper, charcoal typography, muted clay accents, large project imagery, fine rules and generous space. It is not a generic CV template.

## Live site

**https://hdlopesrocha.github.io/glopesrocha/**

The production build is published from the `gh-pages` branch. The source is in `master`. Direct project links use generated directory shells so GitHub Pages serves them without falling back to a missing route; the `404.html` shell remains as a final fallback.

## Features

- Responsive fixed navigation with an animated active-section marker, smooth section navigation and a focus-trapped mobile menu.
- Asymmetric editorial project gallery with category filtering, region filtering, curated/year/title sorting, grid and compact-index views.
- All 21 documented projects represented in a single structured dataset.
- Dedicated project routes with browser history, close control, previous/next navigation and document metadata.
- Accessible image lightbox with keyboard controls, focus management, captions, image credits and touch swipes.
- Interactive professional timeline with employment, education and qualification records, a selected-record detail panel and a compact list view.
- Custom SVG geographic register with approximate regional markers and gallery filtering.
- Editorial About, capability and qualification sections with explicit caveats on historical claims.
- Contact section with mail link, copy-address action, visible success/error feedback and no unverified social profiles.
- Source register at `/colophon`, including attribution notes, research discrepancies, image credits and unresolved items.
- Intersection Observer reveal transitions, progressive image loading, image failure fallbacks and reduced-motion support.
- SEO metadata, Open Graph/Twitter cards, generated social image, favicon, sitemap and robots file.
- GitHub Pages SPA support via per-route directory shells and `dist/404.html`.

## Technology

- Vue 3.5 with Composition API and `<script setup>`
- Vite 7
- Vue Router 4
- Lucide icons (`@lucide/vue`)
- Plain CSS with Grid and Flexbox
- Self-hosted Newsreader and Archivo web fonts

No state-management library, animation framework or mapping library is used. Filtering and sorting are pure functions in `src/data/projects.js`.

## Local development

Requirements: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173/`).

Production build:

```bash
npm run build
npm run preview
```

The postbuild step writes `dist/404.html` (SPA fallback), `dist/.nojekyll` (GitHub Pages) and directory shells for every project route plus `/colophon/`.

## GitHub Pages deployment

The Vite base path must match the repository name:

```bash
npm run build:pages
```

This is equivalent to `VITE_BASE=/glopesrocha/ npm run build`. To rebuild and publish the result to the `gh-pages` branch in one step:

```bash
npm run deploy:pages
```

The deploy script uses the repository's `origin` remote and the locally configured Git author details.

If the repository name or hosting location changes, update:

1. `build:pages` in `package.json`
2. the canonical/Open Graph URLs in `index.html`
3. `public/robots.txt` and `public/sitemap.xml`
4. the deployment URL in this README

## Project structure

```text
src/
  components/          Reusable interface components
  composables/         Focus trap, active-section tracking, media queries
  data/
    projects.js        Project dataset, categories, regions, filters and sorting
    experience.js      Employment, education, qualifications, timeline
    profile.js         Profile, About and capability content
    sources.js         Source ledger and asset credits
    atlasPaths.js      Public-domain simplified map outlines
  directives/reveal.js Intersection Observer reveal directive
  router/index.js      Routes, scroll behaviour and page metadata
  styles/main.css      Design tokens, typography, resets and global utilities
  utils/               Asset URLs, motion preferences, SEO helpers
  views/               Home, Project, Colophon and 404 views
public/
  images/              Optimised portfolio imagery and social image
  fonts/               Self-hosted font files
  favicon.svg
  robots.txt
  sitemap.xml
scripts/postbuild.mjs  GitHub Pages SPA fallback and .nojekyll
```

## Data and attribution

The CV is treated as a primary historical document. Project captions, employment dates, locations and qualifications are preserved. Public sources are used only where they can be cited and are listed in `/colophon`.

Important attribution decisions:

- **Voz do Mar** is not presented as authored by Gonçalo Lopes Rocha. Public sources credit the original installation to Pancho Guedes with João Magala and Pedro Ressano Garcia; Ressano Garcia Arquitectos carried out the later permanent rehabilitation. The CV association is retained with an explicit attribution note.
- **House in Restelo** and **Companhia das Culturas** have date discrepancies between the CV and public records. Both are retained and flagged.
- **Casa na Comporta / Holidays House** is cross-referenced with AMB Arquitectos’ record, which lists a “Gonçalo Rocha” among collaborators. No sole authorship is claimed.
- **Pacific New Ocean Prison** is labelled conceptual and is not presented as a built facility.
- No current employer, current registration status, current job title, social profiles, awards or additional contact details have been invented.

## Image rights

All project images are low-resolution reproductions extracted from the supplied 2015 CV/portfolio PDF. The photographer is not identified in the source document. They are included as portfolio material supplied for this project, not as openly licensed imagery.

Before using this site as a permanent public portfolio, replace these images with rights-cleared, higher-resolution originals and record the photographer credits. The drawing and map geometry are credited in `/colophon`.

The raw CV PDF is intentionally excluded from the public repository because it contains historical contact details that are not published on the site.

## Items requiring confirmation

- Whether to publish the historical UK phone number; it is intentionally omitted.
- Current ARB registration status (the CV number is treated as a historical claim).
- Photographer credits for all supplied project images.
- Higher-resolution photography, drawings, plans, sections, models or construction photographs.
- Confirmation of the current email address and any verified professional profiles.
- Project-specific roles or credits that can be supported by original studio records.
