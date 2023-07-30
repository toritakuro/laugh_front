const state = {
    messages: [],
    isMessageVisible: false,
    result: 'success'
};
const mutations = {
  setMessage(state, messages:[]) {
    state.messages = [...messages];
    state.isMessageVisible = true;
  },
  hideMessage(state) {
    state.messages = [];
    state.isMessageVisible = false;
  },
  setResult(state, result:'') {
    state.result = result;
  }
};
const actions = {
  showMessage ({ commit }, obj) {
    commit('setMessage', obj.messages);
    commit('setResult', obj.result);
      setTimeout(() => {
        commit('hideMessage');
      }, 3000)
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};