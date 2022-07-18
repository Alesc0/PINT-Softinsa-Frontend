import { Close } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { UserContext } from "App";
import axios from "api/_axios";
import AvatarCrop from "common/cropEasy/avatar_crop";
import { useContext, useState } from "react";
import { useMutation } from "react-query";

export default function PerfilDrawer({ open, handleClose }) {
  const [file, setFile] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const fotoMutation = useMutation(async () => {
    let formData = new FormData();
    formData.append("foto", file);
    await axios.put(`utilizador/${user?.idutilizador}`, formData);
  });

  const handleClick = async () => {
    try {
      await fotoMutation.mutateAsync();
      setUser(null);
      console.log("foto actualizada");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Stack
        spacing={2}
        sx={{
          width: 400,
          p: 3,
        }}
        role="presentation"
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
            <Typography variant="h3">{user.nome}</Typography>
            <Typography variant="body1">#{user.ncolaborador}</Typography>
          </Stack>
          <Stack spacing={2}>
            <TextField label="Telemóvel" value={user.telemovel} />
            <TextField label="Email" value={user.email} />
            <TextField label="Password Atual" />
            <TextField label="Nova Password" />
            <TextField label="Confirmar Password" />
          </Stack>
        </Stack>
        <Button onClick={() => handleClick()}>ENVIAR</Button>
      </Stack>
    </Drawer>
  );
}
