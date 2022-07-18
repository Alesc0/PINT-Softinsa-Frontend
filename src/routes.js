import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

// layouts
import DashboardLayout from "./views/layout/dashboardLayout";

// paginas
import Login from "./views/login/loginView";
import NotFound from "./views/notFoundView";
import Dashboard from "./views/dashboard/dashboardView";

import Centros from "./views/centros/centrosView";
import AddCentros from "./views/centros/addCentros";
import EditCentros from "./views/centros/editCentros";

import Salas from "./views/salas/salasView";

import Reservas from "./views/reservas/reservasView";

import Utilizadores from "./views/utilizadores/utilizadoresView";
import AddUtilizadores from "./views/utilizadores/addUtilizadores";
import EditUtilizadores from "./views/utilizadores/editUtilizadores";

import Notificacoes from "views/notificacoes/notificacoesView";
import Feedbacks from "views/feedbacks/feedbacksView";

import LandingPage from "./views/landingPage/landingPage";

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="salas" element={<Salas />} />

            <Route path="centros" element={<Centros />} />
            <Route path="centros/add" element={<AddCentros />} />
            <Route path="centros/edit/:id" element={<EditCentros />} />

            <Route path="utilizadores" element={<Utilizadores />} />
            <Route path="utilizadores/add" element={<AddUtilizadores />} />
            <Route
              path="utilizadores/edit/:id"
              element={<EditUtilizadores />}
            />
            <Route path="reservas" element={<Reservas />} />
            <Route path="notificacoes" element={<Notificacoes />} />
            <Route path="feedbacks" element={<Feedbacks />} />
          </Route>
        </Route>

        <Route path="home" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
