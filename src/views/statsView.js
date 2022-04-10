import { Box } from "@mui/system";
import { Paper, Typography } from "@mui/material";
import PieChart from "../components/nivoCharts/pie";
import CalendarChart from "../components/nivoCharts/calendar";
import { ThemeProvider } from "@mui/material/styles";
import BarsChart from "../components/nivoCharts/bars";
import ResponsiveDrawer from "../components/drawer/drawer";
const data = [
  {
    id: "python",
    label: "python",
    value: 440,
    color: "hsl(11, 70%, 50%)",
  },
  {
    id: "haskell",
    label: "haskell",
    value: 101,
    color: "hsl(4, 70%, 50%)",
  },
  {
    id: "stylus",
    label: "stylus",
    value: 75,
    color: "hsl(301, 70%, 50%)",
  },
  {
    id: "php",
    label: "php",
    value: 172,
    color: "hsl(113, 70%, 50%)",
  },
  {
    id: "hack",
    label: "hack",
    value: 359,
    color: "hsl(275, 70%, 50%)",
  },
];
const dataBars = [
  {
    country: "AD",
    "hot dog": 152,
    "hot dogColor": "hsl(215, 70%, 50%)",
    burger: 72,
    burgerColor: "hsl(271, 70%, 50%)",
    sandwich: 177,
    sandwichColor: "hsl(270, 70%, 50%)",
    kebab: 114,
    kebabColor: "hsl(248, 70%, 50%)",
    fries: 47,
    friesColor: "hsl(290, 70%, 50%)",
    donut: 16,
    donutColor: "hsl(96, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 103,
    "hot dogColor": "hsl(113, 70%, 50%)",
    burger: 107,
    burgerColor: "hsl(253, 70%, 50%)",
    sandwich: 9,
    sandwichColor: "hsl(354, 70%, 50%)",
    kebab: 166,
    kebabColor: "hsl(65, 70%, 50%)",
    fries: 95,
    friesColor: "hsl(172, 70%, 50%)",
    donut: 81,
    donutColor: "hsl(291, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 69,
    "hot dogColor": "hsl(289, 70%, 50%)",
    burger: 129,
    burgerColor: "hsl(201, 70%, 50%)",
    sandwich: 85,
    sandwichColor: "hsl(343, 70%, 50%)",
    kebab: 181,
    kebabColor: "hsl(225, 70%, 50%)",
    fries: 80,
    friesColor: "hsl(178, 70%, 50%)",
    donut: 187,
    donutColor: "hsl(211, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 94,
    "hot dogColor": "hsl(31, 70%, 50%)",
    burger: 175,
    burgerColor: "hsl(304, 70%, 50%)",
    sandwich: 38,
    sandwichColor: "hsl(279, 70%, 50%)",
    kebab: 108,
    kebabColor: "hsl(98, 70%, 50%)",
    fries: 110,
    friesColor: "hsl(44, 70%, 50%)",
    donut: 177,
    donutColor: "hsl(275, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 23,
    "hot dogColor": "hsl(222, 70%, 50%)",
    burger: 162,
    burgerColor: "hsl(317, 70%, 50%)",
    sandwich: 107,
    sandwichColor: "hsl(118, 70%, 50%)",
    kebab: 187,
    kebabColor: "hsl(101, 70%, 50%)",
    fries: 84,
    friesColor: "hsl(266, 70%, 50%)",
    donut: 171,
    donutColor: "hsl(206, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 85,
    "hot dogColor": "hsl(209, 70%, 50%)",
    burger: 136,
    burgerColor: "hsl(340, 70%, 50%)",
    sandwich: 116,
    sandwichColor: "hsl(114, 70%, 50%)",
    kebab: 118,
    kebabColor: "hsl(83, 70%, 50%)",
    fries: 74,
    friesColor: "hsl(339, 70%, 50%)",
    donut: 40,
    donutColor: "hsl(124, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 62,
    "hot dogColor": "hsl(146, 70%, 50%)",
    burger: 47,
    burgerColor: "hsl(267, 70%, 50%)",
    sandwich: 55,
    sandwichColor: "hsl(333, 70%, 50%)",
    kebab: 151,
    kebabColor: "hsl(302, 70%, 50%)",
    fries: 188,
    friesColor: "hsl(97, 70%, 50%)",
    donut: 6,
    donutColor: "hsl(156, 70%, 50%)",
  },
];
function Stats(props) {
  const { th } = props;
  return (
    <ThemeProvider theme={th}>
      <ResponsiveDrawer theme={th}>
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
            <PieChart data={data} th={props.th} />
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
            <BarsChart data={dataBars} th={props.th} />
          </Box>
          <Box
            component={Paper}
            sx={{
              gridColumnStart: 1,
              gridColumnEnd: { md: 3, sm: 1 },
              display: { xs: "none", md: "block" },
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
            <CalendarChart data={data} th={props.th} />
          </Box>
        </Box>
      </ResponsiveDrawer>
    </ThemeProvider>
  );
}
export default Stats;
