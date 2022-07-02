import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "./api/axios";
import Router from "./routes";
import ThemeProvider from "./theme";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(undefined);
  const [auth, setAuth] = useState(false);
  const [centro, setCentro] = useState(-1);

  const { isFetching, error, data } = useQuery(
    ["getUserByToken", auth],
    async () => {
      return await axios.get("utilizador/getUserByToken");
    },
    { enabled: !auth || (auth && !user) }
  );

  if (data) {
    if (!user) {
      setUser(data.data.data);
      setAuth(true);
    }
  }
  if (error) {
    setAuth(false);
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, auth, setAuth, centro, setCentro }}
    >
      <ThemeProvider>{!isFetching && <Router />}</ThemeProvider>
    </UserContext.Provider>
  );
}
export default App;
