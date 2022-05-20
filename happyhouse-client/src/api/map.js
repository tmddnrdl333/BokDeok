import { apiInstance } from "./index.js";

const api = apiInstance();

function listHouseInfo(dongCode, success, fail) {
  api
    .get(`/map/apt`, { params: { dong: dongCode } })
    .then(success)
    .catch(fail);
}

// function listDong(param, success, fail) {
//   api.get(`/map/dong`, { params: param }).then(success).catch(fail);
// }

// function listApt(param, success, fail) {
//   api.get(`/map/apt`, { params: param }).then(success).catch(fail);
// }

// function getApt(param, success, fail) {
//   api.get(`/house/${aptNo}`, { params: param }).then(success).catch(fail);
// }

export { listHouseInfo };
