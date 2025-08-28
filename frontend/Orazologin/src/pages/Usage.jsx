import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";

export default function Usage() {
  const usage = {
    callsUsed: 650, callsLimit: 1000,
    dataUsedGB: 35, dataLimitGB: 50,
    smsUsed: 80, smsLimit: 100
  };

  return (
    <Card title="Usage Details" subtitle="Live usage for current cycle">
      <p>📞 Calls: {usage.callsUsed}/{usage.callsLimit} mins</p>
      <ProgressBar value={(usage.callsUsed/usage.callsLimit)*100} />
      <p>🌐 Data: {usage.dataUsedGB}/{usage.dataLimitGB} GB</p>
      <ProgressBar value={(usage.dataUsedGB/usage.dataLimitGB)*100} />
      <p>✉️ SMS: {usage.smsUsed}/{usage.smsLimit}</p>
      <ProgressBar value={(usage.smsUsed/usage.smsLimit)*100} />
    </Card>
  );
}
