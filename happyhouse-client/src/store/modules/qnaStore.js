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
    registQna: (context, qna) => {
      writeQna(
        qna,
        ({ data }) => {
          console.log(data);
        },
        (error) => {
          console.log("error 발생");
          console.log(error);
        }
      );
    },
    modifyQna: (context, qna) => {
      modifyQna(
        qna,
        ({ data }) => {
          console.log(data);
        },
        (error) => {
          console.log("error" + error);
        }
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
