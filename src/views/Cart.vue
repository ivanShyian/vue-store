<template>
  <div class="breadcrumbs text-white" style="text-align: left">
    <span @click="$router.push('/')"
          style="cursor: pointer"
    >Вернуться к товарам</span>
  </div>
  <div :class="['card', 'text-center']">
    <h1>Корзина</h1>
    <app-loading v-if="loading"></app-loading>
    <h3 class="text-center" v-else-if="!bought.length && !loading"> В корзине пока ничего нет</h3>
    <cart-table v-else-if="bought && !loading"
                :bought="bought"></cart-table>
    <hr>
    <div style="text-align: right">
      <p class="text-right" v-if="amount"><strong>Всего: {{ amount }} руб.</strong></p>
      <p class="text-right">
        <button class="btn">Оплатить</button>
      </p>
    </div>
  </div>
</template>

<script>
import AppLoading from '@/components/ui/AppLoading'
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'
import CartTable from '@/components/cart/CartTable'

export default {
  setup() {
    const loading = ref(false)
    const store = useStore()
    const cart = computed(() => store.getters['cart/cart'])
    const amount = ref(null)
    onMounted(async () => {
      loading.value = true
      await store.dispatch('products/loadProducts')
      loading.value = false
    })
    const products = computed(() => store.getters['products/products'])

    const filtered = computed(() => products.value
      .filter(el => {
        if (Object.keys(cart.value).length && Object.keys(cart.value.list).length) {
          return Object.keys(cart.value.list).includes(el.id)
        }
      }))

    const bought = computed(() => filtered.value.map(el => {
      el.quantity = cart.value.list[el.id].count
      return el
    }))

    const price = (price, value) => {
      return price * value
    }
    watch(bought, () => {
      amount.value = bought.value.map(el => el.price * el.count).reduce((acc, curr) => {
        acc += curr
        return acc
      }, 0)
    })
    return {
      loading,
      products,
      bought,
      amount,
      price,
      filtered
    }
  },
  components: {
    CartTable,
    AppLoading
  }
}
</script>
<style scoped>
</style>
