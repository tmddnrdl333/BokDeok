import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import memberStore from "@/store/modules/memberStore.js";
import noticeStore from "@/store/modules/noticeStore.js";
import qnaStore from "@/store/modules/qnaStore.js";
import interstStore from "@/store/modules/interestStore";
import mapStore from "@/store/modules/mapStore";

export default new Vuex.Store({
  modules: {
    memberStore,
    noticeStore,
    qnaStore,
    interstStore,
    mapStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
