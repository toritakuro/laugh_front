export default {
  state() {
    return {
      idToken: ""
    }
  },
  mutations: {
    saveIdToken(state, idToken: string) {
      state.idToken = idToken;
    },
    removeToken(state){
      state.token = ""
  }
  },
  getter: {
    getIdToken(state) {
      return state.idToken;
    }
  }
}