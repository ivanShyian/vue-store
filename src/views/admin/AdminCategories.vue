<template>
  <app-loading v-if="loading"></app-loading>
  <AdminCard title="Категории"
             button-name="Создать"
             @modal="modal = true"
             v-else>
    <admin-categories-table :categories="categories"></admin-categories-table>
  </AdminCard>
  <teleport to="body" v-if="modal">
    <app-modal categories @close-modal="modal = false"></app-modal>
  </teleport>
</template>

<script>
import AdminCategoriesTable from '@/components/admin/AdminCategoriesTable'
import AppModal from '@/components/ui/AppModal'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AppLoading from '@/components/ui/AppLoading'
import AdminCard from '@/components/admin/AdminCard'
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
  components: { AdminCard, AppLoading, AdminCategoriesTable, AppModal }
}
</script>

<style scoped lang="scss">
.categories__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
