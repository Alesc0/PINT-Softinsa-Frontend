import socket from "api/_socket";
import { createContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getTokens } from "utils/sessionManager";
import axios from "./api/_axios";
import Router from "./routes";
import ThemeProvider from "./theme";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(undefined);
  const [auth, setAuth] = useState(false);

  const queryClient = useQueryClient();

  const { isFetching, error, data } = useQuery(
    ["getUserByToken", auth, user],
    async () => {
      const { data: response } = await axios.get("utilizador/getUserByToken");
      return response.data;
    },
    { enabled: !!getTokens().rT }
  );

  if (data && !user) {
    setUser(data);
    if (!auth) setAuth(true);
    queryClient.clear();
  }

  if (error && auth) setAuth(false);

  //sockets
  useEffect(() => {
    socket.on("newUser", () => {
      queryClient.invalidateQueries("getUtilizadoresDashboard");
      queryClient.invalidateQueries("getUtilizadores");
    });
    socket.on("newFeedback", () => {
      queryClient.invalidateQueries("getFeedbacks");
    });
    socket.on("newNotificacao", () => {
      queryClient.invalidateQueries("getNotifications");
      queryClient.invalidateQueries("getNotificationsFull");
    });
    return () => {
      socket.off("newUser");
      socket.off("newFeedback");
      socket.off("newNotificacao");
    };
  }, [queryClient]);

  return (
    <UserContext.Provider value={{ user, setUser, auth, setAuth }}>
      <ThemeProvider>{!isFetching && <Router />}</ThemeProvider>
    </UserContext.Provider>
  );
}
export default App;
