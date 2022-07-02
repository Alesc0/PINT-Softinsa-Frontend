import { Outlet } from "react-router-dom";
import MenuDrawer from "./components/drawer/drawer";

export default function DashboardLayout() {
  return (
    <MenuDrawer>
      <Outlet />
    </MenuDrawer>
  );
}
