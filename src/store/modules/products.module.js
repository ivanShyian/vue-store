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
    },
    addNewProduct(state, newProduct) {
      state.productList.unshift(newProduct)
    }
  },
  actions: {
    async loadProducts({ commit }) {
      const { data } = await axiosProducts.get('')
      commit('setList', data)
    },
    async addProduct({ getters, commit }, product) {
      product = {
        ...product,
        id: (getters.products.length + 1).toString()
      }
      commit('addNewProduct', product)
      const { data } = await axiosProducts.post('', product)
      console.log(data)
    }
  }
}
