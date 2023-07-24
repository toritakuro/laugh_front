import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import counter from './modules/counter'
import token from './modules/token'
import message from './modules/message'

const store = createStore({
  plugins: [
    createPersistedState({
      // 永続化したいモジュールを指定
      paths: ['counter','token'],
    }),
  ], 
  modules: {
    counter,
    token,
    message
  }
})
export default store

