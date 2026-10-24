import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'
import ColophonView from '../views/ColophonView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { getProject } from '../data/projects.js'
import { PROFILE } from '../data/profile.js'
import { applyPageMeta, SITE_DESCRIPTION } from '../utils/seo.js'
import { prefersReducedMotion } from '../utils/motion.js'
import { assetUrl } from '../utils/assets.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        window.setTimeout(() => resolve(savedPosition), 30)
      })
    }

    if (to.hash) {
      return new Promise((resolve) => {
        window.setTimeout(
          () =>
            resolve({
              el: to.hash,
              top: 82,
              behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            }),
          80,
        )
      })
    }

    if (to.path === from.path) return false
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: `${PROFILE.name} — Architect · Selected Works 2012–2015` },
    },
    {
      path: '/work/:id',
      name: 'project',
      component: ProjectView,
    },
    {
      path: '/colophon',
      name: 'colophon',
      component: ColophonView,
      meta: { title: 'Sources & Credits' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: 'Page Not Found' },
    },
  ],
})

router.afterEach((to) => {
  if (to.name === 'project') {
    const project = getProject(to.params.id)
    if (project) {
      applyPageMeta({
        title: project.title,
        description: project.excerpt,
        image: project.images[0]?.src ?? assetUrl('/images/site/og-image.jpg'),
        type: 'article',
      })
      return
    }
  }

  if (to.name === 'home') {
    applyPageMeta({
      title: null,
      description: SITE_DESCRIPTION,
      image: assetUrl('/images/site/og-image.jpg'),
      type: 'website',
    })
    return
  }

  const title = to.meta?.title ?? null
  const description =
    to.name === 'colophon'
      ? 'Sources, credits, attribution notes and research records for the architectural portfolio of Gonçalo Lopes Rocha.'
      : 'The requested page could not be found in the architectural portfolio of Gonçalo Lopes Rocha.'
  applyPageMeta({
    title,
    description,
    image: assetUrl('/images/site/og-image.jpg'),
    type: 'website',
  })
})

export default router
