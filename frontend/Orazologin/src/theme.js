import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#5A4FCF" }, // your bluish violet
    background: { default: "#ffffff" },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7C6EE6" },
    background: { default: "#121212" },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

// 👇 Add this wrapper to avoid import errors
export const makeTheme = (mode) => (mode === "light" ? lightTheme : darkTheme);
