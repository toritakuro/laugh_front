import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import counter from './modules/counter'
import token from './modules/token'

const store = createStore({
  plugins: [createPersistedState()], 
  modules: {
    counter,
    token
  }
})
export default store

