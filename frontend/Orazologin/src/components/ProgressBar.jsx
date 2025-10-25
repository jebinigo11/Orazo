import React from "react";
import "./ProgressBar.css";

export default function ProgressBar({ value = 0 }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className="progress-container">
      <div
        className={`progress-fill ${v > 80 ? "danger" : v > 50 ? "warning" : "safe"}`}
        style={{ width: `${v}%` }}
      >
        <span className="progress-label">{v}%</span>
      </div>
    </div>
  );
}
