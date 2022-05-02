import { Box, Card, CardContent, CardHeader } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BoxNumbers from "../components/dashboard/boxNumbers";
import ListFeedbacks from "../components/dashboard/listFeedbacks";
import ListNotificacoes from "../components/dashboard/listNotificacoes";

const info = [
  {
    id: 2,
    val: 54,
    desc: "Reservas Futuras",
  },
  {
    id: 3,
    val: 231,
    desc: "Reservas realizadas",
  },

  {
    id: 4,
    val: 5,
    desc: "Salas Disponiveis",
  },
];

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [notificacoes, setNotificacoes] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(false);

  //get data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        //requests
        const { data: responseUsersCount } = await axios.get(
          "/utilizador/list"
        );
        const { data: responseFeedbacks } = await axios.get("/feedback/list");
        const { data: responseNotificacao } = await axios.get(
          "/notificacao/list"
        );
        //set states
        setUserCount(responseUsersCount.length);
        setFeedbacks(responseFeedbacks);
        setNotificacoes(responseNotificacao);

        setLoading(false);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      maxWidth="xl"
      display="grid"
      gridTemplateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(4, 2fr)" }}
      gap={5}
      sx={{ m: "0 auto", p: 4, color: "text.primary" }}
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
      <Box gridColumn="span 2">
        <Card sx={{ columnSpan: 2 }}>
          <CardHeader title="Feedbacks" />
          <CardContent>
            <ListFeedbacks loading={loading} feedbackList={feedbacks} />
          </CardContent>
        </Card>
      </Box>
      <Box gridColumn="span 2">
        <Card sx={{ columnSpan: 2 }}>
          <CardHeader title="Notificações" />
          <CardContent>
            <ListNotificacoes
              loading={loading}
              notificacoesList={notificacoes}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
