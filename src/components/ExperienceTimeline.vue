<script setup>
import { computed, nextTick, ref } from 'vue'
import { CircleDot, List, ArrowDownRight, ExternalLink } from '@lucide/vue'
import SectionHeading from './SectionHeading.vue'
import TimelineRecord from './TimelineRecord.vue'
import { EMPLOYMENTS, EDUCATION, QUALIFICATIONS, TIMELINE } from '../data/experience.js'
import { useMediaQuery } from '../composables/useMediaQuery.js'
import { prefersReducedMotion } from '../utils/motion.js'

const selectedId = ref('facit-homes')
const view = ref('timeline')
const isMobile = useMediaQuery('(max-width: 880px)')
const detailRef = ref(null)

const selectedEntry = computed(
  () => TIMELINE.find((entry) => entry.id === selectedId.value) ?? TIMELINE[0],
)

const selectedTitle = computed(
  () => selectedEntry.value?.role ?? selectedEntry.value?.title ?? 'Record',
)

const employmentCount = EMPLOYMENTS.length
const educationCount = EDUCATION.length
const qualificationCount = QUALIFICATIONS.length

const typeLabel = (type) =>
  ({ employment: 'Employment', education: 'Education', qualification: 'Qualification' })[type] ??
  'Record'

const entryTitle = (entry) => entry.role ?? entry.title

const selectEntry = async (entry) => {
  selectedId.value = entry.id
  if (!isMobile.value || view.value !== 'timeline') return

  await nextTick()
  const inline = document.getElementById(`inline-record-${entry.id}`)
  if (inline) {
    inline.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'nearest',
    })
  }
}

const openCompactRecord = (entry) => {
  selectedId.value = entry.id
  view.value = 'timeline'
  nextTick(() => {
    const button = document.getElementById(`timeline-button-${entry.id}`)
    button?.focus({ preventScroll: true })
    detailRef.value?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
  })
}

const recordHeadingId = computed(() => `record-heading-${selectedEntry.value.id}`)
</script>

<template>
  <section id="experience" class="experience section section--ruled" aria-labelledby="experience-heading">
    <div class="shell">
      <SectionHeading index="04" label="Professional record">
        <template #title>
          <span id="experience-heading">Work, study,<br /><em>qualify.</em></span>
        </template>
        <template #aside>
          <p>
            A chronological record in two views: an interactive timeline for context, and a
            compact list for scanning. Employment, education and qualifications are distinguished
            throughout.
          </p>
        </template>
      </SectionHeading>

      <div class="experience__summary">
        <p>
          <strong>{{ employmentCount }}</strong> documented roles
          <span>·</span>
          <strong>{{ educationCount }}</strong> degree
          <span>·</span>
          <strong>{{ qualificationCount }}</strong> qualification records
        </p>
        <p class="experience__disclaimer">
          The record begins in 2007 and ends in December 2015. No relationship is extended beyond
          the dates recorded in the CV.
        </p>
      </div>

      <div class="experience__toolbar">
        <div class="experience__legend" aria-label="Timeline legend">
          <span><i class="legend-dot legend-dot--employment" aria-hidden="true"></i> Employment</span>
          <span><i class="legend-dot legend-dot--education" aria-hidden="true"></i> Education</span>
          <span><i class="legend-dot legend-dot--qualification" aria-hidden="true"></i> Qualification</span>
        </div>

        <div class="view-switch" role="group" aria-label="Experience view">
          <button
            type="button"
            class="view-switch__button"
            :class="{ 'is-active': view === 'timeline' }"
            :aria-pressed="view === 'timeline'"
            @click="view = 'timeline'"
          >
            <CircleDot :size="14" :stroke-width="1.5" aria-hidden="true" />
            <span>Interactive timeline</span>
          </button>
          <button
            type="button"
            class="view-switch__button"
            :class="{ 'is-active': view === 'list' }"
            :aria-pressed="view === 'list'"
            @click="view = 'list'"
          >
            <List :size="15" :stroke-width="1.5" aria-hidden="true" />
            <span>Compact list</span>
          </button>
        </div>
      </div>

      <Transition name="view-fade" mode="out-in">
        <div v-if="view === 'timeline'" key="timeline" class="timeline-layout">
          <div class="timeline-list">
            <div class="timeline-list__head">
              <span>Date</span>
              <span>Record</span>
              <span>Newest first</span>
            </div>

            <ol>
              <li
                v-for="entry in TIMELINE"
                :key="entry.id"
                class="timeline-item"
                :class="`timeline-item--${entry.type}`"
              >
                <button
                  :id="`timeline-button-${entry.id}`"
                  type="button"
                  class="timeline-entry"
                  :class="{ 'is-active': selectedId === entry.id }"
                  :aria-pressed="!isMobile ? selectedId === entry.id : undefined"
                  :aria-expanded="isMobile ? selectedId === entry.id : undefined"
                  :aria-controls="isMobile && selectedId === entry.id ? `inline-record-${entry.id}` : undefined"
                  @click="selectEntry(entry)"
                >
                  <span class="timeline-entry__date">
                    <span class="timeline-entry__year">{{ entry.sortYear }}</span>
                    <span class="timeline-entry__period">{{ entry.periodLabel }}</span>
                  </span>
                  <span class="timeline-entry__rail" aria-hidden="true">
                    <span class="timeline-entry__node"></span>
                  </span>
                  <span class="timeline-entry__body">
                    <span class="timeline-entry__type">{{ typeLabel(entry.type) }}</span>
                    <span class="timeline-entry__title">{{ entryTitle(entry) }}</span>
                    <span class="timeline-entry__org">
                      {{ entry.organisation || 'Independent' }}
                      <template v-if="entry.location">· {{ entry.location }}</template>
                    </span>
                  </span>
                  <ArrowDownRight
                    class="timeline-entry__icon"
                    :size="16"
                    :stroke-width="1.35"
                    aria-hidden="true"
                  />
                </button>

                <Transition v-if="isMobile" name="inline-record">
                  <div
                    v-if="selectedId === entry.id"
                    :id="`inline-record-${entry.id}`"
                    class="timeline-inline"
                  >
                    <TimelineRecord
                      :entry="entry"
                      :heading-id="`inline-heading-${entry.id}`"
                    />
                  </div>
                </Transition>
              </li>
            </ol>
          </div>

          <aside v-if="!isMobile" ref="detailRef" class="timeline-detail">
            <div class="timeline-detail__label">
              <span>Selected record</span>
              <span>{{ selectedEntry.periodLabel }}</span>
            </div>
            <TimelineRecord
              :key="selectedEntry.id"
              :entry="selectedEntry"
              :heading-id="recordHeadingId"
            />
            <p class="timeline-detail__hint" aria-hidden="true">
              Select another record to update this panel.
            </p>
          </aside>
        </div>

        <div v-else key="list" class="compact-history">
          <div class="compact-history__head" aria-hidden="true">
            <span>Year</span>
            <span>Type</span>
            <span>Record</span>
            <span>Dates</span>
            <span></span>
          </div>
          <ol>
            <li v-for="entry in TIMELINE" :key="entry.id">
              <div class="compact-history__row">
                <span class="compact-history__year">{{ entry.sortYear }}</span>
                <span class="compact-history__type" :class="`is-${entry.type}`">{{ typeLabel(entry.type) }}</span>
                <div class="compact-history__record">
                  <p class="compact-history__title">{{ entryTitle(entry) }}</p>
                  <p class="compact-history__org">
                    {{ entry.organisation || 'Independent qualification' }}
                    <template v-if="entry.location">· {{ entry.location }}</template>
                  </p>
                  <p class="compact-history__summary">{{ entry.summary }}</p>
                  <ul v-if="entry.responsibilities?.length" class="compact-history__responsibilities">
                    <li v-for="responsibility in entry.responsibilities" :key="responsibility">
                      {{ responsibility }}
                    </li>
                  </ul>
                </div>
                <span class="compact-history__period">{{ entry.periodLabel }}</span>
                <button
                  type="button"
                  class="compact-history__open"
                  :aria-label="`Open ${entryTitle(entry)} in the interactive timeline`"
                  @click="openCompactRecord(entry)"
                >
                  <ArrowDownRight :size="17" :stroke-width="1.4" aria-hidden="true" />
                </button>
              </div>

              <div v-if="entry.externalUrl" class="compact-history__external-wrap">
                <a
                  class="compact-history__external"
                  :href="entry.externalUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Organisation website
                  <ExternalLink :size="12" :stroke-width="1.4" aria-hidden="true" />
                  <span class="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </li>
          </ol>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.experience {
  background: var(--paper);
}

.experience__summary {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 2rem;
  margin-bottom: 1.7rem;
  padding-bottom: 1.15rem;
  border-bottom: 1px solid var(--line);
}

.experience__summary > p:first-child {
  font-family: var(--serif);
  font-size: clamp(1.35rem, 2.1vw, 1.9rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.experience__summary strong {
  color: var(--clay);
  font-weight: 300;
}

.experience__summary > p:first-child span {
  margin-inline: 0.5rem;
  color: var(--line-strong);
}

.experience__disclaimer {
  max-width: 32rem;
  justify-self: end;
  color: var(--muted);
  font-size: 0.64rem;
  letter-spacing: 0.025em;
  line-height: 1.6;
}

.experience__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.7rem;
}

.experience__legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.9rem 1.4rem;
  color: var(--muted);
  font-size: 0.57rem;
  font-weight: 500;
  letter-spacing: 0.075em;
  text-transform: uppercase;
}

.experience__legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.legend-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
}

.legend-dot--employment {
  background: var(--clay);
}

.legend-dot--education {
  border: 1px solid var(--stone);
  border-radius: 50%;
}

.legend-dot--qualification {
  width: 8px;
  height: 1px;
  background: var(--stone);
}

.view-switch {
  display: flex;
  border: 1px solid var(--line);
}

.view-switch__button {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 36px;
  padding: 0.3rem 0.75rem;
  color: var(--muted);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  transition: color 180ms var(--quick), background 180ms var(--quick);
}

.view-switch__button + .view-switch__button {
  border-left: 1px solid var(--line);
}

.view-switch__button:hover {
  color: var(--ink);
}

.view-switch__button.is-active {
  color: var(--ink);
  background: var(--paper-deep);
}

.timeline-layout {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(320px, 4.4fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
}

.timeline-list {
  border-top: 1px solid var(--line-strong);
}

.timeline-list__head {
  display: grid;
  grid-template-columns: 7rem minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
  min-height: 2.75rem;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.53rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.timeline-list__head span:nth-child(2) {
  padding-left: 2.5rem;
}

.timeline-list__head span:last-child {
  text-align: right;
}

.timeline-item {
  border-bottom: 1px solid var(--line);
}

.timeline-entry {
  display: grid;
  grid-template-columns: 7rem 1.5rem minmax(0, 1fr) 1.4rem;
  align-items: center;
  width: 100%;
  padding-block: clamp(1rem, 2vw, 1.45rem);
  color: var(--ink);
  text-align: left;
  transition:
    background 200ms var(--quick),
    padding 300ms var(--ease);
}

.timeline-entry:hover,
.timeline-entry:focus-visible {
  background: rgba(212, 196, 170, 0.18);
}

.timeline-entry.is-active {
  background: rgba(212, 196, 170, 0.26);
}

.timeline-entry__date {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding-left: 0.45rem;
}

.timeline-entry__year {
  color: var(--ink);
  font-family: var(--serif);
  font-size: clamp(1.3rem, 2vw, 1.7rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 0.9;
  font-variant-numeric: tabular-nums;
}

.timeline-entry__period {
  color: var(--muted);
  font-size: 0.51rem;
  letter-spacing: 0.05em;
  line-height: 1.35;
  text-transform: uppercase;
}

.timeline-entry__rail {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
}

.timeline-entry__rail::before {
  content: '';
  position: absolute;
  top: -1.5rem;
  bottom: -1.5rem;
  left: 50%;
  width: 1px;
  background: var(--line);
}

.timeline-item:first-child .timeline-entry__rail::before {
  top: 50%;
}

.timeline-item:last-child .timeline-entry__rail::before {
  bottom: 50%;
}

.timeline-entry__node {
  position: relative;
  z-index: 1;
  display: block;
  width: 8px;
  height: 8px;
  background: var(--clay);
}

.timeline-item--education .timeline-entry__node {
  background: transparent;
  border: 1px solid var(--stone);
  border-radius: 50%;
}

.timeline-item--qualification .timeline-entry__node {
  width: 10px;
  height: 2px;
  background: var(--stone);
}

.timeline-entry__body {
  display: grid;
  min-width: 0;
  gap: 0.15rem;
  padding-left: 0.55rem;
}

.timeline-entry__type {
  color: var(--muted);
  font-size: 0.51rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.timeline-item--employment .timeline-entry__type {
  color: var(--clay);
}

.timeline-entry__title {
  margin-top: 0.1rem;
  font-family: var(--serif);
  font-size: clamp(1.2rem, 1.7vw, 1.55rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.timeline-entry__org {
  overflow: hidden;
  color: var(--muted);
  font-size: 0.62rem;
  letter-spacing: 0.015em;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.timeline-entry__icon {
  justify-self: end;
  color: var(--line-strong);
  opacity: 0;
  transform: translate(-3px, 3px);
  transition: opacity 180ms var(--quick), transform 250ms var(--ease), color 180ms var(--quick);
}

.timeline-entry:hover .timeline-entry__icon,
.timeline-entry:focus-visible .timeline-entry__icon,
.timeline-entry.is-active .timeline-entry__icon {
  opacity: 1;
  transform: translate(0, 0);
  color: var(--clay);
}

.timeline-inline {
  padding: 0 0 1.5rem 1.5rem;
}

.timeline-detail {
  position: sticky;
  top: calc(var(--nav-h) + 2rem);
}

.timeline-detail__label {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.55rem;
  color: var(--muted);
  font-size: 0.53rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.timeline-detail__hint {
  margin-top: 0.8rem;
  color: var(--muted);
  font-size: 0.55rem;
  letter-spacing: 0.03em;
}

.compact-history {
  border-top: 1px solid var(--line-strong);
}

.compact-history__head,
.compact-history__row {
  display: grid;
  grid-template-columns: 4.5rem 7.4rem minmax(0, 1fr) 7.5rem 1.5rem;
  gap: 1.1rem;
  align-items: start;
}

.compact-history__head {
  min-height: 2.75rem;
  align-items: center;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.53rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.compact-history li {
  position: relative;
  border-bottom: 1px solid var(--line);
}

.compact-history__row {
  padding-block: 1.15rem;
  transition: background 200ms var(--quick);
}

.compact-history__row:hover {
  background: rgba(212, 196, 170, 0.16);
}

.compact-history__year {
  color: var(--ink);
  font-family: var(--serif);
  font-size: 1.35rem;
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.05;
  font-variant-numeric: tabular-nums;
}

.compact-history__type {
  width: fit-content;
  color: var(--muted);
  font-size: 0.53rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.5;
  text-transform: uppercase;
}

.compact-history__type.is-employment {
  color: var(--clay);
}

.compact-history__type.is-education {
  color: var(--ink-soft);
}

.compact-history__record {
  min-width: 0;
}

.compact-history__title {
  font-family: var(--serif);
  font-size: clamp(1.2rem, 1.65vw, 1.5rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.compact-history__org {
  margin-top: 0.15rem;
  color: var(--muted);
  font-size: 0.62rem;
  line-height: 1.45;
}

.compact-history__summary {
  max-width: 42rem;
  margin-top: 0.45rem;
  color: var(--ink-soft);
  font-size: 0.72rem;
  line-height: 1.55;
}

.compact-history__responsibilities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.85rem;
  margin-top: 0.45rem;
  color: var(--muted);
  font-size: 0.57rem;
  line-height: 1.5;
}

.compact-history__responsibilities li::before {
  content: '—';
  margin-right: 0.35rem;
  color: var(--clay);
}

.compact-history__period {
  color: var(--muted);
  font-size: 0.57rem;
  letter-spacing: 0.02em;
  line-height: 1.45;
}

.compact-history__open {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--muted);
  border: 1px solid var(--line);
  transition: color 180ms var(--quick), border-color 180ms var(--quick);
}

.compact-history__open:hover {
  color: var(--clay);
  border-color: var(--clay);
}

.compact-history__external-wrap {
  padding-bottom: 0.8rem;
  margin-top: -0.35rem;
  padding-left: calc(4.5rem + 7.4rem + 2.2rem);
}

.compact-history__external {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--muted);
  font-size: 0.52rem;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-decoration: none;
  text-transform: uppercase;
}

.compact-history__external:hover {
  color: var(--clay);
}

.view-fade-enter-active,
.view-fade-leave-active {
  transition: opacity 220ms var(--quick);
}

.view-fade-enter-from,
.view-fade-leave-to {
  opacity: 0;
}

.inline-record-enter-active,
.inline-record-leave-active {
  transition: opacity 220ms var(--quick);
}

.inline-record-enter-from,
.inline-record-leave-to {
  opacity: 0;
}

@media (max-width: 1120px) {
  .timeline-layout {
    grid-template-columns: minmax(0, 6.6fr) minmax(300px, 5fr);
    gap: 2.5rem;
  }

  .experience__legend {
    gap: 0.7rem 1rem;
  }
}

@media (max-width: 880px) {
  .experience__summary {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .experience__disclaimer {
    justify-self: start;
  }

  .experience__toolbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.9rem;
  }

  .timeline-layout {
    grid-template-columns: 1fr;
  }

  .timeline-detail {
    display: none;
  }

  .timeline-list__head {
    grid-template-columns: 5rem minmax(0, 1fr) auto;
  }

  .timeline-entry {
    grid-template-columns: 5.5rem 1.2rem minmax(0, 1fr) 1.2rem;
  }

  .timeline-entry__body {
    padding-left: 0.35rem;
  }

  .timeline-entry__icon {
    opacity: 1;
    transform: none;
  }

  .timeline-inline {
    padding-left: 0;
  }

  .compact-history__head {
    display: none;
  }

  .compact-history__row {
    grid-template-columns: 3rem 5rem minmax(0, 1fr) 1.5rem;
    gap: 0.6rem;
  }

  .compact-history__period {
    grid-column: 3;
    grid-row: 2;
    margin-top: -0.75rem;
  }

  .compact-history__open {
    grid-column: 4;
    grid-row: 1 / span 2;
  }

  .compact-history__external-wrap {
    padding-left: calc(3rem + 5rem + 1.2rem);
  }
}

@media (max-width: 620px) {
  .experience__legend {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.45rem;
  }

  .view-switch {
    width: 100%;
  }

  .view-switch__button {
    flex: 1;
    justify-content: center;
  }

  .timeline-list__head {
    display: none;
  }

  .timeline-entry {
    grid-template-columns: 1rem minmax(0, 1fr) 1.2rem;
    padding-block: 1rem;
  }

  .timeline-entry__date {
    grid-column: 2;
    grid-row: 2;
    flex-direction: row;
    align-items: baseline;
    gap: 0.45rem;
    padding-left: 0;
  }

  .timeline-entry__year {
    display: none;
  }

  .timeline-entry__period {
    font-size: 0.6rem;
  }

  .timeline-entry__rail {
    grid-column: 1;
    grid-row: 1 / span 2;
    align-self: stretch;
  }

  .timeline-entry__body {
    grid-column: 2;
    grid-row: 1;
  }

  .timeline-entry__icon {
    grid-column: 3;
    grid-row: 1 / span 2;
  }

  .timeline-inline {
    padding-bottom: 1.1rem;
  }

  .compact-history__row {
    grid-template-columns: 2.6rem minmax(0, 1fr) 1.5rem;
    row-gap: 0.25rem;
  }

  .compact-history__year {
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  .compact-history__type {
    grid-column: 2;
    grid-row: 1;
  }

  .compact-history__record {
    grid-column: 2;
    grid-row: 2;
  }

  .compact-history__period {
    grid-column: 2;
    grid-row: 3;
    margin-top: 0;
  }

  .compact-history__open {
    grid-column: 3;
    grid-row: 1 / span 3;
  }

  .compact-history__external-wrap {
    padding-left: 3.2rem;
  }

  .compact-history__responsibilities {
    display: none;
  }
}
</style>
