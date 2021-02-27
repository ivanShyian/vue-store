<template>
  <app-loading v-if="loading"></app-loading>
  <div class="card shop" v-else>
    <product-filter :categories="categories"
                    v-model="filter"
    ></product-filter>
    <product-list :products="products"
    ></product-list>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import ProductList from '@/components/product/ProductList'
import ProductFilter from '@/components/product/ProductFilter'
import AppLoading from '@/components/ui/AppLoading'
import { useRoute } from 'vue-router'
export default {
  components: { AppLoading, ProductFilter, ProductList },
  setup() {
    const store = useStore()
    const route = useRoute()
    const loading = ref(false)
    const filter = ref({ search: '', category: '' })

    onMounted(async () => {
      loading.value = true
      filter.value = { ...filter.value, ...route.query }
      await store.dispatch('products/loadProducts')
      await store.dispatch('categories/loadCategories')
      loading.value = false
    })
    const products = computed(() => store.getters['products/products']
      .filter(el => el.title.toLowerCase().includes(filter.value.search.toLowerCase()))
      .filter(item => {
        return filter.value.category === '' ? item : filter.value.category === item.category
      })
      .sort((first, second) => {
        return second.count - first.count
      }))
    return {
      filter,
      loading,
      products,
      categories: computed(() => store.getters['categories/categories'])
    }
  }
}
</script>

<style scoped>
  .shop {
    border-radius: 4px;
    padding: 0;
    display: flex;
    height: 85vh;
  }
</style>
