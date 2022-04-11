import CircleIcon from "@mui/icons-material/Circle";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import navBar_logo from "../../imgs/logo-softinsa.png";
import { ColorModeContext } from "../../App";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const drawerWidth = 250;
const pages = [
  { name: "Estatisticas", link: "/stats" },
  { name: "Centros", link: "/centros" },
  { name: "Utilizadores", link: "/utilizadores" },
];
function ResponsiveDrawer(props) {
  const { window, theme } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { switchMode } = useContext(ColorModeContext);

  const handleDrawerToggle = () => {
    setMobileOpen((mobileOpen) => !mobileOpen);
  };
  const drawer = (
    <>
      <Toolbar disableGutters sx={{ bgcolor: "primary.dark" }}>
        <Link style={{ height: 50 }} to="/">
          <img src={navBar_logo} alt={"logo"} style={{ width: 245 }} />
        </Link>
      </Toolbar>
      <Divider />
      <List>
        {pages.map((row) => (
          <Link className="link" key={row.name} to={row.link}>
            <ListItem sx={{ p: 2, py: 1 }} button>
              <ListItemIcon>
                <CircleIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "white" }} primary={row.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
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
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
              <IconButton sx={{ color: "text.primary" }} onClick={switchMode}>
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
              <IconButton /* onClick={handleOpenUserMenu} */ sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                bgcolor: "primary.darker",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                bgcolor: "primary.darker",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 6,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
