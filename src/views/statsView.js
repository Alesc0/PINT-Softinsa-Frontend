import { Box } from "@mui/system";
import { CssBaseline, Paper, Typography } from "@mui/material";
import PieChart from "../components/nivoCharts/pie";
import TimeRange from "../components/nivoCharts/timeRange";
import { ThemeProvider } from "@mui/material/styles";
import BarsChart from "../components/nivoCharts/bars";
import MenuDrawer from "../components/menuDrawer/menuDrawer";

function Stats(props) {
  const { theme } = props;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MenuDrawer theme={theme} pageName="Estatísticas / Graficos">
        <Box
          display="grid"
          gridTemplateColumns={{
            lg: "repeat(2,1fr)",
            md: "repeat(2,1fr)",
            sm: "repeat(1,1fr)",
          }}
          gap={5}
          sx={{
            p: 5,
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <Box
            component={Paper}
            sx={{
              height: "20em",
              border: "solid thin",
              borderRadius: 3,
              borderColor: "primary.main",
              p: 1,
            }}
          >
            <Typography variant="h4" component="div" textAlign="center">
              Horas mais Requisitadas
            </Typography>
            <PieChart theme={theme} />
          </Box>

          <Box
            component={Paper}
            sx={{
              height: "20em",
              border: "solid thin",
              borderRadius: 3,
              borderColor: "primary.main",
              p: 1,
            }}
          >
            <Typography variant="h4" component="div" textAlign="center">
              Salas mais Usadas
            </Typography>
            <BarsChart theme={theme} />
          </Box>
          <Box
            component={Paper}
            sx={{
              height: "18em",
              border: "solid thin",
              borderRadius: 3,
              borderColor: "primary.main",
              p: 2,
            }}
          >
            <Typography variant="h4" component="div" textAlign="center">
              Reservas
            </Typography>
            <TimeRange theme={theme} />
          </Box>
        </Box>
      </MenuDrawer>
    </ThemeProvider>
  );
}
export default Stats;
