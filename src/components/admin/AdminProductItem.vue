<template>
  <tr class="inventory-table__item"
      v-for="(product, idx) in products"
      :key="product.id">
    <td>{{ idx + 1 }}</td>
    <td>{{ product.title }}</td>
    <td><img :src="product.img" alt="" height="50" width="50"></td>
    <td>{{ currency(product.price) }}</td>
    <td>{{ CATEGORY_MAP[product.category] }}</td>
    <td>{{ product.count }}</td>
    <td>
      <button @click="$router.push(`product/${product.id}`)" class="btn">Открыть</button>
    </td>
  </tr>
</template>

<script>
import { currency } from '@/utils/currency'
import { CATEGORY_MAP } from '@/utils/constants'
export default {
  props: {
    products: {
      type: Array,
      required: false,
      default: Array
    }
  },
  setup() {
    return {
      currency,
      CATEGORY_MAP
    }
  }
}
</script>

<style scoped lang="scss">
.inventory-table__item {
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, .1);
  td {
    text-align: center;
    flex: 0 0 15%;
  }
  td:first-child {
    flex: 0 0 10%;
    margin-left: -.5rem;
  }
}
</style>
