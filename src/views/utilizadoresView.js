import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import EnhancedTable from "../components/enhancedTable/enhancedTable";
import NavBar from "../components/navBar/navBar";
import SideBar from "../components/sideBar/sideBar";
import axios from "axios";

const sideBar = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 4,
      textAlign: "center",
      width: 300,
      p: 3,
    }}
    role="presentation"
  >
    <Typography variant="h4" component="div" sx={{ mb: 2 }}>
      Filtros
    </Typography>
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      placeholder="ID"
    />
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      placeholder="Nome"
    />
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      placeholder="Email"
    />
    <Button variant="contained"> Pesquisar </Button>
  </Box>
);

function UtilizadoresView(props) {
  const [users, setUsers] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [value, toggle] = useState(false);

  const refetch = useCallback(() => {
    toggle((prev) => !prev);
  }, [toggle]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get("utilizador/list");
        setUsers(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [setUsers, value]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSidebar(open);
  };
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
          <SideBar
            anchor="right"
            toggleDrawer={toggleDrawer}
            state={sidebar}
            inner={sideBar}
          />
          <EnhancedTable
            refetch={refetch}
            setUsers={setUsers}
            data={users}
            toggleDrawer={toggleDrawer}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default UtilizadoresView;
