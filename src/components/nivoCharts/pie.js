import { ResponsivePie } from "@nivo/pie";
import { ThemeProvider } from "@mui/material/styles";

const MyResponsivePie = (props) => (
  <ThemeProvider theme={props.th}>
    <ResponsivePie
      data={props.data}
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
  </ThemeProvider>
);
export default MyResponsivePie;
