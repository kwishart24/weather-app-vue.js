import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
  ]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // <-- change here
  routes,
})

export default router
