import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const errorList = {
  nome: "O nome precisa de ter entre 5 a 100 caracteres.",
  email: "Este email não é válido.",
};

function SalasForm({ data, handleRequest }) {
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

  useEffect(() => {
    clearForm();
    if (!data) return;
    setNome(data.nome);
    setCentro(data.idcentro);
    setDescricao(data.descricao);
    setLotacaoMax(data.lotacaomax);
    setValSlider((100 * data.lotacao) / data.lotacaomax);
    setAtivo(data.estado);
  }, [data]);

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

  const clearForm = () => {
    setNome("");
    setDescricao("");
    setCentro(1);
    setLotacaoMax(50);
    setValSlider(70);
    setAtivo(true);
  };

  const validate = () => {
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate)
      handleRequest({
        nome,
        descricao,
        centro,
        lotacaoMax,
        lotacao: calcLotacaoFinal(),
        ativo,
      });
  };
  console.log(centro);
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
        {isLoading ? null : (
          /* loadSkeleton() */
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
            {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2}> */}
            <Autocomplete
              options={centros}
              value={centros[centro] || null}
              isOptionEqualToValue={(op, val) => {
                if (!op || !val) {
                  console.log("op.", op);
                  console.log("val.", val);
                  return false;
                }
                return op.idcentro === val.idcentro;
              }}
              getOptionLabel={(option) => option.cidade}
              onChange={(event, value, reason) => {
                if (reason === "clear") setCentro(1);
                else setCentro(value.idcentro);
              }}
              onInputChange={(event, value, reason) => {
                if (reason === "clear") {
                  setCentro(1);
                }
              }}
              renderInput={(params) => <TextField {...params} label="Cidade" />}
            />
            {/*  <FormControl sx={{ width: "100%" }}>
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
            </FormControl> */}
            {/* </Stack> */}
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
