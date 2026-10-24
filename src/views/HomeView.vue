<script setup>
import { computed, nextTick, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  CATEGORIES,
  PROJECTS,
  REGIONS,
  SORT_OPTIONS,
  filterAndSortProjects,
  getCategoryCounts,
} from '../data/projects.js'
import { scrollToElement } from '../utils/motion.js'
import HeroSection from '../components/HeroSection.vue'
import ProjectGallery from '../components/ProjectGallery.vue'
import AtlasSection from '../components/AtlasSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ExperienceTimeline from '../components/ExperienceTimeline.vue'
import CapabilitiesSection from '../components/CapabilitiesSection.vue'
import ContactSection from '../components/ContactSection.vue'

const route = useRoute()
const router = useRouter()

const validCategory = (value) =>
  CATEGORIES.some((category) => category.id === value) ? value : 'all'
const validRegion = (value) => (REGIONS.some((region) => region.id === value) ? value : 'all')
const validSort = (value) =>
  SORT_OPTIONS.some((option) => option.id === value) ? value : 'curated'
const validView = (value) => (value === 'index' ? 'index' : 'grid')

const category = ref(validCategory(String(route.query.category ?? 'all')))
const region = ref(validRegion(String(route.query.region ?? 'all')))
const sort = ref(validSort(String(route.query.sort ?? 'curated')))
const view = ref(validView(String(route.query.view ?? 'grid')))

const visibleProjects = computed(() =>
  filterAndSortProjects(PROJECTS, {
    category: category.value,
    region: region.value,
    sort: sort.value,
  }),
)

const categoryCounts = computed(() => {
  const scoped =
    region.value === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.regionId === region.value)
  return getCategoryCounts(scoped)
})

const syncQuery = () => {
  const query = { ...route.query }
  delete query.category
  delete query.region
  delete query.sort
  delete query.view

  if (category.value !== 'all') query.category = category.value
  if (region.value !== 'all') query.region = region.value
  if (sort.value !== 'curated') query.sort = sort.value
  if (view.value !== 'grid') query.view = view.value

  router.replace({ path: '/', query }).catch(() => {})
}

const setCategory = (value) => {
  category.value = validCategory(value)
  syncQuery()
}

const setSort = (value) => {
  sort.value = validSort(value)
  syncQuery()
}

const setView = (value) => {
  view.value = validView(value)
  syncQuery()
}

const clearFilters = () => {
  category.value = 'all'
  region.value = 'all'
  syncQuery()
}

const clearRegion = () => {
  region.value = 'all'
  syncQuery()
}

const selectRegion = async (value) => {
  region.value = validRegion(value)
  if (region.value !== 'all') category.value = 'all'
  syncQuery()
  await nextTick()
  scrollToElement('selected-work', { behavior: 'auto', focus: true })
}
</script>

<template>
  <main id="main-content" tabindex="-1">
    <HeroSection :project-count="PROJECTS.length" />

    <ProjectGallery
      :projects="visibleProjects"
      :total-count="PROJECTS.length"
      :category="category"
      :sort="sort"
      :view="view"
      :region="region"
      :category-counts="categoryCounts"
      @update:category="setCategory"
      @update:sort="setSort"
      @update:view="setView"
      @clear-filters="clearFilters"
      @clear-region="clearRegion"
    />

    <AtlasSection :active-region="region" @select-region="selectRegion" />
    <AboutSection />
    <ExperienceTimeline />
    <CapabilitiesSection />
    <ContactSection />
  </main>
</template>
