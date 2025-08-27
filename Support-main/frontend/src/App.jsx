import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ThemeModeProvider from "./components/ThemeModeProvider";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import { Container, Typography } from "@mui/material";

function Shell() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Topbar onMenu={() => setOpen(true)} />
      <Sidebar open={open} onClose={() => setOpen(false)} onNavigate={(p)=>navigate(p)} />
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/billing" element={<Typography variant="h5">Billing (placeholder)</Typography>} />
          <Route path="/alerts" element={<Typography variant="h5">Alerts (placeholder)</Typography>} />
          <Route path="/user" element={<Typography variant="h5">User Info (placeholder)</Typography>} />
          <Route path="/signout" element={<Typography variant="h5">Signed out</Typography>} />
        </Routes>
      </Container>
    </>
  );
}

export default function App() {
  return (
    <ThemeModeProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </ThemeModeProvider>
  );
}
