import store from '../store/index'
import { ref, computed } from 'vue'
import { addToCart } from '../utils/cart'

export function useCart(product) {
  const counter = ref(null)
  const bought = ref(store.getters['cart/cartItem'](product.id) ?? false)
  const notAvailable = computed(() => product.count <= 0)
  const productsAreOut = computed(() => counter.value === product.count)

  const buy = () => {
    bought.value = true
    store.commit('cart/setCart', addToCart(product))
  }
  const minus = () => {
    if (counter.value !== 1) {
      counter.value--
      store.commit('cart/setCart', addToCart(product, counter.value))
    } else {
      bought.value = false
      store.commit('cart/deleteCart')
    }
  }
  const plus = () => {
    if (!productsAreOut.value) {
      counter.value++
      store.commit('cart/setCart', addToCart(product, counter.value))
    }
  }
  return {
    bought,
    notAvailable,
    productsAreOut,
    minus,
    buy,
    plus,
    counter
  }
}
