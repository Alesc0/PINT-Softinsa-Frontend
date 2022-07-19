import {
  Autocomplete,
  Button,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "api/_axios";
import ImgUploader from "common/fileUploader/fileUploader";
import { validationSchemaCentros } from "utils/validations";

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

export default function CentroForm({ handleRequest, id = undefined }) {
  const [cidades, setCidades] = useState([]);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    { enabled: false }
  );

  const formik = useFormik({
    initialValues: {
      nome: dataCentro?.nome || "",
      endereco: dataCentro?.endereco || "",
      descricao: dataCentro?.descricao || "",
      estado: dataCentro ? dataCentro?.estado : true,
      cidade: dataCentro?.cidade || null,
    },
    enableReinitialize: true,
    validationSchema: validationSchemaCentros,

    onSubmit: async (values) => {
      try {
        await handleRequest({
          ...values,
          imagem: files[0],
        });

        queryClient.invalidateQueries("getCentrosView");
        toast.success(`Centro ${id ? "atualizado" : "adicionado"}!`);
        navigate("/centros");
      } catch (error) {
        toast.error(`Erro ao ${id ? "atualizar" : "adicionar"} centro.`);
      }
    },
  });

  useEffect(() => {
    if (id) refetch();
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
            name="cidade"
            options={cidades || []}
            isOptionEqualToValue={(val, option) => val === option}
            value={formik.values.cidade}
            onChange={(event, value, reason) => {
              formik.setFieldValue("cidade", "");
              if (reason === "clear") formik.setFieldValue("cidade", null);
              else formik.setFieldValue("cidade", value);
            }}
            onInputChange={(event, value, reason) => {
              if (reason === "clear") {
                formik.setFieldValue("cidade", null);
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
      <Tooltip
        title="Ativar/Desativar centro"
        sx={{ position: "absolute", top: 0, mt: 1, right: 2 }}
      >
        <Switch
          id="estado"
          checked={formik.values.estado}
          onChange={formik.handleChange}
        />
      </Tooltip>
    </Paper>
  );
}
