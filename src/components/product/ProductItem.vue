<template>
  <div :title="product.title" class="card center">
    <h3>{{ product.title }}</h3>
    <img :src="product.img" alt=""/>
    <p v-if="category">Категория: <strong>{{ category.title }}</strong></p>
    <product-price :price="product.price"
                   v-if="!bought"
                   @buy="buy(1)"
                   :count="product.count"
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
import ProductPrice from '@/components/product/ProductPrice'
import ProductQuantity from '@/components/product/ProductQuantity'
import { addToCart } from '@/utils/cart'

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
    const buy = (c) => {
      bought.value = true
      store.commit('cart/setCart', addToCart(props.product, c))
    }
    return {
      category,
      bought,
      buy
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
