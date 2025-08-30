import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ThemeModeProvider from "./components/ThemeModeProvider";

// ==== USER PAGES ====
import DashboardLayout from "./Layout/DashboardLayout.jsx";
import Login from "./components/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Usage from "./pages/Usage.jsx";
import Billing from "./pages/Billing.jsx";
import Payments from "./pages/Payments.jsx";
import Alerts from "./pages/Alerts.jsx";
import SupportTicket from "./pages/UserTickets.jsx";  // ✅ user support

// ==== ADMIN PAGES ====
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import AdminAlert from "./components/AdminAlert.jsx";
import AdminUsage from "./components/AdminUsage.jsx"; 
import AdminTickets from "./components/AdminTickets.jsx";   // ✅ admin view

export default function App() {
  return (
    <ThemeModeProvider>
      <Router>
        <Routes>
          {/* ==== USER ROUTES ==== */}
          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="usage" element={<Usage />} />
            <Route path="billing" element={<Billing />} />
            <Route path="payments" element={<Payments />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="support" element={<SupportTicket />} /> {/* ✅ user support route */}
          </Route>

          {/* ==== ADMIN ROUTES ==== */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/alerts"
            element={
              <ProtectedRoute>
                <AdminAlert />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usage"
            element={
              <ProtectedRoute>
                <AdminUsage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tickets"
            element={
              <ProtectedRoute>
                <AdminTickets />
              </ProtectedRoute>
            }
          />

          {/* ==== CATCH-ALL ==== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeModeProvider>
  );
}

// ==== ADMIN PROTECTION ====
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("admin_logged_in") === "true";
  return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
}
