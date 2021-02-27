<template>
  <table class="orders-table">
    <tr class="orders-table__headers">
      <th>№</th>
      <th>Дата заказа</th>
      <th>Действие</th>
    </tr>
    <admin-orders-item :orders="orders"></admin-orders-item>
  </table>
</template>

<script>
import AdminOrdersItem from '@/components/admin/AdminOrdersItem'
export default {
  props: {
    orders: {
      type: Array,
      required: true
    }
  },
  components: { AdminOrdersItem }
}
</script>

<style scoped lang="scss">
.orders-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0 0 0;
  margin-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, .25);

  &__headers {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
  }
}
</style>
