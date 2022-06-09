import { Brightness4, Brightness7, Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, useTheme } from "@mui/material";
import UtilizadorMenu from "./menuUtilizador";
import Notification from "./drawer/notificationBtn";

function LayoutAppBar(props) {
  const theme = useTheme();
  const {
    loading,
    handleDrawerToggle,
    drawerWidth,
    switchMode,
    notificacoes,
    setNotificacoes,
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
          <IconButton sx={{ color: "text.primary" }} onClick={switchMode}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
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
