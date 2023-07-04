import { createStore } from 'vuex'
import counter from './modules/counter'
import token from './modules/token'

const store = createStore({
  modules: {
    counter,
    token
  }
})
export default store

