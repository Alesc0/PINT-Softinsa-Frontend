import {
  Apartment,
  Dashboard,
  Person,
  QueryStats,
  ViewModule,
} from "@mui/icons-material/";
import {
  Box,
  Divider,
  Drawer,
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
import navBar_logo from "../../../../imgs/logo-softinsa.png";
import { ColorModeContext } from "../../../../theme";
import LayoutAppBar from "../layoutAppBar";
import PermDrawer from "./permDrawer";
import SettingsDrawer from "../settingsDrawer";
import TempDrawer from "./tempDrawer";

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

const activeStyle = {
  bgcolor: "#4c6885",
  borderRadius: 1,
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

function MenuDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { switchMode } = useContext(ColorModeContext);
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);

  let location = useLocation();

  const container =
    window !== undefined ? () => window().document.body : undefined;

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

  const appBarProps = {
    loading,
    handleDrawerToggle,
    drawerWidth,
    switchMode,
    notificacoes,
    setNotificacoes,
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

  const tempDrawerProps = {
    container,
    mobileOpen,
    handleDrawerToggle,
    drawerWidth,
    drawer,
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <LayoutAppBar {...appBarProps} />

        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          <TempDrawer {...tempDrawerProps} />

          <PermDrawer drawerWidth={drawerWidth} drawer={drawer} />
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
      <SettingsDrawer />
    </>
  );
}

MenuDrawer.propTypes = {
  window: PropTypes.func,
};

export default MenuDrawer;
