import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ava from "../../imgs/avatar.jpg";
import React from "react";

function ListNotificacoes({ loading, read, notRead }) {
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
        {notRead.map((row, i) => (
          <ListItem
            key={i}
            alignItems="flex-start"
            disableGutters
            disablePadding
          >
            <ListItemButton sx={{ px: 3 }}>
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
            </ListItemButton>
          </ListItem>
        ))}
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
        {read.map((row, i) => (
          <ListItem
            key={i}
            alignItems="flex-start"
            disableGutters
            disablePadding
          >
            <ListItemButton sx={{ px: 3 }}>
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
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ListNotificacoes;
