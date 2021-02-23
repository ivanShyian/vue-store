import axios from 'axios'
import router from '../router'

const axiosDatabase = axios.create({
  baseURL: `${process.env.VUE_APP_DB_BASE}`
})
axiosDatabase.interceptors.response.use(null, (rejected) => {
  if (rejected.response.status === 401) {
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
