import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdOutlinePassword, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function AdminLogin() {
  const [theme, setTheme] = useState("light");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("orazo-theme");
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("orazo-theme", theme);
  }, [theme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8085/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password }),
      });

      if (res.ok) {
        // Optional: store admin login state
        localStorage.setItem("admin_logged_in", "true");

        // Show toast success message
        toast.success("Welcome Admin! Login Successful");

        // Navigate to Admin Dashboard after toast closes
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      } else {
        const err = await res.text();
        setError(err || "Invalid password");
        toast.error(err || "Invalid password");
      }
    } catch (err) {
      setError("Server error. Try again later.");
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
              className="theme-toggle"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>

          <section className="form-card">
            <h2 className="welcome">Welcome Admin!</h2>
            <p className="subtitle">Enter your password</p>

            <form onSubmit={handleSubmit}>
              <div className="input-row">
                <MdOutlinePassword />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Admin Password"
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
              </div>

              {error && <p className="error">{error}</p>}

              <button className="btn btn-primary" type="submit">
                Admin Login
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
