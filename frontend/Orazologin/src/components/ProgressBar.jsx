export default function ProgressBar({ value = 0 }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="progress" aria-label="usage">
      <div style={{ width: `${v}%` }} />
    </div>
  );
}
