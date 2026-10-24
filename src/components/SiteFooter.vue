<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ArrowUpRight, ArrowUp } from '@lucide/vue'
import { NAV_LINKS, PROFILE } from '../data/profile.js'
import { scrollToElement, prefersReducedMotion } from '../utils/motion.js'

const route = useRoute()
const router = useRouter()
const year = new Date().getFullYear()
const homeHref = import.meta.env.BASE_URL || '/'

const goToSection = (id) => {
  if (route.path === '/') {
    window.history.replaceState(window.history.state, '', `#${id}`)
    scrollToElement(id)
  } else {
    router.push({ path: '/', hash: `#${id}` })
  }
}

const toTop = () => {
  if (route.path === '/') {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  } else {
    router.push('/')
  }
}
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__main shell">
      <div class="site-footer__identity">
        <button type="button" class="site-footer__mark" aria-label="Back to top" @click="toTop">
          GLR
        </button>
        <div>
          <p class="site-footer__name">{{ PROFILE.name }}</p>
          <p class="site-footer__meta">Architecture · Portfolio · 2012—2015</p>
        </div>
      </div>

      <nav class="site-footer__nav" aria-label="Footer navigation">
        <a
          v-for="link in NAV_LINKS"
          :key="link.id"
          :href="`${homeHref}#${link.id}`"
          @click.prevent="goToSection(link.id)"
        >
          {{ link.label }}
        </a>
        <RouterLink to="/colophon">Sources &amp; credits</RouterLink>
      </nav>

      <div class="site-footer__actions">
        <RouterLink to="/colophon" class="site-footer__source-link">
          Research record
          <ArrowUpRight :size="14" :stroke-width="1.4" aria-hidden="true" />
        </RouterLink>
        <button type="button" class="site-footer__top" @click="toTop">
          Back to top
          <ArrowUp :size="14" :stroke-width="1.4" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div class="site-footer__bottom shell">
      <p>© {{ year }} {{ PROFILE.name }}. All project images reproduced from the supplied 2015 CV dossier; photographers unidentified.</p>
      <p>Built as a bespoke Vue portfolio. No invented projects or authorship claims.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--paper);
  border-top: 1px solid var(--line);
  padding-top: clamp(2.5rem, 5vw, 4rem);
  padding-bottom: 1.4rem;
}

.site-footer__main {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1.2fr) auto;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
  padding-bottom: clamp(2.5rem, 5vw, 4rem);
}

.site-footer__identity {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.site-footer__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  flex: 0 0 auto;
  border: 1px solid var(--ink);
  border-radius: 50%;
  color: var(--ink);
  font-family: var(--serif);
  font-size: 0.95rem;
  letter-spacing: -0.04em;
  transition: color 180ms var(--quick), border-color 180ms var(--quick);
}

.site-footer__mark:hover {
  color: var(--clay);
  border-color: var(--clay);
}

.site-footer__name {
  font-family: var(--serif);
  font-size: clamp(1.4rem, 2vw, 1.9rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.site-footer__meta {
  margin-top: 0.35rem;
  color: var(--muted);
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site-footer__nav {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem 2rem;
}

.site-footer__nav a {
  width: fit-content;
  color: var(--muted);
  font-size: 0.61rem;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 180ms var(--quick);
}

.site-footer__nav a:hover {
  color: var(--clay);
}

.site-footer__actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.8rem;
}

.site-footer__source-link,
.site-footer__top {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 30px;
  color: var(--muted);
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 180ms var(--quick);
}

.site-footer__source-link:hover,
.site-footer__top:hover {
  color: var(--clay);
}

.site-footer__bottom {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.54rem;
  letter-spacing: 0.025em;
  line-height: 1.55;
}

.site-footer__bottom p {
  max-width: 42rem;
}

.site-footer__bottom p:last-child {
  text-align: right;
}

@media (max-width: 900px) {
  .site-footer__main {
    grid-template-columns: 1fr auto;
  }

  .site-footer__nav {
    grid-column: 1;
    grid-row: 2;
    max-width: 28rem;
  }

  .site-footer__actions {
    grid-column: 2;
    grid-row: 1 / span 2;
  }
}

@media (max-width: 620px) {
  .site-footer__main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .site-footer__nav {
    width: 100%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .site-footer__actions {
    align-items: flex-start;
  }

  .site-footer__bottom {
    flex-direction: column;
    gap: 0.5rem;
  }

  .site-footer__bottom p:last-child {
    text-align: left;
  }
}
</style>
