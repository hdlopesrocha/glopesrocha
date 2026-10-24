import { nextTick, onBeforeUnmount, watch } from 'vue'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const getFocusable = (container) =>
  Array.from(container?.querySelectorAll(FOCUSABLE_SELECTOR) ?? []).filter(
    (element) =>
      !element.hasAttribute('hidden') &&
      element.getAttribute('aria-hidden') !== 'true' &&
      element.getClientRects().length > 0,
  )

/**
 * Keeps focus inside an open overlay, closes on Escape and locks document
 * scrolling while active. The previously focused element is restored on close.
 */
export function useFocusTrap({ container, active, onClose }) {
  let previouslyFocused = null
  let previousHtmlOverflow = ''
  let previousBodyOverflow = ''

  const restoreScroll = () => {
    document.documentElement.style.overflow = previousHtmlOverflow
    document.body.style.overflow = previousBodyOverflow
  }

  const handleKeydown = (event) => {
    if (!active.value) return

    if (event.key === 'Escape') {
      event.preventDefault()
      onClose?.()
      return
    }

    if (event.key !== 'Tab') return

    const focusable = getFocusable(container.value)
    if (!focusable.length) {
      event.preventDefault()
      container.value?.focus()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const current = document.activeElement

    if (event.shiftKey && (current === first || !container.value?.contains(current))) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && (current === last || !container.value?.contains(current))) {
      event.preventDefault()
      first.focus()
    }
  }

  const activate = async () => {
    previouslyFocused = document.activeElement
    previousHtmlOverflow = document.documentElement.style.overflow
    previousBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeydown, true)
    await nextTick()

    const initial =
      container.value?.querySelector('[data-autofocus]') ?? getFocusable(container.value)[0]
    initial?.focus({ preventScroll: true })
  }

  const deactivate = () => {
    document.removeEventListener('keydown', handleKeydown, true)
    restoreScroll()
    if (previouslyFocused instanceof HTMLElement && previousFocusIsStillInDocument(previouslyFocused)) {
      previouslyFocused.focus({ preventScroll: true })
    }
    previouslyFocused = null
  }

  watch(
    active,
    (isActive) => {
      if (isActive) activate()
      else deactivate()
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    if (active.value) deactivate()
  })
}

function previousFocusIsStillInDocument(element) {
  return typeof document !== 'undefined' && document.contains(element)
}
