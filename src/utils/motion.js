export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function scrollToElement(target, options = {}) {
  const element =
    typeof target === 'string' ? document.getElementById(target) : target

  if (!(element instanceof HTMLElement)) return

  const behavior =
    options.behavior ?? (prefersReducedMotion() ? 'auto' : 'smooth')

  element.scrollIntoView({
    behavior,
    block: options.block ?? 'start',
  })

  if (options.focus) {
    const focusTarget =
      element.querySelector('[data-section-focus]') ?? element
    if (!focusTarget.hasAttribute('tabindex')) focusTarget.setAttribute('tabindex', '-1')
    window.setTimeout(
      () => focusTarget.focus({ preventScroll: true }),
      behavior === 'auto' || prefersReducedMotion() ? 0 : 450,
    )
  }
}
