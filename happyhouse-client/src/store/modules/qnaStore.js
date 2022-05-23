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
      state.qna = payload;
    },
  },
  actions: {
    getQnas: ({ commit }, params) => {
      return listQna(
        params,
        ({ data }) => {
          commit("setQnas", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getQna: ({ commit }, qnaNo) => {
      return getQna(
        qnaNo,
        async ({ data }) => {
          await commit("setQna", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    registQna: (context, qna) => {
      return writeQna(
        qna,
        () => {},
        (error) => {
          console.log(error);
        }
      );
    },
    modifyQna: (context, qna) => {
      return modifyQna(
        qna,
        () => {},
        (error) => {
          console.log(error);
        }
      );
    },
    deleteQna: (context, qnaNo) => {
      return deleteQna(
        qnaNo,
        () => {},
        (error) => {
          console.log(error);
        }
      );
    },
    answerQna: (context, qna) => {
      return answerQna(
        qna,
        () => {},
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default qnaStore;
