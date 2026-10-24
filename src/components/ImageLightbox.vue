<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { X, ChevronLeft, ChevronRight } from '@lucide/vue'
import { useFocusTrap } from '../composables/useFocusTrap.js'

const props = defineProps({
  open: { type: Boolean, default: false },
  images: { type: Array, default: () => [] },
  initialIndex: { type: Number, default: 0 },
  projectTitle: { type: String, default: 'Project images' },
})

const emit = defineEmits(['update:open'])

const dialog = ref(null)
const currentIndex = ref(0)
const imageFailed = ref(false)
const isOpen = computed(() => props.open)

const currentImage = computed(() => props.images[currentIndex.value] ?? null)
const hasMultiple = computed(() => props.images.length > 1)
const counter = computed(() => {
  if (!props.images.length) return '0 / 0'
  return `${String(currentIndex.value + 1).padStart(2, '0')} / ${String(props.images.length).padStart(2, '0')}`
})

const close = () => emit('update:open', false)

const goTo = (nextIndex) => {
  if (!props.images.length) return
  currentIndex.value = (nextIndex + props.images.length) % props.images.length
}

const previous = () => {
  if (!hasMultiple.value) return
  goTo(currentIndex.value - 1)
}

const next = () => {
  if (!hasMultiple.value) return
  goTo(currentIndex.value + 1)
}

const handleKeydown = (event) => {
  if (!props.open) return
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    previous()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    next()
  }
}

let touchStartX = 0
let touchStartY = 0

const onTouchStart = (event) => {
  if (!hasMultiple.value || !event.changedTouches?.length) return
  touchStartX = event.changedTouches[0].clientX
  touchStartY = event.changedTouches[0].clientY
}

const onTouchEnd = (event) => {
  if (!hasMultiple.value || !event.changedTouches?.length) return
  const deltaX = event.changedTouches[0].clientX - touchStartX
  const deltaY = event.changedTouches[0].clientY - touchStartY

  if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) return
  if (deltaX > 0) previous()
  else next()
}

const onImageError = () => {
  imageFailed.value = true
}

useFocusTrap({
  container: dialog,
  active: isOpen,
  onClose: close,
})

watch(
  () => props.open,
  async (open) => {
    if (open) {
      currentIndex.value = Math.max(0, Math.min(props.initialIndex, props.images.length - 1))
      imageFailed.value = false
      window.addEventListener('keydown', handleKeydown)
      await nextTick()
    } else {
      window.removeEventListener('keydown', handleKeydown)
    }
  },
  { immediate: true },
)

watch(currentIndex, () => {
  imageFailed.value = false
})

watch(
  () => props.images,
  () => {
    if (currentIndex.value > props.images.length - 1) {
      currentIndex.value = Math.max(0, props.images.length - 1)
    }
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="open && currentImage"
        ref="dialog"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="`Image viewer — ${projectTitle}`"
        tabindex="-1"
        @click.self="close"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <div class="lightbox__top">
          <div class="lightbox__identity">
            <p class="lightbox__project">{{ projectTitle }}</p>
            <p class="lightbox__counter">{{ counter }}</p>
          </div>
          <button
            type="button"
            class="lightbox__close"
            data-autofocus
            aria-label="Close image viewer"
            @click="close"
          >
            <span>Close</span>
            <X :size="20" :stroke-width="1.4" aria-hidden="true" />
          </button>
        </div>

        <div class="lightbox__stage" @click.self="close">
          <button
            v-if="hasMultiple"
            type="button"
            class="lightbox__nav lightbox__nav--prev"
            aria-label="Previous image"
            @click="previous"
          >
            <ChevronLeft :size="26" :stroke-width="1.2" aria-hidden="true" />
          </button>

          <div class="lightbox__figure-wrap">
            <img
              v-if="!imageFailed"
              :key="currentImage.src"
              class="lightbox__image"
              :src="currentImage.src"
              :srcset="currentImage.srcset || undefined"
              :sizes="currentImage.srcset ? '92vw' : undefined"
              :alt="currentImage.alt"
              @error="onImageError"
            />
            <div v-else class="lightbox__fallback" role="img" :aria-label="`${currentImage.alt} — image unavailable`">
              <span class="lightbox__fallback-mark">GLR</span>
              <p>Image unavailable</p>
              <span>{{ projectTitle }}</span>
            </div>
          </div>

          <button
            v-if="hasMultiple"
            type="button"
            class="lightbox__nav lightbox__nav--next"
            aria-label="Next image"
            @click="next"
          >
            <ChevronRight :size="26" :stroke-width="1.2" aria-hidden="true" />
          </button>
        </div>

        <div class="lightbox__bottom">
          <div class="lightbox__caption" aria-live="polite">
            <p>{{ currentImage.caption }}</p>
            <p>{{ currentImage.credit }}</p>
          </div>
          <p class="lightbox__hint">
            <span v-if="hasMultiple">Use ← → or swipe</span>
            <span>Esc closes</span>
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background: #12120f;
  color: var(--paper);
  overflow: hidden;
  overscroll-behavior: contain;
}

.lightbox__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 4.5rem;
  padding: 0.85rem var(--gutter);
  border-bottom: 1px solid rgba(243, 238, 229, 0.16);
}

.lightbox__identity {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}

.lightbox__project {
  font-family: var(--serif);
  font-size: clamp(1rem, 1.5vw, 1.3rem);
  font-weight: 300;
  letter-spacing: -0.01em;
}

.lightbox__counter {
  color: rgba(243, 238, 229, 0.58);
  font-size: 0.57rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  font-variant-numeric: tabular-nums;
}

.lightbox__close {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 44px;
  padding-inline: 0.75rem;
  color: var(--paper);
  font-size: 0.59rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid rgba(243, 238, 229, 0.3);
  transition: color 180ms var(--quick), border-color 180ms var(--quick);
}

.lightbox__close:hover {
  color: #e1a486;
  border-color: #e1a486;
}

.lightbox__stage {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: 1.25rem clamp(3.5rem, 7vw, 8rem);
}

.lightbox__figure-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.lightbox__image {
  max-width: min(100%, 1450px);
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  color: rgba(243, 238, 229, 0.78);
  border: 1px solid rgba(243, 238, 229, 0.22);
  transform: translateY(-50%);
  transition:
    color 180ms var(--quick),
    border-color 180ms var(--quick),
    background 180ms var(--quick);
}

.lightbox__nav:hover {
  color: var(--paper);
  background: rgba(243, 238, 229, 0.08);
  border-color: rgba(243, 238, 229, 0.52);
}

.lightbox__nav--prev {
  left: clamp(0.8rem, 2.6vw, 3rem);
}

.lightbox__nav--next {
  right: clamp(0.8rem, 2.6vw, 3rem);
}

.lightbox__bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  min-height: 5rem;
  padding: 0.8rem var(--gutter) 1rem;
  border-top: 1px solid rgba(243, 238, 229, 0.16);
}

.lightbox__caption {
  max-width: 54rem;
}

.lightbox__caption p:first-child {
  color: rgba(243, 238, 229, 0.84);
  font-size: 0.69rem;
  line-height: 1.5;
}

.lightbox__caption p:last-child {
  margin-top: 0.2rem;
  color: rgba(243, 238, 229, 0.58);
  font-size: 0.58rem;
  line-height: 1.5;
}

.lightbox__hint {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.3rem 1rem;
  color: rgba(243, 238, 229, 0.58);
  font-size: 0.54rem;
  letter-spacing: 0.08em;
  line-height: 1.4;
  text-transform: uppercase;
  text-align: right;
}

.lightbox__fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: min(80vw, 720px);
  min-height: 42vh;
  border: 1px solid rgba(243, 238, 229, 0.2);
  color: rgba(243, 238, 229, 0.7);
  background:
    linear-gradient(135deg, transparent 49.9%, rgba(243, 238, 229, 0.1) 50%, transparent 50.1%),
    #1b1b17;
}

.lightbox__fallback-mark {
  font-family: var(--serif);
  font-size: 2.5rem;
  font-style: italic;
}

.lightbox__fallback p {
  font-family: var(--serif);
  font-size: 1.3rem;
}

.lightbox__fallback > span:last-child {
  color: rgba(243, 238, 229, 0.58);
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 280ms var(--quick);
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

@media (max-width: 720px) {
  .lightbox__top {
    min-height: 3.8rem;
    padding-block: 0.6rem;
  }

  .lightbox__stage {
    padding: 0.8rem 3.7rem;
  }

  .lightbox__nav {
    width: 42px;
    height: 42px;
  }

  .lightbox__nav--prev {
    left: 0.65rem;
  }

  .lightbox__nav--next {
    right: 0.65rem;
  }

  .lightbox__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
    min-height: 0;
    padding-bottom: max(0.8rem, env(safe-area-inset-bottom));
  }

  .lightbox__hint {
    justify-content: flex-start;
    text-align: left;
  }

  .lightbox__close span {
    display: none;
  }

  .lightbox__close {
    padding-inline: 0.6rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lightbox-enter-active,
  .lightbox-leave-active {
    transition: none;
  }
}
</style>
