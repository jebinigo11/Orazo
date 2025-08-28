import Card from "../components/Card";
import Table from "../components/Table";

export default function Billing() {
  const history = [
    { id: 1, period: "Jul 2025", amount: 499, status: "Paid", invoiceUrl: "#" },
    { id: 2, period: "Jun 2025", amount: 499, status: "Paid", invoiceUrl: "#" },
  ];

  return (
    <Card title="Billing History" subtitle="Download previous invoices">
      <Table
        columns={[
          { key: "period", label: "Period" },
          { key: "amount", label: "Amount", render: v => `₹${v}` },
          { key: "status", label: "Status" },
          { key: "invoiceUrl", label: "Invoice", render: v => <a href={v}>Download</a> },
        ]}
        data={history}
      />
    </Card>
  );
}
