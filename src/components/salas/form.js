import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const errorList = {
  nome: "O nome precisa de ter entre 5 a 100 caracteres.",
  email: "Este email não é válido.",
};

function SalasForm({ data }) {
  const [centros, setCentros] = useState([]);
  const [centro, setCentro] = useState(1);
  const [nome, setNome] = useState("");
  const [nomeErr, setNomeErr] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [descricaoErr, setDescricaoErr] = useState(false);

  useEffect(() => {
    clearForm();
    if (!data) return;
    setNome(data.nome);
    setCentro(data.idcentro);
    setDescricao(data.descricao);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get("/centro/list");
        setCentros(response.data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);

  const clearForm = () => {
    setNome("");
    setDescricao("");
    setCentro(1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: 500,
        flexGrow: 1,
      }}
    >
      <Stack
        component={Paper}
        elevation={2}
        maxWidth="sm"
        spacing={2}
        sx={{ paddingInline: 3, paddingBlock: 2 }}
      >
        {/* {loading ? (
          loadSkeleton()
        ) : ( */}
        <>
          <Typography textAlign="center" variant="h4">
            {!data ? "Adicionar" : "Editar"} Sala
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
          <TextField
            required
            multiline
            maxRows={5}
            label="Descrição"
            variant="outlined"
            error={descricaoErr}
            helperText={descricaoErr && errorList.descricao}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            autoComplete="off"
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="label-select"> Centro </InputLabel>
              <Select
                label="Centro"
                labelId="label-select"
                value={centro}
                onChange={(e) => setCentro(e.target.value)}
              >
                {centros.length > 0 ? (
                  centros.map((row) => (
                    <MenuItem key={row.idcentro} value={row.idcentro}>
                      {row.cidade}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={1}> {"Sem centros disponíveis!"} </MenuItem>
                )}
              </Select>
            </FormControl>
          </Stack>
          <Divider />
          <Button
            type="submit"
            color="info"
            variant="contained"
            sx={{ alignSelf: "flex-end" }}
          >
            Confirmar
          </Button>
        </>
        {/* 
        )} */}
      </Stack>
    </form>
  );
}

export default SalasForm;
