const state = {
  idToken: ""
};

const mutations = {
  saveIdToken(state, idToken: string) {
    state.idToken = idToken;
  },
  removeToken(state) {
    state.token = "";
  }
};

const getters = {
  getIdToken(state) {
    return state.idToken;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters // ここにgettersを追加する
};
