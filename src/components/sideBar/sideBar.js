import { Box, Drawer } from "@mui/material";

export default function SideBar(props) {
  return (
    <Drawer
      anchor={props.anchor}
      open={props.state}
      onClose={props.handleSidebar(false)}
    >
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
        {props.inner()}
      </Box>
    </Drawer>
  );
}
