<template>
  <div class="products-table" v-if="products.length">
    <product-card
      v-for="product in products"
      :key="product.id"
      :product="product"
      @click="$router.push(`/product/${product.id}`)"
    ></product-card>
  </div>
  <div class="empty" v-else>
    <h3>Товары в данной категории отсутствуют</h3>
  </div>
</template>
<script>
import { currency } from '@/utils/currency'

import ProductCard from '@/components/product/ProductListItem'
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

<style scoped lang="scss">
.empty {
  margin: 0 auto;
  display: flex;
  align-items: center;
}
</style>
