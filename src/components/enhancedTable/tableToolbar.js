import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,
  Box,
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../sideBar/sideBar";
import NewModal from "../modal/modal";

const EnhancedTableToolbar = (props) => {
  const {
    setLoading,
    selected,
    refetch,
    setSelected,
    dense,
    handleChangeDense,
    setOpen
  } = props;
  const [sidebar, setSidebar] = useState(false);

  const sideBar = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 300,
        p: 3,
      }}
      role="presentation"
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h4" component="div">
          Filtros
        </Typography>
        <IconButton sx={{ marginLeft: "auto" }} onClick={toggleFiltro(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        placeholder="ID"
      />
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        placeholder="Nome"
      />
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        placeholder="Email"
      />
      <Button variant="contained"> Pesquisar </Button>
    </Box>
  );
  const toggleFiltro = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSidebar(open);
  };

  return (
    <ThemeProvider theme={props.th}>
      <Toolbar
        sx={{
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
        {selected.length > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Utilizadores
          </Typography>
        )}
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
        />
        {selected.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton onClick={toggleFiltro(true)}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>

      <SideBar
        anchor="right"
        toggleFiltro={toggleFiltro}
        state={sidebar}
        inner={sideBar}
      />
      <ToastContainer />
    </ThemeProvider>
  );
};

export default EnhancedTableToolbar;
