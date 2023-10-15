const state = {
  userId: "",
  userType: ""
};

const mutations = {
  saveUserId(state, userId: string) {
    state.userId = userId;
  },
  removeUserId(state) {
    state.userId = "";
  },
  saveUserType(state, userType: string) {
    state.userType = userType;
  },
  removeUserType(state) {
    state.userType = "";
  }
};

const getters = {
  getUserId(state) {
    return state.userId;
  },
  getUserType(state) {
    return state.userType;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters // ここにgettersを追加する
};
