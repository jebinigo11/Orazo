import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { makeTheme } from "../theme";

export const ThemeModeContext = React.createContext({ mode: "light", toggle: () => {} });

export default function ThemeModeProvider({ children }) {
  const [mode, setMode] = React.useState(() => localStorage.getItem("orazo_mode") || "light");
  const toggle = () => setMode(m => {
    const next = m === "light" ? "dark" : "light";
    localStorage.setItem("orazo_mode", next);
    return next;
  });
  const theme = React.useMemo(() => makeTheme(mode), [mode]);
  return (
    <ThemeModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
