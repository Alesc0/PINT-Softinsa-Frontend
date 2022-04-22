import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ThemeProvider from "../../theme";
import ava from "../../imgs/avatar.jpg";
import React from "react";
const Notificacoes = [
  {
    id: 1,
    val: "Luis Matos",
    assunto: "Feedback",
    com: "Um novo feedback foi adicionado por um participante!",
  },
  {
    id: 2,
    val: "Joaquim Souza",
    assunto: "Atualização",
    com: "O pedido urgente de manutenção da sala 12 passou a resolvido.",
  },
  {
    id: 3,
    val: "André Tabasco",
    assunto: "Reunião",
    com: "Todos os requisitos para a próxima reunião de André Tabasco encontram-se prontos.",
  },
];

function ListNotificacoes(props) {
  return (
    <ThemeProvider>
      <List sx={{ width: "100%" }}>
        {Notificacoes.map((row) => (
          <ListItem key={row.id} alignItems="flex-start" button>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={ava} />
            </ListItemAvatar>
            <ListItemText
              primary={row.val}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="secondary.main"
                  >
                    {row.assunto}
                  </Typography>
                  {" — " + row.com}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </ThemeProvider>
  );
}

export default ListNotificacoes;
