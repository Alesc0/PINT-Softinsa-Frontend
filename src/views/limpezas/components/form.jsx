import { TimePicker } from "@mui/lab";
import {
  Autocomplete,
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
import { useQuery } from "react-query";
import { validationSchemaLimpeza } from "utils/validations";
import axios from "api/_axios";
import { toast } from "react-toastify";

export default function FormLimpezas() {
  const [horaLim, setHoraLim] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      sala: null,
      observacoes: "",
      urgente: false,
      centro: null,
    },
    enableReinitialize: true,
    validationSchema: validationSchemaLimpeza,

    onSubmit: async (values) => {},
  });

  const { data: dataCentros, error: errorCentros } = useQuery(
    ["getCentros"],
    async () => {
      const { data: response } = await axios.get("centro/list");
      formik.setFieldValue("centro", response.data[0]);
      return response.data;
    },
    { keepPreviousData: true }
  );

  const { data: dataSalas, error: errorSalas } = useQuery(
    ["getSalasByCentro", formik.values.centro],
    async () => {
      const { data: response } = await axios.get(
        `/centro/${formik.values.centro.idcentro}/salas`
      );
      return response.data[0].salas;
    },
    {
      enabled: !!formik.values.centro?.idcentro,
      keepPreviousData: true,
    }
  );

  if (errorCentros)
    toast.error("Erro ao obter centros. Tente novamente mais tarde.", {
      toastId: "get_centros_error",
    });
  if (errorSalas)
    toast.error("Erro ao obter Salas. Tente novamente mais tarde.", {
      toastId: "get_salas_error",
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
      <Stack direction="row" spacing={2}>
        <Autocomplete
          sx={{ flexGrow: 1 }}
          options={dataCentros || []}
          value={formik.values.centro}
          isOptionEqualToValue={(op, val) => op.idcentro === val.idcentro}
          getOptionLabel={(option) => option.cidade || ""}
          onChange={(event, value, reason) => {
            formik.setFieldValue("sala", null);
            if (reason === "clear") return;
            else formik.setFieldValue("centro", value);
          }}
          onInputChange={(event, value, reason) => {
            if (reason === "clear") {
              formik.setFieldValue("centro", null);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Centro" />}
        />
        <Autocomplete
          disabled={!formik.values.centro}
          sx={{ flexGrow: 1 }}
          options={dataSalas || []}
          value={formik.values.sala}
          isOptionEqualToValue={(op, val) => op.idsala === val.idsala}
          getOptionLabel={(option) => option.nome || ""}
          onChange={(event, value, reason) => {
            if (reason === "clear") return;
            else formik.setFieldValue("sala", value);
          }}
          onInputChange={(event, value, reason) => {
            if (reason === "clear") {
              formik.setFieldValue("sala", null);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Sala" />}
        />
      </Stack>
      <TextField
        id="observacoes"
        label="Observações"
        multiline
        rows={4}
        value={formik.values.observacoes}
        onChange={formik.handleChange}
      />
      <Stack direction="row" spacing={6}>
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
            id="urgente"
            checked={formik.values.urgente}
            onChange={formik.handleChange}
          />
          <Typography>Disponível</Typography>
        </Stack>
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
