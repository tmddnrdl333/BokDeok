import { CctvList, testList } from "@/api/interest";

const interstStore = {
  namespaced: true,
  state: {
    cctvs: [],
    tests: [],
  },
  getters: {},
  mutations: {
    setCctvs(state, payload) {
      state.cctvs = payload;
    },
    setTests(state, payload) {
      state.tests = payload;
    },
  },
  actions: {
    getCctvs: ({ commit }, dongCode) => {
      "",
        CctvList(
          dongCode,
          ({ data }) => {
            commit("setCctvs", data.response.result.featureCollection.features);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    getTests: ({ commit }, dongCode) => {
      "",
        testList(
          dongCode,
          ({ data }) => {
            let status = data.response.status;
            if (status == "OK") {
              commit(
                "setTests",
                data.response.result.featureCollection.features
              );
              console.log(
                dongCode +
                  " " +
                  data.response.result.featureCollection.features.length
              );
            } else commit("setTests", { status });
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
};

export default interstStore;
