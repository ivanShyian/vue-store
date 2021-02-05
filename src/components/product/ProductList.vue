<template>
  <div class="products-table">
    <product-card
      v-for="product in products"
      :key="product.id"
      :product="product"
      @click="$router.push(`/product/${product.id}`)"
    ></product-card>
  </div>
</template>
<script>
import { currency } from '@/utils/currency'

import ProductCard from '@/components/product/ProductCard'
export default {
  components: { ProductCard },
  props: {
    products: {
      type: Array,
      required: false,
      default: Array
    }
  },
  setup() {
    return { currency }
  }
}
</script>

<style scoped>

</style>
