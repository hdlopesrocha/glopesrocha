<script setup>
import { ArrowDown, ArrowUpRight } from '@lucide/vue'
import SectionHeading from './SectionHeading.vue'
import { ABOUT, PROFILE } from '../data/profile.js'
import { PROJECTS } from '../data/projects.js'
import { scrollToElement } from '../utils/motion.js'
import { assetUrl } from '../utils/assets.js'
import PortfolioImage from './PortfolioImage.vue'

const highgateDetail = PROJECTS.find((project) => project.id === 'house-in-highgate').images[1]
const companhiaDetail = PROJECTS.find((project) => project.id === 'companhia-das-culturas').images[0]

const goToExperience = () => {
  window.history.replaceState(window.history.state, '', '#experience')
  scrollToElement('experience')
}

const goToWork = () => {
  window.history.replaceState(window.history.state, '', '#selected-work')
  scrollToElement('selected-work')
}
</script>

<template>
  <section id="about" class="about section section--ruled" aria-labelledby="about-heading">
    <div class="shell">
      <SectionHeading index="03" label="About">
        <template #title>
          <span id="about-heading">A practice of<br /><em>adjustment.</em></span>
        </template>
        <template #aside>
          <p>
            The CV maps a working life across two countries and several scales. This page gathers
            those facts into a short profile, without turning them into a manifesto.
          </p>
        </template>
      </SectionHeading>

      <div class="about__lead">
        <div class="about__lead-copy">
          <p class="about__standfirst">
            {{ ABOUT.intro[0] }}
          </p>
          <p>{{ ABOUT.intro[1] }}</p>
          <p class="about__note">{{ ABOUT.note }}</p>
        </div>

        <aside class="about__facts" aria-label="Profile facts">
          <dl>
            <div>
              <dt>Education</dt>
              <dd>Master’s Degree, Architecture<br />Universidade Lusíada de Lisboa, 2011</dd>
            </div>
            <div>
              <dt>Professional record</dt>
              <dd>Portugal &amp; the United Kingdom<br />2007 — 2015, as documented in the CV</dd>
            </div>
            <div>
              <dt>Portfolio</dt>
              <dd>{{ PROJECTS.length }} project records<br />Dated 2012 — 2015</dd>
            </div>
            <div>
              <dt>Instruments</dt>
              <dd>Drawing, 3D modelling,<br />physical models, photography</dd>
            </div>
          </dl>

          <div class="about__interests">
            <p class="eyebrow">Personal interests · CV</p>
            <ul>
              <li v-for="interest in ABOUT.interests" :key="interest">{{ interest }}</li>
            </ul>
          </div>
        </aside>
      </div>

      <figure class="about__drawing" v-reveal>
        <div class="about__drawing-image">
          <img
            :src="assetUrl('/images/site/lisbon-drawing.webp')"
            alt="A freehand line drawing of a city skyline with a hill, a domed building, a bridge, boats and a kite."
            loading="lazy"
            decoding="async"
            width="1800"
            height="1006"
          />
        </div>
        <figcaption>
          <span class="about__drawing-index">Field drawing / 01</span>
          <span>
            Hand-drawn city study reproduced from the supplied CV dossier. The author is not
            identified in the PDF.
          </span>
        </figcaption>
      </figure>

      <div class="about__practice">
        <div class="about__practice-intro">
          <p class="eyebrow"><span class="about__index">A</span> Design &amp; practice</p>
          <h3>A synthesis of the record</h3>
          <p>
            These four notes gather themes visible across the work. They are descriptive
            observations, not independently verified statements of personal philosophy.
          </p>
        </div>

        <ol class="about__practice-list">
          <li v-for="item in ABOUT.practice" :key="item.number" class="practice-row">
            <span class="practice-row__number">{{ item.number }}</span>
            <div class="practice-row__body">
              <h4>{{ item.title }}</h4>
              <p>{{ item.text }}</p>
            </div>
          </li>
        </ol>
      </div>

      <div class="about__images">
        <figure class="about__image about__image--large" v-reveal>
          <PortfolioImage
            :src="highgateDetail.src"
            :srcset="highgateDetail.srcset"
            :alt="highgateDetail.alt"
            ratio="5 / 4"
            sizes="(min-width: 1000px) 55vw, 100vw"
            fallback-label="House in Highgate"
          />
          <figcaption>
            <span>01 / House in Highgate</span>
            <span>Detail crop of supplied portfolio image · 2015</span>
          </figcaption>
        </figure>

        <figure class="about__image about__image--small" v-reveal="100">
          <PortfolioImage
            :src="companhiaDetail.src"
            :srcset="companhiaDetail.srcset"
            :alt="companhiaDetail.alt"
            ratio="4 / 5"
            sizes="(min-width: 1000px) 28vw, 100vw"
            fallback-label="Companhia das Culturas"
          />
          <figcaption>
            <span>02 / Companhia das Culturas</span>
            <span>Supplied portfolio image · CV date 2013</span>
          </figcaption>
        </figure>

        <p class="about__image-note">
          Image details are read as visual evidence, not as complete project documentation.
        </p>
      </div>

      <div class="about__next">
        <button type="button" class="button-line" @click="goToExperience">
          <span>Follow the professional record</span>
          <ArrowDown :size="16" :stroke-width="1.4" aria-hidden="true" />
        </button>
        <button type="button" class="about__work-link text-link" @click="goToWork">
          Return to selected work
          <ArrowUpRight :size="14" :stroke-width="1.4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: var(--paper);
}

.about__lead {
  display: grid;
  grid-template-columns: minmax(0, 7.4fr) minmax(280px, 4fr);
  gap: clamp(2rem, 7vw, 8rem);
  align-items: start;
  padding-bottom: clamp(3rem, 8vw, 7rem);
}

.about__lead-copy {
  max-width: 50rem;
}

.about__standfirst {
  font-family: var(--serif);
  font-size: clamp(1.65rem, 2.7vw, 2.55rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1.14;
}

.about__lead-copy > p:not(.about__standfirst):not(.about__note) {
  max-width: 41rem;
  margin-top: 1.6rem;
  color: var(--ink-soft);
  font-size: 0.96rem;
  line-height: 1.7;
}

.about__note {
  max-width: 38rem;
  margin-top: 1.8rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.68rem;
  letter-spacing: 0.02em;
  line-height: 1.65;
}

.about__facts {
  padding-top: 0.3rem;
}

.about__facts dl {
  border-top: 1px solid var(--line-strong);
}

.about__facts dl > div {
  display: grid;
  grid-template-columns: 7.3rem 1fr;
  gap: 1rem;
  padding-block: 0.9rem;
  border-bottom: 1px solid var(--line);
}

.about__facts dt {
  color: var(--muted);
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.09em;
  line-height: 1.5;
  text-transform: uppercase;
}

.about__facts dd {
  font-size: 0.75rem;
  line-height: 1.55;
}

.about__interests {
  margin-top: 1.8rem;
}

.about__interests ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.8rem;
  margin-top: 0.65rem;
}

.about__interests li {
  font-family: var(--serif);
  font-size: 1.05rem;
  font-style: italic;
  line-height: 1.3;
}

.about__interests li + li::before {
  content: '/';
  margin-right: 0.8rem;
  color: var(--line-strong);
  font-family: var(--sans);
  font-size: 0.62rem;
  font-style: normal;
}

.about__drawing {
  margin-bottom: clamp(4rem, 9vw, 8rem);
}

.about__drawing-image {
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding-block: clamp(0.8rem, 2vw, 2rem);
  background: #f6f1e8;
}

.about__drawing-image img {
  width: 100%;
  max-height: 58vh;
  object-fit: contain;
  mix-blend-mode: multiply;
  opacity: 0.88;
}

.about__drawing figcaption {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 0.7rem;
  color: var(--muted);
  font-size: 0.56rem;
  letter-spacing: 0.055em;
  line-height: 1.5;
  text-transform: uppercase;
}

.about__drawing figcaption span:last-child {
  max-width: 36rem;
  text-align: right;
}

.about__drawing-index {
  color: var(--clay);
}

.about__practice {
  display: grid;
  grid-template-columns: minmax(0, 4.2fr) minmax(0, 7.8fr);
  gap: clamp(2.5rem, 7vw, 8rem);
  padding-block: clamp(2rem, 4vw, 4rem) clamp(4rem, 8vw, 8rem);
  border-top: 1px solid var(--line);
}

.about__practice-intro {
  align-self: start;
  position: sticky;
  top: calc(var(--nav-h) + 2rem);
}

.about__index {
  margin-right: 0.6rem;
  color: var(--clay);
}

.about__practice-intro h3 {
  max-width: 12ch;
  margin-top: 1.4rem;
  font-family: var(--serif);
  font-size: clamp(2rem, 3.6vw, 3.6rem);
  font-weight: 300;
  letter-spacing: -0.035em;
  line-height: 0.96;
}

.about__practice-intro > p:last-child {
  max-width: 25rem;
  margin-top: 1.1rem;
  color: var(--muted);
  font-size: 0.72rem;
  line-height: 1.65;
}

.about__practice-list {
  border-top: 1px solid var(--line-strong);
}

.practice-row {
  display: grid;
  grid-template-columns: 2.2rem minmax(0, 1fr);
  gap: 1rem;
  padding-block: clamp(1.3rem, 2.8vw, 2.3rem);
  border-bottom: 1px solid var(--line);
}

.practice-row__number {
  padding-top: 0.35rem;
  color: var(--clay);
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.08em;
}

.practice-row h4 {
  font-family: var(--serif);
  font-size: clamp(1.45rem, 2.4vw, 2.25rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1.08;
}

.practice-row p {
  max-width: 39rem;
  margin-top: 0.55rem;
  color: var(--muted);
  font-size: 0.84rem;
  line-height: 1.65;
}

.about__images {
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: clamp(1rem, 2.8vw, 3.2rem);
  align-items: start;
  margin-bottom: clamp(4rem, 8vw, 8rem);
}

.about__image {
  margin: 0;
}

.about__image--large {
  grid-column: 1 / span 7;
}

.about__image--small {
  grid-column: 9 / span 4;
  margin-top: clamp(4rem, 10vw, 10rem);
}

.about__image figcaption {
  display: flex;
  justify-content: space-between;
  gap: 1.1rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.53rem;
  letter-spacing: 0.06em;
  line-height: 1.45;
  text-transform: uppercase;
}

.about__image figcaption span:first-child {
  color: var(--ink-soft);
}

.about__image figcaption span:last-child {
  text-align: right;
}

.about__image-note {
  grid-column: 9 / span 4;
  margin-top: 1.4rem;
  padding-top: 0.8rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.6rem;
  letter-spacing: 0.03em;
  line-height: 1.55;
}

.about__next {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  border-top: 1px solid var(--line);
  padding-top: 1rem;
}

.about__next .button-line {
  width: min(100%, 30rem);
}

.about__work-link {
  color: var(--muted);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

@media (max-width: 1000px) {
  .about__lead {
    grid-template-columns: 1fr;
  }

  .about__facts {
    max-width: 42rem;
  }

  .about__practice {
    grid-template-columns: 1fr;
    gap: 2.2rem;
  }

  .about__practice-intro {
    position: static;
  }

  .about__practice-intro > p:last-child {
    max-width: 34rem;
  }
}

@media (max-width: 760px) {
  .about__lead {
    gap: 2.5rem;
    padding-bottom: 3.5rem;
  }

  .about__standfirst {
    font-size: clamp(1.55rem, 7vw, 2.2rem);
  }

  .about__drawing {
    margin-bottom: 4rem;
  }

  .about__drawing-image img {
    max-height: none;
  }

  .about__drawing figcaption {
    flex-direction: column;
    gap: 0.4rem;
  }

  .about__drawing figcaption span:last-child {
    max-width: 100%;
    text-align: left;
  }

  .about__practice {
    padding-bottom: 4rem;
  }

  .about__images {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    margin-bottom: 4rem;
  }

  .about__image--small {
    width: 82%;
    margin-top: 0;
    margin-left: auto;
  }

  .about__image-note {
    width: 82%;
    margin-left: auto;
  }

  .about__next {
    align-items: flex-start;
    flex-direction: column;
    gap: 1.2rem;
  }

  .about__facts dl > div {
    grid-template-columns: 6.2rem 1fr;
    gap: 0.75rem;
  }
}
</style>
