import React from "react";
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Avatar, Typography, Divider
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/ReceiptLong";
import NotificationsIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const nav = [
  { label: "Dashboard", path: "/" , icon: <DashboardIcon/>},
  { label: "Billing", path: "/billing", icon: <ReceiptIcon/>},
  { label: "Alerts", path: "/alerts", icon: <NotificationsIcon/>},
  { label: "User Info", path: "/user", icon: <PersonIcon/>},
  { label: "Sign Out", path: "/signout", icon: <ExitToAppIcon/>},
];

export default function Sidebar({ open, onClose, onNavigate }) {
  return (
    <Drawer open={open} onClose={onClose}>
      <Box sx={{ width: 270 }} role="presentation">
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>OZ</Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>Orazo</Typography>
            <Typography variant="caption" color="text.secondary">Telecom Services</Typography>
          </Box>
        </Box>
        <Divider />
        <List>
          {nav.map((n) => (
            <ListItemButton key={n.label} onClick={() => { onNavigate(n.path); onClose(); }}>
              <ListItemIcon>{n.icon}</ListItemIcon>
              <ListItemText primary={n.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
