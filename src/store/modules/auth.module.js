import axios from 'axios'
const TOKEN_KEY = 'jwt-token'

export default {
  namespaced: true,
  state() {
    return {}
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(_, getters) {
      return !!getters.token
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  actions: {
    async login(context, payload) {
      try {
        console.log(process.env.VUE_API_FB_KEY)
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        context.commit('setToken', data.idToken)
      } catch (e) {
        console.log(e.message)
      }
    }
  }
}
