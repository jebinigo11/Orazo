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
import { motion } from "framer-motion";

const BLUE_ACCENT = "#3285dc";
const RED_ACCENT = "#ff0000";

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
      const response = await fetch("http://localhost:8083/alerts", {
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          mode === "light"
            ? "linear-gradient(135deg, #f2f2f2 0%, #ffffff 100%)"
            : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      {/* HEADER */}
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            zIndex: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: mode === "light" ? BLUE_ACCENT : "#fff" }} />
            </IconButton>
            <Typography
              variant="h5"
              sx={{
                ml: 2,
                fontWeight: 700,
                color: mode === "light" ? BLUE_ACCENT : "#fff",
              }}
            >
             Orazo
            </Typography>
          </Box>
          <IconButton onClick={toggle}>
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon sx={{ color: "white" }} />}
          </IconButton>
        </Box>
      </motion.div>

      {/* DRAWER */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 260, bgcolor: mode === "light" ? "#ffffff" : "#1e1e1e", borderRight: "none", boxShadow: 5 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: RED_ACCENT, color: "white" }}>
          <DashboardIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Orazo Admin
          </Typography>
        </Box>
        <Divider />
        <List>
          {[{ text: "Dashboard", icon: <DashboardIcon />, route: "/admin/dashboard" },
            { text: "Alerts", icon: <InfoIcon />, route: "/admin/alerts" },
            { text: "Usage", icon: <DashboardIcon />, route: "/admin/usage" },
            { text: "Support", icon: <SupportIcon />, route: "/admin/tickets" }].map((item, i) => (
            <ListItem
              button
              key={i}
              onClick={() => navigate(item.route)}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                "&:hover": { bgcolor: mode === "light" ? "#f2f2f2" : "#2a2a2a" },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: BLUE_ACCENT }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItem>
          ))}
          <Divider sx={{ my: 2 }} />
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              mx: 1,
              "&:hover": { bgcolor: mode === "light" ? "#ffe5e5" : "#2a2a2a" },
              transition: "all 0.3s ease",
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: RED_ACCENT }}><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Sign Out" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItem>
        </List>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box sx={{ p: 4, flex: 1, zIndex: 1 }}>
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <Card
            elevation={10}
            sx={{
              maxWidth: 600,
              mx: "auto",
              borderRadius: 4,
              background: mode === "light" ? "rgba(255,255,255,0.85)" : "rgba(20,20,40,0.85)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 16px 36px rgba(0,0,0,0.35)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, textAlign: "center", color: BLUE_ACCENT }}>
                🚨 Send Alert
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
                  multiline
                  rows={3}
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
                  sx={{
                    mt: 3,
                    py: 1.2,
                    fontWeight: 700,
                    fontSize: "1rem",
                    borderRadius: "10px",
                    background: mode === "light" ? `linear-gradient(to right, ${BLUE_ACCENT}, #00f2fe)` : `linear-gradient(to right, #ff0080, #7928ca)`,
                    "&:hover": {
                      background: mode === "light" ? `linear-gradient(to right, #00c6ff, #0072ff)` : `linear-gradient(to right, #ff4b2b, #ff416c)`,
                    },
                  }}
                >
                  Send Alert
                </Button>
              </form>
              {responseMsg && (
                <Typography
                  sx={{ mt: 3, fontWeight: 500, textAlign: "center" }}
                  color={responseMsg.startsWith("✅") ? "success.main" : "error"}
                >
                  {responseMsg}
                </Typography>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          bgcolor: "transparent",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color={mode === "light" ? "text.secondary" : "grey.400"}>
          © 2025 Orazo Telecom. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
