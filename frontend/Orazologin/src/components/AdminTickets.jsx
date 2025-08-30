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
import { ThemeModeContext } from "./ThemeModeProvider";
import { useNavigate } from "react-router-dom";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, toggle } = useContext(ThemeModeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tickets") || "[]");
    setTickets(saved);
  }, []);

  const handleDelete = (id) => {
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
  };

  const handleSignOut = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/admin/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ bgcolor: mode === "light" ? "#ec11cbff" : "#121212", p: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 700 }}>
              Admin — Support Tickets
            </Typography>
          </Box>
          <IconButton onClick={toggle}>
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
      </Box>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button onClick={() => navigate("/admin/dashboard")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button onClick={() => navigate("/admin/alerts")}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Alert" />
            </ListItem>

            <ListItem button onClick={() => navigate("/admin/usage")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Usage" />
            </ListItem>

            <ListItem button onClick={() => navigate("/admin/tickets")}>
              <ListItemIcon>
                <SupportIcon />
              </ListItemIcon>
              <ListItemText primary="Support" />
            </ListItem>

            <ListItem button onClick={handleSignOut}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Content */}
      <Box sx={{ p: 3, flex: 1 }}>
        <Card elevation={6}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Support Tickets
            </Typography>
            {tickets.length === 0 ? (
              <Typography color="text.secondary">No tickets yet.</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ticket ID</TableCell>
                    <TableCell>CUST ID</TableCell>
                    <TableCell>Issue Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Submitted At</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>{t.id}</TableCell>
                      <TableCell>{t.billingId}</TableCell>
                      <TableCell>{t.issueType}</TableCell>
                      <TableCell>{t.description}</TableCell>
                      <TableCell>{t.date}</TableCell>
                      <TableCell>
                        <Tooltip title="Delete Ticket">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(t.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: mode === "light" ? "#f5f5f5" : "#121212",
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          color={mode === "light" ? "text.secondary" : "grey.500"}
        >
          © 2025 Orazo Telecom. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
