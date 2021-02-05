<template>
  <div class="product-card">
    <div class="product-img">
      <img :src="product.img">
    </div>
    <h4 class="product-title">{{ product.title }}</h4>
    <product-price :price="product.price"
                   v-if="!bought"
                   @click.stop="bought = true"
    ></product-price>
    <product-quantity v-else></product-quantity>
  </div>
</template>

<script>
import ProductPrice from '@/components/ui/ProductPrice'
import ProductQuantity from '@/components/ui/ProductQuantity'
import { ref } from 'vue'
export default {
  props: ['product'],
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
