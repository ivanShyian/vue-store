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
    }
  },
  actions: {
    async loadCategories({ commit }) {
      const { data } = await axiosCategories.get('')
      commit('setCategories', data)
    }
  }
}
