import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { ThemeModeContext } from "./ThemeModeProvider";

export default function Topbar({ onMenu }) {
  const { mode, toggle } = React.useContext(ThemeModeContext);
  return (
    <AppBar position="sticky" color="primary" elevation={8}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onMenu} sx={{ mr: 1 }} aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", mr: 1 }}>OZ</Avatar>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: .3, flexGrow: 1 }}>
          Orazo • Dashboard
        </Typography>
        <Box>
          <IconButton color="inherit" onClick={toggle} aria-label="toggle theme">
            {mode === "light" ? <NightlightRoundIcon /> : <WbSunnyIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
