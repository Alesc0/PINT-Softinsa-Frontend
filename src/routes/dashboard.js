import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ava from "../imgs/avatar.jpg";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import NavBar from "../components/navBar/navBar";
import { Paper } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";

const info = [
  {
    val: 293,
    desc: "Utilizadores Registados",
  },
  {
    val: 54,
    desc: "Reservas Futuras Agendadas",
  },
  {
    val: 231,
    desc: "Reservas realizadas",
  },

  {
    val: 5,
    desc: "Salas Disponiveis para reserva",
  },
];
const feedbacks = [
  {
    val: "João Trolha",
    assunto: "Bonjour?",
    com: "Sala acolhedora, boa iluminação natural e modernos equipamentos eletrônicos.",
  },
  {
    val: "André Joelho",
    assunto: "Adios?",
    com: "Bom acolhimento por parte da empresa, sala limpa e organizada. Obrigado pelo serviço prestado.",
  },
  {
    val: "Tozé Tabasco",
    assunto: "What is this?",
    com: "Senti bastante frio na sala onde participei de uma reunião. De resto, tudo de boa qualidade.",
  },
];
export default function Dashboard(props) {
  return (
    <ThemeProvider theme={props.th}>
      <NavBar />

      <Box
        display="grid"
        gridTemplateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(4, 2fr)" }}
        gap={5}
        sx={{ p: 5, bgcolor: "background.default", color: "text.primary" }}
      >
        {info.map((row) => (
          <Box
            component={Paper}
            sx={{
              color: "text.primary",
              border: "solid thin",
              borderRadius: 3,
              borderColor: "primary.main",
              textAlign: "center",
              p: 1,
            }}
          >
            <Typography
              variant="h5"
              component="h5"
              sx={{ color: "primary.main" }}
            >
              {row.val}
            </Typography>
            <Typography variant="h6" component="h6">
              {row.desc}
            </Typography>
          </Box>
        ))}
        <Box
          component={Paper}
          gridColumn="span 2"
          sx={{
            border: "solid thin",
            borderRadius: 3,
            borderColor: "primary.main",
            p: 2,
          }}
        >
          <Typography variant="h5" component="h5">
            Feedbacks
          </Typography>
          <List sx={{ width: "100%" }}>
            {feedbacks.map((row) => (
              <>
                <ListItem alignItems="flex-start" button>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={ava} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={row.assunto}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="primary.main"
                        >
                          {row.val}
                        </Typography>
                        {" — " + row.com}
                      </>
                    }
                  />
                </ListItem>

                <Divider />
              </>
            ))}
          </List>
        </Box>
        <Box
          component={Paper}
          gridColumn="span 2"
          sx={{
            border: "solid thin",
            borderRadius: 3,
            borderColor: "primary.main",
            p: 2,
          }}
        >
          <Typography variant="h5" component="h5">
            Notificações
          </Typography>
          <List sx={{ width: "100%", bgcolor: "background" }}>
            {feedbacks.map((row) => (
              <>
                <ListItem alignItems="flex-start" button>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={ava} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={row.assunto}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="secondary.main"
                        >
                          {row.val}
                        </Typography>
                        {" — " + row.com}
                      </>
                    }
                  />
                </ListItem>

                <Divider />
              </>
            ))}
          </List>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
