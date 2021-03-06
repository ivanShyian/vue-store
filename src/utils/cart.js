import store from '../store/index'

export function addToCart(product, count = 1) {
  const prodId = product.id
  const cart = store.getters['cart/cart'] ? store.getters['cart/cart'].list : null
  return {
    list: {
      ...cart,
      [prodId]: { product: product.title, count }
    }
  }
}
