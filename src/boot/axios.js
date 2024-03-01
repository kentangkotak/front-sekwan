<<<<<<< HEAD
import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { getLocalToken } from 'src/modules/storage'
=======
import { boot } from "quasar/wrappers";
import axios from "axios";
>>>>>>> 9bf2f5715c6100340dec2a724400b306c5b4d186

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
<<<<<<< HEAD
 const api = axios.create({ baseURL: 'http://localhost:8080/sekwan/sekwan/sekwan/public/api' })
=======
const api = axios.create({
  baseURL: "http://localhost/sekwan/sekwan/public/api",
});
>>>>>>> 9bf2f5715c6100340dec2a724400b306c5b4d186
//  api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
//const api = axios.create({ baseURL: 'http://localhost:8080/toko/belakang/public/api' })
api.defaults.headers.get.Accepts = "application/json";

//api.defaults.headers.common.Authorization = `Bearer ${getLocalToken()}`

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

const setToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const deleteToken = () => delete api.defaults.headers.common.Authorization;

export { api, setToken, deleteToken };
