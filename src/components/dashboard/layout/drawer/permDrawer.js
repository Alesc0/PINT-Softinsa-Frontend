import { Drawer } from "@mui/material";
import React from "react";

function PermDrawer({ drawerWidth, drawer }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          bgcolor: "primary.darker",
        },
      }}
      open
    >
      {drawer}
    </Drawer>
  );
}

export default PermDrawer;
