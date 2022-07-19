import { Close, FortOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import axios from "api/_axios";
import { UserContext } from "App";
import AvatarCrop from "common/cropEasy/avatar_crop";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { validationSchemaPerfil } from "utils/validations";

export default function PerfilDrawer({ open, handleClose }) {
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);

  const queryClient = useQueryClient();

  const { data: dataCentros } = useQuery(["getCentrosPerfil"], async () => {
    const { data: response } = await axios.get("/centro/list");
    return response.data;
  });

  const updatePerfilMutation = useMutation(async (values) => {
    let formData = new FormData();
    if (file) formData.append("foto", file);
    formData.append("nome", values.nome);
    formData.append("email", values.email);
    formData.append("telemovel", values.telemovel);
    formData.append("idcentro", values.idcentro.idcentro);

    await axios.put(`utilizador/${user?.idutilizador}`, formData);
  });

  const updatePassword = useMutation(async (values) => {
    await axios.put(`utilizador/updateOwnPass`, values);
  });

  const formik = useFormik({
    initialValues: {
      nome: user?.nome || "",
      telemovel: user?.telemovel || "",
      email: user?.email || "",
      password_atual: "",
      new_password: "",
      conf_password: "",
      idcentro:
        dataCentros?.find((val) => val.idcentro === user?.idcentro) || null,
    },
    enableReinitialize: true,
    validationSchema: validationSchemaPerfil,

    onSubmit: async (values) => {
      let parsedValues = { ...values };
      if (parsedValues.password_atual !== "") {
        try {
          await updatePassword.mutateAsync({
            oldPass: parsedValues.password_atual,
            newPass: parsedValues.new_password,
          });
          toast.success("Password alterada com sucesso!", {
            toastId: "password_success",
          });
        } catch (error) {
          formik.setFieldError("password_atual", "Password atual incorreta");
          toast.error("Não foi possível atualizar a password!", {
            toastId: "update_password",
          });
          return;
        }
      }

      delete parsedValues.conf_password;
      delete parsedValues.password_atual;
      delete parsedValues.new_password;

      try {
        await updatePerfilMutation.mutateAsync(parsedValues);
        toast.success("Perfil atualizado com sucesso!", {
          toastId: "update_perfil",
        });
        handleClose();
        queryClient.invalidateQueries("getUserByToken");
      } catch (error) {
        console.log(error.response);
        toast.error("Não foi possível atualizar o perfil!", {
          toastId: "update_perfil",
        });
      }
    },
  });

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Stack
        spacing={2}
        sx={{
          width: 400,
          p: 3,
        }}
        role="presentation"
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Stack direction="row">
          <Typography variant="h4" component="div">
            Perfil
          </Typography>
          <IconButton sx={{ marginLeft: "auto" }} onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <Stack>
          <AvatarCrop file={file} setFile={setFile} />
          <Stack direction="row" className="center" spacing={1} sx={{ mb: 2 }}>
            <TextField
              id="nome"
              variant="standard"
              label="Nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              error={formik.touched.nome && Boolean(formik.errors.nome)}
              helperText={formik.touched.nome && formik.errors.nome}
              InputProps={{ style: { fontSize: 25 } }}
              sx={{ width: "50%" }}
            />
            <Typography variant="body1">#{user?.ncolaborador}</Typography>
          </Stack>
          <Stack spacing={2}>
            <TextField
              id="telemovel"
              label="Telemóvel"
              value={formik.values.telemovel}
              onChange={formik.handleChange}
              error={
                formik.touched.telemovel && Boolean(formik.errors.telemovel)
              }
              helperText={formik.touched.telemovel && formik.errors.telemovel}
            />
            <Autocomplete
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
              renderInput={(params) => <TextField {...params} label="Centro" />}
            />
            <TextField
              id="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Paper elevation={10} sx={{ p: 2 }}>
              <Typography variant="h6">Alterar Password</Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <TextField
                  id="password_atual"
                  type="password"
                  label="Password Atual"
                  value={formik.values.password_atual}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password_atual &&
                    Boolean(formik.errors.password_atual)
                  }
                  helperText={
                    formik.touched.password_atual &&
                    formik.errors.password_atual
                  }
                />
                <TextField
                  id="new_password"
                  type="password"
                  label="Nova Password"
                  value={formik.values.new_password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.new_password &&
                    Boolean(formik.errors.new_password)
                  }
                  helperText={
                    formik.touched.new_password && formik.errors.new_password
                  }
                />
                <TextField
                  id="conf_password"
                  type="password"
                  label="Confirmar Password"
                  value={formik.values.conf_password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.conf_password &&
                    Boolean(formik.errors.conf_password)
                  }
                  helperText={
                    formik.touched.conf_password && formik.errors.conf_password
                  }
                />
              </Stack>
            </Paper>
          </Stack>
        </Stack>
        <Button variant="contained" type="submit">
          Confirmar
        </Button>
      </Stack>
    </Drawer>
  );
}
