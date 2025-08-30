// src/pages/UserTickets.jsx
import { useState } from "react";
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
} from "@mui/material";

export default function UserTickets() {
  const [billingId, setBillingId] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [openToast, setOpenToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicket = {
      id: Date.now(),
      billingId,
      issueType,
      description,
      date: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem("tickets") || "[]");
    existing.push(newTicket);
    localStorage.setItem("tickets", JSON.stringify(existing));

    // reset form
    setBillingId("");
    setIssueType("");
    setDescription("");

    // show toast instead of alert
    setOpenToast(true);
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 500, width: "100%" }} elevation={6}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 700, color: "primary.main" }}
          >
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit Ticket
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ✅ Snackbar Toast */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenToast(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          ✅ Ticket submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
