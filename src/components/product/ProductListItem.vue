<template>
  <div class="product-card">
    <div class="product-img">
      <img :src="product.img" alt="">
    </div>
    <h4 class="product-title">{{ product.title }}</h4>
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
import { currency } from '@/utils/currency'
import { useCart } from '@/use/cart'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
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
    onMounted(() => {
      counter.value = bought.value ? store.getters['cart/cartItem'](props.product.id).count : null
    })
    return {
      bought,
      currency,
      notAvailable,
      productsAreOut,
      minus,
      pick,
      plus,
      counter
    }
  }
}
</script>

<style scoped>

</style>
