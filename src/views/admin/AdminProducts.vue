<template>
  <app-loading v-if="loading"></app-loading>
  <AdminCard title="Продукты"
             button-name="Создать"
             @modal="modal = true"
             v-else>
    <div v-if="current">
      <admin-products-table :products="current"></admin-products-table>
      <app-pagination :pages="result.length"
                      v-model="page"></app-pagination>
    </div>
  </AdminCard>

  <teleport to="body">
    <transition name="modal-trans"
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut">
      <app-modal product
                 v-if="modal"
                 @close-modal="modal = false">
      </app-modal>
    </transition>
  </teleport>
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
import AdminCard from '@/components/admin/AdminCard'

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
    AdminCard,
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
