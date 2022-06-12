import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "../../api/axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EnhancedTable from "../../components/utilizadores/enhancedTable/enhancedTable";

function UtilizadoresView(props) {
  const [users, setUsers] = useState([]);
  const [value, toggle] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const refetch = useCallback(() => {
    toggle((prev) => !prev);
  }, [toggle]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get("/utilizador/list", {
          params: {
            offset: page * rowsPerPage,
            limit: rowsPerPage,
          },
        });

        setUsers(response.data);
        if (response.count) setCount(response.count);
        setLoading(false);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [setUsers, value, page, rowsPerPage]);

  const tableProps = {
    refetch,
    isLoading,
    setLoading,
    users,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    count,
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
