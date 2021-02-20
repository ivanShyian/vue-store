import { axiosCategories } from '@/axios/request'

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
      const { data } = await axiosCategories.get('')
      commit('setCategories', data)
    },
    async addCategory({ getters, commit }, category) {
      category = {
        ...category,
        id: (getters.categories.length + 1).toString()
      }
      commit('addNewCategory', category)
      const { data } = await axiosCategories.post('', category)
      console.log(data)
    },
    async deleteCategory({ getters, commit }, idx) {
      const toDelete = getters.categories.find(cat => cat.id === idx)
      commit('delCategory', toDelete)
      await axiosCategories.delete(`/${toDelete.id}`)
    }
  }
}
