import { CctvList, testList, SclfcltList } from "@/api/interest";

const interstStore = {
  namespaced: true,
  state: {
    cctvs: [],
    tests: [],
    sclfclts: [],
  },
  getters: {},
  mutations: {
    setCctvs(state, payload) {
      state.cctvs = payload;
    },
    setTests(state, payload) {
      state.tests = payload;
    },
    setSclfclts(state, payload) {
      state.sclfclts = payload;
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
    getSclfclts: ({ commit }, dongCode) => {
      "",
        SclfcltList(
          dongCode,
          ({ data }) => {
            console.log(dongCode);
            console.log(data.response.body.items.item);
            commit("setSclfclts", data.response.body.items.item);
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
};

export default interstStore;
