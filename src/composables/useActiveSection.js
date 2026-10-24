import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

/**
 * Tracks the section currently occupying the reading area below the fixed
 * header. A lightweight scroll calculation is used here so the indicator
 * remains stable while project filters change the page height.
 */
export function useActiveSection(ids) {
  const route = useRoute()
  const activeSection = ref('')
  let frame = 0

  const update = () => {
    if (route.path !== '/') {
      activeSection.value = ''
      return
    }

    const marker = window.scrollY + window.innerHeight * 0.34
    let nextActive = ''

    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return
      const top = element.getBoundingClientRect().top + window.scrollY
      if (marker >= top) nextActive = id
    })

    activeSection.value = nextActive
  }

  const scheduleUpdate = () => {
    if (frame) return
    frame = window.requestAnimationFrame(() => {
      update()
      frame = 0
    })
  }

  const refresh = () => {
    scheduleUpdate()
    nextTick(scheduleUpdate)
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })
    window.addEventListener('hashchange', scheduleUpdate)
  })

  watch(() => route.path, refresh)

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', scheduleUpdate)
    window.removeEventListener('resize', scheduleUpdate)
    window.removeEventListener('hashchange', scheduleUpdate)
    if (frame) window.cancelAnimationFrame(frame)
  })

  return activeSection
}
