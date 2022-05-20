import { apiInstance } from "./index.js";

const api = apiInstance();

function listQna(param, success, fail) {
  api.get(`/qna`, { params: param }).then(success).catch(fail);
}

function writeQna(qna, success, fail) {
  api.post(`/qna/regist`, JSON.stringify(qna)).then(success).catch(fail);
}

function getQna(qnaNo, success, fail) {
  api.get(`/qna/${qnaNo}`).then(success).catch(fail);
}

function modifyQna(qna, success, fail) {
  api.put(`/qna/${qna.qnaNo}`, JSON.stringify(qna)).then(success).catch(fail);
}

function deleteQna(qnaNo, success, fail) {
  api.delete(`/qna/${qnaNo}`).then(success).catch(fail);
}

function answerQna(qna, success, fail) {
  api
    .put(`/qna/answer/${qna.qnaNo}`, JSON.stringify(qna))
    .then(success)
    .catch(fail);
}

export { listQna, writeQna, getQna, modifyQna, deleteQna, answerQna };
