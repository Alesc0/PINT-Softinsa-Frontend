import { Box } from "@mui/material";
import FormLimpezas from "./components/form";
import MaxTempoLimpeza from "./components/maxTempoLimpeza";

function LimpezasView() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "sm",
        m: "0 auto",
        textAlign: "center",
      }}
    >
      <MaxTempoLimpeza />
      <FormLimpezas />
    </Box>
  );
}

export default LimpezasView;
