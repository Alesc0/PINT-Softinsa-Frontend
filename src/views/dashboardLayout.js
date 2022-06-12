import { Outlet } from "react-router-dom";
import MenuDrawer from "../components/layout/drawer/drawer";

export default function DashboardLayout() {
  return (
    <MenuDrawer>
      <Outlet />
    </MenuDrawer>
  );
}
