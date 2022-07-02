import { Button, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "api/axios";
import EnhancedTable from "./components/table/tableUtilizadores";

function UtilizadoresView() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const { isFetching, error, data } = useQuery(
    ["getUtilizadores", page, rowsPerPage],
    async () => {
      let { data: response } = await axios.get("/utilizador/list", {
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

  if (error) toast.error("Erro a obter utilizadores!");

  const tableProps = {
    isLoading: isFetching,
    users: data?.data || [],
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    count: data?.count || 0,
  };

  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Typography variant="h3">Gerir Utilizadores</Typography>
          <Button
            color="info"
            variant="outlined"
            component={Link}
            to="add"
            sx={{ ml: "auto" }}
          >
            Adicionar Utilizador
          </Button>
        </Stack>
        <EnhancedTable {...tableProps} />
      </Stack>
    </>
  );
}
export default UtilizadoresView;
