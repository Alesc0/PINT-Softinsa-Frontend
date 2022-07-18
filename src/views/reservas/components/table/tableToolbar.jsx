import { Clear, Search } from "@mui/icons-material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import {
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
}) => {
  const [filtro, setFiltro] = useState(false);

  const containerRef = useRef(null);
  const maCentrosProps = {
    getter: autoCentros,
    setter: setAutoCentros,
    text: "Filtrar Centros",
    data: dataCentros,
  };

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
              <MultipleAutocomplete
                sx={{ minWidth: 150 }}
                {...maCentrosProps}
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
