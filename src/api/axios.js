import axios from "axios";
import { getTokens } from "../utils/sessionManager";

const instance = axios.create({
  baseURL: "https://pintbackendoriginal.herokuapp.com",
});

instance.interceptors.request.use(
  (config) => {
    const jwt = getTokens()[0];
    if (jwt) config.headers.common["Authorization"] = "Bearer " + jwt;
    else delete config.headers.common["Authorization"];
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
