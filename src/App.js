import { createContext, useEffect, useState } from "react";
import axios from "./api/axios";
import Router from "./routes";
import ThemeProvider from "./theme";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(undefined);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (auth) return;

    const jwt = localStorage.getItem("jwt");

    console.log("jwt:", jwt);

    if (!jwt) {
      return;
    }

    const fetchData = async () => {
      try {
        const data = await axios.get("utilizador/getUserByToken", {
          headers: { Authorization: "Bearer " + jwt },
        });
        setUser({ ...data.data.data, jwt });
        setAuth(true);
      } catch (error) {
        setAuth(false);
      }
    };
    fetchData();
  }, [auth]);

  console.log(auth);
  return (
    <UserContext.Provider value={{ user, setUser, auth, setAuth }}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </UserContext.Provider>
  );
}
export default App;
