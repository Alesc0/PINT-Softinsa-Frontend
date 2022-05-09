// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { useTheme } from "@emotion/react";
import { ResponsivePie } from "@nivo/pie";
const data = [
  {
    id: "sass",
    label: "sass",
    value: 563,
    color: "hsl(235, 70%, 50%)",
  },
  {
    id: "java",
    label: "java",
    value: 185,
    color: "hsl(348, 70%, 50%)",
  },
  {
    id: "php",
    label: "php",
    value: 401,
    color: "hsl(60, 70%, 50%)",
  },
  {
    id: "javascript",
    label: "javascript",
    value: 471,
    color: "hsl(46, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 432,
    color: "hsl(55, 70%, 50%)",
  },
];

function MyResponsivePie() {
  const theme = useTheme();
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
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
    />
  );
}
export default MyResponsivePie;
