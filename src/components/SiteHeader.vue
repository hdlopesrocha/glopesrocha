<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, X, ArrowUpRight } from '@lucide/vue'
import { NAV_LINKS, PROFILE } from '../data/profile.js'
import { useActiveSection } from '../composables/useActiveSection.js'
import { useFocusTrap } from '../composables/useFocusTrap.js'
import { prefersReducedMotion, scrollToElement } from '../utils/motion.js'

const route = useRoute()
const router = useRouter()
const activeSection = useActiveSection(NAV_LINKS.map((link) => link.id))
const menuOpen = ref(false)
const scrolled = ref(false)
const menuPanel = ref(null)
const menuButton = ref(null)
const isHome = computed(() => route.path === '/')
const homeHref = import.meta.env.BASE_URL || '/'

const closeMenu = () => {
  menuOpen.value = false
}

useFocusTrap({
  container: menuPanel,
  active: menuOpen,
  onClose: closeMenu,
})

const navigateToSection = (id) => {
  menuOpen.value = false
  if (route.path === '/') {
    window.history.replaceState(window.history.state, '', `#${id}`)
    scrollToElement(id)
  } else {
    router.push({ path: '/', hash: `#${id}` })
  }
}

const goHome = () => {
  menuOpen.value = false
  if (route.path === '/') {
    window.history.replaceState(window.history.state, '', '#top')
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  } else {
    router.push('/')
  }
}

let frame = 0
const onScroll = () => {
  if (frame) return
  frame = window.requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 24
    frame = 0
  })
}

const onKeydown = (event) => {
  if (event.key === 'Escape' && menuOpen.value) closeMenu()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  if (frame) window.cancelAnimationFrame(frame)
})

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <div class="header-inner shell">
      <a class="brand" :href="`${homeHref}#top`" @click.prevent="goHome" aria-label="Gonçalo Lopes Rocha — go to top">
        <span class="brand__mark" aria-hidden="true">GLR</span>
        <span class="brand__name">
          <span class="brand__full">Gonçalo Lopes Rocha</span>
          <span class="brand__role">Architect</span>
        </span>
      </a>

      <nav class="desktop-nav" aria-label="Primary navigation">
        <a
          v-for="link in NAV_LINKS"
          :key="link.id"
          :href="`${homeHref}#${link.id}`"
          class="desktop-nav__link"
          :class="{ 'is-active': isHome && activeSection === link.id }"
          :aria-current="isHome && activeSection === link.id ? 'location' : undefined"
          @click.prevent="navigateToSection(link.id)"
        >
          {{ link.label }}
        </a>
        <span class="desktop-nav__status" aria-hidden="true">
          {{ PROFILE.location }}
        </span>
      </nav>

      <button
        ref="menuButton"
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        @click="menuOpen = !menuOpen"
      >
        <span>{{ menuOpen ? 'Close' : 'Menu' }}</span>
        <Menu v-if="!menuOpen" :size="19" :stroke-width="1.5" />
        <X v-else :size="19" :stroke-width="1.5" />
      </button>
    </div>

    <Teleport to="body">
      <Transition name="menu">
        <div
          v-if="menuOpen"
          id="mobile-navigation"
          ref="menuPanel"
          class="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          @click.self="closeMenu"
        >
          <div class="mobile-menu__top shell">
            <div class="mobile-menu__identity">
              <span class="brand__mark" aria-hidden="true">GLR</span>
              <span class="mobile-menu__name">{{ PROFILE.name }}</span>
            </div>
            <button class="mobile-close" type="button" data-autofocus @click="closeMenu">
              <span>Close</span>
              <X :size="20" :stroke-width="1.5" />
            </button>
          </div>

          <nav class="mobile-menu__nav shell" aria-label="Mobile navigation">
            <ol>
              <li v-for="(link, index) in NAV_LINKS" :key="link.id">
                <a
                  :href="`${homeHref}#${link.id}`"
                  class="mobile-menu__link"
                  :class="{ 'is-active': isHome && activeSection === link.id }"
                  :aria-current="isHome && activeSection === link.id ? 'location' : undefined"
                  @click.prevent="navigateToSection(link.id)"
                >
                  <span class="mobile-menu__index">0{{ index + 1 }}</span>
                  <span>{{ link.label }}</span>
                  <ArrowUpRight :size="24" :stroke-width="1.25" aria-hidden="true" />
                </a>
              </li>
            </ol>
          </nav>

          <div class="mobile-menu__foot shell">
            <div>
              <p class="eyebrow eyebrow--muted">Professional enquiries</p>
              <a class="mobile-menu__email" :href="`mailto:${PROFILE.email}`">{{ PROFILE.email }}</a>
            </div>
            <p class="mobile-menu__meta">
              {{ PROFILE.name }}<br />
              {{ PROFILE.location }}
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  height: var(--nav-h);
  background: rgba(243, 238, 229, 0.97);
  border-bottom: 1px solid transparent;
  transition: border-color 250ms var(--quick), background 250ms var(--quick);
}

.site-header.is-scrolled {
  border-bottom-color: var(--line);
  background: var(--paper);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 2rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  color: var(--ink);
  text-decoration: none;
  white-space: nowrap;
}

.brand__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--ink);
  border-radius: 50%;
  font-family: var(--serif);
  font-size: 0.84rem;
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1;
  transition: color 220ms var(--quick), border-color 220ms var(--quick);
}

.brand:hover .brand__mark {
  color: var(--clay);
  border-color: var(--clay);
}

.brand__name {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
}

.brand__full {
  font-family: var(--serif);
  font-size: 1.1rem;
  letter-spacing: -0.015em;
}

.brand__role {
  color: var(--muted);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: clamp(1.25rem, 2.3vw, 2.5rem);
}

.desktop-nav__link {
  position: relative;
  padding-block: 0.6rem;
  color: var(--ink-soft);
  font-size: 0.645rem;
  font-weight: 500;
  letter-spacing: 0.13em;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 200ms var(--quick);
}

.desktop-nav__link::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: var(--clay);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 350ms var(--ease);
}

.desktop-nav__link:hover,
.desktop-nav__link.is-active {
  color: var(--clay);
}

.desktop-nav__link:hover::after,
.desktop-nav__link.is-active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.desktop-nav__status {
  padding-left: clamp(1.25rem, 2.3vw, 2.5rem);
  border-left: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.menu-toggle {
  display: none;
  align-items: center;
  gap: 0.6rem;
  min-height: 44px;
  color: var(--ink);
  font-size: 0.64rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 110;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: var(--paper);
  color: var(--ink);
}

.mobile-menu__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: var(--nav-h);
  border-bottom: 1px solid var(--line);
}

.mobile-menu__identity {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.mobile-menu__name {
  font-family: var(--serif);
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: -0.01em;
}

@media (max-width: 350px) {
  .mobile-menu__name {
    display: none;
  }
}

.mobile-close {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 44px;
  font-size: 0.64rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.mobile-menu__nav {
  padding-top: clamp(2.5rem, 8vh, 5rem);
  padding-bottom: 2rem;
}

.mobile-menu__nav ol {
  border-top: 1px solid var(--line);
}

.mobile-menu__nav li {
  border-bottom: 1px solid var(--line);
}

.mobile-menu__link {
  display: grid;
  grid-template-columns: 2.5rem 1fr auto;
  align-items: baseline;
  gap: 0.75rem;
  padding-block: clamp(1.15rem, 3vh, 1.8rem);
  color: var(--ink);
  font-family: var(--serif);
  font-size: clamp(2.4rem, 9vw, 4.3rem);
  font-weight: 300;
  letter-spacing: -0.035em;
  line-height: 0.95;
  text-decoration: none;
  transition: color 200ms var(--quick);
}

.mobile-menu__link:hover,
.mobile-menu__link:focus-visible,
.mobile-menu__link.is-active {
  color: var(--clay);
}

.mobile-menu__link.is-active .mobile-menu__index {
  color: var(--clay);
}

.mobile-menu__index {
  color: var(--muted);
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.12em;
}

.mobile-menu__foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: auto;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  border-top: 1px solid var(--line);
}

.mobile-menu__email {
  display: inline-block;
  margin-top: 0.4rem;
  font-family: var(--serif);
  font-size: clamp(1.25rem, 5vw, 1.8rem);
  text-decoration: none;
}

.mobile-menu__meta {
  color: var(--muted);
  font-size: 0.64rem;
  letter-spacing: 0.08em;
  line-height: 1.7;
  text-transform: uppercase;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 280ms var(--quick), transform 420ms var(--ease);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@media (max-width: 1040px) {
  .desktop-nav__status {
    display: none;
  }

  .brand__role {
    display: none;
  }
}

@media (max-width: 880px) {
  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .brand__name {
    display: none;
  }
}

@media (max-width: 480px) {
  .brand__mark {
    width: 34px;
    height: 34px;
  }

  .mobile-menu__link {
    grid-template-columns: 1.9rem 1fr auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-enter-active,
  .menu-leave-active {
    transition: none;
  }
}
</style>
