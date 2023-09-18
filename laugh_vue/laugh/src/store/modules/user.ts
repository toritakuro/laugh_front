const state = {
  userId: ""
};

const mutations = {
  saveUserId(state, userId: string) {
    state.userId = userId;
  },
  removeUserId(state) {
    state.userId = "";
  }
};

const getters = {
  getUserId(state) {
    return state.userId;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters // ここにgettersを追加する
};
