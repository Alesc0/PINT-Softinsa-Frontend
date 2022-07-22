import axios from "axios";
import {
  clearStorages,
  getTokens,
  setLocalStorage,
  setSessionStorage
} from "../utils/sessionManager";

export const baseURL = "https://pintbackendoriginal.herokuapp.com/";

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  const jwt = getTokens().jwt;
  if (jwt) config.headers.common["Authorization"] = "Bearer " + jwt;
  return config;
});

let refreshing_token = null;
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    if (error.response.data.data === "Invalid refresh token") clearStorages();

    if (error.response && error.response.status === 401 && !config._retry) {
      config._retry = true;
      if (getTokens().rT) {
        try {
          refreshing_token = refreshing_token
            ? refreshing_token
            : refreshToken();
          let res = await refreshing_token;
          refreshing_token = null;
          if (res) {
            config.headers["Authorization"] = "Bearer " + getTokens().jwt;
            return instance(config);
          }
        } catch (err) {
          Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const refreshToken = async (axios = null) => {
  let inst = instance;
  if (axios) inst = axios;
  const { data: response } = await inst.post("utilizador/refreshToken", {
    refreshToken: getTokens().rT,
    env: "web",
  });

  if (JSON.parse(getTokens().rem)) {
    setLocalStorage(response.data.accessToken, response.data.refreshToken);
  } else
    setSessionStorage(response.data.accessToken, response.data.refreshToken);

  return true;
};

export default instance;
