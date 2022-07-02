import { Close } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { UserContext } from "App";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "api/axios";

export default function SettingsDrawer({ open, handleClose, handleColorMode }) {
  const [mode, setMode] = useState("");
  const [val, toggle] = useState(false);
  const { centro, setCentro, user } = useContext(UserContext);

  const { isFetching, data: dataCentros } = useQuery(
    ["getCentros"],
    async () => {
      const { data: response } = await axios.get("centro/list");
      return response.data;
    },
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (isFetching) return;
    let c = localStorage.getItem("centro");
    if (!c) setCentro(user.idcentro);
    else setCentro(c);
  }, [setCentro, user.idcentro, isFetching]);

  const handleCentro = (e) => {
    setCentro(e.target.value);
    localStorage.setItem("centro", e.target.value);
  };

  const refetch = () => {
    toggle((prev) => !prev);
  };

  useEffect(() => {
    setMode(localStorage.getItem("mode") || "light");
  }, [setMode, val]);

  const handleSetMode = (val) => {
    handleColorMode(val);
    refetch();
  };

  const customButton = (val, str) => {
    return (
      <Button
        sx={{ flexGrow: 1 }}
        variant={mode === val ? "outlined" : "contained"}
        onClick={() => handleSetMode(val)}
      >
        {str}
      </Button>
    );
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Stack
        spacing={2}
        sx={{
          width: 300,
          p: 3,
        }}
        role="presentation"
      >
        <Stack direction="row">
          <Typography variant="h4" component="div">
            Definições
          </Typography>
          <IconButton sx={{ marginLeft: "auto" }} onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <Divider />
        <Stack spacing={2}>
          <Stack>
            <Typography>Modo:</Typography>
            <ButtonGroup variant="contained">
              {customButton("light", "Claro")}
              {customButton("system", "Sistema")}
              {customButton("dark", "Escuro")}
            </ButtonGroup>
          </Stack>
          <Stack>
            <Typography>Filtrar por Centro:</Typography>
            <Select
              name="idcentro"
              sx={{ height: 50 }}
              value={centro}
              onChange={(e) => handleCentro(e)}
            >
              <MenuItem value={-1}> {"Todos"} </MenuItem>
              {dataCentros?.length > 0 &&
                dataCentros?.map((row) => (
                  <MenuItem key={row.idcentro} value={row.idcentro}>
                    {row.cidade}
                  </MenuItem>
                ))}
            </Select>
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  );
}
