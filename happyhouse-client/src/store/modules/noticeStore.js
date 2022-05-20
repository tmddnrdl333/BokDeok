import {
  listNotice,
  writeNotice,
  getNotice,
  modifyNotice,
  deleteNotice,
} from "@/api/notice";

const noticeStore = {
  namespaced: true,
  state: { notices: [], notice: {} },
  getters: {},
  mutations: {
    setNotices(state, payload) {
      state.notices = payload;
    },
    setNotice(state, payload) {
      state.notice = payload;
    },
  },
  actions: {
    getNotices: ({ commit }, params) => {
      params,
        listNotice(
          params,
          ({ data }) => {
            commit("setNotices", data);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    getNotice: ({ commit }, noticeNo) => {
      getNotice(
        noticeNo,
        ({ data }) => {
          commit("setNotice", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    registNotice: (context, notice) => {
      writeNotice(
        notice,
        () => {},
        (error) => {
          console.log(error);
        }
      );
    },
    modifyNotice: (context, notice) => {
      modifyNotice(
        notice,
        () => {},
        (error) => {
          console.log(error);
        }
      );
    },
    deleteNotice: (context, noticeNo) => {
      deleteNotice(
        noticeNo,
        () => {},
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default noticeStore;
