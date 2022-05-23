import {
  listHouseInfo,
  listHouseDeal,
  listHouseInfoByFilter,
} from "@/api/map.js";
const mapStore = {
  namespaced: true,
  state: {
    houseInfos: [],
    dong: null,
    // houseDeals: [],
    selectHouse: {},
    filter: {},
  },
  getters: {},
  mutations: {
    SET_DONG(state, payload) {
      state.dong = payload.dong;
    },
    SET_HOUSE_INFOS(state, payload) {
      state.houseInfos = payload.houseInfos;
    },
    SET_HOUSE_DEALS(state, payload) {
      state.selectHouse.houseDeals = payload.houseDeals;
    },
    SET_SELECT_HOUSE(state, payload) {
      state.selectHouse.houseInfo = payload.houseInfo;
    },
    SET_FILTER(state, payload) {
      state.filter = payload.filter;
    },
  },
  actions: {
    clearMap({ commit }) {
      console.log("CLEAR MAP");
      commit("SET_DONG", { dong: {} });
      commit("SET_HOUSE_INFOS", { houseInfos: [] });
      commit("SET_FILTER", { filter: { price: [0, 1200000], area: [0, 500] } });
    },
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
    getHouseInfosByFilter({ commit }, data) {
      listHouseInfoByFilter(
        data,
        (response) => {
          commit("SET_HOUSE_INFOS", { houseInfos: response.data });
        },
        (error) => console.log(error)
      );
    },
    getHouseDeals({ commit }, aptCode) {
      listHouseDeal(
        aptCode,
        (response) => {
          commit("SET_HOUSE_DEALS", {
            houseDeals: response.data,
            // houseInfo: payload.houseInfo,
          });
        },
        (error) => console.log(error)
      );
    },
    getSelectHouse({ commit }, houseInfo) {
      commit("SET_SELECT_HOUSE", { houseInfo: houseInfo });
    },
    getFilter({ commit }, filter) {
      commit("SET_FILTER", { filter: filter });
    },
  },
};

export default mapStore;
