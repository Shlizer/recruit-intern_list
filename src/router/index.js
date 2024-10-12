import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:page?',
      name: 'list',
      component: ListView,
      props: route => ({
        ...route.params,
        ...{ page: Number.parseInt(route.params.page || 0, 10) },
      }),
    },
    {
      path: '/add',
      name: 'add',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddView.vue'),
    },
    {
      path: '/edit/:id',
      name: 'edit',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditView.vue'),
      props: route => ({
        ...route.params,
        ...{ id: Number.parseInt(route.params.id, 10) },
      }),
    },
  ],
})

export default router
