import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import alert from './modules/alert.module'
import products from './modules/products.module'
import categories from './modules/categories.module'

const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state() {
    return {}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    alert,
    products,
    categories
  }
})
