<template>
  <app-loading v-if="loading"></app-loading>
  <div class="card categories" v-else>
    <div class="categories__top">
      <h1>Категории</h1>
      <button class="btn primary" @click="modal = true">Создать</button>
    </div>
    <admin-categories-table :categories="categories"></admin-categories-table>
    <teleport to="body" v-if="modal">
      <app-modal categories @close-modal="modal = false"></app-modal>
    </teleport>
  </div>
</template>

<script>
import AdminCategoriesTable from '@/components/admin/AdminCategoriesTable'
import AppModal from '@/components/ui/AppModal'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AppLoading from '@/components/ui/AppLoading'
export default {
  setup() {
    const modal = ref(false)
    const loading = ref(false)
    const store = useStore()
    const categories = computed(() => store.getters['categories/categories'])
    onMounted(async () => {
      loading.value = true
      await store.dispatch('categories/loadCategories')
      loading.value = false
    })
    return {
      modal,
      categories,
      loading
    }
  },
  components: { AppLoading, AdminCategoriesTable, AppModal }
}
</script>

<style scoped lang="scss">
.categories__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
