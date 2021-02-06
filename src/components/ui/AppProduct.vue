<template>
  <div :title="product.title" class="card center">
    <h3>{{ product.title }}</h3>
    <img :src="product.img" alt=""/>
    <p v-if="category">Категория: <strong>{{ category.title }}</strong></p>
    <product-price :price="product.price"
                   v-if="!bought"
                   :count="product.count"
                   @click="bought = true"
    ></product-price>
    <product-quantity v-else
                      :count="product.count"
                      @counter-is-zero="bought = false"
    ></product-quantity>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import ProductPrice from '@/components/ui/ProductPrice'
import ProductQuantity from '@/components/ui/ProductQuantity'

export default {
  props: {
    product: {
      type: Object,
      required: false,
      default: Object
    }
  },
  setup(props) {
    const bought = ref(false)
    const store = useStore()
    const category = computed(() => store.getters['categories/categories']
      .find(el => el.type === props.product.category))
    onMounted(async () => {
      await store.dispatch('categories/loadCategories')
    })
    return {
      category,
      bought
    }
  },
  components: { ProductQuantity, ProductPrice }
}
</script>

<style scoped>
.product-controls {
  width: 20%;
}
</style>
