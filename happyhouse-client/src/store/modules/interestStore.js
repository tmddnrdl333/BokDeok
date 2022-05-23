import { FcltList } from "@/api/interest";

const interstStore = {
  namespaced: true,
  state: {
    seniors: [],
    juniors: [],
    etcs: [],
  },
  getters: {},
  mutations: {
    setFclts(state, payload) {
      state.seniors = [];
      state.juniors = [];
      state.etcs = [];
      for (var item of payload) {
        if (typeof item.fcltKindCd === "number") continue;
        let kind = item.fcltKindCd.substr(0, 2);
        console.log(kind == "01");
        if (kind == "01") state.seniors.push(item);
        else if (kind == "02") state.juniors.push(item);
        else state.etcs.push(item);
      }
      console.log(state.seniors);
      console.log(state.juniors);
      console.log(state.etcs);
    },
  },
  actions: {
    getFclts: ({ commit }, dongCode) => {
      "",
        FcltList(
          dongCode,
          ({ data }) => {
            let payload = data.response.body.items.item;
            commit("setFclts", payload);
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
};

export default interstStore;
