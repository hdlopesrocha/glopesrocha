<script setup>
import { computed } from 'vue'
import { ArrowDown, ArrowUpRight } from '@lucide/vue'
import { PROFILE } from '../data/profile.js'
import { PROJECT_MAP } from '../data/projects.js'
import { scrollToElement } from '../utils/motion.js'
import PortfolioImage from './PortfolioImage.vue'

const props = defineProps({
  projectCount: { type: Number, required: true },
})

const mainProject = PROJECT_MAP['house-in-highgate']
const insetProject = PROJECT_MAP['holidays-house-carvalhal']
const mainImage = mainProject.images[0]
const insetImage = insetProject.images[0]

const countLabel = computed(
  () => `${props.projectCount} documented ${props.projectCount === 1 ? 'project' : 'projects'}`,
)

const explore = () => {
  window.history.replaceState(window.history.state, '', '#selected-work')
  scrollToElement('selected-work')
}
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="hero__grid shell">
      <div class="hero__copy" v-reveal>
        <div class="hero__meta">
          <span class="eyebrow">
            <span class="eyebrow__line" aria-hidden="true"></span>
            Selected works
          </span>
          <span class="eyebrow eyebrow--muted">2012 — 2015</span>
        </div>

        <div class="hero__identity">
          <p class="hero__name">{{ PROFILE.name }}</p>
          <p class="hero__role">{{ PROFILE.role }} · {{ PROFILE.location }}</p>
        </div>

        <h1 id="hero-title" class="hero__title">
          Architecture<br />
          between <em>precision</em>,<br />
          place and <em>experience</em>.
        </h1>

        <p class="hero__lede">{{ PROFILE.heroLede }}</p>

        <div class="hero__actions">
          <a class="hero__cta" href="#selected-work" @click.prevent="explore">
            <span>Explore selected work</span>
            <ArrowUpRight :size="18" :stroke-width="1.4" aria-hidden="true" />
          </a>
          <p class="hero__count" aria-live="polite">
            <strong>{{ projectCount }}</strong>
            <span>documented projects<br />across Portugal, the UK &amp; beyond</span>
          </p>
        </div>
      </div>

      <div class="hero__visual" v-reveal="120">
        <figure class="hero__main-figure">
          <PortfolioImage
            :src="mainImage.src"
            :srcset="mainImage.srcset"
            :alt="mainImage.alt"
            ratio="5 / 4"
            priority
            position="50% 52%"
            fallback-label="House in Highgate"
          />
          <figcaption class="hero__caption">
            <span class="hero__caption-index">01</span>
            <span>House in Highgate</span>
            <span class="hero__caption-meta">London · 2015</span>
          </figcaption>
        </figure>

        <figure class="hero__inset">
          <PortfolioImage
            :src="insetImage.src"
            :srcset="insetImage.srcset"
            :alt="insetImage.alt"
            ratio="4 / 3"
            sizes="(min-width: 1000px) 18vw, 35vw"
            position="50% 50%"
            fallback-label="Holidays House, Carvalhal"
          />
          <figcaption>
            <span>Holidays House</span>
            <span>Comporta · 2013</span>
          </figcaption>
        </figure>

        <p class="hero__vertical" aria-hidden="true">Documented work / 2012—2015</p>
      </div>
    </div>

    <div class="hero__foot shell">
      <a class="hero__scroll" href="#selected-work" @click.prevent="explore">
        <span class="hero__scroll-line" aria-hidden="true"></span>
        <span>Scroll to the work</span>
        <ArrowDown class="hero__scroll-icon" :size="15" :stroke-width="1.4" aria-hidden="true" />
      </a>
      <p class="hero__provenance">
        <span>{{ countLabel }}</span>
        <span>Portfolio assembled from the 2015 CV &amp; project dossier</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  padding-top: calc(var(--nav-h) + clamp(28px, 4.5vh, 60px));
  padding-bottom: clamp(20px, 3.2vh, 34px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(0, 0.82fr);
  gap: clamp(2rem, 6vw, 8rem);
  align-items: center;
  flex: 1;
  padding-bottom: clamp(2rem, 5vh, 4.5rem);
}

.hero__copy {
  max-width: 760px;
  padding-block: 1rem;
}

.hero__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid var(--line);
}

.hero__identity {
  margin-top: clamp(1.2rem, 3vh, 2.6rem);
}

.hero__name {
  font-family: var(--serif);
  font-size: clamp(1.35rem, 1.9vw, 1.8rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.hero__role {
  margin-top: 0.25rem;
  color: var(--muted);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero__title {
  margin-top: clamp(1.3rem, 3.5vh, 2.6rem);
  font-family: var(--serif);
  font-size: clamp(3.2rem, 5.55vw, 6.8rem);
  font-weight: 300;
  letter-spacing: -0.05em;
  line-height: 0.88;
  text-wrap: balance;
}

.hero__title em {
  font-weight: 300;
  color: var(--clay);
}

.hero__lede {
  max-width: 34rem;
  margin-top: clamp(1.3rem, 3.5vh, 2.4rem);
  color: var(--ink-soft);
  font-size: clamp(0.98rem, 1.14vw, 1.12rem);
  line-height: 1.62;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem 2.5rem;
  margin-top: clamp(1.8rem, 4.2vh, 3rem);
  padding-top: 1.3rem;
  border-top: 1px solid var(--line);
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 1.9rem;
  padding-block: 0.55rem 0.4rem;
  color: var(--ink);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-decoration: none;
  text-transform: uppercase;
  border-bottom: 1px solid var(--ink);
  transition: color 220ms var(--quick), border-color 220ms var(--quick), gap 350ms var(--ease);
}

.hero__cta:hover {
  color: var(--clay);
  border-color: var(--clay);
  gap: 2.4rem;
}

.hero__count {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
  color: var(--muted);
  font-size: 0.63rem;
  letter-spacing: 0.055em;
  line-height: 1.55;
  text-transform: uppercase;
}

.hero__count strong {
  color: var(--ink);
  font-family: var(--serif);
  font-size: 1.8rem;
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 0.8;
}

.hero__visual {
  position: relative;
  justify-self: end;
  width: 100%;
  max-width: 650px;
  padding-right: 2.1rem;
}

.hero__main-figure {
  position: relative;
  background: var(--paper-light);
}

.hero__main-figure :deep(.portfolio-image) {
  border: 1px solid var(--line);
}

.hero__caption {
  display: grid;
  grid-template-columns: 1.6rem 1fr auto;
  gap: 0.6rem;
  padding-top: 0.7rem;
  color: var(--ink-soft);
  font-size: 0.61rem;
  letter-spacing: 0.08em;
  line-height: 1.35;
  text-transform: uppercase;
}

.hero__caption-index {
  color: var(--clay);
}

.hero__caption-meta {
  color: var(--muted);
}

.hero__inset {
  position: absolute;
  right: -0.25rem;
  bottom: 2rem;
  width: clamp(155px, 16vw, 220px);
  padding: 7px;
  background: var(--paper);
  border: 1px solid var(--line);
}

.hero__inset figcaption {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.45rem;
  color: var(--muted);
  font-size: 0.52rem;
  letter-spacing: 0.075em;
  line-height: 1.35;
  text-transform: uppercase;
}

.hero__inset figcaption span:first-child {
  color: var(--ink-soft);
}

.hero__vertical {
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
  color: var(--muted);
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
}

.hero__foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
}

.hero__scroll {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 36px;
  color: var(--muted);
  font-size: 0.59rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 200ms var(--quick);
}

.hero__scroll:hover {
  color: var(--ink);
}

.hero__scroll-line {
  position: relative;
  width: 2.8rem;
  height: 1px;
  overflow: hidden;
  background: var(--line-strong);
}

.hero__scroll-line::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--clay);
  transform-origin: left;
  animation: scroll-line 2.8s var(--ease) infinite;
}

.hero__scroll-icon {
  animation: scroll-icon 2.8s var(--ease) infinite;
}

.hero__provenance {
  display: flex;
  gap: 2rem;
  color: var(--muted);
  font-size: 0.57rem;
  letter-spacing: 0.075em;
  line-height: 1.5;
  text-align: right;
  text-transform: uppercase;
}

.hero__provenance span:first-child {
  color: var(--ink-soft);
}

@keyframes scroll-line {
  0% {
    transform: scaleX(0);
  }
  45% {
    transform: scaleX(1);
    transform-origin: left;
  }
  55% {
    transform: scaleX(1);
    transform-origin: right;
  }
  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}

@keyframes scroll-icon {
  0%,
  100% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(2px);
  }
}

@media (max-width: 1100px) {
  .hero__grid {
    grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
    gap: 3.5rem;
  }

  .hero__title {
    font-size: clamp(3rem, 5.3vw, 5.2rem);
  }

  .hero__inset {
    width: 155px;
    right: 0;
  }
}

@media (max-width: 900px) {
  .hero {
    min-height: 0;
    padding-top: calc(var(--nav-h) + 2rem);
  }

  .hero__grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding-bottom: 4rem;
  }

  .hero__copy {
    max-width: none;
    padding-block: 0;
  }

  .hero__title {
    font-size: clamp(3.1rem, 10vw, 5.8rem);
    max-width: 15ch;
  }

  .hero__identity {
    margin-top: 2rem;
  }

  .hero__visual {
    justify-self: stretch;
    max-width: none;
    padding-right: 2.4rem;
  }

  .hero__main-figure {
    max-width: 680px;
    margin-left: auto;
  }

  .hero__inset {
    right: auto;
    left: 0;
    bottom: 1.5rem;
    width: 30vw;
    max-width: 210px;
  }

  .hero__vertical {
    right: 0;
  }

  .hero__lede {
    max-width: 38rem;
  }

  .hero__provenance {
    max-width: 48%;
  }
}

@media (max-width: 640px) {
  .hero__meta {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.45rem;
  }

  .hero__title {
    font-size: clamp(2.9rem, 13vw, 4.7rem);
    letter-spacing: -0.045em;
  }

  .hero__actions {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero__count {
    align-items: center;
  }

  .hero__visual {
    padding-right: 0;
  }

  .hero__main-figure {
    margin-left: 0;
    width: calc(100% - 1.4rem);
  }

  .hero__caption {
    grid-template-columns: 1.4rem 1fr;
  }

  .hero__caption-meta {
    grid-column: 2;
  }

  .hero__inset {
    left: auto;
    right: 0;
    bottom: 1rem;
    width: 42vw;
  }

  .hero__vertical {
    display: none;
  }

  .hero__foot {
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
    padding-top: 4.4rem;
  }

  .hero__provenance {
    max-width: 100%;
    flex-direction: column;
    gap: 0.25rem;
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__scroll-line::after,
  .hero__scroll-icon {
    animation: none;
  }
}
</style>
