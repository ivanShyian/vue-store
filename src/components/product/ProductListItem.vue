<template>
  <div class="product-card">
    <div class="product-img">
      <img :src="product.img" alt="">
    </div>
    <h4 class="product-title">{{ product.title }}</h4>
    <product-price :price="product.price"
                   :count="product.count"
                   @buy="bought = true"
                   v-if="!bought"
    ></product-price>
    <product-quantity v-else
                      :count="product.count"
                      @counter-is-zero="bought = false"
    ></product-quantity>
  </div>
</template>

<script>
import ProductPrice from '@/components/product/ProductPrice'
import ProductQuantity from '@/components/product/ProductQuantity'
import { ref } from 'vue'
export default {
  props: {
    product: {
      type: Object,
      required: false,
      default: Object
    }
  },
  setup() {
    const bought = ref(false)
    return {
      bought
    }
  },
  components: { ProductQuantity, ProductPrice }
}
</script>

<style scoped>

</style>
