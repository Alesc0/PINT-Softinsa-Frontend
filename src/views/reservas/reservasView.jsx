import { Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import axios from "api/_axios";
import TableReservas from "./components/table/tableReservas";
import { UserContext } from "App";

function ReservasView() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [autoCentros, setAutoCentros] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [params, setParams] = useState({});
  const { user } = useContext(UserContext);

  const { data: dataCentros } = useQuery(["getCentros"], async () => {
    const { data: response } = await axios.get("centro/list");
    const getUserCentro = response.data.find(
      (val) => val.idcentro === user.idcentro
    );
    setAutoCentros([getUserCentro]);
    setParams({
      centros: [getUserCentro?.idcentro],
    });
    return response.data;
  });

  const { isLoading, data } = useQuery(
    ["getReservas", page, rowsPerPage, dataCentros, params],
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
        ...(autoCentros.length > 0 && {
          centros: autoCentros.map((val) => val.idcentro),
        }),
        ...(pesquisa && { pesquisa }),
        ...(data && { data: searchData.toLocaleDateString("en-CA") }),
      });
    } else {
      setAutoCentros([]);
      setPesquisa("");
      setSearchData(null);
      setParams({});
    }
  };

  const tableProps = {
    reservas: data?.data,
    loading: isLoading,
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
