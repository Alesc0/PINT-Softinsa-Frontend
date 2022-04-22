import MenuDrawer from "../components/menuDrawer/menuDrawer";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <MenuDrawer>
      <Outlet/>
    </MenuDrawer>
  );
}
