import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import counter from './modules/counter'
import token from './modules/token'
import message from './modules/message'
import user from './modules/user'

const store = createStore({
  plugins: [
    createPersistedState({
      // 永続化したいモジュールを指定
      paths: ['counter','token','user'],
    }),
  ], 
  modules: {
    counter,
    token,
    message,
    user
  }
})
export default store

