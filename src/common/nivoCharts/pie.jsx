import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
const data = [
  {
    id: "Regular",
    value: 563,
    color: "hsl(235, 70%, 50%)",
  },
  {
    id: "Limpeza",
    value: 185,
    color: "hsl(348, 70%, 50%)",
  },
  {
    id: "Admin",
    value: 50,
  },
];

function MyResponsivePie() {
  const theme = useTheme();
  return (
    <Box sx={{ height: "18em" }}>
      <ResponsivePie
        data={data}
        margin={{ top: 20, bottom: 50 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.text.primary}
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={theme.palette.text.secondary}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={theme.palette.text.contrastText}
        theme={{ fontSize: 14 }}
      />
    </Box>
  );
}
export default MyResponsivePie;
