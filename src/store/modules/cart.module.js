export default {
  namespaced: true,
  state() {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) ?? {}
    }
  },
  getters: {
    cartLength(state) {
      return Object.keys(state.cart).length
    },
    cart(state) {
      return state.cart
    },
    cartItem: (state) => (idx) => {
      return state.cart[idx]
    }
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart
      localStorage.setItem('cart', JSON.stringify(cart))
      console.log(cart)
    },
    deleteCart(state) {
      state.cart = {}
      localStorage.removeItem('cart')
    }
  }
}
