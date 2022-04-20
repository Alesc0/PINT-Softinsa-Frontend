import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ava from "../../imgs/avatar.jpg";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Paper } from "@mui/material";
import ThemeProvider from "../../theme";
import MenuDrawer from "../../components/menuDrawer/menuDrawer";
import ListNotificacoes from "./listNotificacoes";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const info = [
  {
    id: 1,
    val: 293,
    desc: "Utilizadores Registados",
  },
  {
    id: 2,
    val: 54,
    desc: "Reservas Futuras Agendadas",
  },
  {
    id: 3,
    val: 231,
    desc: "Reservas realizadas",
  },

  {
    id: 4,
    val: 5,
    desc: "Salas Disponiveis para reserva",
  },
];
const feedbackList = [
  {
    id: 1,
    val: "João Trolha",
    assunto: "Sala: 3",
    com: "Sala acolhedora, boa iluminação natural e modernos equipamentos eletrônicos.",
    time: "20.30",
  },
  {
    id: 2,
    val: "André Joelho",
    assunto: "Geral",
    com: "Bom acolhimento por parte da empresa, sala limpa e organizada. Obrigado pelo serviço prestado.",
    time: "15.30",
  },
  {
    id: 3,
    val: "Tozé Tabasco",
    assunto: "Sala: 15",
    com: "Senti bastante frio na sala onde participei de uma reunião. De resto, tudo de boa qualidade.",
    time: "12.30",
  },
];

export default function Dashboard(props) {
  const [feedbacks, setFeedbacks] = useState(feedbackList);
  const [notificacoes, setNotificacoes] = useState([feedbacks]);

  /*  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get("/feedback/list");
        setFeedbacks(response);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [setFeedbacks]); */

  return (
    <ThemeProvider>
      <MenuDrawer pageName="Dashboard">
        <Box
          maxWidth="xl"
          display="grid"
          gridTemplateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(4, 2fr)" }}
          gap={5}
          sx={{ m: "0 auto", p: 5, color: "text.primary" }}
        >
          {info.map((row) => (
            <Box
              key={row.id}
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
                <ListItem key={row.id} alignItems="flex-start" button>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={ava} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={row.val}
                    sx={{ color: "primary.main" }}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="gradient.primary"
                        >
                          {row.assunto}
                        </Typography>
                        {" — " + row.com}
                        <span
                          style={{
                            margin: 0,
                            padding: 0,
                            width: "fit-content",
                            float: "right",
                          }}
                        >
                          {row.time}
                        </span>
                      </>
                    }
                  />
                </ListItem>
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
            <ListNotificacoes />
          </Box>
        </Box>
      </MenuDrawer>
    </ThemeProvider>
  );
}
