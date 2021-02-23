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
    },
    deleteItem(state, cart) {
      for (const i in state.cart) {
        if (cart.id === i) {
          if (Object.keys(state.cart).length === 1 && state.cart[i].count === 1) {
            localStorage.removeItem('cart')
          } else {
            delete state.cart[i]
            localStorage.setItem('cart', JSON.stringify(state.cart))
          }
        }
      }
      console.log(state.cart)
    }
  }
}
