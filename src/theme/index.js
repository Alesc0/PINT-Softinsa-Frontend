// material
import { CssBaseline, useMediaQuery } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";
import componentsOverride from "./overrides";
//
import { paletteDark, paletteDefault } from "./palette";
import shadowsLight, {
  customShadowsLight,
  customShadowsDark,
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

  const systemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  const handleColorMode = useCallback(
    (mode) => {
      if (mode === "dark" || mode === "light") setMode(mode);
      else systemPrefersDark ? setMode("dark") : setMode("light");

      localStorage.setItem("mode", mode);
    },
    [setMode, systemPrefersDark]
  );

  useEffect(() => {
    const local = localStorage.getItem("mode");
    if (local) handleColorMode(local);
    else handleColorMode("light");
  }, [handleColorMode]);

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
    <ColorModeContext.Provider value={{ handleColorMode }}>
      <StyledEngineProvider injectFirst>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MUIThemeProvider>
      </StyledEngineProvider>
    </ColorModeContext.Provider>
  );
}
