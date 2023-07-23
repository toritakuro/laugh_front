export default {
  state() {
    return {
      message: '',
      isMessageVisible: false,
    }
  },
  mutations: {
    increment(state, payload) {
      state.message = payload.message;
      state.isMessageVisible = true;
    }
  }
}