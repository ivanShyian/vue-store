import axios from 'axios'
import { errorMessage } from '@/utils/error'
import { axiosAuth } from '@/axios/request'
const TOKEN_KEY = 'jwt-token'
const USER = 'user-role'
export default {
  namespaced: true,
  state() {
    return {
      role: localStorage.getItem(USER),
      token: localStorage.getItem(TOKEN_KEY),
      uid: localStorage.getItem('uid') ?? 'guest'
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
    },
    isAdmin(_, getters) {
      return getters.userRole === 'admin'
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    setUser(state, user) {
      state.role = user.role
      state.uid = user.uid
      localStorage.setItem(USER, user.role)
      localStorage.setItem('uid', user.uid)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER)
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        const res = await axiosAuth.get(`/${data.localId}.json?auth=${data.idToken}`)
        commit('setUser', { role: res.data.role, uid: data.localId })
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
