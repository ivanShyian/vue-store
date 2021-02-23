import store from '../index'

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
      return Object.keys(state.cart).length ? state.cart[store.state.auth.uid].list[idx] : false
    }
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart
      localStorage.setItem('cart', JSON.stringify(cart))
    },
    deleteItem(state, cart) {
      const globalCart = state.cart[store.state.auth.uid].list
      for (const i in globalCart) {
        if (cart.id === i) {
          if (Object.keys(globalCart).length === 1 && globalCart[i].count === 1) {
            localStorage.removeItem('cart')
            state.cart = {}
          } else {
            delete globalCart[i]
            localStorage.setItem('cart', JSON.stringify(state.cart))
          }
        }
      }
      console.log(state.cart)
    }
  }
}
