import socket from "api/_socket";
import { createContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getTokens } from "utils/sessionManager";
import axios, { refreshToken } from "./api/_axios";
import Router from "./routes";
import ThemeProvider from "./theme";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(undefined);
  const [auth, setAuth] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(
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
    socket.io.opts.query.token = getTokens().jwt;
    socket.connect();
    queryClient.clear();
  }

  if (error) console.log(error.response);
  if (error && auth) setAuth(false);

  //sockets
  useEffect(() => {
    socket.on("connect", () => console.log("connected"));
    socket.on("disconnect", () => console.log("disconnected"));

    socket.on("nmrSockets", (array) => {
      console.log(array);
    });

    socket.on("updateNotificacao", () => {
      queryClient.invalidateQueries("getNotifications");
      queryClient.invalidateQueries("getNotificationsView");
    });

    socket.on("updateFeedback", () => {
      queryClient.invalidateQueries("getFeedbacks");
      queryClient.invalidateQueries("getFeedbacksView");
    });
    
    socket.on("reservaLive", () => {
      queryClient.invalidateQueries("getReservasAtuaisDashboard");
    });

    socket.on("updateUser", () => {
      queryClient.invalidateQueries("getUtilizadoresDashboard");
      queryClient.invalidateQueries("getUtilizadores");
      queryClient.invalidateQueries("getUtilizadoresTipoCount");
      queryClient.invalidateQueries("getUtilizadoresCount");
      queryClient.invalidateQueries("getUtilizadoresView");
    });
    socket.on("updateReserva", () => {
      queryClient.invalidateQueries("getReservasDashboard");
      queryClient.invalidateQueries("getReservasByRange");
      queryClient.invalidateQueries("getReservasView");
      queryClient.invalidateQueries("getReservasAtuaisDashboard");
      queryClient.invalidateQueries("getAlocacaoSalas");
    });

    socket.on("updateCentro", () => {
      queryClient.invalidateQueries("getCentrosView");
      queryClient.invalidateQueries("getCentrosDashboard");
      queryClient.invalidateQueries("getCentrosPerfil");
      queryClient.invalidateQueries("getCentrosSalas");
      queryClient.invalidateQueries("getCentrosUtilizadores");
      queryClient.invalidateQueries("getCentrosUtilizadoresForm");
    });

    socket.on("updateSala", () => {
      queryClient.invalidateQueries("getSalas");
      queryClient.invalidateQueries("getSalasView");
      queryClient.invalidateQueries("getSalasCount");
      queryClient.invalidateQueries("getSalasDashboard");
      queryClient.invalidateQueries("getSalasReservas");
      queryClient.invalidateQueries("getSalasPercentagem");
      queryClient.invalidateQueries("getOcupacaoSalas");
    });

    socket.on("requestRefresh", async () => {
      try {
        console.log("refreshing");
        await refreshToken(axios);
        socket.disconnect();
        socket.io.opts.query.token = getTokens().jwt;
        socket.connect();
        console.log("token refreshed");
      } catch (error) {
        console.log(error.response);
        console.log("error refreshing token");
      }
    });

    socket.on("connect_error", () => {
      console.log("socket error connection");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");

      socket.off("updateNotificacao");
      socket.off("updateFeedback");

      socket.off("updateUser");
      socket.off("updateSala");
      socket.off("updateCentro");
      socket.off("updateReserva");

      socket.off("requestRefresh");
      socket.off("connect_error");
    };
  }, [queryClient]);
  return (
    <UserContext.Provider value={{ user, setUser, auth, setAuth }}>
      <ThemeProvider>{!isLoading ? <Router /> : null}</ThemeProvider>
    </UserContext.Provider>
  );
}
export default App;
