<template>
  <div :title="product.title" class="card center" v-if="category">
    <h3>{{ product.title }}</h3>
    <img :src="product.img" alt=""/>
    <p v-if="category">Категория: <strong>{{ category.title }}</strong></p>
    <div class="text-center" v-if="!bought">
      <button v-if="!notAvailable"
              class="btn"
              @click.stop="pick">{{ currency(product.price) }}
      </button>
      <p v-else>Нет в наличии</p>
    </div>
    <div class="product-controls" v-else>
      <button class="btn danger" @click.stop="minus">-</button>
      <strong>{{ counter }}</strong>
      <button class="btn primary"
              :disabled="productsAreOut"
              @click.stop="plus">+</button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useCart } from '@/use/cart'
import { currency } from '@/utils/currency'

export default {
  props: {
    product: {
      type: Object,
      required: false,
      default: Object
    }
  },
  setup(props) {
    const store = useStore()
    const {
      bought,
      notAvailable,
      productsAreOut,
      minus,
      pick,
      plus,
      counter
    } = useCart(props.product)

    const category = computed(() => store.getters['categories/categories']
      .find(el => el.type === props.product.category))

    onMounted(async () => {
      await store.dispatch('categories/loadCategories')
      counter.value = bought.value ? store.getters['cart/cartItem'](props.product.id).count : null
    })
    return {
      category,
      currency,
      productsAreOut,
      bought,
      notAvailable,
      minus,
      pick,
      plus,
      counter
    }
  }
}
</script>

<style scoped>
.product-controls {
  width: 20%;
}
</style>
