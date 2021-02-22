export default {
  namespaced: true,
  state() {
    return {
      cart: localStorage.getItem('cart') ?? {}
    }
  },
  getters: {
    cartLength(state) {
      return Object.keys(state.cart).length
    },
    cart(state) {
      return state.cart
    }
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart
      localStorage.setItem('cart', cart)
      console.log(cart)
    },
    deleteCart(state) {
      state.cart = {}
      localStorage.removeItem('cart')
    }
  }
}
