<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { ArrowUpRight, Check, Copy, Mail } from '@lucide/vue'
import SectionHeading from './SectionHeading.vue'
import { PROFILE } from '../data/profile.js'

const copyState = ref('idle')
let resetTimer = null

const fallbackCopy = () => {
  const area = document.createElement('textarea')
  area.value = PROFILE.email
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  const copied = document.execCommand('copy')
  document.body.removeChild(area)
  if (!copied) throw new Error('Copy command was rejected')
}

const copyEmail = async () => {
  window.clearTimeout(resetTimer)
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(PROFILE.email)
    } else {
      fallbackCopy()
    }
    copyState.value = 'copied'
  } catch {
    copyState.value = 'error'
  }
  resetTimer = window.setTimeout(() => {
    copyState.value = 'idle'
  }, 5000)
}

onBeforeUnmount(() => window.clearTimeout(resetTimer))
</script>

<template>
  <section id="contact" class="contact section section--ruled" aria-labelledby="contact-heading">
    <div class="shell">
      <SectionHeading index="06" label="Contact">
        <template #title>
          <span id="contact-heading">For professional<br /><em>enquiries.</em></span>
        </template>
        <template #aside>
          <p>
            The contact details below are those recorded in the 2015 CV. No current studio, job
            title or additional social account is asserted.
          </p>
        </template>
      </SectionHeading>

      <div class="contact__grid">
        <div class="contact__primary">
          <p class="eyebrow eyebrow--muted">Email / as listed in the 2015 CV</p>
          <a class="contact__email" :href="`mailto:${PROFILE.email}`">
            {{ PROFILE.email }}
            <span class="contact__email-icon" aria-hidden="true">
              <ArrowUpRight :size="26" :stroke-width="1.2" />
            </span>
          </a>

          <div class="contact__actions">
            <a class="contact__action" :href="`mailto:${PROFILE.email}`">
              <Mail :size="16" :stroke-width="1.45" aria-hidden="true" />
              <span>Write an email</span>
            </a>
            <button
              type="button"
              class="contact__action contact__copy"
              :class="`is-${copyState}`"
              @click="copyEmail"
            >
              <Check v-if="copyState === 'copied'" :size="16" :stroke-width="1.5" aria-hidden="true" />
              <Copy v-else :size="16" :stroke-width="1.45" aria-hidden="true" />
              <span>{{ copyState === 'copied' ? 'Copied' : copyState === 'error' ? 'Try again' : 'Copy address' }}</span>
            </button>
          </div>

          <p class="contact__feedback" :class="`is-${copyState}`" role="status" aria-live="polite">
            <template v-if="copyState === 'copied'">Email address copied to the clipboard.</template>
            <template v-else-if="copyState === 'error'">
              Copying was blocked by the browser. Select the address above to copy it manually.
            </template>
            <template v-else>Click the address to open a mail application, or copy it for later.</template>
          </p>
        </div>

        <aside class="contact__aside">
          <dl>
            <div>
              <dt>Documented base</dt>
              <dd>Lisbon, Portugal<br />London, United Kingdom</dd>
            </div>
            <div>
              <dt>Portfolio period</dt>
              <dd>2012 — 2015<br />Selected project record</dd>
            </div>
            <div>
              <dt>Original web portfolio</dt>
              <dd>
                The Wix portfolio URL recorded in the 2015 CV no longer resolves. It is preserved
                in the research record rather than offered as a dead link.
              </dd>
            </div>
          </dl>

          <div class="contact__provenance">
            <p>
              No LinkedIn, Instagram or other profile is listed because none was supplied or
              verified for this portfolio.
            </p>
            <RouterLink class="text-link" to="/colophon">
              Sources, credits &amp; research notes
              <ArrowUpRight :size="14" :stroke-width="1.4" aria-hidden="true" />
            </RouterLink>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--paper);
}

.contact__grid {
  display: grid;
  grid-template-columns: minmax(0, 7.7fr) minmax(280px, 3.6fr);
  gap: clamp(2.5rem, 7vw, 8rem);
  padding-top: clamp(1rem, 2vw, 2rem);
}

.contact__primary {
  min-width: 0;
  padding-top: 0.3rem;
}

.contact__email {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.2rem;
  margin-top: 1.35rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid var(--line-strong);
  color: var(--ink);
  font-family: var(--serif);
  font-size: clamp(1.9rem, 4.8vw, 5.3rem);
  font-weight: 300;
  letter-spacing: -0.055em;
  line-height: 0.96;
  text-decoration: none;
  overflow-wrap: normal;
  transition: color 220ms var(--quick), border-color 220ms var(--quick);
}

.contact__email:hover,
.contact__email:focus-visible {
  color: var(--clay);
  border-color: var(--clay);
}

.contact__email-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 3rem;
  height: 3rem;
  margin-top: 0.3rem;
  border: 1px solid var(--line-strong);
  transition: color 220ms var(--quick), border-color 220ms var(--quick), transform 220ms var(--ease);
}

.contact__email:hover .contact__email-icon {
  color: var(--clay);
  border-color: var(--clay);
  transform: translate(2px, -2px);
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.4rem;
}

.contact__action {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  min-height: 44px;
  padding: 0.65rem 0.9rem;
  color: var(--ink-soft);
  font-size: 0.61rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  border: 1px solid var(--line);
  transition: color 180ms var(--quick), border-color 180ms var(--quick), background 180ms var(--quick);
}

.contact__action:hover {
  color: var(--ink);
  border-color: var(--ink-soft);
  background: var(--paper-light);
}

.contact__copy.is-copied {
  color: #4d5d45;
  border-color: #4d5d45;
}

.contact__copy.is-error {
  color: var(--clay-deep);
  border-color: var(--clay);
}

.contact__feedback {
  min-height: 1.5rem;
  margin-top: 0.8rem;
  color: var(--muted);
  font-size: 0.65rem;
  line-height: 1.5;
}

.contact__feedback.is-copied {
  color: #4d5d45;
}

.contact__feedback.is-error {
  color: var(--clay-deep);
}

.contact__aside {
  padding-top: 0.3rem;
}

.contact__aside dl {
  border-top: 1px solid var(--line-strong);
}

.contact__aside dl > div {
  padding-block: 1rem;
  border-bottom: 1px solid var(--line);
}

.contact__aside dt {
  margin-bottom: 0.35rem;
  color: var(--muted);
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.contact__aside dd {
  max-width: 24rem;
  font-size: 0.78rem;
  line-height: 1.6;
}

.contact__provenance {
  margin-top: 1.8rem;
  color: var(--muted);
  font-size: 0.64rem;
  line-height: 1.6;
}

.contact__provenance .text-link {
  margin-top: 1rem;
  color: var(--ink-soft);
  font-size: 0.57rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 960px) {
  .contact__grid {
    grid-template-columns: 1fr;
  }

  .contact__aside {
    max-width: 44rem;
  }
}

@media (max-width: 620px) {
  .contact__email {
    font-size: clamp(1.55rem, 7.4vw, 2.75rem);
    line-height: 1.05;
  }

  .contact__email-icon {
    width: 2.4rem;
    height: 2.4rem;
    margin-top: 0.15rem;
  }

  .contact__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .contact__action {
    justify-content: space-between;
  }
}
</style>
