import axios from 'axios'
import router from '../router'
import store from '../store'

const axiosDatabase = axios.create({
  baseURL: `${process.env.VUE_APP_DB_BASE}`
})

axiosDatabase.interceptors.request.use(async config => {
  if (!store.getters['auth/isAuthenticated']) {
    return config
  }
  if (store.getters['auth/isExpired']) {
    await store.dispatch('auth/refreshToken')
  }
  return config
})
axiosDatabase.interceptors.response.use(null, rejected => {
  console.dir(rejected)
  if (rejected.response.status === 401) {
    store.commit('auth/logout')
    router.push('/auth?message=auth')
  }
  return Promise.reject(rejected)
})

const axiosAuth = axios.create({
  baseURL: `${process.env.VUE_APP_DB_BASE}/users`
})

export {
  axiosDatabase,
  axiosAuth
}
