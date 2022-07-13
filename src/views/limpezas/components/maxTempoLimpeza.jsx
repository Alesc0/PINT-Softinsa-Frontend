import { LocalizationProvider, MobileTimePicker } from "@mui/lab";
import { Paper, Stack, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";

function MaxTempoLimpeza() {
  const [tempMax, setTempMax] = useState(new Date("December 24,00:10:00"));
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        paddingInline: 3,
        paddingBlock: 2,
        flexGrow: 1,
        gridColumn: "span 2",
      }}
    >
      <Typography variant="h4">Tempo máximo de limpeza</Typography>
      <Stack direction="row" className="center" spacing={2}>
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
    </Paper>
  );
}

export default MaxTempoLimpeza;
