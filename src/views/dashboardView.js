import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../api/axios";
import BoxNumbers from "../components/dashboard/boxNumbers";
import ListFeedbacks from "../components/dashboard/listFeedbacks";

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
        //set states
        setUserCount(responseUsersCount.data.length);
        setFeedbacks(responseFeedbacks.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Erro na ligação com o servidor!");
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      maxWidth="xl"
      display="grid"
      gridTemplateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(4, 2fr)" }}
      gap={3}
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
        <Card>
          <CardHeader title="Feedbacks" />
          <CardContent>
            <ListFeedbacks loading={loading} feedbackList={feedbacks} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
