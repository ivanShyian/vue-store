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
    orders: state => value => {
      return state.orders.filter(el => {
        if (value.length && Object.keys(el).includes('status')) {
          return el && el.status === value
        }
        if (!value.length) {
          return el && !el.status
        }
      })
    },
    oneOrder: state => idx => {
      return state.orders.find(o => o.id === idx)
    }
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders
    },
    changeStatus(state, data) {
      state.orders = state.orders.map(el => {
        if (el.id === data.id) {
          el.status = data.status
        }
        return el
      })
    },
    delOrder(state, idx) {
      state.orders = state.orders.map(e => e.id !== idx)
    }
  },
  actions: {
    async loadOrders({ commit }) {
      try {
        const { data } = await axiosDatabase.get('/orders.json')
        if (!data) {
          throw new Error('Заказы отсутсвуют')
        }
        commit('setOrders', parseDatabase(data))
      } catch (e) {
        console.warn(e.message)
      }
    },
    async changeOrderStatus({ commit }, data) {
      try {
        await axiosDatabase.patch(`/orders/${data.id}.json`, { status: data.status })
        commit('changeStatus', data)
      } catch (e) {
        console.warn(e)
      }
    },
    async deleteOrder({ rootGetters, commit }, idx) {
      try {
        await axiosDatabase.delete(`/orders/${idx}.json`)
        commit('delOrder', idx)
      } catch (e) {
        console.warn(e)
      }
    }
  }
}
