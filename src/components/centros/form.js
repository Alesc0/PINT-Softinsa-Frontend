import {
  Autocomplete,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ImgUploader from "../../components/imgUploader/imgUploader";

export default function CentroForm({ handleRequest, id = undefined }) {
  const [cidades, setCidades] = useState([]);
  const [cidade, setCidade] = useState("");

  const [files, setFiles] = useState([]);
  const [nome, setNome] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://geoptapi.org/municipios?json=1"
        );
        setCidades(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const validate = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* clearErr(); */

    if (validate()) {
      handleRequest({});
      /* try {
        //requests
        const data = await axios.post("/centros/add", {});
        toast.success(data.data);
      } catch (error) {
        for (const [key, value] of Object.entries(error.response.data)) {
          toast.error(value, { toastId: key });
        }
      } */
    }
  };

  const imgProps = {
    files,
    setFiles,
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "fit-content",
          margin: "2em auto",
        }}
      >
        <Stack
          component={Paper}
          spacing={2}
          width="500px"
          sx={{ paddingInline: 3, paddingBlock: 2 }}
        >
          <Typography textAlign="center" variant="h4">
            Adicionar Centro
          </Typography>
          <TextField label="Nome" variant="outlined" />
          <Autocomplete
            sx={{ width: 300}}
            options={cidades}
            isOptionEqualToValue={() => true}
            value={cidade}
            onChange={(event, value, reason) => {
              setCidade("");
              if (reason === "clear") setCidade("");
              else setCidade(value);
            }}
            onInputChange={(event, value, reason) => {
              if (reason === "clear") {
                setCidade("");
              }
            }}
            renderInput={(params) => <TextField {...params} label="Cidade" />}
          />
          <TextField label="Endereço" variant="outlined" />
          <TextField label="Descrição" variant="outlined" />

          <Typography variant="subtitle1">Imagem do centro:</Typography>
          <ImgUploader {...imgProps} />

          <Divider />
          <Stack direction="row" spacing={2} alignSelf="flex-end">
            <Button color="error" variant="contained">
              Voltar
            </Button>
            <Button color="primary" variant="contained">
              Confirmar
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
}
