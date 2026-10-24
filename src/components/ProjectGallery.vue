<script setup>
import { computed } from 'vue'
import { ArrowDownRight } from '@lucide/vue'
import SectionHeading from './SectionHeading.vue'
import GalleryControls from './GalleryControls.vue'
import ProjectCard from './ProjectCard.vue'
import ProjectIndex from './ProjectIndex.vue'

const props = defineProps({
  projects: { type: Array, required: true },
  totalCount: { type: Number, required: true },
  category: { type: String, required: true },
  sort: { type: String, required: true },
  view: { type: String, required: true },
  region: { type: String, required: true },
  categoryCounts: { type: Object, required: true },
})

const emit = defineEmits([
  'update:category',
  'update:sort',
  'update:view',
  'clear-filters',
  'clear-region',
])

const ratioFor = (index) => ['4 / 3', '3 / 4', '1 / 1', '4 / 3', '3 / 4', '16 / 9'][index % 6]

const hasCustomView = computed(
  () => props.category !== 'all' || props.region !== 'all',
)

const scrollToAtlas = () => {
  const atlas = document.getElementById('atlas')
  if (!atlas) return
  window.history.replaceState(window.history.state, '', '#atlas')
  atlas.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <section id="selected-work" class="work section section--ruled" aria-labelledby="work-heading">
    <div class="shell">
      <SectionHeading index="01" label="Selected work">
        <template #title>
          <span id="work-heading">Selected work<br /><em>2012—2015</em></span>
        </template>
        <template #aside>
          <p>
            {{ totalCount }} documented projects from the 2015 CV and project dossier. The default
            sequence opens with six contrasting works; filters, the index and the geographic
            register reorganise the same records.
          </p>
          <button class="atlas-link text-link" type="button" @click="scrollToAtlas">
            Open geographic register
            <ArrowDownRight :size="15" :stroke-width="1.4" aria-hidden="true" />
          </button>
        </template>
      </SectionHeading>

      <GalleryControls
        :category="category"
        :sort="sort"
        :view="view"
        :region="region"
        :category-counts="categoryCounts"
        :result-count="projects.length"
        @update:category="emit('update:category', $event)"
        @update:sort="emit('update:sort', $event)"
        @update:view="emit('update:view', $event)"
        @clear-filters="emit('clear-filters')"
        @clear-region="emit('clear-region')"
      />

      <Transition name="view-fade" mode="out-in">
        <div v-if="projects.length" :key="view">
          <TransitionGroup v-if="view === 'grid'" name="project" tag="div" class="editorial-grid">
            <ProjectCard
              v-for="(project, index) in projects"
              :key="project.id"
              :project="project"
              :index="index"
              :ratio="ratioFor(index)"
            />
          </TransitionGroup>

          <ProjectIndex v-else :projects="projects" />
        </div>

        <div v-else key="empty" class="empty-state">
          <p class="empty-state__index">00</p>
          <div>
            <h3>No projects match this combination.</h3>
            <p>
              {{ hasCustomView ? 'Clear the category and location filters to return to the full sequence.' : 'The project records are temporarily unavailable.' }}
            </p>
            <button class="button-line empty-state__button" type="button" @click="emit('clear-filters')">
              <span>Show all projects</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </Transition>

      <footer class="work__foot">
        <p>
          <span aria-hidden="true">↳</span>
          {{ projects.length }} of {{ totalCount }} project records currently visible.
        </p>
        <p class="work__foot-note">
          Dates and locations follow the 2015 CV unless a project note records a cross-reference.
        </p>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.work {
  padding-top: clamp(4.5rem, 8vw, 9rem);
}

.atlas-link {
  margin-top: 1.2rem;
  color: var(--ink);
  font-size: 0.61rem;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  border-bottom: 0;
}

.editorial-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: clamp(1rem, 2.8vw, 3.2rem);
  row-gap: clamp(3rem, 7vw, 8rem);
  align-items: start;
}

.editorial-grid :deep(.project-card:nth-child(6n + 1)) {
  grid-column: 1 / span 7;
}

.editorial-grid :deep(.project-card:nth-child(6n + 2)) {
  grid-column: 9 / span 4;
  padding-top: clamp(4rem, 9vw, 10rem);
}

.editorial-grid :deep(.project-card:nth-child(6n + 3)) {
  grid-column: 2 / span 5;
  padding-top: clamp(0rem, 2vw, 2rem);
}

.editorial-grid :deep(.project-card:nth-child(6n + 4)) {
  grid-column: 8 / span 5;
}

.editorial-grid :deep(.project-card:nth-child(6n + 5)) {
  grid-column: 1 / span 4;
  padding-top: clamp(2rem, 5vw, 6rem);
}

.editorial-grid :deep(.project-card:nth-child(6n + 6)) {
  grid-column: 6 / span 7;
  padding-top: clamp(5rem, 10vw, 11rem);
}

.empty-state {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  gap: 2rem;
  max-width: 48rem;
  padding-block: clamp(4rem, 10vw, 8rem);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.empty-state__index {
  color: var(--clay);
  font-size: 0.63rem;
  font-weight: 500;
  letter-spacing: 0.1em;
}

.empty-state h3 {
  max-width: 14ch;
  font-family: var(--serif);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 300;
  letter-spacing: -0.035em;
  line-height: 1;
}

.empty-state p:not(.empty-state__index) {
  max-width: 32rem;
  margin-top: 1rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.empty-state__button {
  width: min(100%, 22rem);
  margin-top: 2rem;
  color: var(--ink);
}

.work__foot {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-top: clamp(4rem, 8vw, 8rem);
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.58rem;
  letter-spacing: 0.065em;
  line-height: 1.5;
  text-transform: uppercase;
}

.work__foot-note {
  max-width: 29rem;
  text-align: right;
}

.project-enter-active,
.project-leave-active {
  transition:
    opacity 260ms var(--quick),
    transform 420ms var(--ease);
}

.project-enter-from,
.project-leave-to {
  opacity: 0;
  transform: translateY(14px);
}

.project-move {
  transition: transform 550ms var(--ease);
}

.view-fade-enter-active,
.view-fade-leave-active {
  transition: opacity 220ms var(--quick);
}

.view-fade-enter-from,
.view-fade-leave-to {
  opacity: 0;
}

@media (max-width: 1000px) {
  .editorial-grid :deep(.project-card:nth-child(6n + 1)) {
    grid-column: 1 / span 7;
  }

  .editorial-grid :deep(.project-card:nth-child(6n + 2)) {
    grid-column: 8 / span 5;
    padding-top: 5rem;
  }

  .editorial-grid :deep(.project-card:nth-child(6n + 3)) {
    grid-column: 1 / span 6;
  }

  .editorial-grid :deep(.project-card:nth-child(6n + 4)) {
    grid-column: 7 / span 6;
    padding-top: 2rem;
  }

  .editorial-grid :deep(.project-card:nth-child(6n + 5)) {
    grid-column: 1 / span 5;
    padding-top: 2rem;
  }

  .editorial-grid :deep(.project-card:nth-child(6n + 6)) {
    grid-column: 6 / span 7;
    padding-top: 6rem;
  }
}

@media (max-width: 760px) {
  .work {
    padding-top: 4rem;
  }

  .atlas-link {
    margin-top: 1.1rem;
  }

  .editorial-grid {
    display: flex;
    flex-direction: column;
    gap: clamp(3.4rem, 12vw, 5rem);
  }

  .editorial-grid :deep(.project-card:nth-child(n)) {
    width: 100%;
    padding-top: 0;
  }

  .editorial-grid :deep(.project-card:nth-child(3n + 2)) {
    width: 88%;
    margin-left: auto;
  }

  .editorial-grid :deep(.project-card:nth-child(5n + 4)) {
    width: 94%;
  }

  .work__foot {
    flex-direction: column;
    gap: 0.5rem;
  }

  .work__foot-note {
    max-width: 100%;
    text-align: left;
  }

  .empty-state {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
