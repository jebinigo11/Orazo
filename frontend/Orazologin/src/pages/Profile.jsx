import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Paper, Grid, Card, CardContent } from "@mui/material";
import { ThemeModeContext } from "../components/ThemeModeProvider";
import { motion } from "framer-motion";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const customerCode = localStorage.getItem("customer_code");
  const { mode } = useContext(ThemeModeContext);

  useEffect(() => {
    if (!customerCode || customerCode === "undefined" || customerCode === "") return;

    async function fetchProfile() {
      try {
        const res = await fetch(`http://localhost:8085/api/profile/${customerCode}`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else setProfile(null);
      } catch (error) {
        setProfile(null);
      }
    }

    fetchProfile();
  }, [customerCode]);

  if (!profile) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">Loading profile...</Typography>
      </Box>
    );
  }

  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const cardBg = mode === "light" ? "rgba(255,255,255,0.85)" : "rgba(245, 239, 236, 0.85)";
  const borderColor = mode === "light" ? "#ccc" : "#ee1010ff";
  const textColor = mode === "light" ? "#003366" : "#121212ff";

  const profileItems = [
    { label: "Customer Code", value: profile.customer_code },
    { label: "Plan", value: profile.plan_name },
    { label: "Phone", value: profile.phone },
    { label: "Email", value: profile.email },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <Card
          elevation={10}
          sx={{
            maxWidth: 1000,
            mx: "auto",
            borderRadius: 4,
            background: cardBg,
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
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, textAlign: "center", color: textColor }}>
              Profile Overview
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3, textAlign: "center", color: textColor }}>
              Your registered details
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              {profileItems.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={3} sx={{ display: "flex", justifyContent: "center" }}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      border: `1px solid ${borderColor}`,
                      bgcolor: cardBg,
                      textAlign: "center",
                      minWidth: 200,
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: textColor }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body1" sx={{ color: textColor }}>
                      {item.value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
