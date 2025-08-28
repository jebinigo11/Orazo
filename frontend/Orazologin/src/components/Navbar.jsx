import { Menu } from "lucide-react";

export default function Navbar({ onMenuClick }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#222",
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
        onClick={onMenuClick}
        style={{
          fontSize: "20px",
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        <Menu size={24} />
      </button>
      <h1 style={{ margin: 0 }}>Orazo Dashboard</h1>
    </header>
  );
}