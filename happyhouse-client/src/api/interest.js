import axios from "axios";

// http://api.vworld.kr/req/data?service=data&version=2.0&request=getfeature&key=CEB52025-E065-364C-9DBA-44880E3B02B8&domain=http%3A%2F%2Flocalhost%3A8080&format=json&errorformat=json&size=10&page=1&data=LT_C_USFSFFB&attrfilter=emdCd%3A%3D%3A50110250&geometry=true&attribute=true&crs=epsg%3A4326

// const V_FRONT =
//   "http://api.vworld.kr/req/data?service=data&version=2.0&request=getfeature&key=CEB52025-E065-364C-9DBA-44880E3B02B8&domain=http%3A%2F%2Flocalhost%3A8080&format=json&errorformat=json&size=10&page=1&data=";
// const V_MID = "&attrfilter=emdCd%3A%3D%3A";
// const V_BACK = "&geometry=true&attribute=true&crs=epsg%3A4326";

// function makeInstance(target, dongCode) {
//   let V_URL = V_FRONT + target + V_MID + dongCode + V_BACK;
//   return axios.create({
//     baseURL: V_URL,
//     headers: {
//       "Content-type": "application/json",
//     },
//   });
// }

// function CctvList(dongCode, success, fail) {
//   let CctvInstance = makeInstance("LT_P_UTISCCTV", dongCode);
//   CctvInstance.get("", dongCode).then(success).catch(fail);
// }

// function testList(dongCode, success, fail) {
//   let testInstance = makeInstance("LT_P_MGPRTFC", dongCode);
//   testInstance.get("", dongCode).then(success).catch(fail);
// }

// 한국사회보장정보원_사회복지시설정보서비스 현황

const SCLFCLT_URL =
  "https://apis.data.go.kr/B554287/sclWlfrFcltInfoInqirService1/getFcltByBassInfoInqire?serviceKey=RC7TjOxHMIzb62XIfDTR1EzuS3KoqDBOwA5BrJ%2BuU3%2FHJRHixFHyMN9rgxhFCxTIJ7tTIdRDoTlLn%2BP%2BnoaF5g%3D%3D&numOfRows=100&pageNo=1";

function fcltList(dongCode, success, fail) {
  const instance = axios.create({
    baseURL: SCLFCLT_URL + "&jrsdSggCd=" + dongCode,
    //   SCLFCLT_URL + "&fcltBldgMngtNo=1126010600106420000001874",
    headers: {
      "Content-type": "application/json",
    },
  });
  instance.get("").then(success).catch(fail);
}

export { fcltList };
