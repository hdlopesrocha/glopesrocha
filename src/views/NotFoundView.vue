<template>
  <main id="main-content" class="not-found shell" tabindex="-1">
    <p class="eyebrow"><span class="eyebrow__line" aria-hidden="true"></span> Error 404</p>
    <h1>This page is not part of the record.</h1>
    <p>
      The address may have changed, or the link may belong to a project outside the supplied
      portfolio.
    </p>
    <div class="not-found__links">
      <RouterLink to="/" class="button-line">
        <span>Return to the portfolio</span>
        <span aria-hidden="true">→</span>
      </RouterLink>
      <RouterLink to="/#selected-work" class="text-link">Browse selected work</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  min-height: 72vh;
  padding-top: calc(var(--nav-h) + clamp(5rem, 13vh, 10rem));
  padding-bottom: 5rem;
}

.not-found h1 {
  max-width: 12ch;
  margin-top: 1.5rem;
  font-family: var(--serif);
  font-size: clamp(3rem, 7vw, 7rem);
  font-weight: 300;
  letter-spacing: -0.05em;
  line-height: 0.9;
}

.not-found > p:not(.eyebrow) {
  max-width: 34rem;
  margin-top: 1.4rem;
  color: var(--muted);
  font-size: 0.96rem;
  line-height: 1.65;
}

.not-found__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 2rem;
  margin-top: 2.5rem;
}

.not-found__links .button-line {
  width: min(100%, 24rem);
}

.not-found__links .text-link {
  color: var(--muted);
  font-size: 0.61rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
