import { TimePicker } from "@mui/lab";
import {
  Button,
  Divider,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
import { useState } from "react";
import { validationSchemaLimpeza } from "utils/validations";

export default function FormLimpezas() {
  const [horaLim, setHoraLim] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      sala: "",
      observacoes: "",
      urgente: false,
    },
    enableReinitialize: true,
    validationSchema: validationSchemaLimpeza,

    onSubmit: async (values) => {},
  });

  return (
    <Paper
      component="form"
      onSubmit={formik.handleSubmit}
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        paddingInline: 3,
        paddingBlock: 2,
        flexGrow: 1,
        height: "fit-content",
        gridColumn: "span 2",
        gridRow: "span 2",
      }}
    >
      <Typography variant="h4">Pedido de Limpeza</Typography>
      <TextField label="Sala" />
      <TextField multiline rows={4} label="Observações" />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label="Hora Limite"
          value={horaLim}
          onChange={(e) => setHoraLim(e)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Stack direction="row" className="center">
        <Typography>Urgente</Typography>
        <Switch
          id="urgencia"
          checked={formik.values.urgente}
          onChange={formik.handleChange}
        />
        <Typography>Disponível</Typography>
      </Stack>
      <Divider />
      <Button
        type="submit"
        color="info"
        variant="contained"
        sx={{ alignSelf: "center" }}
      >
        Fazer Pedido
      </Button>
    </Paper>
  );
}
