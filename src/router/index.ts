import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gifs/:id',
      name: 'gifPage',
      props: true,
      component: () => import('../views/GifPage.vue')
    },
    {
      path: '/users/:id',
      name: 'userPage',
      props: true,
      component: () => import('../views/UserPage.vue')
    }
    // {
    //   path: '/author/:id',
    //   name: 'authorPage',
      
    //   component: () => import('../views/GifPage.vue')
    // }
  ]
})

export default router
