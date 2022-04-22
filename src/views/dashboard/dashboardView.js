import ava from "../../imgs/avatar.jpg";
import {
  ListItemAvatar,
  ListItemText,
  ListItem,
  List,
  Box,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { Paper } from "@mui/material";
import ListNotificacoes from "../../components/dashboard/listNotificacoes";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import BoxNumbers from "../../components/dashboard/boxNumbers";
import Banner from "../../components/banner/banner";

const info = [
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
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get("/utilizador/list");
        setUserCount(response.length);
        setLoading(false);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [setUserCount]);

  return (
    <>
      <Banner>{"Dashboard"}</Banner>
      <Box
        maxWidth="xl"
        display="grid"
        gridTemplateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(4, 2fr)" }}
        gap={5}
        sx={{ m: "0 auto", p: 5, color: "text.primary" }}
      >
        <BoxNumbers
          loading={loading}
          info={userCount}
          text={"Utilizadores Registados"}
        />
        {info.map((row) => (
          <BoxNumbers
            key={row.id}
            loading={loading}
            info={row.val}
            text={row.desc}
          />
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
          <Typography gutterBottom variant="h5" component="h5">
            Feedbacks
          </Typography>
          <Divider />
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
          <Typography gutterBottom variant="h5" component="h5">
            Notificações
          </Typography>
          <Divider />
          <ListNotificacoes />
        </Box>
      </Box>
    </>
  );
}
