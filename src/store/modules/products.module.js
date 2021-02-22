import { axiosDatabase } from '@/axios/request'
import { parseDatabase } from '@/utils/parser'
import store from '../index'

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
    },
    product: (state) => (idx) => {
      return state.productList.find(el => el.id === idx)
    }
  },
  mutations: {
    setList(state, payload) {
      state.productList = payload
    },
    addNewProduct(state, newProduct) {
      state.productList.push(newProduct)
    },
    updateList: function (state, product) {
      state.productList = state.productList.map(el => {
        if (el.id === product.id) {
          el = product
        }
        return el
      })
    },
    deleteItem(state, idx) {
      state.productList = state.productList.map(item => item.id !== idx)
    }
  },
  actions: {
    async loadProducts({ commit }) {
      const { data } = await axiosDatabase.get(`/products.json?auth=${store.getters['auth/token']}`)
      commit('setList', parseDatabase(data))
    },
    async addProduct({ getters, commit }, product) {
      const { data } = await axiosDatabase.post(`/products.json?auth=${store.getters['auth/token']}`, product)
      commit('addNewProduct', { ...product, id: data.name })
    },
    async updateProduct({ commit, state }, product) {
      commit('updateList', product)
      await axiosDatabase.put(`/products/${product.id}.json?auth=${store.getters['auth/token']}`, product)
    },
    async deleteProduct({ commit }, idx) {
      commit('deleteItem', idx)
      await axiosDatabase.delete(`/products/${idx}.json?auth=${store.getters['auth/token']}`)
    }
  }
}
