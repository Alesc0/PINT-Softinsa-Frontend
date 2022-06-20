import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { UserContext } from "../../App";
import { clearStorages, getTokens } from "../../utils/sessionManager";

const paperProps = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 0.5,
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 24,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

export default function UtilizadorMenu({ handleOpen }) {
  const { setAuth, user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.delete("utilizador/logout", {
        data: {
          refreshToken: getTokens()[1],
        },
      });
    } catch (error) {
      console.log(error);
    }

    clearStorages();
    setAuth(false);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar alt="Remy Sharp" />
      </IconButton>
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
          <MenuItem component={Link} to={"/"}>
            Home
          </MenuItem>
          <MenuItem
            component={Link}
            to={"/utilizadores/edit/" + user?.idutilizador}
          >
            Perfil
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleOpen();
            }}
          >
            Opções
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Stack>
      </Menu>
    </>
  );
}
