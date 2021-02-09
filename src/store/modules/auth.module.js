import axios from 'axios'
import { errorMessage } from '@/utils/error'
import { axiosAuth } from '@/axios/request'
const TOKEN_KEY = 'jwt-token'
export default {
  namespaced: true,
  state() {
    return {
      role: '',
      token: localStorage.getItem(TOKEN_KEY)
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(_, getters) {
      return !!getters.token
    },
    userRole(state) {
      return state.role
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
    },
    setRole(state, role) {
      state.role = role
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        const res = await axiosAuth.get(`/${data.localId}.json?auth=${data.idToken}`)
        commit('setRole', res.data.role)
        commit('setToken', data.idToken)
      } catch (e) {
        dispatch('alert/doAlert', {
          type: 'danger',
          text: errorMessage(e.response.data.error.message)
        }, { root: true })
        throw new Error()
      }
    }
  }
}
