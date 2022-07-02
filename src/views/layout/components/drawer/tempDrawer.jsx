import { Box, Drawer } from "@mui/material";
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
      <Box
        role="presentation"
        onClick={handleDrawerToggle}
        onKeyDown={handleDrawerToggle}
      >
        {drawer}
      </Box>
    </Drawer>
  );
}

export default TempDrawer;
