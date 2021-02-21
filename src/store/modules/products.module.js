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
      state.productList.unshift(newProduct)
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
      const { data } = await axiosProducts.get('')
      commit('setList', data)
    },
    async addProduct({ getters, commit }, product) {
      product = {
        ...product,
        id: (getters.products.length + 1).toString()
      }
      commit('addNewProduct', product)
      await axiosProducts.post('', product)
    },
    async updateProduct({ commit, state }, product) {
      commit('updateList', product)
      await axiosProducts.put(`/${product.id}`, product)
    },
    async deleteProduct({ commit }, idx) {
      commit('deleteItem', idx)
      await axiosProducts.delete(`/${idx}`)
    }
  }
}
