<template>
  <div class="card inventory">
    <div class="inventory__top">
      <h1>Инвентарь</h1>
      <button class="btn primary">Создать</button>
    </div>
    <table class="inventory__content inventory-table">
      <tr class="inventory-table__headers">
        <th>#</th>
        <th>Название</th>
        <th>Изображение</th>
        <th>Цена</th>
        <th>Категория</th>
        <th>Количество</th>
        <th>Действие</th>
      </tr>
      <inventory-list-item :products="products"
                           v-if="products"
      ></inventory-list-item>
    </table>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import InventoryListItem from '@/components/admin/InventoryListItem'

export default {
  components: { InventoryListItem },
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
.inventory-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  &__headers {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
  }
}
</style>
