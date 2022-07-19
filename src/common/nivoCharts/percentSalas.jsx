import { Box } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

const PercentSalas = ({ data }) => {
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
    <Box sx={{ height: "25em" }}>
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
