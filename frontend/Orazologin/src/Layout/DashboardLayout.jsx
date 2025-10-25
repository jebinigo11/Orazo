import React, { useState, useEffect, useContext, useRef } from "react"; 
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import PaymentIcon from "@mui/icons-material/Payment";
import SupportIcon from "@mui/icons-material/Support";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeModeContext } from "../components/ThemeModeProvider";
import { motion } from "framer-motion";

export default function DashboardLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, toggle } = useContext(ThemeModeContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState(() => {
    const stored = localStorage.getItem("user_name");
    return stored && stored !== "undefined" ? stored : "Guest";
  });

  // Chatbot states
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today? (Ask about bill, usage, recharge, or plans)", type: "text" }
  ]);
  const [input, setInput] = useState("");

  const chatContainerRef = useRef(null); // for smooth scroll

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const prepaidPlans = [
    { name: "Basic Plan", minutes: 1000, data: "2GB", sms: 500, price: "₹199" },
    { name: "Standard Plan", minutes: 2000, data: "4GB", sms: 1000, price: "₹299" }
  ];

  const postpaidPlans = [
    { name: "Postpaid Silver", fee: "₹399", minutes: 800, sms: 150, data: "40GB", extra: "₹1/min, ₹1.5/SMS, ₹0.05/MB" },
    { name: "Postpaid Gold", fee: "₹499", minutes: 1000, sms: 200, data: "50GB", extra: "₹0.8/min, ₹1.5/SMS, ₹0.05/MB" },
    { name: "Postpaid Platinum", fee: "₹799", minutes: 2000, sms: 300, data: "100GB", extra: "₹0.5/min, ₹1/SMS, ₹0.03/MB" }
  ];

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMsg = { from: "user", text: input, type: "text" };
    const newMessages = [...messages, userMsg];

    const key = input.toLowerCase();

    if (key === "plans") {
      const botMsg = { from: "bot", text: "", type: "plans" };
      setMessages([...newMessages, botMsg]);
    } else if (key === "bill") {
      setMessages([...newMessages, { from: "bot", text: "Your current bill amount is ₹799 for the month of August.", type: "text" }]);
    } else if (key === "usage") {
      setMessages([...newMessages, { from: "bot", text: "You have used 1.5GB of 2GB daily data today.", type: "text" }]);
    } else if (key === "recharge") {
      setMessages([...newMessages, { from: "bot", text: "You can recharge with ₹249 for 1.5GB/day plan.", type: "text" }]);
    } else {
      setMessages([...newMessages, { from: "bot", text: 'Sorry, I did not understand that. Type "help" for options.', type: "text" }]);
    }

    setInput("");
  };

  useEffect(() => {
    const customerCode = localStorage.getItem("customer_code");
    if (!customerCode) return;

    async function fetchProfile() {
      try {
        const res = await fetch(`http://localhost:8085/api/profile/${customerCode}`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUserName(data.name || "Guest");
          localStorage.setItem("user_name", data.name);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetchProfile();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const sidebarItems = [
    { text: "Profile", icon: <AccountCircleIcon />, route: "/dashboard/profile" },
    { text: "Usage", icon: <InfoIcon />, route: "/dashboard/usage" },
    { text: "BillingForm", icon: <PaymentIcon />, route: "/dashboard/billingform" },
    { text: "Payments", icon: <PaymentIcon />, route: "/dashboard/payments" },
    { text: "Alerts", icon: <InfoIcon />, route: "/dashboard/alerts" },
    { text: "Support", icon: <SupportIcon />, route: "/dashboard/support" },
  ];

  const handleSignOut = () => {
    localStorage.removeItem("customer_code");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  const headerBg = mode === "light" ? "rgba(255,255,255,0.8)" : "rgba(20,20,40,0.85)";
  const drawerBg = mode === "light" ? "#ffffff" : "#1e1e1e";
  const hoverBg = mode === "light" ? "#d9eefe" : "#2a2a2a";
  const textColor = mode === "light" ? "#003366" : "#fff";

  return (
    <Box sx={{
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      background: mode === "light"
        ? "linear-gradient(135deg, #d9eefe 0%, #f9fbff 100%)"
        : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    }}>

      {/* Header */}
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          bgcolor: headerBg,
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.3s",
        }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: textColor }} />
            </IconButton>
            <Typography sx={{ ml: 2, fontWeight: 700, color: textColor }}>Orazo</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ fontWeight: "bold", color: textColor }}>Hi, {userName}!</Typography>
            <IconButton onClick={toggle}>
              {mode === "light" ? <Brightness4Icon sx={{ color: "#003366" }} /> : <Brightness7Icon sx={{ color: "#fff" }} />}
            </IconButton>
          </Box>
        </Box>
      </motion.div>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{
        sx: { width: 260, bgcolor: drawerBg, borderRight: "none", boxShadow: 5, transition: "all 0.3s" }
      }}>
        <motion.div initial={{ x: -300 }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
          <Box sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "#003366", color: "white" }}>
            <AccountCircleIcon sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{userName}</Typography>
          </Box>
          <Divider />
          <List>
            {sidebarItems.map((item, i) => (
              <ListItem button key={i} onClick={() => navigate(item.route)}
                sx={{ borderRadius: 2, mx: 1, my: 0.5, "&:hover": { bgcolor: hoverBg }, transition: "all 0.3s ease" }}>
                <ListItemIcon sx={{ minWidth: 40, color: textColor }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600, color: textColor }} />
              </ListItem>
            ))}
          </List>
        </motion.div>
      </Drawer>

      {/* Main Content */}
      <motion.main variants={fadeInUp} initial="hidden" animate="visible" style={{ padding: "80px 20px 20px", zIndex: 1 }}>
        <Outlet />
      </motion.main>

      {/* Chatbot Icon */}
      <div onClick={() => setChatOpen(!chatOpen)} style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#fff",
        border: "2px solid #741f0cff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        zIndex: 2000,
      }}>
        <img src="/Orazo logo.PNG" alt="Chatbot Logo" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
      </div>

      {/* Chatbox */}
      {chatOpen && (
        <div style={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          width: "350px",
          backgroundColor: "#ffffff",
          border: "2px solid #9a1a18ff",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          fontFamily: '"Poppins", sans-serif',
          zIndex: 2000,
        }}>
          <div style={{
            backgroundColor: "#a52725ff",
            color: "#fff",
            padding: "12px",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            fontWeight: "bold",
            textAlign: "center",
          }}>
            Orazo Chatbot
          </div>

          <div ref={chatContainerRef} style={{ height: "250px", overflowY: "auto", padding: "10px", backgroundColor: "#fff5f5" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.from === "bot" ? "left" : "right", margin: "8px 0" }}>
                {msg.type === "text" ? (
                  <span style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    backgroundColor: msg.from === "bot" ? "#f1f1f1" : "#e53935",
                    color: msg.from === "bot" ? "#000" : "#fff",
                    fontSize: "14px",
                  }}>{msg.text}</span>
                ) : (
                  <div>
                    <h4 style={{ marginBottom: "5px" }}>Prepaid Plans:</h4>
                    {prepaidPlans.map((plan, i) => (
                      <div key={i} style={{ background: "#fff", border: "1px solid #ccc", borderRadius: "8px", padding: "8px", marginBottom: "8px" }}>
                        <strong>{plan.name}</strong><br/>
                        Minutes: {plan.minutes} | Data: {plan.data} | SMS: {plan.sms}<br/>
                        <span style={{ color: "#e53935", fontWeight: "bold" }}>{plan.price}</span>
                      </div>
                    ))}
                    <h4 style={{ marginBottom: "5px", marginTop: "10px" }}>Postpaid Plans:</h4>
                    {postpaidPlans.map((plan, i) => (
                      <div key={i} style={{ background: "#fff", border: "1px solid #ccc", borderRadius: "8px", padding: "8px", marginBottom: "8px" }}>
                        <strong>{plan.name}</strong><br/>
                        Fee: {plan.fee} | Minutes: {plan.minutes} | SMS: {plan.sms} | Data: {plan.data}<br/>
                        <small style={{ color: "#666" }}>Extra: {plan.extra}</small>
                      </div>
                    ))}
                    <p style={{ fontSize: "12px", marginTop: "10px", color: "#555" }}>
                      For more details contact: <strong>support@orazo.com</strong><br/>
                      Company: <strong>TelecomCorp</strong>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input & Send Button */}
          <div style={{ display: "flex", padding: "10px", gap: "10px" }}>
            <input
              style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button style={{ padding: "10px 15px", borderRadius: "8px", backgroundColor: "#e53935", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold" }} onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </Box>
  );
}
