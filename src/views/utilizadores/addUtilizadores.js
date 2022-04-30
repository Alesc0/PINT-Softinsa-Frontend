import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function AddUtilizadoresView() {
  const [permissionTab, setPermissionTab] = useState(0);
  const [centros, setCentros] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get("/centro/list");
        setCentros(response);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [setCentros]);

  const handleChange = (event, newValue) => setPermissionTab(newValue);
  return (
    <Box
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        m: "2em auto",
        p: 3,
        color: "text.primary",
      }}
    >
      <FormControl>
        <TextField id="txtNome" label="Nome" variant="outlined" />
      </FormControl>
      <FormControl>
        <TextField id="txtEmail" label="Email" variant="outlined" />
      </FormControl>
      <FormControl>
        <TextField id="txtContacto" label="Contacto" variant="outlined" />
      </FormControl>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <FormControl>
          <InputLabel id="label-select"> Centro </InputLabel>
          <Select sx={{ minWidth: 125 }} label="Centro" labelId="label-select">
            {centros.length > 0 ? (
              centros.map((row) => (
                <MenuItem key={row.idcentro} value={row.idcentro}>
                  {row.cidade}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={-1}> {"Sem centros disponíveis!"} </MenuItem>
            )}
          </Select>
        </FormControl>
        <Box sx={{ ml: "auto" }}>
          <Tabs value={permissionTab} onChange={handleChange}>
            <Tab label="Regular" value={0} />
            <Tab label="Administrador" value={1} />
            <Tab label="Limpeza" value={2} />
          </Tabs>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
        <Button
          component={Link}
          to="/utilizadores"
          color="error"
          variant="contained"
        >
          Voltar
        </Button>
        <Button color="info" variant="contained">
          Confirmar
        </Button>
      </Box>
    </Box>
  );
}
export default AddUtilizadoresView;
