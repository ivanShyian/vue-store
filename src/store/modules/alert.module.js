export default {
  namespaced: true,
  state() {
    return {
      alert: null // type: null && text: null
    }
  },
  getters: {
    isAlert(state) {
      return state.alert
    }
  },
  mutations: {
    setAlert(state, payload) {
      state.alert = payload
    },
    clearAlert(state) {
      state.alert = null
    }
  },
  actions: {
    doAlert({ commit }, payload) {
      commit('setAlert', payload)
      setTimeout(() => {
        commit('clearAlert')
      }, 4000)
    }
  }
}
