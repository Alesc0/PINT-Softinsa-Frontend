import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EnhancedTable from "../../components/enhancedTable/enhancedTable";

function UtilizadoresView(props) {
  const [users, setUsers] = useState([]);
  const [value, toggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const refetch = useCallback(() => {
    toggle((prev) => !prev);
  }, [toggle]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data: response } = await axios.get("/utilizador/list");
        setUsers(response);
        setIsLoading(false);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [setUsers, value]);

  return (
    <>
      <Box
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          m: "0 auto",
          p: 5,
          pt: 2,
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography variant="h3">Gerir Utilizadores</Typography>
          <Box sx={{ ml: "auto" }}>
            <Button component={Link} to="add" variant="contained">
              Adicionar Utilizador
            </Button>
          </Box>
        </Box>
        <EnhancedTable
          refetch={refetch}
          setUsers={setUsers}
          isLoading={isLoading}
          setLoading={setIsLoading}
          data={users}
        />
      </Box>
    </>
  );
}
export default UtilizadoresView;
