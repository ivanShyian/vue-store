<template>
  <app-loading v-if="loading"></app-loading>
  <div v-else>
    <div class="breadcrumbs text-white" style="text-align: left">
      <span @click="$router.push('/')"
            style="cursor: pointer"
      >Вернуться к товарам</span>
    </div>
    <product-item v-if="product"
                :product="product">
    </product-item>
    <h3 class="text-center text-white" v-else>
      Товара не найден.
    </h3>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppLoading from '../components/ui/AppLoading'
import ProductItem from '../components/product/ProductItem.vue'

export default {
  setup() {
    const loading = ref(true)
    const store = useStore()
    const route = useRoute()
    const product = computed(() => store.getters['products/product'](route.params.id))

    onMounted(async () => {
      await store.dispatch('categories/loadCategories')
      await store.dispatch('products/loadProducts')
      loading.value = false
    })
    return {
      product,
      loading
    }
  },
  components: { AppLoading, ProductItem }
}
</script>

<style scoped>
</style>
