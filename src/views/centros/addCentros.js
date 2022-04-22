import {
  FormControl,
  Paper,
  Box,
  TextField,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import ImgUploader from "../../components/imgUploader/imgUploader";

function AddCentros() {
  return (
    <Box
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        m: "2em auto",
        p: 3,
        color: "text.primary",
      }}
    >
      <FormControl>
        <TextField id="txtNome" label="Nome" variant="outlined" />
      </FormControl>
      <FormControl>
        <TextField id="txtCidade" label="Cidade" variant="outlined" />
      </FormControl>
      <FormControl>
        <TextField id="txtEndereco" label="Endereço" variant="outlined" />
      </FormControl>
      <FormControl>
        <TextField id="txtDescricao" label="Descrição" variant="outlined" />
      </FormControl>
      <Typography variant="subtitle1">Imagem do centro:</Typography>
      <ImgUploader />
      <Divider />
      <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
        <Button color="error" variant="contained">
          Voltar
        </Button>
        <Button color="info" variant="contained">
          Confirmar
        </Button>
      </Box>
    </Box>
  );
}

export default AddCentros;
