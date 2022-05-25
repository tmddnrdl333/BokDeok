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
    selectHouse: {},
    filter: {},

    seniors: [],
    juniors: [],
    etcs: [],

    fcltCoords: [[], [], []],
  },
  getters: {},
  mutations: {
    SET_DONG(state, payload) {
      state.dong = payload.dong;
    },
    SET_HOUSE_INFOS(state, payload) {
      console.log(payload);
      state.houseInfos = payload.houseInfos;
    },
    SET_HOUSE_DEALS(state, payload) {
      state.selectHouse.houseDeals = payload.houseDeals;
    },
    SET_SELECT_HOUSE(state, payload) {
      state.selectHouse = payload;
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
        let fcltName = item.fcltNm;
        let fcltDto = { addrKeyword, fcltName };
        let kind = item.fcltKindCd.substr(0, 2);
        if (kind == "01") state.seniors.push(fcltDto);
        else if (kind == "02") state.juniors.push(fcltDto);
        else if (kind == "03") state.etcs.push(fcltDto);
      }
      console.log(
        "S:" +
          state.seniors.length +
          "\nJ:" +
          state.juniors.length +
          "\nE:" +
          state.etcs.length
      );
    },
    SET_FCLT_COORDS(state, payload) {
      state.fcltCoords = payload;
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
    setSelectHouse({ commit }, houseInfo) {
      commit("SET_SELECT_HOUSE", { houseInfo: houseInfo });
    },
    setFilter({ commit }, filter) {
      commit("SET_FILTER", { filter: filter });
    },

    getFclts: ({ commit }, dongCode) => {
      let gugunCode = dongCode.substr(0, 4) + "000000";
      return listFclt(
        gugunCode,
        ({ data }) => {
          let payload = data.response.body.items.item;
          commit("SET_FCLTS", payload);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    storeFcltCoords: ({ commit }, { origin, allFclts }) => {
      let fcltCoordsArr = [allFclts[0], allFclts[1], allFclts[2]];
      let commitArr = [[], [], []];
      // console.log(origin);
      // console.log(fcltCoordsArr);
      for (let key in fcltCoordsArr) {
        let nearest = new Map();
        for (let i in fcltCoordsArr[key]) {
          let element = fcltCoordsArr[key][i];
          let dist =
            Math.sqrt(
              (111 * (element.result.y - origin[0])) ** 2 +
                (((Math.cos((origin[0] * Math.PI) / 180) * 6400 * 2 * 3.14) /
                  360) *
                  (element.result.x - origin[1])) **
                  2
            ) * 1000;
          nearest.set(dist, allFclts[key][i]);
        }
        let resultArr = [...nearest];
        resultArr.sort(function (a, b) {
          return a[0] - b[0];
        });
        commitArr[key] = resultArr.slice(0, 3);
      }
      commit("SET_FCLT_COORDS", commitArr);
    },
  },
};

export default mapStore;
