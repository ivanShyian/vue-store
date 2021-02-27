<template>
  <div class="card">
    <h1>Данной страницы не было найдено</h1>
    <router-link :to="routeTo" v-slot="{navigate}">
      <button class="btn" @click="navigate">Перейти на главную страницу</button>
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const routeTo = computed(() => {
      if (store.getters['auth/isAuthenticated']) {
        return store.getters['auth/isAdmin'] ? '/admin/products' : '/'
      } else {
        return '/'
      }
    })
    return {
      routeTo
    }
  }
}
</script>

<style scoped lang="scss">
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
