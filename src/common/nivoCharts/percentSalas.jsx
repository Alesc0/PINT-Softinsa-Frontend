import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import axios from "api/_axios";
import { ConstructionOutlined } from "@mui/icons-material";

const data1 = [
  {
    country: "AD",
    "hot dog": 153,
    "hot dogColor": "hsl(243, 70%, 50%)",
    burger: 92,
    burgerColor: "hsl(344, 70%, 50%)",
    sandwich: 55,
    sandwichColor: "hsl(87, 70%, 50%)",
    kebab: 62,
    kebabColor: "hsl(356, 70%, 50%)",
    fries: 2,
    friesColor: "hsl(138, 70%, 50%)",
    donut: 133,
    donutColor: "hsl(146, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 142,
    "hot dogColor": "hsl(5, 70%, 50%)",
    burger: 68,
    burgerColor: "hsl(340, 70%, 50%)",
    sandwich: 200,
    sandwichColor: "hsl(198, 70%, 50%)",
    kebab: 179,
    kebabColor: "hsl(182, 70%, 50%)",
    fries: 170,
    friesColor: "hsl(29, 70%, 50%)",
    donut: 145,
    donutColor: "hsl(288, 70%, 50%)",
  },
];
const data2 = [
  {
    lotacaoMax: "60",
    Saturno: 30,
    Galáxia: 20,
  },
  {
    lotacaoMax: "50",
    Lisboa: 30,
    Viseu: 20,
    Alberto: 50,
    xica: 30,
  },
];
const PercentSalas = () => {
  const [autoCentros, setAutoCentros] = useState([]);

  const { isLoading, data } = useQuery(
    ["teste"],
    async () => {
      const { data: response } = await axios.get(
        "reserva/percentSalasUtilizadas",
        {
          params: {
            centro: 1, //[autoCentrosReservas.map((val) => val.idcentro)],
          },
        }
      );
      console.log(response);
      return response;
    },
    {
      /* enabled: !!dataCentros, */
      keepPreviousData: true,
    }
  );

  const convertData = (data) => {
    const newData = [];
    if (data) {
      data.forEach((val) => {
        let a = newData.findIndex((v) => v.lotacaoMax === val.lotacaoMax);
        if (a !== -1) {
          newData[a][val.nome] = Math.round(val.p);
        } else {
          newData.push({
            lotacaoMax: val.lotacaoMax,
            [val.nome]: Math.round(val.p),
          });
        }
      });
    }
    return newData;
  };

  /* const [layout, setLayout] = useState(false);

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.between("xs", "lg"));

  useEffect(() => {
    setLayout(matches ? "horizontal" : "vertical");
  }, [matches]); */

  return (
    <Box sx={{ height: "30em" }}>
      <ResponsiveBar
        data={convertData(data) || []}
        keys={data?.map((val) => val.nome)}
        indexBy="lotacaoMax"
        margin={{ top: 50, bottom: 50, left: 50 }}
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
          legend: "Lotação",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Percentagem",
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

export default PercentSalas;
