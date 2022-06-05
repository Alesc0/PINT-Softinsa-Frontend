import Drawer from "../components/menuDrawer/drawer";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <Drawer>
      <Outlet />
    </Drawer>
  );
}
