import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import TableReservas from "../../components/reservas/enhancedTable/enhancedTable";

function ReservasView() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("reserva/list", {
          params: {
            offset: page * rowsPerPage,
            limit: rowsPerPage,
          },
        });
        setReservas(response.data.reservas);
        if (response.count) setCount(response.count);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [setReservas, page, rowsPerPage]);

  const tableProps = {
    reservas,
    loading,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    count,
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Reservas</Typography>
      <TableReservas {...tableProps} />
    </Stack>
  );
}
export default ReservasView;
