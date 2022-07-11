import axios from "axios";
import {
  clearStorages,
  getTokens,
  setLocalStorage,
  setSessionStorage,
} from "../utils/sessionManager";

/* "https://pintbackendoriginal.herokuapp.com" */

export const baseURL = "https://pint-backend-dev.herokuapp.com/";

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  const jwt = getTokens().jwt;
  if (jwt) config.headers.common["Authorization"] = "Bearer " + jwt;
  return config;
});

instance.interceptors.response.use(null, async (error) => {
  console.log(error.response.data);
  if (error.response.data.data === "Invalid refresh token") {
    clearStorages();
    if (window.location !== "/login") window.location = "/login";
  }
  if (getTokens().rT) {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      let refresh = await refreshToken();
      if (refresh) {
        originalRequest._retry = true;
        originalRequest.headers["Authorization"] = "Bearer " + getTokens().jwt;
        return instance(originalRequest);
      }
    }
  }
});

export const refreshToken = async () => {
  let { rT, rem } = getTokens();

  try {
    const { data: response } = await instance.post("utilizador/refreshToken", {
      refreshToken: rT,
      env: "web",
    });
    if (rem)
      setLocalStorage(response.data.accessToken, response.data.refreshToken);
    else
      setSessionStorage(response.data.accessToken, response.data.refreshToken);
    return true;
  } catch {
    return false;
  }
};

export default instance;
