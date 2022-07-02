import {
  Avatar, Button,
  Container, Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { UserContext } from "App";
import UpdateBadge from "./components/updateBadge";

function Perfil() {
  const inputRef = useRef(null);

  const { user } = useContext(UserContext);
  const [img, setImage] = useState([]);

  useEffect(() => {
    setImage(user?.fotoConv);
  }, [user]);
  const handleClick = () => {
    // 👇️ open file input box on click of other element
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

  return (
    <>
      <Typography variant="h3">Perfil</Typography>
      <Paper
        className="flex flex-col"
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
            src={"data:image/jpeg;base64, " + user.fotoConv}
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
      </Paper>
    </>
  );
}

export default Perfil;
