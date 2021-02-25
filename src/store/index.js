import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import alert from './modules/alert.module'
import products from './modules/products.module'
import categories from './modules/categories.module'
import cart from './modules/cart.module'

const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  modules: {
    auth,
    alert,
    products,
    categories,
    cart
  }
})
