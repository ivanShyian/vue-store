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
      try {
        const { data } = await axiosDatabase.get('/categories.json')
        if (!data) {
          throw new Error('Категории отсутствуют')
        }
        commit('setCategories', parseDatabase(data))
      } catch (e) {
        console.error(e)
        await store.dispatch('alert/doAlert', {
          type: 'warning',
          text: e.message
        }, { root: true })
      }
    },
    async addCategory({ getters, commit }, category) {
      try {
        const { data } = await axiosDatabase.post(`/categories.json?auth=${store.getters['auth/token']}`, category)
        commit('addNewCategory', { ...category, id: data.name })
      } catch (e) {
        console.error(e)
        throw new Error()
      }
    },
    async deleteCategory({ getters, commit }, idx) {
      try {
        const toDelete = getters.categories.find(cat => cat.id === idx)
        commit('delCategory', toDelete)
        await axiosDatabase.delete(`/categories/${toDelete.id}.json?auth=${store.getters['auth/token']}`)
      } catch (e) {
        console.error(e)
        throw new Error()
      }
    }
  }
}
