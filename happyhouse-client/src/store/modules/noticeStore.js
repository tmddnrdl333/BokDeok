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
      return listNotice(
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
      return getNotice(
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
      return writeNotice(
        notice,
        () => {},
        (error) => {
          console.log(error);
        }
      );
    },
    modifyNotice: (context, notice) => {
      return modifyNotice(
        notice,
        () => {},
        (error) => {
          console.log(error);
        }
      );
    },
    deleteNotice: (context, noticeNo) => {
      return deleteNotice(
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
