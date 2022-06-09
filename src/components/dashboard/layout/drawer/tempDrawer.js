import { Drawer } from "@mui/material";
import React from "react";

function TempDrawer(props) {
  const { container, mobileOpen, handleDrawerToggle, drawerWidth, drawer } =
    props;
  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          bgcolor: "primary.darker",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
}

export default TempDrawer;
