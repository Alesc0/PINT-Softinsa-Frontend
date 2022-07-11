import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { getTokens } from "utils/sessionManager";
import axios from "./api/_axios";
import Router from "./routes";
import ThemeProvider from "./theme";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(undefined);
  const [auth, setAuth] = useState(false);

  const { isFetching, error, data } = useQuery(
    ["getUserByToken", auth],
    async () => {
      const { data: response } = await axios.get("utilizador/getUserByToken");
      return response.data;
    },
    { enabled: (!auth || !user) && !!getTokens().rT }
  );

  if (data) {
    if (!user) {
      setUser(data);
      if (!auth) setAuth(true);
    }
  }

  if (error && auth) setAuth(false);

  return (
    <UserContext.Provider value={{ user, setUser, auth, setAuth }}>
      <ThemeProvider>{!isFetching && <Router />}</ThemeProvider>
    </UserContext.Provider>
  );
}
export default App;
