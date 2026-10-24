<script setup>
defineProps({
  index: { type: String, required: true },
  label: { type: String, required: true },
})
</script>

<template>
  <header class="section-heading">
    <div class="section-heading__top">
      <p class="eyebrow section-heading__label">
        <span class="section-heading__index">{{ index }}</span>
        <span>{{ label }}</span>
      </p>
      <span class="section-heading__rule" aria-hidden="true"></span>
    </div>

    <div class="section-heading__body">
      <h2 class="section-heading__title display" data-section-focus tabindex="-1">
        <slot name="title" />
      </h2>
      <div v-if="$slots.aside" class="section-heading__aside">
        <slot name="aside" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.section-heading {
  margin-bottom: clamp(2.6rem, 5.5vw, 5.2rem);
}

.section-heading__top {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  margin-bottom: clamp(1.5rem, 3vw, 2.8rem);
}

.section-heading__label {
  flex: 0 0 auto;
  color: var(--muted);
}

.section-heading__index {
  color: var(--clay);
}

.section-heading__rule {
  flex: 1;
  height: 1px;
  background: var(--line);
}

.section-heading__body {
  display: grid;
  grid-template-columns: minmax(0, 8.2fr) minmax(200px, 3.2fr);
  gap: clamp(1.5rem, 5vw, 6rem);
  align-items: end;
}

.section-heading__title {
  max-width: 13ch;
  text-wrap: balance;
}

.section-heading__title:focus,
.section-heading__title:focus-visible {
  outline: none;
}

.section-heading__title :deep(em) {
  color: var(--clay);
  font-weight: 300;
}

.section-heading__aside {
  max-width: 31rem;
  justify-self: end;
  padding-bottom: 0.5rem;
  color: var(--ink-soft);
  font-size: 0.96rem;
  line-height: 1.62;
}

@media (max-width: 900px) {
  .section-heading__body {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 1.6rem;
  }

  .section-heading__title {
    max-width: 12ch;
    font-size: clamp(2.8rem, 9vw, 4.4rem);
  }

  .section-heading__aside {
    justify-self: start;
    padding-bottom: 0;
  }
}
</style>
