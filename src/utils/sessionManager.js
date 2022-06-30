export const clearStorages = () => {
  sessionStorage.removeItem("jwt");
  sessionStorage.removeItem("refreshToken");
  localStorage.removeItem("jwt");
  localStorage.removeItem("refreshToken");
};

export const getTokens = () => {
  let jwt = "";
  let rT = "";
  let rem = "";

  rem = localStorage.getItem("remember");

  jwt = localStorage.getItem("jwt");
  rT = localStorage.getItem("refreshToken");
  if (!jwt || !rT) {
    jwt = sessionStorage.getItem("jwt");
    rT = sessionStorage.getItem("refreshToken");
  }
  return { jwt, rT, rem };
};

export const getLocalStorage = () => {
  let jwt = "";
  let rT = "";
  jwt = localStorage.getItem("jwt");
  rT = localStorage.getItem("refreshToken");
  return [jwt, rT];
};

export const getSessionStorage = () => {
  let jwt = "";
  let rT = "";
  jwt = sessionStorage.getItem("jwt");
  rT = sessionStorage.getItem("refreshToken");
  return [jwt, rT];
};

export const setLocalStorage = (jwt, rT) => {
  localStorage.setItem("jwt", jwt);
  localStorage.setItem("refreshToken", rT);
};

export const setSessionStorage = (jwt, rT) => {
  sessionStorage.setItem("jwt", jwt);
  sessionStorage.setItem("refreshToken", rT);
};
