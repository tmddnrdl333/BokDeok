import axios from "axios";
const noticeStore = {
  namespaced: true,
  state: { notices: [], notice: {} },
  getters: {},
  mutations: {
    setNotices(state, payload) {
      state.notices = payload.notices;
    },
    setNotice(state, payload) {
      state.notice = payload.notice;
    },
  },
  actions: {
    getNotices({ commit }) {
      axios
        .get("http://127.0.0.1/notice")
        .then(({ data }) => commit(this.setNotices, { notices: data }));
    },
    getNotice(context, payload) {
      axios
        .get(`http://127.0.0.1/notice/${payload.noticeNo}`)
        .then(({ data }) => context.commit(this.setNotice, { notice: data }));
    },
    registNotice(context, payload) {
      return axios
        .post("http://127.0.0.1/notice/auth", {
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
    modifyNotice(context, payload) {
      return axios
        .put(`http://127.0.0.1/notice/auth/${payload.notice.noticeNo}`, {
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
    deleteNotice(context, payload) {
      axios
        .delete(`http://127.0.0.1/notice/auth/${payload.noticeNo}`)
        .then(() => {
          console.log("store : 공지 삭제에 성공하였습니다.");
        });
    },
  },
};

export default noticeStore;
