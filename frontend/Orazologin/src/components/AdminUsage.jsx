// src/components/AdminUsage.jsx
import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
import { ThemeModeContext } from "./ThemeModeProvider";

export default function AdminUsage() {
  const [userId, setUserId] = useState("");
  const [callUsed, setCallUsed] = useState("");
  const [dataUsed, setDataUsed] = useState("");
  const [smsUsed, setSmsUsed] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [responseColor, setResponseColor] = useState("black");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { mode, toggle } = useContext(ThemeModeContext);

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/admin/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userId,
      callUsed: parseInt(callUsed) || 0,
      dataUsed: parseInt(dataUsed) || 0,
      smsUsed: parseInt(smsUsed) || 0,
    };

    try {
      const response = await fetch("http://localhost:8082/usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseColor("success.main");
        setResponseMsg("✅ Usage added successfully: " + JSON.stringify(result));
      } else {
        setResponseColor("error.main");
        setResponseMsg("❌ Error: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      setResponseColor("error.main");
      setResponseMsg("❌ Request failed: " + error.message);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* ====== HEADER ====== */}
      <Box sx={{ bgcolor: mode === "light" ? "#3a24e0ff" : "#121212", p: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 700 }}>
              Admin — Add Usage Record
            </Typography>
          </Box>
          <IconButton onClick={toggle} color="inherit">
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
      </Box>

      {/* ====== DRAWER ====== */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button onClick={() => navigate("/admin/dashboard")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button onClick={() => navigate("/admin/alerts")}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Alerts" />
            </ListItem>

            <ListItem button onClick={() => navigate("/admin/usage")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Usage" />
            </ListItem>

            <ListItem button onClick={() => navigate("/admin/tickets")}>
              <ListItemIcon>
                <SupportIcon />
              </ListItemIcon>
              <ListItemText primary="Support" />
            </ListItem>

            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* ====== MAIN CONTENT ====== */}
      <Box sx={{ p: 3, flex: 1 }}>
        <Card elevation={6} sx={{ maxWidth: 600, mx: "auto" }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Add Usage Record
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="User ID"
                fullWidth
                margin="normal"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />

              <TextField
                label="Call Used (minutes)"
                type="number"
                fullWidth
                margin="normal"
                value={callUsed}
                onChange={(e) => setCallUsed(e.target.value)}
              />

              <TextField
                label="Data Used (MB)"
                type="number"
                fullWidth
                margin="normal"
                value={dataUsed}
                onChange={(e) => setDataUsed(e.target.value)}
              />

              <TextField
                label="SMS Used"
                type="number"
                fullWidth
                margin="normal"
                value={smsUsed}
                onChange={(e) => setSmsUsed(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </form>

            {responseMsg && (
              <Typography
                sx={{ mt: 2, fontWeight: 500 }}
                color={responseColor}
              >
                {responseMsg}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* ====== FOOTER ====== */}
      <Box
        sx={{
          bgcolor: mode === "light" ? "#f5f5f5" : "#121212",
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          color={mode === "light" ? "text.secondary" : "grey.500"}
        >
          © 2025 Orazo Telecom. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
