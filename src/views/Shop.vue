<template>
  <app-loading v-if="loading"></app-loading>
  <div class="card" v-else>
    <product-filter :filters="filters"
                    :category="category"
                    @set-category="setCategory"
                    @clear-query="clearQuery"
                    v-model:search="search"
    ></product-filter>
    <product-list :products="products"
    ></product-list>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import ProductList from '@/components/product/ProductList'
import ProductFilter from '@/components/product/ProductFilter'
import AppLoading from '@/components/ui/AppLoading'
export default {
  components: { AppLoading, ProductFilter, ProductList },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const loading = ref(false)
    const search = ref('')
    const category = ref('all')
    onMounted(async () => {
      loading.value = true
      category.value = computed(() => route.query.category || 'all').value
      search.value = computed(() => route.query.search || '').value
      await store.dispatch('products/loadProducts')
      await store.dispatch('categories/loadCategories')
      loading.value = false
    })
    // Мне кажется, что так никто не делает, но ничего лучше я не придумал :DD
    watch([search, category], val => {
      if (val[0] !== '' && val[1] !== 'all') {
        router.push({
          path: '/', query: { search: val[0], category: val[1] }
        })
      } else if (val[0].length) {
        router.push({
          path: '/', query: { search: val[0] }
        })
      } else {
        router.push({
          path: '/', query: { category: val[1] }
        })
      }
    })
    const products = computed(() => store.getters['products/products']
      .filter(el => el.title.toLowerCase().includes(search.value.toLowerCase()))
      .filter(item => {
        return category.value === 'all' ? item : category.value === item.category
      })
      .sort((first, second) => {
        return second.count - first.count
      }))
    return {
      loading,
      search,
      category,
      products,
      clearQuery: () => {
        router.replace('/')
        category.value = 'all'
        search.value = ''
      },
      filters: computed(() => store.getters['categories/categories']),
      setCategory: (event) => {
        category.value = event
      }
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
