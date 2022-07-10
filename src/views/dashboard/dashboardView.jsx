import { DesktopDatePicker } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "api/_axios";
import socket from "api/_socket";
import MyResponsiveBar from "common/nivoCharts/bars";
import MyResponsivePie from "common/nivoCharts/pie";
import MyResponsiveTimeRange from "common/nivoCharts/timeRange";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import BoxNumbers from "./components/boxNumbers";
import ListFeedbacks from "./components/feedbacks/listFeedbacks";

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
];

export default function Dashboard() {
  var date = new Date();
  date.setDate(date.getDate() - 240);

  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(new Date());

  const [page, setPage] = useState(1);

  const { isLoading: loadingCountUtilizadores, data: countUtilizadores } =
    useQuery("getUtilizadoresCount", async () => {
      const { data: response } = await axios.get("utilizador/count");
      return response.data;
    });

  const { isLoading: loadingCountSalas, data: countSalas } = useQuery(
    "getSalasCount",
    async () => {
      const { data: response } = await axios.get("sala/list");
      return response.data.length;
    }
  );
  const { isLoading: loadingFeedbacks, data: dataFeedBacks } = useQuery(
    ["getFeedbacks", page],
    async () => {
      const { data: response } = await axios.get("feedback/list", {
        params: {
          offset: (page - 1) * 4,
          limit: 4,
        },
      });
      console.log(response);
      return response;
    }
  );

  useEffect(() => {
    socket.on("newUser", () => {
      queryClient.invalidateQueries("getUtilizadoresDashboard");
    });
    socket.on("newFeedback", () => {
      queryClient.invalidateQueries("getFeedbacks");
    });
    return () => {
      socket.off("newUser");
      socket.off("newFeedback");
    };
  }, [queryClient]);

  console.log(startDate);

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(4, 2fr)" }}
      gap={3}
    >
      <BoxNumbers
        loading={loadingCountUtilizadores}
        info={countUtilizadores}
        text={"Utilizadores Registados"}
      />
      {info.map((row) => (
        <BoxNumbers key={row.id} info={row.val} text={row.desc} />
      ))}

      <BoxNumbers
        loading={loadingCountSalas}
        info={countSalas}
        text={"Salas Totais"}
      />
      <Box
        gridRow="span 2"
        gridColumn="span 2"
        sx={{ flex: 1, display: "flex" }}
      >
        <Card>
          <CardHeader title="Feedbacks" />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "93%",
              p: 0,
            }}
          >
            <ListFeedbacks
              loading={loadingFeedbacks}
              feedbackList={dataFeedBacks?.data}
              setPage={setPage}
              page={page}
              count={dataFeedBacks?.count}
            />
          </CardContent>
        </Card>
      </Box>
      <Box gridColumn="span 2">
        <Card>
          <CardHeader title="Alocação diária" />
          <CardContent>
            <MyResponsiveBar />
          </CardContent>
        </Card>
      </Box>
      <Box gridColumn="span 2">
        <Card>
          <CardHeader title="Utilizadores" />
          <CardContent
            sx={{
              p: 0,
            }}
          >
            <MyResponsivePie />
          </CardContent>
        </Card>
      </Box>
      <Box gridColumn={{ sm: "span 2", md: "span 4" }}>
        <Card>
          <CardHeader
            title="Reservas"
            action={
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack direction="row" spacing={1}>
                  <DesktopDatePicker
                    label="Inicio"
                    inputFormat="dd/MM/yyyy"
                    value={startDate}
                    onChange={(e) => setStartDate(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DesktopDatePicker
                    label="Fim"
                    inputFormat="dd/MM/yyyy"
                    value={endDate}
                    onChange={(e) => setEndDate(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            }
          />
          <CardContent>
            <MyResponsiveTimeRange startDate={startDate} endDate={endDate} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
