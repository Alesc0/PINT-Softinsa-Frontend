import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import SideBar from "./sideBar";

const EnhancedTableToolbar = (props) => {
  const { selected, handleOpenModal } = props;
  const [sidebar, setSidebar] = useState(false);

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
            <IconButton onClick={(event) => handleOpenModal(event, selected)}>
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

      <SideBar anchor="right" handleSidebar={handleSidebar} state={sidebar} />
    </>
  );
};

export default EnhancedTableToolbar;
