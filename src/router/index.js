import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: () => import('../views/Shop'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Login',
    component: Login,
    meta: {
      layout: 'auth',
      auth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  console.log(store.getters['auth/isAuthenticated'])
  if (requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
