import { Box, ThemeProvider } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import EnhancedTable from "../components/enhancedTable/enhancedTable";
import NavBar from "../components/navBar/navBar";
import axios from "axios";

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
        const { data: response } = await axios.get("utilizador/list");
        setUsers(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [setUsers, value]);

  return (
    <ThemeProvider theme={props.th}>
      <NavBar />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Box
          maxWidth="lg"
          sx={{
            m: "0 auto",
            p: 5,
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <EnhancedTable
            refetch={refetch}
            setUsers={setUsers}
            isLoading={isLoading}
            setLoading={setIsLoading}
            data={users}
            th={props.th}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default UtilizadoresView;
