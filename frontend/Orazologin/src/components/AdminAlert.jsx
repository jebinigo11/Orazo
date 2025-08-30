// src/components/AdminAlert.jsx
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

export default function AdminAlert() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("Alert");
  const [responseMsg, setResponseMsg] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();
  const { mode, toggle } = useContext(ThemeModeContext);

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/admin/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { userId, message, type };

    try {
      const response = await fetch("http://localhost:8082/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMsg("✅ Alert sent successfully: " + JSON.stringify(result));
      } else {
        setResponseMsg("❌ Error: " + (result.error || "Failed to send alert"));
      }
    } catch (error) {
      setResponseMsg("❌ Error: " + error.message);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* ====== HEADER ====== */}
      <Box sx={{ bgcolor: mode === "light" ? "#ec11cbff" : "#121212", p: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 700 }}>
              Admin — Send Alerts
            </Typography>
          </Box>
          <IconButton onClick={toggle}>
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
              Send Alert to User
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
                label="Message"
                fullWidth
                margin="normal"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <TextField
                label="Type"
                fullWidth
                margin="normal"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
              >
                Send Alert
              </Button>
            </form>

            {responseMsg && (
              <Typography
                sx={{ mt: 2, fontWeight: 500 }}
                color={responseMsg.startsWith("✅") ? "success.main" : "error"}
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
