import store from '../store/index'

export function addToCart(product, count = 1) {
  const uid = store.state.auth.uid
  const prodId = product.id
  const cart = store.getters['cart/cart'][uid] ? store.getters['cart/cart'][uid].list : null
  return {
    [uid]: {
      date: Date.now(),
      list: {
        ...cart,
        [prodId]: { product: product.title, count }
      }
    }
  }
}
