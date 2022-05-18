import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Constant from "@/common/Constant.js";
import axios from "axios";

export default new Vuex.Store({
  state: {
    qnas: [],
    qna: {},
  },
  getters: {},
  mutations: {
    [Constant.SET_QNAS](state, payload) {
      state.qnas = payload.qnas;
    },
    [Constant.SET_QNA](state, payload) {
      state.qna = payload.qna;
    },
  },
  actions: {
    [Constant.GET_QNAS]({ commit }) {
      axios
        .get("http://127.0.0.1/qna")
        .then(({ data }) => commit(Constant.SET_QNAS, { qnas: data }));
    },
    [Constant.GET_QNA](context, payload) {
      axios
        .get(`http://127.0.0.1/qna/${payload.qnaNo}`)
        .then(({ data }) => context.commit(Constant.SET_QNA, { qna: data }));
    },
    [Constant.MODIFY_QNA](context, payload) {
      return axios
        .put(`http://127.0.0.1/qna/${payload.qna.qnaNo}`, {
          qnaNo: payload.qna.qnaNo,
          userId: payload.qna.userId,
          userName: payload.qna.userName,
          subject: payload.qna.subject,
          question: payload.qna.question,
          answer: payload.qna.answer,
          regTime: payload.qna.regTime,
        })
        .then(() => {
          console.log("store : 질문 수정에 성공하였습니다.");
        });
    },
    [Constant.DELETE_QNA](context, payload) {
      axios.delete(`http://127.0.0.1/qna/auth/${payload.qnaNo}`);
    },
  },
  modules: {},
});
