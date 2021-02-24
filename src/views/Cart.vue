<template>
  <div class="breadcrumbs text-white" style="text-align: left">
    <span @click="$router.push('/')"
          style="cursor: pointer"
    >Вернуться к товарам</span>
  </div>
  <div class="card" v-if="!hasBought">
    <h1>Корзина</h1>
    <app-loading v-if="loading"></app-loading>
    <h3 class="text-center" v-else-if="!bought.length && !loading"> В корзине пока ничего нет</h3>
    <cart-table v-else-if="bought && !loading"
                :bought="bought"></cart-table>
    <hr>
    <div v-if="amount">
      <p class="text-right"><strong>Всего: {{ amount }} руб.</strong></p>
      <p class="text-right" v-if="auth">
        <button class="btn" @click.prevent="buy(amount)">Оплатить</button>
      </p>
      <div class="cart-login" v-else>
        <span>Для приобретения товара необходимо войти в систему!</span>
        <login cart></login>
      </div>
    </div>
  </div>
  <div class="card" v-else>
    <h1>Спасибо за покупку</h1>
    <h3>Пока что мы с вам не свяжемся, к сожалению..</h3>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'
import AppLoading from '@/components/ui/AppLoading'
import CartTable from '@/components/cart/CartTable'
import Login from '@/views/Login'

export default {
  setup() {
    const loading = ref(false)
    const store = useStore()
    const cart = computed(() => store.getters['cart/cart'])
    const amount = ref(null)
    const auth = computed(() => store.getters['auth/isAuthenticated'])
    const hasBought = ref(false)

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
    watch(bought, () => {
      amount.value = bought.value.map(el => el.price * el.quantity).reduce((acc, curr) => {
        acc += curr
        return acc
      }, 0)
    })

    const buy = async (total) => {
      await store.dispatch('cart/submitPurchase', total)
      await store.dispatch('products/updateProduct', bought.value)
      await store.commit('cart/clearCart')
      hasBought.value = true
    }
    return {
      hasBought,
      loading,
      products,
      bought,
      amount,
      filtered,
      auth,
      buy
    }
  },
  components: {
    Login,
    CartTable,
    AppLoading
  }
}
</script>
<style scoped lang="scss">
.cart-login {
  width: 100%;
  background-color: #94a9ce;
  border-radius: 1rem;
  padding: 1rem;
  span {
    font-size: 1.2rem;
    color: #2c3e50;
  }
  .login-form {
    margin: 1rem 0 0 0;
  }
}
</style>
