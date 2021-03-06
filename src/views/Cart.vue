<template>
  <div class="breadcrumbs text-white" style="text-align: left">
    <span @click="$router.push('/')"
          style="cursor: pointer"
    >Вернуться к товарам</span>
  </div>
  <div class="card" v-if="!hasBought">
    <h1>Корзина</h1>
    <app-loading v-if="loading"></app-loading>
    <cart-table v-else-if="hasData"
                :bought="filtered"
    ></cart-table>
    <h3 class="text-center" v-else> В корзине пока ничего нет</h3>
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
    <h3>Квитанция была выслана на Вашу почту</h3>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'
import { pay } from '@/utils/pay'
import AppLoading from '@/components/ui/AppLoading'
import CartTable from '@/components/cart/CartTable'
import Login from '@/views/Login'

export default {
  setup() {
    const store = useStore()
    const loading = ref(true)
    const amount = ref(null)
    const hasBought = ref(false)
    const hasData = computed(() => !loading.value && filtered.value.length)
    const cart = computed(() => store.getters['cart/cart'])
    const auth = computed(() => store.getters['auth/isAuthenticated'])
    const products = computed(() => store.getters['products/products'])

    onMounted(async () => {
      await store.dispatch('products/loadProducts')
      loading.value = false
    })
    const filtered = computed(() => products.value
      .filter(el => Object.keys(cart.value).length ? Object.keys(cart.value.list).includes(el.id) : null)
      .map(el => {
        el.quantity = cart.value.list[el.id].count
        return el
      }))

    watch(filtered, () => {
      amount.value = filtered.value.map(el => el.price * el.quantity).reduce((acc, curr) => {
        acc += curr
        return acc
      }, 0)
    })

    const buy = async (total) => {
      const email = store.state.auth.user.email
      const result = await pay(total, cart.value.list, email)
      await store.dispatch('products/updateProduct', filtered.value)
      await store.dispatch('cart/submitPurchase', result)
      await store.commit('cart/clearCart')
      hasBought.value = true
    }
    return {
      hasData,
      hasBought,
      loading,
      products,
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
