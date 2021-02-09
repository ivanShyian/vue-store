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
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/product/:id?',
    name: 'Product',
    component: () => import('../views/Product'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/Admin'),
    redirect: '/admin/products',
    meta: {
      layout: 'admin',
      auth: true
    },
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/admin/AdminProducts')
      },
      {
        path: 'product/:id?',
        name: 'AdminProduct',
        component: () => import('../views/admin/AdminProduct')
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('../views/admin/AdminCategories')
      }
    ]
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
  if (requireAuth && store.getters['auth/isAuthenticated']) {
    if (!store.getters['auth/isAdmin'] && to.meta.layout === 'admin') {
      next('/auth?message=auth')
      store.commit('auth/logout')
    } else {
      next()
    }
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
