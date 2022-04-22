import { Box } from "@mui/system";
import { Paper, Typography } from "@mui/material";
import PieChart from "../components/nivoCharts/pie";
import TimeRange from "../components/nivoCharts/timeRange";
import BarsChart from "../components/nivoCharts/bars";

function Stats(props) {
  return (
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
        <PieChart />
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
        <BarsChart />
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
        <TimeRange />
      </Box>
    </Box>
  );
}
export default Stats;
