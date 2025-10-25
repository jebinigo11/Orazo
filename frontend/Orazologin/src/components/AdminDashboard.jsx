
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";
import SupportIcon from "@mui/icons-material/Support";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StarIcon from "@mui/icons-material/Star";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import {
  fetchRevenueSummary,
  fetchTopUsers,
  fetchPlanSplit,
  fetchUsageTrends,
} from "../data/mockApi";
import { ThemeModeContext } from "./ThemeModeProvider";
import { useNavigate } from "react-router-dom";

// ✨ Animations
import { motion } from "framer-motion";

// 🎨 Verizon Brand Colors
const VERIZON_RED = "#ff0000";
const VERIZON_CONCRETE = "#f2f2f2";
const VERIZON_BLUE = "#3285dc";

export default function AdminDashboard() {
  const [revenue, setRevenue] = useState({ total: 0, monthly: [] });
  const [topUsers, setTopUsers] = useState([]);
  const [split, setSplit] = useState({ prepaid: 0, postpaid: 0 });
  const [usage, setUsage] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, toggle } = useContext(ThemeModeContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setRevenue(await fetchRevenueSummary());
      setTopUsers(await fetchTopUsers());
      setSplit(await fetchPlanSplit());
      setUsage(await fetchUsageTrends());
    })();
  }, []);

  const totalSubs = (split.prepaid + split.postpaid).toLocaleString();
  const alertsCount = 12;

  const pieData = [
    { name: "Prepaid", value: split.prepaid },
    { name: "Postpaid", value: split.postpaid },
  ];
  const pieColors = [VERIZON_BLUE, VERIZON_RED];

  const handleSignOut = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/admin/login");
  };

  // ✨ Animation presets
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
            ? `linear-gradient(135deg, ${VERIZON_CONCRETE} 0%, #ffffff 100%)`
            : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      {/* ==== HEADER ==== */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
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
                <MenuIcon sx={{ color: mode === "light" ? VERIZON_BLUE : "#fff" }} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{
                  ml: 2,
                  fontWeight: 700,
                  color: mode === "light" ? VERIZON_BLUE : "#ffffff",
                }}
              >
                Orazo Admin Dashboard
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

      {/* ==== DRAWER ==== */}
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
            bgcolor: VERIZON_RED,
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
                "&:hover": {
                  bgcolor: mode === "light" ? VERIZON_CONCRETE : "#2a2a2a",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: VERIZON_BLUE }}>
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
            <ListItemIcon sx={{ minWidth: 40, color: VERIZON_RED }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Sign Out"
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </ListItem>
        </List>
      </Drawer>

      {/* ==== MAIN CONTENT ==== */}
      <Box sx={{ p: 4, flex: 1, zIndex: 1 }}>
        {/* KPI CARDS */}
        <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          {[
            {
              title: "Revenue Generated",
              value: `$${revenue.total.toLocaleString()}`,
              icon: <MonetizationOnIcon />,
              color: VERIZON_BLUE,
            },
            {
              title: "Total Subscribers",
              value: totalSubs,
              icon: <PeopleAltIcon />,
              color: VERIZON_RED,
            },
            {
              title: "Top Users",
              value: topUsers.length,
              subtitle: "in leaderboard",
              icon: <StarIcon />,
              color: VERIZON_BLUE,
            },
            {
              title: "Open Alerts",
              value: alertsCount,
              icon: <WarningAmberIcon />,
              color: VERIZON_RED,
            },
          ].map((kpi, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                <Card
                  elevation={10}
                  sx={{
                    borderRadius: 4,
                    height: "100%",
                    background:
                      mode === "light"
                        ? "rgba(255,255,255,0.85)"
                        : "rgba(20,20,40,0.85)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 16px 36px rgba(0,0,0,0.35)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: 120,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, color: kpi.color }}
                      >
                        {kpi.title}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
                        {kpi.value}
                      </Typography>
                      {kpi.subtitle && (
                        <Typography variant="body2" color="text.secondary">
                          {kpi.subtitle}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ ml: 2, color: kpi.color, fontSize: 40 }}>
                      {kpi.icon}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* ==== CHARTS & TABLES ==== */}
        <Grid container direction="column" spacing={3}>
          {/* Revenue Trend */}
          <Grid item xs={12}>
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <Card
                elevation={10}
                sx={{
                  borderRadius: 4,
                  background:
                    mode === "light"
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(20,20,40,0.85)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    Revenue Trend
                  </Typography>
                  <Box sx={{ width: "100%", height: 280 }}>
                    <ResponsiveContainer>
                      <LineChart data={revenue.monthly}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke={VERIZON_BLUE}
                          strokeWidth={3}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Prepaid vs Postpaid */}
          <Grid item xs={12}>
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <Card
                elevation={10}
                sx={{
                  borderRadius: 4,
                  background:
                    mode === "light"
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(20,20,40,0.85)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    Postpaid vs Prepaid
                  </Typography>
                  <Box sx={{ width: "100%", height: 280 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          label
                        >
                          {pieData.map((_, i) => (
                            <Cell key={i} fill={pieColors[i % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Data Usage */}
          <Grid item xs={12}>
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <Card
                elevation={10}
                sx={{
                  borderRadius: 4,
                  background:
                    mode === "light"
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(20,20,40,0.85)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    Monthly Data Usage (GB)
                  </Typography>
                  <Box sx={{ width: "100%", height: 320 }}>
                    <ResponsiveContainer>
                      <BarChart data={usage}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="prepaid" name="Prepaid" fill={VERIZON_BLUE} />
                        <Bar dataKey="postpaid" name="Postpaid" fill={VERIZON_RED} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Top Users */}
          <Grid item xs={12}>
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <Card
                elevation={10}
                sx={{
                  borderRadius: 4,
                  background:
                    mode === "light"
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(20,20,40,0.85)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    Top Users
                  </Typography>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Plan</TableCell>
                        <TableCell align="right">Data Used (GB)</TableCell>
                        <TableCell align="right">Amount Billed ($)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topUsers.map((u, i) => (
                        <TableRow
                          key={u.id}
                          hover
                          sx={{
                            "&:hover": {
                              backgroundColor:
                                mode === "light"
                                  ? "rgba(50,133,220,0.08)" // Verizon Blue tint
                                  : "rgba(255,255,255,0.05)",
                            },
                          }}
                        >
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{u.name}</TableCell>
                          <TableCell>{u.plan}</TableCell>
                          <TableCell align="right">
                            {u.data.toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            {u.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* ==== FOOTER ==== */}
      <Box
        sx={{
          bgcolor: "transparent",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          p: 2,
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <Typography
          variant="body2"
          color={mode === "light" ? "text.secondary" : "grey.400"}
        >
          © 2025 Orazo Telecom. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}


