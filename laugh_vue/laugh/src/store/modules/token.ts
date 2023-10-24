const state = {
  idToken: "",
  refreshToken: "",
};

const mutations = {
  saveIdToken(state, idToken: string) {
    state.idToken = idToken;
  },
  saveRefreshToken(state, refreshToken: string) {
    state.refreshToken = refreshToken;
  },
  removeToken(state) {
    state.idToken = "";
  }
};

const getters = {
  getIdToken(state) {
    return state.idToken;
  },
  getRefreshToken(state) {
    return state.refreshToken;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters // ここにgettersを追加する
};
