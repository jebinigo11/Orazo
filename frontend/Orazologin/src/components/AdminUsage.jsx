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
import { motion } from "framer-motion";

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
      const response = await fetch("http://localhost:8083/usage", {
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
            ? "linear-gradient(135deg, #d9eefe 0%, #f9fbff 100%)"
            : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      {/* Background Blobs with animation */}
      <Box
        sx={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "300px",
          height: "300px",
          background: mode === "light" ? "rgba(79, 172, 254, 0.5)" : "rgba(255, 0, 150, 0.35)",
          filter: "blur(120px)",
          borderRadius: "50%",
          zIndex: 0,
          animation: "float1 12s ease-in-out infinite alternate",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-120px",
          right: "-120px",
          width: "350px",
          height: "350px",
          background: mode === "light" ? "rgba(0, 242, 254, 0.4)" : "rgba(0, 200, 255, 0.35)",
          filter: "blur(140px)",
          borderRadius: "50%",
          zIndex: 0,
          animation: "float2 15s ease-in-out infinite alternate-reverse",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          right: "20%",
          width: "200px",
          height: "200px",
          background: mode === "light" ? "rgba(0, 150, 255, 0.25)" : "rgba(200, 0, 255, 0.25)",
          filter: "blur(100px)",
          borderRadius: "50%",
          zIndex: 0,
          animation: "float3 10s ease-in-out infinite alternate",
        }}
      />

      {/* Header */}
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Box
          sx={{
            bgcolor: "transparent",
            p: 2,
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            zIndex: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon sx={{ color: mode === "light" ? "#003366" : "#fff" }} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{
                  ml: 2,
                  fontWeight: 700,
                  color: mode === "light" ? "#003366" : "#ffffff",
                }}
              >
                Orazo
              </Typography>
            </Box>
            <IconButton onClick={toggle}>
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon sx={{ color: "white" }} />}
            </IconButton>
          </Box>
        </Box>
      </motion.div>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 260, bgcolor: mode === "light" ? "#ffffff" : "#1e1e1e", borderRight: "none", boxShadow: 5 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "#5a4fcf", color: "white" }}>
          <DashboardIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Orazo Admin
          </Typography>
        </Box>
        <Divider />
        <List>
          {[
            { text: "Dashboard", icon: <DashboardIcon />, route: "/admin/dashboard" },
            { text: "Alerts", icon: <InfoIcon />, route: "/admin/alerts" },
            { text: "Usage", icon: <DashboardIcon />, route: "/admin/usage" },
            { text: "Support", icon: <SupportIcon />, route: "/admin/tickets" },
          ].map((item, i) => (
            <ListItem
              button
              key={i}
              onClick={() => navigate(item.route)}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                "&:hover": { bgcolor: mode === "light" ? "#f0f0ff" : "#2a2a2a" },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "#5a4fcf" }}>{item.icon}</ListItemIcon>
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
            <ListItemIcon sx={{ minWidth: 40, color: "#ff6b6b" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
  sx={{
    p: 4,
    flex: 1,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // <-- added this
  }}
>
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <Card
            elevation={10}
            sx={{
              maxWidth: 600,
              mx: "auto",
              borderRadius: 4,
              p: 3,
              background: mode === "light" ? "rgba(255, 255, 255, 0.85)" : "rgba(20, 20, 40, 0.85)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": { transform: "translateY(-6px)", boxShadow: "0 16px 36px rgba(0,0,0,0.4)" },
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  fontWeight: 800,
                  textAlign: "center",
                  color: mode === "light" ? "#003366" : "#ffffff",
                }}
              >
                📊 Add Usage Record
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField label="User ID" fullWidth margin="normal" value={userId} onChange={(e) => setUserId(e.target.value)} required />
                <TextField label="Call Used (minutes)" type="number" fullWidth margin="normal" value={callUsed} onChange={(e) => setCallUsed(e.target.value)} />
                <TextField label="Data Used (MB)" type="number" fullWidth margin="normal" value={dataUsed} onChange={(e) => setDataUsed(e.target.value)} />
                <TextField label="SMS Used" type="number" fullWidth margin="normal" value={smsUsed} onChange={(e) => setSmsUsed(e.target.value)} />

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
                    background: mode === "light" ? "linear-gradient(to right, #4facfe, #00f2fe)" : "linear-gradient(to right, #ff0080, #7928ca)",
                    "&:hover": {
                      background: mode === "light" ? "linear-gradient(to right, #00c6ff, #0072ff)" : "linear-gradient(to right, #ff4b2b, #ff416c)",
                    },
                  }}
                >
                  Submit
                </Button>
              </form>

              {responseMsg && (
                <Typography sx={{ mt: 3, fontWeight: 500, textAlign: "center" }} color={responseColor}>
                  {responseMsg}
                </Typography>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "transparent",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          p: 2,
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <Typography variant="body2" color={mode === "light" ? "text.secondary" : "grey.400"}>
          © 2025 Orazo Telecom. All rights reserved.
        </Typography>
      </Box>

      {/* Keyframes for blob animations */}
      <style>
        {`
          @keyframes float1 {
            0% { transform: translateY(0px) translateX(0px) scale(1); }
            50% { transform: translateY(-30px) translateX(20px) scale(1.05); }
            100% { transform: translateY(0px) translateX(0px) scale(1); }
          }
          @keyframes float2 {
            0% { transform: translateY(0px) translateX(0px) scale(1); }
            50% { transform: translateY(25px) translateX(-25px) scale(1.1); }
            100% { transform: translateY(0px) translateX(0px) scale(1); }
          }
          @keyframes float3 {
            0% { transform: translateY(0px) translateX(0px) scale(1); }
            50% { transform: translateY(-20px) translateX(15px) scale(1.07); }
            100% { transform: translateY(0px) translateX(0px) scale(1); }
          }
        `}
      </style>
    </Box>
  );
}
