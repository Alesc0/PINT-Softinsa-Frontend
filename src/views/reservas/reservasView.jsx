import { Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import axios from "api/_axios";
import TableReservas from "./components/table/tableReservas";
import { UserContext } from "App";

function ReservasView() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [autoCentros, setAutoCentros] = useState(null);
  const [autoSalas, setAutoSalas] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [params, setParams] = useState({});
  const { user } = useContext(UserContext);

  const { data: dataCentros } = useQuery(["getCentrosReservas"], async () => {
    const { data: response } = await axios.get("centro/list");

    const getUserCentro = response.data.find(
      (val) => val.idcentro === user.idcentro
    );
    setAutoCentros(getUserCentro);
    setParams({
      centros: [getUserCentro?.idcentro],
    });

    return response.data;
  });

  const { data: dataSalas } = useQuery(
    ["getSalasReservas", autoCentros],
    async () => {
      const { data: response } = await axios.get("sala/list", {
        params: {
          offset: 0,
          limit: 999,
          ...(autoCentros && { centros: [autoCentros?.idcentro] }),
        },
      });
      return response.data;
    },
    { enabled: !!dataCentros }
  );

  const { isLoading, data } = useQuery(
    ["getReservasView", page, rowsPerPage, dataCentros, params],
    async () => {
      const { data: response } = await axios.get("reserva/list", {
        params: {
          offset: page * rowsPerPage,
          limit: rowsPerPage,
          ...params,
        },
      });
      return response;
    },
    {
      enabled: !!dataCentros,
      keepPreviousData: true,
    }
  );
  const handleFiltros = (check) => {
    if (check) {
      setParams({
        ...(autoCentros && {
          centros: [autoCentros?.idcentro],
        }),
        ...(pesquisa && { pesquisa }),
        ...(searchData && { data: searchData.toLocaleDateString("en-CA") }),
        ...(autoSalas && {
          salas: [autoSalas?.idsala],
        }),
      });
    } else {
      setAutoCentros(null);
      setPesquisa("");
      setSearchData(null);
      setParams({});
    }
  };

  const tableProps = {
    reservas: data?.data,
    isLoading,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    count: data?.count || 0,
    pesquisa,
    setPesquisa,
    autoCentros,
    setAutoCentros,
    handleFiltros: handleFiltros,
    dataCentros,
    dataSalas,
    setAutoSalas,
    autoSalas,
    searchData,
    setSearchData,
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Reservas</Typography>
      <TableReservas {...tableProps} />
    </Stack>
  );
}
export default ReservasView;
