import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [open, setOpen] = useState(true); // default open for easier testing

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    display: "block",
    padding: "12px",
  };

  return (
    <div>
      {/* Navbar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
          background: "#0695d7ff",
          color: "white",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          style={{
            fontSize: "20px",
            marginRight: "15px",
            background: "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
      </header>

      {/* Sidebar */}
      <aside
        style={{
          width: open ? "200px" : "0",
          transition: "0.3s",
          overflowX: "hidden",
          background: "#808686ff",
          color: "#fff",
          height: "100vh",
          position: "fixed",
          top: "60px",
          left: 0,
          paddingTop: "10px",
          zIndex: 999,
        }}
      >
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li><Link to="/dashboard/profile" style={linkStyle}>Profile</Link></li>
            <li><Link to="/dashboard/usage" style={linkStyle}>Usage</Link></li>
            <li><Link to="/dashboard/billing" style={linkStyle}>Billing</Link></li>
            <li><Link to="/dashboard/payments" style={linkStyle}>Payments</Link></li>
            <li><Link to="/dashboard/alerts" style={linkStyle}>Alerts</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <main
        style={{
          marginLeft: open ? "200px" : "0",
          padding: "80px 20px 20px",
          transition: "0.3s",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}