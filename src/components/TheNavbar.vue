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
        <router-link to="/auth">Выйти</router-link>
      </li>
    </ul>
    <ul class="navbar-menu" v-if="!admin">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
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
    const route = useRoute()
    return {
      user: computed(() => route)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
