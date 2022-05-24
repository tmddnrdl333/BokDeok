import {
  listHouseInfo,
  listHouseDeal,
  listHouseInfoByFilter,
  listFclt,
} from "@/api/map.js";
const mapStore = {
  namespaced: true,
  state: {
    houseInfos: [],
    dong: null,
    // houseDeals: [],
    selectHouse: {},
    filter: {},

    seniors: [],
    juniors: [],
    etcs: [],
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

    SET_FCLTS(state, payload) {
      state.seniors = [];
      state.juniors = [];
      state.etcs = [];
      for (var item of payload) {
        if (typeof item.fcltKindCd === "number") continue;
        let addrKeyword =
          item.fcltAddr +
          (typeof item.fcltDtl_1Addr != undefined
            ? " " + item.fcltDtl_1Addr
            : "");
        let kind = item.fcltKindCd.substr(0, 2);
        if (kind == "01") state.seniors.push(addrKeyword);
        else if (kind == "02") state.juniors.push(addrKeyword);
        else state.etcs.push(addrKeyword);
      }
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
      return listHouseInfo(
        dongCode,
        (response) => {
          commit("SET_HOUSE_INFOS", { houseInfos: response.data });
        },
        (error) => console.log(error)
      );
    },
    getHouseInfosByFilter({ commit }, data) {
      return listHouseInfoByFilter(
        data,
        (response) => {
          commit("SET_HOUSE_INFOS", { houseInfos: response.data });
        },
        (error) => console.log(error)
      );
    },
    getHouseDeals({ commit }, aptCode) {
      return listHouseDeal(
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

    getFclts: ({ commit }, dongCode) => {
      return listFclt(
        dongCode.substr(0, 4) + "000000",
        ({ data }) => {
          let payload = data.response.body.items.item;
          commit("SET_FCLTS", payload);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default mapStore;
