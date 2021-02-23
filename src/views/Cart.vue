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
    <table class="table" v-else-if="bought && !loading">
      <thead>
      <tr>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
      </tr>
      </thead>
      <cart-list :bought="bought"
      ></cart-list>
    </table>
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
import CartList from '@/components/cart/CartList'
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'

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
        if (Object.keys(cart.value).length) {
          return Object.keys(cart.value).includes(el.id)
        }
      }))

    const bought = computed(() => filtered.value.map(el => {
      el.count = cart.value[el.id].count
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
    CartList,
    AppLoading
  }
}
</script>
<style scoped>
</style>
