export default function Card({ title, subtitle, right, children }) {
  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          {title && <h3>{title}</h3>}
          {subtitle && <div className="muted">{subtitle}</div>}
        </div>
        {right}
      </div>
      <div className="space" />
      {children}
    </div>
  );
}