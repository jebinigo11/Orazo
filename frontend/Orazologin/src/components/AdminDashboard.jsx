import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";
import SupportIcon from "@mui/icons-material/Support";
import KpiCard from "./KpiCard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StarIcon from "@mui/icons-material/Star";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { fetchRevenueSummary, fetchTopUsers, fetchPlanSplit, fetchUsageTrends } from "../data/mockApi";
import { ThemeModeContext } from "./ThemeModeProvider";
import { useNavigate } from "react-router-dom";

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
  const pieColors = ["#5a4fcf", "#00c49f"];

  const handleSignOut = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/admin/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      {/* Header */}
      <Box sx={{ bgcolor: mode === "light" ? "#ec11cbff" : "#121212", p: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => setDrawerOpen(true)}><MenuIcon /></IconButton>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 700 }}>Admin Dashboard</Typography>
          </Box>
          <IconButton onClick={toggle}>
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
      </Box>

      {/* Hamburger Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            <ListItem button onClick={() => navigate("/admin/dashboard")}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            
             <ListItem button onClick={() => navigate("/admin/alerts")}>
  <ListItemIcon><InfoIcon /></ListItemIcon>
  <ListItemText primary="Alert" />
</ListItem>

          <ListItem button onClick={() => navigate("/admin/usage")}>
  <ListItemIcon><DashboardIcon /></ListItemIcon>
  <ListItemText primary="Usage" />
</ListItem>

           <ListItem button onClick={() => navigate("/admin/tickets")}>
  <ListItemIcon><SupportIcon /></ListItemIcon>
  <ListItemText primary="Support" />
</ListItem>
            <ListItem button onClick={handleSignOut}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ p: 3, flex: 1 }}>
        {/* KPI Cards Centered */}
        <Grid container spacing={2} sx={{ mb: 3 }} justifyContent="center">
          {[
            { title: "Revenue Generated", value: `$${revenue.total.toLocaleString()}`, icon: <MonetizationOnIcon /> },
            { title: "Total Subscribers", value: totalSubs, icon: <PeopleAltIcon />, color: "#00c49f" },
            { title: "Top Users", value: topUsers.length, subtitle: "in leaderboard", icon: <StarIcon />, color: "#ffbb28" },
            { title: "Open Alerts", value: alertsCount, icon: <WarningAmberIcon />, color: "#ff6b6b" },
          ].map((kpi, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card elevation={6} sx={{ height: "100%" }}>
                <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 120 }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: kpi.color || "text.secondary" }}>
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
                  <Box sx={{ ml: 2, color: kpi.color || "text.primary", fontSize: 40 }}>
                    {kpi.icon}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts and Table stacked vertically */}
        <Grid container direction="column" spacing={3}>
          {/* Revenue Trend */}
          <Grid item xs={12}>
            <Card elevation={6}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Revenue Trend</Typography>
                <Box sx={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer>
                    <LineChart data={revenue.monthly}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#5a4fcf" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Postpaid vs Prepaid */}
          <Grid item xs={12}>
            <Card elevation={6}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Postpaid vs Prepaid</Typography>
                <Box sx={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                        {pieData.map((_, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Monthly Data Usage */}
          <Grid item xs={12}>
            <Card elevation={6}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Monthly Data Usage (GB)</Typography>
                <Box sx={{ width: "100%", height: 320 }}>
                  <ResponsiveContainer>
                    <BarChart data={usage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="prepaid" name="Prepaid" fill="#5a4fcf" />
                      <Bar dataKey="postpaid" name="Postpaid" fill="#00c49f" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Users Table */}
          <Grid item xs={12}>
            <Card elevation={6}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Top Users</Typography>
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
                      <TableRow key={u.id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{u.name}</TableCell>
                        <TableCell>{u.plan}</TableCell>
                        <TableCell align="right">{u.data.toLocaleString()}</TableCell>
                        <TableCell align="right">{u.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: mode === "light" ? "#f5f5f5" : "#121212", p: 2, textAlign: "center" }}>
        <Typography variant="body2" color={mode === "light" ? "text.secondary" : "grey.500"}>
          © 2025 Orazo Telecom. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
