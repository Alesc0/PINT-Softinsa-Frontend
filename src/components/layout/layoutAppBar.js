import { Menu, Settings } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import navBar_logo from "../../imgs/logo-softinsa.png";
import Notification from "./drawer/notificationBtn";
import UtilizadorMenu from "./menuUtilizador";

function LayoutAppBar(props) {
  const {
    loading,
    handleDrawerToggle,
    drawerWidth,
    notificacoes,
    setNotificacoes,
    handleOpen,
  } = props;

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
          <Notification
            loading={loading}
            notificacoes={notificacoes}
            setNotificacoes={setNotificacoes}
          />
          <IconButton
            sx={{ color: "primary.contrastText" }}
            onClick={handleOpen}
          >
            <Settings />
          </IconButton>

          <UtilizadorMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default LayoutAppBar;
