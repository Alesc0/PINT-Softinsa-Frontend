import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EnhancedTable from "../../components/utilizadores/enhancedTable/enhancedTable";

function UtilizadoresView(props) {
  const [users, setUsers] = useState([]);
  const [value, toggle] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const refetch = useCallback(() => {
    toggle((prev) => !prev);
  }, [toggle]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get("/utilizador/list");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [setUsers, value]);

  return (
    <>
      <Stack spacing={2}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h3">Gerir Utilizadores</Typography>
          <Box sx={{ ml: "auto" }}>
            <Button color="info" component={Link} to="add" variant="contained">
              Adicionar Utilizador
            </Button>
          </Box>
        </Box>
        <EnhancedTable
          refetch={refetch}
          setUsers={setUsers}
          isLoading={isLoading}
          setLoading={setLoading}
          data={users}
        />
      </Stack>
    </>
  );
}
export default UtilizadoresView;
