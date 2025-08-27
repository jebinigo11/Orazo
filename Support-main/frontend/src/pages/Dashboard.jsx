import React from "react";
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material";
import KpiCard from "../components/KpiCard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StarIcon from "@mui/icons-material/Star";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts";
import { fetchRevenueSummary, fetchTopUsers, fetchPlanSplit, fetchUsageTrends } from "../data/mockApi";

export default function Dashboard() {
  const [revenue, setRevenue] = React.useState({ total: 0, monthly: [] });
  const [topUsers, setTopUsers] = React.useState([]);
  const [split, setSplit] = React.useState({ prepaid: 0, postpaid: 0 });
  const [usage, setUsage] = React.useState([]);

  React.useEffect(() => {
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

  return (
    <Box sx={{ p: 3 }}>
      {/* KPIs */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Revenue Generated" value={`$${revenue.total.toLocaleString()}`} icon={<MonetizationOnIcon/>} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Total Subscribers" value={totalSubs} icon={<PeopleAltIcon/>} color="#00c49f" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Top Users" value={topUsers.length} subtitle="in leaderboard" icon={<StarIcon/>} color="#ffbb28" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Open Alerts" value={alertsCount} icon={<WarningAmberIcon/>} color="#ff6b6b" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Revenue Trend */}
        <Grid item xs={12} md={8}>
          <Card elevation={6}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Revenue Trend</Typography>
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
        <Grid item xs={12} md={4}>
          <Card elevation={6}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Postpaid vs Prepaid</Typography>
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

        {/* Usage Trends */}
        <Grid item xs={12}>
          <Card elevation={6}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Monthly Data Usage (GB)</Typography>
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
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Top Users</Typography>
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
  );
}
