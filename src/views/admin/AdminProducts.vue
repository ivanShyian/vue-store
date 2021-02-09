<template>
  <div class="card inventory">
    <div class="inventory__top">
      <h1>Инвентарь</h1>
      <button class="btn primary">Создать</button>
    </div>
    <admin-table :products="products"></admin-table>
    <app-modal v-if="false"></app-modal>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AdminTable from '@/components/admin/AdminTable'
import AppModal from '@/components/ui/AppModal'

export default {
  components: { AppModal, AdminTable },
  setup() {
    const store = useStore()
    onMounted(async () => {
      await store.dispatch('products/loadProducts')
    })
    return {
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
