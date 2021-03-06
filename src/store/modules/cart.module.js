import { axiosDatabase } from '@/axios/request'

export default {
  namespaced: true,
  state() {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) ?? {}
    }
  },
  getters: {
    cart(state) {
      return state.cart
    },
    cartItem: (state) => (idx) => {
      return Object.keys(state.cart).length ? state.cart.list[idx] : false
    },
    cartProductQuantity(state) {
      return Object.keys(state.cart).length ? Object.keys(state.cart.list)
        .map(el => state.cart.list[el].count)
        .reduce((acc, sum) => acc + sum, 0) : null
    }
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart
      localStorage.setItem('cart', JSON.stringify(cart))
    },
    deleteItem(state, cart) {
      const globalCart = state.cart.list
      for (const i in globalCart) {
        if (cart.id === i) {
          if (Object.keys(globalCart).length === 1 && globalCart[cart.id].count === 1) {
            localStorage.removeItem('cart')
            state.cart = {}
          } else {
            delete globalCart[cart.id]
            localStorage.setItem('cart', JSON.stringify(state.cart))
          }
        }
      }
    },
    clearCart(state) {
      state.cart = {}
      localStorage.removeItem('cart')
    }
  },
  actions: {
    async submitPurchase({ rootState }, result) {
      try {
        const cart = {
          name: rootState.auth.user.name,
          list: result.data,
          total: result.amount,
          date: Date.now(),
          uid: rootState.auth.uid,
          email: result.accountId
        }
        await axiosDatabase.post('/orders.json', cart)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
