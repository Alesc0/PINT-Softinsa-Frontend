import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "api/_axios";
import TableReservas from "./components/table/tableReservas";

function ReservasView() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const { isFetching, data } = useQuery(
    ["getReservas", page, rowsPerPage],
    async () => {
      const { data: response } = await axios.get("reserva/list", {
        params: {
          offset: page * rowsPerPage,
          limit: rowsPerPage,
        },
      });
      return response;
    },
    {
      keepPreviousData: true,
    }
  );

  const tableProps = {
    reservas: data?.data,
    loading: isFetching,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    count: data?.count || 0,
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Reservas</Typography>
      <TableReservas {...tableProps} />
    </Stack>
  );
}
export default ReservasView;
