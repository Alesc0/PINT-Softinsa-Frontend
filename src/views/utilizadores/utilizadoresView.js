import { Box, Button } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import EnhancedTable from "../../components/enhancedTable/enhancedTable";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function UtilizadoresView(props) {
  const [users, setUsers] = useState([]);
  const [value, toggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const refetch = useCallback(() => {
    toggle((prev) => !prev);
  }, [toggle]);

  props.setPageName("Utilizadores");

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
    <Box
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        m: "0 auto",
        p: 5,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Box sx={{ ml: "auto" }}>
        <Button component={Link} to="add" variant="contained">
          Adicionar Utilizador
        </Button>
      </Box>
      <EnhancedTable
        refetch={refetch}
        setUsers={setUsers}
        isLoading={isLoading}
        setLoading={setIsLoading}
        data={users}
      />
    </Box>
  );
}
export default UtilizadoresView;
