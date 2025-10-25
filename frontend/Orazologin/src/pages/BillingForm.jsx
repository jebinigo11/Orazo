import React, { useState, useContext } from "react";
import { Box, Typography, Card, CardContent, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import { ThemeModeContext } from "../components/ThemeModeProvider";

// List of allowed postpaid user IDs
const allowedPostpaidUsers = ["PP1001", "PP1002", "PP1003"];

export default function BillingForm() {
  const [userId, setUserId] = useState("");
  const [accountType, setAccountType] = useState("Prepaid");
  const [month, setMonth] = useState("");
  const { mode } = useContext(ThemeModeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please enter User ID");
      return;
    }
    if (!month) {
      alert("Please enter Month");
      return;
    }

    const formattedAccountType = accountType.toUpperCase();

    if (formattedAccountType === "POSTPAID" && !allowedPostpaidUsers.includes(userId)) {
      alert("You are not a valid postpaid user");
      return;
    }

    let url = "";
    if (formattedAccountType === "PREPAID") {
      url = `http://localhost:8083/billing/generate/${userId}/${month}/PREPAID`;
    } else if (formattedAccountType === "POSTPAID") {
      url = `http://localhost:8082/billing/generate/${userId}/${month}/POSTPAID`;
    } else {
      alert("Invalid account type");
      return;
    }

    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Network error");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      const fileName = `bill_${userId}_${month}_${formattedAccountType}.pdf`;
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      alert(`Bill generated and downloaded for ${formattedAccountType} user.`);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          mode === "light"
            ? "linear-gradient(135deg, #d9eefe 0%, #f9fbff 100%)"
            : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        p: 2,
      }}
    >
      {/* Background blobs */}
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

      {/* Billing Form Card */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" style={{ width: "100%", maxWidth: 450, zIndex: 1 }}>
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            background: mode === "light" ? "rgba(255,255,255,0.85)" : "rgba(20,20,40,0.85)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
            "&:hover": { transform: "translateY(-6px)", boxShadow: "0 16px 36px rgba(0,0,0,0.4)" },
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, textAlign: "center", color: mode === "light" ? "#003366" : "#ffffff" }}>
              Enter Billing Details
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <TextField label="User ID" fullWidth value={userId} onChange={(e) => setUserId(e.target.value)} required />
              <TextField type="month" label="Month" fullWidth value={month} onChange={(e) => setMonth(e.target.value)} required />
              <TextField select label="Account Type" fullWidth value={accountType} onChange={(e) => setAccountType(e.target.value)} SelectProps={{ native: true }}>
                <option value="Prepaid">Prepaid</option>
                <option value="Postpaid">Postpaid</option>
              </TextField>
              <Button
                type="submit"
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderRadius: "10px",
                  background: mode === "light" ? "linear-gradient(to right, #4facfe, #00f2fe)" : "linear-gradient(to right, #ff0080, #7928ca)",
                  "&:hover": {
                    background: mode === "light" ? "linear-gradient(to right, #00c6ff, #0072ff)" : "linear-gradient(to right, #ff4b2b, #ff416c)",
                  },
                }}
              >
                Generate Bill
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes float1 {0%{transform:translateY(0px) translateX(0px) scale(1);}50%{transform:translateY(-30px) translateX(20px) scale(1.05);}100%{transform:translateY(0px) translateX(0px) scale(1);}}
          @keyframes float2 {0%{transform:translateY(0px) translateX(0px) scale(1);}50%{transform:translateY(25px) translateX(-25px) scale(1.1);}100%{transform:translateY(0px) translateX(0px) scale(1);}}
          @keyframes float3 {0%{transform:translateY(0px) translateX(0px) scale(1);}50%{transform:translateY(-20px) translateX(15px) scale(1.07);}100%{transform:translateY(0px) translateX(0px) scale(1);}}
        `}
      </style>
    </Box>
  );
}
