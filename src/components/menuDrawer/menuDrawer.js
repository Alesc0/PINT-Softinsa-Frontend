import {
  Brightness4,
  Brightness7,
  KeyboardArrowRight,
  Menu,
} from "@mui/icons-material/";
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
  Toolbar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import navBar_logo from "../../imgs/logo-softinsa.png";
import { ColorModeContext } from "../../theme";
import Notifications from "./notification";

const drawerWidth = 250;
const pages = [
  { name: "Dashboard", link: "/" },
  { name: "Estatisticas", link: "/stats" },
  { name: "Centros", link: "/centros" },
  { name: "Utilizadores", link: "/utilizadores" },
];
function MenuDrawer(props) {
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { switchMode } = useContext(ColorModeContext);
  const [handleOpenNotification, setOpenNotification] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        //requests
        const { data: responseNotificacao } = await axios.get(
          "/notificacao/list"
        );
        //set states
        setNotificacoes(responseNotificacao);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);


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
          <ListItem
            key={row.name}
            component={Link}
            to={row.link}
            sx={{ p: 2, py: 1 }}
            button
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <KeyboardArrowRight sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "white" }}
              primary={row.name}
              primaryTypographyProps={{ fontSize: "18px" }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
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
              {theme.palette.mode === "dark" ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </IconButton>
            <Notifications notificacoes={notificacoes}/>
            <IconButton /* onClick={handleOpenUserMenu} */>
              <Avatar alt="Remy Sharp" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
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
          pt: 8,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {props.children}
        <ToastContainer />
      </Box>
    </Box>
  );
}

MenuDrawer.propTypes = {
  window: PropTypes.func,
};

export default MenuDrawer;
