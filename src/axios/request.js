import axios from 'axios'

const axiosDatabase = axios.create({
  baseURL: `${process.env.VUE_APP_DB_BASE}`
})

const axiosAuth = axios.create({
  baseURL: `${process.env.VUE_APP_DB_BASE}/users`
})

export {
  axiosDatabase,
  axiosAuth
}
