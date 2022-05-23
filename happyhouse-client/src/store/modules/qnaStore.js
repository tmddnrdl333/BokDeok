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
      params,
        listQna(
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
      getQna(
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
        () => {
          console.log("store!!");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    modifyQna: (context, qna) => {
      modifyQna(
        qna,
        () => {},
        (error) => {
          console.log(error);
        }
      );
    },
    deleteQna: (context, qnaNo) => {
      deleteQna(
        qnaNo,
        () => {},
        (error) => {
          console.log(error);
        }
      );
    },
    answerQna: (context, qna) => {
      answerQna(
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
