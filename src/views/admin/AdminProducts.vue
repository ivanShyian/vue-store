<template>
  <div class="card inventory">
    <div class="inventory__top">
      <h2>Инвентарь</h2>
      <button class="btn primary" @click="modal = true">Создать</button>
    </div>
    <admin-products-table :products="products"></admin-products-table>
    <teleport to="body" v-if="modal">
      <app-modal product @close-modal="modal = false"></app-modal>
    </teleport>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AdminProductsTable from '@/components/admin/AdminProductsTable'
import AppModal from '@/components/ui/AppModal'

export default {
  components: {
    AdminProductsTable,
    AppModal
  },
  setup() {
    const modal = ref(false)
    const store = useStore()
    onMounted(async () => {
      await store.dispatch('products/loadProducts')
    })
    return {
      modal,
      products: computed(() => store.getters['products/products'])
    }
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
