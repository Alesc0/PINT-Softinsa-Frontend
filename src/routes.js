import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import DashboardLayout from "./views/dashboardLayout";

// paginas
import Login from "./views/login/loginView";
import NotFound from "./views/notFoundView";
import Dashboard from "./views/dashboardView";
import Stats from "./views/statsView";

import Centros from "./views/centros/centrosView";
import AddCentros from "./views/centros/addCentros";
import EditCentros from "./views/centros/editCentros";

import Salas from "./views/salas/salasView";

import Utilizadores from "./views/utilizadores/utilizadoresView";
import AddUtilizadores from "./views/utilizadores/addUtilizadores";
import EditUtilizadores from "./views/utilizadores/editUtilizadores";

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="salas" element={<Salas />} />

          <Route path="centros" element={<Centros />} />
          <Route path="centros/add" element={<AddCentros />} />
          <Route path="centros/edit/:id" element={<EditCentros />} />

          <Route path="utilizadores" element={<Utilizadores />} />
          <Route path="utilizadores/add" element={<AddUtilizadores />} />
          <Route path="utilizadores/edit/:id" element={<EditUtilizadores />} />
          
          <Route path="stats" element={<Stats />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
