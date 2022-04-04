import { Drawer } from "@mui/material";

export default function SideBar(props) {
  return (
    <Drawer
      anchor={props.anchor}
      open={props.state}
      onClose={props.toggleDrawer(false)}
    >
      {props.inner()}
    </Drawer>
  );
}
