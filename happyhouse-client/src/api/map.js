import { apiInstance, fcltInstance } from "./index.js";

const api = apiInstance();

function listHouseInfo(dongCode, success, fail) {
  api
    .get(`/map/apt`, { params: { dong: dongCode } })
    .then(success)
    .catch(fail);
}

function listHouseInfoByFilter(data, success, fail) {
  api
    .get(`/map/apt/filter`, {
      params: {
        dong: data.dongCode,
        priceleft: data.filter.price[0],
        priceright: data.filter.price[1],
        arealeft: data.filter.area[0],
        arearight: data.filter.area[1],
      },
    })
    .then(success)
    .catch(fail);
}

function listHouseDeal(aptCode, success, fail) {
  api
    .get(`/house/` + aptCode)
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

function listFclt(dongCode, success, fail) {
  return fcltInstance(dongCode).get("").then(success).catch(fail);
}

export { listHouseInfo, listHouseDeal, listHouseInfoByFilter, listFclt };
