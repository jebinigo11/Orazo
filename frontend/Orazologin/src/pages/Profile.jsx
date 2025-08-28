import Card from "../components/Card";
import Stat from "../components/Stat";

export default function Profile() {
  const profile = {
    name: "Orazo Subscriber",
    phone: "+91 9876543210",
    email: "customer@orazo.com",
    plan: "Orazo 499 Plan (50GB, 1000 mins)",
  };

  return (
    <Card title="Profile Overview" subtitle="Your registered details">
      <div className="grid">
        <Stat label="Name" value={profile.name} />
        <Stat label="Plan" value={profile.plan} />
        <Stat label="Phone" value={profile.phone} />
        <Stat label="Email" value={profile.email} />
      </div>
    </Card>
  );
}