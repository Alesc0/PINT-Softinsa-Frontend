import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SideBar from "../sideBar/sideBar";

const EnhancedTableToolbar = (props) => {
  const { selected, handleOpen } = props;
  const [sidebar, setSidebar] = useState(false);

  const sidebarInner = () => (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h4" component="div">
          Filtros
        </Typography>
        <IconButton sx={{ marginLeft: "auto" }} onClick={handleSidebar(false)}>
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
      <Button color="info" variant="contained">
        {" "}
        Pesquisar{" "}
      </Button>
    </>
  );
  const handleSidebar = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSidebar(open);
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
        {selected.length > 0 ? (
          <Typography color="inherit" variant="subtitle1" component="div">
            {selected.length} selected
          </Typography>
        ) : null}
        {selected.length > 0 ? (
          <Tooltip title="Delete" sx={{ ml: "auto" }}>
            <IconButton onClick={(event) => handleOpen(event, selected)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list" sx={{ ml: "auto" }}>
            <IconButton onClick={handleSidebar(true)}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>

      <SideBar
        anchor="right"
        handleSidebar={handleSidebar}
        state={sidebar}
        inner={sidebarInner}
      />
    </>
  );
};

export default EnhancedTableToolbar;
