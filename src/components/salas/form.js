import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Skeleton,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "../../api/axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const errorList = {
  nome: "O nome precisa de ter entre 5 a 100 caracteres.",
  email: "Este email não é válido.",
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
      <Stack direction="row" spacing={2}>
        <Skeleton variant="rectangular" width={70} height={40} />
        <Stack className="center">
          <Skeleton variant="text" width={270} />
          <Skeleton variant="text" width={150} />
        </Stack>
        <Skeleton variant="rectangular" width={70} height={40} />
      </Stack>
      <Skeleton variant="rectangular" width={450} height={40} />
      <Divider />
      <Skeleton
        variant="rectangular"
        width={100}
        height={35}
        sx={{ alignSelf: "flex-end" }}
      />
    </>
  );
};

function SalasForm({ data, handleRequest, handleDelete }) {
  const [centros, setCentros] = useState([]);
  const [centro, setCentro] = useState(1);
  const [nome, setNome] = useState("");
  const [nomeErr, setNomeErr] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [descricaoErr, setDescricaoErr] = useState(false);
  const [lotacaoMax, setLotacaoMax] = useState(50);
  const [valSlider, setValSlider] = useState(70);
  const [ativo, setAtivo] = useState(true);

  const [isLoading, setLoading] = useState(false);

  const calcLotacaoFinal = useMemo(() => {
    return Math.floor((lotacaoMax * valSlider) / 100);
  }, [lotacaoMax, valSlider]);

  const clearForm = useCallback(() => {
    setNome("");
    setDescricao("");
    setCentro(centros[0]);
    setLotacaoMax(50);
    setValSlider(70);
    setAtivo(true);
  }, [centros]);

  useEffect(() => {
    if (!data) {
      clearForm();
      return;
    }
    setNome(data.nome);
    setCentro(centros[data.idcentro]);
    setDescricao(data.descricao);
    setLotacaoMax(data.lotacaomax);
    setValSlider((100 * data.lotacao) / data.lotacaomax);
    setAtivo(data.estado);
  }, [data, clearForm, centros]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get("/centro/list");
        setCentros(response.data);
      } catch (error) {
        toast.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const validate = () => {
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate)
      handleRequest({
        nome,
        descricao,
        centro: centro.idcentro,
        lotacaoMax,
        lotacao: calcLotacaoFinal,
        ativo,
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: 500,
        flexGrow: 1,
        position: "relative",
      }}
    >
      <Stack
        component={Paper}
        elevation={2}
        maxWidth="sm"
        spacing={2}
        sx={{ paddingInline: 3, paddingBlock: 2 }}
      >
        {isLoading ? (
          loadSkeleton()
        ) : (
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
            <Stack direction="row" spacing={2} className="center">
              <FormControl>
                <InputLabel>Lotação</InputLabel>
                <Input
                  size="small"
                  value={lotacaoMax}
                  onChange={(e) => setLotacaoMax(e.target.value)}
                  inputProps={{
                    step: 10,
                    min: 0,
                    max: 100,
                    type: "number",
                    style: { textAlign: "center" },
                  }}
                />
              </FormControl>
              <Stack sx={{ flexGrow: 1 }} className="center ">
                <Slider
                  step={5}
                  value={valSlider}
                  onChange={(e) => setValSlider(e.target.value)}
                  valueLabelDisplay="on"
                />
                <Typography>Limite Máximo (%)</Typography>
              </Stack>
              <FormControl sx={{ width: 100 }}>
                <InputLabel>Lotação Final</InputLabel>
                <Input
                  size="small"
                  disabled={true}
                  inputProps={{
                    type: "number",
                    style: { textAlign: "center" },
                  }}
                  value={calcLotacaoFinal}
                />
              </FormControl>
            </Stack>
            <Autocomplete
              options={centros}
              value={centro || ""}
              isOptionEqualToValue={(op, val) => true}
              getOptionLabel={(option) => option.cidade || ""}
              onChange={(event, value, reason) => {
                if (reason === "clear") return;
                else setCentro(value);
              }}
              onInputChange={(event, value, reason) => {
                if (reason === "clear") {
                  setCentro(value);
                }
              }}
              renderInput={(params) => <TextField {...params} label="Cidade" />}
            />
            <Divider />
            <Stack direction="row">
              <Button color="error" variant="contained" onClick={handleDelete}>
                Apagar
              </Button>
              <Button
                type="submit"
                color="info"
                variant="contained"
                sx={{ ml: "auto" }}
              >
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

export default SalasForm;
