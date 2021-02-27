<template>
  <table class="inventory__content inventory-table">
    <tr class="inventory-table__headers">
      <th>№</th>
      <th>Название</th>
      <th>Изображение</th>
      <th>Цена</th>
      <th>Категория</th>
      <th>Количество</th>
      <th>Действие</th>
    </tr>
    <AdminProductItem :products="products"
    ></AdminProductItem>
  </table>
</template>

<script>
import AdminProductItem from '@/components/admin/AdminProductItem'
export default {
  components: { AdminProductItem },
  props: {
    products: {
      type: Array,
      required: false
    }
  }
}
</script>

<style scoped lang="scss">

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
