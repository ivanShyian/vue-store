<template>
  <table class="table">
    <thead>
    <tr>
      <th>Наименование</th>
      <th>Количество</th>
      <th>Цена (шт)</th>
    </tr>
    </thead>
    <tbody>
      <cart-table-item v-for="item in bought"
                       :key="item.id"
                       :item="item"
      ></cart-table-item>
    </tbody>
  </table>
</template>

<script>
import CartTableItem from '@/components/cart/CartTableItem'
export default {
  props: {
    bought: {
      type: Array,
      required: false,
      default: Array
    }
  },
  components: { CartTableItem }
}
</script>

<style scoped lang="scss">
table tr {
  display: flex;
  th {
    flex: 0 0 33.333%;
  }
}
</style>
