<script setup>
import { ExternalLink, Info } from '@lucide/vue'
import SectionHeading from './SectionHeading.vue'
import { CAPABILITY_GROUPS, QUALIFICATION_NOTES, ARB_URL } from '../data/profile.js'
import { CREDENTIALS } from '../data/experience.js'
</script>

<template>
  <section
    id="capabilities"
    class="capabilities section section--ruled"
    aria-labelledby="capabilities-heading"
  >
    <div class="shell">
      <SectionHeading index="05" label="Capabilities">
        <template #title>
          <span id="capabilities-heading">A working<br /><em>toolkit.</em></span>
        </template>
        <template #aside>
          <p>
            Software, technical methods and qualifications are reproduced from the 2015 CV. They
            describe a historical record, not a current certification status.
          </p>
        </template>
      </SectionHeading>

      <div class="capabilities__grid">
        <article
          v-for="group in CAPABILITY_GROUPS"
          :key="group.id"
          class="capability-group"
        >
          <header class="capability-group__head">
            <p class="eyebrow"><span class="capability-group__index">{{ group.index }}</span> {{ group.label }}</p>
            <p>{{ group.intro }}</p>
          </header>

          <ol class="capability-list">
            <li v-for="(item, index) in group.items" :key="item" class="capability-list__row">
              <span class="capability-list__number">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="capability-list__name">{{ item }}</span>
            </li>
          </ol>
        </article>
      </div>

      <div class="record-book">
        <div class="record-book__intro">
          <p class="eyebrow"><span class="record-book__index">03</span> Qualifications &amp; memberships</p>
          <h3>The formal record</h3>
          <p>
            {{ QUALIFICATION_NOTES.general }}
          </p>
          <p class="record-book__micro">
            Certificate numbers are left out on purpose. No award, title or current registration
            has been added.
          </p>
        </div>

        <div class="record-book__list">
          <div class="record-book__head" aria-hidden="true">
            <span>Year</span>
            <span>Qualification / membership</span>
          </div>

          <ul>
            <li
              v-for="credential in CREDENTIALS"
              :key="credential.id"
              class="credential"
              :class="{ 'credential--caution': credential.caute }"
            >
              <span class="credential__year">{{ credential.year }}</span>
              <div class="credential__body">
                <p class="credential__label">{{ credential.label }}</p>
                <p class="credential__detail">{{ credential.detail }}</p>
                <p v-if="credential.note" class="credential__note">
                  <Info :size="13" :stroke-width="1.5" aria-hidden="true" />
                  {{ credential.note }}
                </p>
                <a
                  v-if="credential.id === 'arb'"
                  class="credential__link"
                  :href="ARB_URL"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check the current ARB register
                  <ExternalLink :size="12" :stroke-width="1.4" aria-hidden="true" />
                  <span class="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </li>
          </ul>

          <p class="record-book__foot">
            {{ QUALIFICATION_NOTES.arb }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.capabilities {
  background: var(--paper-deep);
  --line: rgba(24, 23, 19, 0.15);
  --line-strong: rgba(24, 23, 19, 0.3);
}

.capabilities__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(2.5rem, 7vw, 8rem);
  padding-bottom: clamp(4rem, 8vw, 8rem);
  border-bottom: 1px solid var(--line-strong);
}

.capability-group__head {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;
  align-items: end;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}

.capability-group__index {
  margin-right: 0.55rem;
  color: var(--clay);
}

.capability-group__head p:last-child {
  max-width: 17rem;
  color: var(--muted);
  font-size: 0.6rem;
  letter-spacing: 0.02em;
  line-height: 1.55;
  text-align: right;
}

.capability-list__row {
  display: flex;
  align-items: baseline;
  gap: 1.1rem;
  padding-block: clamp(0.7rem, 1.4vw, 1.1rem);
  border-bottom: 1px solid var(--line);
  transition: color 200ms var(--quick), padding 300ms var(--ease);
}

.capability-list__row:hover {
  padding-left: 0.5rem;
  color: var(--clay);
}

.capability-list__number {
  flex: 0 0 1.4rem;
  color: var(--muted);
  font-size: 0.52rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
}

.capability-list__name {
  font-family: var(--serif);
  font-size: clamp(1.35rem, 2.2vw, 2rem);
  font-weight: 300;
  letter-spacing: -0.025em;
  line-height: 1.15;
  transition: color 200ms var(--quick);
}

.record-book {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: clamp(2.5rem, 7vw, 8rem);
  padding-top: clamp(4rem, 8vw, 8rem);
}

.record-book__intro {
  align-self: start;
}

.record-book__index {
  margin-right: 0.55rem;
  color: var(--clay);
}

.record-book__intro h3 {
  max-width: 11ch;
  margin-top: 1.5rem;
  font-family: var(--serif);
  font-size: clamp(2.1rem, 3.8vw, 3.6rem);
  font-weight: 300;
  letter-spacing: -0.035em;
  line-height: 0.96;
}

.record-book__intro > p:not(.eyebrow):not(.record-book__micro) {
  max-width: 25rem;
  margin-top: 1.1rem;
  color: var(--muted);
  font-size: 0.72rem;
  line-height: 1.65;
}

.record-book__micro {
  max-width: 23rem;
  margin-top: 1.2rem;
  padding-top: 0.8rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.59rem;
  letter-spacing: 0.02em;
  line-height: 1.55;
}

.record-book__head {
  display: grid;
  grid-template-columns: 6rem 1fr;
  gap: 1.2rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid var(--line-strong);
  color: var(--muted);
  font-size: 0.54rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.record-book__list ul {
  border-bottom: 1px solid var(--line-strong);
}

.credential {
  display: grid;
  grid-template-columns: 6rem 1fr;
  gap: 1.2rem;
  align-items: start;
  padding-block: 1.1rem;
  border-bottom: 1px solid var(--line);
}

.credential:last-child {
  border-bottom: 0;
}

.credential--caution {
  margin-inline: -0.85rem;
  padding-inline: 0.85rem;
  background: rgba(149, 84, 60, 0.07);
  border-left: 2px solid var(--clay);
}

.credential__year {
  padding-top: 0.1rem;
  color: var(--ink);
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

.credential__label {
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.45;
}

.credential__detail {
  margin-top: 0.2rem;
  color: var(--muted);
  font-size: 0.7rem;
  line-height: 1.55;
}

.credential__note {
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
  max-width: 31rem;
  margin-top: 0.5rem;
  color: var(--clay-deep);
  font-size: 0.62rem;
  line-height: 1.55;
}

.credential__note svg {
  flex: 0 0 auto;
  margin-top: 0.1rem;
}

.credential__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.45rem;
  color: var(--clay-deep);
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-decoration: underline;
  text-underline-offset: 0.18em;
  text-transform: uppercase;
}

.record-book__foot {
  margin-top: 1.2rem;
  color: var(--muted);
  font-size: 0.58rem;
  letter-spacing: 0.02em;
  line-height: 1.6;
}

@media (max-width: 1000px) {
  .capabilities__grid {
    gap: 3rem;
  }

  .capability-group__head {
    display: block;
  }

  .capability-group__head p:last-child {
    margin-top: 0.5rem;
    max-width: none;
    text-align: left;
  }

  .record-book {
    grid-template-columns: 1fr;
  }

  .record-book__intro > p:not(.eyebrow):not(.record-book__micro),
  .record-book__micro {
    max-width: 38rem;
  }
}

@media (max-width: 720px) {
  .capabilities__grid {
    grid-template-columns: 1fr;
    padding-bottom: 3.5rem;
  }

  .capability-list__name {
    font-size: clamp(1.35rem, 6vw, 1.7rem);
  }

  .record-book {
    padding-top: 3.5rem;
  }

  .record-book__head {
    grid-template-columns: 4rem 1fr;
  }

  .credential {
    grid-template-columns: 4rem 1fr;
    gap: 0.8rem;
  }

  .credential--caution {
    margin-inline: -0.6rem;
    padding-inline: 0.6rem;
  }

  .credential__year {
    font-size: 1.05rem;
  }

  .credential__label {
    font-size: 0.8rem;
  }
}
</style>
