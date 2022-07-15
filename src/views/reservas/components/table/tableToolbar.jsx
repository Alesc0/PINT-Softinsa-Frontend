import { DateRange } from "@mui/icons-material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { MobileDatePicker } from "@mui/lab";
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
import MultipleAutocomplete from "common/multipleAutocomplete/multipleAutocomplete";
import { useRef, useState } from "react";

const EnhancedTableToolbar = ({
  autoCentros,
  setAutoCentros,
  dataCentros,
  setPesquisa,
  pesquisa,
  handleFiltros,
}) => {
  const [filtro, setFiltro] = useState(false);
  const [date, setDate] = useState(new Date());

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
          sx={{ display: "flex", width: "100%", overflow: "hidden" }}
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
            <Stack direction="row" sx={{ ml: "auto" }} spacing={2}>
              <TextField
                variant="standard"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                label="Pesquisar"
              />
              <MultipleAutocomplete
                sx={{ minWidth: 150 }}
                {...maCentrosProps}
              />
              <MobileDatePicker
                label="Inicio"
                inputFormat="dd/MM/yyyy"
                value={date}
                onChange={(e) => setDate(e)}
                renderInput={(params) => <TextField {...params} />}
              />
              <Button variant="contained" onClick={handleFiltros}>
                Aplicar Filtros
              </Button>
            </Stack>
          </Slide>
        </Box>
        <Tooltip title="Filtro" sx={{ ml: "auto" }}>
          <IconButton onClick={() => setFiltro((prev) => !prev)}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </>
  );
};

export default EnhancedTableToolbar;
