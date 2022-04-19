import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/loginView";
import NotFound from "./views/notFoundView";
import Dashboard from "./views/dashboard/dashboardView";
import Stats from "./views/statsView";
import Centros from "./views/centrosView";
import Utilizadores from "./views/utilizadores/utilizadoresView";
import AddUtilizadores from "./views/utilizadores/addUtilizadoresView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="stats" element={<Stats />} />
        <Route path="centros" element={<Centros />} />
        <Route path="utilizadores" element={<Utilizadores />} />
        <Route path="add/utilizadores" element={<AddUtilizadores />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
