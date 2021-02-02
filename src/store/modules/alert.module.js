export default {
  namespaced: true,
  state() {
    return {
      alert: null
    }
  },
  getters: {
    isAlert(state) {
      return state.alert
    }
  },
  mutations: {
    setAlert(state, payload) {
      console.log(payload)
      state.alert = payload
    },
    clearAlert(state) {
      state.alert = null
    }
  },
  actions: {
    doAlert({ commit }, payload) {
      console.log(payload)
      commit('setAlert', payload)
      setTimeout(() => {
        commit('clearAlert')
      }, 4000)
    }
  }
}
