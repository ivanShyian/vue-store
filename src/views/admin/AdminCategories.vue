<template>
  <div class="card categories">
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
export default {
  setup() {
    const modal = ref(false)
    const store = useStore()
    const categories = computed(() => store.getters['categories/categories'])
    onMounted(async () => {
      await store.dispatch('categories/loadCategories')
    })
    return {
      modal,
      categories
    }
  },
  components: { AdminCategoriesTable, AppModal }
}
</script>

<style scoped lang="scss">
.categories__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
