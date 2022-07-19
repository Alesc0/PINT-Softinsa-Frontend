import { MobileDatePicker } from "@mui/lab";
import {
  Autocomplete,
  Box, Card,
  CardContent,
  CardHeader,
  Stack,
  TextField
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "api/_axios";
import { UserContext } from "App";
import MyResponsiveBar from "common/nivoCharts/bars";
import PercentSalas from "common/nivoCharts/percentSalas";
import MyResponsivePie from "common/nivoCharts/pie";
import MyResponsiveTimeRange from "common/nivoCharts/timeRange";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import BoxNumbers from "./components/boxNumbers";
import TableReservasDecorrer from "./components/tableReservasDecorrer/tableReservasDecorrer";
import TableReservasNext from "./components/tableReservasNext/tableReservasNext";

const info = [
  {
    id: 3,
    val: 231,
    desc: "Reservas realizadas",
  },
];

export default function Dashboard() {
  var date = new Date();
  date.setDate(date.getDate() - 120);
  var date2 = new Date();
  date2.setDate(date2.getDate() + 120);

  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(date2);
  const [autoCentrosReservas, setAutoCentrosReservas] = useState([]);
  const [autoCentrosReservasAtuais, setAutoCentrosReservasAtuais] = useState(
    []
  );
  const [autoSalasReservas, setAutoSalasReservas] = useState([]);

  const { user } = useContext(UserContext);

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

  const { data: dataCentros } = useQuery(["getCentrosDashboard"], async () => {
    const { data: response } = await axios.get("centro/list");
    const getUserCentro = response.data.find(
      (val) => val.idcentro === user.idcentro
    );
    setAutoCentrosReservas([getUserCentro]);
    setAutoCentrosReservasAtuais([getUserCentro]);
    return response.data;
  });

  const { data: dataSalas } = useQuery(
    ["getSalasDashboard", autoCentrosReservas],
    async () => {
      const { data: response } = await axios.get("sala/list", {
        params: {
          offset: 0,
          limit: 999,
          centros: autoCentrosReservas.map((val) => val.idcentro),
        },
      });
      return response.data;
    }
  );

  const { isLoading: loadingReservas, data: dataReservas } = useQuery(
    ["getReservasDashboard", autoCentrosReservas, autoSalasReservas],
    async () => {
      const { data: response } = await axios.get("reserva/list", {
        params: {
          offset: 0 * 10,
          limit: 10,
          centros: autoCentrosReservas.map((val) => val.idcentro),
          salas: autoSalasReservas.map((val) => val.idsala),
        },
      });
      return response;
    },
    {
      enabled: !!dataCentros,
      keepPreviousData: true,
    }
  );

  const { isLoading: loadingReservasAtuais, data: dataReservasAtuais } =
    useQuery(
      ["getReservasAtuaisDashboard", autoCentrosReservasAtuais],
      async () => {
        const { data: response } = await axios.get("reserva/reservasDecorrer", {
          params: {
            centros: autoCentrosReservasAtuais.map((val) => val.idcentro),
          },
        });
        return response.data;
      },
      {
        enabled: !!dataCentros,
        keepPreviousData: true,
      }
    );

  const tableReservasProps = {
    reservas: dataReservas?.data,
    isLoading: loadingReservas,
  };
  const tableReservasDecorrerProps = {
    reservas: dataReservasAtuais,
    isLoading: loadingReservasAtuais,
  };
  return (
    <>
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
        <BoxNumbers
          loading={loadingReservas}
          info={dataReservas?.count}
          text={"Reservas Futuras"}
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
        <Box gridColumn="span 2">
          <Card>
            <CardHeader
              title="Proximas Reservas"
              action={
                <>
                  <Stack direction={{ sm: "column", md: "row" }} spacing={2}>
                    <Autocomplete
                      sx={{ minWidth: 150 }}
                      multiple
                      options={dataCentros || []}
                      value={autoCentrosReservas}
                      ChipProps={{ color: "primary", size: "small" }}
                      getOptionLabel={(option) => option.nome}
                      isOptionEqualToValue={(op, val) =>
                        op.idcentro === val.idcentro
                      }
                      onChange={(event, value, reason) => {
                        if (reason === "clear") {
                          setAutoCentrosReservas(null);
                          setAutoSalasReservas([]);
                        } else {
                          setAutoCentrosReservas(value);
                          setAutoSalasReservas([]);
                        }
                      }}
                      onInputChange={(event, value, reason) => {
                        if (reason === "clear") {
                          setAutoCentrosReservas([]);
                          setAutoSalasReservas([]);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label={"Filtrar Centros"}
                        />
                      )}
                    />
                    <Autocomplete
                      sx={{ minWidth: 150 }}
                      multiple
                      options={dataSalas || []}
                      value={autoSalasReservas}
                      ChipProps={{ color: "primary", size: "small" }}
                      getOptionLabel={(option) => option.nome}
                      isOptionEqualToValue={(op, val) =>
                        op.idsala === val.idsala
                      }
                      onChange={(event, value, reason) => {
                        if (reason === "clear") return;
                        else setAutoSalasReservas(value);
                      }}
                      onInputChange={(event, value, reason) => {
                        if (reason === "clear") {
                          setAutoSalasReservas([]);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label={"Filtrar Salas"}
                        />
                      )}
                    />
                  </Stack>
                </>
              }
            />
            <CardContent sx={{ py: 1 }}>
              <TableReservasNext {...tableReservasProps} />
            </CardContent>
          </Card>
        </Box>
        <Box gridColumn="span 2">
          <Card>
            <CardHeader
              title="Reservas a Decorrer"
              action={
                <Autocomplete
                  sx={{ minWidth: 150 }}
                  multiple
                  options={dataCentros || []}
                  value={autoCentrosReservasAtuais}
                  ChipProps={{ color: "primary", size: "small" }}
                  getOptionLabel={(option) => option.nome}
                  isOptionEqualToValue={(op, val) =>
                    op.idcentro === val.idcentro
                  }
                  onChange={(event, value, reason) => {
                    if (reason === "clear") {
                      setAutoCentrosReservasAtuais(null);
                    } else {
                      setAutoCentrosReservasAtuais(value);
                    }
                  }}
                  onInputChange={(event, value, reason) => {
                    if (reason === "clear") {
                      setAutoCentrosReservasAtuais([]);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={"Filtrar Centros"}
                    />
                  )}
                />
              }
            />
            <CardContent sx={{ py: 1 }}>
              <TableReservasDecorrer {...tableReservasDecorrerProps} />
            </CardContent>
          </Card>
        </Box>
        <Box gridColumn={{ xs: "span 2", md: "span 4" }}>
          <Card>
            <CardHeader
              title="Reservas"
              action={
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack direction={{ sm: "column", md: "row" }} spacing={1}>
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
        </Box>
        <Box gridColumn={{ xs: "span 2", md: "span 4" }}>
          <Card>
            <CardHeader title="Uso relativo à lotação" />
            <CardContent>
              <PercentSalas />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}
