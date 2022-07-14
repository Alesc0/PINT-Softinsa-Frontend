import axios from "axios";
import {
  clearStorages,
  getTokens,
  setLocalStorage,
  setSessionStorage,
} from "../utils/sessionManager";

export const baseURL = "https://pintbackendoriginal.herokuapp.com";

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
    if (error.response && error.response.status === 401 && !config._retry) {
      config._retry = true;
      if (getTokens().rT) {
        try {
          refreshing_token = refreshing_token
            ? refreshing_token
            : refreshToken();
          let res = await refreshing_token;
          refreshing_token = null;
          if (res.accessToken) {
            if (JSON.parse(getTokens().rem)) {
              setLocalStorage(res.accessToken, res.refreshToken);
            } else setSessionStorage(res.accessToken, res.refreshToken);
            config.headers["Authorization"] = "Bearer " + res.accessToken;
            return instance(config);
          }
          return instance(config);
        } catch (err) {
          clearStorages();
          Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  const { data: response } = await instance.post("utilizador/refreshToken", {
    refreshToken: getTokens().rT,
    env: "web",
  });
  return response.data;
};

export default instance;
