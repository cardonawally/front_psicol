import { createRouter, createWebHistory } from 'vue-router'
import Client from '../views/Client.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'client',
      component: Client
    },
    {
      path: '/event',
      name: 'event',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Event.vue')
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: () => import('../views/Ticket.vue')
    },
  ]
})

export default router
