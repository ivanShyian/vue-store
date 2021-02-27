<template>
  <tr class="orders-table__item"
      v-for="(ord, idx) in orders"
      :key="ord.id">
    <td>{{ idx + 1 }}</td>
    <td>{{ parseDate(ord.date) }}</td>
    <td>
      <button class="btn primary"
              @click="$router.replace(`order/${ord.id}`)"
      >Открыть</button>
    </td>
  </tr>
</template>

<script>
import { parseDate } from '@/utils/parse-date'

export default {
  props: {
    orders: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {
      parseDate
    }
  }
}
</script>

<style scoped lang="scss">
.orders-table__item {
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, .1);
  td {
    text-align: center;
    flex: 0 0 36%;
    margin: .5rem 0;
  }
  td:first-child {
    flex: 0 0 28%
  }
  td:nth-child(2) {
    padding-left: 1.5rem;
  }
  td:last-child {
    padding-left: 1.5rem;
  }
}
</style>
