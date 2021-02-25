import axios from 'axios'
import router from '../router'
import store from '../store'

const axiosDatabase = axios.create({
  baseURL: `${process.env.VUE_APP_DB_BASE}`
})
axiosDatabase.interceptors.response.use(null, (rejected) => {
  if (rejected.response.status === 401) {
    store.commit('auth/logout')
    store.commit('cart/clearCart')
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
