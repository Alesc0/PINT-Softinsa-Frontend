import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import { useState } from "react";
import SideBar from "./sideBar";

const EnhancedTableToolbar = (props) => {
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
        }}
      >
        <Tooltip title="Filtro" sx={{ ml: "auto" }}>
          <IconButton onClick={handleSidebar(true)}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <SideBar anchor="right" handleSidebar={handleSidebar} state={sidebar} />
    </>
  );
};

export default EnhancedTableToolbar;
