import { listHouseInfo } from "@/api/map.js";
const mapStore = {
  namespaced: true,
  state: { houseInfos: [], dong: null, houseDeal: [], filter: [] },
  getters: {},
  mutations: {
    SET_DONG(state, payload) {
      state.dong = payload.dong;
    },
    SET_HOUSE_INFOS(state, paylaod) {
      state.houseInfos = paylaod.houseInfos;
    },
  },
  actions: {
    searchDong({ commit }, payload) {
      commit("SET_DONG", {
        dong: { dongCode: payload.dongCode, fullName: payload.fullName },
      });
    },
    getHouseInfos({ commit }, dongCode) {
      listHouseInfo(
        dongCode,
        (response) => {
          commit("SET_HOUSE_INFOS", { houseInfos: response.data });
        },
        (error) => console.log(error)
      );
    },
  },
};

export default mapStore;
