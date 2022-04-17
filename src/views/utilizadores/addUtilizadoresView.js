import {
  Box,
  Button,
  CssBaseline,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  ThemeProvider,
} from "@mui/material";
import MenuDrawer from "../../components/menuDrawer/menuDrawer";

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

function AddUtilizadoresView(props) {
  const { theme } = props;
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
            m: "0 auto",
            p: 5,
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <InputLabel variant="standard" htmlFor="selectCentro">
            Nome
          </InputLabel>
          <TextField id="txtNome" label="Nome" variant="outlined" />
          <InputLabel variant="standard" htmlFor="selectCentro">
            Contacto
          </InputLabel>
          <TextField id="txtContacto" label="Contacto" variant="outlined" />
          <InputLabel variant="standard" htmlFor="selectCentro">
            Morada
          </InputLabel>
          <TextField id="txtMorada" label="Morada" variant="outlined" />
          <InputLabel variant="standard" htmlFor="selectCentro">
            Centro
          </InputLabel>
          <Select id="selectCentro" defaultValue={1} label="Age">
            {centros.map((row) => (
              <MenuItem value={row.id}>{row.centro}</MenuItem>
            ))}
          </Select>
          <Button variant="outlined">Permissões</Button>
          <Button variant="contained">Confirmar</Button>
        </Box>
      </MenuDrawer>
    </ThemeProvider>
  );
}
export default AddUtilizadoresView;
