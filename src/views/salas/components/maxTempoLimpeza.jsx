import { CheckCircle } from "@mui/icons-material";
import { LocalizationProvider, MobileTimePicker } from "@mui/lab";
import { IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "api/_axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

function MaxTempoLimpeza({ tempoLimpeza, loading }) {
  const [tempMax, setTempMax] = useState(null);

  useEffect(() => {
    if (tempoLimpeza) setTempMax(new Date(`December 24,${tempoLimpeza}`));
  }, [tempoLimpeza]);

  //post pedido/updateTempoLimpeza -> edit max limpeza default (admin) body:{"tempo":"00:15:00"};

  const updateMutation = useMutation(async () => {
    await axios.post("pedido/updateTempoLimpeza", {
      tempo: tempMax.toLocaleTimeString(),
    });
  });

  const handleMutation = async () => {
    try {
      await updateMutation.mutateAsync();
      toast.success("Tempo limpeza atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar tempo limpeza!");
    }
  };

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
      <IconButton color="primary" onClick={handleMutation}>
        <CheckCircle />
      </IconButton>
    </Stack>
  );
}

export default MaxTempoLimpeza;
