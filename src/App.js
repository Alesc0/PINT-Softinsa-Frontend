import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/loginView";
import NotFound from "./views/notFoundView";
import Dashboard from "./views/dashboardView";
import { createTheme } from "@mui/material/styles";
import Stats from "./views/statsView";
import Centros from "./views/centrosView";
import Utilizadores from "./views/utilizadores/utilizadoresView";
import { createContext, useState } from "react";
import AddUtilizadores from "./views/utilizadores/addUtilizadoresView";

export const ColorModeContext = createContext(null);

function App() {
  const [mode, setMode] = useState(false);
  const switchMode = () => {
    setMode((e) => !e);
  };
  const theme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
      primary: {
        main: "#3498DB",
        dark: "#2980B9",
        darker: "#34495E",
      },
    },
    typography: {
      fontFamily: "Roboto",
    },
  });
  return (
    <ColorModeContext.Provider value={{ switchMode }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard theme={theme} />} />
          <Route path="login" element={<Login theme={theme} />} />
          <Route path="stats" element={<Stats theme={theme} />} />
          <Route path="centros" element={<Centros theme={theme} />} />
          <Route path="utilizadores" element={<Utilizadores theme={theme} />} />
          <Route
            path="add/utilizadores"
            element={<AddUtilizadores theme={theme} />}
          />
          <Route path="*" element={<NotFound theme={theme} />} />
        </Routes>
      </BrowserRouter>
    </ColorModeContext.Provider>
  );
}
export default App;
