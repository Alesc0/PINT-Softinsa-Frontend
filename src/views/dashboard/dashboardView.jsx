import { MobileDatePicker } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "api/_axios";
import { UserContext } from "App";
import MultipleAutocomplete from "common/multipleAutocomplete/multipleAutocomplete";
import MyResponsiveBar from "common/nivoCharts/bars";
import PercentSalas from "common/nivoCharts/percentSalas";
import MyResponsivePie from "common/nivoCharts/pie";
import MyResponsiveTimeRange from "common/nivoCharts/timeRange";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import BoxNumbers from "./components/boxNumbers";
import TablePedidosLimpeza from "./components/tablePedidosLimpeza/tablePedidosLimpeza";
import TableReservasDecorrer from "./components/tableReservasDecorrer/tableReservasDecorrer";
import TableReservasNext from "./components/tableReservasNext/tableReservasNext";

export default function Dashboard() {
  var date = new Date();
  date.setDate(date.getDate() - 120);
  var date2 = new Date();
  date2.setDate(date2.getDate() + 120);

  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(date2);
  const [autoCentros, setAutoCentros] = useState(null);
  const [autoSalas, setAutoSalas] = useState(null);

  const { user } = useContext(UserContext);

  const { isLoading: loadingCentros, data: dataCentros } = useQuery(
    ["getCentrosDashboard"],
    async () => {
      const { data: response } = await axios.get("centro/list");
      const getUserCentro = response.data.find(
        (val) => val.idcentro === user.idcentro
      );
      setAutoCentros(getUserCentro);
      return response.data;
    }
  );

  const { isLoading: loadingCountUtilizadores, data: countUtilizadores } =
    useQuery(
      ["getUtilizadoresCount", autoCentros],
      async () => {
        const { data: response } = await axios.get("utilizador/list", {
          params: {
            offset: 0,
            limit: 0,
            centros: [autoCentros?.idcentro || user?.centro.idcentro],
          },
        });
        return response.count;
      },
      {
        enabled: !!dataCentros,
        keepPreviousData: true,
      }
    );

  const { isLoading: loadingTipoUtilizadores, data: dataTipoUtilizadores } =
    useQuery(
      ["getUtilizadoresTipoCount", autoCentros],
      async () => {
        const { data: response } = await axios.get("utilizador/tipoCount", {
          params: {
            centro: autoCentros?.idcentro || user?.centro.idcentro,
          },
        });
        return response.data;
      },
      {
        enabled: !!dataCentros,
        keepPreviousData: true,
      }
    );

  const { isLoading: loadingSalas, data: dataSalas } = useQuery(
    ["getSalasDashboard", autoCentros],
    async () => {
      const { data: response } = await axios.get("sala/list", {
        params: {
          offset: 0,
          limit: 999,
          centros: [autoCentros?.idcentro || user?.centro.idcentro],
        },
      });
      return response.data;
    },
    {
      enabled: !!dataCentros,
      keepPreviousData: true,
    }
  );

  const { isLoading: loadingReservas, data: dataReservas } = useQuery(
    ["getReservasDashboard", autoCentros, autoSalas],
    async () => {
      const { data: response } = await axios.get("reserva/list", {
        params: {
          offset: 0 * 10,
          limit: 10,
          centros: [autoCentros?.idcentro || user.centro.idcentro],
          ...(autoSalas && { salas: [autoSalas.idsala] }),
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
      ["getReservasAtuaisDashboard", autoCentros],
      async () => {
        const { data: response } = await axios.get("reserva/reservasDecorrer", {
          params: {
            centro: autoCentros?.idcentro || user?.centro.idcentro,
          },
        });
        return response.data;
      },
      {
        enabled: !!dataCentros,
        keepPreviousData: true,
      }
    );
  const { data: dataPercentagem } = useQuery(
    ["getSalasPercentagem", autoCentros],
    async () => {
      const { data: response } = await axios.get(
        "reserva/percentSalasUtilizadas",
        {
          params: {
            centro: autoCentros?.idcentro || user?.centro.idcentro,
          },
        }
      );
      return response;
    },
    {
      enabled: !!dataCentros,
      keepPreviousData: true,
    }
  );

  const { data: dataOcupacao } = useQuery(
    ["getAlocacaoSalas", autoCentros],
    async () => {
      const { data: response } = await axios.get("/reserva/alocacaoMensal", {
        params: {
          centro: autoCentros?.idcentro || user?.centro.idcentro,
        },
      });
      return response.data;
    },
    {
      enabled: !!dataCentros,
      keepPreviousData: true,
    }
  );

  const { isLoading: loadingPedidos, data: dataPedidos } = useQuery(
    ["getPedidosDashboard", autoCentros],
    async () => {
      const { data: response } = await axios.get("pedido/getPedidosEstado", {
        params: {
          centro: autoCentros?.idcentro || user?.centro.idcentro,
        },
      });
      return response;
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
  const tablePedidosLimpezaProps = {
    pedidos: dataPedidos?.data,
    isLoading: loadingPedidos,
  };

  const maProps = {
    data: dataCentros,
    getter: autoCentros,
    setter: setAutoCentros,
    text: "Centro",
    multiple: false,
  };

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(4, 2fr)" }}
        gap={3}
      >
        <BoxNumbers
          loading={loadingCentros || loadingCountUtilizadores}
          info={countUtilizadores}
          text={"Utilizadores Registados"}
        />

        <BoxNumbers
          loading={loadingReservas || loadingCentros}
          info={dataReservas?.count}
          text={"Reservas Futuras"}
        />

        <BoxNumbers
          loading={loadingSalas || loadingCentros || loadingReservasAtuais}
          info={dataSalas?.length - dataReservasAtuais?.length || 0}
          text={"Salas Livres"}
        />

        <Card component={Paper}>
          <CardHeader title={"Filtrar por Centro"} />
          <CardContent>
            {loadingCentros ? (
              <CircularProgress />
            ) : (
              <MultipleAutocomplete {...maProps} />
            )}
          </CardContent>
        </Card>
        <Box gridColumn="span 2" gridRow="span 2">
          <Card>
            <CardHeader title="Pedidos de Limpeza" />
            <CardContent sx={{ py: 1 }}>
              <TablePedidosLimpeza {...tablePedidosLimpezaProps} />
            </CardContent>
          </Card>
        </Box>

        <Box gridColumn="span 2">
          <Card>
            <CardHeader title="Reservas a Decorrer" />
            <CardContent sx={{ py: 1 }}>
              <TableReservasDecorrer {...tableReservasDecorrerProps} />
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
                      options={dataSalas || []}
                      value={autoSalas}
                      ChipProps={{ color: "primary", size: "small" }}
                      getOptionLabel={(option) => option.nome}
                      isOptionEqualToValue={(op, val) =>
                        op.idsala === val.idsala
                      }
                      onChange={(event, value, reason) => {
                        if (reason === "clear") setAutoSalas(null);
                        else setAutoSalas(value);
                      }}
                      onInputChange={(event, value, reason) => {
                        if (reason === "clear") {
                          setAutoSalas(null);
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
            <CardHeader title="Uso relativo à lotação" />
            <CardContent>
              <PercentSalas data={dataPercentagem} />
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
              <MyResponsiveTimeRange
                startDate={startDate}
                endDate={endDate}
                centro={autoCentros?.idcentro}
              />
            </CardContent>
          </Card>
        </Box>
        <Box gridColumn={{ xs: "span 2", md: "span 4" }}>
          <Card>
            <CardHeader title="Alocação diária" />
            <CardContent>
              <MyResponsiveBar data={dataOcupacao} />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}
