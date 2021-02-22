import { axiosDatabase } from '@/axios/request'
import { parseDatabase } from '@/utils/parser'
import store from '../index'

export default {
  namespaced: true,
  state() {
    return {
      categories: []
    }
  },
  getters: {
    categories(state) {
      return state.categories
    }
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload
    },
    addNewCategory(state, category) {
      state.categories.push(category)
    },
    delCategory(state, del) {
      state.categories = state.categories.filter(item => item !== del)
    }
  },
  actions: {
    async loadCategories({ commit }) {
      const { data } = await axiosDatabase.get(`/categories.json?auth=${store.getters['auth/token']}`)
      commit('setCategories', parseDatabase(data))
    },
    async addCategory({ getters, commit }, category) {
      const { data } = await axiosDatabase.post(`/categories.json?auth=${store.getters['auth/token']}`, category)
      commit('addNewCategory', { ...category, id: data.name })
    },
    async deleteCategory({ getters, commit }, idx) {
      const toDelete = getters.categories.find(cat => cat.id === idx)
      commit('delCategory', toDelete)
      await axiosDatabase.delete(`/categories/${toDelete.id}.json?auth=${store.getters['auth/token']}`)
    }
  }
}
