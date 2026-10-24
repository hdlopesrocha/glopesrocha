<script setup>
import { computed } from 'vue'
import { ArrowUpRight, ExternalLink, GraduationCap, BriefcaseBusiness, BadgeCheck } from '@lucide/vue'
import { TIMELINE_RELATED_PROJECTS } from '../data/experience.js'

const props = defineProps({
  entry: { type: Object, required: true },
  headingId: { type: String, default: undefined },
})

const typeLabel = computed(
  () =>
    ({
      employment: 'Employment',
      education: 'Education',
      qualification: 'Qualification',
    })[props.entry.type] ?? 'Record',
)

const TypeIcon = computed(
  () =>
    ({
      employment: BriefcaseBusiness,
      education: GraduationCap,
      qualification: BadgeCheck,
    })[props.entry.type] ?? BadgeCheck,
)

const title = computed(() => props.entry.role ?? props.entry.title)
const relatedProjects = computed(() => TIMELINE_RELATED_PROJECTS(props.entry))
const hasResponsibilities = computed(() => Boolean(props.entry.responsibilities?.length))
const detail = computed(() => props.entry.detail ?? null)
</script>

<template>
  <article class="record" :class="`record--${entry.type}`">
    <header class="record__header">
      <p class="record__type">
        <component :is="TypeIcon" :size="14" :stroke-width="1.4" aria-hidden="true" />
        {{ typeLabel }}
      </p>
      <p class="record__period">{{ entry.periodLabel }}</p>
    </header>

    <h3 :id="headingId" class="record__title">{{ title }}</h3>
    <p class="record__org">
      {{ entry.organisation || 'Independent qualification' }}
      <span v-if="entry.location">· {{ entry.location }}</span>
    </p>

    <p class="record__summary">{{ entry.summary }}</p>

    <div v-if="hasResponsibilities" class="record__section">
      <p class="record__label">Documented responsibilities</p>
      <ul class="record__responsibilities">
        <li v-for="responsibility in entry.responsibilities" :key="responsibility">
          {{ responsibility }}
        </li>
      </ul>
    </div>

    <p v-if="detail" class="record__detail">{{ detail }}</p>

    <div v-if="relatedProjects.length" class="record__section">
      <p class="record__label">Portfolio projects listed alongside this role</p>
      <ul class="record__projects">
        <li v-for="project in relatedProjects" :key="project.id">
          <RouterLink :to="`/work/${project.id}`">
            <span>{{ project.title }}</span>
            <span>{{ project.year }}</span>
            <ArrowUpRight :size="13" :stroke-width="1.4" aria-hidden="true" />
          </RouterLink>
        </li>
      </ul>
      <p class="record__micro">
        This is a portfolio grouping, not evidence that the role covered each project in full.
      </p>
    </div>

    <a
      v-if="entry.externalUrl"
      class="record__external"
      :href="entry.externalUrl"
      target="_blank"
      rel="noopener noreferrer"
    >
      Organisation website
      <ExternalLink :size="13" :stroke-width="1.4" aria-hidden="true" />
      <span class="sr-only">(opens in a new tab)</span>
    </a>

    <footer class="record__foot">
      <span>Dates reproduced from the 2015 CV.</span>
      <span>No later relationship is implied.</span>
    </footer>
  </article>
</template>

<style scoped>
.record {
  position: relative;
  padding: clamp(1.3rem, 2.5vw, 2.2rem);
  background: var(--charcoal);
  color: var(--paper);
  border: 1px solid rgba(243, 238, 229, 0.16);
}

.record::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 38px;
  height: 2px;
  background: var(--clay);
}

.record--education::before {
  background: var(--sand);
}

.record--qualification::before {
  background: var(--stone);
}

.record__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid rgba(243, 238, 229, 0.16);
}

.record__type {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--sand);
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.record--employment .record__type {
  color: #d99a7d;
}

.record--qualification .record__type {
  color: rgba(243, 238, 229, 0.55);
}

.record__period {
  color: rgba(243, 238, 229, 0.52);
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.record__title {
  max-width: 17ch;
  margin-top: 1.25rem;
  font-family: var(--serif);
  font-size: clamp(1.7rem, 3vw, 2.8rem);
  font-weight: 300;
  letter-spacing: -0.035em;
  line-height: 0.99;
}

.record__org {
  margin-top: 0.55rem;
  color: rgba(243, 238, 229, 0.65);
  font-size: 0.72rem;
  line-height: 1.5;
}

.record__summary {
  max-width: 34rem;
  margin-top: 1.2rem;
  color: rgba(243, 238, 229, 0.82);
  font-size: 0.82rem;
  line-height: 1.65;
}

.record__section {
  margin-top: 1.35rem;
  padding-top: 0.9rem;
  border-top: 1px solid rgba(243, 238, 229, 0.14);
}

.record__label {
  margin-bottom: 0.55rem;
  color: rgba(243, 238, 229, 0.58);
  font-size: 0.53rem;
  font-weight: 500;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.record__responsibilities {
  display: grid;
  gap: 0.25rem;
}

.record__responsibilities li {
  display: flex;
  gap: 0.5rem;
  color: rgba(243, 238, 229, 0.78);
  font-size: 0.75rem;
  line-height: 1.5;
}

.record__responsibilities li::before {
  content: '—';
  color: #b4694f;
}

.record__detail {
  max-width: 33rem;
  margin-top: 1.3rem;
  color: rgba(243, 238, 229, 0.68);
  font-size: 0.76rem;
  line-height: 1.65;
}

.record__projects {
  display: grid;
  gap: 0.25rem;
}

.record__projects a {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 0.65rem;
  min-height: 32px;
  color: rgba(243, 238, 229, 0.82);
  font-size: 0.7rem;
  line-height: 1.35;
  text-decoration: none;
  transition: color 180ms var(--quick);
}

.record__projects a:hover,
.record__projects a:focus-visible {
  color: #e0a386;
}

.record__projects a span:nth-child(2) {
  color: rgba(243, 238, 229, 0.56);
  font-size: 0.55rem;
  font-variant-numeric: tabular-nums;
}

.record__micro {
  margin-top: 0.55rem;
  color: rgba(243, 238, 229, 0.56);
  font-size: 0.58rem;
  line-height: 1.5;
}

.record__external {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 36px;
  margin-top: 1.3rem;
  color: var(--sand);
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-decoration: none;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(243, 238, 229, 0.3);
  transition: color 180ms var(--quick), border-color 180ms var(--quick);
}

.record__external:hover {
  color: var(--paper);
  border-color: var(--paper);
}

.record__foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-top: 1.6rem;
  padding-top: 0.7rem;
  border-top: 1px solid rgba(243, 238, 229, 0.14);
  color: rgba(243, 238, 229, 0.56);
  font-size: 0.52rem;
  letter-spacing: 0.05em;
  line-height: 1.5;
  text-transform: uppercase;
}
</style>
