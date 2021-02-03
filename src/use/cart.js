import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'

const CART_MODEL = {
  2: 3,
  5: 1
}
export function useCart() {
  const store = useStore()
  const cart = ref(CART_MODEL)
  const loading = ref(false)
  const amount = ref(null)
  onMounted(async () => {
    loading.value = true
    await store.dispatch('products/getCart')
    loading.value = false
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
    return price * value
  }
  watch(bought, () => {
    amount.value = bought.value.map(el => el.price * el.count).reduce((acc, curr) => {
      acc += curr
      return acc
    }, 0)
  })
  return {
    products,
    bought,
    amount,
    loading,
    price,
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
