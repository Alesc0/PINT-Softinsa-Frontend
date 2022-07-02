import {
  Autocomplete,
  Button,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "api/axios";
import ImgUploader from "common/fileUploader/fileUploader";

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
      <Skeleton variant="rectangular" height={50} />
      <Skeleton variant="rectangular" height={50} />
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" height={80} />
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignSelf: "flex-end" }}>
        <Skeleton variant="rectangular" width={50} height={35} />
        <Skeleton variant="rectangular" width={70} height={35} />
      </Stack>
    </>
  );
};
const validationSchema = yup.object({
  nome: yup
    .string()
    .min(3, "O nome deve ter pelo menos 5 caracteres.")
    .max(50, "O nome deve ter no máximo 50 caracteres.")
    .required("Este campo é obrigatório."),
  endereco: yup
    .string()
    .min(3, "O endereço deve ter pelo menos 5 caracteres.")
    .max(50, "O endereço deve ter no máximo 50 caracteres.")
    .required("Este campo é obrigatório."),
  descricao: yup
    .string()
    .min(5, "A descrição deve ter pelo menos 10 caracteres.")
    .max(250, "A descrição só pode ter até 250 caracteres.")
    .required("Este campo é obrigatório."),
  cidade: yup.string().required("Este campo é obrigatório."),
});

export default function CentroForm({ handleRequest, id = undefined }) {
  const [cidades, setCidades] = useState([]);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const {
    isLoading: loadingMunicipios,
    data: dataMunicipios,
    error: erroMunicipios,
  } = useQuery(["getMunicipios"], async () => {
    const { data: response } = await axios.get(
      "https://geoptapi.org/municipios?json=1"
    );
    return response;
  });

  if (dataMunicipios && cidades.length === 0) setCidades(dataMunicipios);
  if (erroMunicipios) toast.error("Erro ao obter municipios.");

  const {
    refetch,
    isFetching: loadingCentro,
    data: dataCentro,
  } = useQuery(
    ["getCentroByID"],
    async () => {
      const { data: response } = await axios.get("/centro/" + id);
      return response.data;
    },
    { enabled: !!id }
  );

  const formik = useFormik({
    initialValues: {
      nome: dataCentro?.nome || "",
      endereco: dataCentro?.endereco || "",
      descricao: dataCentro?.descricao || "",
      estado: dataCentro?.estado || false,
      cidade: dataCentro?.cidade || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      handleRequest({ ...values, files });
    },
  });

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  const imgProps = {
    files,
    setFiles,
  };

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
        margin: "1em auto",
        position: "relative",
        flexGrow: 1,
        maxWidth: "sm",
      }}
    >
      {loadingCentro || loadingMunicipios ? (
        loadSkeleton()
      ) : (
        <>
          <Typography textAlign="center" variant="h4">
            {!id ? "Adicionar" : "Editar"} Centro
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

          <Autocomplete
            id="cidade"
            options={cidades}
            isOptionEqualToValue={() => true}
            value={formik.values.cidade}
            onChange={(event, value, reason) => {
              formik.values.cidade = "";
              if (reason === "clear") formik.values.cidade = "";
              else formik.handleChange();
            }}
            onInputChange={(event, value, reason) => {
              if (reason === "clear") {
                formik.values.cidade = "";
              }
            }}
            renderInput={(params) => <TextField {...params} label="Cidade" />}
          />

          <TextField
            id="endereco"
            label="Endereco"
            variant="outlined"
            autoComplete="off"
            value={formik.values.endereco}
            onChange={formik.handleChange}
            error={formik.touched.endereco && Boolean(formik.errors.endereco)}
            helperText={formik.touched.endereco && formik.errors.endereco}
          />

          <TextField
            id="descricao"
            label="Descrição"
            variant="outlined"
            autoComplete="off"
            value={formik.values.descricao}
            onChange={formik.handleChange}
            error={formik.touched.descricao && Boolean(formik.errors.descricao)}
            helperText={formik.touched.descricao && formik.errors.descricao}
          />

          <Typography variant="subtitle1">Imagem do centro:</Typography>
          <ImgUploader {...imgProps} />

          <Divider />
          <Stack direction="row" spacing={2} alignSelf="flex-end">
            <Button
              color="error"
              variant="contained"
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Confirmar
            </Button>
          </Stack>
        </>
      )}
      <Switch
        id="estado"
        sx={{ position: "absolute", top: 0, mt: 1, right: 2 }}
        checked={formik.values.estado}
        onChange={formik.handleChange}
      />
    </Paper>
  );
}
