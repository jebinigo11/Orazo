// src/pages/Alerts.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Card as MuiCard,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { ThemeModeContext } from "../components/ThemeModeProvider";
import { motion } from "framer-motion";

export default function Alerts() {
  const { mode } = useContext(ThemeModeContext);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:8083/alerts");
        const data = await response.json();

        const loggedInUserId = localStorage.getItem("customer_code");
        const filtered = data.filter((a) => a.userId === loggedInUserId);

        setAlerts(filtered);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          mode === "light"
            ? "linear-gradient(135deg, #d9eefe 0%, #f9fbff 100%)"
            : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 2,
        position: "relative",
        overflow: "hidden",
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

      {/* Animated Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        style={{ zIndex: 1, width: "100%", maxWidth: 600 }}
      >
        <MuiCard
          sx={{
            width: "100%",
            mt: 4,
            background: mode === "light" ? "rgba(255,255,255,0.85)" : "rgba(20,20,40,0.85)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
            borderRadius: 3,
          }}
          elevation={4}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: mode === "light" ? "#003366" : "#ffffff",
              }}
            >
              Alerts
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 2, color: mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)" }}
            >
              Important notifications
            </Typography>

            {alerts.length === 0 ? (
              <Typography color={mode === "light" ? "text.primary" : "#fff"}>No alerts yet.</Typography>
            ) : (
              <List>
                {alerts.map((a, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                  >
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            color={mode === "light" ? "text.primary" : "#fff"}
                          >
                            {a.type}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body2"
                              color={mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)"}
                            >
                              {a.message}
                            </Typography>
                            <Typography
                              variant="caption"
                              color={mode === "light" ? "text.secondary" : "rgba(255,255,255,0.5)"}
                              sx={{ mt: 0.5, display: "block" }}
                            >
                              {a.date || ""}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {i < alerts.length - 1 && <Divider component="li" />}
                  </motion.div>
                ))}
              </List>
            )}
          </CardContent>
        </MuiCard>
      </motion.div>

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
