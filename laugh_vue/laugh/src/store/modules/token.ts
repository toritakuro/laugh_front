export default {
  state: {
      idToken: ""
  },
  mutations: {
    saveIdToken(state, idToken: string) {
      state.idToken = idToken;
    },
    removeToken(state){
      state.token = ""
  }
  },
  getters: {
    getIdToken(state) {
      return state.idToken;
    }
  }
}