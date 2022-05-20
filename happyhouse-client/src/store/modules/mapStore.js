// import { listDong } from "@/api/member.js";
const mapStore = {
  namespaced: true,
  state: { houseInfos: [], dong: null, houseDeal: [], filter: [] },
  getters: {},
  mutations: {
    SET_HOUSE_INFO(state, paylaod) {
      state.houseInfos = paylaod.houseInfos;
    },
  },
  actions: {},
};
