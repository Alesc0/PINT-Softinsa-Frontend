import {
  Avatar,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { UserContext } from "App";
import UpdateBadge from "./components/updateBadge";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validationSchemaPerfil } from "utils/validations";

function Perfil() {
  const inputRef = useRef(null);

  const { user } = useContext(UserContext);
  const [img, setImage] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setImage(user?.fotoConv);
  }, [user]);
  const handleClick = () => {
    inputRef.current.click();
  };

  const fotoMutation = useMutation(async () => {
    let formData = new FormData();
    formData.append("foto", img[0]);

    const { data: response } = await axios.put(
      `utilizador/${user?.idutilizador}`,
      { formData }
    );
    return response;
  });

  const formik = useFormik({
    initialValues: {
      nome: user?.nome || "",
      email: user?.email || "",
      telefone: user?.telefone || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchemaPerfil,

    onSubmit: async (values) => {},
  });

  return (
    <>
      <Typography variant="h3">Perfil</Typography>
      <Paper
        className="flex flex-col"
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          maxWidth: "sm",
          flexGrow: 1,
          p: 2,
          margin: "0 auto",
          gap: 1,
        }}
      >
        <UpdateBadge handleUpdate={handleClick}>
          <Avatar
            sx={{ height: 150, width: 150 }}
            src={
              user.fotoConv ? "data:image/jpeg;base64, " + user.fotoConv : ""
            }
            variant="rounded"
          >
            {user.nome}
          </Avatar>
        </UpdateBadge>
        <input type="file" ref={inputRef} style={{ display: "none" }} />
        <Container disableGutters>
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
            <Typography variant="h3">{user.nome}</Typography>
            <Typography variant="body1">#{user.ncolaborador}</Typography>
          </Stack>
        </Container>
        <TextField value={user.telemovel} sx={{ width: "30%" }} />
        <Button variant="contained" onClick={() => console.log("hey")}>
          Alterar Password
        </Button>
        <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
          >
            Voltar
          </Button>
          <Button
            type="submit"
            color="info"
            variant="contained"
            sx={{ ml: "auto" }}
          >
            Salvar
          </Button>
        </Stack>
      </Paper>
    </>
  );
}

export default Perfil;
