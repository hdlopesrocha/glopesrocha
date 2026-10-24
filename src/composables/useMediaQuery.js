import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useMediaQuery(query) {
  const matches = ref(
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )
  let mediaQuery = null

  const update = () => {
    matches.value = mediaQuery?.matches ?? false
  }

  onMounted(() => {
    mediaQuery = window.matchMedia(query)
    update()
    mediaQuery.addEventListener('change', update)
  })

  onBeforeUnmount(() => {
    mediaQuery?.removeEventListener('change', update)
  })

  return matches
}
