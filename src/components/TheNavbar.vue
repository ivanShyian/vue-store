<template>
  <div class="navbar">
    <h4>{{ admin ? 'Admin' : 'Vue-store' }}</h4>
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
      <li>
        <router-link to="/cart">Корзина</router-link>
        <span>{{ cart }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
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
  setup() {
    const store = useStore()
    const cart = computed(() => store.getters['cart/cartProductQuantity'])
    return {
      cart
    }
  }
}
</script>

<style scoped lang="scss">
.navbar-menu:last-child {
  li:last-child {
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
