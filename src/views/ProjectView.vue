<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ArrowUpRight, Expand, Info } from '@lucide/vue'
import {
  CATEGORY_MAP,
  REGION_MAP,
  getAdjacentProjects,
  getProject,
} from '../data/projects.js'
import { EMPLOYER_LINKS } from '../data/profile.js'
import PortfolioImage from '../components/PortfolioImage.vue'
import ImageLightbox from '../components/ImageLightbox.vue'
import SourceList from '../components/SourceList.vue'

const route = useRoute()
const router = useRouter()
const homeHref = import.meta.env.BASE_URL || '/'
const project = computed(() => getProject(route.params.id))
const titleRef = ref(null)
const lightboxOpen = ref(false)
const lightboxStart = ref(0)

const neighbours = computed(() =>
  project.value ? getAdjacentProjects(project.value.id) : { previous: null, next: null },
)
const categoryLabel = computed(() =>
  project.value ? CATEGORY_MAP[project.value.category]?.label ?? project.value.category : '',
)
const regionLabel = computed(() =>
  project.value ? REGION_MAP[project.value.regionId]?.label ?? '' : '',
)
const employerUrl = computed(() =>
  project.value?.employer ? EMPLOYER_LINKS[project.value.employer] ?? null : null,
)
const leadImage = computed(() => project.value?.images?.[0] ?? null)
const additionalImage = computed(() => project.value?.images?.[1] ?? null)

const openLightbox = (index = 0) => {
  lightboxStart.value = index
  lightboxOpen.value = true
}

const closeProject = () => {
  const back = window.history.state?.back
  if (back && !String(back).startsWith('/work/')) {
    router.back()
  } else {
    router.push({ path: '/', hash: '#selected-work' })
  }
}

const focusTitle = () => {
  nextTick(() => {
    titleRef.value?.focus({ preventScroll: true })
  })
}

watch(
  () => route.params.id,
  () => {
    lightboxOpen.value = false
    focusTitle()
    window.scrollTo({ top: 0, behavior: 'auto' })
  },
)

onMounted(focusTitle)
</script>

<template>
  <main v-if="project" id="main-content" :key="project.id" class="project-page" tabindex="-1">
    <div class="project-toolbar shell">
      <a :href="`${homeHref}#selected-work`" class="project-toolbar__back" @click.prevent="closeProject">
        <ArrowLeft :size="15" :stroke-width="1.5" aria-hidden="true" />
        <span>Close project</span>
      </a>
      <p class="project-toolbar__index">
        Record {{ String(project.curationRank).padStart(2, '0') }} / 21
      </p>
      <p class="project-toolbar__status">
        <span aria-hidden="true"></span>
        {{ project.status }}
      </p>
    </div>

    <article>
      <header class="project-head shell">
        <div class="project-head__copy">
          <p class="eyebrow eyebrow--muted">
            <span class="eyebrow__line" aria-hidden="true"></span>
            {{ categoryLabel }} / {{ project.year }}
          </p>

          <h1 ref="titleRef" class="project-head__title" tabindex="-1">{{ project.title }}</h1>
          <p class="project-head__subtitle">{{ project.subtitle }}</p>

          <dl class="project-head__meta">
            <div>
              <dt>Year</dt>
              <dd>{{ project.year }}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{{ project.location }}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{{ categoryLabel }}</dd>
            </div>
            <div v-if="project.employer">
              <dt>Context</dt>
              <dd>{{ project.employer }}</dd>
            </div>
          </dl>
        </div>

        <div class="project-head__media">
          <button
            type="button"
            class="project-image-button"
            :aria-label="`Open the lead image for ${project.title} in the image viewer`"
            @click="openLightbox(0)"
          >
            <PortfolioImage
              :src="leadImage.src"
              :srcset="leadImage.srcset"
              :alt="leadImage.alt"
              ratio="4 / 3"
              sizes="(min-width: 1000px) 58vw, 100vw"
              priority
              :fallback-label="project.title"
            />
            <span class="project-image-button__hint">
              <Expand :size="15" :stroke-width="1.4" aria-hidden="true" />
              View image
            </span>
          </button>
          <p class="project-head__caption">
            <span>Lead image / supplied portfolio</span>
            <span>{{ leadImage.credit }}</span>
          </p>
        </div>
      </header>

      <section class="project-body shell" aria-labelledby="project-information-heading">
        <h2 id="project-information-heading" class="sr-only">Project information</h2>
        <div class="project-narrative">
          <div class="project-block">
            <p class="project-label">Project note</p>
            <p
              v-for="paragraph in project.description"
              :key="paragraph"
              class="project-body__paragraph"
            >
              {{ paragraph }}
            </p>
          </div>

          <div class="project-quote">
            <p class="project-label">From the CV / primary document</p>
            <blockquote v-if="project.cvText">
              “{{ project.cvText }}”
            </blockquote>
            <p v-else class="project-quote__missing">
              No descriptive caption accompanies this project in the supplied dossier.
            </p>
            <p class="project-quote__source">Portfolio caption · 2015 CV</p>
          </div>

          <div class="project-block project-block--plain">
            <p class="project-label">Visual reading / interpretation</p>
            <p class="project-body__paragraph project-body__paragraph--muted">
              {{ project.visualReading }}
            </p>
          </div>

          <div v-if="project.attributionNote" class="project-attribution">
            <Info :size="17" :stroke-width="1.4" aria-hidden="true" />
            <div>
              <p class="project-label">Attribution note</p>
              <p>{{ project.attributionNote }}</p>
            </div>
          </div>

          <div v-if="project.researchNote" class="project-research">
            <p class="project-label">Public record &amp; verification</p>
            <p>{{ project.researchNote }}</p>
          </div>

          <div v-if="project.contextNote" class="project-context">
            <p class="project-label">Professional context</p>
            <p>{{ project.contextNote }}</p>
          </div>
        </div>

        <aside class="project-sidebar" aria-label="Project metadata">
          <div class="project-sidebar__section">
            <p class="project-label">Record</p>
            <dl class="sidebar-meta">
              <div>
                <dt>Year</dt>
                <dd>{{ project.year }}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{{ project.location }}</dd>
              </div>
              <div>
                <dt>Region</dt>
                <dd>{{ regionLabel }}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{{ categoryLabel }}</dd>
              </div>
              <div v-if="project.employer">
                <dt>Professional context</dt>
                <dd>
                  <a
                    v-if="employerUrl"
                    :href="employerUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="sidebar-link"
                  >
                    {{ project.employer }}
                    <ArrowUpRight :size="12" :stroke-width="1.4" aria-hidden="true" />
                    <span class="sr-only">(opens in a new tab)</span>
                  </a>
                  <span v-else>{{ project.employer }}</span>
                </dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{{ project.role || 'Not specified in the source material.' }}</dd>
              </div>
            </dl>
          </div>

          <p v-if="project.yearNote" class="project-sidebar__note">
            <Info :size="13" :stroke-width="1.4" aria-hidden="true" />
            <span>{{ project.yearNote }}</span>
          </p>

          <div class="project-sidebar__section project-sidebar__record">
            <p class="project-label">Evidence status</p>
            <p class="evidence-status">
              <span aria-hidden="true"></span>
              {{ project.status }}
            </p>
            <p>
              {{ project.sourceIds.length > 1 ? 'Cross-checked against selected public records.' : 'Based on the supplied 2015 CV and portfolio.' }}
            </p>
          </div>

          <SourceList :source-ids="project.sourceIds" title="Sources" compact />

          <div class="project-sidebar__image-credit">
            <p class="project-label">Image credit</p>
            <p>{{ leadImage.credit }}</p>
          </div>
        </aside>
      </section>

      <section
        v-if="additionalImage"
        class="project-gallery section section--ruled"
        aria-labelledby="project-gallery-heading"
      >
        <div class="shell">
          <div class="project-gallery__head">
            <div>
              <p class="eyebrow"><span class="project-gallery__index">A</span> Additional visual record</p>
              <h2 id="project-gallery-heading" class="project-gallery__title">
                One detail,<br /><em>one trace.</em>
              </h2>
            </div>
            <p class="project-gallery__intro">
              The supplied dossier contains a single view and a derived detail crop for this
              project. No further drawings, plans or construction photographs were provided.
            </p>
          </div>

          <div class="project-gallery__grid">
            <figure class="project-gallery__figure">
              <button
                type="button"
                class="project-image-button"
                :aria-label="`Open the additional image for ${project.title} in the image viewer`"
                @click="openLightbox(1)"
              >
                <PortfolioImage
                  :src="additionalImage.src"
                  :srcset="additionalImage.srcset"
                  :alt="additionalImage.alt"
                  ratio="4 / 3"
                  sizes="(min-width: 1000px) 58vw, 100vw"
                  :fallback-label="project.title"
                />
                <span class="project-image-button__hint">
                  <Expand :size="15" :stroke-width="1.4" aria-hidden="true" />
                  View image
                </span>
              </button>
              <figcaption>
                <span>{{ additionalImage.caption }}</span>
                <span>{{ additionalImage.credit }}</span>
              </figcaption>
            </figure>

            <div class="project-gallery__aside">
              <p class="project-label">Dossier completeness</p>
              <ul>
                <li>
                  <span>Lead photograph</span>
                  <span>Included</span>
                </li>
                <li>
                  <span>Detail crop</span>
                  <span>Included</span>
                </li>
                <li>
                  <span>Plans / sections</span>
                  <span>Not supplied</span>
                </li>
                <li>
                  <span>Construction imagery</span>
                  <span>Not supplied</span>
                </li>
                <li>
                  <span>Photographer</span>
                  <span>Unidentified</span>
                </li>
              </ul>
              <p class="project-gallery__aside-note">
                Nothing has been generated to fill the gaps. Further material should be added only
                when an original or rights-cleared image becomes available.
              </p>
              <button type="button" class="button-line" @click="openLightbox(0)">
                <span>Open the image viewer</span>
                <span aria-hidden="true">02</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <nav class="project-pagination" aria-label="Project navigation">
        <RouterLink
          v-if="neighbours.previous"
          :to="`/work/${neighbours.previous.id}`"
          class="project-pagination__link project-pagination__link--previous"
        >
          <span class="project-pagination__direction">
            <ArrowLeft :size="15" :stroke-width="1.4" aria-hidden="true" />
            Previous project
          </span>
          <span class="project-pagination__title">{{ neighbours.previous.title }}</span>
          <span class="project-pagination__meta">{{ neighbours.previous.year }} · {{ neighbours.previous.shortLocation }}</span>
        </RouterLink>

        <RouterLink
          v-if="neighbours.next"
          :to="`/work/${neighbours.next.id}`"
          class="project-pagination__link project-pagination__link--next"
        >
          <span class="project-pagination__direction">
            Next project
            <ArrowUpRight :size="15" :stroke-width="1.4" aria-hidden="true" />
          </span>
          <span class="project-pagination__title">{{ neighbours.next.title }}</span>
          <span class="project-pagination__meta">{{ neighbours.next.year }} · {{ neighbours.next.shortLocation }}</span>
        </RouterLink>
      </nav>
    </article>

    <ImageLightbox
      :open="lightboxOpen"
      :images="project.images"
      :initial-index="lightboxStart"
      :project-title="project.title"
      @update:open="lightboxOpen = $event"
    />
  </main>

  <main v-else id="main-content" class="not-found shell" tabindex="-1">
    <p class="eyebrow">Project not found</p>
    <h1>This record is not in the archive.</h1>
    <p>The project address may have changed, or the record was not part of the supplied portfolio.</p>
    <RouterLink to="/#selected-work" class="button-line">View all selected work</RouterLink>
  </main>
</template>

<style scoped>
.project-page {
  padding-top: var(--nav-h);
  background: var(--paper);
}

.project-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 3.9rem;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.project-toolbar__back {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 42px;
  color: var(--ink-soft);
  text-decoration: none;
  transition: color 180ms var(--quick);
}

.project-toolbar__back:hover {
  color: var(--clay);
}

.project-toolbar__index {
  font-variant-numeric: tabular-nums;
}

.project-toolbar__status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.project-toolbar__status span {
  width: 6px;
  height: 6px;
  background: var(--clay);
  border-radius: 50%;
}

.project-head {
  display: grid;
  grid-template-columns: minmax(0, 4.7fr) minmax(0, 7.3fr);
  gap: clamp(2.5rem, 6vw, 7rem);
  align-items: end;
  padding-top: clamp(2.5rem, 6vw, 6rem);
  padding-bottom: clamp(4rem, 8vw, 8rem);
}

.project-head__title {
  max-width: 10ch;
  margin-top: clamp(1.4rem, 3vw, 2.5rem);
  font-family: var(--serif);
  font-size: clamp(3.2rem, 6.2vw, 7.5rem);
  font-weight: 300;
  letter-spacing: -0.055em;
  line-height: 0.86;
  text-wrap: balance;
}

.project-head__title:focus,
.project-head__title:focus-visible {
  outline: none;
}

.project-head__subtitle {
  max-width: 27rem;
  margin-top: 1.4rem;
  color: var(--ink-soft);
  font-family: var(--serif);
  font-size: clamp(1.25rem, 1.8vw, 1.7rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.22;
}

.project-head__meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
  margin-top: clamp(2rem, 4vw, 3.5rem);
  border-top: 1px solid var(--line-strong);
}

.project-head__meta > div {
  padding-block: 0.8rem;
  border-bottom: 1px solid var(--line);
}

.project-head__meta > div:nth-child(odd) {
  padding-right: 1.2rem;
}

.project-head__meta > div:nth-child(even) {
  padding-left: 1.2rem;
  border-left: 1px solid var(--line);
}

.project-head__meta dt {
  margin-bottom: 0.25rem;
  color: var(--muted);
  font-size: 0.52rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.project-head__meta dd {
  font-size: 0.73rem;
  line-height: 1.5;
}

.project-head__media {
  min-width: 0;
}

.project-image-button {
  position: relative;
  display: block;
  width: 100%;
  color: inherit;
  text-align: left;
  cursor: zoom-in;
}

.project-image-button :deep(.portfolio-image) {
  border: 1px solid var(--line);
}

.project-image-button :deep(.portfolio-image img) {
  transition: transform 900ms var(--ease), opacity 600ms var(--ease);
}

.project-image-button:hover :deep(.portfolio-image img) {
  transform: scale(1.012);
}

.project-image-button__hint {
  position: absolute;
  right: 0.9rem;
  bottom: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 34px;
  padding: 0.35rem 0.55rem;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--line);
  font-size: 0.54rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 250ms var(--ease), transform 250ms var(--ease);
  text-transform: uppercase;
}

.project-image-button:hover .project-image-button__hint,
.project-image-button:focus-visible .project-image-button__hint {
  opacity: 1;
  transform: translateY(0);
}

.project-head__caption {
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
  padding-top: 0.65rem;
  border-top: 1px solid var(--line);
  margin-top: 0.75rem;
  color: var(--muted);
  font-size: 0.53rem;
  letter-spacing: 0.055em;
  line-height: 1.5;
  text-transform: uppercase;
}

.project-head__caption span:last-child {
  text-align: right;
}

.project-body {
  display: grid;
  grid-template-columns: minmax(0, 7.2fr) minmax(280px, 3.6fr);
  gap: clamp(2.5rem, 7vw, 8rem);
  padding-bottom: clamp(4rem, 9vw, 9rem);
}

.project-narrative {
  max-width: 49rem;
}

.project-block + .project-block,
.project-quote,
.project-attribution,
.project-research,
.project-context {
  margin-top: clamp(2.2rem, 4vw, 3.5rem);
}

.project-label {
  color: var(--muted);
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.11em;
  line-height: 1.5;
  text-transform: uppercase;
}

.project-body__paragraph {
  margin-top: 1.1rem;
  color: var(--ink-soft);
  font-size: clamp(1rem, 1.25vw, 1.13rem);
  line-height: 1.72;
}

.project-body__paragraph:first-of-type {
  margin-top: 0.9rem;
}

.project-body__paragraph--muted {
  max-width: 45rem;
  color: var(--muted);
}

.project-quote {
  padding-block: 1.6rem;
  border-top: 1px solid var(--line-strong);
  border-bottom: 1px solid var(--line);
}

.project-quote blockquote {
  max-width: 34rem;
  margin-top: 0.9rem;
  font-family: var(--serif);
  font-size: clamp(1.65rem, 2.7vw, 2.35rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1.16;
}

.project-quote__missing {
  max-width: 34rem;
  margin-top: 0.9rem;
  color: var(--ink-soft);
  font-family: var(--serif);
  font-size: clamp(1.4rem, 2.2vw, 1.8rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.project-quote__source {
  margin-top: 1rem;
  color: var(--muted);
  font-size: 0.55rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-block--plain {
  margin-top: clamp(2.4rem, 4vw, 3.6rem);
}

.project-attribution {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 1rem;
  border: 1px solid rgba(149, 84, 60, 0.36);
  background: rgba(149, 84, 60, 0.065);
  color: var(--clay-deep);
}

.project-attribution > svg {
  flex: 0 0 auto;
  margin-top: 0.1rem;
}

.project-attribution p:last-child {
  max-width: 42rem;
  margin-top: 0.4rem;
  font-size: 0.77rem;
  line-height: 1.65;
}

.project-research,
.project-context {
  padding-top: 1rem;
  border-top: 1px solid var(--line);
}

.project-research p:last-child,
.project-context p:last-child {
  max-width: 43rem;
  margin-top: 0.55rem;
  color: var(--muted);
  font-size: 0.76rem;
  line-height: 1.68;
}

.project-sidebar {
  min-width: 0;
  padding-top: 0.15rem;
}

.project-sidebar__section {
  border-top: 1px solid var(--line-strong);
  padding-top: 0.85rem;
}

.sidebar-meta {
  margin-top: 0.75rem;
}

.sidebar-meta > div {
  display: grid;
  grid-template-columns: 6rem minmax(0, 1fr);
  gap: 0.8rem;
  padding-block: 0.55rem;
  border-bottom: 1px solid var(--line);
}

.sidebar-meta dt {
  color: var(--muted);
  font-size: 0.52rem;
  font-weight: 500;
  letter-spacing: 0.075em;
  line-height: 1.5;
  text-transform: uppercase;
}

.sidebar-meta dd {
  font-size: 0.69rem;
  line-height: 1.55;
}

.sidebar-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--clay-deep);
  text-decoration: none;
}

.sidebar-link:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.project-sidebar__note {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  margin-top: 0.9rem;
  color: var(--clay-deep);
  font-size: 0.64rem;
  line-height: 1.55;
}

.project-sidebar__note svg {
  flex: 0 0 auto;
  margin-top: 0.1rem;
}

.project-sidebar__record {
  margin-top: 1.4rem;
}

.evidence-status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
  color: var(--ink-soft);
  font-size: 0.7rem;
  line-height: 1.45;
}

.evidence-status span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--clay);
}

.project-sidebar__record > p:last-child {
  margin-top: 0.35rem;
  color: var(--muted);
  font-size: 0.63rem;
  line-height: 1.55;
}

.project-sidebar :deep(.source-list) {
  margin-top: 1.4rem;
}

.project-sidebar__image-credit {
  margin-top: 1.4rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--line);
}

.project-sidebar__image-credit p:last-child {
  margin-top: 0.4rem;
  color: var(--muted);
  font-size: 0.6rem;
  line-height: 1.55;
}

.project-gallery {
  background: var(--paper-deep);
  --line: rgba(24, 23, 19, 0.16);
  --line-strong: rgba(24, 23, 19, 0.3);
}

.project-gallery__head {
  display: grid;
  grid-template-columns: minmax(0, 8fr) minmax(250px, 3.3fr);
  gap: clamp(2rem, 6vw, 7rem);
  align-items: end;
  margin-bottom: clamp(2.4rem, 5vw, 4rem);
}

.project-gallery__index {
  margin-right: 0.6rem;
  color: var(--clay);
}

.project-gallery__title {
  max-width: 10ch;
  margin-top: 1.3rem;
  font-family: var(--serif);
  font-size: clamp(2.7rem, 5.5vw, 5.5rem);
  font-weight: 300;
  letter-spacing: -0.045em;
  line-height: 0.92;
}

.project-gallery__title em {
  color: var(--clay);
  font-weight: 300;
}

.project-gallery__intro {
  max-width: 30rem;
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.65;
}

.project-gallery__grid {
  display: grid;
  grid-template-columns: minmax(0, 7.5fr) minmax(260px, 3.7fr);
  gap: clamp(2rem, 6vw, 7rem);
  align-items: start;
}

.project-gallery__figure {
  min-width: 0;
}

.project-gallery__figure .project-image-button :deep(.portfolio-image) {
  border: 1px solid rgba(24, 23, 19, 0.18);
}

.project-gallery__figure figcaption {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  padding-top: 0.65rem;
  border-top: 1px solid var(--line);
  margin-top: 0.7rem;
  color: var(--muted);
  font-size: 0.53rem;
  letter-spacing: 0.05em;
  line-height: 1.5;
  text-transform: uppercase;
}

.project-gallery__figure figcaption span:last-child {
  text-align: right;
}

.project-gallery__aside {
  padding-top: 0.3rem;
}

.project-gallery__aside ul {
  margin-top: 0.6rem;
  border-top: 1px solid var(--line-strong);
}

.project-gallery__aside li {
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
  padding-block: 0.6rem;
  border-bottom: 1px solid var(--line);
  color: var(--ink-soft);
  font-size: 0.64rem;
  line-height: 1.4;
}

.project-gallery__aside li span:last-child {
  color: var(--muted);
  text-align: right;
}

.project-gallery__aside-note {
  max-width: 24rem;
  margin-top: 1.1rem;
  color: var(--muted);
  font-size: 0.64rem;
  line-height: 1.6;
}

.project-gallery__aside .button-line {
  width: 100%;
  margin-top: 1.5rem;
  color: var(--ink);
  font-size: 0.56rem;
}

.project-pagination {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--line);
}

.project-pagination__link {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-height: clamp(12rem, 22vw, 20rem);
  padding: clamp(1.4rem, 3.2vw, 3rem) var(--gutter);
  color: var(--ink);
  text-decoration: none;
  transition: background 250ms var(--quick), color 200ms var(--quick);
}

.project-pagination__link--previous {
  border-right: 1px solid var(--line);
}

.project-pagination__link:hover,
.project-pagination__link:focus-visible {
  background: var(--paper-deep);
}

.project-pagination__direction {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted);
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.project-pagination__link--next .project-pagination__direction {
  justify-content: flex-end;
  text-align: right;
}

.project-pagination__title {
  margin-top: auto;
  font-family: var(--serif);
  font-size: clamp(1.7rem, 3.2vw, 3.1rem);
  font-weight: 300;
  letter-spacing: -0.035em;
  line-height: 1;
}

.project-pagination__link--next {
  text-align: right;
}

.project-pagination__meta {
  color: var(--muted);
  font-size: 0.56rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.not-found {
  min-height: 70vh;
  padding-top: calc(var(--nav-h) + 5rem);
  padding-bottom: 5rem;
}

.not-found h1 {
  max-width: 12ch;
  margin-top: 1.5rem;
  font-family: var(--serif);
  font-size: clamp(2.8rem, 6vw, 6rem);
  font-weight: 300;
  letter-spacing: -0.04em;
  line-height: 0.92;
}

.not-found > p:not(.eyebrow) {
  max-width: 32rem;
  margin-top: 1.2rem;
  color: var(--muted);
}

.not-found .button-line {
  width: min(100%, 24rem);
  margin-top: 2rem;
}

@media (max-width: 1000px) {
  .project-head {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    align-items: start;
  }

  .project-head__copy {
    max-width: 760px;
  }

  .project-head__media {
    max-width: 880px;
  }

  .project-body {
    grid-template-columns: 1fr;
  }

  .project-sidebar {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem 2.5rem;
    align-items: start;
  }

  .project-sidebar__section {
    grid-column: 1 / -1;
  }

  .project-sidebar :deep(.source-list),
  .project-sidebar__image-credit {
    margin-top: 0;
  }

  .project-gallery__head,
  .project-gallery__grid {
    grid-template-columns: 1fr;
  }

  .project-gallery__intro {
    max-width: 40rem;
  }

  .project-gallery__aside {
    max-width: 38rem;
  }
}

@media (max-width: 760px) {
  .project-toolbar {
    min-height: 3.5rem;
    gap: 1rem;
  }

  .project-toolbar__status {
    display: none;
  }

  .project-head {
    padding-top: 2.2rem;
    padding-bottom: 3.5rem;
  }

  .project-head__title {
    font-size: clamp(3rem, 12vw, 4.7rem);
  }

  .project-head__subtitle {
    font-size: 1.25rem;
  }

  .project-head__meta {
    grid-template-columns: 1fr;
  }

  .project-head__meta > div:nth-child(odd),
  .project-head__meta > div:nth-child(even) {
    padding-left: 0;
    padding-right: 0;
    border-left: 0;
  }

  .project-head__caption {
    flex-direction: column;
    gap: 0.2rem;
  }

  .project-head__caption span:last-child {
    text-align: left;
  }

  .project-image-button__hint {
    opacity: 1;
    transform: none;
  }

  .project-body {
    padding-bottom: 4rem;
  }

  .project-sidebar {
    display: block;
  }

  .project-sidebar > * + * {
    margin-top: 1.5rem;
  }

  .project-sidebar :deep(.source-list),
  .project-sidebar__image-credit {
    margin-top: 1.5rem;
  }

  .project-gallery {
    padding-block: 3.5rem;
  }

  .project-gallery__figure figcaption {
    flex-direction: column;
    gap: 0.25rem;
  }

  .project-gallery__figure figcaption span:last-child {
    text-align: left;
  }

  .project-pagination {
    grid-template-columns: 1fr;
  }

  .project-pagination__link {
    min-height: 11rem;
  }

  .project-pagination__link--previous {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .project-pagination__link--next {
    text-align: left;
  }

  .project-pagination__link--next .project-pagination__direction {
    justify-content: flex-start;
  }
}
</style>
