import { Settings } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import axios from "api/_axios";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validationSchemaUtilizadores } from "utils/validations";
import Modal from "./opcoesModal";

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
  const queryClient = useQueryClient();

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
    { enabled: false }
  );

  const setExtraFields = useCallback((data) => {
    if (!data) {
      setPermissionTab(0);
      setAddOptions(null);
    } else {
      if (data.admin) setPermissionTab(perms.indexOf("Administrador"));
      else if (data.role === "U") setPermissionTab(perms.indexOf("Regular"));
      else if (data.role === "L") setPermissionTab(perms.indexOf("Limpeza"));
      setAddOptions(data);
    }
  }, []);

  useEffect(() => {
    if (id) refetch();
    else setExtraFields(null);
  }, [id, refetch, setExtraFields]);

  useEffect(() => {
    if (!dataUtilizador || !id) return;
    setExtraFields(dataUtilizador);
  }, [dataUtilizador, setExtraFields, id]);

  const handleToggle = (value) => () => {
    const newChecked = [...checked];
    newChecked[value] = !checked[value];
    setChecked(newChecked);
  };

  const setAddOptions = (data) => {
    if (!data) setChecked(options.map((row, i) => row.default));
    else setChecked(options.map((row) => data[row.name]));
  };

  const opObj = () => {
    let a = {};
    options.map((row, i) => (a[row.name] = checked[i]));
    return a;
  };

  const formik = useFormik({
    initialValues: {
      add: !id,
      nome: dataUtilizador?.nome || "",
      telemovel: dataUtilizador?.telemovel || "",
      email: dataUtilizador?.email || "",
      password: "",
      conf_password: "",
      estado: dataUtilizador ? dataUtilizador?.estado : true,
      idcentro:
        dataCentros?.find((val) => val.idcentro === dataUtilizador?.idcentro) ||
        null,
    },
    enableReinitialize: true,
    validationSchema: validationSchemaUtilizadores,

    onSubmit: async (values) => {
      try {
        await handleRequest({
          ...values,
          idcentro: values.idcentro.idcentro,
          ...opObj(),
          role: perms[permissionTab],
        });

        queryClient.invalidateQueries("getUtilizadores");
        toast.success("Novo utilizador adicionado!");
        navigate("/utilizadores");
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 409)
          formik.setFieldError(
            "email",
            "Já se encontra registado um utilizador com este email!"
          );
      }
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
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          paddingInline: 3,
          paddingBlock: 2,
          margin: "1em auto",
          position: "relative",
          maxWidth: "sm",
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
            <Stack direction="row" spacing={2}>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                autoComplete="off"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                sx={{ flexGrow: 1 }}
              />
              <TextField
                id="conf_password"
                label="Confirmar Password"
                variant="outlined"
                autoComplete="off"
                type="password"
                value={formik.values.conf_password}
                onChange={formik.handleChange}
                error={
                  formik.touched.conf_password &&
                  Boolean(formik.errors.conf_password)
                }
                helperText={
                  formik.touched.conf_password && formik.errors.conf_password
                }
                sx={{ flexGrow: 1 }}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                id="telemovel"
                label="Contacto"
                sx={{ flexGrow: 1 }}
                autoComplete="off"
                variant="outlined"
                value={formik.values.telemovel}
                onChange={formik.handleChange}
                error={
                  formik.touched.telemovel && Boolean(formik.errors.telemovel)
                }
                helperText={formik.touched.telemovel && formik.errors.telemovel}
              />
              <Autocomplete
                sx={{ flexGrow: 3 }}
                options={dataCentros || []}
                value={formik.values.idcentro}
                isOptionEqualToValue={(op, val) => op.idcentro === val.idcentro}
                getOptionLabel={(option) =>
                  `${option.nome} - ${option.cidade}` || null
                }
                onChange={(event, value, reason) => {
                  if (reason === "clear") return;
                  else formik.setFieldValue("idcentro", value);
                }}
                onInputChange={(event, value, reason) => {
                  if (reason === "clear") {
                    formik.setFieldValue("idcentro", null);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Centro" />
                )}
              />
            </Stack>
            <Box sx={{ m: "0 auto" }}>
              <Tabs value={permissionTab} onChange={handleChange}>
                {perms.map((row, i) => (
                  <Tab key={i} label={row} value={i} />
                ))}
              </Tabs>
            </Box>
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
