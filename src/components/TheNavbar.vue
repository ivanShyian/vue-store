<template>
  <div class="navbar">
    <h4>{{ logo }}</h4>
    <ul class="navbar-menu" v-if="admin">
      <li v-for="link in adminNav"
          :key="link.name"
      >
        <router-link :to="link.src">{{ link.label }}</router-link>
      </li>
      <li v-if="isAuth">
        <a href="#" @click="logout">Выйти</a>
      </li>
    </ul>
    <ul class="navbar-menu" v-else>
      <li v-for="link in userNav"
          :key="link.name"
      >
        <router-link :to="link.src">{{ link.label }}</router-link>
        <span v-if="link.name === 'cart'">{{ cart }}</span>
      </li>
      <li v-if="!isAuth">
        <router-link to="/auth">Авторизоваться</router-link>
      </li>
      <li v-else>
        <a href="#" @click="logout">Выйти</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  props: {
    admin: {
      type: Boolean,
      required: false,
      default: Boolean
    }
  },
  setup(props) {
    const adminNav = [
      { name: 'inventory', label: 'Инвентарь', src: '/admin/products' },
      { name: 'categories', label: 'Категории', src: '/admin/categories' },
      { name: 'orders', label: 'Заказы', src: '/admin/orders' }
    ]
    const userNav = [
      { name: 'shop', label: 'Магазин', src: '/' },
      { name: 'cart', label: 'Корзина', src: '/cart' }
    ]
    const store = useStore()
    const router = useRouter()
    const isAuth = computed(() => store.getters['auth/isAuthenticated'])
    const userName = computed(() => store.state.auth.user && store.state.auth.user.name)
    const cart = computed(() => store.getters['cart/cartProductQuantity'])
    const logo = computed(() => {
      if (props.admin) {
        return 'Admin | VueStore'
      } else if (!props.admin && isAuth.value) {
        return `VueStore | ${userName.value}`
      } else {
        return 'VueStore'
      }
    })
    const logout = () => {
      if (props.admin) {
        store.commit('auth/logout')
        return router.push('/')
      }
      store.commit('auth/logout')
      store.commit('cart/clearCart')
      router.push('/auth')
    }
    return {
      adminNav,
      userNav,
      cart,
      logout,
      isAuth,
      logo
    }
  }
}
</script>

<style scoped lang="scss">
  span {
    font-size: .8rem;
    background-color: rgba(255, 0, 0, .7);
    border-radius: 2rem;
    color: white;
    padding: 0 .7rem;
  }
</style>
