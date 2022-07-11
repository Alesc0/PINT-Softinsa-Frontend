import { Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { UserContext } from "App";
import navBar_logo from "imgs/logo-softinsa.png";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Feedbacks from "./feedbacks/feedbacks";
import UtilizadorMenu from "./menuUtilizador";
import NotificationButton from "./notifications/notificationBtn";
import axios from "api/_axios";
import { toast } from "react-toastify";

function LayoutAppBar(props) {
  const { handleDrawerToggle, drawerWidth, handleOpen } = props;
  const { user } = useContext(UserContext);

  const {
    isLoading: loadingNotificacoes,
    error: notificacaoError,
    data: dataNotificacoes,
  } = useQuery(
    "getNotifications",
    async () => {
      const { data: response } = await axios.get(
        "notificacao/utilizador/" + user.idutilizador
      );
      return response.data[0]?.notificacoes;
    },
    { keepPreviousData: true }
  );

  const {
    isLoading: loadingFeedbacks,
    error: feedbackError,
    data: dataFeedbacks,
  } = useQuery(["getFeedbacks"], async () => {
    const { data: response } = await axios.get("feedback/list", {
      params: {
        offset: 0,
        limit: 4,
      },
    });
    return response;
  });

  if (notificacaoError)
    toast.error("Erro ao obter notificações", {
      toastId: "get_notification_error",
    });
  if (feedbackError)
    toast.error("Erro ao obter feedbacks", {
      toastId: "get_feedback_error",
    });

  const feedbackProps = {
    feedbacks: dataFeedbacks?.data,
    isLoading: loadingFeedbacks,
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar sx={{ bgcolor: "primary.main" }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <Menu />
        </IconButton>

        <Box
          component={Link}
          to="/"
          sx={{
            display: { xs: "flex", md: "none" },
            height: 50,
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={navBar_logo}
            alt={"logo"}
            style={{
              width: 245,
            }}
          />
        </Box>
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            gap: 1,
          }}
        >
          <Feedbacks {...feedbackProps} />
          <NotificationButton
            isLoading={loadingNotificacoes}
            notificacoes={dataNotificacoes}
          />
          <UtilizadorMenu handleOpen={handleOpen} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default LayoutAppBar;
