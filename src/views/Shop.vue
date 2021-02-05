<template>
  <div class="card">
    <product-filter></product-filter>
    <product-list :products="products"></product-list>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import ProductList from '@/components/product/ProductList'
import ProductFilter from '@/components/product/ProductFilter'
export default {
  components: { ProductFilter, ProductList },
  setup() {
    const store = useStore()
    onMounted(() => {
      store.dispatch('products/getProducts')
    })
    return {
      products: computed(() => store.getters['products/products'])
    }
  }
}
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>
