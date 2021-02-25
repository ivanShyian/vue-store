<template>
  <div class="navbar">
    <h4>{{ logo }}</h4>
    <ul class="navbar-menu" v-if="admin">
      <li>
        <router-link to="/admin/products">Инвентарь</router-link>
      </li>
      <li>
        <router-link to="/admin/categories">Категории</router-link>
      </li>
      <li>
        <router-link to="/">Выйти</router-link>
      </li>
    </ul>
    <ul class="navbar-menu" v-if="!admin">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li class="cart-link">
        <router-link to="/cart">Корзина</router-link>
        <span>{{ cart }}</span>
      </li>
      <li v-if="isAuth">
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
    const store = useStore()
    const router = useRouter()
    const isAuth = computed(() => store.getters['auth/isAuthenticated'])
    const userName = computed(() => store.state.auth.user.name)
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
      store.commit('auth/logout')
      store.commit('cart/clearCart')
      router.push('/auth')
    }
    return {
      cart,
      logout,
      isAuth,
      logo
    }
  }
}
</script>

<style scoped lang="scss">
.navbar-menu:last-child {
  .cart-link {
    span {
      font-size: .8rem;
      background-color: rgba(255, 0, 0, .7);
      border-radius: 2rem;
      color: white;
      padding: 0 .7rem;
    }
  }
}
</style>
