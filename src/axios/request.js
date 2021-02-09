import axios from 'axios'

const axiosCategories = axios.create({
  baseURL: `${process.env.VUE_APP_DB_BASE}/categories`
})

const axiosProducts = axios.create({
  baseURL: `${process.env.VUE_APP_DB_BASE}/products`
})

const axiosAuth = axios.create({
  baseURL: `${process.env.VUE_APP_FB_DATA}/users`
})

export {
  axiosCategories,
  axiosProducts,
  axiosAuth
}
