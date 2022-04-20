import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  TextField,
  Tabs,
  Divider,
  Typography,
  ListItemText,
  ListItem,
  List,
  ListItemIcon,
  Checkbox,
  ListItemButton,
  useTheme,
} from "@mui/material";
import ThemeProvider from "../../theme";
import { useEffect, useState } from "react";
import MenuDrawer from "../../components/menuDrawer/menuDrawer";
import { Build } from "@mui/icons-material";
import SideBar from "../../components/sideBar/sideBar";
import axios from "axios";
import { toast } from "react-toastify";

const perms = [
  {
    id: 1,
    checked: false,
    text: "Permission 1",
  },
  {
    id: 2,
    checked: true,
    text: "Permisson 2",
  },
  {
    id: 3,
    checked: true,
    text: "Permission 3",
  },
  {
    id: 4,
    checked: false,
    text: "Permission 4",
  },
];

function AddUtilizadoresView() {
  const [sidebar, setSidebar] = useState(false);
  const [permissionTab, setPermissionTab] = useState(0);
  const [centros, setCentros] = useState([]);
  const [permissions, setPermissions] = useState(perms);

  const handleToggle = (value) => () => {
    let temp = [...permissions];
    let temp_el = { ...temp[value] };
    temp_el.checked = !temp_el.checked;
    temp[value] = temp_el;
    setPermissions(temp);
  };
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

  const handleSidebar = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSidebar(open);
  };

  const handleChange = (event, newValue) => setPermissionTab(newValue);
  return (
    <ThemeProvider>
      <MenuDrawer pageName="Adicionar Utilizador">
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
              <InputLabel id="label-select">Centro</InputLabel>
              <Select
                sx={{ minWidth: 125 }}
                label="Centro"
                labelId="label-select"
              >
                {centros.length > 0 ? (
                  centros.map((row) => (
                    <MenuItem key={row.idcentro} value={row.idcentro}>
                      {row.cidade}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={-1}>{"Sem centros disponíveis!"}</MenuItem>
                )}
              </Select>
            </FormControl>
            <Tabs sx={{ml:"auto"}} value={permissionTab} onChange={handleChange}>
              <Tab label="Regular" value={0} />
              <Tab label="Admin" value={1} />
              <Tab label="Limpeza" value={2} />
              <Tab label="Manutenção" value={3} />
            </Tabs>
          </Box>
          <Divider />
          <Button sx={{ width: "fit-content", ml: "auto" }} variant="contained">
            Confirmar
          </Button>
        </Box>
      </MenuDrawer>
    </ThemeProvider>
  );
}
export default AddUtilizadoresView;
