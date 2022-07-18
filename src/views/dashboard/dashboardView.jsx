import { MobileDatePicker } from "@mui/lab";
import {
  Box,
  Button,
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
import Tesatebar from "common/nivoCharts/teste";
import MyResponsiveTimeRange from "common/nivoCharts/timeRange";
import { useState } from "react";
import { useQuery } from "react-query";
import BoxNumbers from "./components/boxNumbers";

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

  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(new Date());

  const { isLoading: loadingCountUtilizadores, data: countUtilizadores } =
    useQuery("getUtilizadoresCount", async () => {
      const { data: response } = await axios.get("utilizador/list");
      return response.count;
    });

  const { isLoading: loadingTipoUtilizadores, data: dataTipoUtilizadores } =
    useQuery("getUtilizadoresTipoCount", async () => {
      const { data: response } = await axios.get("utilizador/tipoCount");
      return response.data;
    });

  const { isLoading: loadingCountSalas, data: countSalas } = useQuery(
    "getSalasCount",
    async () => {
      const { data: response } = await axios.get("sala/list");
      return response.data.length;
    }
  );

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
          <CardContent>
            <MyResponsivePie
              data={dataTipoUtilizadores}
              loading={loadingTipoUtilizadores}
            />
          </CardContent>
        </Card>
      </Box>
      <Box gridColumn={{ xs: "span 2", md: "span 4" }}>
        <Card>
          <CardHeader
            title="Reservas"
            action={
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack direction="row" spacing={1}>
                  <MobileDatePicker
                    label="Inicio"
                    inputFormat="dd/MM/yyyy"
                    value={startDate}
                    onChange={(e) => setStartDate(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <MobileDatePicker
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
        <Button onClick={() => socket.emit("nmrSockets")}>ping</Button>
      </Box>
      <Box gridColumn={{ xs: "span 2", md: "span 4" }}>
        <Card>
          <CardHeader title="Teste" />
          <CardContent>
            <Tesatebar />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
