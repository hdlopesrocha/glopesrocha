<script setup>
import { computed } from 'vue'
import { LayoutGrid, Rows3, X, ChevronDown } from '@lucide/vue'
import { CATEGORIES, REGION_MAP, SORT_OPTIONS } from '../data/projects.js'

const props = defineProps({
  category: { type: String, required: true },
  sort: { type: String, required: true },
  view: { type: String, required: true },
  region: { type: String, required: true },
  categoryCounts: { type: Object, required: true },
  resultCount: { type: Number, required: true },
})

const emit = defineEmits([
  'update:category',
  'update:sort',
  'update:view',
  'clear-filters',
  'clear-region',
])

const activeRegion = computed(() =>
  props.region === 'all' ? null : REGION_MAP[props.region] ?? null,
)
const hasFilters = computed(() => props.category !== 'all' || props.region !== 'all')

const resultLabel = computed(() => {
  const noun = props.resultCount === 1 ? 'project' : 'projects'
  return `${props.resultCount} ${noun}`
})
</script>

<template>
  <div class="gallery-controls">
    <div class="category-filter">
      <span class="category-filter__label sr-only" id="category-filter-label">Filter by project category</span>
      <div class="category-filter__scroll" role="group" aria-labelledby="category-filter-label">
        <button
          v-for="option in CATEGORIES"
          :key="option.id"
          type="button"
          class="category-filter__button"
          :class="{ 'is-active': category === option.id }"
          :aria-pressed="category === option.id"
          @click="emit('update:category', option.id)"
        >
          <span>{{ option.label }}</span>
          <span class="category-filter__count" aria-hidden="true">{{ categoryCounts[option.id] ?? 0 }}</span>
        </button>
      </div>
    </div>

    <div class="gallery-controls__status">
      <div class="gallery-controls__meta">
        <p class="gallery-controls__result" aria-live="polite">{{ resultLabel }}</p>

        <div class="gallery-controls__active">
          <span v-if="activeRegion" class="active-region">
            <span class="active-region__label">Location</span>
            <span>{{ activeRegion.label }}</span>
            <button
              type="button"
              class="active-region__remove"
              :aria-label="`Remove the ${activeRegion.label} location filter`"
              @click="emit('clear-region')"
            >
              <X :size="13" :stroke-width="1.5" aria-hidden="true" />
            </button>
          </span>
          <button
            v-if="hasFilters"
            type="button"
            class="clear-filters"
            @click="emit('clear-filters')"
          >
            Clear filters
          </button>
        </div>
      </div>

      <div class="gallery-controls__tools">
        <div class="view-switch" role="group" aria-label="Project presentation">
          <button
            type="button"
            class="view-switch__button"
            :class="{ 'is-active': view === 'grid' }"
            :aria-pressed="view === 'grid'"
            aria-label="Show projects in a grid"
            @click="emit('update:view', 'grid')"
          >
            <LayoutGrid :size="15" :stroke-width="1.5" aria-hidden="true" />
            <span>Grid</span>
          </button>
          <button
            type="button"
            class="view-switch__button"
            :class="{ 'is-active': view === 'index' }"
            :aria-pressed="view === 'index'"
            aria-label="Show projects in a compact index"
            @click="emit('update:view', 'index')"
          >
            <Rows3 :size="16" :stroke-width="1.5" aria-hidden="true" />
            <span>Index</span>
          </button>
        </div>

        <label class="sort-control">
          <span class="sr-only">Sort projects</span>
          <select :value="sort" @change="emit('update:sort', $event.target.value)">
            <option v-for="option in SORT_OPTIONS" :key="option.id" :value="option.id">
              {{ option.label }}
            </option>
          </select>
          <ChevronDown :size="14" :stroke-width="1.5" aria-hidden="true" />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-controls {
  position: static;
  margin-bottom: clamp(2.5rem, 5vw, 4.5rem);
  padding-top: 0.95rem;
  padding-bottom: 0.8rem;
  background: var(--paper);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.category-filter {
  min-width: 0;
  width: 100%;
}

.category-filter__scroll {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.15rem;
}

.category-filter__button {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 36px;
  padding: 0.4rem 0.65rem;
  color: var(--muted);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.075em;
  line-height: 1.2;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
  border: 1px solid transparent;
  transition:
    color 180ms var(--quick),
    background 180ms var(--quick),
    border-color 180ms var(--quick);
}

.category-filter__button:hover {
  color: var(--ink);
  border-color: var(--line);
}

.category-filter__button.is-active {
  color: var(--paper-light);
  background: var(--ink);
  border-color: var(--ink);
}

.category-filter__count {
  color: inherit;
  font-size: 0.52rem;
  opacity: 0.6;
  font-variant-numeric: tabular-nums;
}

.gallery-controls__tools {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  flex: 0 0 auto;
}

.view-switch {
  display: flex;
  border: 1px solid var(--line);
}

.view-switch__button {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 34px;
  padding: 0.3rem 0.65rem;
  color: var(--muted);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.08em;
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

.sort-control {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 36px;
  min-width: 12rem;
  border-bottom: 1px solid var(--line-strong);
}

.sort-control select {
  width: 100%;
  padding: 0.35rem 1.6rem 0.35rem 0;
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--ink-soft);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.075em;
  text-transform: uppercase;
  cursor: pointer;
}

.sort-control svg {
  position: absolute;
  right: 0.1rem;
  pointer-events: none;
  color: var(--muted);
}

.gallery-controls__status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 2.6rem;
  margin-top: 0.55rem;
  padding-top: 0.55rem;
  border-top: 1px solid var(--line);
}

.gallery-controls__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.5rem;
  min-width: 0;
}

.gallery-controls__result {
  color: var(--muted);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
}

.gallery-controls__active {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.9rem;
}

.active-region {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 26px;
  padding-left: 0.55rem;
  border: 1px solid var(--line-strong);
  color: var(--ink-soft);
  font-size: 0.58rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.active-region__label {
  color: var(--muted);
  font-size: 0.5rem;
}

.active-region__remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 24px;
  color: var(--muted);
  border-left: 1px solid var(--line);
  transition: color 180ms var(--quick), background 180ms var(--quick);
}

.active-region__remove:hover {
  color: var(--ink);
  background: var(--paper-deep);
}

.clear-filters {
  min-height: 30px;
  color: var(--clay);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-decoration: underline;
  text-underline-offset: 0.2em;
  text-transform: uppercase;
}

@media (max-width: 1180px) {
  .gallery-controls {
    padding-top: 0.75rem;
  }

  .gallery-controls__status {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.55rem;
  }

  .gallery-controls__tools {
    width: 100%;
    justify-content: space-between;
    padding-top: 0.15rem;
  }

  .category-filter__button {
    min-height: 34px;
  }
}

@media (max-width: 760px) {
  .gallery-controls {
    margin-bottom: 2.5rem;
  }

  .category-filter__scroll {
    gap: 0.2rem;
  }

  .category-filter__button {
    padding-inline: 0.55rem;
  }

  .gallery-controls__tools {
    gap: 0.8rem;
  }

  .sort-control {
    min-width: 0;
    flex: 1;
  }

  .view-switch__button span {
    display: none;
  }

  .view-switch__button {
    padding-inline: 0.7rem;
  }

  .gallery-controls__meta {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
