// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { ResponsiveBar } from "@nivo/bar";
import React, { useEffect, useState } from "react";
const data = [
  {
    country: "AD",
    "hot dog": 26,
    "hot dogColor": "hsl(82, 70%, 50%)",
    burger: 7,
    burgerColor: "hsl(320, 70%, 50%)",
    sandwich: 95,
    sandwichColor: "hsl(315, 70%, 50%)",
    kebab: 117,
    kebabColor: "hsl(194, 70%, 50%)",
    fries: 78,
    friesColor: "hsl(173, 70%, 50%)",
    donut: 142,
    donutColor: "hsl(254, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 192,
    "hot dogColor": "hsl(329, 70%, 50%)",
    burger: 82,
    burgerColor: "hsl(92, 70%, 50%)",
    sandwich: 190,
    sandwichColor: "hsl(291, 70%, 50%)",
    kebab: 76,
    kebabColor: "hsl(164, 70%, 50%)",
    fries: 155,
    friesColor: "hsl(142, 70%, 50%)",
    donut: 98,
    donutColor: "hsl(74, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 45,
    "hot dogColor": "hsl(224, 70%, 50%)",
    burger: 102,
    burgerColor: "hsl(107, 70%, 50%)",
    sandwich: 104,
    sandwichColor: "hsl(171, 70%, 50%)",
    kebab: 13,
    kebabColor: "hsl(83, 70%, 50%)",
    fries: 149,
    friesColor: "hsl(233, 70%, 50%)",
    donut: 160,
    donutColor: "hsl(8, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 64,
    "hot dogColor": "hsl(182, 70%, 50%)",
    burger: 62,
    burgerColor: "hsl(295, 70%, 50%)",
    sandwich: 116,
    sandwichColor: "hsl(89, 70%, 50%)",
    kebab: 43,
    kebabColor: "hsl(158, 70%, 50%)",
    fries: 134,
    friesColor: "hsl(352, 70%, 50%)",
    donut: 33,
    donutColor: "hsl(181, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 53,
    "hot dogColor": "hsl(112, 70%, 50%)",
    burger: 26,
    burgerColor: "hsl(96, 70%, 50%)",
    sandwich: 37,
    sandwichColor: "hsl(258, 70%, 50%)",
    kebab: 60,
    kebabColor: "hsl(223, 70%, 50%)",
    fries: 44,
    friesColor: "hsl(195, 70%, 50%)",
    donut: 150,
    donutColor: "hsl(79, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 13,
    "hot dogColor": "hsl(303, 70%, 50%)",
    burger: 54,
    burgerColor: "hsl(216, 70%, 50%)",
    sandwich: 105,
    sandwichColor: "hsl(214, 70%, 50%)",
    kebab: 159,
    kebabColor: "hsl(253, 70%, 50%)",
    fries: 3,
    friesColor: "hsl(35, 70%, 50%)",
    donut: 191,
    donutColor: "hsl(138, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 46,
    "hot dogColor": "hsl(135, 70%, 50%)",
    burger: 55,
    burgerColor: "hsl(263, 70%, 50%)",
    sandwich: 98,
    sandwichColor: "hsl(257, 70%, 50%)",
    kebab: 33,
    kebabColor: "hsl(101, 70%, 50%)",
    fries: 149,
    friesColor: "hsl(113, 70%, 50%)",
    donut: 127,
    donutColor: "hsl(9, 70%, 50%)",
  },
];

const MyResponsiveBar = () => {
  const [layout, setLayout] = useState(false);

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.between("xs", "md"));

  useEffect(() => {
    setLayout(matches ? "horizontal" : "vertical");
  }, [matches]);

  return (
    <Box sx={{ height: "15em" }}>
      <ResponsiveBar
        data={data}
        layout={layout}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, bottom: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        role="application"
      />
    </Box>
  );
};
export default MyResponsiveBar;
