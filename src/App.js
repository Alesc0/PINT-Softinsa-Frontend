import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./routes/login";
import Demo from "./routes/dashboard";
import NotFound from "./routes/notFound";
import Dashboard from "./routes/dashboard";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3498DB",
    },
    secondary: {
      main: "#2980B9",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard th={theme} />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="demo" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
