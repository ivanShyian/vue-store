import axios from 'axios'
import { errorMessage } from '@/utils/error'
import { axiosAuth, axiosDatabase } from '@/axios/request'

const TOKEN_KEY = 'jwt-token'
const USER = 'user-data'
const UID = 'user-id'
const REFRESH = 'jwt-refreshToken'
export default {
  namespaced: true,
  state() {
    return {
      refresh: JSON.parse(localStorage.getItem(REFRESH)),
      user: JSON.parse(localStorage.getItem(USER)),
      uid: localStorage.getItem(UID) ?? 'guest',
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
      return state.user.role
    },
    isAdmin(_, getters) {
      return getters.userRole === 'admin'
    },
    isExpired(state) {
      return new Date() >= state.refresh.expires
    }
  },
  mutations: {
    setToken(state, { idToken, refreshToken, expiresIn }) {
      const expires = new Date(new Date().getTime() + Number(expiresIn) * 1000)
      state.token = idToken
      state.refresh = {
        'r-token': refreshToken,
        expires
      }
      localStorage.setItem(TOKEN_KEY, idToken)
      localStorage.setItem(REFRESH, JSON.stringify(state.refresh))
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
      localStorage.removeItem(REFRESH)
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })

        await dispatch('getUserData', { uid: data.localId, token: data.idToken })
        commit('setToken', data)
      } catch (e) {
        dispatch('alert/doAlert', {
          type: 'danger',
          text: errorMessage(e.response.data.error.message)
        }, { root: true })
        throw new Error()
      }
    },
    async refreshToken({ dispatch, commit, state }) {
      try {
        const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, {
          grant_type: 'refresh_token',
          refresh_token: state.refresh['r-token']
        })
        commit('setToken', { data })
      } catch (e) {
        dispatch('alert/doAlert', {
          type: 'danger',
          text: errorMessage(e.response.data.error.message)
        }, { root: true })
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
