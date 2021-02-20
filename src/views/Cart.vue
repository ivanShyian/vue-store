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
      <cart-list :bought="bought"></cart-list>
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
import { useCart } from '@/use/cart'
import AppLoading from '@/components/ui/AppLoading'
import CartList from '@/components/cart/CartList'

export default {
  components: {
    CartList,
    AppLoading
  },
  setup() {
    return {
      ...useCart()
    }
  }
}
</script>
<style scoped>
</style>
