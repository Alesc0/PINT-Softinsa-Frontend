// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { ResponsiveBar } from "@nivo/bar";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "api/_axios";

const MyResponsiveBar = ({ data }) => {
  

  const [layout, setLayout] = useState(false);

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.between("xs", "md"));

  useEffect(() => {
    setLayout(matches ? "horizontal" : "vertical");
  }, [matches]);

  const getKeys = (data) => {
    if (!data) return [];
    let keys = [];
    data.forEach((item) => {
      for (let key of Object.keys(item)) {
        if (key !== "dia" && !keys.includes(key)) {
          keys.push(key);
        }
      }
    });
    return keys;
  };

  return (
    <Box sx={{ height: "30em" }}>
      <ResponsiveBar
        data={data || []}
        layout={layout}
        keys={getKeys(data)}
        indexBy="dia"
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
          legend: "Dia",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Ocupação diária",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "top",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: -50,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
      />
    </Box>
  );
};
export default MyResponsiveBar;
