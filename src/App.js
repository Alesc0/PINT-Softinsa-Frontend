import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/login";
import NotFound from "./routes/notFound";
import Dashboard from "./routes/dashboard";
import { createTheme } from "@mui/material/styles";
import Stats from "./routes/statistics";
import SideBar from "./components/sideBar/sideBar";
import Centros from "./routes/centros";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3498DB",
      dark: "#2980B9",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 710,
      lg: 1200,
      xl: 1536,
    },
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
        <Route path="*" element={<NotFound th={theme} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
