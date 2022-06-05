import {
  Autocomplete,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ImgUploader from "../fileUploader/fileUploader";

const errorList = {
  nome: "O nome precisa de ter entre 5 a 100 caracteres.",
  endereco: "O endereço precisa de ter entre 20 a 250 caracteres.",
  descricao: "A descrição precisa de ter entre 20 a 250 caracteres.",
};
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
      <Skeleton variant="rectangular" width={450} height={50} />
      <Skeleton variant="text" width={160} />
      <Skeleton variant="rectangular" width={450} height={80} />
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignSelf: "flex-end" }}>
        <Skeleton variant="rectangular" width={50} height={35} />
        <Skeleton variant="rectangular" width={70} height={35} />
      </Stack>
    </>
  );
};
export default function CentroForm({ handleRequest, id = undefined }) {
  const [loading, setLoading] = useState(false);

  const [cidades, setCidades] = useState([]);
  const [cidade, setCidade] = useState("");

  const [files, setFiles] = useState([]);
  const [nome, setNome] = useState("");
  const [nomeErr, setNomeErr] = useState(false);
  const [endereco, setEndereco] = useState("");
  const [enderecoErr, setEnderecoErr] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [descricaoErr, setDescricaoErr] = useState(false);
  const [ativo, setAtivo] = useState(true);

  const setFields = useCallback((data) => {
    setNome(data.nome);
    setEndereco(data.endereco);
    setDescricao(data.descricao);
    setAtivo(data.estado);
    setCidade(data.cidade);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://geoptapi.org/municipios?json=1"
        );
        setCidades(response);
        if (id) {
          const { data: response } = await axios.get("/centro/" + id);
          setFields(response.centro);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [setCidades, setFields, id]);

  const validate = () => {};

  const clearErr = () => {
    setNomeErr(false);
    setEnderecoErr(false);
    setDescricaoErr(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErr();

    if (validate()) {
      handleRequest({ nome, endereco, descricao, estado: ativo, cidade });
    }
  };

  const imgProps = {
    files,
    setFiles,
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "fit-content",
        margin: "1em auto",
        position: "relative",
      }}
    >
      <Stack
        component={Paper}
        spacing={2}
        width="500px"
        sx={{ paddingInline: 3, paddingBlock: 2 }}
      >
        {loading ? (
          loadSkeleton()
        ) : (
          <>
            <Typography textAlign="center" variant="h4">
              {!id ? "Adicionar" : "Editar"} Centro
            </Typography>

            <TextField
              required
              label="Nome"
              variant="outlined"
              error={nomeErr}
              helperText={nomeErr && errorList.nome}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="off"
            />

            <Autocomplete
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

            <TextField
              required
              label="Endereco"
              variant="outlined"
              error={enderecoErr}
              helperText={enderecoErr && errorList.endereco}
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              autoComplete="off"
            />

            <TextField
              required
              label="Descrição"
              variant="outlined"
              error={descricaoErr}
              helperText={descricaoErr && errorList.descricao}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              autoComplete="off"
            />

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
          </>
        )}
      </Stack>
      <Switch
        sx={{ position: "absolute", top: 0, mt: 1, right: 2 }}
        checked={ativo}
        onChange={(e) => setAtivo(e.target.checked)}
      />
    </form>
  );
}
