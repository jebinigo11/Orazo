import React, { useEffect, useState } from "react";
import { FaUserShield, FaMoon, FaSun } from "react-icons/fa";
import { MdOutlinePassword, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [theme, setTheme] = useState("light");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("orazo-theme");
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("orazo-theme", theme);
  }, [theme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8085/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userId, password }),
      });

      if (res.ok) {
        const data = await res.json();

        // Store full profile safely in localStorage with fallbacks
        localStorage.setItem("user_logged_in", "true");
        localStorage.setItem("user_name", data.name || "Guest");
        localStorage.setItem("customer_code", data.customer_code || "");
        localStorage.setItem("plan_name", data.plan_name || "");
        localStorage.setItem("phone", data.phone || "");
        localStorage.setItem("email", data.email || "");
        localStorage.setItem("account_type", data.account_type || "");

        toast.success(data.message, {
          onClose: () => navigate("/dashboard"),
          autoClose: 1500,
        });
      } else {
        const err = await res.text();
        toast.error(err);
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
      console.error(err);
    }
  };

  return (
    <div className="app" data-theme={theme}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="shell">
        <aside className="brand-side">
          <div className="brand-wrap">
            <span className="signal signal--1" />
            <span className="signal signal--2" />
            <span className="signal signal--3" />
            <h1 className="brand-title">
              <span className="brand-line">Orazo</span>
              <span className="brand-line">Telecom</span>
            </h1>
            
          </div>
        </aside>

        <main className="form-side">
          <div className="top-bar">
            <button
              aria-label="Toggle theme"
              className="theme-toggle"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>

          <section className="form-card">
            <h2 className="welcome">Welcome back!</h2>
            <p className="subtitle">Please enter your details</p>
            <form onSubmit={handleSubmit} noValidate>
              <label className="input-row">
                <span className="leading"><FaUserShield /></span>
                <input
                  type="text"
                  placeholder="User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </label>

              <label className="input-row">
                <span className="leading"><MdOutlinePassword /></span>
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="trailing"
                  onClick={() => setShowPw(!showPw)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </label>

              <button className="btn btn-primary" type="submit">Log in</button>
              <p className="signup">
                <Link to="/admin/login" style={{ color: "#030606ff", textDecoration: "underline" }}>
                  Admin Login
                </Link>
              </p>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
