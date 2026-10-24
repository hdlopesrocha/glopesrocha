<script setup>
import { computed } from 'vue'
import { ExternalLink } from '@lucide/vue'
import { SOURCE_MAP } from '../data/sources.js'

const props = defineProps({
  sourceIds: { type: Array, default: () => [] },
  title: { type: String, default: 'Sources for this record' },
  compact: { type: Boolean, default: false },
})

const sources = computed(() =>
  props.sourceIds.map((id) => SOURCE_MAP[id]).filter(Boolean),
)
</script>

<template>
  <section class="source-list" :class="{ 'source-list--compact': compact }" aria-label="Project sources">
    <h3 class="source-list__title">{{ title }}</h3>
    <ul>
      <li v-for="source in sources" :key="source.id">
        <span class="source-list__type">{{ source.type }}</span>
        <div class="source-list__body">
          <p class="source-list__name">{{ source.title }}</p>
          <p class="source-list__publisher">{{ source.publisher }}</p>
          <a
            v-if="source.url"
            :href="source.url"
            target="_blank"
            rel="noopener noreferrer"
            class="source-list__link"
          >
            View source
            <ExternalLink :size="11" :stroke-width="1.4" aria-hidden="true" />
            <span class="sr-only">(opens in a new tab)</span>
          </a>
          <span v-else class="source-list__local">Supplied document</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.source-list {
  border-top: 1px solid var(--line-strong);
  padding-top: 0.85rem;
}

.source-list__title {
  color: var(--muted);
  font-family: var(--sans);
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.source-list ul {
  margin-top: 0.6rem;
}

.source-list li {
  display: grid;
  grid-template-columns: 6.6rem minmax(0, 1fr);
  gap: 0.8rem;
  padding-block: 0.6rem;
  border-bottom: 1px solid var(--line);
}

.source-list li:last-child {
  border-bottom: 0;
}

.source-list__type {
  color: var(--muted);
  font-size: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.055em;
  line-height: 1.5;
  text-transform: uppercase;
}

.source-list__name {
  font-family: var(--serif);
  font-size: 0.95rem;
  font-weight: 300;
  letter-spacing: -0.01em;
  line-height: 1.25;
}

.source-list__publisher {
  margin-top: 0.1rem;
  color: var(--muted);
  font-size: 0.55rem;
  line-height: 1.5;
}

.source-list__link,
.source-list__local {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.35rem;
  color: var(--clay);
  font-size: 0.51rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
}

.source-list__link:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.source-list__local {
  color: var(--muted);
  cursor: default;
}

@media (max-width: 600px) {
  .source-list li {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
}
</style>
