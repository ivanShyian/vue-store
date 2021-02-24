import axios from 'axios'
import { errorMessage } from '@/utils/error'
import { axiosAuth, axiosDatabase } from '@/axios/request'
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
        await dispatch('getUserRole', { uid: data.localId, token: data.idToken })
        commit('setToken', data.idToken)
      } catch (e) {
        dispatch('alert/doAlert', {
          type: 'danger',
          text: errorMessage(e.response.data.error.message)
        }, { root: true })
        throw new Error()
      }
    },
    async getUserRole({ commit, dispatch }, payload) {
      try {
        const { data } = await axiosAuth.get(`/${payload.uid}.json?auth=${payload.token}`)
        commit('setUser', { role: data.role, uid: payload.uid })
      } catch (e) {
        dispatch('alert/doAlert', {
          type: 'danger',
          text: errorMessage(e.response.data.error.message)
        }, { root: true })
        throw new Error()
      }
    },
    async register({ state, commit, dispatch }, payload) {
      try {
        const { name, ...userData } = payload
        // fb register
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, { ...userData, returnSecureToken: true })
        // then put user data to database
        await axiosDatabase.put(`/users/${data.localId}.json?auth=${data.idToken}`, { name, role: 'user' })
        // then login user
        await dispatch('login', userData)
        dispatch('alert/doAlert', {
          type: 'primary',
          text: 'Вы были успешно зарегестрированы'
        }, { root: true })
      } catch (e) {
        dispatch('alert/doAlert', {
          type: 'danger',
          text: errorMessage(e.response.data.error.message)
        }, { root: true })
      }
    }
  }
}
