<script setup>
import { computed } from 'vue'
import { ArrowUpRight } from '@lucide/vue'
import { CATEGORY_MAP } from '../data/projects.js'
import PortfolioImage from './PortfolioImage.vue'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, required: true },
  ratio: { type: String, default: '4 / 3' },
})

const categoryLabel = computed(
  () => CATEGORY_MAP[props.project.category]?.shortLabel ?? props.project.category,
)
const number = computed(() => String(props.index + 1).padStart(2, '0'))
const image = computed(() => props.project.images[0])
const attention = computed(
  () => props.project.status === 'Attribution note' || props.project.status === 'Discrepancy noted',
)
</script>

<template>
  <article class="project-card" :class="`project-card--${(index % 6) + 1}`">
    <RouterLink
      :to="`/work/${project.id}`"
      class="project-card__link"
      :aria-label="`${project.title}, ${project.year}, ${project.location}. Open project.`"
    >
      <div class="project-card__media">
        <PortfolioImage
          :src="image.src"
          :srcset="image.srcset"
          :sizes="image.sizes"
          :alt="image.alt"
          :ratio="ratio"
          :fallback-label="project.title"
          position="50% 50%"
        />
        <span class="project-card__number" aria-hidden="true">{{ number }}</span>
        <span class="project-card__open" aria-hidden="true">
          <ArrowUpRight :size="18" :stroke-width="1.35" />
        </span>
      </div>

      <div class="project-card__heading">
        <h3 class="project-card__title">{{ project.title }}</h3>
        <p class="project-card__facts">
          <span>{{ project.year }}</span>
          <span>{{ project.shortLocation }}</span>
          <span>{{ categoryLabel }}</span>
        </p>
      </div>

      <div class="project-card__detail">
        <p class="project-card__excerpt">{{ project.excerpt }}</p>
        <div class="project-card__context">
          <span v-if="project.employer" class="project-card__employer">{{ project.employer }}</span>
          <span v-else class="project-card__employer">Context not specified</span>
          <span v-if="attention" class="project-card__flag">{{ project.status }}</span>
        </div>
      </div>
    </RouterLink>
  </article>
</template>

<style scoped>
.project-card {
  min-width: 0;
}

.project-card__link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.project-card__media {
  position: relative;
  overflow: hidden;
  background: var(--paper-deep);
}

.project-card__media :deep(.portfolio-image img) {
  transition:
    opacity 600ms var(--ease),
    transform 900ms var(--ease);
}

.project-card__link:hover .project-card__media :deep(.portfolio-image img),
.project-card__link:focus-visible .project-card__media :deep(.portfolio-image img) {
  transform: scale(1.025);
}

.project-card__number {
  position: absolute;
  top: 0.9rem;
  left: 0.9rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.75rem;
  height: 1.35rem;
  padding-inline: 0.28rem;
  color: var(--paper-light);
  background: rgba(24, 23, 19, 0.82);
  font-size: 0.54rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
}

.project-card__open {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.15rem;
  height: 2.15rem;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid rgba(24, 23, 19, 0.2);
  opacity: 0;
  transform: translateY(5px);
  transition:
    opacity 300ms var(--ease),
    transform 300ms var(--ease),
    color 200ms var(--quick);
}

.project-card__link:hover .project-card__open,
.project-card__link:focus-visible .project-card__open {
  opacity: 1;
  transform: translateY(0);
}

.project-card__link:hover .project-card__title,
.project-card__link:focus-visible .project-card__title {
  color: var(--clay);
}

.project-card__heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.2rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--line);
  margin-top: 0.8rem;
}

.project-card__title {
  max-width: 19ch;
  font-family: var(--serif);
  font-size: clamp(1.45rem, 2.3vw, 2.15rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1.03;
  text-wrap: balance;
  transition: color 200ms var(--quick);
}

.project-card__facts {
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.25rem 0.7rem;
  max-width: 16rem;
  color: var(--muted);
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.085em;
  line-height: 1.45;
  text-align: right;
  text-transform: uppercase;
}

.project-card__facts span + span::before {
  content: '/';
  margin-right: 0.7rem;
  color: var(--line-strong);
}

.project-card__detail {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1.5rem;
  align-items: start;
  margin-top: 0.85rem;
}

.project-card__excerpt {
  max-width: 34rem;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.55;
}

.project-card__context {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.35rem;
  max-width: 15rem;
  color: var(--muted);
  font-size: 0.52rem;
  font-weight: 500;
  letter-spacing: 0.075em;
  line-height: 1.4;
  text-align: right;
  text-transform: uppercase;
}

.project-card__flag {
  color: var(--clay);
}

.project-card__flag::before {
  content: '—';
  margin-right: 0.35rem;
}

@media (max-width: 1100px) {
  .project-card__heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.55rem;
  }

  .project-card__facts {
    justify-content: flex-start;
    max-width: none;
    text-align: left;
  }
}

@media (max-width: 800px) {
  .project-card__heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.6rem;
  }

  .project-card__facts {
    justify-content: flex-start;
    max-width: none;
    text-align: left;
  }

  .project-card__detail {
    grid-template-columns: 1fr;
    gap: 0.7rem;
  }

  .project-card__context {
    justify-content: flex-start;
    max-width: none;
    text-align: left;
  }

  .project-card__open {
    opacity: 1;
    transform: none;
  }
}

@media (hover: none) {
  .project-card__open {
    opacity: 1;
    transform: none;
  }
}
</style>
