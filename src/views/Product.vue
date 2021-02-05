<template>
  <!--  Предыдущая стр-->
  <app-product v-if="product"
               :product="product">
  </app-product>
  <h3 class="text-center text-white" v-else>
    Товара не найден.
  </h3>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppProduct from '@/components/ui/AppProduct'
export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    onMounted(async () => {
      await store.dispatch('products/loadProducts')
    })
    return {
      product: computed(() => store.getters['products/products'].find(el => {
        return el.id === route.params.id
      }))
    }
  },
  components: { AppProduct }
}
</script>

<style scoped>
</style>
