import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  TextField,
  ThemeProvider,
  Tabs,
  Divider,
  Typography,
  ListItemText,
  ListItem,
  List,
} from "@mui/material";
import { useState } from "react";
import MenuDrawer from "../../components/menuDrawer/menuDrawer";
import { Build, CheckBox } from "@mui/icons-material";
import SideBar from "../../components/sideBar/sideBar";

const centros = [
  {
    id: 1,
    centro: "Viseu",
  },
  {
    id: 2,
    centro: "Tomar",
  },
  {
    id: 3,
    centro: "Fundão",
  },
];
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
const sideBar = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      width: 300,
      p: 3,
    }}
    role="presentation"
  >
    <Typography variant="h4">Permissões</Typography>
    <Divider />
    <List sx={{ width: "100%" }}>
      {perms.map((row) => (
        <ListItem key={row.id} alignItems="flex-start" button>
          <CheckBox checked={row.checked} />
          <ListItemText primary={row.text} />
        </ListItem>
      ))}
    </List>
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Button variant="contained"> Pesquisar </Button>
    </Box>
  </Box>
);
function AddUtilizadoresView(props) {
  const [sidebar, setSidebar] = useState(false);
  const [permissionTab, setPermissionTab] = useState(0);
  const { theme } = props;

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MenuDrawer theme={theme} pageName="Adicionar Utilizador">
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
          <FormControl>
            <InputLabel id="demo">Centro</InputLabel>
            <Select sx={{ minWidth: 100 }} label="Centros" labelId="demo">
              {centros.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.centro}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Tabs value={permissionTab} onChange={handleChange}>
              <Tab label="Regular" value={0} />
              <Tab label="Admin" value={1} />
              <Tab label="Limpeza" value={2} />
              <Tab label="Manutenção" value={3} />
            </Tabs>
            <Button
              sx={{ ml: "auto" }}
              onClick={handleSidebar(true)}
              variant="outlined"
            >
              <Build />
            </Button>
          </Box>
          <Divider />
          <Button sx={{ width: "fit-content", ml: "auto" }} variant="contained">
            Confirmar
          </Button>
        </Box>
      </MenuDrawer>
      <SideBar
        anchor="right"
        handleSidebar={handleSidebar}
        state={sidebar}
        inner={sideBar}
      />
    </ThemeProvider>
  );
}
export default AddUtilizadoresView;
