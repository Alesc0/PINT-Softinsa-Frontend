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
import ModalDelete from "common/modalDelete/modal";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { validationSchemaSalas } from "utils/validations";

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

function SalasForm({
  data,
  handleRequest,
  handleDelete,
  loading,
  dataCentros,
}) {
  const [valSlider, setValSlider] = useState(70);

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickModal = () => {
    try {
      handleDelete();
    } catch (error) {
      toast.error("Erro ao eliminar sala!");
    }
  };
  const formik = useFormik({
    initialValues: {
      nome: data?.nome || "",
      descricao: data?.descricao || "",
      lotacaomax: data?.lotacaomax || 50,
      estado: data ? data.estado : true,
      centro: data?.centro || null,
      justificacao: data?.justificacao || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchemaSalas,

    onSubmit: async (values) => {
      try {
        await handleRequest({
          nome: values.nome,
          descricao: values.descricao,
          lotacaomax: values.lotacaomax,
          lotacao: calcLotacaoFinal,
          estado: values.estado,
          idcentro: values.centro.idcentro,
          ...(!values.estado && { justificacao: values.justificacao }),
        });

        !data
          ? toast.success("Sala adicionada!")
          : toast.success("Sala atualizada!");
        queryClient.invalidateQueries("getSalasView");
      } catch (error) {
        toast.error(`Erro ao ${!data ? "adicionar" : "atualizar"} sala`);
      }
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
  }, [data, clearForm, dataCentros, loading]);

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
        {loading ? (
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
              getOptionLabel={(option) =>
                `${option.nome} - ${option.cidade}` || ""
              }
              onChange={(event, value, reason) => {
                if (reason === "clear") formik.setFieldValue(null);
                else formik.setFieldValue("centro", value);
              }}
              onInputChange={(event, value, reason) => {
                if (reason === "clear") {
                  formik.setFieldValue("centro", null);
                }
              }}
              renderInput={(params) => <TextField {...params} label="Centro" />}
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
              {data && (
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  Apagar
                </Button>
              )}
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
      <ModalDelete
        handleClickModal={handleClickModal}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}

export default SalasForm;
