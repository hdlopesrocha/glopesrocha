<script setup>
import { computed } from 'vue'
import { ArrowLeft, ExternalLink, Info } from '@lucide/vue'
import { SOURCES, CREDITS } from '../data/sources.js'
import { PROFILE } from '../data/profile.js'
import { PROJECTS } from '../data/projects.js'

const primarySource = computed(() => SOURCES.find((source) => source.id === 'cv-2015'))
const externalSources = computed(() => SOURCES.filter((source) => source.id !== 'cv-2015'))

const attributionNotes = [
  {
    title: 'Voz do Mar',
    text:
      'The original installation is credited to Pancho Guedes, with João Magala and commissioner Pedro Ressano Garcia; Ressano Garcia Arquitectos carried out the later permanent rehabilitation. The CV lists the project in this portfolio. No authorship by Gonçalo Lopes Rocha is claimed.',
  },
  {
    title: 'Casa no Restelo',
    text:
      'The CV dates the House in Restelo 2014. The AMB Arquitectos project page dates Casa no Restelo 2008–2015 and lists Mafalda Batalha as architect. Both dates are preserved and the discrepancy is flagged.',
  },
  {
    title: 'Companhia das Culturas',
    text:
      'The CV records 2013. Public project records state 2007, with a subsequent phase in 2014. The CV date is retained as the portfolio date; the public chronology is also shown.',
  },
  {
    title: 'Studio credit',
    text:
      'AMB Arquitectos names a “Gonçalo Rocha” among collaborators on Casa na Comporta (2013–2015). That is reported as a public record; the project remains presented within its documented professional context, not as a sole-authored work.',
  },
  {
    title: 'Name disambiguation',
    text:
      'Public results concerning similarly named architects, academics and practices — including Gonçalo Blétière Lopes and SO Arquitetura & Design — were excluded. LinkedIn and other current-role information was not incorporated because it falls outside the supplied CV and the brief’s verification threshold.',
  },
  {
    title: 'Original portfolio URL',
    text:
      'The Wix portfolio recorded in the 2015 CV returned HTTP 404 on 24 October 2026. It is recorded as provenance and is not shown as a live destination.',
  },
]

const unresolved = [
  'Confirmation of whether the historical UK phone number should be published; it is intentionally omitted.',
  'Current ARB registration status. The number 083810A is reproduced only as a 2015 CV claim.',
  'Identification of the photographers for the low-resolution images supplied in the CV PDF.',
  'Higher-resolution original photography, plans, sections, models or construction photographs.',
  'Confirmation of the current email address and any verified professional profiles before publication.',
  'Any project-specific roles or credits that can be supported by original studio records.',
]

const sourceStatus = (source) => {
  if (source.id === 'original-portfolio') return false
  return Boolean(source.url)
}
</script>

<template>
  <main id="main-content" class="colophon" tabindex="-1">
    <div class="colophon__top shell">
      <RouterLink to="/" class="colophon__back">
        <ArrowLeft :size="15" :stroke-width="1.5" aria-hidden="true" />
        Return to portfolio
      </RouterLink>
      <p>Record / research &amp; credits</p>
      <p>Checked 24 October 2026</p>
    </div>

    <header class="colophon__head shell">
      <p class="eyebrow"><span class="eyebrow__line" aria-hidden="true"></span> Appendix</p>
      <h1>Sources,<br /><em>credits &amp; notes.</em></h1>
      <div class="colophon__head-bottom">
        <p>
          This portfolio is built from the two-page English CV and portfolio PDF supplied for the
          project. Public sources were used only to contextualise or cross-check that record.
        </p>
        <p>
          {{ PROJECTS.length }} project records · {{ SOURCES.length }} source entries ·
          {{ externalSources.length }} external source records.
        </p>
      </div>
    </header>

    <div class="colophon__main shell">
      <nav class="colophon__toc" aria-label="On this page">
        <p class="project-label">On this page</p>
        <a href="#method">Method</a>
        <a href="#attribution">Attribution &amp; discrepancies</a>
        <a href="#register">Source register</a>
        <a href="#image-credits">Image &amp; asset credits</a>
        <a href="#open-items">Open items</a>
      </nav>

      <div class="colophon__body">
        <section id="method" class="colophon-section" aria-labelledby="method-heading">
          <div class="colophon-section__heading">
            <p class="project-label">01</p>
            <h2 id="method-heading">Method</h2>
          </div>
          <div class="colophon-section__content">
            <p>
              The CV is treated as a primary historical document. Its project titles, dates,
              locations, employment history and qualifications are preserved. Where a public
              source adds information or conflicts with the CV, both are recorded rather than
              silently reconciled.
            </p>
            <p>
              Every project entry separates the CV caption, the editorial project note, a visual
              reading of the supplied image, and any public-record verification. A visual reading
              is explicitly interpretive. A public record is not treated as proof of authorship or
              individual contribution.
            </p>
            <div class="method-note">
              <Info :size="16" :stroke-width="1.4" aria-hidden="true" />
              <p>
                No project, award, client, budget, floor area, construction status or professional
                title has been invented. Projects without verified imagery or public sources remain
                visibly identified as CV records.
              </p>
            </div>
          </div>
        </section>

        <section id="attribution" class="colophon-section" aria-labelledby="attribution-heading">
          <div class="colophon-section__heading">
            <p class="project-label">02</p>
            <h2 id="attribution-heading">Attribution &amp; discrepancies</h2>
          </div>
          <div class="colophon-section__content">
            <dl class="attribution-list">
              <div v-for="note in attributionNotes" :key="note.title">
                <dt>{{ note.title }}</dt>
                <dd>{{ note.text }}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="register" class="colophon-section" aria-labelledby="register-heading">
          <div class="colophon-section__heading">
            <p class="project-label">03</p>
            <h2 id="register-heading">Source register</h2>
          </div>
          <div class="colophon-section__content">
            <article v-if="primarySource" class="source-record source-record--primary">
              <p class="source-record__type">{{ primarySource.type }}</p>
              <h3>{{ primarySource.title }}</h3>
              <p class="source-record__publisher">{{ primarySource.publisher }} · {{ primarySource.year }}</p>
              <p class="source-record__note">{{ primarySource.note }}</p>
              <ul>
                <li v-for="claim in primarySource.claims" :key="claim">{{ claim }}</li>
              </ul>
            </article>

            <article
              v-for="source in externalSources"
              :key="source.id"
              class="source-record"
              :class="{ 'source-record--dead': source.id === 'original-portfolio' }"
            >
              <div class="source-record__top">
                <p class="source-record__type">{{ source.type }}</p>
                <p class="source-record__accessed">Checked {{ source.accessed }}</p>
              </div>
              <h3>{{ source.title }}</h3>
              <p class="source-record__publisher">{{ source.publisher }}</p>

              <a
                v-if="sourceStatus(source)"
                class="source-record__link"
                :href="source.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ source.url }}
                <ExternalLink :size="12" :stroke-width="1.4" aria-hidden="true" />
                <span class="sr-only">(opens in a new tab)</span>
              </a>
              <code v-else>{{ source.url }}</code>

              <p class="source-record__note">{{ source.note }}</p>
              <ul class="source-record__claims">
                <li v-for="claim in source.claims" :key="claim">{{ claim }}</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="image-credits" class="colophon-section" aria-labelledby="image-credits-heading">
          <div class="colophon-section__heading">
            <p class="project-label">04</p>
            <h2 id="image-credits-heading">Image &amp; asset credits</h2>
          </div>
          <div class="colophon-section__content">
            <dl class="credits-list">
              <div>
                <dt>Project imagery</dt>
                <dd>{{ CREDITS.images }}</dd>
              </div>
              <div>
                <dt>Drawing</dt>
                <dd>{{ CREDITS.drawing }}</dd>
              </div>
              <div>
                <dt>Map geometry</dt>
                <dd>{{ CREDITS.map }}</dd>
              </div>
              <div>
                <dt>Typography</dt>
                <dd>{{ CREDITS.type }}</dd>
              </div>
              <div>
                <dt>Build</dt>
                <dd>{{ CREDITS.code }}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="open-items" class="colophon-section" aria-labelledby="open-items-heading">
          <div class="colophon-section__heading">
            <p class="project-label">05</p>
            <h2 id="open-items-heading">Open for confirmation</h2>
          </div>
          <div class="colophon-section__content">
            <p>
              The site avoids presenting uncertain information as current fact. The following items
              should be confirmed before this portfolio is used as an authoritative public record.
            </p>
            <ol class="open-list">
              <li v-for="(item, index) in unresolved" :key="item">
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <p>{{ item }}</p>
              </li>
            </ol>
            <p class="colophon__contact">
              Contact for corrections: <a :href="`mailto:${PROFILE.email}`">{{ PROFILE.email }}</a>
            </p>
          </div>
        </section>

        <footer class="colophon__foot">
          <RouterLink to="/" class="button-line">
            <span>Return to the portfolio</span>
            <span aria-hidden="true">→</span>
          </RouterLink>
          <p>© {{ new Date().getFullYear() }} {{ PROFILE.name }}.</p>
        </footer>
      </div>
    </div>
  </main>
</template>

<style scoped>
.colophon {
  padding-top: var(--nav-h);
  background: var(--paper);
}

.colophon__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 3.9rem;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.colophon__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 40px;
  color: var(--ink-soft);
  text-decoration: none;
}

.colophon__back:hover {
  color: var(--clay);
}

.colophon__head {
  padding-top: clamp(3rem, 7vw, 7rem);
  padding-bottom: clamp(3rem, 6vw, 6rem);
}

.colophon__head h1 {
  max-width: 12ch;
  margin-top: 1.6rem;
  font-family: var(--serif);
  font-size: clamp(3rem, 7vw, 8rem);
  font-weight: 300;
  letter-spacing: -0.055em;
  line-height: 0.86;
}

.colophon__head h1 em {
  color: var(--clay);
  font-weight: 300;
}

.colophon__head-bottom {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 0.7fr);
  gap: 2.5rem;
  margin-top: 2.5rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.72rem;
  line-height: 1.65;
}

.colophon__head-bottom p:first-child {
  max-width: 42rem;
  color: var(--ink-soft);
  font-size: 0.95rem;
}

.colophon__head-bottom p:last-child {
  justify-self: end;
  max-width: 18rem;
  font-size: 0.6rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.colophon__main {
  display: grid;
  grid-template-columns: minmax(180px, 2.4fr) minmax(0, 8fr);
  gap: clamp(2.5rem, 7vw, 8rem);
  padding-bottom: clamp(4rem, 8vw, 8rem);
}

.colophon__toc {
  position: sticky;
  top: calc(var(--nav-h) + 2rem);
  align-self: start;
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--line-strong);
}

.colophon__toc .project-label {
  padding-top: 0.75rem;
}

.colophon__toc a {
  padding-block: 0.65rem;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.62rem;
  line-height: 1.4;
  text-decoration: none;
  transition: color 180ms var(--quick);
}

.colophon__toc a:hover {
  color: var(--clay);
}

.project-label {
  color: var(--muted);
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 1.5;
  text-transform: uppercase;
}

.colophon__body {
  min-width: 0;
}

.colophon-section {
  display: grid;
  grid-template-columns: minmax(120px, 2fr) minmax(0, 8fr);
  gap: clamp(1.5rem, 4vw, 4rem);
  padding-block: clamp(2.5rem, 5vw, 5rem);
  border-top: 1px solid var(--line-strong);
  scroll-margin-top: calc(var(--nav-h) + 1.5rem);
}

.colophon-section__heading h2 {
  max-width: 11ch;
  margin-top: 0.8rem;
  font-family: var(--serif);
  font-size: clamp(1.8rem, 2.5vw, 2.6rem);
  font-weight: 300;
  letter-spacing: -0.035em;
  line-height: 0.98;
}

.colophon-section__content {
  min-width: 0;
  max-width: 52rem;
}

.colophon-section__content > p {
  color: var(--ink-soft);
  font-size: 0.91rem;
  line-height: 1.7;
}

.colophon-section__content > p + p {
  margin-top: 1rem;
}

.method-note {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  margin-top: 1.8rem;
  padding: 1rem;
  border-left: 2px solid var(--clay);
  background: rgba(149, 84, 60, 0.055);
}

.method-note svg {
  flex: 0 0 auto;
  margin-top: 0.1rem;
  color: var(--clay);
}

.method-note p {
  color: var(--clay-deep);
  font-size: 0.73rem;
  line-height: 1.6;
}

.attribution-list {
  border-top: 1px solid var(--line);
}

.attribution-list > div {
  padding-block: 1.05rem;
  border-bottom: 1px solid var(--line);
}

.attribution-list dt {
  font-family: var(--serif);
  font-size: 1.35rem;
  font-weight: 300;
  letter-spacing: -0.015em;
  line-height: 1.1;
}

.attribution-list dd {
  max-width: 44rem;
  margin-top: 0.35rem;
  color: var(--muted);
  font-size: 0.75rem;
  line-height: 1.65;
}

.source-record {
  padding-block: 1.5rem;
  border-bottom: 1px solid var(--line);
}

.source-record:first-child {
  padding-top: 0;
}

.source-record--primary {
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--line);
  background: var(--paper-light);
}

.source-record--dead {
  border-left: 2px solid var(--line-strong);
  padding-left: 1rem;
}

.source-record__top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
}

.source-record__type {
  color: var(--clay);
  font-size: 0.52rem;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.source-record__accessed {
  color: var(--muted);
  font-size: 0.51rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.source-record h3 {
  max-width: 30ch;
  margin-top: 0.55rem;
  font-family: var(--serif);
  font-size: clamp(1.3rem, 2vw, 1.8rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.source-record__publisher {
  margin-top: 0.2rem;
  color: var(--muted);
  font-size: 0.66rem;
  line-height: 1.5;
}

.source-record__link {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.35rem;
  margin-top: 0.55rem;
  color: var(--clay-deep);
  font-size: 0.62rem;
  line-height: 1.5;
  text-decoration: none;
  overflow-wrap: anywhere;
}

.source-record__link:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.source-record code {
  display: block;
  margin-top: 0.55rem;
  color: var(--muted);
  font-size: 0.62rem;
  overflow-wrap: anywhere;
}

.source-record__note {
  max-width: 44rem;
  margin-top: 0.55rem;
  color: var(--ink-soft);
  font-size: 0.72rem;
  line-height: 1.6;
}

.source-record__claims {
  margin-top: 0.7rem;
  border-top: 1px solid var(--line);
}

.source-record__claims li {
  display: flex;
  gap: 0.5rem;
  padding-top: 0.45rem;
  color: var(--muted);
  font-size: 0.68rem;
  line-height: 1.55;
}

.source-record__claims li::before {
  content: '↳';
  color: var(--line-strong);
}

.credits-list {
  border-top: 1px solid var(--line);
}

.credits-list > div {
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1.5rem;
  padding-block: 1rem;
  border-bottom: 1px solid var(--line);
}

.credits-list dt {
  color: var(--muted);
  font-size: 0.53rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.5;
  text-transform: uppercase;
}

.credits-list dd {
  color: var(--ink-soft);
  font-size: 0.76rem;
  line-height: 1.65;
}

.open-list {
  margin-top: 1.4rem;
  border-top: 1px solid var(--line);
}

.open-list li {
  display: grid;
  grid-template-columns: 2.4rem minmax(0, 1fr);
  gap: 0.8rem;
  padding-block: 0.8rem;
  border-bottom: 1px solid var(--line);
}

.open-list li span {
  color: var(--clay);
  font-size: 0.54rem;
  font-variant-numeric: tabular-nums;
}

.open-list p {
  color: var(--ink-soft);
  font-size: 0.76rem;
  line-height: 1.6;
}

.colophon__contact {
  margin-top: 1.5rem;
  color: var(--muted);
  font-size: 0.72rem;
}

.colophon__contact a {
  color: var(--ink);
}

.colophon__foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line-strong);
}

.colophon__foot .button-line {
  width: 22rem;
  color: var(--ink);
}

.colophon__foot p {
  color: var(--muted);
  font-size: 0.55rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .colophon__main {
    grid-template-columns: 1fr;
  }

  .colophon__toc {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0;
  }

  .colophon__toc .project-label {
    grid-column: 1 / -1;
  }

  .colophon__toc a {
    padding-right: 0.5rem;
  }

  .colophon-section {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .colophon-section__heading h2 {
    max-width: none;
  }
}

@media (max-width: 680px) {
  .colophon__top > p:nth-child(2) {
    display: none;
  }

  .colophon__head-bottom {
    grid-template-columns: 1fr;
  }

  .colophon__head-bottom p:last-child {
    justify-self: start;
  }

  .colophon__toc {
    grid-template-columns: 1fr;
  }

  .credits-list > div {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }

  .colophon__foot {
    flex-direction: column;
    align-items: flex-start;
  }

  .colophon__foot .button-line {
    width: 100%;
  }
}
</style>
