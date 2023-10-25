const state = {
  userId: "",
  userType: "",
  userName: ""
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
  },
  saveUserName(state, userName: string) {
    state.userName = userName;
  },
  removeUserName(state) {
    state.userName = "";
  }
};

const getters = {
  getUserId(state) {
    return state.userId;
  },
  getUserType(state) {
    return state.userType;
  },
  getUserName(state) {
    return state.userName;
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  getters // ここにgettersを追加する
};
