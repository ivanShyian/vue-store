<template>
  <div class="card" v-if="product">
    <div class="product-info">
      <h2>{{ product.title }}</h2>
      <img :src="product.img" width="250" alt="">
      <div>
        <span>Категория: <strong>{{ CATEGORY_MAP[product.category] }}</strong></span>
        <span>Цена: <strong>{{ currency(product.price) }}</strong></span>
        <span>ID: <strong>{{ product.id }}</strong></span>
        <span>Кол-во на складе: <strong>{{ product.count }}</strong></span>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { CATEGORY_MAP } from '@/utils/constants'
import { currency } from '@/utils/currency'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    onMounted(async () => {
      await store.dispatch('products/loadProducts')
    })
    return {
      CATEGORY_MAP,
      currency,
      product: computed(() => store.getters['products/products'].find(el => {
        console.log(route.params.id)
        return el.id === route.params.id
      }))
    }
  }
}
</script>

<style scoped lang="scss">
.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 1.3rem;
  }
}
</style>
