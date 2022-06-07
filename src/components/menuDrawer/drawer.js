import {
  Apartment,
  Brightness4,
  Brightness7,
  Dashboard,
  Menu,
  Person,
  QueryStats,
  ViewModule,
} from "@mui/icons-material/";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import navBar_logo from "../../imgs/logo-softinsa.png";
import { ColorModeContext } from "../../theme";
import UtilizadorMenu from "./menuUtilizador";
import Notifications from "./notification";

const drawerWidth = 250;
const pages = [
  {
    name: "Dashboard",
    link: "/",
    icon: <Dashboard sx={{ color: "white" }} />,
  },
  {
    name: "Estatisticas",
    link: "/stats",
    icon: <QueryStats sx={{ color: "white" }} />,
  },
  {
    name: "Centros",
    link: "/centros",
    icon: <Apartment sx={{ color: "white" }} />,
  },
  {
    name: "Salas",
    link: "/salas",
    icon: <ViewModule sx={{ color: "white" }} />,
  },
  {
    name: "Utilizadores",
    link: "/utilizadores",
    icon: <Person sx={{ color: "white" }} />,
  },
];

function MenuDrawer(props) {
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { switchMode } = useContext(ColorModeContext);
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  let location = useLocation();

  const activeStyle = {
    bgcolor: "#4c6885",
    borderRadius: 1,
  };

  useEffect(() => {
    let page = pages.filter((el) => location.pathname.includes(el.link));
    setActive(pages.indexOf(page[page.length - 1]));
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //requests
        setLoading(true);
        const { data: responseNotificacao } = await axios.get(
          "/notificacao/list"
        );
        //set states
        setNotificacoes(responseNotificacao);
        setLoading(false);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((mobileOpen) => !mobileOpen);
  };
  const Copyright = () => {
    return (
      <Stack>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
        </Typography>
        <Typography color="text.secondary">
          Softinsa {new Date().getFullYear()}
        </Typography>
      </Stack>
    );
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
        {pages.map((row, i) => (
          <ListItem key={row.name} sx={{ py: 0.5, px: 2 }}>
            <ListItemButton
              component={Link}
              to={row.link}
              sx={i === active ? { ...activeStyle } : { borderRadius: 1 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{row.icon}</ListItemIcon>
              <ListItemText
                sx={{ color: "white" }}
                primary={row.name}
                primaryTypographyProps={{ fontSize: "18px" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Stack spacing={2} className="center" sx={{ mt: "auto", mb: 2 }}>
        <Divider variant="middle" width="80%" />
        {Copyright()}
      </Stack>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
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
              <Notifications
                loading={loading}
                notificacoes={notificacoes}
                setNotificacoes={setNotificacoes}
              />
              <UtilizadorMenu />
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
            p: 3,
            pt: 11,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {props.children}
          <ToastContainer />
        </Box>
      </Box>
    </>
  );
}

MenuDrawer.propTypes = {
  window: PropTypes.func,
};

export default MenuDrawer;
