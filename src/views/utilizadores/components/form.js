import { Settings } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "api/axios";
import Modal from "./opcoesModal";

const phoneRegex =
  "^(?:9[1-36][0-9]|2[12][0-9]|2[35][1-689]|24[1-59]|26[1-35689]|27[1-9]|28[1-69]|29[1256])[0-9]{6}$";

const validationSchema = yup.object({
  nome: yup
    .string()
    .min(5, "O nome deve ter pelo menos 5 caracteres.")
    .required("Este campo é obrigatório."),
  email: yup
    .string()
    .email("Email inválido.")
    .required("Este campo é obrigatório."),
  telemovel: yup
    .string()
    .matches(phoneRegex, "Contacto inválido.")
    .required("Este campo é obrigatório."),
});

const options = [
  {
    name: "firstlogin",
    displayName: "Primeiro Login",
    default: true,
  },
  {
    name: "verificado",
    displayName: "Verificado",
    default: false,
  },
];

const perms = ["Regular", "Administrador", "Limpeza"];

const loadSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="text"
        width={160}
        height={50}
        sx={{ alignSelf: "center" }}
      />
      <Skeleton variant="rectangular" width={450} height={50} />
      <Skeleton variant="rectangular" width={450} height={50} />
      <Skeleton variant="rectangular" width={450} height={50} />
      <Stack direction="row" spacing={2}>
        <Skeleton variant="rectangular" width={100} height={45} />
        <Stack direction="row" spacing={1}>
          <Skeleton variant="rectangular" width={105} height={45} />
          <Skeleton variant="rectangular" width={105} height={45} />
          <Skeleton variant="rectangular" width={105} height={45} />
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignSelf: "flex-end" }}>
        <Skeleton variant="rectangular" width={50} height={35} />
        <Skeleton variant="rectangular" width={70} height={35} />
      </Stack>
    </>
  );
};

export default function UtilizadorForm({ handleRequest, id = undefined }) {
  const [permissionTab, setPermissionTab] = useState(0);

  const navigate = useNavigate();

  //MODAL
  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState(
    options.map((row, i) => {
      return row.default;
    })
  );
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const { isLoading: loadingCentros, data: dataCentros } = useQuery(
    ["getCentros"],
    async () => {
      const { data: response } = await axios.get("/centro/list");
      return response.data;
    }
  );

  const {
    refetch,
    isFetching: loadingUtilizador,
    data: dataUtilizador,
  } = useQuery(
    ["getUtilizadorByID"],
    async () => {
      const { data: response } = await axios.get("/utilizador/" + id);
      return response.data;
    },
    { enabled: !!id }
  );

  const setExtraFields = useCallback((data) => {
    if (!data) return;
    if (data.admin) setPermissionTab(1);
    if (data.role === "U") setPermissionTab(perms.indexOf("Regular"));
    else if (data.role === "L") setPermissionTab(perms.indexOf("Limpeza"));
    setAddOptions(data);
  }, []);

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  useEffect(() => {
    if (!dataUtilizador) return;
    setExtraFields(dataUtilizador);
  }, [dataUtilizador, setExtraFields]);

  const handleToggle = (value) => () => {
    const newChecked = [...checked];
    newChecked[value] = !checked[value];
    setChecked(newChecked);
  };

  const setAddOptions = (data) => {
    setChecked(options.map((row) => data[row.name]));
  };

  const opObj = () => {
    let a = {};
    options.map((row, i) => (a[row.name] = checked[i]));
    return a;
  };

  const formik = useFormik({
    initialValues: {
      nome: dataUtilizador?.nome || "",
      telemovel: dataUtilizador?.telemovel || "",
      email: dataUtilizador?.email || "",
      estado: dataUtilizador?.estado || false,
      idcentro: dataUtilizador?.idcentro || 1,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      let res = await handleRequest({
        ...values,
        ...opObj(),
        role: perms[permissionTab],
      });
      if (res) navigate(-1);
    },
  });

  const handleChange = (event, newValue) => setPermissionTab(newValue);

  const modalProps = {
    options,
    openModal,
    handleClose,
    handleToggle,
    checked,
    setAtivo: formik.handleChange,
    ativo: formik.values.estado,
  };

  return (
    <>
      <Paper
        component="form"
        onSubmit={formik.handleSubmit}
        elevation={2}
        maxwidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          paddingInline: 3,
          paddingBlock: 2,
          margin: "1em auto",
          width: "fit-content",
          position: "relative",
        }}
      >
        {loadingCentros || loadingUtilizador ? (
          loadSkeleton()
        ) : (
          <>
            <Typography textAlign="center" variant="h4">
              {!id ? "Adicionar" : "Editar"} Utilizador
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
              id="email"
              label="Email"
              variant="outlined"
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="telemovel"
              label="Contacto"
              autoComplete="off"
              variant="outlined"
              value={formik.values.telemovel}
              onChange={formik.handleChange}
              error={
                formik.touched.telemovel && Boolean(formik.errors.telemovel)
              }
              helperText={formik.touched.telemovel && formik.errors.telemovel}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl>
                <InputLabel id="label-select"> Centro </InputLabel>
                <Select
                  sx={{ minWidth: 125 }}
                  id="idcentro"
                  label="Centro"
                  labelId="label-select"
                  value={formik.values.idcentro}
                  onChange={formik.handleChange}
                >
                  {dataCentros?.length > 0 ? (
                    dataCentros?.map((row) => (
                      <MenuItem key={row.idcentro} value={row.idcentro}>
                        {row.cidade}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={1}>
                      {" "}
                      {"Sem centros disponíveis!"}{" "}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <Box>
                <Tabs value={permissionTab} onChange={handleChange}>
                  {perms.map((row, i) => (
                    <Tab key={i} label={row} value={i} />
                  ))}
                </Tabs>
              </Box>
            </Stack>
            <Divider />
            <Stack direction="row" spacing={2} sx={{ alignSelf: "flex-end" }}>
              <Button
                onClick={() => navigate(-1)}
                color="error"
                variant="contained"
              >
                Voltar
              </Button>
              <Button type="submit" color="info" variant="contained">
                Confirmar
              </Button>
            </Stack>
          </>
        )}
        <IconButton
          sx={{ position: "absolute", top: 0, mt: 1, right: 2 }}
          onClick={handleOpen}
        >
          <Settings />
        </IconButton>
      </Paper>

      <Modal {...modalProps} />
    </>
  );
}
