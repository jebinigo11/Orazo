// src/pages/AdminTickets.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ThemeModeContext } from "./ThemeModeProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, toggle } = useContext(ThemeModeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tickets") || "[]");
    setTickets(saved);
  }, []);

  const handleVerify = (id) => {
    const updatedTickets = tickets.map((t) =>
      t.id === id ? { ...t, status: "verified" } : t
    );
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  const handleReject = (id) => {
    const updatedTickets = tickets.map((t) =>
      t.id === id ? { ...t, status: "rejected" } : t
    );
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  const handleSignOut = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/admin/login");
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
      {/* Background Blobs */}
      <Box
        sx={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "300px",
          height: "300px",
          background:
            mode === "light"
              ? "rgba(79, 172, 254, 0.5)"
              : "rgba(255, 0, 150, 0.35)",
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
          background:
            mode === "light"
              ? "rgba(0, 242, 254, 0.4)"
              : "rgba(0, 200, 255, 0.35)",
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
          background:
            mode === "light"
              ? "rgba(0, 150, 255, 0.25)"
              : "rgba(200, 0, 255, 0.25)",
          filter: "blur(100px)",
          borderRadius: "50%",
          zIndex: 0,
          animation: "float3 10s ease-in-out infinite alternate",
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            bgcolor: "transparent",
            p: 2,
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon
                  sx={{ color: mode === "light" ? "#003366" : "#fff" }}
                />
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
              {mode === "light" ? (
                <Brightness4Icon />
              ) : (
                <Brightness7Icon sx={{ color: "white" }} />
              )}
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
          sx: {
            width: 260,
            bgcolor: mode === "light" ? "#ffffff" : "#1e1e1e",
            borderRight: "none",
            boxShadow: 5,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            bgcolor: "#5a4fcf",
            color: "white",
          }}
        >
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
              <ListItemIcon sx={{ minWidth: 40, color: "#5a4fcf" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
          ))}
          <Divider sx={{ my: 2 }} />
          <ListItem
            button
            onClick={handleSignOut}
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
            <ListItemText
              primary="Sign Out"
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </ListItem>
        </List>
      </Drawer>

      {/* Content */}
      <Box sx={{ p: 4, flex: 1, zIndex: 1 }}>
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <Card
            elevation={10}
            sx={{
              borderRadius: 4,
              p: 3,
              background:
                mode === "light"
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(20,20,40,0.85)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 16px 36px rgba(0,0,0,0.4)",
              },
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
                🎟 Support Tickets
              </Typography>

              {tickets.length === 0 ? (
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "1.1rem",
                    color: mode === "light" ? "text.secondary" : "grey.400",
                  }}
                >
                  No tickets yet.
                </Typography>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer Code</TableCell>
                      <TableCell>Billing ID</TableCell>
                      <TableCell>Issue Type</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tickets.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell>{t.customer_code}</TableCell>
                        <TableCell>{t.billingId}</TableCell>
                        <TableCell>{t.issueType}</TableCell>
                        <TableCell>{t.description}</TableCell>
                        <TableCell>{t.date}</TableCell>
                        <TableCell>
                          {t.status === "verified" && <Typography color="green">✅ Verified</Typography>}
                          {t.status === "pending" && <Typography color="red">⏳ Pending</Typography>}
                          {t.status === "rejected" && <Typography color="red">❌ Rejected</Typography>}
                        </TableCell>
                        <TableCell>
                          {t.status === "pending" && (
                            <>
                              <Tooltip title="Verify Ticket">
                                <IconButton color="success" onClick={() => handleVerify(t.id)}>
                                  <CheckCircleIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Reject Ticket">
                                <IconButton color="error" onClick={() => handleReject(t.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "transparent", p: 2, textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.2)", zIndex: 2 }}>
        <Typography variant="body2" color={mode === "light" ? "text.secondary" : "grey.400"}>
          © 2025 Orazo Telecom. All rights reserved.
        </Typography>
      </Box>

      {/* Keyframes */}
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
