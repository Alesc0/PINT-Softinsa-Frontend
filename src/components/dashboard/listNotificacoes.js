import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ava from "../../imgs/avatar.jpg";
import React from "react";

function ListNotificacoes({ loading, notificacoesList }) {
  return loading ? (
    <Box
      sx={{
        display: "flex",
        height: "75%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <List sx={{ width: "100%" }}>
      {notificacoesList.map((row) => (
        <ListItem key={row.idnotificacao} alignItems="flex-start" button>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={ava} />
          </ListItemAvatar>
          <ListItemText
            primary={!row.utilizador ? "Sistema" : row.utilizador.nome}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="secondary.main"
                >
                  {row.titulo}
                </Typography>
                {" — " + row.descricao}
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default ListNotificacoes;
