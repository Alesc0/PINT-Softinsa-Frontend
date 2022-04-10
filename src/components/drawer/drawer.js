import * as React from "react";
import PropTypes from "prop-types";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import navBar_logo from "../../imgs/logo-softinsa.png";
import {
  AppBar,
  Avatar,
  Toolbar,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  IconButton,
  Drawer,
  Divider,
  CssBaseline,
  Box,
  ThemeProvider,
} from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 300;
const pages = [
  { name: "Estatisticas", link: "/stats" },
  { name: "Centros", link: "/centros" },
  { name: "Utilizadores", link: "/utilizadores" },
];
function ResponsiveDrawer(props) {
  const { window, theme } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((mobileOpen) => !mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar sx={{ bgcolor: "primary.dark" }}>
        <Link style={{ height: 40 }} to="/">
          <img src={navBar_logo} alt={"logo"} style={{ width: 200 }} />
        </Link>
      </Toolbar>
      <Divider />
      <List>
        {pages.map((row) => (
          <Link className="link" to={row.link}>
            <ListItem button key={row.name}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={row.name} />
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
        <CssBaseline />
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

            <Box sx={{ marginLeft: "auto" }}>
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
