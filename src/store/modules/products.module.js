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
      try {
        const { data } = await axiosDatabase.get('/products.json')
        commit('setList', parseDatabase(data))
      } catch (e) {
        console.error(e)
        throw new Error()
      }
    },
    async addProduct({ getters, commit }, product) {
      try {
        const { data } = await axiosDatabase.post(`/products.json?auth=${store.getters['auth/token']}`, product)
        commit('addNewProduct', { ...product, id: data.name })
      } catch (e) {
        console.error(e)
        throw new Error()
      }
    },
    async updateProduct({ commit, state }, product) {
      try {
        if (product.length) {
          product.map(async el => {
            el.count -= el.quantity
            delete el.quantity
            commit('updateList', el)
            await axiosDatabase.put(`/products/${el.id}.json?auth=${store.getters['auth/token']}`, el)
          })
        } else {
          commit('updateList', product)
          await axiosDatabase.put(`/products/${product.id}.json?auth=${store.getters['auth/token']}`, product)
        }
      } catch (e) {
        console.error(e)
        throw new Error()
      }
    },
    async deleteProduct({ commit }, idx) {
      try {
        commit('deleteItem', idx)
        await axiosDatabase.delete(`/products/${idx}.json?auth=${store.getters['auth/token']}`)
      } catch (e) {
        console.error(e)
        throw new Error()
      }
    }
  }
}
