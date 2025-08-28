import Card from "../components/Card";

export default function Alerts() {
  const alerts = [
    "Your payment is due on 5th Sep",
    "Data usage crossed 70%",
    "Last invoice available for download"
  ];

  return (
    <Card title="Alerts" subtitle="Important notifications">
      <ul>
        {alerts.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
    </Card>
  );
}



