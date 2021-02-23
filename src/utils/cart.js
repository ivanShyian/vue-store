import store from '../store/index'

export function addToCart(product, count = 1) {
  const id = product.id
  return {
    ...store.getters['cart/cart'],
    [id]: { product: product.title, count }
  }
}
