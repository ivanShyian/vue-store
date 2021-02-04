import { axiosProducts } from '@/axios/request'

export default {
  namespaced: true,
  state() {
    return {
      productList: []
    }
  },
  getters: {
    products(state) {
      return state.productList
    }
  },
  mutations: {
    setList(state, payload) {
      state.productList = payload
    }
  },
  actions: {
    async getProducts({ commit }) {
      const { data } = await axiosProducts.get('')
      commit('setList', data)
    }
  }
}
