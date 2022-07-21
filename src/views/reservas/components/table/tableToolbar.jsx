import { Clear, Search } from "@mui/icons-material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MultipleAutocomplete from "common/multipleAutocomplete/multipleAutocomplete";
import { useRef, useState } from "react";

const EnhancedTableToolbar = ({
  autoCentros,
  setAutoCentros,
  dataCentros,
  setPesquisa,
  pesquisa,
  handleFiltros,
  setSearchData,
  searchData,
  dataSalas,
  autoSalas,
  setAutoSalas,
}) => {
  const [filtro, setFiltro] = useState(false);

  const containerRef = useRef(null);

  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Box
          sx={{ display: "flex", width: "100%", overflow: "hidden", mr: 1 }}
          ref={containerRef}
        >
          <Slide
            direction="left"
            in={filtro}
            container={containerRef.current}
            timeout={1000}
            mountOnEnter
            unmountOnExit
          >
            <Stack direction="row" sx={{ ml: "auto", mt: 1 }} spacing={2}>
              <Stack direction="row">
                <Tooltip title="Limpar Filtros">
                  <IconButton onClick={() => handleFiltros(false)}>
                    <Clear />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Pesquisar">
                  <IconButton onClick={() => handleFiltros(true)}>
                    <Search />
                  </IconButton>
                </Tooltip>
              </Stack>
              <TextField
                variant="standard"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                label="Ncolab, Nome, Sala"
              />
              <Autocomplete
                sx={{ minWidth: 150 }}
                multiple
                options={dataCentros || []}
                value={autoCentros}
                ChipProps={{ color: "primary", size: "small" }}
                getOptionLabel={(option) => option.cidade}
                isOptionEqualToValue={(op, val) => op.idcentro === val.idcentro}
                onChange={(event, value, reason) => {
                  if (reason === "clear") {
                    setAutoCentros(null);
                    setAutoSalas([]);
                  } else {
                    setAutoCentros(value);
                    setAutoSalas([]);
                  }
                }}
                onInputChange={(event, value, reason) => {
                  if (reason === "clear") {
                    setAutoCentros([]);
                    setAutoSalas([]);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={"Filtrar Centros"}
                  />
                )}
              />
              <Autocomplete
                sx={{ minWidth: 150 }}
                multiple
                options={dataSalas || []}
                value={autoSalas}
                ChipProps={{ color: "primary", size: "small" }}
                getOptionLabel={(option) => option.nome}
                isOptionEqualToValue={(op, val) => op.idsala === val.idsala}
                onChange={(event, value, reason) => {
                  if (reason === "clear") return;
                  else setAutoSalas(value);
                }}
                onInputChange={(event, value, reason) => {
                  if (reason === "clear") {
                    setAutoSalas([]);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={"Filtrar Salas"}
                  />
                )}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Data"
                  inputFormat="dd/MM/yyyy"
                  value={searchData}
                  onChange={(e) => setSearchData(e)}
                  renderInput={(params) => (
                    <TextField variant="standard" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Stack>
          </Slide>
        </Box>
        <Tooltip title="Filtro" sx={{ ml: "auto" }}>
          <Button
            variant={filtro ? "contained" : "outlined"}
            onClick={() => setFiltro((prev) => !prev)}
          >
            <FilterListIcon />
          </Button>
        </Tooltip>
      </Toolbar>
    </>
  );
};

export default EnhancedTableToolbar;
