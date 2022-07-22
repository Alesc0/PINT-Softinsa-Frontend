import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

function MyResponsivePie(props) {
  const { data } = props;
  const formatData = () => {
    let formatedData = [];
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        if (key === "U") formatedData[0] = { id: "Utilizadores", value };
        if (key === "L")
          formatedData[1] = { id: "Empregados de Limpeza", value: value };
        if (key === "admin")
          formatedData[2] = { id: "Administradores", value: value };
      }
    }
    return formatedData;
  };

  const theme = useTheme();
  return (
    <Box sx={{ height: "25em" }}>
      <ResponsivePie
        data={formatData()}
        margin={{ top: 30, bottom: 50 }}
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
