import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/loginView";
import NotFound from "./views/notFoundView";
import Dashboard from "./views/dashboard/dashboardView";
import { createTheme } from "@mui/material/styles";
import Stats from "./views/statsView";
import Centros from "./views/centrosView";
import Utilizadores from "./views/utilizadores/utilizadoresView";
import { createContext, useState } from "react";
import AddUtilizadores from "./views/utilizadores/addUtilizadoresView";

export const ColorModeContext = createContext(null);

function App() {
  const [mode, setMode] = useState("light");
  const switchMode = () => {
    setMode((e) => (e === "light" ? "dark" : "light"));
  };
  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#3498DB",
              dark: "#2980B9",
              darker: "#34495E",
            },
            background: {
              default: "#ECF0F1",
              paper: "#FFFFFF",
            },
          }
        : {
            primary: {
              main: "#3498DB",
              dark: "#2980B9",
              darker: "#34495E",
            },
          }),
    },
    typography: {
      fontFamily: "Roboto",
      fontSize: 14  
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "background.default",
          },
          "*::-webkit-scrollbar": {
            width: "0.6em",
            height: "0.6em",
          },
          "*::-webkit-scrollbar-track": {
            "-Webkit-Box-Shadow": "inset 0 0 10px #E0ECDE",
            "box-shadow": "inset 0 0 10px #E0ECDE",
            marginRight: "10px",
          },
          "*::-webkit-scrollbar-thumb": {
            background: "#2980B9",
            borderRadius: "6px",
          },
        },
      },
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
