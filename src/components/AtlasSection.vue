<script setup>
import { computed } from 'vue'
import { ArrowDownRight, X } from '@lucide/vue'
import SectionHeading from './SectionHeading.vue'
import { PROJECTS, REGIONS, getRegionCounts } from '../data/projects.js'
import { PORTUGAL_OUTLINE, UK_OUTLINE } from '../data/atlasPaths.js'

const props = defineProps({
  activeRegion: { type: String, default: 'all' },
})

const emit = defineEmits(['select-region'])

const regionCounts = computed(() => getRegionCounts(PROJECTS))
const mapRegions = computed(() => REGIONS.filter((region) => !region.offMap))
const offMapRegion = computed(() => REGIONS.find((region) => region.offMap) ?? null)

const markers = [
  { id: 'london', code: 'LDN', left: '31.5%', top: '50.5%', align: 'right' },
  { id: 'lisbon', code: 'LIS', left: '61.4%', top: '54.4%', align: 'right' },
  { id: 'cascais', code: 'CAS', left: '56.8%', top: '61.2%', align: 'left' },
  {
    id: 'comporta-algarve',
    code: 'C&A',
    left: '66.5%',
    top: '69.3%',
    align: 'right',
  },
  { id: 'fundao', code: 'FND', left: '76%', top: '37.7%', align: 'right' },
]

const active = computed(() => REGIONS.find((region) => region.id === props.activeRegion) ?? null)

const projectsFor = (regionId) =>
  PROJECTS.filter((project) => project.regionId === regionId).map((project) => project.title)

const choose = (regionId) => {
  emit('select-region', regionId === props.activeRegion ? 'all' : regionId)
}

const clear = () => emit('select-region', 'all')
</script>

<template>
  <section id="atlas" class="atlas section" aria-labelledby="atlas-heading">
    <div class="shell">
      <SectionHeading index="02" label="Geographic register">
        <template #title>
          <span id="atlas-heading">The work,<br /><em>situated.</em></span>
        </template>
        <template #aside>
          <p>
            A working map of documented locations. Select a region to filter the project gallery.
            The map is schematic: projects are placed at city or regional level, never as exact
            sites.
          </p>
        </template>
      </SectionHeading>

      <div class="atlas__grid">
        <div class="atlas__map-column">
          <div class="atlas-map" role="group" aria-label="Schematic map of project regions">
            <svg
              class="atlas-map__drawing"
              viewBox="0 0 900 620"
              role="presentation"
              aria-hidden="true"
            >
              <defs>
                <pattern id="atlas-grid" width="52" height="52" patternUnits="userSpaceOnUse">
                  <path d="M 52 0 L 0 0 0 52" fill="none" stroke="rgba(243,238,229,.075)" stroke-width="1" />
                </pattern>
              </defs>

              <rect width="900" height="620" fill="url(#atlas-grid)" />
              <path d="M0 466 C175 435 306 513 457 480 S726 374 900 415" fill="none" stroke="rgba(243,238,229,.1)" stroke-width="1" stroke-dasharray="2 7" />
              <path d="M0 515 C184 485 315 558 478 520 S744 425 900 465" fill="none" stroke="rgba(243,238,229,.07)" stroke-width="1" stroke-dasharray="2 7" />
              <path d="M0 84 C194 65 308 112 470 89 S731 43 900 60" fill="none" stroke="rgba(243,238,229,.07)" stroke-width="1" stroke-dasharray="2 7" />

              <g transform="translate(18 18) scale(0.38)">
                <path
                  :d="UK_OUTLINE"
                  fill="rgba(243,238,229,.045)"
                  stroke="rgba(243,238,229,.52)"
                  stroke-width="2.4"
                  vector-effect="non-scaling-stroke"
                />
              </g>

              <g transform="translate(520 70) scale(0.44)">
                <path
                  :d="PORTUGAL_OUTLINE"
                  fill="rgba(243,238,229,.055)"
                  stroke="rgba(243,238,229,.58)"
                  stroke-width="2.2"
                  vector-effect="non-scaling-stroke"
                />
              </g>

              <g fill="rgba(243,238,229,.43)" font-family="Archivo, sans-serif" font-size="9" letter-spacing="2.3">
                <text x="28" y="425">UNITED KINGDOM</text>
                <text x="623" y="605">PORTUGAL</text>
                <text x="40" y="580" transform="rotate(-90 40 580)">NORTH ATLANTIC</text>
              </g>

              <g stroke="rgba(243,238,229,.36)" stroke-width="1">
                <path d="M32 600 V582 M23 591 H41" />
                <circle cx="820" cy="88" r="20" fill="none" />
                <path d="M820 58 V76 M820 100 V118 M790 88 H808 M832 88 H850" />
                <path d="M820 64 L828 79 L820 76 L812 79 Z" fill="rgba(243,238,229,.68)" stroke="none" />
              </g>
              <text x="815" y="48" fill="rgba(243,238,229,.55)" font-family="Archivo, sans-serif" font-size="9" letter-spacing="1.5">N</text>
              <text x="52" y="604" fill="rgba(243,238,229,.4)" font-family="Archivo, sans-serif" font-size="8" letter-spacing="1.2">SCHEMATIC / NOT TO SCALE</text>
            </svg>

            <button
              v-for="marker in markers"
              :key="marker.id"
              type="button"
              class="atlas-marker"
              :class="[
                `atlas-marker--${marker.align}`,
                { 'is-active': activeRegion === marker.id, 'is-dimmed': activeRegion !== 'all' && activeRegion !== marker.id },
              ]"
              :style="{ left: marker.left, top: marker.top }"
              :aria-pressed="activeRegion === marker.id"
              :aria-label="`${activeRegion === marker.id ? 'Clear' : 'Filter projects in'} ${REGIONS.find((region) => region.id === marker.id)?.label}`"
              @click="choose(marker.id)"
            >
              <span class="atlas-marker__dot" aria-hidden="true"></span>
              <span class="atlas-marker__label" aria-hidden="true">{{ marker.code }}</span>
            </button>
          </div>

          <p class="atlas-map__caption">
            <span aria-hidden="true">↳</span>
            Markers are approximate regional placeholders, not geographic coordinates.
            <span>Five mapped regions · one offshore conceptual project.</span>
          </p>
        </div>

        <div class="atlas__index">
          <div class="atlas__index-head">
            <span>Region</span>
            <span>Records</span>
          </div>

          <ul class="atlas__regions">
            <li v-for="(region, index) in mapRegions" :key="region.id">
              <button
                type="button"
                class="region-row"
                :class="{ 'is-active': activeRegion === region.id }"
                :aria-pressed="activeRegion === region.id"
                @click="choose(region.id)"
              >
                <span class="region-row__number" aria-hidden="true">0{{ index + 1 }}</span>
                <span class="region-row__body">
                  <span class="region-row__name">{{ region.label }}</span>
                  <span class="region-row__detail">{{ region.detail }}</span>
                  <span v-if="activeRegion === region.id" class="region-row__projects">
                    {{ projectsFor(region.id).join(' · ') }}
                  </span>
                </span>
                <span class="region-row__count">{{ String(regionCounts[region.id] ?? 0).padStart(2, '0') }}</span>
                <ArrowDownRight
                  v-if="activeRegion === region.id"
                  class="region-row__arrow"
                  :size="16"
                  :stroke-width="1.4"
                  aria-hidden="true"
                />
              </button>
            </li>
          </ul>

          <div v-if="offMapRegion" class="atlas__offmap">
            <p class="eyebrow">Off the map / conceptual</p>
            <div class="atlas__offmap-row">
              <button
                type="button"
                class="region-row region-row--offmap"
                :class="{ 'is-active': activeRegion === offMapRegion.id }"
                :aria-pressed="activeRegion === offMapRegion.id"
                @click="choose(offMapRegion.id)"
              >
                <span class="region-row__body">
                  <span class="region-row__name">{{ offMapRegion.label }}</span>
                  <span class="region-row__detail">{{ offMapRegion.detail }}</span>
                  <span v-if="activeRegion === offMapRegion.id" class="region-row__projects">
                    {{ projectsFor(offMapRegion.id).join(' · ') }}
                  </span>
                </span>
                <span class="region-row__count">{{ String(regionCounts[offMapRegion.id] ?? 0).padStart(2, '0') }}</span>
                <ArrowDownRight
                  v-if="activeRegion === offMapRegion.id"
                  class="region-row__arrow"
                  :size="16"
                  :stroke-width="1.4"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <div class="atlas__active" aria-live="polite">
            <template v-if="active">
              <p>
                Showing <strong>{{ regionCounts[active.id] }}</strong> {{ regionCounts[active.id] === 1 ? 'project' : 'projects' }} in
                {{ active.label }}. The gallery has also moved to this selection.
              </p>
              <button type="button" class="atlas__clear" @click="clear">
                <X :size="13" :stroke-width="1.5" aria-hidden="true" />
                Clear location
              </button>
            </template>
            <p v-else>Select a region to cross the archive geographically.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.atlas {
  --ink: var(--paper);
  --ink-soft: rgba(243, 238, 229, 0.76);
  --muted: rgba(243, 238, 229, 0.49);
  --line: rgba(243, 238, 229, 0.16);
  --line-strong: rgba(243, 238, 229, 0.28);
  --clay: #cd8b6d;
  --paper-deep: #2b2b25;
  background: var(--charcoal);
  color: var(--paper);
  padding-block: clamp(4.5rem, 9vw, 9rem);
}

.atlas__grid {
  display: grid;
  grid-template-columns: minmax(0, 8fr) minmax(300px, 4fr);
  gap: clamp(2.5rem, 5vw, 6rem);
  align-items: start;
}

.atlas__map-column {
  min-width: 0;
}

.atlas-map {
  position: relative;
  width: 100%;
  aspect-ratio: 900 / 620;
  background: #171814;
  border: 1px solid var(--line);
  overflow: hidden;
}

.atlas-map::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 74% 65%, rgba(205, 139, 109, 0.08), transparent 29%);
}

.atlas-map__drawing {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.atlas-marker {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  transform: translate(-50%, -50%);
  min-width: 44px;
  min-height: 40px;
  color: var(--ink);
  font-size: 0.52rem;
  font-weight: 500;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  transition: opacity 250ms var(--quick), color 200ms var(--quick);
}

.atlas-marker--left {
  flex-direction: row-reverse;
  text-align: right;
}

.atlas-marker__dot {
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--clay);
  border: 1px solid var(--clay);
  border-radius: 50%;
  transition: transform 250ms var(--ease), background 200ms var(--quick), box-shadow 200ms var(--quick);
}

.atlas-marker__dot::after {
  content: '';
  position: absolute;
  inset: -6px;
  border: 1px solid rgba(205, 139, 109, 0.3);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.75);
  transition: opacity 250ms var(--quick), transform 250ms var(--ease);
}

.atlas-marker:hover .atlas-marker__dot,
.atlas-marker:focus-visible .atlas-marker__dot,
.atlas-marker.is-active .atlas-marker__dot {
  transform: scale(1.25);
  background: var(--paper);
  box-shadow: 0 0 0 4px rgba(205, 139, 109, 0.2);
}

.atlas-marker:hover .atlas-marker__dot::after,
.atlas-marker:focus-visible .atlas-marker__dot::after,
.atlas-marker.is-active .atlas-marker__dot::after {
  opacity: 1;
  transform: scale(1);
}

.atlas-marker__label {
  opacity: 0.7;
  transition: opacity 200ms var(--quick);
}

.atlas-marker:hover .atlas-marker__label,
.atlas-marker:focus-visible .atlas-marker__label,
.atlas-marker.is-active .atlas-marker__label {
  opacity: 1;
}

.atlas-marker.is-dimmed {
  opacity: 0.38;
}

.atlas-map__caption {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.6rem 1.5rem;
  margin-top: 0.85rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.56rem;
  letter-spacing: 0.06em;
  line-height: 1.5;
  text-transform: uppercase;
}

.atlas-map__caption span:first-child {
  color: var(--clay);
}

.atlas-map__caption span:last-child {
  text-align: right;
}

.atlas__index {
  min-width: 0;
}

.atlas__index-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid var(--line-strong);
  color: var(--muted);
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.atlas__regions {
  border-bottom: 1px solid var(--line);
}

.region-row {
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr) 2rem 1rem;
  gap: 0.8rem;
  align-items: start;
  width: 100%;
  padding: 1.15rem 0;
  color: var(--ink);
  text-align: left;
  border-bottom: 1px solid var(--line);
  transition:
    background 250ms var(--quick),
    padding 350ms var(--ease),
    color 200ms var(--quick);
}

.atlas__regions .region-row {
  border-bottom: 0;
}

.atlas__regions li {
  border-bottom: 1px solid var(--line);
}

.region-row:hover,
.region-row:focus-visible,
.region-row.is-active {
  padding-left: 0.55rem;
  background: rgba(243, 238, 229, 0.045);
}

.region-row.is-active {
  color: var(--paper);
}

.region-row__number {
  padding-top: 0.2rem;
  color: var(--muted);
  font-size: 0.52rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.1em;
}

.region-row__body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.region-row__name {
  font-family: var(--serif);
  font-size: clamp(1.25rem, 1.8vw, 1.7rem);
  font-weight: 300;
  letter-spacing: -0.015em;
  line-height: 1.1;
}

.region-row__detail {
  margin-top: 0.2rem;
  color: var(--muted);
  font-size: 0.54rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  line-height: 1.45;
  text-transform: uppercase;
}

.region-row__projects {
  margin-top: 0.5rem;
  color: rgba(243, 238, 229, 0.66);
  font-size: 0.6rem;
  letter-spacing: 0.02em;
  line-height: 1.5;
}

.region-row__count {
  padding-top: 0.2rem;
  color: var(--clay);
  font-size: 0.68rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.region-row__arrow {
  margin-top: 0.15rem;
  color: var(--clay);
}

.atlas__offmap {
  margin-top: 1.8rem;
  padding-top: 1.4rem;
  border-top: 1px solid var(--line-strong);
}

.atlas__offmap .eyebrow {
  margin-bottom: 0.55rem;
  color: var(--muted);
}

.region-row--offmap {
  grid-template-columns: minmax(0, 1fr) 2rem 1rem;
  padding-left: 0;
}

.atlas__offmap-row {
  border-bottom: 1px solid var(--line);
}

.atlas__active {
  min-height: 7rem;
  margin-top: 1.7rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.63rem;
  letter-spacing: 0.045em;
  line-height: 1.55;
}

.atlas__active strong {
  color: var(--clay);
  font-weight: 500;
}

.atlas__clear {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 32px;
  margin-top: 0.7rem;
  color: var(--ink-soft);
  font-size: 0.54rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-decoration: underline;
  text-underline-offset: 0.2em;
  text-transform: uppercase;
}

.atlas__clear:hover {
  color: var(--clay);
}

:deep(.section-heading__title em) {
  color: var(--clay);
}

@media (max-width: 1100px) {
  .atlas__grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .atlas__index {
    display: grid;
    grid-template-columns: minmax(0, 1.5fr) minmax(260px, 0.8fr);
    gap: 1.5rem 3rem;
    align-items: start;
  }

  .atlas__index-head {
    grid-column: 1 / -1;
  }

  .atlas__regions {
    grid-row: span 2;
  }

  .atlas__offmap {
    margin-top: 0;
  }

  .atlas__active {
    margin-top: 0;
    border-top: 0;
    padding-top: 0;
  }
}

@media (max-width: 760px) {
  .atlas__index {
    display: block;
  }

  .atlas__offmap {
    margin-top: 1.8rem;
  }

  .atlas__active {
    margin-top: 1.7rem;
    padding-top: 1rem;
    border-top: 1px solid var(--line);
  }

  .atlas-marker {
    font-size: 0.48rem;
  }

  .atlas-map__caption span:last-child {
    text-align: left;
  }

  .region-row {
    grid-template-columns: 1.7rem minmax(0, 1fr) 2rem 0.9rem;
    gap: 0.6rem;
  }

  .region-row__name {
    font-size: 1.45rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .atlas-marker__dot,
  .atlas-marker__dot::after,
  .region-row {
    transition: none;
  }
}
</style>
