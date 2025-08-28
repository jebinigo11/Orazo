import { useState } from "react";
import Card from "../components/Card";

export default function Payments() {
  const [bill, setBill] = useState({ amount: 499, dueDate: "2025-09-05", status: "Pending" });
  const [loading, setLoading] = useState(false);

  const payNow = () => {
    setLoading(true);
    setTimeout(() => {
      setBill({ ...bill, status: "Paid" });
      setLoading(false);
      alert("Payment Successful (Demo)");
    }, 1000);
  };

  return (
    <Card title="Current Bill" subtitle="Pay before due date">
      <p><b>Amount:</b> ₹{bill.amount}</p>
      <p><b>Due Date:</b> {bill.dueDate}</p>
      <p><b>Status:</b> {bill.status}</p>
      <button onClick={payNow} disabled={loading || bill.status==="Paid"}>
        {bill.status === "Paid" ? "Paid" : "Pay Now"}
      </button>
    </Card>
  );
}


