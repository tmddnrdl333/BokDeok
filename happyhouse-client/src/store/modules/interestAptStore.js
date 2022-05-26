const interstAptStore = {
  namespaced: true,
  state: {
    interestApts: [],
    selectInterest: {},
  },
  mutations: {
    ADD_INTEREST_APTS: (state, payload) => {
      state.interestApts.push(payload);
    },
    REMOVE_INTEREST_APTS: (state, payload) => {
      state.interestApts = state.interestApts.filter(
        (apt) => apt.houseInfo.aptCode !== payload.aptCode
      );
      console.log(state.interestApts);
    },
    SET_SELECT_INTEREST: (state, payload) => {
      state.selectInterest = payload.interest;
    },
    SET_INTEREST_SCORE: (state, payload) => {
      Object.assign(state.interestApts[payload.index], {
        score: payload.score,
      });
    },
    SORT_INTEREST_APTS: (state) => {
      state.interestApts.sort((a, b) => b.score.total - a.score.total);
    },
  },
  actions: {
    addInterestApt({ commit }, payload) {
      commit("ADD_INTEREST_APTS", payload);
    },
    removeInterestApt({ commit }, houseInfo) {
      commit("REMOVE_INTEREST_APTS", houseInfo);
    },
    setSelectInterest({ commit }, interest) {
      commit("SET_SELECT_INTEREST", { interest: interest });
    },
    setInterestScore({ commit }, payload) {
      commit("SET_INTEREST_SCORE", payload);
    },
    sortInterestApts({ commit }) {
      commit("SORT_INTEREST_APTS");
    },
  },
};
export default interstAptStore;
