import socket from "api/_socket";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { Outlet } from "react-router-dom";
import MenuDrawer from "./components/drawer/drawer";

export default function DashboardLayout() {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("newUser", () => {
      queryClient.invalidateQueries("getUtilizadoresDashboard");
    });
    socket.on("newFeedback", () => {
      queryClient.invalidateQueries("getFeedbacks");
    });
    return () => {
      socket.off("newUser");
      socket.off("newFeedback");
    };
  }, [queryClient]);

  return (
    <MenuDrawer>
      <Outlet />
    </MenuDrawer>
  );
}
