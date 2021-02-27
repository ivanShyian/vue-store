import { axiosDatabase } from '@/axios/request'
import { parseDatabase } from '@/utils/parser'

export default {
  namespaced: true,
  state() {
    return {
      orders: []
    }
  },
  getters: {
    orders(state) {
      console.log(state.orders)
      return state.orders
    }
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders
    }
  },
  actions: {
    async loadOrders({ rootGetters, commit }) {
      try {
        const { data } = await axiosDatabase.get(`/orders.json?auth=${rootGetters['auth/token']}`)
        if (!data) {
          throw new Error('Заказы отсутсвуют')
        }
        commit('setOrders', parseDatabase(data))
      } catch (e) {
        console.warn(e.message)
      }
    }
  }
}
