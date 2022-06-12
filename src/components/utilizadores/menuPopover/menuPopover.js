import { AccountCircle, Edit, NoAccounts } from "@mui/icons-material";
import { Divider, ListItemIcon } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "../../../api/axios";
import * as React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function BasicMenu(props) {
  const { handleCloseMenu, openMenu, anchorEl, row, refetch } = props;
  if (!row) return;

  const handleToggleActive = async () => {
    try {
      //requests
      const data = await axios.put("/utilizador/" + row.idutilizador, {
        estado: !row.estado,
      });
      toast.success(data.data);
      handleCloseMenu();
      refetch();
    } catch (error) {
      for (const [key, value] of Object.entries(error.response.data)) {
        toast.error(value, { toastId: key });
      }
    }
  };

  return (
    <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
      <MenuItem component={Link} to={"edit/" + row.idutilizador}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Editar
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleToggleActive}>
        <ListItemIcon>
          {row.estado ? <NoAccounts /> : <AccountCircle />}
        </ListItemIcon>
        {row.estado ? "Desativar" : "Ativar"}
      </MenuItem>
    </Menu>
  );
}
