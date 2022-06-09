import Drawer from "../components/dashboard/layout/drawer/drawer";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <Drawer>
      <Outlet />
    </Drawer>
  );
}
