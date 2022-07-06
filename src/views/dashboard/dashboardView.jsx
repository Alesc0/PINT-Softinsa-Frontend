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
import MyResponsivePie from "common/nivoCharts/pie";
import MyResponsiveTimeRange from "common/nivoCharts/timeRange";
import { useState } from "react";
import { useQuery } from "react-query";
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

  {
    id: 4,
    val: 5,
    desc: "Salas Disponiveis",
  },
];

export default function Dashboard() {
  var date = new Date();
  date.setDate(date.getDate() - 240);

  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(new Date());

  const { isLoading: loadingCountUtilizadores, data: countUtilizadores } =
    useQuery("getUtilizadores", async () => {
      const { data: response } = await axios.get("utilizador/count");
      return response.data;
    });

  const { isLoading: loadingFeedbacks, data: dataFeedBacks } = useQuery(
    "getFeedbacks",
    async () => {
      const { data: response } = await axios.get("feedback/list");
      console.log(response);
      return response.data;
    }
  );

  return (
    <Box
      maxWidth="xl"
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
      <Box gridColumn="span 2">
        <Card>
          <CardHeader title="Feedbacks" />
          <CardContent>
            <ListFeedbacks
              loading={loadingFeedbacks}
              feedbackList={dataFeedBacks}
            />
          </CardContent>
        </Card>
      </Box>
      <Box gridColumn="span 2">
        <Card>
          <CardHeader title="Utilizadores" />
          <CardContent>
            <MyResponsivePie />
          </CardContent>
        </Card>
      </Box>
      <Box gridColumn="span 4">
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
