// material
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import componentsOverride from "./overrides";
//
import { paletteDark, paletteDefault } from "./palette";
import shadowsLight, {
  customShadowsDark,
  customShadowsLight,
  shadowsDark,
} from "./shadows";
import typography from "./typography";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export const ColorModeContext = createContext(null);

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const handleColorMode = () => {
    if (mode === "dark") setMode("light");
    else setMode("dark");
  };

  useEffect(() => {
    const local = localStorage.getItem("mode");
    if (local) setMode(local);
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const palette = mode === "light" ? paletteDefault : paletteDark;
  const shadows = mode === "light" ? shadowsLight : shadowsDark;

  const customShadows =
    mode === "light" ? customShadowsLight : customShadowsDark;

  const themeOptions = {
    palette,
    shape: { borderRadius: 8 },
    typography,
    shadows,
    customShadows,
  };

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <ColorModeContext.Provider value={{ handleColorMode, mode }}>
      <StyledEngineProvider injectFirst>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MUIThemeProvider>
      </StyledEngineProvider>
    </ColorModeContext.Provider>
  );
}
