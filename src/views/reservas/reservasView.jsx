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
  const { user } = useContext(UserContext);

  const { data: dataCentros } = useQuery(["getCentros"], async () => {
    const { data: response } = await axios.get("centro/list");
    setAutoCentros([
      response.data.find((val) => val.idcentro === user.idcentro),
    ]);
    return response.data;
  });

  const { refetch, isLoading, data } = useQuery(
    ["getReservas", page, rowsPerPage, dataCentros],
    async () => {
      const { data: response } = await axios.get("reserva/list", {
        params: {
          offset: page * rowsPerPage,
          limit: rowsPerPage,
          centro: autoCentros.map((val) => val.idcentro),
          pesquisa: pesquisa,
        },
      });
      return response;
    },
    {
      enabled: !!dataCentros,
      keepPreviousData: true,
    }
  );

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
    handleFiltros: refetch,
    dataCentros,
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Reservas</Typography>
      <TableReservas {...tableProps} />
    </Stack>
  );
}
export default ReservasView;
