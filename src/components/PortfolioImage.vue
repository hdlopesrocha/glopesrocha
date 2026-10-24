<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  srcset: { type: String, default: '' },
  sizes: { type: String, default: '100vw' },
  alt: { type: String, required: true },
  ratio: { type: String, default: '4 / 3' },
  priority: { type: Boolean, default: false },
  fit: { type: String, default: 'cover' },
  position: { type: String, default: '50% 50%' },
  fallbackLabel: { type: String, default: 'Project image' },
})

const root = ref(null)
const shouldLoad = ref(props.priority)
const loaded = ref(false)
const failed = ref(false)
let observer = null

const load = () => {
  shouldLoad.value = true
  observer?.disconnect()
}

const handleLoad = () => {
  loaded.value = true
  failed.value = false
}

const handleError = () => {
  failed.value = true
  loaded.value = false
}

const setupObserver = () => {
  observer?.disconnect()

  if (props.priority || !('IntersectionObserver' in window)) {
    load()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) load()
    },
    { rootMargin: '500px 0px' },
  )

  if (root.value) observer.observe(root.value)
}

watch(
  () => props.src,
  () => {
    loaded.value = false
    failed.value = false
    shouldLoad.value = props.priority
    setupObserver()
  },
)

onMounted(setupObserver)
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div
    ref="root"
    class="portfolio-image"
    :class="{ 'is-loaded': loaded, 'is-failed': failed }"
    :style="{ '--ratio': ratio, '--fit': fit, '--position': position }"
    :aria-busy="shouldLoad && !loaded && !failed ? 'true' : 'false'"
  >
    <img
      v-if="shouldLoad && !failed"
      :src="src"
      :srcset="srcset || undefined"
      :sizes="srcset ? sizes : undefined"
      :alt="alt"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      decoding="async"
      @load="handleLoad"
      @error="handleError"
    />

    <div v-if="!loaded && !failed" class="portfolio-image__placeholder" aria-hidden="true">
      <span class="portfolio-image__line"></span>
      <span class="portfolio-image__status">Image</span>
    </div>

    <div
      v-if="failed"
      class="portfolio-image__fallback"
      role="img"
      :aria-label="`${alt} — image unavailable`"
    >
      <span class="portfolio-image__mark">GLR</span>
      <span class="portfolio-image__fallback-label">{{ fallbackLabel }}</span>
      <span class="portfolio-image__fallback-note">Image unavailable</span>
    </div>
  </div>
</template>

<style scoped>
.portfolio-image {
  position: relative;
  width: 100%;
  aspect-ratio: var(--ratio);
  overflow: hidden;
  background: var(--paper-deep);
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: var(--fit);
  object-position: var(--position);
  opacity: 0;
  transition: opacity 600ms var(--ease);
}

.portfolio-image.is-loaded img {
  opacity: 1;
}

.portfolio-image__placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  color: var(--muted);
  background:
    linear-gradient(135deg, transparent 49.8%, rgba(24, 23, 19, 0.08) 50%, transparent 50.2%),
    var(--paper-deep);
}

.portfolio-image__line {
  width: 38%;
  height: 1px;
  background: var(--line-strong);
}

.portfolio-image__status {
  align-self: flex-end;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.portfolio-image__fallback {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem;
  color: var(--ink);
  background:
    linear-gradient(135deg, transparent 49.9%, rgba(24, 23, 19, 0.11) 50%, transparent 50.1%),
    var(--paper-deep);
}

.portfolio-image__mark {
  font-family: var(--serif);
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  font-style: italic;
  line-height: 1;
}

.portfolio-image__fallback-label {
  max-width: 16rem;
  margin-top: auto;
  font-family: var(--serif);
  font-size: 1.1rem;
  line-height: 1.1;
}

.portfolio-image__fallback-note {
  font-size: 0.62rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--muted);
}
</style>
