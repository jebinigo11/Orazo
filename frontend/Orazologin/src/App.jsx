import React from "react";
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

// ==== ADMIN PAGES ====
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

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

          {/* ==== CATCH-ALL ROUTE ==== */}
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
