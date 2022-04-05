import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/loginView";
import NotFound from "./views/notFoundView";
import Dashboard from "./views/dashboardView";
import { createTheme } from "@mui/material/styles";
import Stats from "./views/statsView";
import Centros from "./views/centrosView";
import Utilizadores from "./views/utilizadoresView";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3498DB",
      dark: "#2980B9",
    },
  },
  typography: {
    fontFamily: "Roboto"
  },
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard th={theme} />} />
        <Route path="login" element={<Login th={theme} />} />
        <Route path="stats" element={<Stats th={theme} />} />
        <Route path="centros" element={<Centros th={theme} />} />
        <Route path="utilizadores" element={<Utilizadores th={theme} />} />
        <Route path="*" element={<NotFound th={theme} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
