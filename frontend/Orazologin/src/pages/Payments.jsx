// src/pages/Payments.jsx
import { useState, useContext, useEffect } from "react";
import { Box, Card, CardContent, Typography, Button, Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { ThemeModeContext } from "../components/ThemeModeProvider";
import Confetti from "react-confetti";

export default function Payments() {
  const { mode } = useContext(ThemeModeContext);
  const [bill, setBill] = useState({ amount: 499, dueDate: "2025-09-05", status: "Pending" });
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Update window size on resize
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const payNow = () => {
    setLoading(true);
    setTimeout(() => {
      setBill({ ...bill, status: "Paid" });
      setLoading(false);
      setShowConfetti(true);

      // Stop confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 3000);

      // Show toast instead of alert
      setShowToast(true);
    }, 1000);
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
        background:
          mode === "light"
            ? "linear-gradient(135deg, #d9eefe 0%, #f9fbff 100%)"
            : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        overflow: "hidden",
        p: 2,
      }}
    >
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={300}
          recycle={false}
          gravity={0.5}
        />
      )}

      {/* Payment Card */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" style={{ zIndex: 1, width: "100%", maxWidth: 450 }}>
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            background: mode === "light" ? "rgba(255,255,255,0.85)" : "rgba(20,20,40,0.85)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, color: mode === "light" ? "#003366" : "#ffffff" }}>
             Bill
          </Typography>

          <Box sx={{ mb: 3, width: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography>
              <strong>Amount:</strong> ₹{bill.amount}
            </Typography>
            <Typography>
              <strong>Due Date:</strong> {bill.dueDate}
            </Typography>
            <Typography>
              <strong>Status:</strong> {bill.status}
            </Typography>
          </Box>

          <Button
            onClick={payNow}
            disabled={loading || bill.status === "Paid"}
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: 700,
              fontSize: "1rem",
              borderRadius: "10px",
              background:
                bill.status === "Paid"
                  ? "gray"
                  : mode === "light"
                  ? "linear-gradient(to right, #4facfe, #00f2fe)"
                  : "linear-gradient(to right, #ff0080, #7928ca)",
              "&:hover": {
                background:
                  mode === "light"
                    ? "linear-gradient(to right, #00c6ff, #0072ff)"
                    : "linear-gradient(to right, #ff4b2b, #ff416c)",
              },
            }}
          >
            {bill.status === "Paid" ? "Paid" : loading ? "Processing..." : "Pay Now"}
          </Button>
        </Card>
      </motion.div>

      {/* Toast Snackbar */}
      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setShowToast(false)} severity="success" sx={{ width: "100%" }}>
          Payment Successful (Demo)!
        </Alert>
      </Snackbar>

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
        `}
      </style>
    </Box>
  );
}
