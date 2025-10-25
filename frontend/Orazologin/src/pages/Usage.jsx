import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeModeContext } from "../components/ThemeModeProvider";

export default function Usage() {
  const [usageData, setUsageData] = useState(null);
  const { mode } = useContext(ThemeModeContext); // use shared mode

  useEffect(() => {
    const customerCode = localStorage.getItem("customer_code");
    if (customerCode) {
      fetch(`http://localhost:8080/api/usage/${customerCode}`)
        .then((res) => res.json())
        .then((data) => setUsageData(data))
        .catch((err) => console.error(err));
    }
  }, []);

  const getPercentage = (used, limit) => {
    if (!limit || limit === 0) return 0;
    return Math.min(100, ((used / limit) * 100).toFixed(2));
  };

  // Night mode friendly colors
  const cardBg = mode === "light" ? "rgba(255,255,255,0.85)" : "rgba(10,25,50,0.85)";
  const textColor = mode === "light" ? "#003366" : "#e0e0ff";
  const progressBg = mode === "light" ? "#eee" : "#122144"; // dark bluish
  const progressColors = mode === "light"
    ? { calls: "#4caf50", data: "#2196f3", sms: "#ff9800" }
    : { calls: "#4da6ff", data: "#3399ff", sms: "#66ccff" }; // bluish tones

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: mode === "light" ? "#f0f4ff" : "#0b1a2e",
        transition: "background 0.3s ease",
      }}
    >
      <AnimatePresence>
        {usageData ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <Card
              sx={{
                maxWidth: 500,
                borderRadius: 4,
                boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
                p: 4,
                background: cardBg,
                color: textColor,
                backdropFilter: "blur(12px)",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.35)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 800, textAlign: "center", mb: 2, color: textColor }}>
                  📊 Usage Dashboard
                </Typography>
                

                <UsageBar
                  label="📞 Calls"
                  used={usageData.progressive_call}
                  limit={usageData.call_limit}
                  color={progressColors.calls}
                  progressBg={progressBg}
                  textColor={textColor}
                />
                <UsageBar
                  label="📶 Data"
                  used={usageData.progressive_data}
                  limit={usageData.data_limit}
                  color={progressColors.data}
                  progressBg={progressBg}
                  textColor={textColor}
                />
                <UsageBar
                  label="✉️ SMS"
                  used={usageData.progressive_sms}
                  limit={usageData.sms_limit}
                  color={progressColors.sms}
                  progressBg={progressBg}
                  textColor={textColor}
                />
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <Typography sx={{ color: textColor, fontWeight: 600 }}>Loading usage data...</Typography>
        )}
      </AnimatePresence>
    </Box>
  );
}

function UsageBar({ label, used, limit, color, progressBg, textColor }) {
  const percentage = Math.min(100, ((used / limit) * 100).toFixed(2));
  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ mb: 1, color: textColor }}>{`${label}: ${used} / ${limit}`}</Typography>
      <Box
        sx={{
          width: "100%",
          height: 20,
          background: progressBg,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            height: "100%",
            backgroundColor: color,
            borderRadius: 10,
          }}
        />
      </Box>
    </Box>
  );
}
