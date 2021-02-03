import axios from 'axios'

const axiosCategories = axios.create({
  baseURL: `${process.env.VUE_APP_DB_BASE}/categories`
})

const axiosProducts = axios.create({
  baseURL: `${process.env.VUE_APP_DB_BASE}/products`
})

export {
  axiosCategories,
  axiosProducts
}
