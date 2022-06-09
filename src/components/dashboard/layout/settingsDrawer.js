import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

export default function SettingsDrawer({ open, handleClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box width={300}></Box>
    </Drawer>
  );
}
