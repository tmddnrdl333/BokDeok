const interstAptStore = {
  namespaced: true,
  state: {
    interestApts: [],
  },
  mutations: {
    ADD_INTEREST_APTS: (state, payload) => {
      state.interestApts.push(payload);
      console.log(state.interestApts);
    },
    REMOVE_INTEREST_APTS: (state, payload) => {
      state.interestApts = state.interestApts.filter(
        (apt) => apt.houseInfo.aptCode !== payload.aptCode
      );
      console.log(state.interestApts);
    },
  },
  actions: {
    addInterestApt({ commit }, { houseInfo, nearestFclts }) {
      commit("ADD_INTEREST_APTS", { houseInfo, nearestFclts });
    },
    removeInterestApt({ commit }, houseInfo) {
      commit("REMOVE_INTEREST_APTS", houseInfo);
    },
  },
};
export default interstAptStore;
