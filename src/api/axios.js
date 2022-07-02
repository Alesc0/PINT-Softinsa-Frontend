import axios from "axios";
import {
  getTokens,
  setLocalStorage,
  setSessionStorage,
} from "../utils/sessionManager";

const instance = axios.create({
  baseURL: "https://pintbackendoriginal.herokuapp.com",
});

instance.interceptors.request.use((config) => {
  const jwt = getTokens().jwt;
  if (jwt) config.headers.common["Authorization"] = "Bearer " + jwt;
  return config;
});

instance.interceptors.response.use(null, async (error) => {
  if (getTokens().rT) {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await refreshToken();
      originalRequest.headers["Authorization"] = "Bearer " + getTokens().jwt;
      return instance(originalRequest);
    }
  }
});

export const refreshToken = async () => {
  let { rT, rem } = getTokens();

  const { data: response } = await instance.post("utilizador/refreshToken", {
    refreshToken: rT,
    env: "web",
  });

  if (rem)
    setLocalStorage(response.data.accessToken, response.data.refreshToken);
  else setSessionStorage(response.data.accessToken, response.data.refreshToken);
};

export default instance;
