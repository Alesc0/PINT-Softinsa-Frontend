import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomPhoneInput from "../../components/phoneInput";
import PhoneInput from "react-phone-number-input/input";

const errorList = {
  nome: "O nome precisa de ter entre 5 a 100 caracteres.",
  email: "Este email não é válido.",
};

const options = [
  {
    name: "firstLogin",
    displayName: "Primeiro Login",
  },
  {
    name: "verificado",
    displayName: "Verificado",
  },
];

function AddUtilizadoresView() {
  const [permissionTab, setPermissionTab] = useState(0);
  const [centros, setCentros] = useState([]);

  const [nome, setNome] = useState("");
  const [nomeErr, setNomeErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [contacto, setContacto] = useState("+351");
  const [contactoErr, setContactoErr] = useState(false);
  const [centro, setCentro] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get("/centro/list");
        setCentros(response.centros);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event, newValue) => setPermissionTab(newValue);

  const clearErr = () => {
    setNomeErr(false);
    setEmailErr(false);
    setContactoErr(false);
  };

  const validate = () => {
    let valid = true;
    if (!nome || nome.length < 5 || nome.length > 100) {
      valid = false;
      setNomeErr(true);
    }
    if (!contacto || contacto.length !== 13) {
      valid = false;
      setContactoErr(true);
    }
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErr();
    if (validate()) {
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack
          component={Paper}
          maxWidth="sm"
          spacing={2}
          sx={{
            m: "2em auto",
            p: 3,
          }}
        >
          <Typography textAlign="center" variant="h4">
            Adicionar Utilizador
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
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            error={emailErr}
            autoComplete="off"
            helperText={emailErr && errorList.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PhoneInput
            required
            autoComplete="off"
            value={contacto}
            error={contactoErr}
            onChange={setContacto}
            placeholder="Contacto"
            inputComponent={CustomPhoneInput}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl>
              <InputLabel id="label-select"> Centro </InputLabel>
              <Select
                sx={{ minWidth: 125 }}
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
            <Box>
              <Tabs
                value={permissionTab}
                onChange={handleChange}
              >
                <Tab label="Regular" value={0} />
                <Tab label="Administrador" value={1} />
                <Tab label="Limpeza" value={2} />
              </Tabs>
            </Box>
          </Stack>
          <Divider />
          <Stack direction="row" spacing={2} sx={{ alignSelf: "flex-end" }}>
            <Button
              component={Link}
              to="/utilizadores"
              color="error"
              variant="contained"
            >
              Voltar
            </Button>
            <Button type="submit" color="info" variant="contained">
              Confirmar
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
}
export default AddUtilizadoresView;
