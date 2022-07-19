import {
  AccountCircle,
  Edit,
  NoAccounts,
  NoPhotography,
} from "@mui/icons-material";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import axios from "api/_axios";
import * as React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";

export default function BasicMenu(props) {
  const { handleCloseMenu, openMenu, anchorEl, row } = props;

  const queryClient = useQueryClient();

  const toggleActive = useMutation(
    async () => {
      const { data: response } = await axios.put(
        "/utilizador/" + row.idutilizador,
        {
          estado: !row.estado,
        }
      );
      return response;
    },
    {
      onSuccess: () => {
        toast.success("Utilizador atualizado!");
        handleCloseMenu();
        queryClient.invalidateQueries("getUtilizadoresView");
      },
    }
  );

  const removePhoto = useMutation(
    async () => {
      const { data: response } = await axios.delete(
        `/utilizador/${row.idutilizador}/foto`
      );
      return response;
    },
    {
      onSuccess: () => {
        toast.success("Utilizador atualizado!");
        handleCloseMenu();
        queryClient.invalidateQueries("getUtilizadoresView");
      },
      onError: () => {
        toast.error("Utilizador não tem foto!");
        handleCloseMenu();
      },
    }
  );

  return (
    <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
      <MenuItem component={Link} to={"edit/" + row?.idutilizador}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Editar
      </MenuItem>
      <MenuItem onClick={removePhoto.mutate}>
        <ListItemIcon>
          <NoPhotography />
        </ListItemIcon>
        Remover Foto
      </MenuItem>
      <Divider />
      <MenuItem onClick={toggleActive.mutate}>
        <ListItemIcon>
          {row?.estado ? <NoAccounts /> : <AccountCircle />}
        </ListItemIcon>
        {row?.estado ? "Desativar" : "Ativar"}
      </MenuItem>
    </Menu>
  );
}
