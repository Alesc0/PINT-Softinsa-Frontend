import { ResponsivePie } from "@nivo/pie";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import NavBar from "../components/navBar/navBar";
import { Paper } from "@mui/material";
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

const MyResponsivePie = (props) => (
  <ThemeProvider theme={props.th}>
    <NavBar />
    <Box
      display="grid"
      gap={5}
      gridTemplateColumns={{
        md: "repeat(2, 1fr)",
        sm: "repeat(1, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      sx={{
        p: 5,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {data.map((row) => (
        <Box
          key={row.id}
          component={Paper}
          sx={{
            width: "25em",
            height: "20em",
            border: "solid thin",
            borderRadius: 3,
            borderColor: "primary.main",
            p: 1,
          }}
        >
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLinkLabelsTextColor={() =>
              props.th["palette"]["mode"] === "light" ? "black" : "white"
            }
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={() =>
              props.th["palette"]["mode"] === "light" ? "black" : "white"
            }
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 70,
                itemHeight: 18,
                itemTextColor:
                  props.th["palette"]["mode"] === "light" ? "black" : "white",
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "text.primary",
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      ))}
    </Box>
  </ThemeProvider>
);
export default MyResponsivePie;
