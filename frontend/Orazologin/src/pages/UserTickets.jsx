// src/pages/UserTickets.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import { ThemeModeContext } from "../components/ThemeModeProvider";

export default function UserTickets() {
  const { mode } = useContext(ThemeModeContext);
  const [billingId, setBillingId] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [tickets, setTickets] = useState([]);
  const [openToast, setOpenToast] = useState(false);

  const userCode = localStorage.getItem("customer_code");

  // Load tickets for this user
  useEffect(() => {
    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const userTickets = allTickets.filter((t) => t.customer_code === userCode);
    setTickets(userTickets);
  }, [userCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!billingId || !issueType || !description) return;

    const newTicket = {
      id: Date.now(),
      billingId,
      issueType,
      description,
      date: new Date().toLocaleString(),
      status: "pending", // default status
      customer_code: userCode,
    };

    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    allTickets.push(newTicket);
    localStorage.setItem("tickets", JSON.stringify(allTickets));

    setTickets(allTickets.filter((t) => t.customer_code === userCode));

    setBillingId("");
    setIssueType("");
    setDescription("");
    setOpenToast(true);
  };

  const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
  const listItemVariants = (i) => ({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.4 } },
  });

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background:
          mode === "light"
            ? "linear-gradient(135deg, #d9eefe 0%, #f9fbff 100%)"
            : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        minHeight: "100vh",
      }}
    >
      {/* Submit Ticket Card */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" style={{ width: "100%", maxWidth: 500, marginBottom: 32 }}>
        <Card sx={{ width: "100%" }} elevation={6}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "primary.main" }}>
              User — Submit Support Ticket
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="CUST ID"
                fullWidth
                margin="normal"
                value={billingId}
                onChange={(e) => setBillingId(e.target.value)}
                required
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="issue-type-label">Issue Type</InputLabel>
                <Select
                  labelId="issue-type-label"
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                >
                  <MenuItem value="">-- Select --</MenuItem>
                  <MenuItem value="Invoice Not Received">Invoice Not Received</MenuItem>
                  <MenuItem value="Incorrect Amount Charged">Incorrect Amount Charged</MenuItem>
                  <MenuItem value="Refund Not Processed">Refund Not Processed</MenuItem>
                  <MenuItem value="Payment Failure">Payment Failure</MenuItem>
                  <MenuItem value="Duplicate Charge">Duplicate Charge</MenuItem>
                  <MenuItem value="Subscription Cancellation">Subscription Cancellation</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Submit Ticket
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* My Tickets Card */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" style={{ width: "100%", maxWidth: 500 }}>
        <Card sx={{ width: "100%" }} elevation={3}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "primary.main" }}>
              My Tickets
            </Typography>
            <List>
              {tickets.length === 0 && <Typography>No tickets submitted yet.</Typography>}
              {tickets.map((t, i) => (
                <motion.div key={t.id} custom={i} initial="hidden" animate="visible" variants={listItemVariants(i)}>
                  <ListItem divider sx={{ flexDirection: "column", alignItems: "flex-start" }}>
                    <ListItemText
                      primary={`${t.issueType} (Billing ID: ${t.billingId})`}
                      secondary={`Submitted: ${t.date}\n${t.description}`}
                    />
                    <Typography
                      variant="body2"
                      color={
                        t.status === "verified" ? "green" :
                        t.status === "pending" ? "orange" :
                        "red"
                      }
                    >
                      {t.status === "verified" && "✅ Verified by Admin"}
                      {t.status === "pending" && "⏳ Pending verification"}
                      {t.status === "rejected" && "❌ Your ticket was rejected"}
                    </Typography>
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </CardContent>
        </Card>
      </motion.div>

      {/* Snackbar Toast */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenToast(false)} severity="success" sx={{ width: "100%" }}>
          ✅ Ticket submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
