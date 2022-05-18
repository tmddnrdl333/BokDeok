import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Constant from "@/common/Constant.js";
import axios from "axios";

export default new Vuex.Store({
  state: {
    qnas: [],
    qna: {},
    notices: [],
    notice: {},
  },
  getters: {},
  mutations: {
    [Constant.SET_NOTICES](state, payload) {
      state.notices = payload.notices;
    },
    [Constant.SET_NOTICE](state, payload) {
      state.notice = payload.notice;
    },
    [Constant.SET_QNAS](state, payload) {
      state.qnas = payload.qnas;
    },
    [Constant.SET_QNA](state, payload) {
      state.qna = payload.qna;
    },
  },
  actions: {
    // Notice
    [Constant.GET_NOTICES]({ commit }) {
      axios
        .get("http://127.0.0.1/notice")
        .then(({ data }) => commit(Constant.SET_NOTICES, { notices: data }));
    },
    [Constant.GET_NOTICE](context, payload) {
      axios
        .get(`http://127.0.0.1/notice/${payload.noticeNo}`)
        .then(({ data }) =>
          context.commit(Constant.SET_NOTICE, { notice: data })
        );
    },
    [Constant.REGIST_NOTICE](context, payload) {
      return axios
        .post("http://127.0.0.1/notice", {
          noticeNo: payload.notice.noticeNo,
          userId: payload.notice.userId,
          userName: payload.notice.userName,
          subject: payload.notice.subject,
          content: payload.notice.content,
          regTime: payload.notice.regTime,
        })
        .then(() => {
          console.log("store : 공지 등록에 성공하였습니다.");
        });
    },
    [Constant.MODIFY_NOTICE](context, payload) {
      return axios
        .put(`http://127.0.0.1/qna/${payload.notice.noticeNo}`, {
          noticeNo: payload.notice.noticeNo,
          userId: payload.notice.userId,
          userName: payload.notice.userName,
          subject: payload.notice.subject,
          content: payload.notice.content,
          regTime: payload.notice.regTime,
        })
        .then(() => {
          console.log("store : 공지 수정에 성공하였습니다.");
        });
    },
    [Constant.DELETE_NOTICE](context, payload) {
      axios.delete(`http://127.0.0.1/qna/auth/${payload.noticeNo}`).then(() => {
        console.log("store : 공지 삭제에 성공하였습니다.");
      });
    },
    // QnA
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
    [Constant.REGIST_QNA](context, payload) {
      return axios
        .post("http://127.0.0.1/qna", {
          qnaNo: payload.qna.qnaNo,
          userId: payload.qna.userId,
          userName: payload.qna.userName,
          subject: payload.qna.subject,
          question: payload.qna.question,
          answer: payload.qna.answer,
          regTime: payload.qna.regTime,
        })
        .then(() => {
          console.log("store : 질문 등록에 성공하였습니다.");
        });
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
      axios.delete(`http://127.0.0.1/qna/auth/${payload.qnaNo}`).then(() => {
        console.log("store : 질문 삭제에 성공하였습니다.");
      });
    },
  },
  modules: {},
});
