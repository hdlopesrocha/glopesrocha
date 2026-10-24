<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import BackToTop from './components/BackToTop.vue'
</script>

<template>
  <nav class="skip-navigation" aria-label="Skip navigation">
    <a class="skip-link" href="#main-content">Skip to content</a>
  </nav>
  <SiteHeader />
  <RouterView />
  <SiteFooter />
  <BackToTop />
</template>
