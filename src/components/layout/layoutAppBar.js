import { Menu, Settings } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
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
          sx={{
            ml: "auto",
            display: "flex",
            gap: 1,
          }}
        >
          <IconButton
            sx={{ color: "primary.contrastText" }}
            onClick={handleOpen}
          >
            <Settings />
          </IconButton>
          <Notification
            loading={loading}
            notificacoes={notificacoes}
            setNotificacoes={setNotificacoes}
          />
          <UtilizadorMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default LayoutAppBar;
