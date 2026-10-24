<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowUp } from '@lucide/vue'
import { prefersReducedMotion } from '../utils/motion.js'

const visible = ref(false)
let frame = 0

const onScroll = () => {
  if (frame) return
  frame = window.requestAnimationFrame(() => {
    visible.value = window.scrollY > window.innerHeight * 0.85
    frame = 0
  })
}

const toTop = () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (frame) window.cancelAnimationFrame(frame)
})
</script>

<template>
  <Transition name="back-top">
    <button
      v-if="visible"
      type="button"
      class="back-top"
      aria-label="Back to top"
      @click="toTop"
    >
      <ArrowUp :size="16" :stroke-width="1.5" aria-hidden="true" />
      <span class="sr-only">Back to top</span>
    </button>
  </Transition>
</template>

<style scoped>
.back-top {
  position: fixed;
  right: clamp(14px, 2.2vw, 28px);
  bottom: clamp(14px, 2.2vw, 28px);
  z-index: 50;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--line-strong);
  transition: color 180ms var(--quick), border-color 180ms var(--quick), background 180ms var(--quick);
}

.back-top:hover {
  color: var(--clay);
  border-color: var(--clay);
  background: var(--paper-light);
}

.back-top-enter-active,
.back-top-leave-active {
  transition: opacity 200ms var(--quick), transform 300ms var(--ease);
}

.back-top-enter-from,
.back-top-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
