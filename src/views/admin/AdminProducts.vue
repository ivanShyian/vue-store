<template>
  <app-loading v-if="loading"></app-loading>
  <div class="card inventory" v-else>
    <div class="inventory__top">
      <h2>Инвентарь</h2>
      <button class="btn primary"
              @click="modal = true">Создать</button>
    </div>
    <div v-if="current">
      <admin-products-table :products="current"></admin-products-table>
      <app-pagination :pages="result.length"
                      v-model="page"></app-pagination>
    </div>
    <teleport to="body" v-if="modal">
      <app-modal product
                 @close-modal="modal = false"></app-modal>
    </teleport>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { usePagination } from '@/use/pagination'
import { useRoute } from 'vue-router'
import AdminProductsTable from '@/components/admin/AdminProductsTable'
import AppModal from '@/components/ui/AppModal'
import AppPagination from '@/components/ui/AppPagination'
import AppLoading from '@/components/ui/AppLoading'

export default {
  setup() {
    const loading = ref(false)
    const modal = ref(false)
    const page = computed(() => route.query.page)

    const store = useStore()
    const route = useRoute()

    const products = computed(() => store.getters['products/products'])
    onMounted(async () => {
      loading.value = true
      await store.dispatch('products/loadProducts')
      loading.value = false
    })
    return {
      loading,
      modal,
      products,
      ...usePagination(products, page)
    }
  },
  components: {
    AppLoading,
    AppPagination,
    AdminProductsTable,
    AppModal
  }
}
</script>

<style scoped lang="scss">
.inventory__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
