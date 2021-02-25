import axios from 'axios'
import { errorMessage } from '@/utils/error'
import { axiosAuth, axiosDatabase } from '@/axios/request'

const TOKEN_KEY = 'jwt-token'
const USER = 'user-data'
const UID = 'local-id'
export default {
  namespaced: true,
  state() {
    return {
      user: JSON.parse(localStorage.getItem(USER)),
      token: localStorage.getItem(TOKEN_KEY),
      uid: localStorage.getItem(UID) ?? 'guest'
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
      return state.user.role
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
      const { uid, ...userData } = user
      state.user = userData
      state.uid = uid
      localStorage.setItem(USER, JSON.stringify(userData))
      localStorage.setItem(UID, uid)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER)
      localStorage.removeItem(UID)
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        await dispatch('getUserData', { uid: data.localId, token: data.idToken })
        commit('setToken', data.idToken)
      } catch (e) {
        dispatch('alert/doAlert', {
          type: 'danger',
          text: errorMessage(e.response.data.error.message)
        }, { root: true })
        throw new Error()
      }
    },
    async getUserData({ commit, dispatch }, payload) {
      try {
        const { data } = await axiosAuth.get(`/${payload.uid}.json?auth=${payload.token}`)
        commit('setUser', {
          uid: payload.uid,
          role: data.role,
          name: data.name,
          email: data.email
        })
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

        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, { ...userData, returnSecureToken: true })

        await dispatch('registerDBase', {
          uid: data.localId,
          token: data.idToken,
          email: payload.email,
          name
        })

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
        throw new Error()
      }
    },
    async registerDBase({ dispatch }, payload) {
      try {
        await axiosDatabase.put(`/users/${payload.uid}.json?auth=${payload.token}`, {
          name: payload.name,
          email: payload.email,
          role: 'user'
        })
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
