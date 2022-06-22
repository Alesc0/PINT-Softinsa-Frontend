import { createContext, useEffect, useState } from "react";
import axios from "./api/axios";
import Router from "./routes";
import ThemeProvider from "./theme";
import {
  clearStorages,
  getLocalStorage,
  getSessionStorage,
  setLocalStorage,
  setSessionStorage,
} from "./utils/sessionManager";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(undefined);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;

    let jwt = "";
    let rT = "";
    var rem = JSON.parse(localStorage.getItem("remember"));

    if (rem != null) {
      if (rem) {
        [jwt, rT] = getLocalStorage();
      } else {
        [jwt, rT] = getSessionStorage();
      }
    }

    if (!jwt) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      let authed = false;
      try {
        const response = await axios.get("utilizador/getUserByToken");
        setUser({ ...response.data.data, jwt });
        authed = true;
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          try {
            const { data: response } = await axios.post(
              "utilizador/refreshToken",
              {
                refreshToken: rT,
              }
            );
            if (rem) {
              setLocalStorage(
                response.data.accessToken,
                response.data.refreshToken
              );
            } else {
              setSessionStorage(
                response.data.accessToken,
                response.data.refreshToken
              );
            }
            authed = true;
          } catch (error) {
            authed = false;
            clearStorages();
          }
        }
      }
      setAuth(authed);
      setLoading(false);
    };
    fetchData();
  }, [auth, user]);

  return (
    <UserContext.Provider value={{ user, setUser, auth, setAuth }}>
      <ThemeProvider>{!loading && <Router />}</ThemeProvider>
    </UserContext.Provider>
  );
}
export default App;
