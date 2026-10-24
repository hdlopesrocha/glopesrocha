const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default {
  mounted(el, binding) {
    el.classList.add('reveal')

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('is-revealed')
      return
    }

    if (typeof binding.value === 'number') {
      el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          el.classList.add('is-revealed')
          observer.disconnect()
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
    )

    observer.observe(el)
    el._revealObserver = observer
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
    delete el._revealObserver
  },
}
