import { Container, ThemeProvider, Typography } from "@mui/material";
import MenuDrawer from "../../components/menuDrawer/menuDrawer";

function AddUtilizadoresView(props) {
  const { theme } = props;
  return (
    <ThemeProvider theme={theme}>
      <MenuDrawer theme={theme}>
        <Typography variant="h3" component="h3">
          Adicionar Utilizador
        </Typography>

        <Container></Container>
      </MenuDrawer>
    </ThemeProvider>
  );
}
export default AddUtilizadoresView;
