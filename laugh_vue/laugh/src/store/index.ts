import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import counter from './modules/counter'
import tokenModule from './modules/token'

const store = createStore({
  plugins: [
    createPersistedState({
      // 永続化したいモジュールを指定
      paths: ['counter','token'],
    }),
  ], 
  modules: {
    counter,
    token: tokenModule
  }
})
export default store

