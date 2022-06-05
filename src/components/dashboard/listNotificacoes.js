import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import ava from "../../imgs/avatar.jpg";

function ListNotificacoes({ loading, read, notRead }) {
  const renderList = (rows) => {
    if (rows.length === 0)
      return (
        <Typography textAlign="center" sx={{ marginBlock: 2 }}>
          Sem Notificações.
        </Typography>
      );
    return rows.map((row, i) => (
      <ListItem key={i} alignItems="flex-start" disableGutters disablePadding>
        <ListItemButton sx={{ px: 3 }}>
          <Avatar alt="Remy Sharp" src={ava} />
          <ListItemText
            primary={
              <>
                {!row.utilizador ? "Sistema" : row.utilizador.nome}
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="secondary.main"
                >
                  {" - "}
                  {row.titulo}
                </Typography>
              </>
            }
            secondary={row.descricao}
          />
        </ListItemButton>
      </ListItem>
    ));
  };

  return loading ? (
    <Box
      sx={{
        display: "flex",
        height: "75%",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      <List disablePadding>
        {renderList(notRead)}

        <Divider component="li" />
        <li>
          <Typography
            sx={{ mt: 0.5, ml: 2 }}
            color="text.secondary"
            display="block"
            variant="caption"
          >
            Lidas
          </Typography>
        </li>
      </List>

      <List disablePadding dense>
        {renderList(read)}
      </List>
    </>
  );
}

export default ListNotificacoes;
