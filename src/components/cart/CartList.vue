<template>
  <tbody>
  <tr v-for="product in bought"
      :key="product.id">
    <td>{{ product.title }}</td>
    <td>
      <button class="btn primary"
              @click.prevent="add(product.id)">+
      </button>
      {{ product.count }}
      <button class="btn danger"
              @click.prevent="minus(product.id)">-
      </button>
    </td>
    <td>{{ price(product.price, product.count) }} руб</td>
  </tr>
  </tbody>
</template>
<script>
import { useCart } from '@/use/cart'
export default {
  props: {
    bought: {
      type: Array,
      required: false,
      default: Array
    }
  },
  setup() {
    return {
      add: useCart().addProduct,
      minus: useCart().minusProduct,
      price: useCart().price
    }
  }
}
</script>

<style scoped>

</style>
