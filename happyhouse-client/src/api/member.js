import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

// async function logout(success, fail) {
//   await api.get(`/user/logout`).then(success).catch(fail);
// }

async function signup(user, success, fail) {
  await api
    .post(`/user/regist`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

export { login, findById, signup };
