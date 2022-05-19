import {
  listQna,
  writeQna,
  getQna,
  modifyQna,
  deleteQna,
  answerQna,
} from "@/api/qna";

const qnaStore = {
  namespaced: true,
  state: { qnas: [], qna: {} },
  getters: {},
  mutations: {
    setQnas(state, payload) {
      state.qnas = payload;
    },
    setQna(state, payload) {
      state.qna = payload.qna;
    },
  },
  actions: {
    getQnas: ({ commit }, params) => {
      params,
        listQna(
          null,
          ({ data }) => {
            commit("setQnas", data);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    getQna: ({ commit }, qnaNo) => {
      getQna(
        qnaNo,
        ({ data }) => {
          commit("setQna", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    registQna: (qna) => {
      writeQna(
        qna,
        () => {},
        () => {}
      );
    },
    modifyQna: (qna) => {
      modifyQna(
        qna,
        () => {},
        () => {}
      );
    },
    deleteQna: (qnaNo) => {
      deleteQna(
        qnaNo,
        () => {},
        () => {}
      );
    },
    answerQna: (qna) => {
      answerQna(
        qna,
        () => {},
        () => {}
      );
    },
  },
};

export default qnaStore;
