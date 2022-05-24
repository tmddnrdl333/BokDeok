const interstAptStore = {
  namespaced: true,
  state: {
    interestApts: [],
  },
  mutations: {
    ADD_INTEREST_APTS: (state, payload) => {
      state.interestApts.push(payload.aptCode);
    },
    REMOVE_INTEREST_APTS: (state, payload) => {
      state.interestApts = state.interestApts.filter(
        (apt) => apt !== payload.aptCode
      );
    },
  },
  actions: {
    addInterestApt({ commit }, aptCode) {
      commit("ADD_INTEREST_APTS", aptCode);
    },
    removeInterestApt({ commit }, aptCode) {
      commit("REMOVE_INTEREST_APTS", aptCode);
    },
  },
};
export default interstAptStore;
