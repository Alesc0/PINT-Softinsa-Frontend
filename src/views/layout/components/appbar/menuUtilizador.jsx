import {
  Brightness4,
  Brightness7,
  Home,
  Logout,
  PersonOutline,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  ButtonBase,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import axios from "api/_axios";
import socket from "api/_socket";
import { UserContext } from "App";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ColorModeContext } from "theme";
import { clearStorages, getTokens } from "utils/sessionManager";
import PerfilDrawer from "../perfil/drawer";

const paperProps = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 15,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

export default function UtilizadorMenu() {
  const { user, setAuth } = useContext(UserContext);
  const { handleColorMode, mode } = useContext(ColorModeContext);

  const [perfilOpen, setPerfilOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPerfil = () => {
    setPerfilOpen(true);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { refetch } = useQuery(
    ["logout"],
    async () => {
      return await axios.post("utilizador/logout", {
        refreshToken: getTokens().rT,
        env: "web",
      });
    },
    { enabled: false }
  );
  const handleLogout = () => {
    refetch();
    clearStorages();
    socket.disconnect();
    setAuth(false);
  };

  return (
    <>
      <Avatar
        component={ButtonBase}
        onClick={handleClick}
        sx={{ height: 50, width: 50 }}
        alt={user?.nome}
        src={user?.fotoConv && "data:image/jpeg;base64, " + user?.fotoConv}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={paperProps}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ my: 1, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.nome}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <Stack sx={{ p: 1 }}>
          <MenuItem component={Link} to={"/"} onClick={() => handleClose()}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleOpenPerfil();
            }}
          >
            <ListItemIcon>
              <PersonOutline />
            </ListItemIcon>
            <ListItemText>Perfil</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleColorMode}>
            <ListItemIcon>
              {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </ListItemIcon>
            <ListItemText>
              Modo {mode === "light" ? "Escuro" : "Claro"}
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Stack>
      </Menu>
      <PerfilDrawer
        open={perfilOpen}
        handleClose={() => setPerfilOpen(false)}
      />
    </>
  );
}
