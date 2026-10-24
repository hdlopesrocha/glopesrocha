<script setup>
import { computed } from 'vue'
import { ArrowUpRight } from '@lucide/vue'
import { CATEGORY_MAP } from '../data/projects.js'

defineProps({
  projects: { type: Array, required: true },
})

const categoryLabel = (project) =>
  CATEGORY_MAP[project.category]?.shortLabel ?? project.category

const displayIndex = (index) => String(index + 1).padStart(2, '0')
</script>

<template>
  <div class="project-index">
    <div class="project-index__head" aria-hidden="true">
      <span>No.</span>
      <span>Project</span>
      <span>Year</span>
      <span>Location</span>
      <span>Category</span>
      <span></span>
    </div>

    <ol class="project-index__list">
      <li v-for="(project, index) in projects" :key="project.id" class="project-index__item">
        <RouterLink
          :to="`/work/${project.id}`"
          class="project-index__row"
          :aria-label="`${project.title}, ${project.year}, ${project.location}, ${categoryLabel(project)}. Open project.`"
        >
          <span class="project-index__number">{{ displayIndex(index) }}</span>
          <span class="project-index__name">
            <span class="project-index__title">{{ project.title }}</span>
            <span v-if="project.employer" class="project-index__context">{{ project.employer }}</span>
          </span>
          <span class="project-index__year">{{ project.year }}</span>
          <span class="project-index__location">{{ project.location }}</span>
          <span class="project-index__category">{{ categoryLabel(project) }}</span>
          <span class="project-index__arrow" aria-hidden="true">
            <ArrowUpRight :size="17" :stroke-width="1.35" />
          </span>
        </RouterLink>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.project-index {
  border-top: 1px solid var(--line-strong);
}

.project-index__head {
  display: grid;
  grid-template-columns: 3rem minmax(0, 2.2fr) 5rem minmax(0, 1.2fr) minmax(0, 1fr) 2rem;
  gap: 1.3rem;
  align-items: center;
  min-height: 2.9rem;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.project-index__item {
  border-bottom: 1px solid var(--line);
}

.project-index__row {
  position: relative;
  display: grid;
  grid-template-columns: 3rem minmax(0, 2.2fr) 5rem minmax(0, 1.2fr) minmax(0, 1fr) 2rem;
  gap: 1.3rem;
  align-items: center;
  min-height: 5.4rem;
  padding: 0.8rem 0;
  color: var(--ink);
  text-decoration: none;
  transition:
    background 250ms var(--quick),
    padding 350ms var(--ease);
}

.project-index__row::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  background: var(--clay);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 300ms var(--ease);
}

.project-index__row:hover,
.project-index__row:focus-visible {
  padding-left: 1rem;
  background: rgba(212, 196, 170, 0.21);
}

.project-index__row:hover::before,
.project-index__row:focus-visible::before {
  transform: scaleY(1);
  transform-origin: top;
}

.project-index__number {
  color: var(--muted);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
}

.project-index__name {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.35rem 0.9rem;
  min-width: 0;
}

.project-index__title {
  font-family: var(--serif);
  font-size: clamp(1.25rem, 1.9vw, 1.8rem);
  font-weight: 300;
  letter-spacing: -0.025em;
  line-height: 1.1;
  transition: color 180ms var(--quick);
}

.project-index__row:hover .project-index__title {
  color: var(--clay);
}

.project-index__context {
  color: var(--muted);
  font-size: 0.52rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-index__year,
.project-index__location,
.project-index__category {
  color: var(--muted);
  font-size: 0.61rem;
  letter-spacing: 0.045em;
  line-height: 1.45;
}

.project-index__category {
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.project-index__arrow {
  justify-self: end;
  color: var(--muted);
  opacity: 0;
  transform: translate(-3px, 3px);
  transition:
    opacity 200ms var(--quick),
    transform 250ms var(--ease),
    color 200ms var(--quick);
}

.project-index__row:hover .project-index__arrow,
.project-index__row:focus-visible .project-index__arrow {
  opacity: 1;
  transform: translate(0, 0);
  color: var(--clay);
}

@media (max-width: 1000px) {
  .project-index__head,
  .project-index__row {
    grid-template-columns: 2.6rem minmax(0, 2fr) 4rem minmax(0, 1.2fr) 1.5rem;
  }

  .project-index__head span:nth-child(5),
  .project-index__category {
    display: none;
  }
}

@media (max-width: 680px) {
  .project-index__head {
    display: none;
  }

  .project-index__row {
    grid-template-columns: 2.2rem minmax(0, 1fr) 1.5rem;
    gap: 0.75rem;
    min-height: 0;
    padding-block: 1.15rem;
  }

  .project-index__year,
  .project-index__location {
    grid-column: 2;
  }

  .project-index__year {
    margin-top: -0.25rem;
  }

  .project-index__location {
    color: var(--muted);
  }

  .project-index__year::before {
    content: 'Year';
    display: inline-block;
    margin-right: 0.5rem;
    color: var(--muted);
    font-size: 0.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .project-index__location::before {
    content: 'Location';
    display: inline-block;
    margin-right: 0.5rem;
    color: var(--muted);
    font-size: 0.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .project-index__arrow {
    grid-column: 3;
    grid-row: 1 / span 2;
    opacity: 1;
    transform: none;
  }

  .project-index__number {
    grid-row: 1 / span 2;
  }

  .project-index__title {
    font-size: clamp(1.3rem, 6vw, 1.6rem);
  }

  .project-index__row:hover,
  .project-index__row:focus-visible {
    padding-left: 0.65rem;
  }
}
</style>
