import { Clear, Search } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  alpha,
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

const EnhancedTableToolbar = (props) => {
  const {
    selected,
    handleOpenModal,
    autoCentros,
    setAutoCentros,
    pesquisa,
    setPesquisa,
    handleFiltros,
    dataCentros,
  } = props;

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
          ...(selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
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
            <Stack direction="row" sx={{ ml: "auto" }} spacing={2}>
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
            </Stack>
          </Slide>
        </Box>
        {selected.length > 0 ? (
          <Tooltip title="Delete" sx={{ ml: "auto" }}>
            <IconButton onClick={(event) => handleOpenModal(event, selected)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list" sx={{ ml: "auto" }}>
            <Button
              variant={filtro ? "contained" : "outlined"}
              onClick={() => setFiltro((prev) => !prev)}
            >
              <FilterListIcon />
            </Button>
          </Tooltip>
        )}
      </Toolbar>
    </>
  );
};

export default EnhancedTableToolbar;
