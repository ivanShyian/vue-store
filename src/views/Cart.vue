<template>
  <div class="card">
    <h1>Корзина</h1>
    <h3 class="text-center" v-if="products"> В корзине пока ничего нет
    </h3>
    <table class="table">
      <thead>
      <tr>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in bought" :key="product.id">
        <td>{{ product.title }}</td>
        <td>
          <button class="btn primary">+</button>
          42 шт.
          <button class="btn danger">-</button>
        </td>
        <td>{{ product.price }} руб</td>
      </tr>
      </tbody>
    </table>
    <hr>
    <p class="text-right"><strong>Всего: 14 200 руб.</strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
// eslint-disable-next-line no-unused-vars
const CART_MODEL = {
  2: 3,
  5: 1,
  7: 2
}

export default {
  setup() {
    const store = useStore()
    onMounted(async () => {
      await store.dispatch('products/getCart')
    })
    const products = computed(() => store.getters['products/products'])
    const bought = computed(() => products.value
      .filter(el => Object.keys(CART_MODEL)
        .includes(el.id.toString())))
    watch(bought, val => {
      console.log(val)
    })
    return {
      products,
      bought
    }
  }
}
</script>

<style scoped>

</style>
