import { apiInstance } from "./index.js";

const api = apiInstance();

function listNotice(param, success, fail) {
  return api.get(`/notice`, { params: param }).then(success).catch(fail);
}

function writeNotice(notice, success, fail) {
  return api
    .post(`/notice/regist`, JSON.stringify(notice))
    .then(success)
    .catch(fail);
}

function getNotice(noticeNo, success, fail) {
  return api.get(`/notice/${noticeNo}`).then(success).catch(fail);
}

function modifyNotice(notice, success, fail) {
  return api
    .put(`/notice/${notice.noticeNo}`, JSON.stringify(notice))
    .then(success)
    .catch(fail);
}

function deleteNotice(noticeNo, success, fail) {
  return api.delete(`/notice/${noticeNo}`).then(success).catch(fail);
}

export { listNotice, writeNotice, getNotice, modifyNotice, deleteNotice };
