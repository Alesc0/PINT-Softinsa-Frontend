import { BrowserRouter, Routes, Route } from "react-router-dom";
// layouts
import DashboardLayout from "./views/dashboardLayout";
import Login from "./views/loginView";
import NotFound from "./views/notFoundView";
import Dashboard from "./views/dashboard/dashboardView";
import Stats from "./views/statsView";
import Centros from "./views/centros/centrosView";
import Utilizadores from "./views/utilizadores/utilizadoresView";
import AddUtilizadores from "./views/utilizadores/addUtilizadores";
import AddCentros from "./views/centros/addCentros";
//

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="centros" element={<Centros />} />
          <Route path="centros/add" element={<AddCentros />} />
          <Route path="utilizadores" element={<Utilizadores />} />
          <Route path="utilizadores/add" element={<AddUtilizadores />} />
          <Route path="stats" element={<Stats />} />
        </Route>
        <Route path="login" element={<Login />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}
