import {
  Autocomplete,
  Button,
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Skeleton,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useQuery } from "react-query";
import axios from "api/_axios";

const loadSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="text"
        width={160}
        height={50}
        sx={{ alignSelf: "center" }}
      />
      <Skeleton variant="rectangular" height={50} />
      <Skeleton variant="rectangular" height={50} />
      <Stack direction="row" spacing={2}>
        <Skeleton variant="rectangular" width={70} height={40} />
        <Stack className="center" sx={{ width: "100%" }}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
        </Stack>
        <Skeleton variant="rectangular" width={70} height={40} />
      </Stack>
      <Skeleton variant="rectangular" height={40} />
      <Divider />
      <Skeleton
        variant="rectangular"
        width={100}
        height={35}
        sx={{ alignSelf: "flex-end" }}
      />
    </>
  );
};

const validationSchema = yup.object({
  nome: yup
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(50, "O nome deve ter no máximo 50 caracteres.")
    .required("Este campo é obrigatório."),
  descricao: yup
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres.")
    .max(250, "A descrição só pode ter até 250 caracteres.")
    .required("Este campo é obrigatório."),
  lotacaomax: yup
    .number()
    .min(10, "10-100")
    .max(100, "10-100.")
    .required("Obrigatório"),
  estado: yup.boolean(),
  justificacao: yup
    .string()
    .min(10, "A justificação deve ter pelo menos 10 caracteres.")
    .max(250, "A justificação só pode ter até 250 caracteres.")
    .when("estado", {
      is: (value) => !value,
      then: yup.string().required("Campo obrigatório"),
    }),
});

function SalasForm({ data, handleRequest, handleDelete }) {
  const [valSlider, setValSlider] = useState(70);

  const {
    isFetching: loadingCentros,
    data: dataCentros,
    error: erroCentros,
  } = useQuery(
    ["getCentros"],
    async () => {
      const { data: response } = await axios.get("centro/list");
      return response.data;
    },
    { keepPreviousData: true }
  );

  if (erroCentros) toast.error("Erro ao obter centros!");

  const formik = useFormik({
    initialValues: {
      nome: data?.nome || "",
      descricao: data?.descricao || "",
      lotacaomax: data?.lotacaomax || 50,
      estado: data?.estado || false,
      centro: data?.centro || {},
      justificacao: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      await handleRequest({
        nome: values.nome,
        descricao: values.descricao,
        lotacaomax: values.lotacaomax,
        lotacao: calcLotacaoFinal,
        estado: values.estado,
        idcentro: values.centro.idcentro,
        ...(!values.estado && { justificacao: values.justificacao }),
      });
    },
  });

  const calcLotacaoFinal = useMemo(() => {
    return Math.floor((formik.values.lotacaomax * valSlider) / 100);
  }, [formik.values.lotacaomax, valSlider]);

  const clearForm = useCallback(() => {
    formik.setFieldValue("centro", dataCentros && dataCentros[0]);
    setValSlider(70);
  }, [dataCentros]);

  useEffect(() => {
    if (loadingCentros) return;

    if (!data) {
      clearForm();
      return;
    }

    formik.setFieldValue(
      "centro",
      dataCentros &&
        dataCentros.find((val) => val.idcentro === data.centro.idcentro)
    );

    setValSlider((100 * data.lotacao) / data.lotacaomax);
  }, [data, clearForm, dataCentros, loadingCentros]);

  return (
    <>
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
          flexGrow: 3,
          height: "fit-content",
        }}
      >
        {loadingCentros ? (
          loadSkeleton()
        ) : (
          <>
            <Typography textAlign="center" variant="h4">
              {!data ? "Adicionar" : "Editar"} Sala
            </Typography>
            <TextField
              id="nome"
              label="Nome"
              variant="outlined"
              autoComplete="off"
              value={formik.values.nome}
              onChange={formik.handleChange}
              error={formik.touched.nome && Boolean(formik.errors.nome)}
              helperText={formik.touched.nome && formik.errors.nome}
            />
            <TextField
              id="descricao"
              label="Descrição"
              multiline
              maxRows={5}
              variant="outlined"
              autoComplete="off"
              value={formik.values.descricao}
              onChange={formik.handleChange}
              error={
                formik.touched.descricao && Boolean(formik.errors.descricao)
              }
              helperText={formik.touched.descricao && formik.errors.descricao}
            />
            <Stack direction="row" spacing={2} className="center">
              <FormControl
                error={
                  formik.touched.lotacaomax && Boolean(formik.errors.lotacaomax)
                }
              >
                <InputLabel>Lotação</InputLabel>
                <Input
                  name="lotacaomax"
                  size="small"
                  value={formik.values.lotacaomax}
                  onChange={formik.handleChange}
                  inputProps={{
                    step: 10,
                    min: { ...formik.values.lotacaomax.min },
                    max: { ...formik.values.lotacaomax.max },
                    type: "number",

                    style: { textAlign: "center", width: "70px" },
                  }}
                />
                <FormHelperText>
                  {formik.touched.lotacaomax && formik.errors.lotacaomax}
                </FormHelperText>
              </FormControl>
              <Stack sx={{ flexGrow: 1 }} className="center ">
                <Slider
                  step={5}
                  value={valSlider}
                  onChange={(e) => setValSlider(e.target.value)}
                  valueLabelDisplay="on"
                />
                <Typography>Limite Máximo (%)</Typography>
              </Stack>
              <FormControl sx={{ width: 100 }}>
                <InputLabel>Lotação Final</InputLabel>
                <Input
                  size="small"
                  disabled={true}
                  inputProps={{
                    type: "number",
                    style: { textAlign: "center" },
                  }}
                  value={calcLotacaoFinal}
                />
              </FormControl>
            </Stack>
            <Autocomplete
              options={dataCentros || []}
              value={formik.values.centro}
              isOptionEqualToValue={(op, val) => op.idcentro === val.idcentro}
              getOptionLabel={(option) => option.cidade || ""}
              onChange={(event, value, reason) => {
                if (reason === "clear") return;
                else formik.setFieldValue("centro", value);
              }}
              onInputChange={(event, value, reason) => {
                if (reason === "clear") {
                  formik.setFieldValue("centro", value);
                }
              }}
              renderInput={(params) => <TextField {...params} label="Cidade" />}
            />
            <Stack direction="row" className="center">
              <Typography>Indisponivel</Typography>
              <Switch
                id="estado"
                checked={formik.values.estado}
                onChange={formik.handleChange}
              />
              <Typography>Disponível</Typography>
            </Stack>
            <Collapse in={!formik.values.estado}>
              <TextField
                id="justificacao"
                sx={{ width: "100%" }}
                label="Justificação de inatividade"
                multiline
                rows={3}
                value={formik.values.justificacao}
                onChange={formik.handleChange}
                error={
                  formik.touched.justificacao &&
                  Boolean(formik.errors.justificacao)
                }
                helperText={
                  formik.touched.justificacao && formik.errors.justificacao
                }
              />
            </Collapse>
            <Divider />
            <Stack direction="row">
              <Button color="error" variant="contained" onClick={handleDelete}>
                Apagar
              </Button>
              <Button
                type="submit"
                color="info"
                variant="contained"
                sx={{ ml: "auto" }}
              >
                Confirmar
              </Button>
            </Stack>
          </>
        )}
      </Paper>
    </>
  );
}

export default SalasForm;
