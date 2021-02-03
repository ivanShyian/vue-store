<template>
  <div class="card">
    <h1>Корзина</h1>
    <h3 class="text-center" v-if="!bought"> В корзине пока ничего нет
    </h3>
    <table class="table" v-else>
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
                  @click.prevent="addProduct(product.id)">+</button>
          {{ product.count }}
          <button class="btn danger"
                  @click.prevent="minusProduct(product.id)">-</button>
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
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
const CART_MODEL = {
  2: 3,
  5: 1
}
export default {
  setup() {
    const store = useStore()
    const cart = ref(CART_MODEL)
    const amount = ref(null)
    onMounted(async () => {
      await store.dispatch('products/getCart')
    })
    const products = computed(() => store.getters['products/products'])

    const filtered = computed(() => products.value
      .filter(el => Object.keys(cart.value)
        .includes(el.id.toString())))

    const bought = computed(() => filtered.value.map(el => {
      el.count = cart.value[el.id.toString()]
      return el
    }))

    const price = (price, value) => {
      const res = price * value
      return res
    }
    watch(bought, value => {
      amount.value = bought.value.map(el => el.price * el.count).reduce((acc, curr) => {
        acc += curr
        return acc
      }, 0)
    })
    return {
      products,
      bought,
      price,
      amount,
      addProduct: (id) => {
        cart.value[id] += 1
      },
      minusProduct: (id) => {
        if (cart.value[id] !== 1) {
          cart.value[id] -= 1
        } else {
          delete cart.value[id]
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
