import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/crowdsource-calc/'),
  routes: [
    {
      path: '/',
      name: 'calculator',
      component: () => import('@/views/Calculator.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('@/views/History.vue')
    }
  ]
})

export default router
