import { Settings } from "@mui/icons-material";
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
import { useCallback, useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input/input";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../components/opcoesModal";
import CustomPhoneInput from "../../components/phoneInput";

const errorList = {
  nome: "O nome precisa de ter entre 5 a 100 caracteres.",
  email: "Este email não é válido.",
};

const options = [
  {
    name: "firstLogin",
    displayName: "Primeiro Login",
    default: true,
  },
  {
    name: "verificado",
    displayName: "Verificado",
    default: false,
  },
];

const perms = ["Regular", "Administrador", "Limpeza"];

export default function UtilizadorForm({ handleRequest, id = undefined }) {
  const [permissionTab, setPermissionTab] = useState(0);
  const [centros, setCentros] = useState([]);

  const [nome, setNome] = useState("");
  const [nomeErr, setNomeErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [contacto, setContacto] = useState("+351");
  const [contactoErr, setContactoErr] = useState(false);
  const [centro, setCentro] = useState(1);
  const [ativo, setAtivo] = useState(true);

  //MODAL
  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState(
    options.map((row, i) => {
      return row.default;
    })
  );

  const handleToggle = (value) => () => {
    const newChecked = [...checked];
    newChecked[value] = !checked[value];
    setChecked(newChecked);
  };

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const modalProps = {
    options,
    openModal,
    handleClose,
    handleToggle,
    checked,
    setAtivo,
    ativo,
  };

  const setAddOptions = (data) => {
    let op = options.map((row) => data[row.name]);
    setChecked(op);
  };

  const setFields = useCallback((data) => {
    setNome(data.nome);
    if (data.telemovel.length < 13) setContacto("+351" + data.telemovel);
    else setContacto(data.telemovel);
    setEmail(data.email);
    setCentro(data.idcentro);
    if (data.admin) setPermissionTab(1);
    setAtivo(data.estado);
    setAddOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get("/centro/list");
        setCentros(response.centros);
        if (id) {
          const { data: response } = await axios.get("/utilizador/" + id);
          setFields(response.utilizador);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [setCentro, id, setFields]);

  const handleChange = (event, newValue) => setPermissionTab(newValue);

  const clearErr = () => {
    setNomeErr(false);
    setEmailErr(false);
    setContactoErr(false);
  };

  const validate = () => {
    let valid = true;
    if (!nome || nome.trim().length < 5 || nome.trim().length > 100) {
      valid = false;
      setNomeErr(true);
    }
    if (!contacto || contacto.trim().length !== 13) {
      valid = false;
      setContactoErr(true);
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErr();

    if (validate()) {
      handleRequest({
        nome: nome.trim(),
        contacto: contacto.trim(),
        email: email.trim(),
        ativo: ativo,
        ...opObj(),
      });
    }
  };

  const opObj = () => {
    let a = {};
    options.map((row, i) => (a[row.name] = checked[i]));
    return a;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          width: "fit-content",
          margin: "2em auto",
        }}
      >
        <Stack
          component={Paper}
          maxWidth="sm"
          spacing={2}
          sx={{ paddingInline: 3, paddingBlock: 2 }}
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
              <Tabs value={permissionTab} onChange={handleChange}>
                {perms.map((row, i) => (
                  <Tab key={i} label={row} value={i} />
                ))}
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
        <IconButton
          sx={{ position: "absolute", top: 0, mt: 1, right: 2 }}
          onClick={handleOpen}
        >
          <Settings />
        </IconButton>
      </form>
      <Modal {...modalProps} />
    </>
  );
}
