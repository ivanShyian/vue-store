<template>
  <div class="card">
    <h1>Корзина</h1>
      <app-loading v-if="loading"></app-loading>
      <h3 class="text-center" v-else-if="!bought && !loading"> В корзине пока ничего нет</h3>
      <table class="table" v-else-if="bought && !loading">
        <thead>
        <tr>
          <th>Наименование</th>
          <th>Количество</th>
          <th>Цена (шт)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in bought"
            :key="product.id">
          <td>{{ product.title }}</td>
          <td>
            <button class="btn primary"
                    @click.prevent="addProduct(product.id)">+
            </button>
            {{ product.count }}
            <button class="btn danger"
                    @click.prevent="minusProduct(product.id)">-
            </button>
          </td>
          <td>{{ price(product.price, product.count) }} руб</td>
        </tr>
        </tbody>
      </table>
      <hr>
      <p class="text-right" v-if="amount !== 0"><strong>Всего: {{ amount }} руб.</strong></p>
      <p class="text-right">
        <button class="btn">Оплатить</button>
      </p>
  </div>
</template>

<script>
import { useCart } from '@/use/cart'
import AppLoading from '@/components/ui/AppLoading'

export default {
  components: { AppLoading },
  setup() {
    return {
      ...useCart()
    }
  }
}
</script>

<style scoped>
.card {
  text-align: center;
}
</style>
