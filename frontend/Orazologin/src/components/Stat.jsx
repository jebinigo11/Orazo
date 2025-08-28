export default function Stat({ label, value, hint }) {
  return (
    <div className="kpi">
      <div className="muted">{label}</div>
      <div style={{ fontWeight: 700 }}>{value}</div>
      {hint && <div className="muted">{hint}</div>}
    </div>
  );
}
