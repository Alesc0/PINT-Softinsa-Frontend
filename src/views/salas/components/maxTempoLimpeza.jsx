import { LocalizationProvider, MobileTimePicker } from "@mui/lab";
import { Paper, Stack, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";

function MaxTempoLimpeza() {
  const [tempMax, setTempMax] = useState(new Date("December 24,00:10:00"));
  return (
    <Stack
      component={Paper}
      direction="row"
      className="center"
      spacing={2}
      sx={{ width: "fit-content", alignSelf: "center", p: 2, mb: 2 }}
    >
      <Typography variant="h4">Tempo máximo de limpeza</Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileTimePicker
          value={tempMax}
          views={["minutes", "seconds"]}
          inputFormat="mm:ss"
          mask="__:__"
          onChange={(newValue) => {
            setTempMax(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                width: "50px",
                alignSelf: "center",
              }}
              variant="standard"
            />
          )}
        />
      </LocalizationProvider>
      <Typography variant="body1">minutos</Typography>
    </Stack>
  );
}

export default MaxTempoLimpeza;
