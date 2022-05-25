const interstAptStore = {
  namespaced: true,
  state: {
    interestApts: [],
  },
  mutations: {
    ADD_INTEREST_APTS: (state, payload) => {
      state.interestApts.push(payload);
    },
    REMOVE_INTEREST_APTS: (state, payload) => {
      state.interestApts = state.interestApts.filter(
        (apt) => apt.houseInfo.aptCode !== payload.aptCode
      );
    },
  },
  actions: {
    addInterestApt({ commit }, houseInfo) {
      commit("ADD_INTEREST_APTS", houseInfo);
    },
    removeInterestApt({ commit }, houseInfo) {
      commit("REMOVE_INTEREST_APTS", houseInfo);
    },
  },
};
export default interstAptStore;
